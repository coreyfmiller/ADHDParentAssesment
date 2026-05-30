// ============================================================
// Multi-Pathway Assessment System — Core Types
// ============================================================

export interface AssessmentOption {
  id: string
  label: string
  /** Which dimension(s) this option contributes to, with weight */
  dimensions?: Record<string, number>
}

export interface AssessmentQuestion {
  id: string
  question: string
  description?: string
  options: AssessmentOption[]
}

export interface AssessmentSection {
  id: string
  title: string
  description?: string
  questions: AssessmentQuestion[]
}

export interface Assessment {
  id: string
  slug: string
  title: string
  subtitle: string
  description: string
  estimatedMinutes: number
  questionCount: number
  icon: string // lucide icon name
  color: string // tailwind color class
  sections: AssessmentSection[]
}

// ============================================================
// Overwhelm Snapshot — Pattern Map
// ============================================================

export interface DimensionScore {
  dimension: string
  label: string
  score: number
  maxScore: number
  intensity: "low" | "moderate" | "high" | "critical"
  description: string
}

export interface PatternMap {
  dimensions: DimensionScore[]
  recommendedPathways: PathwayRecommendation[]
  timestamp: number
}

export interface PathwayRecommendation {
  pathwayId: string
  slug: string
  title: string
  reason: string
  priority: "high" | "medium" | "low"
  icon: string
  color: string
}

// ============================================================
// Pathway Assessments — Results
// ============================================================

export interface PathwayResult {
  pathwayId: string
  completedAt: number
  answers: Record<string, string>
  patterns: PatternInsight[]
  strategies: StrategyGroup[]
}

export interface PatternInsight {
  id: string
  title: string
  description: string
  intensity: "low" | "moderate" | "high"
}

export interface Strategy {
  title: string
  description: string
  timeframe: "this-week" | "this-month" | "ongoing"
}

export interface StrategyGroup {
  category: string
  strategies: Strategy[]
}

export interface Script {
  title: string
  context: string
  script: string
  ageGroup?: string
}

// ============================================================
// User Profile — Integrated Picture
// ============================================================

export interface UserProfile {
  snapshotCompleted: boolean
  patternMap: PatternMap | null
  completedPathways: Record<string, PathwayResult>
  lastUpdated: number
}

// ============================================================
// Pathway Definitions (metadata only, not full questions)
// ============================================================

export interface PathwayMeta {
  id: string
  slug: string
  title: string
  subtitle: string
  description: string
  estimatedMinutes: number
  questionCount: number
  icon: string
  color: string
  available: boolean // false = coming soon
}

export const PATHWAYS: PathwayMeta[] = [
  {
    id: "executive-function",
    slug: "executive-function",
    title: "Executive Function & Daily Life",
    subtitle: "How your brain organizes, plans, and initiates",
    description: "Explore your relationship with time, task initiation, working memory, and the systems that help (or don't help) you manage daily life.",
    estimatedMinutes: 10,
    questionCount: 15,
    icon: "Brain",
    color: "bg-purple-500/10 text-purple-600",
    available: true,
  },
  {
    id: "depletion-burnout",
    slug: "depletion-burnout",
    title: "Depletion & Burnout",
    subtitle: "Where your energy goes and why there's none left",
    description: "Understand whether you're running on empty, what's draining you fastest, and the difference between 'I'm broken' and 'I'm depleted.'",
    estimatedMinutes: 10,
    questionCount: 15,
    icon: "Battery",
    color: "bg-amber-500/10 text-amber-600",
    available: true,
  },
  {
    id: "sensory-overwhelm",
    slug: "sensory-overwhelm",
    title: "Sensory & Overwhelm",
    subtitle: "Your nervous system's capacity and triggers",
    description: "Map your sensory triggers, understand your overwhelm patterns, and discover what your nervous system needs to stay regulated.",
    estimatedMinutes: 8,
    questionCount: 13,
    icon: "Volume2",
    color: "bg-rose-500/10 text-rose-600",
    available: true,
  },
  {
    id: "hormonal-patterns",
    slug: "hormonal-patterns",
    title: "Hormonal Patterns",
    subtitle: "The cyclical nature of your capacity",
    description: "Explore how hormonal fluctuations affect your executive function, mood, and energy — and how to plan around them instead of being blindsided.",
    estimatedMinutes: 8,
    questionCount: 11,
    icon: "Moon",
    color: "bg-indigo-500/10 text-indigo-600",
    available: true,
  },
  {
    id: "sleep-recovery",
    slug: "sleep-recovery",
    title: "Sleep & Recovery",
    subtitle: "Why rest isn't reaching you",
    description: "Understand the gap between how much sleep you get and how rested you feel — and what's blocking genuine recovery.",
    estimatedMinutes: 8,
    questionCount: 11,
    icon: "CloudMoon",
    color: "bg-sky-500/10 text-sky-600",
    available: true,
  },
  {
    id: "trauma-nervous-system",
    slug: "trauma-nervous-system",
    title: "Trauma & Nervous System",
    subtitle: "Survival strategies still running in the background",
    description: "Gently explore whether patterns from your own childhood are showing up in your parenting — and how to interrupt the cycle with compassion.",
    estimatedMinutes: 10,
    questionCount: 11,
    icon: "Shield",
    color: "bg-teal-500/10 text-teal-600",
    available: true,
  },
  {
    id: "systemic-load",
    slug: "systemic-load",
    title: "Systemic Load",
    subtitle: "The system is broken, not you",
    description: "Map the invisible labor, the division of responsibility, and the structural gaps that make everything harder than it needs to be.",
    estimatedMinutes: 8,
    questionCount: 12,
    icon: "Users",
    color: "bg-emerald-500/10 text-emerald-600",
    available: true,
  },
]
