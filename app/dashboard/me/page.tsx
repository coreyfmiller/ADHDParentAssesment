"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  ArrowRight,
  RotateCcw,
  Share2,
  Fingerprint,
  Brain,
  Battery,
  Heart,
  Users,
  Sparkles,
  Loader2,
  Moon,
  Shield,
  Mail,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { getCurrentArchetype, getArchetypeHistory, ARCHETYPES, determineArchetype, saveArchetype } from "@/lib/archetypes"
import { ArchetypeCard } from "@/components/archetype-card"
import { PatternMapFlower } from "@/components/pattern-map-flower"
import { getCoachMemory } from "@/lib/coach-memory"
import { getAllWins } from "@/lib/engagement/micro-wins"
import { getAllHeavy } from "@/lib/engagement/whats-heavy"
import { getAllPulses } from "@/lib/engagement/pulse-checkins"
import { getAllHardThings } from "@/lib/engagement/whats-hard-this-week"
import { getActivityData, getActivitySummary } from "@/lib/engagement/activity-heatmap"
import type { Archetype, ArchetypeRecord } from "@/lib/archetypes"
import type { PatternMap } from "@/lib/assessments/types"
import { MilestoneHistory } from "@/components/engagement/milestone-history"

const PORTRAIT_KEY = "mindful-mama-deep-portrait"

interface Portrait {
  nervoussystem?: string
  capacityrhythm?: string
  relationalpattern?: string
  identitytruth?: string
  parentingpattern?: string
  season?: string
  futureletter?: string
  generatedAt: number
}

export default function MePage() {
  const [archetype, setArchetype] = useState<Archetype | null>(null)
  const [patternMap, setPatternMap] = useState<PatternMap | null>(null)
  const [history, setHistory] = useState<ArchetypeRecord[]>([])
  const [portrait, setPortrait] = useState<Portrait | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [coachMemory, setCoachMemory] = useState({ facts: [] as string[], patterns: [] as string[], strategies: [] as string[] })
  const [stats, setStats] = useState({ daysActive: 0, totalWins: 0, avgEnergy: null as number | null })

  useEffect(() => {
    let arch: Archetype | null = null
    let map: PatternMap | null = null

    try {
      const mapData = localStorage.getItem("mindful-mama-pattern-map")
      if (mapData) {
        map = JSON.parse(mapData) as PatternMap
        setPatternMap(map)
      }
    } catch {}

    arch = getCurrentArchetype()
    if (!arch && map) {
      arch = determineArchetype(map)
      saveArchetype(arch)
    }
    setArchetype(arch)
    setHistory(getArchetypeHistory())

    // Load coach memory
    const memory = getCoachMemory()
    setCoachMemory(memory)

    // Calculate stats
    const activityData = getActivityData(90)
    const summary = getActivitySummary(activityData)
    const allWins = getAllWins()
    const totalWins = allWins.reduce((sum, d) => sum + d.wins.length, 0)
    const allPulses = getAllPulses()
    const energies = allPulses.flatMap(p => p.entries).filter(e => e.energy > 0).map(e => e.energy)
    const avgEnergy = energies.length > 0 ? energies.reduce((s, e) => s + e, 0) / energies.length : null

    setStats({ daysActive: summary.activeDays, totalWins, avgEnergy })

    // Load cached portrait
    try {
      const cached = localStorage.getItem(PORTRAIT_KEY)
      if (cached) setPortrait(JSON.parse(cached))
    } catch {}
  }, [])

  const generatePortrait = async () => {
    if (!patternMap) return
    setIsGenerating(true)

    try {
      const allWins = getAllWins()
      const recentWins = allWins.slice(-7).flatMap(d => d.wins.map(w => w.text)).slice(-10)
      const allHeavy = getAllHeavy()
      const recentHeavy = allHeavy.slice(-5).map((e: { text: string }) => e.text)
      const allPulses = getAllPulses()
      const energies = allPulses.flatMap(p => p.entries).filter(e => e.energy > 0).map(e => e.energy)
      const avgEnergy = energies.length > 0 ? energies.reduce((s, e) => s + e, 0) / energies.length : null

      let energyTrend = "stable"
      if (energies.length >= 6) {
        const recent = energies.slice(-3).reduce((s, e) => s + e, 0) / 3
        const earlier = energies.slice(-6, -3).reduce((s, e) => s + e, 0) / 3
        if (recent > earlier + 0.3) energyTrend = "improving"
        else if (recent < earlier - 0.3) energyTrend = "declining"
      }

      const hardThings = getAllHardThings().slice(-4).map(h => h.text)
      const { PATHWAYS } = await import("@/lib/assessments/types")
      const completedPathways: string[] = []
      for (const p of PATHWAYS) {
        try {
          if (localStorage.getItem(`mindful-mama-pathway-result-${p.slug}`)) {
            completedPathways.push(p.title)
          }
        } catch {}
      }

      const response = await fetch("/api/coach/deep-portrait", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dimensions: patternMap.dimensions.map(d => ({ label: d.label, intensity: d.intensity, score: d.score, maxScore: d.maxScore })),
          archetype: archetype?.name,
          completedPathways,
          coachMemory,
          recentWins,
          recentHeavy,
          energyTrend,
          avgEnergy,
          hardThings,
          daysActive: stats.daysActive,
          totalWins: stats.totalWins,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        const newPortrait: Portrait = { ...data, generatedAt: Date.now() }
        setPortrait(newPortrait)
        try { localStorage.setItem(PORTRAIT_KEY, JSON.stringify(newPortrait)) } catch {}
      }
    } catch {}
    setIsGenerating(false)
  }

  if (!archetype) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <Fingerprint className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-medium text-foreground mb-3">About You</h1>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Complete the check-in to build your personal profile. The more you share, the deeper this portrait becomes.
          </p>
          <Link href="/assess/snapshot">
            <Button className="rounded-xl">
              Take the Check-In
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-medium text-foreground mb-1">About You</h1>
        <p className="text-muted-foreground">
          Everything this app knows about you — reflected back with care.
        </p>
      </div>

      {/* Archetype + Pattern Map side by side on larger screens */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-start">
        <ArchetypeCard archetype={archetype} showFull />
        {patternMap && (
          <div className="bg-card rounded-2xl border border-border p-4 flex flex-col items-center justify-center">
            <p className="text-xs text-muted-foreground mb-1">Your pattern shape</p>
            <PatternMapFlower dimensions={patternMap.dimensions} size={100} />
          </div>
        )}
      </div>

      {/* Generate / Refresh Portrait CTA */}
      {!portrait && patternMap && (
        <div className="bg-gradient-to-br from-primary/5 to-indigo-500/5 rounded-2xl p-6 border border-primary/15 text-center">
          <Sparkles className="w-8 h-8 text-primary mx-auto mb-3" />
          <h2 className="text-lg font-medium text-foreground mb-2">Generate Your Portrait</h2>
          <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
            Based on your assessment, daily interactions, and coach conversations — a personalized psychological portrait that shows you who you are underneath the overwhelm.
          </p>
          <Button onClick={generatePortrait} disabled={isGenerating} className="rounded-xl">
            {isGenerating ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating...</> : <><Sparkles className="w-4 h-4 mr-2" /> Build My Portrait</>}
          </Button>
        </div>
      )}

      {isGenerating && (
        <div className="bg-card rounded-2xl p-8 border border-border text-center">
          <Loader2 className="w-6 h-6 text-primary mx-auto mb-3 animate-spin" />
          <p className="text-sm text-muted-foreground">Reading your patterns. This takes a moment...</p>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════
          THE PORTRAIT — Her psychological reflection
         ═══════════════════════════════════════════════════════ */}
      {portrait && (
        <div className="space-y-5">

          {/* Nervous System Profile */}
          {portrait.nervoussystem && (
            <section className="bg-card rounded-2xl p-6 border border-border">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center">
                  <Brain className="w-4 h-4 text-violet-600" />
                </div>
                <h2 className="text-base font-medium text-foreground">Your Nervous System</h2>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed">{portrait.nervoussystem}</p>
            </section>
          )}

          {/* Capacity Rhythm */}
          {portrait.capacityrhythm && (
            <section className="bg-card rounded-2xl p-6 border border-border">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <Battery className="w-4 h-4 text-amber-600" />
                </div>
                <h2 className="text-base font-medium text-foreground">Your Capacity Rhythm</h2>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed">{portrait.capacityrhythm}</p>
            </section>
          )}

          {/* Relational Pattern */}
          {portrait.relationalpattern && (
            <section className="bg-card rounded-2xl p-6 border border-border">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-pink-500/10 flex items-center justify-center">
                  <Users className="w-4 h-4 text-pink-600" />
                </div>
                <h2 className="text-base font-medium text-foreground">How You Relate Under Stress</h2>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed">{portrait.relationalpattern}</p>
            </section>
          )}

          {/* Identity Truth */}
          {portrait.identitytruth && (
            <section className="bg-card rounded-2xl p-6 border border-border">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                  <Fingerprint className="w-4 h-4 text-indigo-600" />
                </div>
                <h2 className="text-base font-medium text-foreground">Who You Are Underneath</h2>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed">{portrait.identitytruth}</p>
            </section>
          )}

          {/* Parenting Pattern */}
          {portrait.parentingpattern && (
            <section className="bg-card rounded-2xl p-6 border border-border">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center">
                  <Heart className="w-4 h-4 text-rose-600" />
                </div>
                <h2 className="text-base font-medium text-foreground">Your Parenting Pattern</h2>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed">{portrait.parentingpattern}</p>
            </section>
          )}

          {/* Current Season */}
          {portrait.season && (
            <section className="bg-card rounded-2xl p-6 border border-border">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center">
                  <Moon className="w-4 h-4 text-teal-600" />
                </div>
                <h2 className="text-base font-medium text-foreground">Your Current Season</h2>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed">{portrait.season}</p>
            </section>
          )}

          {/* Letter From Future Self */}
          {portrait.futureletter && (
            <section className="bg-gradient-to-br from-primary/5 to-indigo-500/5 rounded-2xl p-6 border border-primary/15">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <h2 className="text-base font-medium text-foreground">A Letter From Future You</h2>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed italic">{portrait.futureletter}</p>
            </section>
          )}

          {/* Regenerate option */}
          <div className="text-center pt-2">
            <button
              onClick={generatePortrait}
              disabled={isGenerating}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {isGenerating ? "Generating..." : "Regenerate portrait (uses latest data)"}
            </button>
          </div>
        </div>
      )}

      {/* What Your Coach Knows */}
      {(coachMemory.facts.length > 0 || coachMemory.patterns.length > 0) && (
        <section className="bg-card rounded-2xl p-6 border border-border">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
              <Shield className="w-4 h-4 text-muted-foreground" />
            </div>
            <div>
              <h2 className="text-base font-medium text-foreground">What Your Coach Remembers</h2>
              <p className="text-[10px] text-muted-foreground">From your conversations — used to personalize support</p>
            </div>
          </div>
          <div className="space-y-3">
            {coachMemory.facts.length > 0 && (
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5">About your life</p>
                <div className="space-y-1">
                  {coachMemory.facts.map((fact, i) => (
                    <p key={i} className="text-sm text-foreground/70 pl-3 border-l-2 border-border">{fact}</p>
                  ))}
                </div>
              </div>
            )}
            {coachMemory.patterns.length > 0 && (
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5">Patterns noticed</p>
                <div className="space-y-1">
                  {coachMemory.patterns.map((pattern, i) => (
                    <p key={i} className="text-sm text-foreground/70 pl-3 border-l-2 border-primary/20">{pattern}</p>
                  ))}
                </div>
              </div>
            )}
            {coachMemory.strategies.length > 0 && (
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5">Strategies discussed</p>
                <div className="space-y-1">
                  {coachMemory.strategies.map((s, i) => (
                    <p key={i} className="text-sm text-foreground/70 pl-3 border-l-2 border-green-500/20">{s}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Your Numbers */}
      <section className="bg-card rounded-2xl p-6 border border-border">
        <h2 className="text-base font-medium text-foreground mb-4">Your Evidence</h2>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-secondary/20 rounded-xl p-3 text-center">
            <p className="text-xl font-medium text-foreground">{stats.daysActive}</p>
            <p className="text-[10px] text-muted-foreground">days active</p>
          </div>
          <div className="bg-secondary/20 rounded-xl p-3 text-center">
            <p className="text-xl font-medium text-foreground">{stats.totalWins}</p>
            <p className="text-[10px] text-muted-foreground">wins logged</p>
          </div>
          <div className="bg-secondary/20 rounded-xl p-3 text-center">
            <p className="text-xl font-medium text-foreground">{stats.avgEnergy ? stats.avgEnergy.toFixed(1) : "—"}</p>
            <p className="text-[10px] text-muted-foreground">avg energy</p>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <MilestoneHistory />

      {/* Type History */}
      {history.length > 1 && (
        <section className="bg-card rounded-2xl border border-border p-5">
          <h2 className="text-sm font-medium text-foreground mb-3">Your type over time</h2>
          <div className="space-y-2">
            {history.slice().reverse().map((record, i) => {
              const arch = ARCHETYPES[record.archetypeId]
              if (!arch) return null
              const date = new Date(record.determinedAt).toLocaleDateString("en-US", {
                month: "short", day: "numeric", year: "numeric",
              })
              return (
                <div
                  key={i}
                  className={`flex items-center justify-between py-2 px-3 rounded-xl ${
                    i === 0 ? "bg-primary/5 border border-primary/10" : "bg-secondary/20"
                  }`}
                >
                  <div>
                    <span className="text-sm font-medium text-foreground">{arch.name}</span>
                    {i === 0 && <span className="text-xs text-primary ml-2">Current</span>}
                  </div>
                  <span className="text-xs text-muted-foreground">{date}</span>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Link href="/dashboard">
          <Button variant="outline" className="w-full rounded-xl">
            <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
            Back to Toolkit
          </Button>
        </Link>
        <Link href="/assess/snapshot">
          <Button variant="outline" className="w-full rounded-xl">
            <RotateCcw className="w-4 h-4 mr-2" />
            Check in again
          </Button>
        </Link>
        <Link href="/dashboard/share">
          <Button variant="outline" className="w-full rounded-xl">
            <Share2 className="w-4 h-4 mr-2" />
            Share my type
          </Button>
        </Link>
        <Link href="/dashboard/share/partner">
          <Button variant="outline" className="w-full rounded-xl">
            <Heart className="w-4 h-4 mr-2" />
            Share with my partner
          </Button>
        </Link>
      </div>

      {/* Disclaimer */}
      <p className="text-[10px] text-muted-foreground/60 text-center leading-relaxed max-w-md mx-auto">
        This portrait is generated from your self-reflection responses for educational purposes only. It is not a clinical assessment, diagnosis, or treatment plan. If you need professional support, please reach out to a qualified healthcare provider.
      </p>
    </div>
  )
}
