// ============================================================
// "Letter to Yourself" — Time Capsule
//
// Psychology: Self-compassion research shows that writing to
// your future self activates the same neural pathways as
// receiving compassion from another person. When the letter
// surfaces weeks later, it creates a powerful moment of
// self-connection across time — "past me cared about future me."
//
// This drives re-engagement at exactly the right moment:
// 2-4 weeks later, when the initial motivation from the
// assessment might be fading.
// ============================================================

const CAPSULE_KEY = "mindful-mama-time-capsules"

export interface TimeCapsule {
  id: string
  writtenAt: number
  opensAt: number
  message: string
  context?: string // what was happening when she wrote it (archetype, dimension states)
  opened: boolean
  openedAt?: number
}

// ---- Core Functions ----

export function createTimeCapsule(
  message: string,
  daysUntilOpen: number,
  context?: string
): TimeCapsule {
  const capsule: TimeCapsule = {
    id: `capsule-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    writtenAt: Date.now(),
    opensAt: Date.now() + daysUntilOpen * 24 * 60 * 60 * 1000,
    message: message.trim(),
    context,
    opened: false,
  }

  const all = getAllCapsules()
  all.push(capsule)

  try {
    localStorage.setItem(CAPSULE_KEY, JSON.stringify(all))
  } catch {}

  return capsule
}

export function getAllCapsules(): TimeCapsule[] {
  try {
    const data = localStorage.getItem(CAPSULE_KEY)
    if (!data) return []
    return JSON.parse(data)
  } catch {
    return []
  }
}

export function getReadyCapsules(): TimeCapsule[] {
  const all = getAllCapsules()
  const now = Date.now()
  return all.filter((c) => !c.opened && now >= c.opensAt)
}

export function getLockedCapsules(): TimeCapsule[] {
  const all = getAllCapsules()
  const now = Date.now()
  return all.filter((c) => !c.opened && now < c.opensAt)
}

export function getOpenedCapsules(): TimeCapsule[] {
  const all = getAllCapsules()
  return all.filter((c) => c.opened)
}

export function openCapsule(id: string): TimeCapsule | null {
  const all = getAllCapsules()
  const index = all.findIndex((c) => c.id === id)
  if (index < 0) return null

  all[index].opened = true
  all[index].openedAt = Date.now()

  try {
    localStorage.setItem(CAPSULE_KEY, JSON.stringify(all))
  } catch {}

  return all[index]
}

export function hasReadyCapsule(): boolean {
  return getReadyCapsules().length > 0
}

export function getNextCapsuleDate(): Date | null {
  const locked = getLockedCapsules()
  if (locked.length === 0) return null
  const earliest = locked.reduce((min, c) => c.opensAt < min ? c.opensAt : min, Infinity)
  return new Date(earliest)
}

// ---- Prompts for writing ----

export const CAPSULE_PROMPTS = [
  "What do you want to remember about how you're feeling right now?",
  "What would you tell yourself on a hard day, 2 weeks from now?",
  "What's one thing you're proud of this week that you might forget?",
  "If future-you is struggling — what does she need to hear?",
  "What's something you're learning about yourself right now?",
  "Write something kind to the version of you who opens this later.",
]

export function getRandomPrompt(): string {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  )
  return CAPSULE_PROMPTS[dayOfYear % CAPSULE_PROMPTS.length]
}
