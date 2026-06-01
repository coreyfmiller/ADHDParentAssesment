"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Sun, CloudSun, Moon, Sunrise, Sunset, Stars, Check, ArrowRight, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getMorningRitualData } from "@/lib/engagement/morning-ritual"
import { savePulse, hasCompletedPulse } from "@/lib/engagement/pulse-checkins"
import { markOneThingComplete } from "@/lib/engagement/one-thing-interactive"
import { saveAnchorAsFavorite } from "@/lib/engagement/identity-anchors"
import { getCurrentArchetype } from "@/lib/archetypes"
import type { MorningRitualData } from "@/lib/engagement/morning-ritual"
import type { PatternMap } from "@/lib/assessments/types"
import type { Archetype } from "@/lib/archetypes"

interface MorningRitualProps {
  patternMap: PatternMap | null
  onDismiss: () => void
}

const timeIcons = {
  early: Sunrise,
  morning: Sun,
  midday: CloudSun,
  afternoon: Sunset,
  evening: Moon,
  night: Stars,
}

const energyLabels = [
  { value: 1, emoji: "😴", label: "Empty" },
  { value: 2, emoji: "😮‍💨", label: "Low" },
  { value: 3, emoji: "😐", label: "Okay" },
  { value: 4, emoji: "🙂", label: "Good" },
  { value: 5, emoji: "✨", label: "Great" },
]

export function MorningRitual({ patternMap, onDismiss }: MorningRitualProps) {
  const [data, setData] = useState<MorningRitualData | null>(null)
  const [pulseSelected, setPulseSelected] = useState<number | null>(null)
  const [pulseDone, setPulseDone] = useState(false)
  const [oneThingDone, setOneThingDone] = useState(false)
  const [anchorSaved, setAnchorSaved] = useState(false)

  useEffect(() => {
    const archetype = getCurrentArchetype()
    const ritualData = getMorningRitualData(patternMap, archetype)
    setData(ritualData)
    setOneThingDone(ritualData.oneThing.completed)
    setPulseDone(ritualData.pulseCompleted)
  }, [patternMap])

  const handlePulseSubmit = () => {
    if (pulseSelected === null) return
    const time = data?.pulseReady
    if (!time) return
    savePulse({ time, energy: pulseSelected })
    setPulseDone(true)
  }

  const handleOneThingComplete = () => {
    markOneThingComplete()
    setOneThingDone(true)
  }

  const handleSaveAnchor = () => {
    if (!data) return
    saveAnchorAsFavorite(data.anchor.date)
    setAnchorSaved(true)
  }

  if (!data) return null

  const TimeIcon = timeIcons[data.timeOfDay]
  const allDone = pulseDone && oneThingDone

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      {/* Minimal header */}
      <div className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <TimeIcon className="w-4 h-4" />
          <span className="text-xs">
            {data.timeOfDay === "early" || data.timeOfDay === "morning" ? "Morning ritual" :
             data.timeOfDay === "midday" || data.timeOfDay === "afternoon" ? "Afternoon check-in" :
             "Evening wind-down"}
          </span>
        </div>
        <button
          onClick={onDismiss}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg hover:bg-secondary/50"
        >
          Skip to dashboard →
        </button>
      </div>

      {/* Content — centered, breathing room */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 max-w-lg mx-auto w-full">
        {/* Greeting */}
        <p className="text-sm text-muted-foreground text-center mb-8">
          {data.greeting}
        </p>

        {/* Identity Anchor — the centerpiece */}
        <div className="w-full mb-8">
          <div className="bg-card rounded-2xl border border-primary/15 p-6 text-center relative">
            <p className="text-lg font-medium text-foreground leading-relaxed">
              {data.anchor.statement}
            </p>
            {data.archetype && (
              <p className="text-xs text-primary/60 mt-3">{data.archetype.name}</p>
            )}
            <button
              onClick={handleSaveAnchor}
              className="absolute top-3 right-3 p-1.5 rounded-lg hover:bg-primary/10 transition-colors"
              aria-label="Save anchor"
            >
              <Heart className={`w-4 h-4 ${anchorSaved ? "fill-primary text-primary" : "text-muted-foreground/40"}`} />
            </button>
          </div>
        </div>

        {/* Pulse Check-In (if not done) */}
        {!pulseDone && data.pulseReady && (
          <div className="w-full mb-6">
            <p className="text-sm text-foreground text-center mb-3">
              How&apos;s your energy right now?
            </p>
            <div className="flex items-center justify-center gap-2 mb-3">
              {energyLabels.map((level) => (
                <button
                  key={level.value}
                  onClick={() => setPulseSelected(level.value)}
                  className={`flex flex-col items-center gap-1 p-2.5 rounded-xl transition-all ${
                    pulseSelected === level.value
                      ? "bg-primary/10 ring-2 ring-primary/30 scale-110"
                      : "hover:bg-secondary/50"
                  }`}
                >
                  <span className="text-2xl">{level.emoji}</span>
                  <span className="text-[10px] text-muted-foreground">{level.label}</span>
                </button>
              ))}
            </div>
            {pulseSelected !== null && (
              <Button
                onClick={handlePulseSubmit}
                size="sm"
                className="w-full rounded-xl"
              >
                Log it
              </Button>
            )}
          </div>
        )}

        {pulseDone && !oneThingDone && (
          <div className="w-full mb-6 text-center">
            <div className="flex items-center justify-center gap-1.5 text-green-600 text-sm mb-4">
              <Check className="w-4 h-4" />
              Energy logged
            </div>
          </div>
        )}

        {/* One Thing Today */}
        <div className="w-full mb-6">
          <div className="bg-secondary/20 rounded-2xl p-5 border border-border/50">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
              Your one thing today
            </p>
            <p className={`text-sm font-medium text-foreground leading-relaxed ${oneThingDone ? "line-through opacity-60" : ""}`}>
              {data.oneThing.action}
            </p>
            {!oneThingDone ? (
              <Button
                onClick={handleOneThingComplete}
                variant="ghost"
                size="sm"
                className="mt-3 text-primary hover:text-primary hover:bg-primary/10 rounded-xl"
              >
                <Check className="w-3 h-3 mr-1" />
                Already did it
              </Button>
            ) : (
              <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                <Check className="w-3 h-3" /> Done
              </p>
            )}
          </div>
        </div>

        {/* Go to dashboard */}
        <Button
          onClick={onDismiss}
          className="w-full rounded-xl"
          variant={allDone ? "default" : "outline"}
        >
          {allDone ? "Go to my toolkit" : "Continue to dashboard"}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>

        {allDone && (
          <p className="text-xs text-muted-foreground text-center mt-3">
            30 seconds. You just chose yourself. Now go handle the day.
          </p>
        )}
      </div>

      {/* Disclaimer */}
      <div className="px-6 py-3 text-center">
        <p className="text-[10px] text-muted-foreground/50">
          For self-reflection purposes only. Not a substitute for professional care.
        </p>
      </div>
    </div>
  )
}
