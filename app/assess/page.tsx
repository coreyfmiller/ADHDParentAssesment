"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Brain,
  Battery,
  Volume2,
  Moon,
  CloudMoon,
  Shield,
  Users,
  ArrowRight,
  CheckCircle2,
  Circle,
  Sparkles,
  Heart,
  Zap,
  Fingerprint,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { PATHWAYS } from "@/lib/assessments/types"
import type { PatternMap } from "@/lib/assessments/types"
import { DimensionExplainerModal } from "@/components/dimension-explainer-modal"

const iconMap: Record<string, React.ElementType> = {
  Brain,
  Battery,
  Volume2,
  Moon,
  CloudMoon,
  Shield,
  Users,
  Heart,
  Zap,
  Fingerprint,
}

const pathwayImages: Record<string, string> = {
  "executive-function": "/images/mind2.png",
  "depletion-burnout": "/images/battery.png",
  "sensory-overwhelm": "/images/flowing5.png",
  "hormonal-patterns": "/images/hormonal.png",
  "sleep-recovery": "/images/moon.png",
  "trauma-nervous-system": "/images/nervoussystem2.png",
  "systemic-load": "/images/systemic.png",
  "attachment-relationships": "/images/attachment.png",
  "self-worth-inner-critic": "/images/critic.png",
  "rage-emotional-dysregulation": "/images/rage.png",
  "matrescence-identity": "/images/butterfly.png",
  "social-connection-isolation": "/images/social.png",
}

const STORAGE_KEY = "mindful-mama-pattern-map"

export default function AssessHub() {
  const [patternMap, setPatternMap] = useState<PatternMap | null>(null)
  const [completedSlugs, setCompletedSlugs] = useState<Set<string>>(new Set())
  const [selectedDimension, setSelectedDimension] = useState<string | null>(null)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setPatternMap(JSON.parse(stored))
      }
    } catch {}

    const completed = new Set<string>()
    for (const p of PATHWAYS) {
      try {
        if (localStorage.getItem(`mindful-mama-pathway-result-${p.slug}`)) {
          completed.add(p.slug)
        }
      } catch {}
    }
    setCompletedSlugs(completed)
  }, [])

  const hasCompletedSnapshot = patternMap !== null
  const completedCount = completedSlugs.size
  const nextMilestone = completedCount < 3 ? 3 : completedCount < 6 ? 6 : 12
  const nextMilestoneLabel = nextMilestone === 3 ? "First Insight" : nextMilestone === 6 ? "Mid-Point Portrait" : "Full Portrait + Archetype"

  // Find the most relevant uncompleted reflection
  const nextRecommended = patternMap?.recommendedPathways?.find(
    r => {
      const pathway = PATHWAYS.find(p => p.id === r.pathwayId)
      return pathway && !completedSlugs.has(pathway.slug)
    }
  )
  const nextRecommendedPathway = nextRecommended ? PATHWAYS.find(p => p.id === nextRecommended.pathwayId) : null

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo2.png" alt="Mindful Mama" width={120} height={32} className="h-8 w-auto" priority />
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            My Toolkit
          </Link>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8 md:py-12 space-y-8">
        {/* Hero */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-medium text-foreground text-balance leading-tight">
            {hasCompletedSnapshot ? "Your Reflections" : "Understand what\u0027s actually going on"}
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            {hasCompletedSnapshot
              ? "Each reflection deepens the picture. At 3, 6, and 12 — new insights unlock."
              : "A 5-minute check-in maps your current state. Then go deeper through reflections that build toward your full portrait."
            }
          </p>
        </div>

        {/* Check-In CTA — only shows if NOT completed */}
        {!hasCompletedSnapshot && (
          <div className="bg-card rounded-3xl p-8 md:p-10 shadow-sm border border-border">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-medium text-foreground mb-1">Check In With Yourself</h2>
                <p className="text-muted-foreground mb-4">
                  A 5-minute check-in that maps your current state across five dimensions — cognitive load, emotional bandwidth, physical depletion, system friction, and identity. This tells you where to go deeper.
                </p>
                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                  <span>5 minutes</span>
                  <span>·</span>
                  <span>15 questions</span>
                  <span>·</span>
                  <span>Zero judgment</span>
                </div>
                <Link href="/assess/snapshot">
                  <Button className="rounded-xl">
                    Start My Check-In
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Pattern Map (if completed) */}
        {hasCompletedSnapshot && patternMap && (
          <div className="bg-card rounded-2xl p-6 border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-medium text-foreground">Your Pattern Map</h3>
              <Link href="/assess/snapshot" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Retake →
              </Link>
            </div>
            <div className="space-y-3 mb-4">
              {patternMap.dimensions.map((dim) => (
                <button
                  key={dim.dimension}
                  onClick={() => setSelectedDimension(dim.dimension)}
                  className="w-full space-y-1.5 text-left hover:bg-secondary/30 rounded-lg p-2 -mx-2 transition-colors"
                >
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground">{dim.label}</span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      dim.intensity === "critical" ? "bg-red-500/10 text-red-600" :
                      dim.intensity === "high" ? "bg-amber-500/10 text-amber-600" :
                      dim.intensity === "moderate" ? "bg-yellow-500/10 text-yellow-700" :
                      "bg-green-500/10 text-green-600"
                    }`}>
                      {dim.intensity}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        dim.intensity === "critical" ? "bg-red-500" :
                        dim.intensity === "high" ? "bg-amber-500" :
                        dim.intensity === "moderate" ? "bg-yellow-500" :
                        "bg-green-500"
                      }`}
                      style={{ width: `${(dim.score / dim.maxScore) * 100}%` }}
                    />
                  </div>
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">Tap any dimension to learn what it means and what helps.</p>
          </div>
        )}

        {/* Progress + Next Step */}
        {hasCompletedSnapshot && (
          <div className="bg-gradient-to-br from-primary/5 to-indigo-500/5 rounded-2xl p-6 border border-primary/10">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-medium text-foreground">Progress</h3>
              <span className="text-sm font-medium text-primary">{completedCount}/12 reflections</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden mb-3">
              <div
                className="h-full bg-primary/70 rounded-full transition-all duration-500"
                style={{ width: `${(completedCount / 12) * 100}%` }}
              />
            </div>
            {/* Milestones */}
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
              <span className={completedCount >= 3 ? "text-primary font-medium" : ""}>3 — First Insight</span>
              <span className={completedCount >= 6 ? "text-primary font-medium" : ""}>6 — Mid-Portrait</span>
              <span className={completedCount >= 12 ? "text-primary font-medium" : ""}>12 — Full Unlock</span>
            </div>
            {/* Next action */}
            {completedCount < 12 && (
              <div className="bg-card/50 rounded-xl p-4 border border-border/50">
                <p className="text-xs text-muted-foreground mb-1">Next unlock: <span className="font-medium text-foreground">{nextMilestoneLabel}</span> ({nextMilestone - completedCount} more)</p>
                {nextRecommendedPathway ? (
                  <Link
                    href={`/assess/pathway/${nextRecommendedPathway.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 mt-1"
                  >
                    Start: {nextRecommendedPathway.title} <ArrowRight className="w-3 h-3" />
                  </Link>
                ) : (
                  <Link
                    href={`/assess/pathway/${PATHWAYS.find(p => !completedSlugs.has(p.slug))?.slug || "executive-function"}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 mt-1"
                  >
                    Continue reflections <ArrowRight className="w-3 h-3" />
                  </Link>
                )}
              </div>
            )}
            {completedCount >= 12 && (
              <div className="bg-card/50 rounded-xl p-4 border border-primary/20 text-center">
                <Sparkles className="w-5 h-5 text-primary mx-auto mb-1" />
                <p className="text-sm font-medium text-foreground">All reflections complete</p>
                <Link href="/dashboard/me" className="text-xs text-primary hover:text-primary/80 mt-1 inline-block">
                  View your full portrait + archetype →
                </Link>
              </div>
            )}
          </div>
        )}

        {/* All 12 Reflections — shows completed AND remaining */}
        {hasCompletedSnapshot && (
          <div>
            <h2 className="text-xl font-medium text-foreground mb-2">All Reflections</h2>
            <p className="text-sm text-muted-foreground mb-5">
              Each one deepens your portrait. Complete them in any order — retake anytime as your patterns shift.
            </p>

            <div className="space-y-3">
              {PATHWAYS.map((pathway) => {
                const isCompleted = completedSlugs.has(pathway.slug)
                const isRecommended = patternMap?.recommendedPathways.some(r => r.pathwayId === pathway.id) && !isCompleted
                const Icon = iconMap[pathway.icon] || Brain

                return (
                  <Link
                    key={pathway.id}
                    href={`/assess/pathway/${pathway.slug}`}
                    className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                      isCompleted
                        ? "bg-green-500/[0.03] border-green-500/20"
                        : isRecommended
                          ? "bg-primary/[0.03] border-primary/20 hover:border-primary/40"
                          : "bg-card border-border hover:border-primary/20"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isCompleted ? "bg-green-500/10" : isRecommended ? "bg-primary/10" : "bg-secondary"
                    }`}>
                      <Icon className={`w-5 h-5 ${
                        isCompleted ? "text-green-600" : isRecommended ? "text-primary" : "text-muted-foreground"
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-medium text-foreground">{pathway.title}</h3>
                        {isRecommended && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium">Recommended</span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">{pathway.subtitle}</p>
                    </div>
                    <div className="flex-shrink-0">
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <span>{pathway.estimatedMinutes} min</span>
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}

        {/* How it works — for new users */}
        {!hasCompletedSnapshot && (
          <div className="bg-secondary/30 rounded-2xl p-6 border border-border/50">
            <h3 className="text-sm font-medium text-foreground mb-3">How this works</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p><strong className="text-foreground">1. Start with the Check-In.</strong> 5 minutes to map where your energy is going.</p>
              <p><strong className="text-foreground">2. Explore reflections.</strong> Go deeper into specific dimensions at your own pace.</p>
              <p><strong className="text-foreground">3. Unlock insights as you go.</strong> At 3, 6, and 12 reflections — new understanding unlocks.</p>
              <p><strong className="text-foreground">4. Come back as life changes.</strong> Your patterns shift. Retake anytime.</p>
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <p className="text-xs text-muted-foreground/70 text-center leading-relaxed max-w-xl mx-auto">
          These tools are for self-reflection and educational purposes only. They are not diagnostic instruments or substitutes for professional care. If you are in crisis, contact 988 (Suicide &amp; Crisis Lifeline) or your local emergency services.
        </p>
      </div>

      {/* Dimension Explainer Modal */}
      {selectedDimension && (
        <DimensionExplainerModal
          dimension={selectedDimension}
          onClose={() => setSelectedDimension(null)}
        />
      )}
    </main>
  )
}
