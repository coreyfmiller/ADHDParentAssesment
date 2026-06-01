// ============================================================
// "What Worked" Tracker
//
// Psychology: Self-efficacy theory (Bandura) shows that
// remembering past successes is the strongest predictor of
// future success. When she can see "these 5 things actually
// worked for ME" — not generic advice, but her own evidence —
// she's more likely to try them again.
//
// This also feeds into the coach: "Last time you tried X and
// it helped. Want to try it again?" builds continuity and
// makes the AI feel like a real relationship.
// ============================================================

const WHAT_WORKED_KEY = "mindful-mama-what-worked"

export interface StrategyFeedback {
  id: string
  strategy: string
  source: "coach" | "one-thing" | "toolkit" | "manual"
  feedback: "worked" | "kinda" | "didnt-work"
  note?: string
  timestamp: number
  category?: string
}

// ---- Core Functions ----

export function logStrategyFeedback(
  strategy: string,
  feedback: StrategyFeedback["feedback"],
  source: StrategyFeedback["source"],
  note?: string,
  category?: string
): StrategyFeedback {
  const entry: StrategyFeedback = {
    id: `strat-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    strategy: strategy.trim(),
    source,
    feedback,
    note: note?.trim(),
    timestamp: Date.now(),
    category,
  }

  const all = getAllFeedback()
  all.push(entry)

  // Keep last 100 entries
  const trimmed = all.slice(-100)
  try {
    localStorage.setItem(WHAT_WORKED_KEY, JSON.stringify(trimmed))
  } catch {}

  return entry
}

export function getAllFeedback(): StrategyFeedback[] {
  try {
    const data = localStorage.getItem(WHAT_WORKED_KEY)
    if (!data) return []
    return JSON.parse(data)
  } catch {
    return []
  }
}

export function getWorkedStrategies(): StrategyFeedback[] {
  return getAllFeedback().filter((f) => f.feedback === "worked")
}

export function getKindaStrategies(): StrategyFeedback[] {
  return getAllFeedback().filter((f) => f.feedback === "kinda")
}

export function getDidntWorkStrategies(): StrategyFeedback[] {
  return getAllFeedback().filter((f) => f.feedback === "didnt-work")
}

/**
 * Get the user's personal "what works for me" playbook
 * Returns top strategies that worked, sorted by recency
 */
export function getPersonalPlaybook(): StrategyFeedback[] {
  const worked = getWorkedStrategies()
  // Most recent first, deduplicate by strategy text
  const seen = new Set<string>()
  const unique: StrategyFeedback[] = []
  for (const entry of worked.reverse()) {
    const key = entry.strategy.toLowerCase().slice(0, 50)
    if (!seen.has(key)) {
      seen.add(key)
      unique.push(entry)
    }
  }
  return unique.slice(0, 10) // Top 10
}

/**
 * Build a summary for the coach system prompt
 */
export function buildWhatWorkedPrompt(): string {
  const worked = getWorkedStrategies()
  const didnt = getDidntWorkStrategies()

  if (worked.length === 0 && didnt.length === 0) return ""

  let prompt = "\n\nStrategies she's tracked:"

  if (worked.length > 0) {
    prompt += "\n\nThings that WORKED for her:"
    const recent = worked.slice(-8)
    for (const entry of recent) {
      prompt += `\n- "${entry.strategy}"${entry.note ? ` (she noted: ${entry.note})` : ""}`
    }
  }

  if (didnt.length > 0) {
    prompt += "\n\nThings that DIDN'T work for her:"
    const recent = didnt.slice(-5)
    for (const entry of recent) {
      prompt += `\n- "${entry.strategy}"${entry.note ? ` (she noted: ${entry.note})` : ""}`
    }
    prompt += "\n\nDon't suggest strategies she's already tried and marked as not working."
  }

  return prompt
}
