"use client"

import { useState, useEffect } from "react"
import { Check, Clock, Flame, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  getTodaysOneThing,
  markOneThingComplete,
  unmarkOneThing,
  getOneThingStreak,
  getLast7Days,
  getWeeklyReflection,
} from "@/lib/engagement/one-thing-interactive"
import type { OneThingEntry, WeeklyReflection, StreakData } from "@/lib/engagement/types"
import type { PatternMap } from "@/lib/assessments/types"

interface OneThingInteractiveProps {
  patternMap: PatternMap | null
  aiOneThing?: { action: string; why: string; timeNeeded: string } | null
}

const dayLabels = ["S", "M", "T", "W", "T", "F", "S"]

export function OneThingInteractive({ patternMap, aiOneThing }: OneThingInteractiveProps) {
  const [entry, setEntry] = useState<OneThingEntry | null>(null)
  const [streak, setStreak] = useState<StreakData>({ currentStreak: 0, longestStreak: 0, lastActiveDate: "" })
  const [last7, setLast7] = useState<{ date: string; completed: boolean }[]>([])
  const [reflection, setReflection] = useState<WeeklyReflection | null>(null)
  const [justCompleted, setJustCompleted] = useState(false)

  useEffect(() => {
    const todaysEntry = getTodaysOneThing(patternMap, aiOneThing || undefined)
    setEntry(todaysEntry)
    setStreak(getOneThingStreak())
    setLast7(getLast7Days())
    setReflection(getWeeklyReflection())
  }, [patternMap, aiOneThing])

  const handleComplete = () => {
    const updated = markOneThingComplete()
    if (updated) {
      setEntry(updated)
      setStreak(getOneThingStreak())
      setLast7(getLast7Days())
      setJustCompleted(true)
      setTimeout(() => setJustCompleted(false), 3000)
    }
  }

  const handleUndo = () => {
    unmarkOneThing()
    const todaysEntry = getTodaysOneThing(patternMap)
    setEntry(todaysEntry)
    setLast7(getLast7Days())
  }

  if (!entry) return null

  return (
    <div className="bg-card rounded-2xl border border-primary/20 overflow-hidden shadow-sm">
      {/* Header + action combined */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-medium text-primary uppercase tracking-wide">
            One thing today
          </h2>
          <div className="flex items-center gap-2">
            {streak.currentStreak > 1 && (
              <span className="flex items-center gap-1 text-xs text-amber-600 font-medium">
                <Flame className="w-3 h-3" />
                {streak.currentStreak}
              </span>
            )}
            <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <Clock className="w-3 h-3" />
              {entry.timeNeeded}
            </span>
          </div>
        </div>

        <p className={`text-sm text-foreground font-medium leading-relaxed ${entry.completed ? "line-through opacity-60" : ""}`}>
          {entry.action}
        </p>
        <p className="text-xs text-muted-foreground leading-relaxed mt-1 mb-3">
          {entry.why}
        </p>

        {/* Complete button */}
        {!entry.completed ? (
          <Button
            onClick={handleComplete}
            className="w-full rounded-xl"
            size="sm"
            variant="default"
          >
            <Check className="w-3 h-3 mr-1.5" />
            I did it
          </Button>
        ) : (
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-green-600 text-xs font-medium">
              <Check className="w-3 h-3" />
              Done. You showed up today.
            </span>
            <button
              onClick={handleUndo}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              Undo
            </button>
          </div>
        )}

        {/* Just completed celebration */}
        {justCompleted && (
          <p className="text-xs text-primary text-center mt-2 animate-in fade-in duration-300">
            ✓ Another piece of evidence that you&apos;re choosing yourself.
          </p>
        )}
      </div>

      {/* 7-day view */}
      <div className="border-t border-border/50 px-4 py-2 bg-secondary/10">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-muted-foreground">Last 7 days</span>
          <div className="flex items-center gap-1">
            {last7.map((day, i) => (
              <div key={day.date} className="flex flex-col items-center gap-0.5">
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    day.completed
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary/50 text-muted-foreground/30"
                  }`}
                >
                  {day.completed ? (
                    <Check className="w-2.5 h-2.5" />
                  ) : (
                    <span className="w-1 h-1 rounded-full bg-current" />
                  )}
                </div>
                <span className="text-[8px] text-muted-foreground/60">
                  {dayLabels[(() => {
                    const [y, m, d] = day.date.split("-").map(Number)
                    return new Date(y, m - 1, d).getDay()
                  })()]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly reflection */}
      {reflection && (
        <div className="border-t border-border/50 px-5 py-3 bg-primary/[0.02]">
          <p className="text-xs text-foreground/70 italic leading-relaxed">
            {reflection.insight}
          </p>
        </div>
      )}
    </div>
  )
}
