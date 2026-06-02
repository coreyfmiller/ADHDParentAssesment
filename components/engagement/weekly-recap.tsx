"use client"

import { useState, useEffect } from "react"
import { Calendar, Sparkles, Loader2 } from "lucide-react"
import { getAllWins } from "@/lib/engagement/micro-wins"
import { getOneThingHistory } from "@/lib/engagement/one-thing-interactive"
import { getAllPulses } from "@/lib/engagement/pulse-checkins"
import { getThisWeeksHardThing, getLastWeeksHardThing } from "@/lib/engagement/whats-hard-this-week"
import { getCurrentArchetype } from "@/lib/archetypes"

const RECAP_KEY = "mindful-mama-weekly-recap"

interface CachedRecap {
  weekStart: string
  recap: string
  generatedAt: number
}

export function WeeklyRecap() {
  const [recap, setRecap] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [weekLabel, setWeekLabel] = useState("")

  useEffect(() => {
    const now = new Date()
    const day = now.getDay()

    // Only show on Sunday (0) or Monday (1) — the "week in review" window
    if (day !== 0 && day !== 1) return

    const weekStart = getLastWeekStartDate()
    setWeekLabel(formatWeekLabel(weekStart))

    // Check cache
    const cached = getCachedRecap()
    if (cached && cached.weekStart === weekStart) {
      setRecap(cached.recap)
      return
    }

    // Generate new recap
    generateRecap(weekStart)
  }, [])

  const generateRecap = async (weekStart: string) => {
    setIsLoading(true)
    try {
      const data = gatherWeekData(weekStart)

      // Need at least some data to generate a meaningful recap
      if (data.winsCount === 0 && data.oneThingTotal === 0 && !data.hardThing) {
        setIsLoading(false)
        return
      }

      const response = await fetch("/api/coach/weekly-recap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        const result = await response.json()
        if (result.recap) {
          setRecap(result.recap)
          // Cache it
          const cached: CachedRecap = {
            weekStart,
            recap: result.recap,
            generatedAt: Date.now(),
          }
          try {
            localStorage.setItem(RECAP_KEY, JSON.stringify(cached))
          } catch {}
        }
      }
    } catch {
      // Silently fail — widget just won't show
    } finally {
      setIsLoading(false)
    }
  }

  if (!recap && !isLoading) return null

  return (
    <div className="bg-card rounded-2xl border border-primary/15 overflow-hidden shadow-sm">
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-xs font-medium text-primary uppercase tracking-wide">Your week</p>
            <p className="text-[10px] text-muted-foreground">{weekLabel}</p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center gap-2 py-4">
            <Loader2 className="w-4 h-4 text-muted-foreground animate-spin" />
            <span className="text-sm text-muted-foreground">Reflecting on your week...</span>
          </div>
        ) : (
          <p className="text-sm text-foreground/80 leading-relaxed italic">
            {recap}
          </p>
        )}
      </div>
    </div>
  )
}

// ---- Data Gathering ----

function gatherWeekData(weekStart: string) {
  const weekEnd = getWeekEnd(weekStart)

  // Wins
  const allWins = getAllWins()
  const weekWins = allWins.filter((d) => d.date >= weekStart && d.date < weekEnd)
  const winsCount = weekWins.reduce((sum, d) => sum + d.wins.length, 0)
  const winsExamples = weekWins
    .flatMap((d) => d.wins.map((w) => w.text))
    .slice(0, 8)

  // One Thing
  const oneThingHistory = getOneThingHistory()
  const weekOneThings = oneThingHistory.filter((e) => e.date >= weekStart && e.date < weekEnd)
  const oneThingCompleted = weekOneThings.filter((e) => e.completed).length
  const oneThingTotal = weekOneThings.length

  // Hard thing
  const lastWeekHard = getLastWeeksHardThing()

  // Pulses
  const allPulses = getAllPulses()
  const weekPulses = allPulses.filter((p) => p.date >= weekStart && p.date < weekEnd)
  const pulseCount = weekPulses.reduce((sum, p) => sum + p.entries.length, 0)
  const energies = weekPulses
    .flatMap((p) => p.entries)
    .filter((e) => e.energy > 0)
    .map((e) => e.energy)
  const energyAverage = energies.length > 0
    ? energies.reduce((s, e) => s + e, 0) / energies.length
    : undefined

  // Archetype
  const archetype = getCurrentArchetype()

  return {
    winsCount,
    winsExamples,
    oneThingCompleted,
    oneThingTotal,
    hardThing: lastWeekHard?.text,
    hardThingResolved: lastWeekHard?.resolved,
    hardThingOutcome: lastWeekHard?.howItWent,
    energyAverage,
    archetype: archetype?.name,
    pulseCount,
  }
}

// ---- Helpers ----

function getCachedRecap(): CachedRecap | null {
  try {
    const data = localStorage.getItem(RECAP_KEY)
    if (!data) return null
    return JSON.parse(data)
  } catch {
    return null
  }
}

function getLastWeekStartDate(): string {
  const now = new Date()
  const day = now.getDay()
  const diff = day === 0 ? 6 : day - 1
  const thisMonday = new Date(now)
  thisMonday.setDate(now.getDate() - diff)
  // Go back one more week
  const lastMonday = new Date(thisMonday)
  lastMonday.setDate(thisMonday.getDate() - 7)
  return formatDate(lastMonday)
}

function getWeekEnd(weekStart: string): string {
  const [y, m, d] = weekStart.split("-").map(Number)
  const date = new Date(y, m - 1, d)
  date.setDate(date.getDate() + 7)
  return formatDate(date)
}

function formatWeekLabel(weekStart: string): string {
  const [y, m, d] = weekStart.split("-").map(Number)
  const start = new Date(y, m - 1, d)
  const end = new Date(y, m - 1, d + 6)
  const opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" }
  return `${start.toLocaleDateString("en-US", opts)} – ${end.toLocaleDateString("en-US", opts)}`
}

function formatDate(d: Date): string {
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}
