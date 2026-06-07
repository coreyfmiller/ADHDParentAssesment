// ============================================================
// Self-Worth & Inner Critic — Pathway Assessment
//
// The shame architecture. How she talks to herself, processes
// failure, relates to perfectionism, and whether self-compassion
// is accessible or feels like a foreign language.
// ============================================================

import type { AssessmentSection } from "../types"

export const SELF_WORTH_INNER_CRITIC_SECTIONS: AssessmentSection[] = [
  {
    id: "inner-voice",
    title: "Your Inner Voice",
    description: "The running commentary in your head about who you are",
    questions: [
      {
        id: "sw-iv-1",
        question: "When you make a mistake (forget something, snap at your child, miss a deadline), what does the voice in your head say?",
        options: [
          { id: "gentle", label: "'That was a mistake. I can fix it.' — matter-of-fact, not cruel", dimensions: { "inner-critic": 1 } },
          { id: "harsh-brief", label: "'Ugh, again?' — sharp but it passes quickly", dimensions: { "inner-critic": 2 } },
          { id: "spiral", label: "'You always do this. What's wrong with you?' — a full narrative builds", dimensions: { "inner-critic": 3 } },
          { id: "devastating", label: "'You're a terrible mother/person.' — it destroys me for hours or days", dimensions: { "inner-critic": 4 } },
        ],
      },
      {
        id: "sw-iv-2",
        question: "Would you say to a friend what you say to yourself?",
        options: [
          { id: "yes", label: "Mostly yes — I'm about as kind to myself as I am to others", dimensions: { "inner-critic": 1 } },
          { id: "probably-not", label: "Probably not — I'm harder on myself but I notice it", dimensions: { "inner-critic": 2 } },
          { id: "never", label: "Never — if I talked to a friend this way, they'd leave", dimensions: { "inner-critic": 3 } },
          { id: "abusive", label: "What I say to myself would be considered emotionally abusive if said to anyone else", dimensions: { "inner-critic": 4 } },
        ],
      },
      {
        id: "sw-iv-3",
        question: "How does your inner voice respond when you try to rest or take time for yourself?",
        options: [
          { id: "permission", label: "'You need this.' — it grants permission", dimensions: { "inner-critic": 1 } },
          { id: "mild-guilt", label: "'You should probably be doing something else' — mild guilt", dimensions: { "inner-critic": 2 } },
          { id: "lazy", label: "'You're being lazy. Everyone else manages without this.' — accusation", dimensions: { "inner-critic": 3 } },
          { id: "undeserving", label: "'You haven't earned rest. You don't deserve this.' — punishment", dimensions: { "inner-critic": 4 } },
        ],
      },
    ],
  },
  {
    id: "perfectionism",
    title: "Perfectionism & Standards",
    description: "The gap between your standards and your capacity",
    questions: [
      {
        id: "sw-p-1",
        question: "When something in your life is 'good enough' but not perfect, how do you feel?",
        options: [
          { id: "fine", label: "Fine — done is better than perfect. I genuinely believe that.", dimensions: { "perfectionism": 1 } },
          { id: "mild-itch", label: "A mild itch — I notice it's imperfect but can let it go", dimensions: { "perfectionism": 2 } },
          { id: "failure", label: "Like I've failed — 'good enough' feels like a euphemism for 'not enough'", dimensions: { "perfectionism": 3 } },
          { id: "cant-stop", label: "I can't leave it alone — I redo, overwork, or don't start because I know I can't do it perfectly", dimensions: { "perfectionism": 4 } },
        ],
      },
      {
        id: "sw-p-2",
        question: "Where do your standards for yourself come from?",
        options: [
          { id: "internal", label: "Me — they're standards I've chosen that feel reasonable", dimensions: { "perfectionism": 1 } },
          { id: "comparison", label: "Comparison — I look at other mothers and try to match what they seem to manage", dimensions: { "perfectionism": 3 } },
          { id: "childhood", label: "My childhood — I was raised with very high expectations and internalized them", dimensions: { "perfectionism": 3 } },
          { id: "fear", label: "Fear — if I'm not perfect, something bad will happen (judgment, failure, loss of love)", dimensions: { "perfectionism": 4 } },
        ],
      },
      {
        id: "sw-p-3",
        question: "What happens when you 'fail' publicly (your child misbehaves in front of others, your house is messy when someone visits, you're late to something)?",
        options: [
          { id: "shrug", label: "Mild embarrassment that passes quickly — it's fine, everyone has those days", dimensions: { "perfectionism": 1 } },
          { id: "replay", label: "I replay it in my head for the rest of the day", dimensions: { "perfectionism": 2 } },
          { id: "ruminate", label: "I ruminate for days — imagining what people thought of me", dimensions: { "perfectionism": 3 } },
          { id: "avoid", label: "I avoid situations where failure is visible — I'd rather not try than be seen struggling", dimensions: { "perfectionism": 4 } },
        ],
      },
    ],
  },
  {
    id: "self-compassion",
    title: "Self-Compassion Access",
    description: "Whether kindness toward yourself feels possible or foreign",
    questions: [
      {
        id: "sw-sc-1",
        question: "When you hear 'be kind to yourself,' what's your honest reaction?",
        options: [
          { id: "resonates", label: "It resonates — I'm working on it and it's getting easier", dimensions: { "self-compassion": 1 } },
          { id: "try", label: "I try, but it feels forced — like I'm lying to myself", dimensions: { "self-compassion": 2 } },
          { id: "eye-roll", label: "Eye roll — that advice feels empty when you're the reason things are hard", dimensions: { "self-compassion": 3 } },
          { id: "cant", label: "I literally don't know how — kindness toward myself feels impossible or undeserved", dimensions: { "self-compassion": 4 } },
        ],
      },
      {
        id: "sw-sc-2",
        question: "Can you name something you genuinely like about yourself as a mother?",
        options: [
          { id: "yes-easily", label: "Yes — several things come to mind", dimensions: { "self-compassion": 1 } },
          { id: "one-thing", label: "Maybe one thing, but it feels small", dimensions: { "self-compassion": 2 } },
          { id: "struggle", label: "I have to really search — and what I find feels like 'not good enough'", dimensions: { "self-compassion": 3 } },
          { id: "nothing", label: "Honestly, nothing comes to mind that doesn't immediately get contradicted by my inner voice", dimensions: { "self-compassion": 4 } },
        ],
      },
      {
        id: "sw-sc-3",
        question: "When other mothers struggle, what do you feel toward them vs. when YOU struggle?",
        options: [
          { id: "same-compassion", label: "Same compassion in both directions — we're all doing our best", dimensions: { "self-compassion": 1 } },
          { id: "more-for-them", label: "More compassion for them than myself — I know it's a double standard", dimensions: { "self-compassion": 2 } },
          { id: "big-gap", label: "Huge gap — I'd never judge them the way I judge myself", dimensions: { "self-compassion": 3 } },
          { id: "broken", label: "I assume their struggle is valid but mine means I'm fundamentally broken", dimensions: { "self-compassion": 4 } },
        ],
      },
    ],
  },
  {
    id: "comparison-shame",
    title: "Comparison & Shame",
    description: "How the world outside your head affects how you feel inside it",
    questions: [
      {
        id: "sw-cs-1",
        question: "How does seeing other mothers (social media, school drop-off, family events) affect you?",
        options: [
          { id: "neutral", label: "Mostly neutral — we're all on different journeys", dimensions: { "comparison": 1 } },
          { id: "mild-envy", label: "Occasional envy that I can redirect — 'their life isn't my life'", dimensions: { "comparison": 2 } },
          { id: "inadequate", label: "Regular feelings of inadequacy — they seem to manage what I can't", dimensions: { "comparison": 3 } },
          { id: "broken", label: "Deep conviction that I'm fundamentally different from them — broken in a way they're not", dimensions: { "comparison": 4 } },
        ],
      },
      {
        id: "sw-cs-2",
        question: "Do you carry shame about anything related to motherhood that you've never told anyone?",
        options: [
          { id: "no", label: "No — I'm pretty open about my struggles", dimensions: { "comparison": 1 } },
          { id: "small", label: "Small things — moments I'm not proud of but they don't haunt me", dimensions: { "comparison": 2 } },
          { id: "yes", label: "Yes — there are things I've done or felt that I believe would make people judge me", dimensions: { "comparison": 3 } },
          { id: "heavy", label: "Heavy, persistent shame that I carry every day and tell no one", dimensions: { "comparison": 4 } },
        ],
      },
    ],
  },
]
