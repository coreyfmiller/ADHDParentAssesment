// ============================================================
// Crisis Detection — Safety-Critical System
//
// Detects language indicating self-harm, harm to others, or
// severe crisis states. When triggered, IMMEDIATELY surfaces
// crisis resources before any other response.
//
// This is non-negotiable. It must run on every user text input
// that goes to the AI or gets processed by the engagement system.
//
// IMPORTANT: This is a keyword heuristic, not a clinical tool.
// It errs heavily on the side of caution — false positives are
// acceptable, false negatives are not.
// ============================================================

export interface CrisisDetectionResult {
  isCrisis: boolean
  severity: "none" | "moderate" | "severe"
  category?: "self-harm" | "harm-to-others" | "harm-to-children" | "suicidal" | "severe-distress"
  message?: string
  resources: CrisisResource[]
}

export interface CrisisResource {
  name: string
  contact: string
  description: string
}

const CRISIS_RESOURCES: CrisisResource[] = [
  {
    name: "988 Suicide & Crisis Lifeline",
    contact: "Call or text 988",
    description: "Free, confidential support 24/7 for people in distress.",
  },
  {
    name: "Crisis Text Line",
    contact: "Text HOME to 741741",
    description: "Free crisis counseling via text message.",
  },
  {
    name: "Childhelp National Child Abuse Hotline",
    contact: "1-800-422-4453",
    description: "For parents who fear they may hurt their child.",
  },
  {
    name: "Postpartum Support International",
    contact: "1-800-944-4773",
    description: "Support for perinatal mental health crises.",
  },
]

// ---- Keyword Detection ----

const SEVERE_KEYWORDS = [
  "kill myself",
  "want to die",
  "end my life",
  "better off dead",
  "better without me",
  "not worth living",
  "suicide",
  "suicidal",
  "end it all",
  "don't want to be here",
  "dont want to be here",
  "don't want to exist",
  "dont want to exist",
  "can't go on",
  "cant go on",
  "no reason to live",
  "hurt myself",
  "harm myself",
  "cutting",
  "overdose",
]

const HARM_TO_OTHERS_KEYWORDS = [
  "hurt my child",
  "hurt my kid",
  "hurt my baby",
  "shake my baby",
  "shake the baby",
  "want to hit my child",
  "want to hit my kid",
  "afraid i'll hurt",
  "afraid ill hurt",
  "scared i'll hurt",
  "scared ill hurt",
  "going to hurt",
  "might hurt my",
]

const MODERATE_KEYWORDS = [
  "can't do this anymore",
  "cant do this anymore",
  "don't want to wake up",
  "dont want to wake up",
  "i give up",
  "there's no point",
  "theres no point",
  "nobody would notice",
  "everyone would be better",
  "i'm breaking",
  "im breaking",
  "falling apart completely",
  "i can't survive this",
  "i cant survive this",
  "i'm not safe",
  "im not safe",
  "dangerous thoughts",
  "dark thoughts",
  "intrusive thoughts about hurting",
]

/**
 * Detect crisis language in user input.
 * Call this on EVERY user text input before processing.
 */
export function detectCrisis(text: string): CrisisDetectionResult {
  const lower = text.toLowerCase()

  // Check severe — immediate danger
  for (const keyword of SEVERE_KEYWORDS) {
    if (lower.includes(keyword)) {
      return {
        isCrisis: true,
        severity: "severe",
        category: "suicidal",
        message: "What you're feeling right now is real and it matters. You don't have to face this alone. Please reach out to someone who can help right now.",
        resources: CRISIS_RESOURCES.slice(0, 2), // 988 + Crisis Text Line
      }
    }
  }

  // Check harm to children/others
  for (const keyword of HARM_TO_OTHERS_KEYWORDS) {
    if (lower.includes(keyword)) {
      return {
        isCrisis: true,
        severity: "severe",
        category: "harm-to-children",
        message: "The fact that you're naming this means you're trying to keep everyone safe — including yourself. That takes courage. Please talk to someone who can help you right now. You are not a monster for having these thoughts. You're a person at their limit.",
        resources: [CRISIS_RESOURCES[2], CRISIS_RESOURCES[0], CRISIS_RESOURCES[3]], // Childhelp, 988, PSI
      }
    }
  }

  // Check moderate — significant distress
  for (const keyword of MODERATE_KEYWORDS) {
    if (lower.includes(keyword)) {
      return {
        isCrisis: true,
        severity: "moderate",
        category: "severe-distress",
        message: "You're in a really hard place right now. This level of pain deserves real support — more than an app can give. Please consider reaching out.",
        resources: CRISIS_RESOURCES.slice(0, 2),
      }
    }
  }

  return {
    isCrisis: false,
    severity: "none",
    resources: [],
  }
}
