// ============================================================
// Evidence Journal — Weekly Auto-Generated Summary
// "Proof you're not failing" — compiled from all engagement data
// ============================================================

import type { WeeklyEvidence } from "./types"
import type { PatternMap } from "../assessments/types"
import { getWeeklyWinStats } from "./micro-wins"
import { getAllPulses } from "./pulse-checkins"
import { getOneThingHistory, getOneThingStreak } from "./one-thing-interactive"

const EVIDENCE_KEY = "mindful-mama-evidence-journal"

// ---- Core Functions ----

export function getWeeklyEvidence(weekStart?: string): WeeklyEvidence | null {
  const start = weekStart || getLastWeekStart()
  const all = getAllEvidence()
  return all.find((e) => e.weekStart === start) || null
}

export function generateWeeklyEvidence(patternMap: PatternMap | null): WeeklyEvidence {
  const weekStart = getLastWeekStart()

  // Check if already generated
  const existing = getWeeklyEvidence(weekStart)
  if (existing) return existing

  // Gather data from all systems
  const winStats = getWeeklyWinStats(weekStart)
  const pulseData = getWeekPulseData(weekStart)
  const oneThingData = getWeekOneThingData(weekStart)
  const streak = getOneThingStreak()

  // Generate insights
  const energyTrend = calculateEnergyTrend(pulseData.energies)
  const avgEnergy = pulseData.energies.length > 0
    ? pulseData.energies.reduce((s, e) => s + e, 0) / pulseData.energies.length
    : 0
  const pulseInsight = generatePulseInsight(pulseData, patternMap)
  const personalInsight = generatePersonalInsight(winStats, oneThingData, pulseData, patternMap)

  const evidence: WeeklyEvidence = {
    weekStart,
    generatedAt: Date.now(),
    winsCount: winStats.totalWins,
    topWins: winStats.topWins,
    pulseInsight,
    energyTrend,
    averageEnergy: Math.round(avgEnergy * 10) / 10,
    oneThingStreak: streak.currentStreak,
    personalInsight,
  }

  // Save
  const all = getAllEvidence()
  all.push(evidence)
  const trimmed = all.slice(-12) // Keep 12 weeks
  try {
    localStorage.setItem(EVIDENCE_KEY, JSON.stringify(trimmed))
  } catch {}

  return evidence
}

export function getAllEvidence(): WeeklyEvidence[] {
  try {
    const data = localStorage.getItem(EVIDENCE_KEY)
    if (!data) return []
    return JSON.parse(data)
  } catch {
    return []
  }
}

// ---- Data Gathering ----

interface WeekPulseData {
  energies: number[]
  daysCheckedIn: number
  afternoonCareCount: number
  eveningWords: string[]
}

function getWeekPulseData(weekStart: string): WeekPulseData {
  const all = getAllPulses()
  const end = new Date(weekStart)
  end.setDate(end.getDate() + 7)
  const endStr = formatDate(end)

  const weekPulses = all.filter((d) => d.date >= weekStart && d.date < endStr)

  const energies: number[] = []
  let afternoonCareCount = 0
  const eveningWords: string[] = []

  for (const day of weekPulses) {
    for (const entry of day.entries) {
      if (entry.time === "morning" && entry.energy) {
        energies.push(entry.energy)
      }
      if (entry.time === "afternoon" && entry.response) {
        afternoonCareCount++
      }
      if (entry.time === "evening" && entry.response) {
        eveningWords.push(entry.response)
      }
    }
  }

  return {
    energies,
    daysCheckedIn: weekPulses.length,
    afternoonCareCount,
    eveningWords,
  }
}

interface WeekOneThingData {
  total: number
  completed: number
}

function getWeekOneThingData(weekStart: string): WeekOneThingData {
  const history = getOneThingHistory()
  const end = new Date(weekStart)
  end.setDate(end.getDate() + 7)
  const endStr = formatDate(end)

  const weekEntries = history.filter((e) => e.date >= weekStart && e.date < endStr)
  return {
    total: weekEntries.length,
    completed: weekEntries.filter((e) => e.completed).length,
  }
}

// ---- Insight Generation ----

function calculateEnergyTrend(energies: number[]): WeeklyEvidence["energyTrend"] {
  if (energies.length < 3) return "stable"

  const firstHalf = energies.slice(0, Math.floor(energies.length / 2))
  const secondHalf = energies.slice(Math.floor(energies.length / 2))

  const firstAvg = firstHalf.reduce((s, e) => s + e, 0) / firstHalf.length
  const secondAvg = secondHalf.reduce((s, e) => s + e, 0) / secondHalf.length

  const diff = secondAvg - firstAvg
  if (diff > 0.5) return "improving"
  if (diff < -0.5) return "declining"

  // Check for fluctuation
  const variance = energies.reduce((s, e) => s + Math.pow(e - (firstAvg + secondAvg) / 2, 2), 0) / energies.length
  if (variance > 1.5) return "fluctuating"

  return "stable"
}

function generatePulseInsight(data: WeekPulseData, patternMap: PatternMap | null): string {
  if (data.daysCheckedIn === 0) {
    return "No check-ins this week. That's okay — the door is always open."
  }

  if (data.daysCheckedIn >= 5) {
    if (data.energies.length > 0) {
      const avg = data.energies.reduce((s, e) => s + e, 0) / data.energies.length
      if (avg >= 3.5) {
        return "Your energy was above average this week. Something in your environment or routine is supporting you."
      } else if (avg <= 2) {
        return "Low energy week. This is data, not a verdict. Your body is telling you something — probably that it needs more than it's getting."
      }
    }
    return `You checked in ${data.daysCheckedIn} days this week. That consistency alone is a form of self-awareness most people never develop.`
  }

  return `${data.daysCheckedIn} check-ins this week. Every one of those was a moment you chose to notice yourself.`
}

function generatePersonalInsight(
  winStats: { totalWins: number; daysActive: number; topCategories: { category: string; count: number }[] },
  oneThingData: WeekOneThingData,
  pulseData: WeekPulseData,
  patternMap: PatternMap | null
): string {
  const parts: string[] = []

  // Wins insight
  if (winStats.totalWins > 0) {
    if (winStats.totalWins >= 15) {
      parts.push(`You logged ${winStats.totalWins} wins this week. That's ${winStats.totalWins} pieces of evidence that you are not doing nothing.`)
    } else if (winStats.totalWins >= 7) {
      parts.push(`${winStats.totalWins} things you did this week that you might have forgotten by now. But they happened. You made them happen.`)
    } else {
      parts.push(`${winStats.totalWins} wins logged. Each one is a fact. Not a feeling — a fact.`)
    }
  }

  // One Thing insight
  if (oneThingData.completed > 0) {
    if (oneThingData.completed === oneThingData.total && oneThingData.total >= 5) {
      parts.push("You completed your One Thing every single day. That's not discipline — that's someone who's choosing herself consistently.")
    } else if (oneThingData.completed >= 3) {
      parts.push(`${oneThingData.completed} days you did your One Thing. Not perfect. Consistent. Which matters more.`)
    }
  }

  // Pattern-aware insight
  if (patternMap) {
    const critical = patternMap.dimensions.filter((d) => d.intensity === "critical")
    if (critical.length >= 2 && winStats.totalWins > 0) {
      parts.push("You did all of this while multiple systems were at critical. That's not nothing. That's extraordinary endurance.")
    }
  }

  // Top category insight
  if (winStats.topCategories.length > 0) {
    const topCat = winStats.topCategories[0]
    const categoryLabels: Record<string, string> = {
      survival: "keeping everyone alive",
      care: "taking care of yourself",
      connection: "connecting with others",
      progress: "getting things done",
      rest: "choosing rest",
    }
    const label = categoryLabels[topCat.category]
    if (label) {
      parts.push(`Most of your energy went to ${label} this week. That tells you where your focus is — and what might need attention next.`)
    }
  }

  if (parts.length === 0) {
    return "You made it through another week. That's the baseline — and it's more than enough."
  }

  return parts.slice(0, 2).join(" ")
}

// ---- Helpers ----

function getLastWeekStart(): string {
  const now = new Date()
  const day = now.getDay()
  const diff = day === 0 ? 6 : day - 1
  const thisMonday = new Date(now)
  thisMonday.setDate(now.getDate() - diff)
  // Go back one more week
  thisMonday.setDate(thisMonday.getDate() - 7)
  return formatDate(thisMonday)
}

function formatDate(d: Date): string {
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}
