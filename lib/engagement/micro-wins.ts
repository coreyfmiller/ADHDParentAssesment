// ============================================================
// Micro-Win Logger — "I Did a Thing"
// Tracks tiny wins throughout the day, provides reflections
// ============================================================

import type { MicroWin, DailyWins, StreakData } from "./types"
import type { PatternMap } from "../assessments/types"

const WINS_KEY = "mindful-mama-micro-wins"
const STREAK_KEY = "mindful-mama-wins-streak"

// ---- Storage ----

export function getWinsForDate(date: string): MicroWin[] {
  try {
    const all = getAllWins()
    const day = all.find((d) => d.date === date)
    return day?.wins || []
  } catch {
    return []
  }
}

export function getTodaysWins(): MicroWin[] {
  return getWinsForDate(getToday())
}

export function getAllWins(): DailyWins[] {
  try {
    const data = localStorage.getItem(WINS_KEY)
    if (!data) return []
    return JSON.parse(data)
  } catch {
    return []
  }
}

export function addWin(text: string, patternMap: PatternMap | null): MicroWin {
  const win: MicroWin = {
    id: generateId(),
    text: text.trim(),
    timestamp: Date.now(),
    category: categorizeWin(text),
    reflection: generateReflection(text, patternMap),
  }

  const all = getAllWins()
  const today = getToday()
  const dayIndex = all.findIndex((d) => d.date === today)

  if (dayIndex >= 0) {
    all[dayIndex].wins.push(win)
  } else {
    all.push({ date: today, wins: [win] })
  }

  // Keep last 90 days
  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - 90)
  const cutoffStr = formatDate(cutoff)
  const trimmed = all.filter((d) => d.date >= cutoffStr)

  try {
    localStorage.setItem(WINS_KEY, JSON.stringify(trimmed))
  } catch {}

  updateStreak()
  return win
}

export function removeWin(winId: string): void {
  const all = getAllWins()
  for (const day of all) {
    day.wins = day.wins.filter((w) => w.id !== winId)
  }
  const filtered = all.filter((d) => d.wins.length > 0)
  try {
    localStorage.setItem(WINS_KEY, JSON.stringify(filtered))
  } catch {}
}

// ---- Streaks ----

export function getWinStreak(): StreakData {
  try {
    const data = localStorage.getItem(STREAK_KEY)
    if (data) return JSON.parse(data)
  } catch {}
  return { currentStreak: 0, longestStreak: 0, lastActiveDate: "" }
}

function updateStreak(): void {
  const streak = getWinStreak()
  const today = getToday()
  const yesterday = getYesterday()

  if (streak.lastActiveDate === today) {
    // Already counted today
    return
  }

  if (streak.lastActiveDate === yesterday) {
    // Continuing streak
    streak.currentStreak += 1
  } else if (streak.lastActiveDate !== today) {
    // Streak broken (or first entry)
    streak.currentStreak = 1
  }

  streak.lastActiveDate = today
  if (streak.currentStreak > streak.longestStreak) {
    streak.longestStreak = streak.currentStreak
  }

  try {
    localStorage.setItem(STREAK_KEY, JSON.stringify(streak))
  } catch {}
}

// ---- Daily Summary ----

export function getDailySummary(date?: string): { count: number; categories: Record<string, number> } {
  const wins = getWinsForDate(date || getToday())
  const categories: Record<string, number> = {}
  for (const win of wins) {
    categories[win.category] = (categories[win.category] || 0) + 1
  }
  return { count: wins.length, categories }
}

// ---- Win Categorization ----

const categoryKeywords: Record<string, string[]> = {
  survival: ["fed", "ate", "cereal", "shower", "dressed", "alive", "survived", "got up", "woke", "morning", "laundry", "dishes", "cleaned"],
  care: ["water", "rest", "nap", "walked", "outside", "breath", "sat down", "quiet", "alone", "bath"],
  connection: ["talked", "texted", "called", "hugged", "played", "listened", "friend", "partner", "laughed"],
  progress: ["finished", "started", "made", "organized", "planned", "booked", "appointment", "email", "paid", "submitted"],
  rest: ["slept", "rested", "said no", "cancelled", "skipped", "let go", "didn't", "stopped"],
}

function categorizeWin(text: string): MicroWin["category"] {
  const lower = text.toLowerCase()
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some((kw) => lower.includes(kw))) {
      return category as MicroWin["category"]
    }
  }
  return "uncategorized"
}

// ---- Reflections (pattern-aware responses) ----

const reflections: Record<string, string[]> = {
  survival: [
    "That counts. Especially today.",
    "Keeping humans alive is real work. You did it.",
    "Survival mode is still mode. You're still here.",
    "The bare minimum when you're depleted IS the maximum. Well done.",
    "Not glamorous. Still counts.",
  ],
  care: [
    "You chose yourself for a moment. That's not selfish — it's sustainable.",
    "Your body needed that. Thank you for listening to it.",
    "Self-care when you're depleted isn't indulgent. It's maintenance.",
    "One small act of care. The compound effect is real.",
    "You can't pour from empty. This is you refilling.",
  ],
  connection: [
    "Human connection is a biological need, not a luxury. Good.",
    "You let someone in. That takes more courage than people realize.",
    "Connection is medicine. You just took your dose.",
    "Relationships need tending. You tended.",
    "That moment of connection matters more than you think.",
  ],
  progress: [
    "Look at you, getting things done despite everything stacking against you.",
    "Executive function win. Your brain showed up today.",
    "One thing forward. That's all it takes.",
    "Done is better than perfect. And you got it done.",
    "Progress doesn't require perfection. This is proof.",
  ],
  rest: [
    "Choosing rest is an act of rebellion against a system that wants you depleted.",
    "You protected your energy. That's a skill.",
    "Saying no is a complete sentence. You used it.",
    "Rest is not laziness. It's recovery. You chose recovery.",
    "The hardest thing for a depleted person to do is stop. You stopped.",
  ],
  uncategorized: [
    "Logged. Counted. Real.",
    "Another thing you did that you might have forgotten by tonight. Not anymore.",
    "This is evidence. Against the voice that says you do nothing.",
    "Small? Maybe. But it happened. You made it happen.",
    "Added to your evidence file. You're building a case for yourself.",
  ],
}

function generateReflection(text: string, patternMap: PatternMap | null): string {
  const category = categorizeWin(text)
  const pool = reflections[category] || reflections.uncategorized

  // Add pattern-aware reflections for critical dimensions
  if (patternMap) {
    const critical = patternMap.dimensions.filter((d) => d.intensity === "critical")
    const high = patternMap.dimensions.filter((d) => d.intensity === "high")

    if (critical.length >= 2 && category === "survival") {
      return "Multiple systems at critical and you still did this. That's not nothing. That's everything."
    }
    if (high.some((d) => d.dimension === "physical-depletion") && category === "care") {
      return "Your body is running on fumes and you still chose to care for it. That matters more than you know right now."
    }
    if (high.some((d) => d.dimension === "cognitive-load") && category === "progress") {
      return "Your working memory is maxed and you still got something done. Your brain is working harder than anyone sees."
    }
    if (high.some((d) => d.dimension === "identity-erosion") && category === "rest") {
      return "You chose yourself. Not mom-you. Just you. Keep that thread alive."
    }
  }

  // Deterministic selection based on time so it feels fresh
  const index = Math.floor(Date.now() / 60000) % pool.length
  return pool[index]
}

// ---- Helpers ----

function generateId(): string {
  return `win-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function getToday(): string {
  return formatDate(new Date())
}

function getYesterday(): string {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return formatDate(d)
}

function formatDate(d: Date): string {
  return d.toISOString().split("T")[0]
}

// ---- Weekly Stats (for Evidence Journal) ----

export function getWeeklyWinStats(weekStartDate: string): {
  totalWins: number
  daysActive: number
  topCategories: { category: string; count: number }[]
  topWins: MicroWin[]
} {
  const all = getAllWins()
  const start = new Date(weekStartDate)
  const end = new Date(weekStartDate)
  end.setDate(end.getDate() + 7)
  const endStr = formatDate(end)

  const weekDays = all.filter((d) => d.date >= weekStartDate && d.date < endStr)
  const allWins = weekDays.flatMap((d) => d.wins)

  const catCounts: Record<string, number> = {}
  for (const win of allWins) {
    catCounts[win.category] = (catCounts[win.category] || 0) + 1
  }

  const topCategories = Object.entries(catCounts)
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 3)

  // Top wins = most recent from each active day
  const topWins = weekDays
    .map((d) => d.wins[d.wins.length - 1])
    .filter(Boolean)
    .slice(0, 5)

  return {
    totalWins: allWins.length,
    daysActive: weekDays.length,
    topCategories,
    topWins,
  }
}
