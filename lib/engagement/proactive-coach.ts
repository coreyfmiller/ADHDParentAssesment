// ============================================================
// Proactive Coach — The coach reaches out first
//
// Psychology: Attachment theory shows that feeling "thought about"
// by another creates secure connection. When the coach initiates,
// it signals: "I noticed you. I remember you. I'm here."
//
// This is the difference between a tool and a relationship.
// Tools wait. Relationships reach out.
//
// The proactive message appears on the dashboard as the first
// thing she sees — personalized, contextual, and referencing
// her actual history. It's not a notification. It's a greeting
// from someone who knows her.
// ============================================================

import type { PatternMap } from "../assessments/types"
import type { Archetype } from "../archetypes"
import { getCoachMemory } from "../coach-memory"
import { getAllPulses } from "./pulse-checkins"
import { getAllWins } from "./micro-wins"
import { getOneThingHistory } from "./one-thing-interactive"
import { getPersonalPlaybook } from "./what-worked"
import { getThisWeeksHardThing } from "./whats-hard-this-week"

const LAST_PROACTIVE_KEY = "mindful-mama-proactive-last"
const PROACTIVE_HISTORY_KEY = "mindful-mama-proactive-history"

export interface ProactiveMessage {
  message: string
  followUp?: string // optional question or suggestion
  type: "check-in" | "observation" | "suggestion" | "celebration" | "welcome-back"
  generatedAt: number
}

// ---- Core Function ----

export function getProactiveMessage(
  patternMap: PatternMap | null,
  archetype: Archetype | null
): ProactiveMessage | null {
  // Only show one proactive message per session (per 4 hours)
  const lastShown = getLastShownTime()
  if (lastShown && Date.now() - lastShown < 4 * 60 * 60 * 1000) {
    return null
  }

  const context = gatherContext(patternMap, archetype)
  const message = selectMessage(context)

  if (message) {
    markAsShown()
    saveToHistory(message)
  }

  return message
}

export function dismissProactiveMessage(): void {
  markAsShown()
}

// ---- Context Gathering ----

interface UserContext {
  daysSinceLastVisit: number
  hasPatternMap: boolean
  archetype: Archetype | null
  recentEnergy: number[] // last 5 morning energies
  energyTrend: "up" | "down" | "stable" | "unknown"
  winsToday: number
  winsThisWeek: number
  oneThingCompletedYesterday: boolean
  oneThingStreak: number
  hasCoachMemory: boolean
  coachFacts: string[]
  coachPatterns: string[]
  coachStrategies: string[]
  workedStrategies: string[]
  dayOfWeek: number // 0=Sun, 1=Mon...
  pathwaysCompleted: number
  timeOfDay: "morning" | "afternoon" | "evening"
  isMonday: boolean
  isFriday: boolean
  hardThingText: string | null
  hardThingTags: string[]
}

function gatherContext(patternMap: PatternMap | null, archetype: Archetype | null): UserContext {
  const now = new Date()
  const hour = now.getHours()
  const dayOfWeek = now.getDay()

  // Days since last visit
  const lastVisit = getLastShownTime()
  const daysSinceLastVisit = lastVisit
    ? Math.floor((Date.now() - lastVisit) / (24 * 60 * 60 * 1000))
    : 0

  // Recent energy from pulses
  const allPulses = getAllPulses()
  const morningEnergies = allPulses
    .flatMap(d => d.entries)
    .filter(e => e.time === "morning" && e.energy > 0)
    .slice(-5)
    .map(e => e.energy)

  let energyTrend: UserContext["energyTrend"] = "unknown"
  if (morningEnergies.length >= 3) {
    const recent = morningEnergies.slice(-3)
    const earlier = morningEnergies.slice(0, -3)
    if (earlier.length > 0) {
      const recentAvg = recent.reduce((s, e) => s + e, 0) / recent.length
      const earlierAvg = earlier.reduce((s, e) => s + e, 0) / earlier.length
      if (recentAvg > earlierAvg + 0.3) energyTrend = "up"
      else if (recentAvg < earlierAvg - 0.3) energyTrend = "down"
      else energyTrend = "stable"
    }
  }

  // Wins
  const today = formatDate(now)
  const allWins = getAllWins()
  const todaysWins = allWins.find(d => d.date === today)?.wins.length || 0

  const weekStart = new Date(now)
  weekStart.setDate(weekStart.getDate() - dayOfWeek)
  const weekStartStr = formatDate(weekStart)
  const winsThisWeek = allWins
    .filter(d => d.date >= weekStartStr)
    .reduce((sum, d) => sum + d.wins.length, 0)

  // One Thing
  const oneThingHistory = getOneThingHistory()
  const yesterday = new Date(now)
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayStr = formatDate(yesterday)
  const yesterdayEntry = oneThingHistory.find(e => e.date === yesterdayStr)
  const oneThingCompletedYesterday = yesterdayEntry?.completed || false

  let oneThingStreak = 0
  for (let i = oneThingHistory.length - 1; i >= 0; i--) {
    if (oneThingHistory[i].completed) oneThingStreak++
    else break
  }

  // Coach memory
  const memory = getCoachMemory()
  const hasCoachMemory = memory.facts.length > 0 || memory.patterns.length > 0

  // What worked
  const playbook = getPersonalPlaybook()
  const workedStrategies = playbook.map(p => p.strategy)

  // What's hard this week
  const hardThing = getThisWeeksHardThing()

  return {
    daysSinceLastVisit,
    hasPatternMap: patternMap !== null,
    archetype,
    recentEnergy: morningEnergies,
    energyTrend,
    winsToday: todaysWins,
    winsThisWeek,
    oneThingCompletedYesterday,
    oneThingStreak,
    hasCoachMemory,
    coachFacts: memory.facts,
    coachPatterns: memory.patterns,
    coachStrategies: memory.strategies,
    workedStrategies,
    dayOfWeek,
    timeOfDay: hour < 12 ? "morning" : hour < 17 ? "afternoon" : "evening",
    isMonday: dayOfWeek === 1,
    isFriday: dayOfWeek === 5,
    hardThingText: hardThing?.text || null,
    hardThingTags: hardThing?.tags || [],
    pathwaysCompleted: (() => {
      const slugs = ["executive-function", "depletion-burnout", "sensory-overwhelm", "hormonal-patterns", "sleep-recovery", "trauma-nervous-system", "systemic-load"]
      try { return slugs.filter(s => localStorage.getItem(`mindful-mama-pathway-result-${s}`) !== null).length } catch { return 0 }
    })(),
  }
}

// ---- Message Selection ----

function selectMessage(ctx: UserContext): ProactiveMessage | null {
  // Priority 1: Welcome back after absence (3+ days)
  if (ctx.daysSinceLastVisit >= 3) {
    return selectWelcomeBack(ctx)
  }

  // Priority 2: Monday — start of week framing
  if (ctx.isMonday && ctx.timeOfDay === "morning") {
    return selectMondayMessage(ctx)
  }

  // Priority 2.5: Hard thing this week — contextual acknowledgment
  if (ctx.hardThingText && !ctx.isMonday) {
    return selectHardThingMessage(ctx)
  }

  // Priority 3: Energy trend observation
  if (ctx.energyTrend === "down" && ctx.recentEnergy.length >= 3) {
    return selectEnergyDownMessage(ctx)
  }
  if (ctx.energyTrend === "up" && ctx.recentEnergy.length >= 3) {
    return selectEnergyUpMessage(ctx)
  }

  // Priority 3.5: Pathway nudge (once she's settled in, gently suggest deeper exploration)
  if (ctx.pathwaysCompleted < 3 && ctx.oneThingStreak >= 3 && ctx.dayOfWeek === 3) {
    return {
      message: `You've been showing up consistently — ${ctx.oneThingStreak} days of doing your One Thing. When you have a quiet 10 minutes, the deeper pathways can give you insights that change how you understand yourself. Not today if today is full. But they're there when you're ready.`,
      followUp: "Tap Assess in the menu to explore them.",
      type: "suggestion",
      generatedAt: Date.now(),
    }
  }

  // Priority 4: Streak celebration
  if (ctx.oneThingStreak >= 7) {
    return {
      message: `${ctx.oneThingStreak} days in a row you've done your One Thing. That's not discipline — that's someone who's choosing herself consistently. I notice that.`,
      type: "celebration",
      generatedAt: Date.now(),
    }
  }

  // Priority 5: Coach memory reference
  if (ctx.hasCoachMemory && ctx.coachStrategies.length > 0) {
    return selectMemoryMessage(ctx)
  }

  // Priority 6: Archetype-aware check-in
  if (ctx.archetype) {
    return selectArchetypeMessage(ctx)
  }

  // Priority 7: General contextual
  return selectGeneralMessage(ctx)
}

function selectWelcomeBack(ctx: UserContext): ProactiveMessage {
  const days = ctx.daysSinceLastVisit

  if (days >= 14) {
    return {
      message: "It's been a while. No guilt about that — life happens, and this app doesn't punish absence. Everything you built before is still here. Your patterns, your wins, your playbook. Pick up wherever feels right.",
      followUp: "Want to check in on where your energy is right now?",
      type: "welcome-back",
      generatedAt: Date.now(),
    }
  }

  if (days >= 7) {
    return {
      message: "A week away. I'm not going to ask where you've been — I'm going to ask how you are right now. That's what matters.",
      followUp: ctx.archetype
        ? `Last time you were here, you were a ${ctx.archetype.name}. Has anything shifted?`
        : "What's the one thing that feels heaviest today?",
      type: "welcome-back",
      generatedAt: Date.now(),
    }
  }

  // 3-6 days
  const messages = [
    {
      message: "Hey. You've been gone a few days. That's fine — this isn't a streak app that guilts you. But I noticed, and I'm here when you're ready.",
      followUp: "What brought you back today?",
    },
    {
      message: "Back again. No judgment about the gap. Sometimes the best thing you can do is step away. The question is: what do you need right now?",
      followUp: ctx.oneThingCompletedYesterday ? undefined : "Your One Thing is waiting if you want something small to start with.",
    },
    {
      message: "I was thinking about you. Not in a creepy way — in a 'I hope she's okay' way. Are you okay?",
      followUp: "If today is hard, the 'What's Heavy' space is there. If today is fine, log a win.",
    },
  ]

  const idx = days % messages.length
  return { ...messages[idx], type: "welcome-back", generatedAt: Date.now() }
}

function selectMondayMessage(ctx: UserContext): ProactiveMessage {
  if (ctx.hardThingText) {
    return {
      message: `New week. You've already named it: "${ctx.hardThingText}" is the hard thing ahead. That's brave — most people avoid looking at what's coming. You're facing it. And you're not facing it alone.`,
      followUp: "Check the prep suggestions when you're ready. No rush.",
      type: "check-in",
      generatedAt: Date.now(),
    }
  }

  if (ctx.winsThisWeek > 0) {
    // She was active last week
    return {
      message: `New week. Last week you logged ${ctx.winsThisWeek} wins — that's ${ctx.winsThisWeek} things you did that mattered. This week doesn't have to top that. It just has to be survivable.`,
      followUp: "What's the one thing that would make this week feel less heavy?",
      type: "check-in",
      generatedAt: Date.now(),
    }
  }

  return {
    message: "Monday. Clean slate. Whatever last week was — it's done. You don't carry it forward. What does this week need from you?",
    followUp: "Start with your One Thing. Just one.",
    type: "check-in",
    generatedAt: Date.now(),
  }
}

function selectHardThingMessage(ctx: UserContext): ProactiveMessage | null {
  if (!ctx.hardThingText) return null

  const dayOfWeek = ctx.dayOfWeek
  const text = ctx.hardThingText

  // Mid-week (Wed-Thu) — the hard thing is likely approaching
  if (dayOfWeek >= 3 && dayOfWeek <= 4) {
    const messages = [
      {
        message: `You mentioned "${text}" is weighing on you this week. How are you feeling about it? Whatever comes up — you don't have to be ready. You just have to show up.`,
        followUp: "The Emergency Toolkit has scripts if you need words for the hard moment.",
      },
      {
        message: `I remember you said "${text}" was the hard thing this week. That's still here, and so am I. You've handled hard things before — imperfectly, and that was enough.`,
        followUp: "What's one thing that would make it 10% easier?",
      },
    ]
    const idx = dayOfWeek % messages.length
    return { ...messages[idx], type: "check-in", generatedAt: Date.now() }
  }

  // End of week (Fri-Sun) — follow-up energy
  if (dayOfWeek >= 5 || dayOfWeek === 0) {
    return {
      message: `The week is almost done. You named "${text}" as your hard thing. Whether it's happened or not — you faced the week knowing it was coming. That takes a kind of courage people don't talk about.`,
      followUp: "If it's done, log how it went. If it's still coming — you've got this.",
      type: "check-in",
      generatedAt: Date.now(),
    }
  }

  // Early week (Tue) — gentle reference
  return {
    message: `You said "${text}" is on your plate this week. I'm keeping it in mind too. When you're ready, the prep suggestions are there — but no pressure to look at them until you need them.`,
    type: "observation",
    generatedAt: Date.now(),
  }
}

function selectEnergyDownMessage(ctx: UserContext): ProactiveMessage {
  const messages = [
    {
      message: "I've noticed your energy has been dipping over the last few days. That's not a failure — it's data. Something is draining you faster than you're recovering.",
      followUp: ctx.archetype?.id === "burning-engine"
        ? "As a Burning Engine, physical recovery has to come first. Have you eaten? Slept? Had water?"
        : "What changed recently? Sleep, schedule, support, hormones — something shifted.",
    },
    {
      message: "Your morning energy has been lower than usual. Your body is telling you something. Not 'try harder' — more like 'I need something I'm not getting.'",
      followUp: "What's one thing you could do today that costs almost no energy but might help? Even lying down for 10 minutes counts.",
    },
    {
      message: "Energy trending down. I'm not going to suggest a morning routine or cold showers. I'm going to ask: what's taking more from you than it's giving back right now?",
      followUp: "Name it. You don't have to fix it yet. Just name it.",
    },
  ]

  const idx = Math.floor(Date.now() / 86400000) % messages.length
  return { ...messages[idx], type: "observation", generatedAt: Date.now() }
}

function selectEnergyUpMessage(ctx: UserContext): ProactiveMessage {
  const messages = [
    {
      message: "Your energy has been trending up. Something you're doing is working. Do you know what it is? Because if you can name it, you can protect it.",
      followUp: "Log it in 'What Worked' so you remember when things get hard again.",
      type: "celebration" as const,
    },
    {
      message: "I see your energy climbing. That's not random — that's you making choices that are paying off. Even small ones compound.",
      type: "celebration" as const,
    },
    {
      message: "Better days lately. Not perfect — but better. That shift is real. You did that.",
      followUp: "What's different this week compared to two weeks ago?",
      type: "celebration" as const,
    },
  ]

  const idx = Math.floor(Date.now() / 86400000) % messages.length
  return { ...messages[idx], generatedAt: Date.now() }
}

function selectMemoryMessage(ctx: UserContext): ProactiveMessage {
  // Reference something from coach memory
  if (ctx.coachStrategies.length > 0) {
    const strategy = ctx.coachStrategies[ctx.coachStrategies.length - 1]
    return {
      message: `Last time we talked, you were going to try: "${strategy}." How did that go? No judgment either way — I'm just curious.`,
      followUp: "If it helped, log it in 'What Worked.' If it didn't, that's useful data too.",
      type: "check-in",
      generatedAt: Date.now(),
    }
  }

  if (ctx.coachPatterns.length > 0) {
    const pattern = ctx.coachPatterns[ctx.coachPatterns.length - 1]
    return {
      message: `I remember you mentioned: "${pattern}." Is that still showing up, or has something shifted?`,
      followUp: "Want to talk it through with me?",
      type: "check-in",
      generatedAt: Date.now(),
    }
  }

  if (ctx.coachFacts.length > 0) {
    const fact = ctx.coachFacts[Math.floor(Math.random() * ctx.coachFacts.length)]
    return {
      message: `Thinking about what you shared before — "${fact}." How's that going?`,
      type: "check-in",
      generatedAt: Date.now(),
    }
  }

  return selectGeneralMessage(ctx)
}

function selectArchetypeMessage(ctx: UserContext): ProactiveMessage {
  const arch = ctx.archetype!

  const messages: Record<string, ProactiveMessage[]> = {
    "plate-spinner": [
      { message: "How many tabs are open in your brain right now? If it's more than 3, write the rest down. Your working memory isn't meant to hold all of that.", followUp: "What's the ONE thing that actually needs your attention today?", type: "suggestion", generatedAt: Date.now() },
      { message: "Plate Spinner check-in: has anything crashed today, or are you still holding everything? Either answer is valid.", type: "check-in", generatedAt: Date.now() },
      { message: "Quick question for your Plate Spinner brain: what's one thing you could take OFF the spinning rack today? Not add. Remove.", type: "suggestion", generatedAt: Date.now() },
    ],
    "quiet-volcano": [
      { message: "Volcano check: what's your pressure level right now? If you're above a 6, something needs to come out before it erupts.", followUp: "Name one feeling. Just one. That's enough.", type: "check-in", generatedAt: Date.now() },
      { message: "You hold so much for everyone else. What are you holding right now that isn't yours to carry?", type: "check-in", generatedAt: Date.now() },
      { message: "Before the day gets louder: is there anything building that needs attention before it blows? Catching it early is the whole game.", type: "suggestion", generatedAt: Date.now() },
    ],
    "running-on-empty": [
      { message: "Running-on-Empty check: have you eaten? Had water? Sat down? These aren't luxuries — they're the minimum your body needs to function.", followUp: "Pick one. Do it in the next 10 minutes.", type: "suggestion", generatedAt: Date.now() },
      { message: "Your body has been asking for rest. Not 'earned' rest — just rest. What's one thing you could skip today to create space?", type: "suggestion", generatedAt: Date.now() },
      { message: "Depletion lies to you. It says 'push through.' The truth is: you can't think, regulate, or parent well from empty. What would refilling look like today?", type: "check-in", generatedAt: Date.now() },
    ],
    "invisible-architect": [
      { message: "Architect check: is anyone else carrying anything today, or is it all on you again? If it's all on you — what's one thing you could hand off?", type: "check-in", generatedAt: Date.now() },
      { message: "You're running the whole system. Has anyone acknowledged that today? If not — I'm acknowledging it. What you do is enormous and invisible and real.", type: "check-in", generatedAt: Date.now() },
      { message: "What's one thing on your plate today that someone else could do — even imperfectly? Delegation doesn't require perfection. It requires letting go.", type: "suggestion", generatedAt: Date.now() },
    ],
    "the-disappeared": [
      { message: "Quick identity check: have you done one thing today that had nothing to do with being a mother? If not — what's the smallest thing you could do in the next hour?", followUp: "Read a page. Listen to a song. Text a friend about something that isn't kids.", type: "suggestion", generatedAt: Date.now() },
      { message: "You are more than what you provide. I know it doesn't feel that way. But the fact that you're here means some part of you is still fighting to exist. Keep fighting.", type: "check-in", generatedAt: Date.now() },
      { message: "What did you want before you became 'mom'? Not what you should want. What you actually wanted. That desire is still data about who you are.", type: "check-in", generatedAt: Date.now() },
    ],
    "burning-engine": [
      { message: "Burning Engine check: are you depleted AND reactive right now, or just one? If both — physical first. Always physical first. Eat. Water. Sit.", followUp: "You can't regulate from empty. Feed the engine before asking it to perform.", type: "suggestion", generatedAt: Date.now() },
      { message: "Your body is empty and your emotions are full. That's the hardest combination. What's the lowest-effort thing you can do right now to put something back in the tank?", type: "suggestion", generatedAt: Date.now() },
      { message: "Before anything else today: have you slept? Eaten? Had water? If no to any of those, that's step one. Everything else comes after the basics.", type: "suggestion", generatedAt: Date.now() },
    ],
    "storm-weatherer": [
      { message: "Storm check: does today have any structure, or are you improvising again? If improvising — pick ONE anchor point. One thing that happens at the same time no matter what.", type: "suggestion", generatedAt: Date.now() },
      { message: "When everything is unpredictable, your nervous system stays in fight-or-flight. What's one thing you can predict about today? Even 'dinner is at 6' counts.", type: "suggestion", generatedAt: Date.now() },
      { message: "You've been weathering storms without shelter. That's not weakness — that's endurance. But endurance has a limit. What's one small piece of structure you could build today?", type: "check-in", generatedAt: Date.now() },
    ],
    "weight-bearer": [
      { message: "Everything is heavy right now. I know. You don't have to fix everything today. You just have to pick ONE thing — the one that, if it improved even slightly, would take pressure off everything else.", followUp: "What is that one thing?", type: "suggestion", generatedAt: Date.now() },
      { message: "When everything is critical, the instinct is to try to fix it all. Don't. Triage. What's the most urgent? What can wait? What can you drop entirely?", type: "suggestion", generatedAt: Date.now() },
      { message: "You're carrying an impossible weight. The fact that you're still standing is not nothing — it's extraordinary. But you shouldn't have to be extraordinary just to survive. What support are you not asking for?", type: "check-in", generatedAt: Date.now() },
    ],
    "steady-ground": [
      { message: "Things are manageable right now. That's worth protecting. What's one thing you could do today to build a buffer for when things get harder?", type: "suggestion", generatedAt: Date.now() },
      { message: "Steady ground is rare. Use this season to invest — not in more productivity, but in rest reserves, relationship maintenance, and systems that'll hold you later.", type: "suggestion", generatedAt: Date.now() },
      { message: "You're in a good place. Not perfect — but good. What's keeping you here? Name it so you can protect it.", type: "check-in", generatedAt: Date.now() },
    ],
  }

  const pool = messages[arch.id] || messages["steady-ground"]
  const idx = Math.floor(Date.now() / 86400000) % pool.length
  return pool[idx]
}

function selectGeneralMessage(ctx: UserContext): ProactiveMessage {
  const messages: ProactiveMessage[] = [
    { message: "How are you actually doing today? Not 'fine.' Actually.", followUp: "If it's hard, put it in 'What's Heavy.' If it's okay, log a win.", type: "check-in", generatedAt: Date.now() },
    { message: "Before the day runs away from you: what's the one thing that would make today feel less chaotic?", type: "suggestion", generatedAt: Date.now() },
    { message: "You showed up. You opened this. That means some part of you is choosing herself today. What does she need?", type: "check-in", generatedAt: Date.now() },
    { message: "Quick check: have you eaten, had water, and taken one breath today? If yes — you're ahead of where you think you are.", type: "suggestion", generatedAt: Date.now() },
    { message: "What's taking up the most space in your head right now? Name it. You don't have to solve it — just name it.", type: "check-in", generatedAt: Date.now() },
  ]

  const idx = Math.floor(Date.now() / 86400000) % messages.length
  return messages[idx]
}

// ---- Storage Helpers ----

function getLastShownTime(): number | null {
  try {
    const data = localStorage.getItem(LAST_PROACTIVE_KEY)
    if (!data) return null
    return parseInt(data, 10)
  } catch {
    return null
  }
}

function markAsShown(): void {
  try {
    localStorage.setItem(LAST_PROACTIVE_KEY, String(Date.now()))
  } catch {}
}

function saveToHistory(message: ProactiveMessage): void {
  try {
    const data = localStorage.getItem(PROACTIVE_HISTORY_KEY)
    const history: ProactiveMessage[] = data ? JSON.parse(data) : []
    history.push(message)
    // Keep last 30
    const trimmed = history.slice(-30)
    localStorage.setItem(PROACTIVE_HISTORY_KEY, JSON.stringify(trimmed))
  } catch {}
}

function formatDate(d: Date): string {
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}
