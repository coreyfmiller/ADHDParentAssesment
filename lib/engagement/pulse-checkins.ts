// ============================================================
// Pulse Check-Ins — 3x Daily (Morning, Afternoon, Evening)
// 30-second touchpoints that build self-awareness over time
// ============================================================

import type { PulseEntry, DailyPulse, PulseTime } from "./types"
import type { PatternMap } from "../assessments/types"

const PULSE_KEY = "mindful-mama-pulse"

// ---- Questions for each time of day ----

export interface PulseQuestion {
  time: PulseTime
  question: string
  type: "energy" | "checklist" | "word"
  options?: string[] // for checklist type
}

export const PULSE_QUESTIONS: Record<PulseTime, PulseQuestion> = {
  morning: {
    time: "morning",
    question: "What's your energy like right now?",
    type: "energy",
  },
  afternoon: {
    time: "afternoon",
    question: "Quick body check — did you do any of these?",
    type: "checklist",
    options: ["Ate something", "Drank water", "Stepped outside", "Sat down for a minute", "Took a breath"],
  },
  evening: {
    time: "evening",
    question: "One word for today.",
    type: "word",
  },
}

// ---- Storage ----

export function getAllPulses(): DailyPulse[] {
  try {
    const data = localStorage.getItem(PULSE_KEY)
    if (!data) return []
    return JSON.parse(data)
  } catch {
    return []
  }
}

export function getPulseForDate(date: string): PulseEntry[] {
  const all = getAllPulses()
  const day = all.find((d) => d.date === date)
  return day?.entries || []
}

export function getTodaysPulses(): PulseEntry[] {
  return getPulseForDate(getToday())
}

export function hasCompletedPulse(time: PulseTime, date?: string): boolean {
  const entries = getPulseForDate(date || getToday())
  return entries.some((e) => e.time === time)
}

export function getNextPulseTime(): PulseTime | null {
  const hour = new Date().getHours()
  const today = getTodaysPulses()
  const completed = new Set(today.map((e) => e.time))

  // Morning: 5am-11am
  if (hour >= 5 && hour < 11 && !completed.has("morning")) return "morning"
  // Afternoon: 11am-5pm
  if (hour >= 11 && hour < 17 && !completed.has("afternoon")) return "afternoon"
  // Evening: 5pm-11pm
  if (hour >= 17 && hour < 23 && !completed.has("evening")) return "evening"

  // If they missed one, offer the current window
  if (hour >= 5 && hour < 11) return completed.has("morning") ? null : "morning"
  if (hour >= 11 && hour < 17) return completed.has("afternoon") ? null : "afternoon"
  if (hour >= 17) return completed.has("evening") ? null : "evening"

  return null
}

export function savePulse(entry: Omit<PulseEntry, "id" | "timestamp" | "date">): PulseEntry {
  const pulse: PulseEntry = {
    ...entry,
    id: `pulse-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    timestamp: Date.now(),
    date: getToday(),
  }

  const all = getAllPulses()
  const today = getToday()
  const dayIndex = all.findIndex((d) => d.date === today)

  if (dayIndex >= 0) {
    // Replace if same time already exists (re-doing a check-in)
    all[dayIndex].entries = all[dayIndex].entries.filter((e) => e.time !== pulse.time)
    all[dayIndex].entries.push(pulse)
  } else {
    all.push({ date: today, entries: [pulse] })
  }

  // Keep last 90 days
  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - 90)
  const cutoffStr = formatDate(cutoff)
  const trimmed = all.filter((d) => d.date >= cutoffStr)

  try {
    localStorage.setItem(PULSE_KEY, JSON.stringify(trimmed))
  } catch {}

  return pulse
}

// ---- Insights (pattern detection over time) ----

export interface PulseInsight {
  type: "pattern" | "trend" | "observation"
  message: string
}

export function getPulseInsights(patternMap: PatternMap | null): PulseInsight[] {
  const all = getAllPulses()
  if (all.length < 5) return [] // Need at least 5 days of data

  const insights: PulseInsight[] = []
  const last14 = all.slice(-14)

  // Energy trend analysis
  const morningEnergies = last14
    .flatMap((d) => d.entries)
    .filter((e) => e.time === "morning" && e.energy)
    .map((e) => ({ date: e.date, energy: e.energy }))

  if (morningEnergies.length >= 5) {
    const recent = morningEnergies.slice(-5)
    const earlier = morningEnergies.slice(0, Math.min(5, morningEnergies.length - 5))

    if (earlier.length > 0) {
      const recentAvg = recent.reduce((s, e) => s + e.energy, 0) / recent.length
      const earlierAvg = earlier.reduce((s, e) => s + e.energy, 0) / earlier.length

      if (recentAvg > earlierAvg + 0.5) {
        insights.push({
          type: "trend",
          message: "Your morning energy has been trending up. Something you're doing is working.",
        })
      } else if (recentAvg < earlierAvg - 0.5) {
        insights.push({
          type: "trend",
          message: "Your morning energy has dipped recently. This might be seasonal, hormonal, or a sign you need more recovery time.",
        })
      }
    }

    // Day-of-week patterns
    const dayEnergies: Record<number, number[]> = {}
    for (const e of morningEnergies) {
      const day = new Date(e.date).getDay()
      if (!dayEnergies[day]) dayEnergies[day] = []
      dayEnergies[day].push(e.energy)
    }

    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let worstDay = -1
    let worstAvg = 6
    let bestDay = -1
    let bestAvg = 0

    for (const [day, energies] of Object.entries(dayEnergies)) {
      if (energies.length >= 2) {
        const avg = energies.reduce((s, e) => s + e, 0) / energies.length
        if (avg < worstAvg) { worstAvg = avg; worstDay = Number(day) }
        if (avg > bestAvg) { bestAvg = avg; bestDay = Number(day) }
      }
    }

    if (worstDay >= 0 && bestDay >= 0 && worstDay !== bestDay && (bestAvg - worstAvg) > 1) {
      insights.push({
        type: "pattern",
        message: `You consistently have more energy on ${dayNames[bestDay]}s and less on ${dayNames[worstDay]}s. What's different about those days?`,
      })
    }
  }

  // Afternoon self-care patterns
  const afternoonEntries = last14
    .flatMap((d) => d.entries)
    .filter((e) => e.time === "afternoon" && e.response)

  if (afternoonEntries.length >= 5) {
    const responses = afternoonEntries.map((e) => e.response || "")
    const ateCount = responses.filter((r) => r.includes("Ate")).length
    const waterCount = responses.filter((r) => r.includes("water")).length

    if (ateCount < afternoonEntries.length * 0.3) {
      insights.push({
        type: "observation",
        message: "You're skipping meals more often than not. Your brain runs on fuel — this might be why afternoons feel harder.",
      })
    }
    if (waterCount > afternoonEntries.length * 0.7) {
      insights.push({
        type: "observation",
        message: "You're consistently drinking water. That's a self-care habit that's actually sticking.",
      })
    }
  }

  // Evening word patterns
  const eveningWords = last14
    .flatMap((d) => d.entries)
    .filter((e) => e.time === "evening" && e.response)
    .map((e) => (e.response || "").toLowerCase())

  if (eveningWords.length >= 5) {
    const hardWords = ["exhausted", "hard", "terrible", "awful", "overwhelming", "angry", "numb", "empty", "done", "crying"]
    const goodWords = ["good", "okay", "calm", "peaceful", "connected", "proud", "grateful", "better", "manageable", "hopeful"]

    const hardCount = eveningWords.filter((w) => hardWords.some((hw) => w.includes(hw))).length
    const goodCount = eveningWords.filter((w) => goodWords.some((gw) => w.includes(gw))).length

    if (goodCount > hardCount && goodCount >= 3) {
      insights.push({
        type: "trend",
        message: `More good days than hard ones this stretch. That's not nothing — that's a shift.`,
      })
    }
  }

  return insights.slice(0, 3) // Max 3 insights at a time
}

// ---- Helpers ----

function getToday(): string {
  return formatDate(new Date())
}

function formatDate(d: Date): string {
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}
