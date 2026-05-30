// ============================================================
// Executive Function & Daily Life — Pathway Assessment
// Refactored from original ADHD assessment, broadened scope
// ============================================================

import type { AssessmentSection } from "../types"

export const EXECUTIVE_FUNCTION_SECTIONS: AssessmentSection[] = [
  {
    id: "time-perception",
    title: "Time & Planning",
    description: "How your brain relates to time, deadlines, and sequences",
    questions: [
      {
        id: "ef-tp-1",
        question: "How accurate is your sense of how long things take?",
        description: "Getting ready, driving somewhere, completing a task — can you estimate realistically?",
        options: [
          { id: "accurate", label: "Pretty accurate — I can plan realistically", dimensions: { "time-perception": 1 } },
          { id: "slightly-off", label: "Slightly off — I underestimate by 5-10 minutes regularly", dimensions: { "time-perception": 2 } },
          { id: "way-off", label: "Way off — I genuinely believe I can do 45 minutes of tasks in 15 minutes", dimensions: { "time-perception": 3 } },
          { id: "no-sense", label: "I have almost no internal sense of time passing", dimensions: { "time-perception": 4 } },
        ],
      },
      {
        id: "ef-tp-2",
        question: "What happens when you have a deadline or appointment later in the day?",
        description: "A 3pm school pickup, a 2pm meeting, a dentist appointment at 4.",
        options: [
          { id: "normal", label: "I go about my day and leave with plenty of time", dimensions: { "time-perception": 1 } },
          { id: "anxious", label: "I can't fully relax — part of my brain is watching the clock", dimensions: { "time-perception": 2 } },
          { id: "paralyzed", label: "I can't do anything productive because the appointment 'blocks' my whole day", dimensions: { "time-perception": 3 } },
          { id: "forget", label: "I get absorbed in something else and nearly miss it — or do miss it", dimensions: { "time-perception": 4 } },
        ],
      },
      {
        id: "ef-tp-3",
        question: "How do you handle multi-step tasks that need to happen in sequence?",
        description: "Cooking a meal with multiple dishes, getting the family ready for an outing, planning a birthday party.",
        options: [
          { id: "sequence", label: "I can hold the sequence in my head and work through it", dimensions: { "time-perception": 1 } },
          { id: "write-down", label: "I need to write it down, but once I do, I can follow it", dimensions: { "time-perception": 2 } },
          { id: "lose-track", label: "I lose track of where I am — things burn, steps get skipped", dimensions: { "time-perception": 3 } },
          { id: "avoid", label: "I avoid multi-step tasks entirely because they overwhelm me", dimensions: { "time-perception": 4 } },
        ],
      },
    ],
  },
  {
    id: "task-initiation",
    title: "Task Initiation",
    description: "The gap between knowing what to do and actually starting it",
    questions: [
      {
        id: "ef-ti-1",
        question: "How often do you know exactly what needs doing but physically cannot make yourself start?",
        description: "You can see the dishes. You want to do the dishes. But the signal from brain to body just... doesn't fire.",
        options: [
          { id: "rarely", label: "Rarely — if I know what to do, I can usually start", dimensions: { "task-initiation": 1 } },
          { id: "sometimes", label: "Sometimes — especially with boring or overwhelming tasks", dimensions: { "task-initiation": 2 } },
          { id: "often", label: "Often — I spend more time stuck than actually doing things", dimensions: { "task-initiation": 3 } },
          { id: "daily", label: "Daily — the paralysis is my default state", dimensions: { "task-initiation": 4 } },
        ],
      },
      {
        id: "ef-ti-2",
        question: "What does it take to get you moving on a task you've been avoiding?",
        description: "What actually breaks through the inertia?",
        options: [
          { id: "decide", label: "I just decide to do it — willpower works for me", dimensions: { "task-initiation": 1 } },
          { id: "tricks", label: "I need tricks — music, a timer, a reward, or a body double", dimensions: { "task-initiation": 2 } },
          { id: "urgency", label: "Only urgency or a deadline — I need the adrenaline to activate", dimensions: { "task-initiation": 3 } },
          { id: "external", label: "Someone else has to physically start it with me or I won't begin", dimensions: { "task-initiation": 4 } },
        ],
      },
      {
        id: "ef-ti-3",
        question: "How do you feel about tasks that are boring but necessary?",
        description: "Laundry, dishes, admin emails, tidying, meal prep.",
        options: [
          { id: "fine", label: "They're not fun but I get through them without much drama", dimensions: { "task-initiation": 1 } },
          { id: "need-stimulation", label: "I need to pair them with something stimulating (podcast, music, phone call)", dimensions: { "task-initiation": 2 } },
          { id: "avoid-crisis", label: "I avoid them until the mess becomes a crisis, then panic-clean", dimensions: { "task-initiation": 3 } },
          { id: "impossible", label: "I physically cannot make myself start — even when I'm staring at the mess", dimensions: { "task-initiation": 4 } },
        ],
      },
    ],
  },
  {
    id: "working-memory",
    title: "Working Memory",
    description: "How much your brain can hold and track at once",
    questions: [
      {
        id: "ef-wm-1",
        question: "When something isn't physically visible to you, what happens to it in your mind?",
        description: "A calendar event, a chore in another room, a task someone mentioned yesterday.",
        options: [
          { id: "remember", label: "I usually remember — it stays in my mental queue", dimensions: { "working-memory": 1 } },
          { id: "sometimes-forget", label: "I sometimes forget but catch it eventually", dimensions: { "working-memory": 2 } },
          { id: "gone", label: "If it's not in front of me, it basically doesn't exist", dimensions: { "working-memory": 3 } },
          { id: "repeatedly-miss", label: "I've missed important things repeatedly because they weren't visible", dimensions: { "working-memory": 4 } },
        ],
      },
      {
        id: "ef-wm-2",
        question: "How many things can you hold in your head at once before something drops?",
        description: "Think about managing multiple requests, tasks, or pieces of information simultaneously.",
        options: [
          { id: "several", label: "Several — I can juggle 4-5 things without losing track", dimensions: { "working-memory": 1 } },
          { id: "two-three", label: "Two or three — beyond that, things start slipping", dimensions: { "working-memory": 2 } },
          { id: "one", label: "Barely one — if I'm interrupted, the original thought is gone", dimensions: { "working-memory": 3 } },
          { id: "none", label: "I can't even finish a sentence without losing my train of thought", dimensions: { "working-memory": 4 } },
        ],
      },
      {
        id: "ef-wm-3",
        question: "How do you handle the 'admin' of parenting — forms, emails, scheduling, appointments?",
        description: "The invisible labor that no one sees but everyone expects you to manage.",
        options: [
          { id: "on-top", label: "I stay on top of it — I process these as they come in", dimensions: { "working-memory": 1 } },
          { id: "batches", label: "I let them pile up and handle them in panicked batches", dimensions: { "working-memory": 2 } },
          { id: "avoidance", label: "I avoid them until there are consequences — late fees, missed deadlines", dimensions: { "working-memory": 3 } },
          { id: "drowning", label: "I'm drowning in it — the pile feels so big I don't know where to start", dimensions: { "working-memory": 4 } },
        ],
      },
    ],
  },
  {
    id: "organization-systems",
    title: "Organization & Systems",
    description: "Your relationship with structure, routines, and keeping things together",
    questions: [
      {
        id: "ef-os-1",
        question: "Which best describes your relationship with organization systems?",
        description: "Planners, apps, routines, calendars — how do they work for you?",
        options: [
          { id: "works", label: "I have a system that works — it took time but I found my groove", dimensions: { "organization-systems": 1 } },
          { id: "start-abandon", label: "I start strong with new systems but abandon them within weeks", dimensions: { "organization-systems": 3 } },
          { id: "nt-fail", label: "I've tried everything 'normal' people use and none of it sticks", dimensions: { "organization-systems": 4 } },
          { id: "given-up", label: "I've given up on systems — I just react to whatever's in front of me", dimensions: { "organization-systems": 4 } },
        ],
      },
      {
        id: "ef-os-2",
        question: "What does the inside of your home look like right now — honestly?",
        description: "No shame. We're understanding your environment, not grading it.",
        options: [
          { id: "tidy", label: "Reasonably tidy — there's a place for most things", dimensions: { "organization-systems": 1 } },
          { id: "lived-in", label: "Lived-in — some clutter but functional", dimensions: { "organization-systems": 2 } },
          { id: "piles", label: "Piles everywhere — I know where things are in the chaos but others wouldn't", dimensions: { "organization-systems": 3 } },
          { id: "overwhelming", label: "Overwhelming — the clutter stresses me out but I can't seem to tackle it", dimensions: { "organization-systems": 4 } },
        ],
      },
      {
        id: "ef-os-3",
        question: "When your routine gets disrupted (illness, holidays, schedule changes), what happens?",
        description: "How resilient are your systems?",
        options: [
          { id: "bounce-back", label: "I bounce back within a day or two", dimensions: { "organization-systems": 1 } },
          { id: "struggle", label: "It takes real effort to rebuild — maybe a week", dimensions: { "organization-systems": 2 } },
          { id: "collapse", label: "Everything collapses and it takes weeks to recover", dimensions: { "organization-systems": 3 } },
          { id: "never-recover", label: "I never fully recover — each disruption leaves me worse off", dimensions: { "organization-systems": 4 } },
        ],
      },
    ],
  },
  {
    id: "attention-regulation",
    title: "Attention & Focus",
    description: "How your brain decides what gets your attention — and what doesn't",
    questions: [
      {
        id: "ef-ar-1",
        question: "Can you control what you pay attention to?",
        description: "Not whether you CAN focus — but whether you can choose WHAT to focus on.",
        options: [
          { id: "yes", label: "Yes — I can direct my attention where it needs to go", dimensions: { "attention-regulation": 1 } },
          { id: "mostly", label: "Mostly — but interesting things pull me away from important things", dimensions: { "attention-regulation": 2 } },
          { id: "rarely", label: "Rarely — my attention goes where it wants, not where I need it", dimensions: { "attention-regulation": 3 } },
          { id: "no", label: "No — I either hyperfocus on the wrong thing or can't focus at all", dimensions: { "attention-regulation": 4 } },
        ],
      },
      {
        id: "ef-ar-2",
        question: "How do you handle interruptions when you're in the middle of something?",
        description: "A child asking a question, a notification, someone walking in.",
        options: [
          { id: "resume", label: "I handle it and return to what I was doing easily", dimensions: { "attention-regulation": 1 } },
          { id: "effort", label: "It takes effort to get back on track, but I manage", dimensions: { "attention-regulation": 2 } },
          { id: "lost", label: "The original task is often lost — I can't remember where I was", dimensions: { "attention-regulation": 3 } },
          { id: "derailed", label: "One interruption derails my entire plan for the next hour", dimensions: { "attention-regulation": 4 } },
        ],
      },
      {
        id: "ef-ar-3",
        question: "Do you ever get so absorbed in something that you lose track of time, forget to eat, or miss pickups?",
        description: "Hyperfocus — the other side of attention differences.",
        options: [
          { id: "no", label: "No — I stay aware of time and responsibilities even when engaged", dimensions: { "attention-regulation": 1 } },
          { id: "occasionally", label: "Occasionally — I get absorbed but usually catch myself", dimensions: { "attention-regulation": 2 } },
          { id: "regularly", label: "Regularly — I've missed meals, appointments, and pickups because I was locked in", dimensions: { "attention-regulation": 3 } },
          { id: "frequently", label: "Frequently — hyperfocus takes over and I lose hours without realizing", dimensions: { "attention-regulation": 4 } },
        ],
      },
    ],
  },
]

export const EXECUTIVE_FUNCTION_META = {
  id: "executive-function",
  slug: "executive-function",
  title: "Executive Function & Daily Life",
  subtitle: "How your brain organizes, plans, and initiates",
  description: "This reflection explores your relationship with time, task initiation, working memory, organization, and attention. It's not about whether you're 'organized enough' — it's about understanding how your brain actually works so you can build systems that fit.",
  estimatedMinutes: 10,
  questionCount: 15,
}
