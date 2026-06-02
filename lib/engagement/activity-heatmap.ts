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

export interface DayActivity {
  date: string // YYYY-MM-DD
  level: 0 | 1 | 2 | 3 // 0=no activity, 1=light, 2=moderate, 3=strong
  actions: number // total interactions that day
}

/**
 * Get the last N days of activity data for the heatmap.
 * Aggregates: wins logged, one-thing completed, pulse check-ins, whats-heavy entries.
 */
export function getActivityData(days: number = 30): DayActivity[] {
  const wins = getAllWins()
  const oneThings = getOneThingHistory()
  const pulses = getAllPulses()

  let heavyEntries: { date: string }[] = []
  try {
    heavyEntries = getAllHeavy()
  } catch {}

  const result: DayActivity[] = []
  const now = new Date()

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(d.getDate() - i)
    const dateStr = formatDate(d)

    let actions = 0

    // Wins logged that day
    const dayWins = wins.find((w) => w.date === dateStr)
    if (dayWins) actions += dayWins.wins.length

    // One Thing completed
    const oneThing = oneThings.find((e) => e.date === dateStr)
    if (oneThing?.completed) actions += 1

    // Pulse check-ins
    const pulse = pulses.find((p) => p.date === dateStr)
    if (pulse) actions += pulse.entries.length

    // What's heavy entry
    const heavy = heavyEntries.find((e) => e.date === dateStr)
    if (heavy) actions += 1

    // Determine level
    let level: DayActivity["level"] = 0
    if (actions >= 5) level = 3
    else if (actions >= 3) level = 2
    else if (actions >= 1) level = 1

    result.push({ date: dateStr, level, actions })
  }

  return result
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

  // Calculate current streak (from today backwards)
  let currentStreak = 0
  for (let i = data.length - 1; i >= 0; i--) {
    if (data[i].level > 0) currentStreak++
    else break
  }

  // Calculate longest streak
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
