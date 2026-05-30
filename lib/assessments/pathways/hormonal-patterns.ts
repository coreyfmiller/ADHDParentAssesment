// ============================================================
// Hormonal Patterns — Pathway Assessment
// The cyclical nature of your capacity
// ============================================================

import type { AssessmentSection } from "../types"

export const HORMONAL_PATTERNS_SECTIONS: AssessmentSection[] = [
  {
    id: "cycle-awareness",
    title: "Cycle Awareness",
    description: "Whether you've noticed patterns tied to your hormonal cycle",
    questions: [
      {
        id: "hp-ca-1",
        question: "Have you noticed that your ability to cope, focus, or regulate emotions changes predictably throughout the month?",
        description: "Not random bad days — a pattern. Good weeks and hard weeks that repeat.",
        options: [
          { id: "no-pattern", label: "No — my capacity feels fairly consistent regardless of cycle", dimensions: { "cycle-awareness": 1 } },
          { id: "vague", label: "Vaguely — I've noticed some weeks are harder but haven't tracked it", dimensions: { "cycle-awareness": 2 } },
          { id: "clear", label: "Yes — there's a clear pattern. Some weeks I'm capable, others I'm barely functioning", dimensions: { "cycle-awareness": 3 } },
          { id: "dramatic", label: "Dramatically — it's like being two different people depending on where I am in my cycle", dimensions: { "cycle-awareness": 4 } },
        ],
      },
      {
        id: "hp-ca-2",
        question: "In the week before your period (or during perimenopause), what happens to your executive function?",
        description: "Planning, memory, task initiation, emotional regulation.",
        options: [
          { id: "same", label: "About the same — no noticeable change", dimensions: { "cycle-awareness": 1 } },
          { id: "slightly-worse", label: "Slightly worse — I'm a bit more scattered or emotional", dimensions: { "cycle-awareness": 2 } },
          { id: "significantly-worse", label: "Significantly worse — it's like my ADHD symptoms double", dimensions: { "cycle-awareness": 3 } },
          { id: "non-functional", label: "I become nearly non-functional — can't think, can't plan, can't cope", dimensions: { "cycle-awareness": 4 } },
        ],
      },
      {
        id: "hp-ca-3",
        question: "Do you track your cycle in relation to your mood, energy, and capacity?",
        description: "Not just period dates — but how you FEEL across the month.",
        options: [
          { id: "yes-detailed", label: "Yes — I track and plan around my cycle phases", dimensions: { "cycle-awareness": 1 } },
          { id: "loosely", label: "Loosely — I know roughly where I am but don't plan around it", dimensions: { "cycle-awareness": 2 } },
          { id: "no", label: "No — I've never connected my capacity to my cycle", dimensions: { "cycle-awareness": 3 } },
          { id: "irregular", label: "My cycle is too irregular/absent to track (perimenopause, postpartum, etc.)", dimensions: { "cycle-awareness": 3 } },
        ],
      },
    ],
  },
  {
    id: "hormonal-impact",
    title: "Hormonal Impact",
    description: "How hormonal shifts affect your daily functioning",
    questions: [
      {
        id: "hp-hi-1",
        question: "How does your emotional reactivity change with your hormonal cycle?",
        description: "Rage, tearfulness, sensitivity to rejection, irritability.",
        options: [
          { id: "stable", label: "Stays fairly stable — I'm emotionally consistent", dimensions: { "hormonal-impact": 1 } },
          { id: "mild-shifts", label: "Mild shifts — I'm a bit more sensitive at certain times", dimensions: { "hormonal-impact": 2 } },
          { id: "significant", label: "Significant — I become a different person emotionally for days at a time", dimensions: { "hormonal-impact": 3 } },
          { id: "extreme", label: "Extreme — the rage or despair feels uncontrollable and frightening", dimensions: { "hormonal-impact": 4 } },
        ],
      },
      {
        id: "hp-hi-2",
        question: "How does your energy and motivation fluctuate with hormonal changes?",
        description: "Not just tiredness — the drive to do anything at all.",
        options: [
          { id: "consistent", label: "Fairly consistent — I can maintain my routines regardless", dimensions: { "hormonal-impact": 1 } },
          { id: "dips", label: "Noticeable dips — some days I need to push harder", dimensions: { "hormonal-impact": 2 } },
          { id: "crashes", label: "Crashes — there are days I physically cannot make myself do things", dimensions: { "hormonal-impact": 3 } },
          { id: "bedridden", label: "Complete shutdown — some days I can barely get out of bed", dimensions: { "hormonal-impact": 4 } },
        ],
      },
      {
        id: "hp-hi-3",
        question: "How do hormonal shifts affect your sensory sensitivity?",
        description: "Noise tolerance, touch aversion, overwhelm threshold.",
        options: [
          { id: "no-change", label: "No noticeable change — my sensory tolerance stays the same", dimensions: { "hormonal-impact": 1 } },
          { id: "slightly-lower", label: "Slightly lower threshold — I'm a bit more sensitive at certain times", dimensions: { "hormonal-impact": 2 } },
          { id: "much-lower", label: "Much lower — things I normally tolerate become unbearable", dimensions: { "hormonal-impact": 3 } },
          { id: "extreme", label: "Extreme — I go from managing to complete sensory meltdown based on cycle phase", dimensions: { "hormonal-impact": 4 } },
        ],
      },
    ],
  },
  {
    id: "life-stage",
    title: "Life Stage & Transitions",
    description: "How your current hormonal life stage affects everything",
    questions: [
      {
        id: "hp-ls-1",
        question: "Which hormonal life stage best describes where you are right now?",
        description: "This helps us understand the specific hormonal context you're navigating.",
        options: [
          { id: "regular-cycling", label: "Regular cycling — predictable periods, no major hormonal disruption", dimensions: { "life-stage": 1 } },
          { id: "postpartum", label: "Postpartum (0-2 years) — still recovering from pregnancy/birth/breastfeeding", dimensions: { "life-stage": 3 } },
          { id: "perimenopause", label: "Perimenopause — irregular cycles, new symptoms, feeling like I'm losing my mind", dimensions: { "life-stage": 3 } },
          { id: "other", label: "Other hormonal disruption — medication changes, thyroid issues, PCOS, etc.", dimensions: { "life-stage": 3 } },
        ],
      },
      {
        id: "hp-ls-2",
        question: "Have your cognitive or emotional symptoms gotten noticeably worse at a specific life transition?",
        description: "After having a baby, starting/stopping birth control, entering your 40s, during breastfeeding.",
        options: [
          { id: "no", label: "No — I've been fairly consistent across life stages", dimensions: { "life-stage": 1 } },
          { id: "after-baby", label: "After having a baby — I've never been the same since", dimensions: { "life-stage": 3 } },
          { id: "recent-years", label: "In recent years (late 30s/40s) — something shifted and I can't keep up anymore", dimensions: { "life-stage": 3 } },
          { id: "medication", label: "After a medication or hormonal change — it triggered a cascade", dimensions: { "life-stage": 3 } },
        ],
      },
      {
        id: "hp-ls-3",
        question: "Do you feel like your healthcare providers understand the connection between your hormones and your mental/cognitive symptoms?",
        description: "Have you been heard when you've raised these concerns?",
        options: [
          { id: "yes", label: "Yes — I have providers who take this seriously and help me manage it", dimensions: { "life-stage": 1 } },
          { id: "somewhat", label: "Somewhat — they acknowledge it but don't offer much beyond 'it's normal'", dimensions: { "life-stage": 2 } },
          { id: "dismissed", label: "Dismissed — I've been told it's 'just stress' or 'just motherhood'", dimensions: { "life-stage": 3 } },
          { id: "never-raised", label: "I've never raised it — I didn't know hormones could cause this", dimensions: { "life-stage": 4 } },
        ],
      },
    ],
  },
  {
    id: "planning-around-cycle",
    title: "Planning & Adaptation",
    description: "Whether you're able to work with your cycle instead of against it",
    questions: [
      {
        id: "hp-pac-1",
        question: "Do you adjust your expectations or schedule based on where you are in your cycle?",
        description: "Lighter days during luteal phase, bigger tasks during follicular, etc.",
        options: [
          { id: "yes", label: "Yes — I plan around my cycle and it helps enormously", dimensions: { "planning-around-cycle": 1 } },
          { id: "trying", label: "I'm trying to — but life doesn't always allow flexibility", dimensions: { "planning-around-cycle": 2 } },
          { id: "no-awareness", label: "No — I push through at the same pace regardless and crash", dimensions: { "planning-around-cycle": 3 } },
          { id: "cant", label: "I can't — my cycle is too unpredictable or my life has no flexibility", dimensions: { "planning-around-cycle": 4 } },
        ],
      },
      {
        id: "hp-pac-2",
        question: "Does your family understand that your capacity fluctuates cyclically?",
        description: "Partner, kids (age-appropriate), support people.",
        options: [
          { id: "yes-supportive", label: "Yes — they adjust expectations and offer extra support during hard phases", dimensions: { "planning-around-cycle": 1 } },
          { id: "aware-not-helpful", label: "They're aware but don't really change their behavior", dimensions: { "planning-around-cycle": 2 } },
          { id: "dont-know", label: "They don't know — I mask through the hard phases", dimensions: { "planning-around-cycle": 3 } },
          { id: "dismissed", label: "They dismiss it — 'it's just PMS' or 'you're always tired'", dimensions: { "planning-around-cycle": 4 } },
        ],
      },
    ],
  },
]

export const HORMONAL_PATTERNS_META = {
  id: "hormonal-patterns",
  slug: "hormonal-patterns",
  title: "Hormonal Patterns",
  subtitle: "The cyclical nature of your capacity",
  description: "This reflection explores how hormonal fluctuations affect your executive function, mood, energy, and sensory sensitivity. Many women discover that what they thought was 'random bad days' is actually a predictable pattern they can plan around.",
  estimatedMinutes: 5,
  questionCount: 11,
}
