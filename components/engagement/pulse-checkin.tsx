"use client"

import { useState, useEffect } from "react"
import { Sun, CloudSun, Moon, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  getNextPulseTime,
  hasCompletedPulse,
  savePulse,
  getTodaysPulses,
  PULSE_QUESTIONS,
  getPulseInsights,
} from "@/lib/engagement/pulse-checkins"
import type { PulseTime, PulseEntry } from "@/lib/engagement/types"
import type { PatternMap } from "@/lib/assessments/types"

interface PulseCheckinProps {
  patternMap: PatternMap | null
}

const timeIcons: Record<PulseTime, React.ElementType> = {
  morning: Sun,
  afternoon: CloudSun,
  evening: Moon,
}

const timeLabels: Record<PulseTime, string> = {
  morning: "Morning",
  afternoon: "Afternoon",
  evening: "Evening",
}

const energyLabels = [
  { value: 1, emoji: "😴", label: "Empty" },
  { value: 2, emoji: "😮‍💨", label: "Low" },
  { value: 3, emoji: "😐", label: "Okay" },
  { value: 4, emoji: "🙂", label: "Good" },
  { value: 5, emoji: "✨", label: "Great" },
]

export function PulseCheckin({ patternMap }: PulseCheckinProps) {
  const [nextPulse, setNextPulse] = useState<PulseTime | null>(null)
  const [todaysPulses, setTodaysPulses] = useState<PulseEntry[]>([])
  const [selectedEnergy, setSelectedEnergy] = useState<number | null>(null)
  const [selectedChecklist, setSelectedChecklist] = useState<Set<string>>(new Set())
  const [eveningWord, setEveningWord] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [insights, setInsights] = useState<{ type: string; message: string }[]>([])

  useEffect(() => {
    setNextPulse(getNextPulseTime())
    setTodaysPulses(getTodaysPulses())
    setInsights(getPulseInsights(patternMap))
  }, [patternMap])

  const handleSubmit = () => {
    if (!nextPulse) return

    const question = PULSE_QUESTIONS[nextPulse]
    let response: string | undefined

    if (question.type === "energy" && selectedEnergy) {
      savePulse({ time: nextPulse, energy: selectedEnergy })
    } else if (question.type === "checklist") {
      response = Array.from(selectedChecklist).join(", ")
      savePulse({ time: nextPulse, energy: 0, response })
    } else if (question.type === "word" && eveningWord.trim()) {
      response = eveningWord.trim()
      savePulse({ time: nextPulse, energy: 0, response })
    } else {
      return
    }

    setSubmitted(true)
    setTodaysPulses(getTodaysPulses())

    // Reset after showing confirmation
    setTimeout(() => {
      setSubmitted(false)
      setNextPulse(getNextPulseTime())
      setSelectedEnergy(null)
      setSelectedChecklist(new Set())
      setEveningWord("")
    }, 3000)
  }

  const toggleChecklist = (item: string) => {
    const next = new Set(selectedChecklist)
    if (next.has(item)) next.delete(item)
    else next.add(item)
    setSelectedChecklist(next)
  }

  // All done for now
  if (!nextPulse && !submitted) {
    const completedCount = todaysPulses.length
    if (completedCount === 0) return null

    return (
      <div className="bg-card rounded-2xl border border-border p-5">
        <div className="flex items-center gap-3 mb-3">
          <h2 className="text-base font-medium text-foreground">Today&apos;s Check-Ins</h2>
          <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 font-medium">
            {completedCount}/3
          </span>
        </div>
        <div className="flex items-center gap-2">
          {(["morning", "afternoon", "evening"] as PulseTime[]).map((time) => {
            const Icon = timeIcons[time]
            const done = hasCompletedPulse(time)
            return (
              <div
                key={time}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs ${
                  done
                    ? "bg-green-500/10 text-green-600"
                    : "bg-secondary/50 text-muted-foreground"
                }`}
              >
                <Icon className="w-3 h-3" />
                {timeLabels[time]}
                {done && <Check className="w-3 h-3" />}
              </div>
            )
          })}
        </div>

        {/* Insights */}
        {insights.length > 0 && (
          <div className="mt-4 pt-3 border-t border-border/50 space-y-2">
            {insights.slice(0, 1).map((insight, i) => (
              <p key={i} className="text-sm text-muted-foreground italic">
                {insight.message}
              </p>
            ))}
          </div>
        )}
      </div>
    )
  }

  // Submitted confirmation
  if (submitted) {
    return (
      <div className="bg-card rounded-2xl border border-primary/20 p-5 text-center animate-in fade-in duration-300">
        <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-3">
          <Check className="w-5 h-5 text-green-600" />
        </div>
        <p className="text-sm text-foreground font-medium">Noted.</p>
        <p className="text-xs text-muted-foreground mt-1">
          You just noticed yourself. That&apos;s more than most people do all day.
        </p>
      </div>
    )
  }

  // Active check-in
  if (!nextPulse) return null
  const question = PULSE_QUESTIONS[nextPulse]
  const Icon = timeIcons[nextPulse]

  return (
    <div className="bg-card rounded-2xl border border-primary/20 p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-4 h-4 text-primary" />
        </div>
        <div>
          <h2 className="text-sm font-medium text-foreground">{timeLabels[nextPulse]} Check-In</h2>
          <p className="text-xs text-muted-foreground">30 seconds. Just notice.</p>
        </div>
      </div>

      {/* Question */}
      <p className="text-foreground font-medium mb-4">{question.question}</p>

      {/* Energy scale */}
      {question.type === "energy" && (
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-1">
            {energyLabels.map((level) => (
              <button
                key={level.value}
                onClick={() => setSelectedEnergy(level.value)}
                className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all flex-1 ${
                  selectedEnergy === level.value
                    ? "bg-primary/10 ring-2 ring-primary/30 scale-105"
                    : "hover:bg-secondary/50"
                }`}
              >
                <span className="text-xl">{level.emoji}</span>
                <span className="text-[10px] text-muted-foreground">{level.label}</span>
              </button>
            ))}
          </div>
          <Button
            onClick={handleSubmit}
            disabled={!selectedEnergy}
            className="w-full rounded-xl"
            size="sm"
          >
            Log it
          </Button>
        </div>
      )}

      {/* Checklist */}
      {question.type === "checklist" && question.options && (
        <div className="space-y-3">
          <div className="space-y-2">
            {question.options.map((option) => (
              <button
                key={option}
                onClick={() => toggleChecklist(option)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition-all ${
                  selectedChecklist.has(option)
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "bg-secondary/30 text-foreground/80 border border-transparent hover:bg-secondary/50"
                }`}
              >
                <span className="flex items-center gap-2">
                  {selectedChecklist.has(option) && <Check className="w-3 h-3" />}
                  {option}
                </span>
              </button>
            ))}
          </div>
          <Button
            onClick={handleSubmit}
            disabled={selectedChecklist.size === 0}
            className="w-full rounded-xl"
            size="sm"
          >
            {selectedChecklist.size === 0 ? "Pick at least one" : "Done"}
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            None of these? That&apos;s data too. Skip if you need to.
          </p>
        </div>
      )}

      {/* Evening word */}
      {question.type === "word" && (
        <div className="space-y-3">
          <input
            type="text"
            value={eveningWord}
            onChange={(e) => setEveningWord(e.target.value)}
            placeholder="exhausted, grateful, numb, okay..."
            className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring/50 text-center"
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
          <Button
            onClick={handleSubmit}
            disabled={!eveningWord.trim()}
            className="w-full rounded-xl"
            size="sm"
          >
            That&apos;s my word
          </Button>
        </div>
      )}
    </div>
  )
}
