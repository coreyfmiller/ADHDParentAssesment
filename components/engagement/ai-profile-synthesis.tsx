"use client"

import { useState, useEffect } from "react"
import { Sparkles, Loader2, Brain, Link2, Eye } from "lucide-react"
import type { PatternMap } from "@/lib/assessments/types"
import type { UserProfile } from "@/lib/assessments/profile-generator"
import { getCurrentArchetype } from "@/lib/archetypes"

const AI_SYNTHESIS_KEY = "mindful-mama-ai-profile-synthesis"

interface AISynthesis {
  deepNarrative?: string
  crossPatterns?: string[]
  personalInsight?: string
  generatedAt: number
  pathwayCount: number
}

interface AIProfileSynthesisProps {
  patternMap: PatternMap
  profile: UserProfile
}

export function AIProfileSynthesis({ patternMap, profile }: AIProfileSynthesisProps) {
  const [synthesis, setSynthesis] = useState<AISynthesis | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    // Check cache
    const cached = getCachedSynthesis()
    if (cached && cached.pathwayCount === profile.completedPathways.length) {
      setSynthesis(cached)
      return
    }

    // Need at least 2 pathways for meaningful synthesis
    if (profile.completedPathways.length < 2) return

    generateSynthesis()
  }, [profile.completedPathways.length])

  const generateSynthesis = async () => {
    setIsLoading(true)
    setError(false)

    try {
      const archetype = getCurrentArchetype()

      const body = {
        dimensions: patternMap.dimensions.map((d) => ({
          label: d.label,
          intensity: d.intensity,
          score: d.score,
          maxScore: d.maxScore,
        })),
        archetype: archetype?.name,
        completedPathways: profile.completedPathways,
        stackingChains: profile.stackingChains,
        strengths: profile.strengths,
        leveragePoints: profile.leveragePoints,
      }

      const response = await fetch("/api/coach/profile-synthesis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      if (response.ok) {
        const data = await response.json()
        if (data.deepNarrative || data.crossPatterns || data.personalInsight) {
          const newSynthesis: AISynthesis = {
            ...data,
            generatedAt: Date.now(),
            pathwayCount: profile.completedPathways.length,
          }
          setSynthesis(newSynthesis)
          try {
            localStorage.setItem(AI_SYNTHESIS_KEY, JSON.stringify(newSynthesis))
          } catch {}
        }
      } else {
        setError(true)
      }
    } catch {
      setError(true)
    } finally {
      setIsLoading(false)
    }
  }

  if (error || (!synthesis && !isLoading)) return null

  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-primary/5 to-indigo-500/5 rounded-3xl p-8 border border-primary/15 shadow-sm">
        <div className="flex items-center gap-3">
          <Loader2 className="w-5 h-5 text-primary animate-spin" />
          <span className="text-sm text-muted-foreground">Synthesizing your patterns...</span>
        </div>
      </div>
    )
  }

  if (!synthesis) return null

  return (
    <div className="space-y-6">
      {/* Deep Narrative — The "someone finally gets it" moment */}
      {synthesis.deepNarrative && (
        <div className="bg-gradient-to-br from-primary/5 to-indigo-500/5 rounded-3xl p-8 md:p-10 border border-primary/15 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-foreground">What Your Patterns Tell Us</h2>
              <p className="text-[10px] text-muted-foreground">AI-generated from your {profile.completedPathways.length} pathway responses</p>
            </div>
          </div>
          <p className="text-foreground/80 leading-relaxed text-base">
            {synthesis.deepNarrative}
          </p>
        </div>
      )}

      {/* Cross-Pattern Insights — The connections she can't see from inside */}
      {synthesis.crossPatterns && synthesis.crossPatterns.length > 0 && (
        <div className="bg-card rounded-3xl p-8 shadow-sm border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Link2 className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-medium text-foreground">Hidden Connections</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Patterns you might not see because you&apos;re inside them. These are how your dimensions interact below the surface.
          </p>
          <div className="space-y-4">
            {synthesis.crossPatterns.map((pattern, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-4 bg-secondary/20 rounded-xl border border-border/50"
              >
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Brain className="w-3 h-3 text-primary" />
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed">{pattern}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Personal Insight — The one sentence that makes her feel seen */}
      {synthesis.personalInsight && (
        <div className="bg-card rounded-3xl p-8 shadow-sm border border-primary/10">
          <div className="flex items-center gap-2 mb-4">
            <Eye className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-medium text-foreground">One More Thing</h2>
          </div>
          <p className="text-foreground text-base leading-relaxed italic">
            &quot;{synthesis.personalInsight}&quot;
          </p>
          <p className="text-xs text-muted-foreground mt-4">
            This observation is generated from the patterns in your responses — not a diagnosis or clinical judgment.
          </p>
        </div>
      )}
    </div>
  )
}

// ---- Helpers ----

function getCachedSynthesis(): AISynthesis | null {
  try {
    const data = localStorage.getItem(AI_SYNTHESIS_KEY)
    if (!data) return null
    return JSON.parse(data)
  } catch {
    return null
  }
}
