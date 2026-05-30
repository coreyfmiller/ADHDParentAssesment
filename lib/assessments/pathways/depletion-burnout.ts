// ============================================================
// Depletion & Burnout — Pathway Assessment
// Distinguishes "I'm broken" from "I'm depleted"
// ============================================================

import type { AssessmentSection } from "../types"

export const DEPLETION_BURNOUT_SECTIONS: AssessmentSection[] = [
  {
    id: "energy-patterns",
    title: "Energy Patterns",
    description: "Where your energy goes and how much comes back",
    questions: [
      {
        id: "db-ep-1",
        question: "What does your energy look like across a typical day?",
        description: "Think about the arc from morning to night.",
        options: [
          { id: "steady", label: "Relatively steady — I have enough to get through the day", dimensions: { "energy-patterns": 1 } },
          { id: "morning-crash", label: "I start okay but crash hard by afternoon", dimensions: { "energy-patterns": 2 } },
          { id: "low-throughout", label: "Low throughout — I'm running on caffeine and willpower", dimensions: { "energy-patterns": 3 } },
          { id: "nothing", label: "I have nothing — getting out of bed takes everything I have", dimensions: { "energy-patterns": 4 } },
        ],
      },
      {
        id: "db-ep-2",
        question: "When you do get rest (a nap, a sleep-in, a day off), does it actually help?",
        description: "Does rest restore you, or do you wake up just as tired?",
        options: [
          { id: "restores", label: "Yes — rest genuinely restores my energy", dimensions: { "energy-patterns": 1 } },
          { id: "helps-some", label: "It helps a little, but I never feel fully recharged", dimensions: { "energy-patterns": 2 } },
          { id: "barely", label: "Barely — I could sleep for a week and still feel exhausted", dimensions: { "energy-patterns": 3 } },
          { id: "no-difference", label: "No — rest makes no difference. The tiredness is bone-deep", dimensions: { "energy-patterns": 4 } },
        ],
      },
      {
        id: "db-ep-3",
        question: "How long have you felt this level of tired?",
        description: "Not a bad week. How long has this been your baseline?",
        options: [
          { id: "not-tired", label: "I'm not particularly tired — this isn't my main struggle", dimensions: { "energy-patterns": 1 } },
          { id: "months", label: "A few months — it started with a specific event or season", dimensions: { "energy-patterns": 2 } },
          { id: "year-plus", label: "Over a year — I can't remember feeling rested", dimensions: { "energy-patterns": 3 } },
          { id: "years", label: "Years — this is just who I am now. I've forgotten what energy feels like", dimensions: { "energy-patterns": 4 } },
        ],
      },
    ],
  },
  {
    id: "recovery-capacity",
    title: "Recovery & Restoration",
    description: "Whether you're able to refill what gets spent",
    questions: [
      {
        id: "db-rc-1",
        question: "How much genuine downtime do you get in a typical week?",
        description: "Not 'sitting while scrolling and feeling guilty.' Actual rest where nothing is demanded of you.",
        options: [
          { id: "regular", label: "Several hours a week — I protect my rest time", dimensions: { "recovery-capacity": 1 } },
          { id: "some", label: "An hour here and there — usually after everyone's asleep", dimensions: { "recovery-capacity": 2 } },
          { id: "stolen", label: "Stolen minutes — I'm never truly off duty", dimensions: { "recovery-capacity": 3 } },
          { id: "none", label: "None — I am always on, always available, always needed", dimensions: { "recovery-capacity": 4 } },
        ],
      },
      {
        id: "db-rc-2",
        question: "When you try to rest, what happens?",
        description: "When you sit down, take a break, or try to do nothing.",
        options: [
          { id: "relax", label: "I can actually relax — my body and mind settle", dimensions: { "recovery-capacity": 1 } },
          { id: "guilt", label: "Guilt kicks in — I should be doing something productive", dimensions: { "recovery-capacity": 2 } },
          { id: "cant-stop", label: "My brain won't stop — the to-do list runs on a loop", dimensions: { "recovery-capacity": 3 } },
          { id: "anxious", label: "I feel anxious or agitated — stillness feels wrong or unsafe", dimensions: { "recovery-capacity": 4 } },
        ],
      },
      {
        id: "db-rc-3",
        question: "Do you have activities that genuinely recharge you (not just numb you)?",
        description: "Things that fill you up vs. things that just help you check out.",
        options: [
          { id: "yes-regular", label: "Yes — and I do them regularly", dimensions: { "recovery-capacity": 1 } },
          { id: "yes-rare", label: "Yes — but I rarely make time for them", dimensions: { "recovery-capacity": 2 } },
          { id: "forgot", label: "I used to, but I've forgotten what they are", dimensions: { "recovery-capacity": 3 } },
          { id: "nothing-works", label: "Nothing recharges me anymore — everything feels flat", dimensions: { "recovery-capacity": 4 } },
        ],
      },
    ],
  },
  {
    id: "burnout-signals",
    title: "Burnout Signals",
    description: "The warning signs your body and mind are sending",
    questions: [
      {
        id: "db-bs-1",
        question: "How do you feel about the things you used to enjoy?",
        description: "Hobbies, friendships, intimacy, creative pursuits, even time with your kids.",
        options: [
          { id: "still-enjoy", label: "I still enjoy them — they bring me genuine pleasure", dimensions: { "burnout-signals": 1 } },
          { id: "less-joy", label: "Less joy than before — but I can still engage", dimensions: { "burnout-signals": 2 } },
          { id: "going-through-motions", label: "I'm going through the motions — nothing really lights me up", dimensions: { "burnout-signals": 3 } },
          { id: "nothing-matters", label: "Nothing brings me joy anymore — everything feels pointless or exhausting", dimensions: { "burnout-signals": 4 } },
        ],
      },
      {
        id: "db-bs-2",
        question: "How cynical or detached have you become about your daily life?",
        description: "Not in a funny way. In a 'I don't care anymore' way.",
        options: [
          { id: "engaged", label: "I'm still engaged and care about how things go", dimensions: { "burnout-signals": 1 } },
          { id: "some-detachment", label: "Some detachment on hard days, but I bounce back", dimensions: { "burnout-signals": 2 } },
          { id: "checked-out", label: "I've checked out — I'm physically present but emotionally gone", dimensions: { "burnout-signals": 3 } },
          { id: "resentful", label: "I resent my life, my responsibilities, and sometimes the people in it", dimensions: { "burnout-signals": 4 } },
        ],
      },
      {
        id: "db-bs-3",
        question: "Have you noticed changes in your health that won't resolve?",
        description: "Getting sick more often, unexplained pain, weight changes, hair loss, skin issues, digestive problems.",
        options: [
          { id: "healthy", label: "No — my health is stable", dimensions: { "burnout-signals": 1 } },
          { id: "minor", label: "Minor things — more colds, some tension, nothing major", dimensions: { "burnout-signals": 2 } },
          { id: "noticeable", label: "Noticeable changes — my body is clearly stressed", dimensions: { "burnout-signals": 3 } },
          { id: "significant", label: "Significant health impacts — my body is breaking down and I can't ignore it", dimensions: { "burnout-signals": 4 } },
        ],
      },
    ],
  },
  {
    id: "giving-patterns",
    title: "Giving Patterns",
    description: "How much you pour out vs. how much comes back",
    questions: [
      {
        id: "db-gp-1",
        question: "How often do you put everyone else's needs before your own?",
        description: "Not occasionally — as a pattern. As a default.",
        options: [
          { id: "balanced", label: "I balance my needs with others' — I matter too", dimensions: { "giving-patterns": 1 } },
          { id: "mostly-others", label: "Mostly others first, but I get to myself eventually", dimensions: { "giving-patterns": 2 } },
          { id: "always-last", label: "Always last — I only attend to myself when there's nothing left to give anyone else", dimensions: { "giving-patterns": 3 } },
          { id: "never", label: "I never attend to my own needs — I don't even register them anymore", dimensions: { "giving-patterns": 4 } },
        ],
      },
      {
        id: "db-gp-2",
        question: "Can you say no without guilt?",
        description: "To requests, invitations, expectations, additional responsibilities.",
        options: [
          { id: "yes", label: "Yes — I set boundaries and feel okay about them", dimensions: { "giving-patterns": 1 } },
          { id: "sometimes", label: "Sometimes — but guilt follows and I often cave", dimensions: { "giving-patterns": 2 } },
          { id: "rarely", label: "Rarely — I say yes to everything and then resent it", dimensions: { "giving-patterns": 3 } },
          { id: "cant", label: "I can't — the word 'no' feels physically impossible to say", dimensions: { "giving-patterns": 4 } },
        ],
      },
      {
        id: "db-gp-3",
        question: "Do you feel appreciated for what you do?",
        description: "By your partner, your kids, your family, your community.",
        options: [
          { id: "yes", label: "Yes — the people around me see and acknowledge my effort", dimensions: { "giving-patterns": 1 } },
          { id: "sometimes", label: "Sometimes — but I often feel invisible", dimensions: { "giving-patterns": 2 } },
          { id: "rarely", label: "Rarely — I pour out constantly and get very little back", dimensions: { "giving-patterns": 3 } },
          { id: "never", label: "Never — I feel like a service provider, not a person", dimensions: { "giving-patterns": 4 } },
        ],
      },
    ],
  },
  {
    id: "depletion-vs-depression",
    title: "Understanding Your State",
    description: "Helping you see what's actually happening — depletion, burnout, or something deeper",
    questions: [
      {
        id: "db-dd-1",
        question: "If someone magically gave you a week completely alone — no responsibilities, no demands — how would you feel?",
        description: "This question helps distinguish depletion from depression.",
        options: [
          { id: "excited", label: "Excited — I'd know exactly what to do with that time", dimensions: { "depletion-vs-depression": 1 } },
          { id: "relieved", label: "Relieved — I'd probably sleep for three days and then feel human again", dimensions: { "depletion-vs-depression": 2 } },
          { id: "unsure", label: "Unsure — I don't know if rest would actually help at this point", dimensions: { "depletion-vs-depression": 3 } },
          { id: "empty", label: "Empty — I don't think I'd feel better. The problem isn't just tiredness", dimensions: { "depletion-vs-depression": 4 } },
        ],
      },
      {
        id: "db-dd-2",
        question: "Is there a specific cause for your exhaustion, or does it feel like it comes from everywhere?",
        description: "Can you point to what's draining you, or is it a general heaviness?",
        options: [
          { id: "specific", label: "Specific — I can name exactly what's draining me (a phase, a situation, a lack of support)", dimensions: { "depletion-vs-depression": 1 } },
          { id: "multiple", label: "Multiple things — I can list them, but together they're too much", dimensions: { "depletion-vs-depression": 2 } },
          { id: "everything", label: "Everything — life itself feels exhausting, not any one thing", dimensions: { "depletion-vs-depression": 3 } },
          { id: "no-reason", label: "I can't explain it — I 'should' be fine but I'm not", dimensions: { "depletion-vs-depression": 4 } },
        ],
      },
      {
        id: "db-dd-3",
        question: "Do you still have moments — even brief ones — where you feel like yourself?",
        description: "Flashes of joy, connection, humor, creativity, hope.",
        options: [
          { id: "regularly", label: "Regularly — good moments happen most days", dimensions: { "depletion-vs-depression": 1 } },
          { id: "sometimes", label: "Sometimes — they're less frequent but they still come", dimensions: { "depletion-vs-depression": 2 } },
          { id: "rarely", label: "Rarely — I have to really search for them", dimensions: { "depletion-vs-depression": 3 } },
          { id: "never", label: "I can't remember the last time I felt like myself", dimensions: { "depletion-vs-depression": 4 } },
        ],
      },
    ],
  },
]

export const DEPLETION_BURNOUT_META = {
  id: "depletion-burnout",
  slug: "depletion-burnout",
  title: "Depletion & Burnout",
  subtitle: "Where your energy goes and why there's none left",
  description: "This reflection helps you understand whether you're tired, depleted, burned out, or something deeper. It's not about pushing through — it's about understanding what your body and mind actually need to recover.",
  estimatedMinutes: 7,
  questionCount: 15,
}
