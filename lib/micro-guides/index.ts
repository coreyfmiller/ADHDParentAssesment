// ============================================================
// Micro-Guides — Selection & Tracking
// ============================================================

import { MICRO_GUIDES as BATCH1 } from "./guides"
import { MICRO_GUIDES_BATCH2 } from "./guides-batch2"
import { MICRO_GUIDES_BATCH3 } from "./guides-batch3"
import { MICRO_GUIDES_BATCH4 } from "./guides-batch4"
import { MICRO_GUIDES_BATCH5 } from "./guides-batch5"
import type { MicroGuide } from "./types"
import type { PatternMap } from "../assessments/types"
import type { Archetype } from "../archetypes"
import { getUserContentTags } from "../user-basics"
import type { ContentTag } from "../user-basics"

export * from "./types"

// Combine all guide batches
export const MICRO_GUIDES: MicroGuide[] = [...BATCH1, ...MICRO_GUIDES_BATCH2, ...MICRO_GUIDES_BATCH3, ...MICRO_GUIDES_BATCH4, ...MICRO_GUIDES_BATCH5]

const READ_KEY = "mindful-mama-guides-read"
const DAILY_KEY = "mindful-mama-guide-today"

// ---- Read Tracking ----

export function getReadGuideIds(): string[] {
  try {
    const data = localStorage.getItem(READ_KEY)
    if (!data) return []
    return JSON.parse(data)
  } catch {
    return []
  }
}

export function markGuideRead(id: string): void {
  const read = getReadGuideIds()
  if (!read.includes(id)) {
    read.push(id)
    try { localStorage.setItem(READ_KEY, JSON.stringify(read)) } catch {}
  }
}

export function getReadCount(): number {
  return getReadGuideIds().length
}

// ---- Daily Selection ----

export function getTodaysGuide(
  patternMap: PatternMap | null,
  archetype: Archetype | null
): MicroGuide {
  // Check if we already selected one today
  const now = new Date()
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`
  try {
    const cached = localStorage.getItem(DAILY_KEY)
    if (cached) {
      const parsed = JSON.parse(cached)
      if (parsed.date === today && parsed.guideId) {
        const guide = MICRO_GUIDES.find(g => g.id === parsed.guideId)
        if (guide) return guide
      }
    }
  } catch {}

  // Select a new guide for today
  const guide = selectGuide(patternMap, archetype)

  // Cache it
  try {
    localStorage.setItem(DAILY_KEY, JSON.stringify({ date: today, guideId: guide.id }))
  } catch {}

  return guide
}

function selectGuide(
  patternMap: PatternMap | null,
  archetype: Archetype | null
): MicroGuide {
  const readIds = getReadGuideIds()
  const unread = MICRO_GUIDES.filter(g => !readIds.includes(g.id))

  // If all read, cycle back through
  let pool = unread.length > 0 ? unread : MICRO_GUIDES

  // FIRST: Filter by content relevance tags
  // Only show content that matches the user's identified conditions/context
  const userTags = getUserContentTags()
  const relevant = pool.filter(g => {
    // Guides without tags or with empty tags array are treated as universal
    if (!g.tags || g.tags.length === 0) return true
    // If guide has tags, at least one must match user's tags
    return g.tags.some(tag => userTags.includes(tag as ContentTag))
  })
  if (relevant.length > 0) pool = relevant

  // If we have archetype info, prioritize matching guides
  if (archetype) {
    const matching = pool.filter(g => g.archetypes.includes(archetype.id))
    if (matching.length > 0) {
      const dayOfYear = getDayOfYear()
      return matching[dayOfYear % matching.length]
    }
  }

  // If we have pattern map, prioritize elevated dimensions
  if (patternMap) {
    const elevated = patternMap.dimensions
      .filter(d => d.intensity === "high" || d.intensity === "critical")
      .map(d => d.dimension)

    if (elevated.length > 0) {
      const matching = pool.filter(g =>
        g.dimensions.some(d => elevated.includes(d))
      )
      if (matching.length > 0) {
        const dayOfYear = getDayOfYear()
        return matching[dayOfYear % matching.length]
      }
    }
  }

  // Fallback: rotate through all
  const dayOfYear = getDayOfYear()
  return pool[dayOfYear % pool.length]
}

// ---- Helpers ----

function getDayOfYear(): number {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  return Math.floor((now.getTime() - start.getTime()) / 86400000)
}
