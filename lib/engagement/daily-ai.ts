// ============================================================
// Daily AI — Client-side orchestration
//
// Makes ONE API call per day, caches the results in localStorage.
// Falls back to the pre-written content systems if the API fails.
// This is the cost-control layer: no matter how many times she
// opens the app, it only calls the API once per calendar day.
// ============================================================

import type { PatternMap } from "../assessments/types"
import type { Archetype } from "../archetypes"
import { getThisWeeksHardThing } from "./whats-hard-this-week"
import { getAllWins } from "./micro-wins"
import { getOneThingStreak } from "./one-thing-interactive"

const DAILY_AI_KEY = "mindful-mama-daily-ai"

export interface DailyAIContent {
  date: string // YYYY-MM-DD
  oneThing?: { action: string; why: string; timeNeeded: string }
  anchor?: string
  generatedAt: number
}

/**
 * Get today's AI-generated content.
 * Returns cached content if already generated today.
 * Returns null if API fails (caller should fall back to pre-written).
 */
export async function getDailyAIContent(
  patternMap: PatternMap | null,
  archetype: Archetype | null
): Promise<DailyAIContent | null> {
  const today = getToday()

  // Check cache first
  const cached = getCachedContent()
  if (cached && cached.date === today) {
    return cached
  }

  // Build context for the API call
  const context = buildContext(patternMap, archetype)

  try {
    const response = await fetch("/api/coach/daily", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(context),
    })

    if (!response.ok) return null

    const data = await response.json()
    if (data.error) return null

    const content: DailyAIContent = {
      date: today,
      oneThing: data.oneThing || undefined,
      anchor: data.anchor || undefined,
      generatedAt: Date.now(),
    }

    // Cache it
    try {
      localStorage.setItem(DAILY_AI_KEY, JSON.stringify(content))
    } catch {}

    return content
  } catch {
    return null
  }
}

/**
 * Get cached content without making an API call.
 * Used for synchronous access on initial render.
 */
export function getCachedDailyContent(): DailyAIContent | null {
  const cached = getCachedContent()
  const today = getToday()
  if (cached && cached.date === today) return cached
  return null
}

// ---- Internal ----

function getCachedContent(): DailyAIContent | null {
  try {
    const data = localStorage.getItem(DAILY_AI_KEY)
    if (!data) return null
    return JSON.parse(data)
  } catch {
    return null
  }
}

function buildContext(
  patternMap: PatternMap | null,
  archetype: Archetype | null
): Record<string, unknown> {
  const ctx: Record<string, unknown> = {}

  if (archetype) {
    ctx.archetype = archetype.name
  }

  if (patternMap) {
    const elevated = patternMap.dimensions
      .filter((d) => d.intensity === "high" || d.intensity === "critical")
      .map((d) => `${d.label} (${d.intensity})`)
    if (elevated.length > 0) ctx.elevatedDimensions = elevated
  }

  const hardThing = getThisWeeksHardThing()
  if (hardThing) {
    ctx.hardThing = hardThing.text
    ctx.hardThingTags = hardThing.tags
  }

  // Recent wins (last 3 days, max 5)
  const allWins = getAllWins()
  const recentWins = allWins
    .slice(-3)
    .flatMap((d) => d.wins.map((w) => w.text))
    .slice(-5)
  if (recentWins.length > 0) ctx.recentWins = recentWins

  // Energy trend (simple: from pulse data if available)
  // We don't import pulse here to keep it light — the pre-written system handles that
  
  const streak = getOneThingStreak()
  if (streak.currentStreak > 2) ctx.oneThingStreak = streak.currentStreak

  ctx.dayOfWeek = new Date().getDay()

  return ctx
}

function getToday(): string {
  const d = new Date()
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}
