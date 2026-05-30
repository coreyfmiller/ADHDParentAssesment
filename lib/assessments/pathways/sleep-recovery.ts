// ============================================================
// Sleep & Recovery — Pathway Assessment
// Why rest isn't reaching you
// ============================================================

import type { AssessmentSection } from "../types"

export const SLEEP_RECOVERY_SECTIONS: AssessmentSection[] = [
  {
    id: "sleep-quality",
    title: "Sleep Quality",
    description: "What's actually happening when you try to sleep",
    questions: [
      {
        id: "sr-sq-1",
        question: "How long does it typically take you to fall asleep once you're in bed?",
        description: "From lights out to actually sleeping.",
        options: [
          { id: "quick", label: "Under 15 minutes — I fall asleep easily", dimensions: { "sleep-quality": 1 } },
          { id: "moderate", label: "15-30 minutes — my mind takes a while to settle", dimensions: { "sleep-quality": 2 } },
          { id: "long", label: "30-60 minutes — I lie awake with racing thoughts or anxiety", dimensions: { "sleep-quality": 3 } },
          { id: "hours", label: "Over an hour — or I can't sleep at all some nights", dimensions: { "sleep-quality": 4 } },
        ],
      },
      {
        id: "sr-sq-2",
        question: "How often do you wake during the night (not counting child wake-ups)?",
        description: "Your own body waking you — not a baby or toddler.",
        options: [
          { id: "rarely", label: "Rarely — I sleep through most nights", dimensions: { "sleep-quality": 1 } },
          { id: "once", label: "Once or twice — usually bathroom, then back to sleep", dimensions: { "sleep-quality": 2 } },
          { id: "multiple", label: "Multiple times — and it's hard to fall back asleep", dimensions: { "sleep-quality": 3 } },
          { id: "constant", label: "Constantly — I never feel like I'm in deep sleep", dimensions: { "sleep-quality": 4 } },
        ],
      },
      {
        id: "sr-sq-3",
        question: "What does your mind do when you're trying to sleep?",
        description: "The mental activity between 'I should sleep' and actually sleeping.",
        options: [
          { id: "quiet", label: "It quiets down — I can relax and drift off", dimensions: { "sleep-quality": 1 } },
          { id: "wanders", label: "It wanders but I can redirect it — eventually I settle", dimensions: { "sleep-quality": 2 } },
          { id: "races", label: "It races — to-do lists, worries, replaying conversations, planning", dimensions: { "sleep-quality": 3 } },
          { id: "tortures", label: "It tortures me — anxiety spirals, shame replays, catastrophizing", dimensions: { "sleep-quality": 4 } },
        ],
      },
    ],
  },
  {
    id: "sleep-disruption",
    title: "External Disruptions",
    description: "What's interrupting your sleep from outside",
    questions: [
      {
        id: "sr-sd-1",
        question: "How often are you woken by children during the night?",
        description: "Nightmares, feeds, bed-wetting, 'I can't sleep,' crawling into your bed.",
        options: [
          { id: "never", label: "Never or very rarely — my kids sleep through", dimensions: { "sleep-disruption": 1 } },
          { id: "occasionally", label: "Occasionally — a few times a week", dimensions: { "sleep-disruption": 2 } },
          { id: "most-nights", label: "Most nights — at least once, often more", dimensions: { "sleep-disruption": 3 } },
          { id: "multiple", label: "Multiple times every night — I haven't slept through in months/years", dimensions: { "sleep-disruption": 4 } },
        ],
      },
      {
        id: "sr-sd-2",
        question: "When you're woken at night, how easily can you fall back asleep?",
        description: "After dealing with whatever woke you.",
        options: [
          { id: "easily", label: "Easily — I'm back asleep within minutes", dimensions: { "sleep-disruption": 1 } },
          { id: "takes-time", label: "It takes 15-30 minutes — my brain activates and needs to settle again", dimensions: { "sleep-disruption": 2 } },
          { id: "difficult", label: "Difficult — once I'm awake, I'm often up for an hour or more", dimensions: { "sleep-disruption": 3 } },
          { id: "cant", label: "I often can't — one wake-up means I'm done sleeping for the night", dimensions: { "sleep-disruption": 4 } },
        ],
      },
      {
        id: "sr-sd-3",
        question: "Are you the default nighttime parent — the one who wakes, responds, and handles things?",
        description: "Even if your partner is physically present.",
        options: [
          { id: "shared", label: "We share night duties equally — we take turns or split", dimensions: { "sleep-disruption": 1 } },
          { id: "mostly-me", label: "Mostly me — my partner sleeps through or I handle it faster", dimensions: { "sleep-disruption": 2 } },
          { id: "always-me", label: "Always me — even when my partner is there, I'm the one who wakes", dimensions: { "sleep-disruption": 3 } },
          { id: "solo", label: "I'm the only adult — there's no one else to take a shift", dimensions: { "sleep-disruption": 4 } },
        ],
      },
    ],
  },
  {
    id: "sleep-habits",
    title: "Sleep Habits & Patterns",
    description: "What you do (or can't do) around sleep",
    questions: [
      {
        id: "sr-sh-1",
        question: "What time do you typically go to bed — and is it by choice?",
        description: "Not when you get into bed. When you actually try to sleep.",
        options: [
          { id: "reasonable", label: "A reasonable time — I prioritize sleep and protect my bedtime", dimensions: { "sleep-habits": 1 } },
          { id: "late-revenge", label: "Too late — I stay up for 'revenge bedtime procrastination' because it's my only alone time", dimensions: { "sleep-habits": 3 } },
          { id: "late-cant-stop", label: "Too late — I can't stop scrolling, watching, or doing things even though I'm exhausted", dimensions: { "sleep-habits": 3 } },
          { id: "varies", label: "It varies wildly — I have no consistent sleep schedule", dimensions: { "sleep-habits": 2 } },
        ],
      },
      {
        id: "sr-sh-2",
        question: "Do you have a wind-down routine that helps you transition to sleep?",
        description: "Something that signals to your brain and body that it's time to rest.",
        options: [
          { id: "yes", label: "Yes — I have a routine that works and I do it most nights", dimensions: { "sleep-habits": 1 } },
          { id: "sometimes", label: "Sometimes — when I remember or have the energy", dimensions: { "sleep-habits": 2 } },
          { id: "no-time", label: "No — by the time kids are down, I collapse or scroll", dimensions: { "sleep-habits": 3 } },
          { id: "cant-relax", label: "I've tried but I can't relax — my body won't settle even with a routine", dimensions: { "sleep-habits": 4 } },
        ],
      },
    ],
  },
  {
    id: "daytime-impact",
    title: "Daytime Impact",
    description: "How your sleep (or lack of it) shows up in your waking life",
    questions: [
      {
        id: "sr-di-1",
        question: "How much does poor sleep affect your ability to parent the next day?",
        description: "Patience, reactivity, cognitive function, physical energy.",
        options: [
          { id: "minimal", label: "Minimal — I can function well even after a rough night", dimensions: { "daytime-impact": 1 } },
          { id: "noticeable", label: "Noticeable — I'm more reactive and foggy but I manage", dimensions: { "daytime-impact": 2 } },
          { id: "significant", label: "Significant — bad sleep means a bad parenting day. Every time.", dimensions: { "daytime-impact": 3 } },
          { id: "devastating", label: "Devastating — I'm a completely different (worse) parent when sleep-deprived", dimensions: { "daytime-impact": 4 } },
        ],
      },
      {
        id: "sr-di-2",
        question: "Do you rely on caffeine or stimulants to function during the day?",
        description: "Coffee, energy drinks, ADHD medication used primarily to combat tiredness.",
        options: [
          { id: "minimal", label: "Minimal — one coffee for enjoyment, not survival", dimensions: { "daytime-impact": 1 } },
          { id: "moderate", label: "Moderate — 2-3 coffees to get through the day", dimensions: { "daytime-impact": 2 } },
          { id: "heavy", label: "Heavy — I can't function without constant caffeine", dimensions: { "daytime-impact": 3 } },
          { id: "not-enough", label: "Even caffeine isn't enough — nothing cuts through the exhaustion", dimensions: { "daytime-impact": 4 } },
        ],
      },
      {
        id: "sr-di-3",
        question: "Have you considered that some of your 'ADHD symptoms' or 'burnout' might actually be chronic sleep deprivation?",
        description: "Sleep deprivation mimics ADHD: poor focus, forgetfulness, emotional dysregulation, impulsivity.",
        options: [
          { id: "not-relevant", label: "Not relevant — I sleep well and my symptoms are separate", dimensions: { "daytime-impact": 1 } },
          { id: "maybe", label: "Maybe — I've wondered if better sleep would help my other symptoms", dimensions: { "daytime-impact": 2 } },
          { id: "likely", label: "Likely — I know my sleep is terrible and it's making everything worse", dimensions: { "daytime-impact": 3 } },
          { id: "certain", label: "Almost certain — but I can't fix the sleep because of my circumstances", dimensions: { "daytime-impact": 4 } },
        ],
      },
    ],
  },
]

export const SLEEP_RECOVERY_META = {
  id: "sleep-recovery",
  slug: "sleep-recovery",
  title: "Sleep & Recovery",
  subtitle: "Why rest isn't reaching you",
  description: "This reflection explores the gap between how much sleep you get and how rested you feel. Sleep deprivation can mimic ADHD, worsen burnout, and destroy emotional regulation. Understanding your sleep patterns is often the highest-leverage intervention available.",
  estimatedMinutes: 5,
  questionCount: 11,
}
