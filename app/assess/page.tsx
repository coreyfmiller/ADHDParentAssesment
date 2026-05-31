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
  Lock,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { PATHWAYS } from "@/lib/assessments/types"
import type { PatternMap } from "@/lib/assessments/types"

const iconMap: Record<string, React.ElementType> = {
  Brain,
  Battery,
  Volume2,
  Moon,
  CloudMoon,
  Shield,
  Users,
}

const STORAGE_KEY = "mindful-mama-pattern-map"

export default function AssessHub() {
  const [patternMap, setPatternMap] = useState<PatternMap | null>(null)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setPatternMap(JSON.parse(stored))
      }
    } catch {}
  }, [])

  const hasCompletedSnapshot = patternMap !== null

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo2.png" alt="Mindful Mama" width={120} height={32} className="h-8 w-auto" priority />
          </Link>
          {hasCompletedSnapshot && (
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              My Toolkit
            </Link>
          )}
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8 md:py-12 space-y-8">
        {/* Hero */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-medium text-foreground text-balance leading-tight">
            Understand what&apos;s actually going on
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            It&apos;s rarely just one thing. These self-reflection tools help you see where your energy is going, what&apos;s stacking up, and what to do about it.
          </p>
        </div>

        {/* Check-In — Entry Point */}
        <div className="bg-card rounded-3xl p-8 md:p-10 shadow-sm border border-border">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-medium text-foreground">Check In With Yourself</h2>
                {hasCompletedSnapshot && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 text-xs font-medium">
                    <CheckCircle2 className="w-3 h-3" />
                    Completed
                  </span>
                )}
              </div>
              <p className="text-muted-foreground mb-4">
                Start here. A 5-minute check-in that maps your current state across five dimensions — cognitive load, emotional bandwidth, physical depletion, system friction, and identity. This tells you which deeper pathways will be most useful for you.
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
                  {hasCompletedSnapshot ? "Check In Again" : "Start My Check-In"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Pattern Map Results (if completed) */}
        {hasCompletedSnapshot && patternMap && (
          <div className="bg-card rounded-3xl p-8 shadow-sm border border-primary/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-foreground">Your Pattern Map</h3>
              <Link
                href="/assess/summary"
                className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
              >
                View Full Picture →
              </Link>
              <Link
                href="/assess/profile"
                className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
              >
                My Profile →
              </Link>
            </div>
            <div className="space-y-3 mb-6">
              {patternMap.dimensions.map((dim) => (
                <div key={dim.dimension} className="space-y-1.5">
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
                </div>
              ))}
            </div>

            {/* Recommended Pathways */}
            {patternMap.recommendedPathways.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-primary uppercase tracking-wide mb-3">
                  Recommended for you
                </h4>
                <div className="space-y-2">
                  {patternMap.recommendedPathways.map((rec) => (
                    <div key={rec.pathwayId} className="bg-primary/5 rounded-xl p-4 border border-primary/10">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-foreground">{rec.title}</span>
                        {rec.priority === "high" && (
                          <span className="text-xs px-1.5 py-0.5 rounded bg-red-500/10 text-red-600 font-medium">
                            Priority
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{rec.reason}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Pathway Grid */}
        <div>
          <h2 className="text-xl font-medium text-foreground mb-2">Deeper Pathways</h2>
          <p className="text-muted-foreground text-sm mb-6">
            Each pathway explores a specific dimension of your experience. Start with the check-in to see which ones are most relevant for you — or explore any that resonate.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PATHWAYS.map((pathway) => {
              const Icon = iconMap[pathway.icon] || Brain
              const isRecommended = patternMap?.recommendedPathways.some(
                (r) => r.pathwayId === pathway.id
              )

              return (
                <div
                  key={pathway.id}
                  className={`bg-card rounded-2xl p-6 border transition-all ${
                    pathway.available
                      ? "border-border hover:border-primary/30 hover:shadow-sm"
                      : "border-border/50 opacity-60"
                  } ${isRecommended ? "ring-2 ring-primary/20" : ""}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl ${pathway.color} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-medium text-foreground truncate">{pathway.title}</h3>
                        {isRecommended && (
                          <span className="flex-shrink-0 w-2 h-2 rounded-full bg-primary" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">{pathway.subtitle}</p>
                      <div className="flex items-center gap-2">
                        {pathway.available ? (
                          <Link
                            href={`/assess/pathway/${pathway.slug}`}
                            className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                          >
                            Begin reflection
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                            <Lock className="w-3 h-3" />
                            Coming soon
                          </span>
                        )}
                        <span className="text-xs text-muted-foreground ml-auto">
                          {pathway.estimatedMinutes} min
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* How this works */}
        <div className="bg-secondary/30 rounded-2xl p-6 border border-border/50">
          <h3 className="text-sm font-medium text-foreground mb-3">How this works</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              <strong className="text-foreground">1. Start with the Snapshot.</strong> It takes 5 minutes and maps where your energy is leaking.
            </p>
            <p>
              <strong className="text-foreground">2. Explore your recommended pathways.</strong> Based on your pattern map, we&apos;ll suggest which deeper reflections will be most useful.
            </p>
            <p>
              <strong className="text-foreground">3. Get matched strategies.</strong> Each pathway gives you concrete, low-friction strategies tailored to your specific patterns.
            </p>
            <p>
              <strong className="text-foreground">4. Come back as life changes.</strong> Your patterns shift with seasons, hormones, and life stages. Retake anytime.
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-muted-foreground/70 text-center leading-relaxed max-w-xl mx-auto">
          These tools are for self-reflection and educational purposes only. They are not diagnostic instruments or substitutes for professional care. If you&apos;re struggling, please reach out to a qualified healthcare provider.
        </p>
      </div>
    </main>
  )
}
