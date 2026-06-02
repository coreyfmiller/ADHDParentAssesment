// ============================================================
// Daily Identity Anchor — "Who I Am Today"
// One personalized statement each morning to rebuild self-worth
// ============================================================

import type { IdentityAnchor } from "./types"
import type { PatternMap } from "../assessments/types"

const ANCHORS_KEY = "mindful-mama-identity-anchors"
const SAVED_KEY = "mindful-mama-saved-anchors"

// ---- Statement Pools by Dimension ----

const anchorsByDimension: Record<string, string[]> = {
  "cognitive-load": [
    "Today you are allowed to forget things without it meaning you're broken.",
    "Your brain works differently. That's neurology, not failure.",
    "Today you are someone who does what she can — not what the world expects.",
    "You are not your to-do list. You are the person underneath it.",
    "Having a loud brain doesn't make you a bad mother. It makes you a tired one.",
    "Today you are allowed to do one thing at a time.",
    "Your worth is not measured by how much you remember.",
    "A scattered brain in an overwhelming world is a normal brain. You're not defective.",
    "Today you are someone who is allowed to write things down instead of holding them.",
    "Executive function is a brain resource, not a character trait. Yours is depleted, not absent.",
  ],
  "emotional-bandwidth": [
    "Today you are allowed to feel angry without being a bad person.",
    "Your emotions are information, not evidence of failure.",
    "Today you are someone whose feelings make sense given what she's carrying.",
    "You are allowed to not be okay. That's not weakness — it's honesty.",
    "Reactivity is a signal, not a sentence. You can repair. You always repair.",
    "Today you are more than your worst moment yesterday.",
    "Your capacity has a limit. Hitting it doesn't make you broken.",
    "You are allowed to feel resentment without it meaning you're ungrateful.",
    "Today you are someone who is learning, not someone who should already know.",
    "The fact that you care this much about getting it right IS the evidence that you're a good mother.",
  ],
  "physical-depletion": [
    "Today you are allowed to rest without earning it first.",
    "Your body is not a machine. It's allowed to be tired.",
    "Today you are someone who deserves care — not just someone who gives it.",
    "Exhaustion is not laziness. It's your body telling the truth.",
    "You are allowed to need more sleep than you're getting.",
    "Today you are a person, not a function. Persons need rest.",
    "Your tiredness is real. It's not in your head. It's in your bones.",
    "Today you are allowed to do less and still be enough.",
    "Running on empty is not a badge of honor. It's a wound.",
    "You deserve the same gentleness you give your children when they're tired.",
  ],
  "system-friction": [
    "Today you are allowed to lower one standard without guilt.",
    "The chaos is not your fault. The system was never designed for one person to run.",
    "You are doing the work of three people. Of course it's not perfect.",
    "Today you are someone who is allowed to ask for help without justifying it.",
    "Cereal for dinner is a valid choice made by a person managing an impossible load.",
    "You are not failing at life. Life is failing to support you.",
    "Today you are allowed to let something go undone.",
    "The invisible labor you do would break most people. You're still standing.",
    "Today you are someone whose imperfect systems still keep humans alive and loved.",
    "You don't need a better attitude. You need a better structure. That's not your fault.",
  ],
  "identity-erosion": [
    "Today you are a person — not just a role.",
    "You existed before them. You still exist now. Even if it doesn't feel like it.",
    "Today you are allowed to want things that have nothing to do with your children.",
    "Your name is not 'Mom.' You have a name. Say it.",
    "Today you are someone whose desires matter — not just everyone else's.",
    "You are allowed to miss who you were without being ungrateful for who you are.",
    "Today you are more than what you provide.",
    "Losing yourself in motherhood is not a personal failure. It's a cultural one.",
    "Today you are someone who is allowed to take up space — not just hold space.",
    "The resentment you feel is not a character flaw. It's a signal that something is unsustainable.",
  ],
}

const generalAnchors = [
  "Today you are enough. Not because you did enough — because you ARE enough.",
  "You are not behind. There is no schedule. You are exactly where a person with your load would be.",
  "Today you are allowed to be imperfect and still be good.",
  "The fact that you're trying this hard means you care. Caring is not the problem.",
  "Today you are someone who deserves compassion — especially from herself.",
  "You are not too much. You are not too little. You are a whole person having a hard time.",
  "Today you are allowed to start over. Again. As many times as you need.",
  "Grace is not something you earn. It's something you deserve. Today, give it to yourself.",
  "You are doing something incredibly hard with very little support. That's not weakness. That's endurance.",
  "Today you are someone whose best is allowed to look different than yesterday's best.",
]

// ---- Core Functions ----

export function getTodaysAnchor(patternMap: PatternMap | null): IdentityAnchor {
  const today = getToday()

  // Check if we already generated one today
  const existing = getSavedAnchorsHistory().find((a) => a.date === today)
  if (existing) return existing

  // Generate a new one
  const statement = generateAnchor(patternMap)
  const anchor: IdentityAnchor = { date: today, statement, saved: false }

  // Save to history
  saveAnchorToHistory(anchor)
  return anchor
}

export function saveAnchorAsFavorite(date: string): void {
  const history = getSavedAnchorsHistory()
  const entry = history.find((a) => a.date === date)
  if (entry) {
    entry.saved = true
    try {
      localStorage.setItem(ANCHORS_KEY, JSON.stringify(history))
    } catch {}
  }

  // Also add to saved favorites list
  const favorites = getSavedFavorites()
  const anchor = history.find((a) => a.date === date)
  if (anchor && !favorites.includes(anchor.statement)) {
    favorites.push(anchor.statement)
    try {
      localStorage.setItem(SAVED_KEY, JSON.stringify(favorites))
    } catch {}
  }
}

export function unsaveAnchor(date: string): void {
  const history = getSavedAnchorsHistory()
  const entry = history.find((a) => a.date === date)
  if (entry) {
    entry.saved = false
    try {
      localStorage.setItem(ANCHORS_KEY, JSON.stringify(history))
    } catch {}

    // Remove from favorites
    const favorites = getSavedFavorites().filter((f) => f !== entry.statement)
    try {
      localStorage.setItem(SAVED_KEY, JSON.stringify(favorites))
    } catch {}
  }
}

export function getSavedFavorites(): string[] {
  try {
    const data = localStorage.getItem(SAVED_KEY)
    if (!data) return []
    return JSON.parse(data)
  } catch {
    return []
  }
}

export function getSavedAnchorsHistory(): IdentityAnchor[] {
  try {
    const data = localStorage.getItem(ANCHORS_KEY)
    if (!data) return []
    return JSON.parse(data)
  } catch {
    return []
  }
}

// ---- Generation ----

function generateAnchor(patternMap: PatternMap | null): string {
  const pool: string[] = []

  if (patternMap) {
    // Prioritize statements from elevated dimensions
    const elevated = patternMap.dimensions.filter(
      (d) => d.intensity === "high" || d.intensity === "critical"
    )

    for (const dim of elevated) {
      const dimAnchors = anchorsByDimension[dim.dimension]
      if (dimAnchors) {
        pool.push(...dimAnchors)
      }
    }
  }

  // Always include some general ones
  pool.push(...generalAnchors)

  // Select based on day of year (deterministic, rotates daily)
  const dayOfYear = getDayOfYear()
  const index = dayOfYear % pool.length

  return pool[index]
}

function saveAnchorToHistory(anchor: IdentityAnchor): void {
  const history = getSavedAnchorsHistory()
  // Don't duplicate
  if (history.some((a) => a.date === anchor.date)) return

  history.push(anchor)
  // Keep last 90 days
  const trimmed = history.slice(-90)
  try {
    localStorage.setItem(ANCHORS_KEY, JSON.stringify(trimmed))
  } catch {}
}

// ---- Helpers ----

function getToday(): string {
  const d = new Date()
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

function getDayOfYear(): number {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  const diff = now.getTime() - start.getTime()
  return Math.floor(diff / 86400000)
}
