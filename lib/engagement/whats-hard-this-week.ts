// ============================================================
// "What's Hard This Week" — Anticipatory Support
//
// Psychology: Research on implementation intentions (Gollwitzer, 1999)
// shows that naming a future challenge and pre-planning a response
// increases follow-through by 2-3x. This widget lets her name
// the hard thing coming — then the app references it, preps her,
// and follows up after.
//
// This creates a weekly thread of relevance: the app knows what's
// weighing on her and responds to it. That's the difference
// between a static tool and something that feels alive.
// ============================================================

const HARD_THING_KEY = "mindful-mama-whats-hard-week"

export interface HardThingEntry {
  id: string
  text: string
  setAt: number // timestamp when created
  weekStart: string // YYYY-MM-DD (Monday of that week)
  resolved: boolean
  resolvedAt?: number
  howItWent?: "better-than-expected" | "as-expected" | "harder-than-expected" | "didnt-happen"
  reflection?: string
  tags: string[] // auto-detected: school, medical, social, work, family, household, financial
}

export interface PrepSuggestion {
  text: string
  timing: "now" | "day-before" | "day-of" | "after"
  category: "script" | "action" | "mindset" | "system"
}

// ---- Core Functions ----

export function getThisWeeksHardThing(): HardThingEntry | null {
  const weekStart = getWeekStart()
  const all = getAllHardThings()
  return all.find((e) => e.weekStart === weekStart && !e.resolved) || null
}

export function setHardThing(text: string): HardThingEntry {
  const entry: HardThingEntry = {
    id: `hard-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    text: text.trim(),
    setAt: Date.now(),
    weekStart: getWeekStart(),
    resolved: false,
    tags: detectTags(text),
  }

  const all = getAllHardThings()
  // Replace any existing unresolved entry for this week
  const filtered = all.filter((e) => !(e.weekStart === entry.weekStart && !e.resolved))
  filtered.push(entry)

  // Keep last 52 weeks
  const trimmed = filtered.slice(-52)
  try {
    localStorage.setItem(HARD_THING_KEY, JSON.stringify(trimmed))
  } catch {}

  return entry
}

export function resolveHardThing(
  howItWent: HardThingEntry["howItWent"],
  reflection?: string
): HardThingEntry | null {
  const all = getAllHardThings()
  const weekStart = getWeekStart()
  const index = all.findIndex((e) => e.weekStart === weekStart && !e.resolved)

  if (index < 0) return null

  all[index].resolved = true
  all[index].resolvedAt = Date.now()
  all[index].howItWent = howItWent
  all[index].reflection = reflection

  try {
    localStorage.setItem(HARD_THING_KEY, JSON.stringify(all))
  } catch {}

  return all[index]
}

export function getAllHardThings(): HardThingEntry[] {
  try {
    const data = localStorage.getItem(HARD_THING_KEY)
    if (!data) return []
    return JSON.parse(data)
  } catch {
    return []
  }
}

export function getLastWeeksHardThing(): HardThingEntry | null {
  const lastWeek = getLastWeekStart()
  const all = getAllHardThings()
  return all.find((e) => e.weekStart === lastWeek) || null
}

// ---- Prep Suggestions ----

export function getPrepSuggestions(entry: HardThingEntry): PrepSuggestion[] {
  const suggestions: PrepSuggestion[] = []
  const tags = entry.tags

  if (tags.includes("school")) {
    suggestions.push(
      { text: "Write down your 3 key points before the meeting. Just 3.", timing: "day-before", category: "action" },
      { text: "You're allowed to say: 'I need time to think about that before I agree.'", timing: "day-of", category: "script" },
      { text: "You know your child better than anyone in that room. That's your authority.", timing: "day-of", category: "mindset" },
    )
  }

  if (tags.includes("medical")) {
    suggestions.push(
      { text: "Write your questions down. Bring the list. It's not weird — it's prepared.", timing: "day-before", category: "action" },
      { text: "'Can you explain that in simpler terms?' is always an okay thing to ask.", timing: "day-of", category: "script" },
      { text: "You deserve to understand what's happening with your body or your child's.", timing: "day-of", category: "mindset" },
    )
  }

  if (tags.includes("social")) {
    suggestions.push(
      { text: "You can leave early. You can say no to the invite. You can set a time limit in advance.", timing: "now", category: "mindset" },
      { text: "Prep one exit line: 'I've got to head out by [time] tonight.'", timing: "day-before", category: "script" },
      { text: "Decide in advance: what's your energy budget for this? Stick to it.", timing: "day-of", category: "system" },
    )
  }

  if (tags.includes("work")) {
    suggestions.push(
      { text: "Separate 'work stress' from 'home stress' — they feed each other if you let them.", timing: "now", category: "mindset" },
      { text: "What's the ONE outcome you need from this? Focus only on that.", timing: "day-of", category: "action" },
      { text: "You can be professional AND protect your energy. Those aren't opposites.", timing: "day-of", category: "mindset" },
    )
  }

  if (tags.includes("family")) {
    suggestions.push(
      { text: "You don't have to perform 'fine.' But you can decide in advance what you will and won't engage with.", timing: "day-before", category: "mindset" },
      { text: "'I'm not going to discuss that today' is a full response.", timing: "day-of", category: "script" },
      { text: "Plan your exit strategy before you arrive. Knowing you CAN leave makes staying easier.", timing: "day-before", category: "system" },
    )
  }

  if (tags.includes("household")) {
    suggestions.push(
      { text: "Break it into the smallest possible first step. Not the whole project — just step one.", timing: "now", category: "action" },
      { text: "Done is better than perfect. Especially with household tasks.", timing: "day-of", category: "mindset" },
      { text: "Can any part of this be delegated, simplified, or skipped entirely?", timing: "now", category: "system" },
    )
  }

  if (tags.includes("financial")) {
    suggestions.push(
      { text: "Money stress activates the same brain regions as physical pain. Be gentle with yourself.", timing: "now", category: "mindset" },
      { text: "What's the ONE next action? Not the whole problem — just the next step.", timing: "now", category: "action" },
      { text: "You can ask for payment plans, extensions, or help. Those aren't failures.", timing: "day-of", category: "script" },
    )
  }

  // Universal suggestions if nothing matched
  if (suggestions.length === 0) {
    suggestions.push(
      { text: "Name what specifically makes this hard. The vague dread is worse than the specific challenge.", timing: "now", category: "mindset" },
      { text: "What's the smallest thing you could do today to make this 5% less overwhelming?", timing: "now", category: "action" },
      { text: "You've handled hard things before. You'll handle this one too — imperfectly, and that's fine.", timing: "day-of", category: "mindset" },
    )
  }

  return suggestions
}

// ---- Tag Detection ----

const tagKeywords: Record<string, string[]> = {
  school: ["school", "teacher", "iep", "504", "conference", "homework", "pickup", "dropoff", "drop off", "pick up", "bus", "form", "enrollment", "report card", "parent-teacher", "principal"],
  medical: ["doctor", "appointment", "dentist", "therapy", "therapist", "pediatrician", "prescription", "diagnosis", "test results", "blood work", "specialist", "hospital", "surgery", "vaccine"],
  social: ["party", "gathering", "event", "dinner with", "lunch with", "playdate", "birthday", "wedding", "shower", "reunion", "holiday", "hosting", "guests"],
  work: ["work", "meeting", "deadline", "boss", "presentation", "review", "interview", "project", "client", "coworker", "commute", "shift"],
  family: ["in-laws", "inlaws", "mom", "dad", "parent", "sibling", "brother", "sister", "family dinner", "visit", "thanksgiving", "christmas", "holiday"],
  household: ["move", "moving", "repair", "renovation", "plumber", "electrician", "declutter", "organize", "deep clean", "yard", "garage"],
  financial: ["bill", "payment", "budget", "insurance", "tax", "debt", "rent", "mortgage", "afford", "money", "cost", "expensive"],
}

function detectTags(text: string): string[] {
  const lower = text.toLowerCase()
  const tags: string[] = []
  for (const [tag, keywords] of Object.entries(tagKeywords)) {
    if (keywords.some((kw) => lower.includes(kw))) {
      tags.push(tag)
    }
  }
  return tags
}

// ---- Helpers ----

function getWeekStart(): string {
  const now = new Date()
  const day = now.getDay()
  const diff = day === 0 ? 6 : day - 1 // Monday = start of week
  const monday = new Date(now)
  monday.setDate(now.getDate() - diff)
  return formatDate(monday)
}

function getLastWeekStart(): string {
  const now = new Date()
  const day = now.getDay()
  const diff = day === 0 ? 6 : day - 1
  const monday = new Date(now)
  monday.setDate(now.getDate() - diff - 7)
  return formatDate(monday)
}

function formatDate(d: Date): string {
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

// ---- Coach Prompt Builder ----

export function buildHardThingPrompt(): string {
  const current = getThisWeeksHardThing()
  if (!current) return ""

  let prompt = `\n\nThis week, she identified something hard coming up: "${current.text}"`
  if (current.tags.length > 0) {
    prompt += ` (relates to: ${current.tags.join(", ")})`
  }
  prompt += `. If she brings up anything related to this, acknowledge that you know about it. Offer practical prep support — scripts, mindset reframes, or logistical strategies specific to this situation. Don't ask her to explain it again — you already know.`

  // Add history context if relevant
  const all = getAllHardThings()
  const resolved = all.filter((e) => e.resolved).slice(-4)
  if (resolved.length > 0) {
    const betterCount = resolved.filter((e) => e.howItWent === "better-than-expected").length
    const harderCount = resolved.filter((e) => e.howItWent === "harder-than-expected").length
    if (betterCount > harderCount) {
      prompt += ` Based on her history, things often go better than she expects. Gently remind her of this pattern if she's catastrophizing.`
    } else if (harderCount > betterCount) {
      prompt += ` Based on her history, things have sometimes been harder than expected. Be extra supportive with practical prep — she's not overreacting.`
    }
  }

  return prompt
}
