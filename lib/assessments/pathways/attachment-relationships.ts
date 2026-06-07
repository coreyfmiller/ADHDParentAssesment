// ============================================================
// Attachment & Relationship Patterns — Pathway Assessment
//
// How she connects (or disconnects) under stress. Her attachment
// style with her partner, her conflict patterns, and whether
// she feels securely tethered to anyone.
// ============================================================

import type { AssessmentSection } from "../types"

export const ATTACHMENT_RELATIONSHIPS_SECTIONS: AssessmentSection[] = [
  {
    id: "partnership-dynamics",
    title: "Partnership Under Pressure",
    description: "How your relationship functions when you're both depleted",
    questions: [
      {
        id: "ar-pd-1",
        question: "When you're overwhelmed and your partner is nearby, what's your instinct?",
        description: "Not what you think you should do — what you actually DO.",
        options: [
          { id: "reach", label: "I reach toward them — I want comfort, connection, reassurance", dimensions: { "attachment-style": 1 } },
          { id: "tell", label: "I tell them what I need practically — take the kids, handle dinner", dimensions: { "attachment-style": 2 } },
          { id: "withdraw", label: "I pull away — I don't want to need them or be disappointed", dimensions: { "attachment-style": 3 } },
          { id: "perform", label: "I pretend I'm fine so they don't have to worry about me", dimensions: { "attachment-style": 4 } },
        ],
      },
      {
        id: "ar-pd-2",
        question: "When there's a conflict between you and your partner, what pattern typically plays out?",
        options: [
          { id: "resolve", label: "We talk it through within a day — messy but functional", dimensions: { "conflict-pattern": 1 } },
          { id: "pursue", label: "I pursue and they withdraw — I keep bringing it up, they shut down", dimensions: { "conflict-pattern": 3 } },
          { id: "withdraw", label: "I withdraw and they pursue — I go silent, they push for resolution", dimensions: { "conflict-pattern": 3 } },
          { id: "both-withdraw", label: "We both go silent — days pass without addressing it", dimensions: { "conflict-pattern": 4 } },
        ],
      },
      {
        id: "ar-pd-3",
        question: "Do you feel like your partner truly sees what you're carrying?",
        options: [
          { id: "yes", label: "Yes — they may not always help, but they acknowledge it", dimensions: { "relational-safety": 1 } },
          { id: "sometimes", label: "Sometimes — in specific moments, not consistently", dimensions: { "relational-safety": 2 } },
          { id: "surface", label: "They see the surface tasks but not the emotional/mental weight", dimensions: { "relational-safety": 3 } },
          { id: "no", label: "No — I feel fundamentally unseen in this relationship", dimensions: { "relational-safety": 4 } },
        ],
      },
      {
        id: "ar-pd-4",
        question: "When you think about your relationship, which feeling dominates right now?",
        options: [
          { id: "connected", label: "Imperfect but connected — we're a team, even when it's hard", dimensions: { "relational-safety": 1 } },
          { id: "lonely", label: "Lonely inside it — physically present but emotionally distant", dimensions: { "relational-safety": 3 } },
          { id: "resentful", label: "Resentful — I've been carrying more for too long", dimensions: { "relational-safety": 3 } },
          { id: "roommates", label: "We're roommates managing logistics, not partners", dimensions: { "relational-safety": 4 } },
        ],
      },
    ],
  },
  {
    id: "vulnerability-trust",
    title: "Vulnerability & Trust",
    description: "Whether you let anyone see the real version of how you're doing",
    questions: [
      {
        id: "ar-vt-1",
        question: "Is there anyone in your life who knows how you're really doing?",
        description: "Not the 'I'm fine' version. The actual truth.",
        options: [
          { id: "yes-several", label: "Yes — a few people know the real picture", dimensions: { "vulnerability": 1 } },
          { id: "one-person", label: "One person — my partner or one close friend", dimensions: { "vulnerability": 2 } },
          { id: "partial", label: "People know bits, but nobody has the full picture", dimensions: { "vulnerability": 3 } },
          { id: "no-one", label: "Nobody. I carry this completely alone.", dimensions: { "vulnerability": 4 } },
        ],
      },
      {
        id: "ar-vt-2",
        question: "What happens when someone asks 'how are you?' and you're not okay?",
        options: [
          { id: "honest", label: "I can be honest — 'Honestly? Today is hard.'", dimensions: { "vulnerability": 1 } },
          { id: "deflect-humor", label: "I deflect with humor — 'Oh, you know, surviving!'", dimensions: { "vulnerability": 2 } },
          { id: "fine", label: "I say 'fine' — the truth feels too heavy to hand to someone", dimensions: { "vulnerability": 3 } },
          { id: "perform", label: "I perform okayness so well that people compliment how together I am", dimensions: { "vulnerability": 4 } },
        ],
      },
      {
        id: "ar-vt-3",
        question: "How do you feel about needing people?",
        options: [
          { id: "comfortable", label: "It's normal — everyone needs support", dimensions: { "vulnerability": 1 } },
          { id: "working-on-it", label: "I'm learning it's okay, but it doesn't come naturally", dimensions: { "vulnerability": 2 } },
          { id: "burden", label: "Needing people makes me feel like a burden", dimensions: { "vulnerability": 3 } },
          { id: "unsafe", label: "I learned early that needing people isn't safe", dimensions: { "vulnerability": 4 } },
        ],
      },
    ],
  },
  {
    id: "attachment-with-children",
    title: "Connection With Your Children",
    description: "How secure the bond feels from your side — not theirs",
    questions: [
      {
        id: "ar-ac-1",
        question: "After a hard day of parenting, what's the dominant feeling when you look at your children?",
        options: [
          { id: "love", label: "Love — tired love, but love. I know they're okay.", dimensions: { "parental-attachment": 1 } },
          { id: "guilt", label: "Guilt — I wasn't enough today and they deserved better", dimensions: { "parental-attachment": 2 } },
          { id: "disconnect", label: "Disconnection — I feel far from them even when I'm right here", dimensions: { "parental-attachment": 3 } },
          { id: "ambivalence", label: "A confusing mix of love and resentment that I feel ashamed of", dimensions: { "parental-attachment": 4 } },
        ],
      },
      {
        id: "ar-ac-2",
        question: "How often do you feel genuinely present with your children (not just physically there)?",
        options: [
          { id: "often", label: "Most days I have moments of real connection", dimensions: { "parental-attachment": 1 } },
          { id: "sometimes", label: "Some days — but not as often as I'd like", dimensions: { "parental-attachment": 2 } },
          { id: "rarely", label: "Rarely — I'm usually distracted, depleted, or checked out", dimensions: { "parental-attachment": 3 } },
          { id: "cant-remember", label: "I can't remember the last time I felt truly present with them", dimensions: { "parental-attachment": 4 } },
        ],
      },
      {
        id: "ar-ac-3",
        question: "Do you ever worry that your overwhelm is affecting your children's attachment to you?",
        options: [
          { id: "no", label: "No — I trust they feel loved even on my hard days", dimensions: { "parental-attachment": 1 } },
          { id: "sometimes", label: "Sometimes — but I repair and I think that's enough", dimensions: { "parental-attachment": 2 } },
          { id: "often", label: "Often — the guilt about this keeps me up at night", dimensions: { "parental-attachment": 3 } },
          { id: "constantly", label: "Constantly — I'm terrified I'm damaging them", dimensions: { "parental-attachment": 4 } },
        ],
      },
    ],
  },
]
