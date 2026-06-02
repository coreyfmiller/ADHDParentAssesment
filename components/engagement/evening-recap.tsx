"use client"

import { useState, useEffect } from "react"
import { Moon, Loader2, X } from "lucide-react"
import { getTodaysWins } from "@/lib/engagement/micro-wins"
import { getOneThingHistory } from "@/lib/engagement/one-thing-interactive"
import { getAllPulses } from "@/lib/engagement/pulse-checkins"
import { getAllHeavy } from "@/lib/engagement/whats-heavy"
import { getThisWeeksHardThing } from "@/lib/engagement/whats-hard-this-week"
import { getCurrentArchetype } from "@/lib/archetypes"

const EVENING_RECAP_KEY = "mindful-mama-evening-recap"

interface CachedEveningRecap {
  date: string
  recap: string
  generatedAt: number
}

export function EveningRecap() {
  const [recap, setRecap] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const hour = new Date().getHours()

    // Only show after 6pm
    if (hour < 18) return

    const today = getToday()

    // Check if dismissed today
    try {
      const dismissedDate = localStorage.getItem("mindful-mama-evening-dismissed")
      if (dismissedDate === today) return
    } catch {}

    // Check cache
    const cached = getCachedRecap()
    if (cached && cached.date === today) {
      setRecap(cached.recap)
      return
    }

    // Check if there's enough data to generate a recap
    const wins = getTodaysWins()
    const oneThingHistory = getOneThingHistory()
    const todayOneThing = oneThingHistory.find((e) => e.date === today)
    const allPulses = getAllPulses()
    const todayPulse = allPulses.find((p) => p.date === today)

    // Need at least SOMETHING to recap
    const hasData = wins.length > 0 || todayOneThing?.completed || todayPulse?.entries?.length

    if (!hasData) return

    generateRecap(today, wins, todayOneThing, todayPulse)
  }, [])

  const generateRecap = async (
    today: string,
    wins: ReturnType<typeof getTodaysWins>,
    todayOneThing: ReturnType<typeof getOneThingHistory>[0] | undefined,
    todayPulse: ReturnType<typeof getAllPulses>[0] | undefined
  ) => {
    setIsLoading(true)
    try {
      // Gather today's data
      const allHeavy = getAllHeavy()
      const todayHeavy = allHeavy.filter(
        (e) => new Date(e.timestamp).toDateString() === new Date().toDateString()
      )

      const hardThing = getThisWeeksHardThing()
      const archetype = getCurrentArchetype()

      const body = {
        wins: wins.map((w) => w.text),
        oneThingAction: todayOneThing?.action,
        oneThingCompleted: todayOneThing?.completed || false,
        pulseEnergies: todayPulse?.entries?.map((e) => e.energy).filter((e) => e > 0) || [],
        heavyThings: todayHeavy.map((e) => e.text).slice(0, 2),
        hardThing: hardThing?.text,
        archetype: archetype?.name,
      }

      const response = await fetch("/api/coach/evening-recap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      if (response.ok) {
        const data = await response.json()
        if (data.recap) {
          setRecap(data.recap)
          // Cache
          const cached: CachedEveningRecap = {
            date: today,
            recap: data.recap,
            generatedAt: Date.now(),
          }
          try {
            localStorage.setItem(EVENING_RECAP_KEY, JSON.stringify(cached))
          } catch {}
        }
      }
    } catch {
      // Silently fail
    } finally {
      setIsLoading(false)
    }
  }

  const handleDismiss = () => {
    setDismissed(true)
    try {
      localStorage.setItem("mindful-mama-evening-dismissed", getToday())
    } catch {}
  }

  if (dismissed) return null
  if (!recap && !isLoading) return null

  return (
    <div className="bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-2xl border border-indigo-200/30 overflow-hidden shadow-sm">
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
              <Moon className="w-4 h-4 text-indigo-500" />
            </div>
            <div>
              <p className="text-xs font-medium text-indigo-600 uppercase tracking-wide">Today&apos;s evidence</p>
              <p className="text-[10px] text-muted-foreground">What you actually did</p>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="p-1 text-muted-foreground/40 hover:text-muted-foreground transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isLoading ? (
          <div className="flex items-center gap-2 py-3">
            <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />
            <span className="text-sm text-muted-foreground">Looking at your day...</span>
          </div>
        ) : (
          <p className="text-sm text-foreground/80 leading-relaxed">
            {recap}
          </p>
        )}
      </div>
    </div>
  )
}

// ---- Helpers ----

function getCachedRecap(): CachedEveningRecap | null {
  try {
    const data = localStorage.getItem(EVENING_RECAP_KEY)
    if (!data) return null
    return JSON.parse(data)
  } catch {
    return null
  }
}

function getToday(): string {
  const d = new Date()
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}
