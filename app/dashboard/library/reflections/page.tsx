"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Brain, Battery, Volume2, Moon, CloudMoon, Shield, Users, Heart, Zap, Fingerprint, BookOpen } from "lucide-react"
import { PATHWAYS } from "@/lib/assessments/types"
import { BookmarkButton } from "@/components/bookmark-button"

const iconMap: Record<string, React.ElementType> = {
  Brain, Battery, Volume2, Moon, CloudMoon, Shield, Users, Heart, Zap, Fingerprint,
}

interface PathwayResult {
  pathwayId: string
  slug: string
  title: string
  answers: Record<string, string>
  completedAt: number
}

export default function ReflectionsPage() {
  const [results, setResults] = useState<PathwayResult[]>([])
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    const loaded: PathwayResult[] = []
    for (const p of PATHWAYS) {
      try {
        const data = localStorage.getItem(`mindful-mama-pathway-result-${p.slug}`)
        if (data) {
          const parsed = JSON.parse(data)
          loaded.push({
            pathwayId: p.id,
            slug: p.slug,
            title: p.title,
            answers: parsed.answers || {},
            completedAt: parsed.completedAt || 0,
          })
        }
      } catch {}
    }
    setResults(loaded.sort((a, b) => b.completedAt - a.completedAt))
  }, [])

  if (results.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <Link href="/dashboard/library" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Library
          </Link>
          <h1 className="text-2xl font-medium text-foreground mb-2">Your Reflections</h1>
          <p className="text-muted-foreground">
            Complete pathways to see your reflection results here. They&apos;re saved permanently — you can always come back.
          </p>
        </div>
        <div className="bg-card rounded-2xl p-8 border border-border text-center">
          <BookOpen className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">No reflections completed yet.</p>
          <Link href="/assess" className="text-sm text-primary hover:text-primary/80 mt-2 inline-block">
            Start a pathway →
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <Link href="/dashboard/library" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Library
        </Link>
        <h1 className="text-2xl font-medium text-foreground mb-2">Your Reflections</h1>
        <p className="text-muted-foreground">
          Every pathway you&apos;ve explored — your answers preserved. Tap to revisit what you shared.
        </p>
      </div>

      <div className="space-y-3">
        {results.map((result) => {
          const pathway = PATHWAYS.find((p) => p.id === result.pathwayId)
          if (!pathway) return null
          const Icon = iconMap[pathway.icon] || Brain
          const isExpanded = expanded === result.pathwayId
          const date = new Date(result.completedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })

          return (
            <div key={result.pathwayId} className="bg-card rounded-2xl border border-border overflow-hidden">
              <button
                onClick={() => setExpanded(isExpanded ? null : result.pathwayId)}
                className="w-full p-5 text-left flex items-center gap-3 hover:bg-secondary/20 transition-colors"
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${pathway.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-foreground">{result.title}</h3>
                  <p className="text-xs text-muted-foreground">Completed {date} · {Object.keys(result.answers).length} responses</p>
                </div>
                <span className="text-xs text-primary">{isExpanded ? "Hide" : "View"}</span>
              </button>

              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t border-border/50 space-y-3 animate-in fade-in duration-200">
                  {Object.entries(result.answers).map(([questionId, answer]) => (
                    <div key={questionId} className="flex items-start gap-2 group">
                      <div className="flex-1 bg-secondary/20 rounded-xl p-3">
                        <p className="text-xs text-muted-foreground mb-0.5">{questionId}</p>
                        <p className="text-sm text-foreground/80">{answer}</p>
                      </div>
                      <BookmarkButton
                        type="pathway-insight"
                        title={`${result.title}: ${questionId}`}
                        content={answer}
                        source={result.title}
                        href={`/assess/pathway/${result.slug}`}
                      />
                    </div>
                  ))}
                  <Link
                    href={`/assess/pathway/${result.slug}`}
                    className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 mt-2"
                  >
                    Retake this pathway →
                  </Link>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
