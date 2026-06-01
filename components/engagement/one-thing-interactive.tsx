"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
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
}

const dayLabels = ["M", "T", "W", "T", "F", "S", "S"]

export function OneThingInteractive({ patternMap }: OneThingInteractiveProps) {
  const [entry, setEntry] = useState<OneThingEntry | null>(null)
  const [streak, setStreak] = useState<StreakData>({ currentStreak: 0, longestStreak: 0, lastActiveDate: "" })
  const [last7, setLast7] = useState<{ date: string; completed: boolean }[]>([])
  const [reflection, setReflection] = useState<WeeklyReflection | null>(null)
  const [justCompleted, setJustCompleted] = useState(false)

  useEffect(() => {
    const todaysEntry = getTodaysOneThing(patternMap)
    setEntry(todaysEntry)
    setStreak(getOneThingStreak())
    setLast7(getLast7Days())
    setReflection(getWeeklyReflection())
  }, [patternMap])

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
      {/* Image */}
      <div className="aspect-[2.7/1] relative bg-secondary/20">
        <Image
          src="/images/glowingseed.png"
          alt="One thing today"
          fill
          className="object-cover"
        />
      </div>

      {/* Header with streak */}
      <div className="p-5 pb-0">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-sm font-medium text-primary uppercase tracking-wide">
            One thing today
          </h2>
          <div className="flex items-center gap-3">
            {streak.currentStreak > 1 && (
              <span className="flex items-center gap-1 text-xs text-amber-600 font-medium">
                <Flame className="w-3 h-3" />
                {streak.currentStreak} days
              </span>
            )}
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              {entry.timeNeeded}
            </span>
          </div>
        </div>
      </div>

      {/* The action */}
      <div className="p-5">
        <p className={`text-foreground font-medium leading-relaxed mb-2 ${entry.completed ? "line-through opacity-60" : ""}`}>
          {entry.action}
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          {entry.why}
        </p>

        {/* Complete button */}
        {!entry.completed ? (
          <Button
            onClick={handleComplete}
            className="w-full rounded-xl"
            variant="default"
          >
            <Check className="w-4 h-4 mr-2" />
            I did it
          </Button>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2 py-2 rounded-xl bg-green-500/10 text-green-600 text-sm font-medium">
              <Check className="w-4 h-4" />
              Done. You showed up for yourself today.
            </div>
            <button
              onClick={handleUndo}
              className="flex items-center justify-center gap-1 w-full text-xs text-muted-foreground hover:text-foreground transition-colors py-1"
            >
              <RotateCcw className="w-3 h-3" />
              Undo
            </button>
          </div>
        )}

        {/* Just completed celebration */}
        {justCompleted && (
          <p className="text-xs text-primary text-center mt-2 animate-in fade-in duration-300">
            ✓ Logged. Another piece of evidence that you&apos;re choosing yourself.
          </p>
        )}
      </div>

      {/* 7-day view */}
      <div className="border-t border-border/50 px-5 py-3 bg-secondary/10">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Last 7 days</span>
          <div className="flex items-center gap-1.5">
            {last7.map((day, i) => (
              <div key={day.date} className="flex flex-col items-center gap-0.5">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    day.completed
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary/50 text-muted-foreground/30"
                  }`}
                >
                  {day.completed ? (
                    <Check className="w-3 h-3" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  )}
                </div>
                <span className="text-[9px] text-muted-foreground/60">
                  {dayLabels[new Date(day.date).getDay() === 0 ? 6 : new Date(day.date).getDay() - 1]}
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
