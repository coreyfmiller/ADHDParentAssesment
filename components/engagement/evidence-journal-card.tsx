"use client"

import { useState, useEffect } from "react"
import { BookOpen, TrendingUp, TrendingDown, Minus, Activity, Award } from "lucide-react"
import { generateWeeklyEvidence, getAllEvidence } from "@/lib/engagement/evidence-journal"
import type { WeeklyEvidence } from "@/lib/engagement/types"
import type { PatternMap } from "@/lib/assessments/types"

interface EvidenceJournalCardProps {
  patternMap: PatternMap | null
}

const trendIcons: Record<string, React.ElementType> = {
  improving: TrendingUp,
  declining: TrendingDown,
  stable: Minus,
  fluctuating: Activity,
}

const trendLabels: Record<string, string> = {
  improving: "Energy trending up",
  declining: "Energy dipped",
  stable: "Energy steady",
  fluctuating: "Energy fluctuating",
}

const trendColors: Record<string, string> = {
  improving: "text-green-600",
  declining: "text-amber-600",
  stable: "text-muted-foreground",
  fluctuating: "text-indigo-600",
}

export function EvidenceJournalCard({ patternMap }: EvidenceJournalCardProps) {
  const [evidence, setEvidence] = useState<WeeklyEvidence | null>(null)
  const [allEvidence, setAllEvidence] = useState<WeeklyEvidence[]>([])
  const [showHistory, setShowHistory] = useState(false)

  useEffect(() => {
    // Generate this week's evidence
    const weekly = generateWeeklyEvidence(patternMap)
    setEvidence(weekly)
    setAllEvidence(getAllEvidence())
  }, [patternMap])

  if (!evidence || (evidence.winsCount === 0 && evidence.oneThingStreak === 0)) {
    return null // Don't show if there's no data yet
  }

  const TrendIcon = trendIcons[evidence.energyTrend] || Minus

  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden">
      {/* Header */}
      <div className="p-5 pb-3">
        <div className="flex items-center gap-2 mb-1">
          <BookOpen className="w-4 h-4 text-primary" />
          <h2 className="text-base font-medium text-foreground">Your Evidence Journal</h2>
        </div>
        <p className="text-xs text-muted-foreground">
          Proof you&apos;re not failing — compiled weekly from your own data.
        </p>
      </div>

      {/* Stats row */}
      <div className="px-5 pb-4">
        <div className="grid grid-cols-3 gap-3">
          {/* Wins count */}
          <div className="bg-secondary/30 rounded-xl p-3 text-center">
            <p className="text-2xl font-semibold text-foreground">{evidence.winsCount}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">wins logged</p>
          </div>

          {/* Streak */}
          <div className="bg-secondary/30 rounded-xl p-3 text-center">
            <p className="text-2xl font-semibold text-foreground flex items-center justify-center gap-1">
              {evidence.oneThingStreak}
              {evidence.oneThingStreak >= 3 && <Award className="w-4 h-4 text-amber-500" />}
            </p>
            <p className="text-[10px] text-muted-foreground mt-0.5">day streak</p>
          </div>

          {/* Energy trend */}
          <div className="bg-secondary/30 rounded-xl p-3 text-center">
            <div className="flex items-center justify-center">
              <TrendIcon className={`w-6 h-6 ${trendColors[evidence.energyTrend]}`} />
            </div>
            <p className="text-[10px] text-muted-foreground mt-1.5">{trendLabels[evidence.energyTrend]}</p>
          </div>
        </div>
      </div>

      {/* Pulse insight */}
      {evidence.pulseInsight && (
        <div className="px-5 pb-4">
          <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
            <p className="text-sm text-foreground/80 italic leading-relaxed">
              {evidence.pulseInsight}
            </p>
          </div>
        </div>
      )}

      {/* Personal insight */}
      {evidence.personalInsight && (
        <div className="border-t border-border/50 px-5 py-4">
          <p className="text-sm text-foreground/80 leading-relaxed">
            {evidence.personalInsight}
          </p>
        </div>
      )}

      {/* Top wins */}
      {evidence.topWins.length > 0 && (
        <div className="border-t border-border/50 px-5 py-4">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
            Highlights
          </p>
          <div className="space-y-1.5">
            {evidence.topWins.slice(0, 3).map((win) => (
              <p key={win.id} className="text-sm text-foreground/70">
                · {win.text}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* History toggle */}
      {allEvidence.length > 1 && (
        <div className="border-t border-border/50">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="w-full px-5 py-2.5 text-xs text-muted-foreground hover:text-foreground hover:bg-secondary/30 transition-colors text-left"
          >
            {showHistory ? "Hide" : "View"} previous weeks ({allEvidence.length - 1})
          </button>

          {showHistory && (
            <div className="px-5 pb-4 space-y-3 max-h-60 overflow-y-auto">
              {allEvidence.slice(0, -1).reverse().map((week) => (
                <div key={week.weekStart} className="bg-secondary/20 rounded-xl p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-foreground">
                      Week of {new Date(week.weekStart).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                    <span className="text-xs text-muted-foreground">{week.winsCount} wins</span>
                  </div>
                  <p className="text-xs text-muted-foreground italic">{week.personalInsight}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
