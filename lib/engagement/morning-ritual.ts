// ============================================================
// Morning Ritual — The "open the app" experience
// One screen, 30 seconds, daily anchor point
// 
// Psychology: The first interaction of the day sets the frame.
// If she opens this app and the first thing she sees is
// recognition + a single actionable thing, she starts the day
// feeling seen rather than behind.
//
// Behavioral design: Variable reward (greeting changes daily),
// completion signal (pulse check = done), identity reinforcement
// (archetype + anchor), and minimal friction (one screen, no scrolling).
// ============================================================

import type { PatternMap } from "../assessments/types"
import type { Archetype } from "../archetypes"
import { getTodaysAnchor } from "./identity-anchors"
import { getTodaysOneThing } from "./one-thing-interactive"
import { getNextPulseTime, hasCompletedPulse } from "./pulse-checkins"
import type { OneThingEntry, IdentityAnchor, PulseTime } from "./types"

export interface MorningRitualData {
  anchor: IdentityAnchor
  oneThing: OneThingEntry
  pulseReady: PulseTime | null
  pulseCompleted: boolean
  archetype: Archetype | null
  greeting: string
  timeOfDay: "early" | "morning" | "midday" | "afternoon" | "evening" | "night"
}

// Greetings are time-aware and never performative.
// They acknowledge reality without toxic positivity.

const earlyGreetings = [
  "You're up before the world needs you. This moment is yours.",
  "The house is quiet. You are a person right now — not a function.",
  "Before anyone calls your name: breathe.",
  "Early morning you is still just you. Not mom yet. Just you.",
  "The day hasn't started asking yet. Sit in that for a second.",
]

const morningGreetings = [
  "Good morning. Whatever today holds — you don't have to carry it all at once.",
  "New day. No carryover guilt allowed.",
  "Today doesn't have to be perfect. It just has to be survivable.",
  "You woke up. You're here. That's step one handled.",
  "Before the chaos starts: this moment is just for you.",
  "One breath. One anchor. One thing. That's all today asks.",
  "The world is about to ask a lot of you. This is the pause before it does.",
  "You're reading this. That means you're choosing yourself, even if just for 30 seconds.",
  "No one is grading today. There's no rubric. Just you, doing what you can.",
  "Good morning. Your brain is already working hard. Let's give it one thing at a time.",
  "Today you get to try again. Not because yesterday was wrong — because today is new.",
  "Whatever yesterday was — it's done. Today is a different day.",
  "You don't have to earn today. It's already yours.",
]

const middayGreetings = [
  "Halfway through. You're still standing.",
  "If this morning was hard — the afternoon is a reset. Not a continuation.",
  "You've already done more today than you think. Check in with yourself.",
  "Midday pause. How are you actually doing? Not how you should be doing.",
  "The morning is over. Whatever happened in it doesn't define the rest.",
]

const afternoonGreetings = [
  "The hardest hours are coming. You know this. Let's prepare, not react.",
  "Afternoon you is running on less than morning you. Lower the bar accordingly.",
  "If you haven't eaten or had water — do that before anything else.",
  "The witching hour approaches. What's the minimum viable evening?",
  "You've been giving all day. What's one thing you can take back in the next hour?",
]

const eveningGreetings = [
  "The day is almost done. You made it through.",
  "Whatever today was — you survived it. That's not nothing.",
  "Evening. Time to put things down. Not pick more up.",
  "You don't have to process today right now. You can just let it end.",
  "One word for today. That's all. Then let it go.",
]

const nightGreetings = [
  "Still awake. Your brain is probably loud. That's okay.",
  "The day is over. You don't have to solve anything right now.",
  "Whatever you're carrying — you can put it down until morning.",
  "Sleep doesn't require a clear mind. Just a body that's horizontal.",
  "Tomorrow is a different day. Right now, just rest.",
]

function getTimeOfDay(): MorningRitualData["timeOfDay"] {
  const hour = new Date().getHours()
  if (hour < 5) return "night"
  if (hour < 7) return "early"
  if (hour < 11) return "morning"
  if (hour < 14) return "midday"
  if (hour < 17) return "afternoon"
  if (hour < 21) return "evening"
  return "night"
}

function getGreeting(timeOfDay: MorningRitualData["timeOfDay"]): string {
  const pools: Record<string, string[]> = {
    early: earlyGreetings,
    morning: morningGreetings,
    midday: middayGreetings,
    afternoon: afternoonGreetings,
    evening: eveningGreetings,
    night: nightGreetings,
  }

  const pool = pools[timeOfDay] || morningGreetings
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  )
  // Add hour component so greeting changes if she opens at different times
  const hour = new Date().getHours()
  const index = (dayOfYear + hour) % pool.length
  return pool[index]
}

export function getMorningRitualData(
  patternMap: PatternMap | null,
  archetype: Archetype | null
): MorningRitualData {
  const timeOfDay = getTimeOfDay()
  const anchor = getTodaysAnchor(patternMap)
  const oneThing = getTodaysOneThing(patternMap)
  const pulseReady = getNextPulseTime()
  const greeting = getGreeting(timeOfDay)

  // Check if the current pulse window is already done
  let pulseCompleted = false
  if (timeOfDay === "morning" || timeOfDay === "early") {
    pulseCompleted = hasCompletedPulse("morning")
  } else if (timeOfDay === "midday" || timeOfDay === "afternoon") {
    pulseCompleted = hasCompletedPulse("afternoon")
  } else {
    pulseCompleted = hasCompletedPulse("evening")
  }

  return {
    anchor,
    oneThing,
    pulseReady,
    pulseCompleted,
    archetype,
    greeting,
    timeOfDay,
  }
}
