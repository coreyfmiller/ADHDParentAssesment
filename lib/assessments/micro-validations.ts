// ============================================================
// Micro-Validations — Conversational copy that makes the
// assessment feel like being held, not being tested.
//
// Design principles:
// 1. Warm-up: Each section opens with a gentle framing that
//    reduces defensiveness and gives permission to be honest.
// 2. Transitions: Between sections, acknowledge what she just
//    shared and bridge to what's next with care.
// 3. Never clinical. Never cheerful. Just... present.
// ============================================================

/**
 * Shown above the section label when entering a new section.
 * Sets the emotional tone and gives permission.
 */
export const SECTION_OPENERS: Record<string, string> = {
  // Snapshot sections
  "cognitive-load": "Let's start with your mind — how it's holding up under everything you're carrying.",
  "emotional-bandwidth": "Now let's look at your emotional capacity. There's no right answer here — just honesty.",
  "physical-depletion": "Let's check in with your body. It's been carrying a lot too.",
  "system-friction": "Now let's look at the structure around you — whether daily life is helping or fighting you.",
  "identity-erosion": "Last one. This section is about you — not mom-you. The person underneath.",

  // Executive Function sections
  "time-perception": "Let's start with how your brain relates to time. Be honest — no one's grading this.",
  "task-initiation": "Now let's look at the gap between knowing and doing. This one might sting a little.",
  "working-memory": "Let's talk about what your brain can hold — and what falls through.",
  "organization-systems": "Now let's look at your relationship with structure and systems.",
  "attention-regulation": "Last section. Let's look at where your attention actually goes.",

  // Depletion sections
  "energy-patterns": "Let's start with your energy — not what you wish it was, but what it actually is.",
  "recovery-capacity": "Now let's look at whether rest is actually reaching you.",
  "burnout-signals": "This section asks about some harder things. Take your time.",
  "giving-patterns": "Let's look at how much you pour out — and how much comes back.",
  "depletion-vs-depression": "These last questions help distinguish what's happening. Answer from your gut.",

  // Sensory sections
  "auditory-processing": "Let's start with sound. How does your brain handle noise?",
  "tactile-sensitivity": "Now let's talk about touch. This is a safe space to be honest about this.",
  "visual-overwhelm": "Let's look at how visual input affects you.",
  "overwhelm-patterns": "Now let's look at what happens when everything hits at once.",
  "regulation-strategies": "Last section — what tools you have (or don't) for managing all of this.",

  // Systemic Load sections
  "mental-load": "Let's look at the invisible work — the tracking, planning, and remembering no one sees.",
  "division-of-labor": "Now let's look at who does what. Be honest, even if it brings up feelings.",
  "support-systems": "Let's talk about your people — who's actually there for you.",
  "structural-barriers": "Last section. Let's look at the systems around you — not just the ones inside you.",

  // Hormonal sections
  "cycle-awareness": "Let's start with what you've noticed about patterns in your capacity.",
  "hormonal-impact": "Now let's look at how hormonal shifts actually affect your daily functioning.",
  "life-stage": "Let's talk about where you are right now — the hormonal context of your life.",
  "planning-around-cycle": "Last section. Let's see whether you're able to work with your cycle or against it.",

  // Sleep sections
  "sleep-quality": "Let's start with what actually happens when you try to sleep.",
  "sleep-disruption": "Now let's look at what's interrupting your sleep from outside.",
  "sleep-habits": "Let's talk about your relationship with bedtime — honestly.",
  "daytime-impact": "Last section. How is all of this showing up in your waking life?",

  // Trauma sections
  "nervous-system-state": "Let's start gently. This is about how your body holds stress — past and present.",
  "childhood-patterns": "This section asks about your own upbringing. Go at your own pace. Skip anything that's too much.",
  "protective-patterns": "Let's look at the strategies you developed to survive — and whether they're still serving you.",
  "healing-readiness": "Last section. This is about where you are now with all of this.",
}

/**
 * Shown in the section transition overlay between sections.
 * Acknowledges what she just shared and bridges to what's next.
 * Format: { acknowledgment, bridge }
 */
export const SECTION_TRANSITIONS: Record<string, { acknowledgment: string; bridge: string }> = {
  // Snapshot: after cognitive-load, transitioning to emotional-bandwidth
  "cognitive-load→emotional-bandwidth": {
    acknowledgment: "Thank you for being honest about that. However your brain is handling things right now — that's real, and it matters.",
    bridge: "Now let's look at your emotional world.",
  },
  // Snapshot: after emotional-bandwidth, transitioning to physical-depletion
  "emotional-bandwidth→physical-depletion": {
    acknowledgment: "What you just shared about your emotional capacity takes courage to admit. Most people never look at this honestly.",
    bridge: "Let's check in with your body next.",
  },
  // Snapshot: after physical-depletion, transitioning to system-friction
  "physical-depletion→system-friction": {
    acknowledgment: "Your body is telling you something. Whatever it said just now — it deserves to be heard.",
    bridge: "Let's look at the structure around you.",
  },
  // Snapshot: after system-friction, transitioning to identity-erosion
  "system-friction→identity-erosion": {
    acknowledgment: "The systems around you shape everything. Seeing them clearly is the first step to changing what isn't working.",
    bridge: "One more section. This one's about you.",
  },

  // Executive Function transitions
  "time-perception→task-initiation": {
    acknowledgment: "Your relationship with time is what it is. Understanding it means you can stop blaming yourself for it.",
    bridge: "Let's look at what happens when you try to start things.",
  },
  "task-initiation→working-memory": {
    acknowledgment: "The gap between wanting to do something and being able to start it — that's one of the most misunderstood experiences. You just named it clearly.",
    bridge: "Now let's look at what your brain can hold.",
  },
  "working-memory→organization-systems": {
    acknowledgment: "If things disappear from your awareness when they're not visible — that's not carelessness. That's how your brain is wired.",
    bridge: "Let's look at the systems you've tried.",
  },
  "organization-systems→attention-regulation": {
    acknowledgment: "However many systems you've tried and abandoned — each one taught you something about what your brain actually needs.",
    bridge: "Last section. Let's look at your attention.",
  },

  // Depletion transitions
  "energy-patterns→recovery-capacity": {
    acknowledgment: "However long you've been running on empty — naming it is the first step toward something different.",
    bridge: "Let's see whether rest is actually reaching you.",
  },
  "recovery-capacity→burnout-signals": {
    acknowledgment: "If rest isn't restoring you, that's important information. It means the solution isn't just 'more sleep.'",
    bridge: "These next questions go a bit deeper. Take your time.",
  },
  "burnout-signals→giving-patterns": {
    acknowledgment: "Whatever your body and mind are telling you right now — those signals are real. They're not drama. They're data.",
    bridge: "Let's look at how much you give versus how much comes back.",
  },
  "giving-patterns→depletion-vs-depression": {
    acknowledgment: "The pattern of giving everything and receiving nothing — seeing it clearly is uncomfortable. But you can't change what you can't see.",
    bridge: "A few more questions to help understand what's actually happening.",
  },

  // Sensory transitions
  "auditory-processing→tactile-sensitivity": {
    acknowledgment: "Your relationship with sound is yours. There's no 'too sensitive' — there's just your nervous system telling you what it can handle.",
    bridge: "Let's talk about physical touch next.",
  },
  "tactile-sensitivity→visual-overwhelm": {
    acknowledgment: "If being touched feels like too much — that's your body communicating a real limit. Not a failure of love.",
    bridge: "Let's look at how visual input affects you.",
  },
  "visual-overwhelm→overwhelm-patterns": {
    acknowledgment: "How your environment affects your thinking is real neurology, not fussiness.",
    bridge: "Now let's look at what happens when everything hits at once.",
  },
  "overwhelm-patterns→regulation-strategies": {
    acknowledgment: "The crash, the snap, the shutdown — those aren't character flaws. They're a nervous system at capacity.",
    bridge: "Last section. Let's see what tools you have.",
  },

  // Systemic Load transitions
  "mental-load→division-of-labor": {
    acknowledgment: "The invisible work you just described — most people have never written it down or said it out loud. You just did.",
    bridge: "Let's look at who does what in your home.",
  },
  "division-of-labor→support-systems": {
    acknowledgment: "However the labor is divided — seeing it clearly, without minimizing, is how change starts.",
    bridge: "Let's look at your broader support.",
  },
  "support-systems→structural-barriers": {
    acknowledgment: "Whether you have a village or you're doing this alone — that reality shapes everything else.",
    bridge: "One more section about the systems around you.",
  },

  // Hormonal transitions
  "cycle-awareness→hormonal-impact": {
    acknowledgment: "If you've noticed patterns — even vague ones — that's awareness most people never develop.",
    bridge: "Let's look at how these shifts actually affect your daily life.",
  },
  "hormonal-impact→life-stage": {
    acknowledgment: "The way your capacity shifts isn't weakness. It's biology that deserves accommodation, not punishment.",
    bridge: "Let's look at where you are in your hormonal life right now.",
  },
  "life-stage→planning-around-cycle": {
    acknowledgment: "Whatever transition you're in — your experience of it is valid, even if others minimize it.",
    bridge: "Last section. Let's see if you're able to plan around these shifts.",
  },

  // Sleep transitions
  "sleep-quality→sleep-disruption": {
    acknowledgment: "What happens when you try to sleep — that's important information about your nervous system, not just your 'sleep hygiene.'",
    bridge: "Now let's look at what's waking you from outside.",
  },
  "sleep-disruption→sleep-habits": {
    acknowledgment: "If your sleep is being interrupted by forces outside your control — that's not a habit problem. That's a circumstance problem.",
    bridge: "Let's look at your relationship with bedtime.",
  },
  "sleep-habits→daytime-impact": {
    acknowledgment: "However you relate to bedtime — there's usually a reason underneath the behavior that deserves compassion, not criticism.",
    bridge: "Last section. How is all of this showing up during the day?",
  },

  // Trauma transitions
  "nervous-system-state→childhood-patterns": {
    acknowledgment: "If your body is stuck in protection mode — it learned that for a reason. It was trying to keep you safe. It still is.",
    bridge: "These next questions are about your own childhood. Go gently. Skip anything that's too much right now.",
  },
  "childhood-patterns→protective-patterns": {
    acknowledgment: "Whatever you just acknowledged about your upbringing — that took real courage. You don't have to do anything with it yet. Just let it be seen.",
    bridge: "Let's look at the strategies you built to cope.",
  },
  "protective-patterns→healing-readiness": {
    acknowledgment: "The patterns you developed kept you alive. They deserve gratitude, even as you outgrow them.",
    bridge: "Last section. Where are you with all of this right now?",
  },
}

/**
 * Get the transition copy between two sections.
 * Falls back to a gentle generic if no specific transition exists.
 */
export function getTransitionCopy(
  fromSectionId: string,
  toSectionId: string
): { acknowledgment: string; bridge: string } {
  const key = `${fromSectionId}→${toSectionId}`
  if (SECTION_TRANSITIONS[key]) {
    return SECTION_TRANSITIONS[key]
  }
  // Generic fallback — still warm, still present
  return {
    acknowledgment: "Thank you for being honest. What you shared matters.",
    bridge: "Let's keep going.",
  }
}

/**
 * Get the section opener copy.
 * Falls back to a gentle generic if no specific opener exists.
 */
export function getSectionOpener(sectionId: string): string {
  return SECTION_OPENERS[sectionId] || ""
}
