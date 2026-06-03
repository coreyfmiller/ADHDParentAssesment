// ============================================================
// Activity Heatmap — Visual Proof of Showing Up
//
// Aggregates engagement data across all widgets to create a
// 30-day view of how consistently she's been using the app.
// Not a judgment — a recognition. "Look how many days you
// chose yourself."
// ============================================================

import { getAllWins } from "./micro-wins"
import { getOneThingHistory } from "./one-thing-interactive"
import { getAllPulses } from "./pulse-checkins"
import { getAllHeavy } from "./whats-heavy"
import type { MicroWin } from "./types"

export interface DayActivity {
  date: string // YYYY-MM-DD
  level: 0 | 1 | 2 | 3 // 0=no activity, 1=light, 2=moderate, 3=strong
  actions: number // total interactions that day
  dayOfWeek: number // 0=Sun, 1=Mon...
  dayOfMonth: number
  month: number // 0-indexed
}

export interface DayDetail {
  date: string
  wins: string[]
  oneThing?: { action: string; completed: boolean }
  pulseEnergies: number[]
  heavyThings: string[]
}

export interface WeekSummary {
  weekStart: string
  weekEnd: string
  activeDays: number
  totalWins: number
  avgEnergy: number | null
  oneThingCompleted: number
}

/**
 * Get the last N days of activity data for the heatmap.
 * Aligned to start on Monday of the earliest week.
 */
export function getActivityData(days: number = 28): DayActivity[] {
  const wins = getAllWins()
  const oneThings = getOneThingHistory()
  const pulses = getAllPulses()

  let heavyEntries: { date: string }[] = []
  try {
    heavyEntries = getAllHeavy()
  } catch {}

  const result: DayActivity[] = []
  const now = new Date()

  // Align to start on Monday of 4 weeks ago
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const dayOfWeek = today.getDay()
  const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1
  const thisMonday = new Date(today)
  thisMonday.setDate(today.getDate() - daysFromMonday)
  const startDate = new Date(thisMonday)
  startDate.setDate(thisMonday.getDate() - 21) // 3 weeks before this Monday = 4 weeks total

  // Calculate total days from startDate to today
  const totalDays = Math.floor((today.getTime() - startDate.getTime()) / 86400000) + 1

  for (let i = 0; i < totalDays; i++) {
    const d = new Date(startDate)
    d.setDate(startDate.getDate() + i)
    const dateStr = formatDate(d)

    let actions = 0

    const dayWins = wins.find((w) => w.date === dateStr)
    if (dayWins) actions += dayWins.wins.length

    const oneThing = oneThings.find((e) => e.date === dateStr)
    if (oneThing?.completed) actions += 1

    const pulse = pulses.find((p) => p.date === dateStr)
    if (pulse) actions += pulse.entries.length

    const heavy = heavyEntries.find((e) => e.date === dateStr)
    if (heavy) actions += 1

    let level: DayActivity["level"] = 0
    if (actions >= 5) level = 3
    else if (actions >= 3) level = 2
    else if (actions >= 1) level = 1

    result.push({
      date: dateStr,
      level,
      actions,
      dayOfWeek: d.getDay(),
      dayOfMonth: d.getDate(),
      month: d.getMonth(),
    })
  }

  return result
}

/**
 * Get detailed breakdown for a specific day
 */
export function getDayDetail(date: string): DayDetail {
  const wins = getAllWins()
  const oneThings = getOneThingHistory()
  const pulses = getAllPulses()

  let heavyEntries: { date: string; text: string }[] = []
  try {
    heavyEntries = getAllHeavy() as { date: string; text: string }[]
  } catch {}

  const dayWins = wins.find((w) => w.date === date)
  const oneThing = oneThings.find((e) => e.date === date)
  const pulse = pulses.find((p) => p.date === date)
  const heavy = heavyEntries.filter((e) => e.date === date)

  return {
    date,
    wins: dayWins?.wins.map((w: MicroWin) => w.text) || [],
    oneThing: oneThing ? { action: oneThing.action, completed: oneThing.completed } : undefined,
    pulseEnergies: pulse?.entries.map((e) => e.energy).filter((e) => e > 0) || [],
    heavyThings: heavy.map((e) => e.text),
  }
}

/**
 * Get week summary for a given week start date
 */
export function getWeekSummary(weekStartDate: string): WeekSummary {
  const [y, m, d] = weekStartDate.split("-").map(Number)
  const start = new Date(y, m - 1, d)
  const end = new Date(y, m - 1, d + 6)

  const data = getActivityData(56) // get enough days
  const weekDays = data.filter((day) => day.date >= weekStartDate && day.date <= formatDate(end))

  const wins = getAllWins()
  const pulses = getAllPulses()
  const oneThings = getOneThingHistory()

  let totalWins = 0
  let oneThingCompleted = 0
  const energies: number[] = []

  for (const day of weekDays) {
    const dayWins = wins.find((w) => w.date === day.date)
    if (dayWins) totalWins += dayWins.wins.length

    const oneThing = oneThings.find((e) => e.date === day.date)
    if (oneThing?.completed) oneThingCompleted++

    const pulse = pulses.find((p) => p.date === day.date)
    if (pulse) {
      for (const entry of pulse.entries) {
        if (entry.energy > 0) energies.push(entry.energy)
      }
    }
  }

  return {
    weekStart: weekStartDate,
    weekEnd: formatDate(end),
    activeDays: weekDays.filter((d) => d.level > 0).length,
    totalWins,
    avgEnergy: energies.length > 0 ? energies.reduce((s, e) => s + e, 0) / energies.length : null,
    oneThingCompleted,
  }
}

/**
 * Get summary stats for the heatmap header
 */
export function getActivitySummary(data: DayActivity[]): {
  activeDays: number
  totalDays: number
  currentStreak: number
  longestStreak: number
} {
  const activeDays = data.filter((d) => d.level > 0).length
  const totalDays = data.length

  let currentStreak = 0
  for (let i = data.length - 1; i >= 0; i--) {
    if (data[i].level > 0) currentStreak++
    else break
  }

  let longestStreak = 0
  let tempStreak = 0
  for (const day of data) {
    if (day.level > 0) {
      tempStreak++
      if (tempStreak > longestStreak) longestStreak = tempStreak
    } else {
      tempStreak = 0
    }
  }

  return { activeDays, totalDays, currentStreak, longestStreak }
}

// ---- Helpers ----

function formatDate(d: Date): string {
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}
