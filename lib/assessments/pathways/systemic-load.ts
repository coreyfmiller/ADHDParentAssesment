// ============================================================
// Systemic Load — Pathway Assessment
// The system is broken, not you
// Maps invisible labor, division of responsibility, and structural gaps
// ============================================================

import type { AssessmentSection } from "../types"

export const SYSTEMIC_LOAD_SECTIONS: AssessmentSection[] = [
  {
    id: "mental-load",
    title: "The Mental Load",
    description: "The invisible tracking, planning, and remembering that no one sees",
    questions: [
      {
        id: "sl-ml-1",
        question: "Who in your household holds the 'master list' — knowing what needs to happen, when, and for whom?",
        description: "Not who does the tasks. Who REMEMBERS they need doing.",
        options: [
          { id: "shared", label: "It's genuinely shared — we both track and initiate equally", dimensions: { "mental-load": 1 } },
          { id: "mostly-me", label: "Mostly me — my partner helps when asked but I hold the awareness", dimensions: { "mental-load": 2 } },
          { id: "all-me", label: "All me — if I don't remember it, it doesn't happen", dimensions: { "mental-load": 3 } },
          { id: "solo", label: "I'm the sole adult — there's no one to share it with", dimensions: { "mental-load": 4 } },
        ],
      },
      {
        id: "sl-ml-2",
        question: "How much of your mental energy goes to anticipating and preventing problems?",
        description: "Packing the extra outfit, checking the weather, remembering allergies at parties, planning for meltdowns.",
        options: [
          { id: "minimal", label: "Minimal — I handle things as they come up", dimensions: { "mental-load": 1 } },
          { id: "moderate", label: "A fair amount — I'm always a few steps ahead", dimensions: { "mental-load": 2 } },
          { id: "constant", label: "Constant — my brain is always running scenarios and contingencies", dimensions: { "mental-load": 3 } },
          { id: "exhausting", label: "It's exhausting — I'm managing everyone's needs before they even arise", dimensions: { "mental-load": 4 } },
        ],
      },
      {
        id: "sl-ml-3",
        question: "When you go away (a trip, a hospital stay, even a long day out), what happens at home?",
        description: "Does life continue smoothly, or does everything fall apart?",
        options: [
          { id: "fine", label: "Everything runs fine — my partner/family handles it competently", dimensions: { "mental-load": 1 } },
          { id: "mostly-ok", label: "Mostly okay — some things get missed but nothing critical", dimensions: { "mental-load": 2 } },
          { id: "chaos", label: "Things fall apart — I come back to chaos and catch-up", dimensions: { "mental-load": 3 } },
          { id: "cant-leave", label: "I can't leave — the thought of what I'd come back to keeps me from going", dimensions: { "mental-load": 4 } },
        ],
      },
    ],
  },
  {
    id: "division-of-labor",
    title: "Division of Labor",
    description: "Who does what — and whether it's actually fair",
    questions: [
      {
        id: "sl-dl-1",
        question: "How is physical household labor divided in your home?",
        description: "Cooking, cleaning, laundry, tidying, yard work, repairs, grocery shopping.",
        options: [
          { id: "equal", label: "Roughly equal — we each handle our share without resentment", dimensions: { "division-of-labor": 1 } },
          { id: "uneven", label: "Uneven — I do more, but my partner contributes meaningfully", dimensions: { "division-of-labor": 2 } },
          { id: "mostly-me", label: "Mostly me — my partner does occasional tasks but I carry the bulk", dimensions: { "division-of-labor": 3 } },
          { id: "all-me", label: "All me — I do virtually everything or I'm doing it alone", dimensions: { "division-of-labor": 4 } },
        ],
      },
      {
        id: "sl-dl-2",
        question: "Who handles the 'default parent' responsibilities — sick days, school calls, appointment scheduling, emotional support?",
        description: "The parent the school calls first. The one who stays home. The one who knows the pediatrician's number.",
        options: [
          { id: "shared", label: "We alternate or share these genuinely", dimensions: { "division-of-labor": 1 } },
          { id: "mostly-me", label: "Mostly me — but my partner steps in when I can't", dimensions: { "division-of-labor": 2 } },
          { id: "always-me", label: "Always me — it's not even a question. I'm the default.", dimensions: { "division-of-labor": 3 } },
          { id: "sole-parent", label: "I'm the only parent — there's no one to share with", dimensions: { "division-of-labor": 4 } },
        ],
      },
      {
        id: "sl-dl-3",
        question: "When you ask for help, what typically happens?",
        description: "Not whether you should have to ask. What happens when you do.",
        options: [
          { id: "done-well", label: "It gets done — willingly and competently", dimensions: { "division-of-labor": 1 } },
          { id: "done-poorly", label: "It gets done but poorly — so I end up redoing it or managing the process", dimensions: { "division-of-labor": 2 } },
          { id: "resistance", label: "I get resistance, sighing, or 'in a minute' that never comes", dimensions: { "division-of-labor": 3 } },
          { id: "not-worth", label: "It's not worth asking — the emotional cost of asking exceeds just doing it myself", dimensions: { "division-of-labor": 4 } },
        ],
      },
    ],
  },
  {
    id: "support-systems",
    title: "Support & Community",
    description: "Whether you have people who actually help — not just exist nearby",
    questions: [
      {
        id: "sl-ss-1",
        question: "Do you have people you can call in a genuine emergency — not just 911, but 'I need someone here in 20 minutes'?",
        description: "A flat tire with kids in the car. A mental health crisis. A sick day when you can't function.",
        options: [
          { id: "several", label: "Several people — I have a reliable support network", dimensions: { "support-systems": 1 } },
          { id: "one-two", label: "One or two people — but I feel guilty calling on them", dimensions: { "support-systems": 2 } },
          { id: "theoretically", label: "Theoretically yes, but practically I'd never actually call", dimensions: { "support-systems": 3 } },
          { id: "no-one", label: "No one — I am completely on my own", dimensions: { "support-systems": 4 } },
        ],
      },
      {
        id: "sl-ss-2",
        question: "How often do you get a genuine break from parenting — where someone else is fully responsible?",
        description: "Not 'watching the kids while you cook.' Fully responsible, no questions asked, you're off duty.",
        options: [
          { id: "weekly", label: "Weekly — I have regular time that's mine", dimensions: { "support-systems": 1 } },
          { id: "monthly", label: "Monthly — it happens but not often enough", dimensions: { "support-systems": 2 } },
          { id: "rarely", label: "Rarely — maybe a few times a year", dimensions: { "support-systems": 3 } },
          { id: "never", label: "Never — I am always on duty, 24/7, no exceptions", dimensions: { "support-systems": 4 } },
        ],
      },
      {
        id: "sl-ss-3",
        question: "Do you have friendships where you feel genuinely seen — not just as 'mom' but as a person?",
        description: "People who ask how YOU are, not just how the kids are.",
        options: [
          { id: "yes", label: "Yes — I have close friends who know and see me", dimensions: { "support-systems": 1 } },
          { id: "fading", label: "They're fading — I used to, but motherhood has isolated me", dimensions: { "support-systems": 2 } },
          { id: "surface", label: "Only surface-level — no one really knows what's going on with me", dimensions: { "support-systems": 3 } },
          { id: "none", label: "No — I feel completely alone in this", dimensions: { "support-systems": 4 } },
        ],
      },
    ],
  },
  {
    id: "structural-barriers",
    title: "Structural Barriers",
    description: "The systems and circumstances that make everything harder",
    questions: [
      {
        id: "sl-sb-1",
        question: "How much financial stress affects your ability to get support?",
        description: "Therapy, childcare, house cleaning, takeout on hard days, a babysitter for a break.",
        options: [
          { id: "not-barrier", label: "Not a barrier — I can access support when I need it", dimensions: { "structural-barriers": 1 } },
          { id: "some-limits", label: "Some limits — I have to choose carefully but can get some help", dimensions: { "structural-barriers": 2 } },
          { id: "significant", label: "Significant barrier — most support options are out of reach financially", dimensions: { "structural-barriers": 3 } },
          { id: "impossible", label: "Impossible — I can't afford any help and it compounds everything", dimensions: { "structural-barriers": 4 } },
        ],
      },
      {
        id: "sl-sb-2",
        question: "How does your work situation (paid or unpaid) interact with your parenting load?",
        description: "Whether you work outside the home, from home, or are a full-time parent.",
        options: [
          { id: "balanced", label: "Balanced — my work and parenting coexist without constant conflict", dimensions: { "structural-barriers": 1 } },
          { id: "stretched", label: "Stretched — I'm managing both but something always suffers", dimensions: { "structural-barriers": 2 } },
          { id: "impossible", label: "Impossible — I'm expected to perform at both with no accommodation for either", dimensions: { "structural-barriers": 3 } },
          { id: "trapped", label: "Trapped — I can't work the way I need to AND parent the way I want to", dimensions: { "structural-barriers": 4 } },
        ],
      },
      {
        id: "sl-sb-3",
        question: "Do you feel like the systems around you (school, healthcare, community) were designed for your family?",
        description: "School schedules, appointment availability, activity timing, social expectations.",
        options: [
          { id: "yes", label: "Mostly yes — things are set up in ways that work for us", dimensions: { "structural-barriers": 1 } },
          { id: "some-friction", label: "Some friction — we make it work but it takes extra effort", dimensions: { "structural-barriers": 2 } },
          { id: "constant-fight", label: "Constant fight — I'm always working around systems that don't fit us", dimensions: { "structural-barriers": 3 } },
          { id: "excluded", label: "Excluded — the systems actively make our life harder", dimensions: { "structural-barriers": 4 } },
        ],
      },
    ],
  },
]

export const SYSTEMIC_LOAD_META = {
  id: "systemic-load",
  slug: "systemic-load",
  title: "Systemic Load",
  subtitle: "The system is broken, not you",
  description: "This reflection maps the invisible labor you carry, the support gaps around you, and the structural barriers that make everything harder. Sometimes the problem isn't your brain — it's the system you're operating within.",
  estimatedMinutes: 5,
  questionCount: 12,
}
