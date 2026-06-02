// ============================================================
// Engagement System — Core Types
// Daily touchpoints that build self-worth through evidence
// ============================================================

// ---- Micro-Win Logger ("I Did a Thing") ----

export interface MicroWin {
  id: string
  text: string
  timestamp: number
  category: "survival" | "care" | "connection" | "progress" | "rest" | "exercise" | "uncategorized"
  reflection?: string // AI-generated or pattern-based response
}

export interface DailyWins {
  date: string // YYYY-MM-DD
  wins: MicroWin[]
}

// ---- Pulse Check-Ins (3x/day) ----

export type PulseTime = "morning" | "afternoon" | "evening"

export interface PulseEntry {
  id: string
  time: PulseTime
  date: string // YYYY-MM-DD
  timestamp: number
  energy: number // 1-5
  response?: string // afternoon: ate/water/outside, evening: one word
  note?: string
}

export interface DailyPulse {
  date: string
  entries: PulseEntry[]
}

// ---- One Thing Today (Interactive Upgrade) ----

export interface OneThingEntry {
  date: string // YYYY-MM-DD
  action: string
  why: string
  timeNeeded: string
  category: string
  completed: boolean
  completedAt?: number
}

export interface WeeklyReflection {
  weekStart: string // YYYY-MM-DD (Monday)
  completedCount: number
  totalDays: number
  insight: string
}

// ---- Daily Identity Anchor ----

export interface IdentityAnchor {
  date: string // YYYY-MM-DD
  statement: string
  saved: boolean
}

// ---- Evidence Journal (Weekly Summary) ----

export interface WeeklyEvidence {
  weekStart: string // YYYY-MM-DD
  generatedAt: number
  winsCount: number
  topWins: MicroWin[]
  pulseInsight: string
  energyTrend: "improving" | "declining" | "stable" | "fluctuating"
  averageEnergy: number
  oneThingStreak: number
  personalInsight: string
}

// ---- Streak Tracking ----

export interface StreakData {
  currentStreak: number
  longestStreak: number
  lastActiveDate: string // YYYY-MM-DD
}
