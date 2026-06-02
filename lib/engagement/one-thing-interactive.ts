// ============================================================
// One Thing Today — Interactive Upgrade
// Adds completion tracking, streaks, and weekly reflections
// ============================================================

import type { OneThingEntry, WeeklyReflection, StreakData } from "./types"
import type { PatternMap } from "../assessments/types"
import { getOneThingToday } from "../one-thing-today"

const ONE_THING_KEY = "mindful-mama-one-thing-history"
const ONE_THING_STREAK_KEY = "mindful-mama-one-thing-streak"

// ---- Core Functions ----

export function getTodaysOneThing(patternMap: PatternMap | null): OneThingEntry {
  const today = getToday()
  const history = getOneThingHistory()
  const existing = history.find((e) => e.date === today)

  if (existing) return existing

  // Generate from the existing one-thing-today system
  const generated = getOneThingToday(patternMap)
  const entry: OneThingEntry = {
    date: today,
    action: generated.action,
    why: generated.why,
    timeNeeded: generated.timeNeeded,
    category: generated.category,
    completed: false,
  }

  // Save it so it persists for the day
  saveEntry(entry)
  return entry
}

export function markOneThingComplete(): OneThingEntry | null {
  const today = getToday()
  const history = getOneThingHistory()
  const index = history.findIndex((e) => e.date === today)

  if (index < 0) return null

  history[index].completed = true
  history[index].completedAt = Date.now()

  try {
    localStorage.setItem(ONE_THING_KEY, JSON.stringify(history))
  } catch {}

  updateStreak()
  return history[index]
}

export function unmarkOneThing(): void {
  const today = getToday()
  const history = getOneThingHistory()
  const index = history.findIndex((e) => e.date === today)

  if (index >= 0) {
    history[index].completed = false
    history[index].completedAt = undefined
    try {
      localStorage.setItem(ONE_THING_KEY, JSON.stringify(history))
    } catch {}
  }
}

// ---- History & Streaks ----

export function getOneThingHistory(): OneThingEntry[] {
  try {
    const data = localStorage.getItem(ONE_THING_KEY)
    if (!data) return []
    return JSON.parse(data)
  } catch {
    return []
  }
}

export function getOneThingStreak(): StreakData {
  try {
    const data = localStorage.getItem(ONE_THING_STREAK_KEY)
    if (data) return JSON.parse(data)
  } catch {}
  return { currentStreak: 0, longestStreak: 0, lastActiveDate: "" }
}

function updateStreak(): void {
  const streak = getOneThingStreak()
  const today = getToday()
  const yesterday = getYesterday()

  if (streak.lastActiveDate === today) return

  if (streak.lastActiveDate === yesterday) {
    streak.currentStreak += 1
  } else {
    streak.currentStreak = 1
  }

  streak.lastActiveDate = today
  if (streak.currentStreak > streak.longestStreak) {
    streak.longestStreak = streak.currentStreak
  }

  try {
    localStorage.setItem(ONE_THING_STREAK_KEY, JSON.stringify(streak))
  } catch {}
}

// ---- Weekly Reflection ----

export function getWeeklyReflection(): WeeklyReflection | null {
  const history = getOneThingHistory()
  if (history.length < 3) return null // Need at least 3 days

  const weekStart = getWeekStart()
  const weekEnd = new Date(weekStart)
  weekEnd.setDate(weekEnd.getDate() + 7)
  const weekEndStr = formatDate(weekEnd)

  const thisWeek = history.filter((e) => e.date >= weekStart && e.date < weekEndStr)
  if (thisWeek.length === 0) return null

  const completed = thisWeek.filter((e) => e.completed).length
  const total = thisWeek.length

  let insight: string
  const ratio = completed / total

  if (ratio === 1) {
    insight = "Every single day this week, you showed up for yourself. That's not a small thing — that's a pattern of someone who's choosing herself."
  } else if (ratio >= 0.7) {
    insight = `${completed} out of ${total} days. That's consistency. Not perfection — consistency. Which is what actually changes things.`
  } else if (ratio >= 0.4) {
    insight = `${completed} out of ${total} days. Some days you had capacity. Some days you didn't. Both are valid. You still showed up more than you didn't.`
  } else if (completed > 0) {
    insight = `${completed} out of ${total} days. Hard week? That's okay. The fact that you did it at all — even once — means the thread isn't broken.`
  } else {
    insight = "This week was survival. That's data, not failure. When you're ready, the next one thing will be here."
  }

  return { weekStart, completedCount: completed, totalDays: total, insight }
}

// ---- Last 7 Days View ----

export function getLast7Days(): { date: string; completed: boolean; action?: string }[] {
  const history = getOneThingHistory()
  const days: { date: string; completed: boolean; action?: string }[] = []

  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const dateStr = formatDate(d)
    const entry = history.find((e) => e.date === dateStr)
    days.push({
      date: dateStr,
      completed: entry?.completed || false,
      action: entry?.action,
    })
  }

  return days
}

// ---- Helpers ----

function saveEntry(entry: OneThingEntry): void {
  const history = getOneThingHistory()
  // Don't duplicate
  if (history.some((e) => e.date === entry.date)) return

  history.push(entry)
  // Keep last 90 days
  const trimmed = history.slice(-90)
  try {
    localStorage.setItem(ONE_THING_KEY, JSON.stringify(trimmed))
  } catch {}
}

function getToday(): string {
  return formatDate(new Date())
}

function getYesterday(): string {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return formatDate(d)
}

function getWeekStart(): string {
  const now = new Date()
  const day = now.getDay()
  const diff = day === 0 ? 6 : day - 1 // Monday = start of week
  const monday = new Date(now)
  monday.setDate(now.getDate() - diff)
  return formatDate(monday)
}

function formatDate(d: Date): string {
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}
