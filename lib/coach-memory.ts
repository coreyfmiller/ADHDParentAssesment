// ============================================================
// Coach Memory — Persists conversations and builds long-term memory
// Level 1: Current conversation persistence
// Level 2: Cross-conversation memory summaries
// ============================================================

interface Message {
  role: "user" | "assistant"
  content: string
}

export interface CoachConversation {
  id: string
  messages: Message[]
  startedAt: number
  lastMessageAt: number
}

export interface CoachMemory {
  facts: string[]        // Things the AI learned about her (kids' ages, partner situation, etc.)
  patterns: string[]     // Recurring themes (mornings are hard, yelling is a trigger, etc.)
  strategies: string[]   // What she's tried and whether it worked
  lastUpdated: number
}

const CONVERSATION_KEY = "mindful-mama-coach-conversation"
const MEMORY_KEY = "mindful-mama-coach-memory"
const PAST_CONVERSATIONS_KEY = "mindful-mama-coach-history"

// ---- Level 1: Conversation Persistence ----

export function getCurrentConversation(): CoachConversation | null {
  try {
    const data = localStorage.getItem(CONVERSATION_KEY)
    if (!data) return null
    return JSON.parse(data)
  } catch {
    return null
  }
}

export function saveCurrentConversation(messages: Message[]): void {
  if (messages.length === 0) {
    try { localStorage.removeItem(CONVERSATION_KEY) } catch {}
    return
  }

  const existing = getCurrentConversation()
  const conversation: CoachConversation = {
    id: existing?.id || `conv-${Date.now()}`,
    messages,
    startedAt: existing?.startedAt || Date.now(),
    lastMessageAt: Date.now(),
  }

  try {
    localStorage.setItem(CONVERSATION_KEY, JSON.stringify(conversation))
  } catch {}
}

export function clearCurrentConversation(): void {
  try {
    localStorage.removeItem(CONVERSATION_KEY)
  } catch {}
}

// ---- Level 2: Long-Term Memory ----

export function getCoachMemory(): CoachMemory {
  try {
    const data = localStorage.getItem(MEMORY_KEY)
    if (!data) return { facts: [], patterns: [], strategies: [], lastUpdated: 0 }
    return JSON.parse(data)
  } catch {
    return { facts: [], patterns: [], strategies: [], lastUpdated: 0 }
  }
}

export function saveCoachMemory(memory: CoachMemory): void {
  try {
    localStorage.setItem(MEMORY_KEY, JSON.stringify(memory))
  } catch {}
}

export function updateMemoryFromSummary(summaryText: string): void {
  const memory = getCoachMemory()

  // Parse the AI-generated summary into categories
  const lines = summaryText.split("\n").map(l => l.trim()).filter(l => l.length > 0)

  let currentSection: "facts" | "patterns" | "strategies" | null = null

  for (const line of lines) {
    const lower = line.toLowerCase()
    if (lower.includes("facts") || lower.includes("about her") || lower.includes("situation")) {
      currentSection = "facts"
      continue
    }
    if (lower.includes("pattern") || lower.includes("recurring") || lower.includes("theme")) {
      currentSection = "patterns"
      continue
    }
    if (lower.includes("strateg") || lower.includes("tried") || lower.includes("worked") || lower.includes("plan")) {
      currentSection = "strategies"
      continue
    }

    // Clean the line (remove bullet points, dashes, etc.)
    const cleaned = line.replace(/^[-•*]\s*/, "").trim()
    if (!cleaned || cleaned.length < 5) continue

    if (currentSection === "facts" && !memory.facts.includes(cleaned)) {
      memory.facts.push(cleaned)
    } else if (currentSection === "patterns" && !memory.patterns.includes(cleaned)) {
      memory.patterns.push(cleaned)
    } else if (currentSection === "strategies" && !memory.strategies.includes(cleaned)) {
      memory.strategies.push(cleaned)
    } else if (!currentSection) {
      // If no section detected, add to facts as default
      if (!memory.facts.includes(cleaned)) {
        memory.facts.push(cleaned)
      }
    }
  }

  // Keep memory manageable (max 15 items per category)
  memory.facts = memory.facts.slice(-15)
  memory.patterns = memory.patterns.slice(-15)
  memory.strategies = memory.strategies.slice(-15)
  memory.lastUpdated = Date.now()

  saveCoachMemory(memory)
}

// ---- Past Conversations (for context) ----

export function saveToPastConversations(conversation: CoachConversation): void {
  try {
    const history = getPastConversations()
    history.push(conversation)
    // Keep last 10 conversations
    const trimmed = history.slice(-10)
    localStorage.setItem(PAST_CONVERSATIONS_KEY, JSON.stringify(trimmed))
  } catch {}
}

export function getPastConversations(): CoachConversation[] {
  try {
    const data = localStorage.getItem(PAST_CONVERSATIONS_KEY)
    if (!data) return []
    return JSON.parse(data)
  } catch {
    return []
  }
}

// ---- Memory Prompt Builder ----

export function buildMemoryPrompt(): string {
  const memory = getCoachMemory()

  // Include user basics if available
  let basicsPrompt = ""
  try {
    const basicsData = localStorage.getItem("mindful-mama-user-basics")
    if (basicsData) {
      const basics = JSON.parse(basicsData)
      basicsPrompt = "\n\nBasic facts about this person:"
      if (basics.kidAges?.length > 0) {
        const ageLabels: Record<string, string> = { infant: "infant (0-12mo)", toddler: "toddler (1-3)", preschool: "preschooler (3-5)", "school-age": "school-age (5-12)", tween: "tween (10-13)", teen: "teenager (13+)" }
        basicsPrompt += `\n- Her kids: ${basics.kidAges.map((a: string) => ageLabels[a] || a).join(", ")}`
      }
      if (basics.partnerStatus) {
        const partnerLabels: Record<string, string> = { together: "parenting with a partner in the same home", "coparenting-separate": "co-parenting separately (separated/divorced)", solo: "solo parenting" }
        basicsPrompt += `\n- Parenting setup: ${partnerLabels[basics.partnerStatus] || basics.partnerStatus}`
      }
      if (basics.ageRange) {
        basicsPrompt += `\n- Her age range: ${basics.ageRange}`
      }
      if (basics.extras?.length > 0) {
        basicsPrompt += `\n- Additional context: ${basics.extras.join(", ")}`
      }
    }
  } catch {}

  if (memory.facts.length === 0 && memory.patterns.length === 0 && memory.strategies.length === 0 && !basicsPrompt) {
    return ""
  }

  let prompt = basicsPrompt

  if (memory.facts.length > 0 || memory.patterns.length > 0 || memory.strategies.length > 0) {
    prompt += "\n\nYou have memory of previous conversations with this person:"
  }

  if (memory.facts.length > 0) {
    prompt += "\n\nThings you know about her life:"
    for (const fact of memory.facts) {
      prompt += `\n- ${fact}`
    }
  }

  if (memory.patterns.length > 0) {
    prompt += "\n\nRecurring patterns you've noticed:"
    for (const pattern of memory.patterns) {
      prompt += `\n- ${pattern}`
    }
  }

  if (memory.strategies.length > 0) {
    prompt += "\n\nStrategies discussed (what she's tried, what worked/didn't):"
    for (const strategy of memory.strategies) {
      prompt += `\n- ${strategy}`
    }
  }

  prompt += "\n\nUse this memory naturally — reference past conversations when relevant, ask follow-up questions about things she's tried, and build on what you already know. Don't repeat information she's already told you. Don't list back her memory — just let it inform your responses."

  return prompt
}

// ---- Memory Generation Prompt ----

export const MEMORY_EXTRACTION_PROMPT = `Based on this conversation, extract what you should remember about this person for future conversations. Organize into three categories:

FACTS (concrete details about her life):
- Kids' ages, names if mentioned
- Partner/family situation
- Work situation
- Living situation
- Any diagnoses or conditions mentioned

PATTERNS (recurring themes or struggles):
- What triggers her
- What time of day is hardest
- Recurring conflicts or challenges
- Emotional patterns

STRATEGIES (what was discussed or tried):
- Specific strategies suggested
- What she said worked or didn't work
- Plans she made for next time
- Scripts or approaches she wants to try

Only include things that were actually discussed. Be concise — one line per item. If nothing was revealed in a category, skip it.`
