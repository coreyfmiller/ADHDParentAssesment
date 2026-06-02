// ============================================================
// One Thing Today — Interactive Upgrade
// Adds completion tracking, streaks, and weekly reflections
// ============================================================

import type { OneThingEntry, WeeklyReflection, StreakData } from "./types"
import type { PatternMap } from "../assessments/types"
import { getOneThingToday } from "../one-thing-today"
import { getThisWeeksHardThing } from "./whats-hard-this-week"

const ONE_THING_KEY = "mindful-mama-one-thing-history"
const ONE_THING_STREAK_KEY = "mindful-mama-one-thing-streak"

// ---- Core Functions ----

export function getTodaysOneThing(
  patternMap: PatternMap | null,
  aiOneThing?: { action: string; why: string; timeNeeded: string }
): OneThingEntry {
  const today = getToday()
  const history = getOneThingHistory()
  const existing = history.find((e) => e.date === today)

  if (existing) return existing

  // Use AI-generated content if available
  if (aiOneThing) {
    const entry: OneThingEntry = {
      date: today,
      action: aiOneThing.action,
      why: aiOneThing.why,
      timeNeeded: aiOneThing.timeNeeded,
      category: "ai-generated",
      completed: false,
    }
    saveEntry(entry)
    return entry
  }

  // Check if there's a hard thing this week — 30% chance to generate a prep action
  const hardThing = getThisWeeksHardThing()
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000)

  let generated
  if (hardThing && dayOfYear % 3 === 0) {
    generated = getHardThingAction(hardThing.text, hardThing.tags)
  } else {
    generated = getOneThingToday(patternMap)
  }

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

// ---- Hard Thing Prep Actions ----

interface DailyAction {
  action: string
  why: string
  timeNeeded: string
  category: string
}

function getHardThingAction(text: string, tags: string[]): DailyAction {
  const actions: DailyAction[] = []

  if (tags.includes("school")) {
    actions.push(
      { action: `Write down your 3 key points for "${text}." Not a script — just 3 things you need them to hear.`, why: "Having your priorities externalized means you won't freeze or forget in the moment. Three is manageable.", timeNeeded: "3 min", category: "prep" },
      { action: `Decide in advance: what's the ONE outcome you need from "${text}"? Write it on your hand if you have to.`, why: "Knowing your non-negotiable keeps you anchored when the conversation drifts or gets overwhelming.", timeNeeded: "1 min", category: "prep" },
    )
  }

  if (tags.includes("medical")) {
    actions.push(
      { action: `Write your questions for the appointment on your phone. You'll forget them in the room otherwise.`, why: "White coat syndrome + executive function challenges = blank mind. Your phone is your external brain.", timeNeeded: "3 min", category: "prep" },
      { action: `Give yourself permission to say 'I need to think about that' if they suggest something unexpected.`, why: "You don't owe anyone an immediate decision about your health or your child's. Pressure is not urgency.", timeNeeded: "0 min", category: "prep" },
    )
  }

  if (tags.includes("social")) {
    actions.push(
      { action: `Set a mental time limit for "${text}" before you go. Decide when you'll leave — and honor it.`, why: "An exit plan reduces anticipatory anxiety by 40%. Knowing you CAN leave makes staying bearable.", timeNeeded: "1 min", category: "prep" },
      { action: `Prep one small-talk question so your brain doesn't have to generate conversation from scratch.`, why: "Social interactions are executive function tasks in disguise. Pre-loading one question reduces the cognitive demand.", timeNeeded: "1 min", category: "prep" },
    )
  }

  if (tags.includes("work")) {
    actions.push(
      { action: `Identify the ONE thing that needs to happen at "${text}" for it to count as a win. Just one.`, why: "Overwhelm comes from seeing the whole mountain. Pick one rock. Move it. That's the win.", timeNeeded: "1 min", category: "prep" },
    )
  }

  if (tags.includes("family")) {
    actions.push(
      { action: `Decide your one boundary in advance for "${text}." What topic will you not engage with today?`, why: "Boundaries decided under pressure fail. Boundaries decided in advance hold. Choose one and practice saying it.", timeNeeded: "2 min", category: "prep" },
      { action: `Give yourself a silent mantra for the hard moment: 'I don't have to fix this. I just have to get through it.'`, why: "Mantras work because they occupy your inner monologue — leaving less room for the shame/guilt spiral to take over.", timeNeeded: "0 min", category: "prep" },
    )
  }

  // Generic fallback for any hard thing
  if (actions.length === 0) {
    actions.push(
      { action: `Name the specific part of "${text}" that feels hardest. Not the whole thing — the one piece that makes your stomach clench.`, why: "Vague dread is always worse than specific fear. Naming the exact hard part makes it smaller and more manageable.", timeNeeded: "1 min", category: "prep" },
      { action: `Ask yourself: what's the absolute bare minimum version of handling "${text}" that would be acceptable?`, why: "Lowering the bar in advance isn't giving up — it's giving yourself permission to be human. You can always exceed the minimum.", timeNeeded: "1 min", category: "prep" },
      { action: `Remind yourself: you don't have to be good at "${text}." You just have to get through it. Getting through IS the win.`, why: "Performance pressure makes hard things harder. Releasing the need to do it well frees energy for just doing it.", timeNeeded: "0 min", category: "prep" },
    )
  }

  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000)
  return actions[dayOfYear % actions.length]
}
