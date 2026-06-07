// ============================================================
// Milestone Celebrations
//
// Psychology: Intermittent reinforcement is the most powerful
// schedule for maintaining behavior. Milestones fire at
// unexpected-but-earned moments, creating dopamine hits that
// reinforce the behavior without making it feel transactional.
//
// Key principle: Never punish absence. Only celebrate presence.
// Missing a milestone doesn't create shame — it just means
// the celebration is still waiting for her.
// ============================================================

import { getWinStreak, getAllWins } from "./micro-wins"
import { getOneThingStreak, getOneThingHistory } from "./one-thing-interactive"
import { getAllPulses } from "./pulse-checkins"
import { getArchetypeHistory, getCurrentArchetype } from "../archetypes"

const MILESTONES_SEEN_KEY = "mindful-mama-milestones-seen"

export interface Milestone {
  id: string
  title: string
  message: string
  type: "wins" | "streak" | "pulse" | "archetype" | "time"
}

// ---- Milestone Definitions ----

const MILESTONE_DEFS: {
  id: string
  check: () => boolean
  title: string
  message: string
  type: Milestone["type"]
}[] = [
  // Win milestones
  {
    id: "first-win",
    check: () => getAllWins().flatMap(d => d.wins).length >= 1,
    title: "First win logged",
    message: "You started. That's the hardest part. Every win after this is evidence accumulating.",
    type: "wins",
  },
  {
    id: "10-wins",
    check: () => getAllWins().flatMap(d => d.wins).length >= 10,
    title: "10 wins",
    message: "10 things you did that you might have forgotten. But they happened. You made them happen.",
    type: "wins",
  },
  {
    id: "25-wins",
    check: () => getAllWins().flatMap(d => d.wins).length >= 25,
    title: "25 wins",
    message: "25 pieces of evidence against the voice that says you do nothing. The case is building.",
    type: "wins",
  },
  {
    id: "50-wins",
    check: () => getAllWins().flatMap(d => d.wins).length >= 50,
    title: "50 wins",
    message: "50 wins. The 'I do nothing all day' narrative has less and less ground to stand on.",
    type: "wins",
  },
  {
    id: "100-wins",
    check: () => getAllWins().flatMap(d => d.wins).length >= 100,
    title: "100 wins",
    message: "One hundred things you did. That's not a list — that's a life being lived. By you. Despite everything.",
    type: "wins",
  },

  // Streak milestones
  {
    id: "3-day-streak",
    check: () => getWinStreak().currentStreak >= 3 || getOneThingStreak().currentStreak >= 3,
    title: "3-day streak",
    message: "Three days of noticing yourself. That's a pattern forming. Not perfection — consistency.",
    type: "streak",
  },
  {
    id: "7-day-streak",
    check: () => getWinStreak().currentStreak >= 7 || getOneThingStreak().currentStreak >= 7,
    title: "7-day streak",
    message: "A whole week of choosing yourself. Seven days of saying 'I matter enough to notice.' You do.",
    type: "streak",
  },
  {
    id: "14-day-streak",
    check: () => getWinStreak().currentStreak >= 14 || getOneThingStreak().currentStreak >= 14,
    title: "14-day streak",
    message: "Two weeks. This isn't a fluke anymore. This is you building a relationship with yourself.",
    type: "streak",
  },
  {
    id: "30-day-streak",
    check: () => getWinStreak().currentStreak >= 30 || getOneThingStreak().currentStreak >= 30,
    title: "30-day streak",
    message: "30 days. A full month of showing up for yourself. That's not discipline — that's identity. You are someone who notices herself.",
    type: "streak",
  },

  // Pulse milestones
  {
    id: "7-days-pulse",
    check: () => getAllPulses().length >= 7,
    title: "7 days of check-ins",
    message: "A week of data about yourself. You now know more about your patterns than most people ever will.",
    type: "pulse",
  },
  {
    id: "30-days-pulse",
    check: () => getAllPulses().length >= 30,
    title: "30 days of self-knowledge",
    message: "A month of pulse data. You can now see your patterns — the good days, the hard days, and what makes them different. That's power.",
    type: "pulse",
  },

  // Archetype milestones
  {
    id: "archetype-shift",
    check: () => {
      const history = getArchetypeHistory()
      if (history.length < 2) return false
      const current = history[history.length - 1]
      const previous = history[history.length - 2]
      return current.archetypeId !== previous.archetypeId
    },
    title: "Your type shifted",
    message: "Your archetype changed. That means something in your life shifted — for better or for different. Either way, you're not static. You're evolving.",
    type: "archetype",
  },

  // Time milestones
  {
    id: "one-thing-7-completed",
    check: () => getOneThingHistory().filter(e => e.completed).length >= 7,
    title: "7 One Things completed",
    message: "Seven times you chose one small thing for yourself. Seven votes for the person you want to be.",
    type: "time",
  },
  {
    id: "one-thing-30-completed",
    check: () => getOneThingHistory().filter(e => e.completed).length >= 30,
    title: "30 One Things completed",
    message: "30 micro-actions completed. That's not a streak — that's a lifestyle. You are someone who takes care of herself. The evidence is undeniable.",
    type: "time",
  },
  // Pathway milestones
  {
    id: "first-pathway",
    check: () => {
      try {
        const pathways = ["executive-function", "depletion-burnout", "sensory-overwhelm", "hormonal-patterns", "sleep-recovery", "trauma-nervous-system", "systemic-load"]
        return pathways.some(p => localStorage.getItem(`mindful-mama-pathway-result-${p}`) !== null)
      } catch { return false }
    },
    title: "First pathway explored",
    message: "You went deeper. Most people stop at the surface. You chose to understand yourself with more honesty than that.",
    type: "time",
  },
  {
    id: "3-pathways",
    check: () => {
      try {
        const pathways = ["executive-function", "depletion-burnout", "sensory-overwhelm", "hormonal-patterns", "sleep-recovery", "trauma-nervous-system", "systemic-load"]
        return pathways.filter(p => localStorage.getItem(`mindful-mama-pathway-result-${p}`) !== null).length >= 3
      } catch { return false }
    },
    title: "3 pathways explored",
    message: "Three dimensions of yourself examined. You're building a map of who you are — not who the world tells you to be.",
    type: "time",
  },
  {
    id: "all-pathways",
    check: () => {
      try {
        const pathways = ["executive-function", "depletion-burnout", "sensory-overwhelm", "hormonal-patterns", "sleep-recovery", "trauma-nervous-system", "systemic-load"]
        return pathways.filter(p => localStorage.getItem(`mindful-mama-pathway-result-${p}`) !== null).length >= 7
      } catch { return false }
    },
    title: "All pathways complete",
    message: "Every pathway explored. You now have the most complete picture of yourself this tool can offer. That took courage — the willingness to look at all of it, not just the comfortable parts.",
    type: "time",
  },
  // Engagement depth
  {
    id: "200-wins",
    check: () => getAllWins().flatMap(d => d.wins).length >= 200,
    title: "200 wins",
    message: "Two hundred. That's a volume of evidence that rewrites the story. You are not the person your worst days say you are.",
    type: "wins",
  },
  {
    id: "500-wins",
    check: () => getAllWins().flatMap(d => d.wins).length >= 500,
    title: "500 wins",
    message: "Five hundred things you did, noticed, and recorded. This is no longer a list. This is a testament to a life being lived with intention.",
    type: "wins",
  },
  {
    id: "60-day-streak",
    check: () => getWinStreak().currentStreak >= 60 || getOneThingStreak().currentStreak >= 60,
    title: "60-day streak",
    message: "Two months. The version of you who started this would barely recognize the habits you've built. Not because you changed who you are — because you finally let yourself be seen.",
    type: "streak",
  },
]

// ---- Core Functions ----

function getSeenMilestones(): Set<string> {
  try {
    const data = localStorage.getItem(MILESTONES_SEEN_KEY)
    if (!data) return new Set()
    return new Set(JSON.parse(data))
  } catch {
    return new Set()
  }
}

function markMilestoneSeen(id: string): void {
  const seen = getSeenMilestones()
  seen.add(id)
  try {
    localStorage.setItem(MILESTONES_SEEN_KEY, JSON.stringify([...seen]))
  } catch {}
}

/**
 * Check for any new milestones that haven't been shown yet.
 * Returns the first unseen milestone that's been achieved, or null.
 */
export function checkForNewMilestone(): Milestone | null {
  const seen = getSeenMilestones()

  for (const def of MILESTONE_DEFS) {
    if (seen.has(def.id)) continue
    try {
      if (def.check()) {
        return {
          id: def.id,
          title: def.title,
          message: def.message,
          type: def.type,
        }
      }
    } catch {}
  }

  return null
}

/**
 * Dismiss a milestone (mark as seen)
 */
export function dismissMilestone(id: string): void {
  markMilestoneSeen(id)
}

/**
 * Get all achieved milestones (for a history view)
 */
export function getAchievedMilestones(): Milestone[] {
  const achieved: Milestone[] = []
  for (const def of MILESTONE_DEFS) {
    try {
      if (def.check()) {
        achieved.push({
          id: def.id,
          title: def.title,
          message: def.message,
          type: def.type,
        })
      }
    } catch {}
  }
  return achieved
}
