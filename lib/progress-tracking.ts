// ============================================================
// Progress Tracking — Stores historical snapshots and shows
// change over time
// ============================================================

import type { PatternMap, DimensionScore } from "./assessments/types"

const HISTORY_KEY = "mindful-mama-snapshot-history"

export interface SnapshotHistoryEntry {
  patternMap: PatternMap
  takenAt: number
}

export interface DimensionChange {
  dimension: string
  label: string
  previousIntensity: string
  currentIntensity: string
  direction: "improved" | "worsened" | "unchanged"
  previousScore: number
  currentScore: number
}

/**
 * Save a snapshot to history (called when a new snapshot is completed)
 */
export function saveSnapshotToHistory(patternMap: PatternMap): void {
  try {
    const history = getSnapshotHistory()
    history.push({ patternMap, takenAt: Date.now() })
    // Keep last 12 entries (one per month for a year)
    const trimmed = history.slice(-12)
    localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed))
  } catch {}
}

/**
 * Get all historical snapshots
 */
export function getSnapshotHistory(): SnapshotHistoryEntry[] {
  try {
    const data = localStorage.getItem(HISTORY_KEY)
    if (!data) return []
    return JSON.parse(data)
  } catch {
    return []
  }
}

/**
 * Compare current snapshot to the most recent previous one
 */
export function getProgressComparison(currentMap: PatternMap): DimensionChange[] | null {
  const history = getSnapshotHistory()
  // Need at least 2 entries (current + one previous)
  if (history.length < 2) return null

  // Get the second-to-last entry (the previous one)
  const previous = history[history.length - 2]
  const changes: DimensionChange[] = []

  for (const currentDim of currentMap.dimensions) {
    const prevDim = previous.patternMap.dimensions.find(
      (d) => d.dimension === currentDim.dimension
    )
    if (!prevDim) continue

    const intensityOrder = { low: 1, moderate: 2, high: 3, critical: 4 }
    const prevVal = intensityOrder[prevDim.intensity as keyof typeof intensityOrder] || 0
    const currVal = intensityOrder[currentDim.intensity as keyof typeof intensityOrder] || 0

    let direction: "improved" | "worsened" | "unchanged" = "unchanged"
    if (currVal < prevVal) direction = "improved"
    else if (currVal > prevVal) direction = "worsened"

    changes.push({
      dimension: currentDim.dimension,
      label: currentDim.label,
      previousIntensity: prevDim.intensity,
      currentIntensity: currentDim.intensity,
      direction,
      previousScore: prevDim.score,
      currentScore: currentDim.score,
    })
  }

  return changes
}

/**
 * Get a human-readable summary of progress
 */
export function getProgressSummary(changes: DimensionChange[]): string {
  const improved = changes.filter((c) => c.direction === "improved")
  const worsened = changes.filter((c) => c.direction === "worsened")
  const unchanged = changes.filter((c) => c.direction === "unchanged")

  if (improved.length > 0 && worsened.length === 0) {
    return `${improved.map((c) => c.label).join(" and ")} ${improved.length === 1 ? "has" : "have"} improved since your last check-in. The work you're doing is showing up in the data.`
  }

  if (improved.length > 0 && worsened.length > 0) {
    return `${improved.map((c) => c.label).join(" and ")} improved, while ${worsened.map((c) => c.label).join(" and ")} ${worsened.length === 1 ? "has" : "have"} increased. Shifts in one area sometimes temporarily strain another — that's normal during change.`
  }

  if (worsened.length > 0 && improved.length === 0) {
    return `Some areas have intensified since last time. That's not failure — it may reflect a harder season, a life change, or simply more honest answers now that you know yourself better.`
  }

  return "Your pattern is holding steady. Stability during a hard season is its own kind of progress."
}
