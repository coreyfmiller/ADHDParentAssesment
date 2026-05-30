// ============================================================
// Sensory & Overwhelm — Pathway Assessment
// Maps nervous system capacity, triggers, and regulation patterns
// ============================================================

import type { AssessmentSection } from "../types"

export const SENSORY_OVERWHELM_SECTIONS: AssessmentSection[] = [
  {
    id: "auditory-processing",
    title: "Sound & Noise",
    description: "How your brain handles auditory input",
    questions: [
      {
        id: "so-ap-1",
        question: "What's your relationship with background noise — TV, kids playing, multiple conversations?",
        description: "Not in a quiet moment. When life is happening around you.",
        options: [
          { id: "fine", label: "It's fine — I can tune things out when I need to", dimensions: { "auditory-processing": 1 } },
          { id: "distracting", label: "It's distracting but manageable — I just can't think clearly", dimensions: { "auditory-processing": 2 } },
          { id: "agitating", label: "It builds up until I'm agitated and snappy without knowing why", dimensions: { "auditory-processing": 3 } },
          { id: "unbearable", label: "It becomes physically unbearable — I need silence or I'll explode", dimensions: { "auditory-processing": 4 } },
        ],
      },
      {
        id: "so-ap-2",
        question: "How do you react to sudden loud noises — a door slamming, a child screaming, something dropping?",
        description: "The startle response. How intense is yours?",
        options: [
          { id: "normal", label: "Normal startle — I jump but recover immediately", dimensions: { "auditory-processing": 1 } },
          { id: "intense", label: "Intense startle — my heart races and it takes a moment to settle", dimensions: { "auditory-processing": 2 } },
          { id: "rage", label: "It triggers instant rage or panic — disproportionate to the sound", dimensions: { "auditory-processing": 3 } },
          { id: "shutdown", label: "I freeze or shut down — my whole system goes into alarm mode", dimensions: { "auditory-processing": 4 } },
        ],
      },
      {
        id: "so-ap-3",
        question: "Can you follow a conversation when there's background noise?",
        description: "In a restaurant, at a party, when the TV is on, when kids are playing nearby.",
        options: [
          { id: "easily", label: "Easily — I can filter out background and focus on the speaker", dimensions: { "auditory-processing": 1 } },
          { id: "effort", label: "With effort — I have to concentrate harder than seems normal", dimensions: { "auditory-processing": 2 } },
          { id: "struggle", label: "I struggle — I miss words, ask people to repeat, or zone out", dimensions: { "auditory-processing": 3 } },
          { id: "cant", label: "I can't — all sounds compete at equal volume and I can't separate them", dimensions: { "auditory-processing": 4 } },
        ],
      },
    ],
  },
  {
    id: "tactile-sensitivity",
    title: "Touch & Physical Sensation",
    description: "How your body responds to physical contact and textures",
    questions: [
      {
        id: "so-ts-1",
        question: "How do you feel about being physically touched by your children at the end of a long day?",
        description: "Climbing on you, hugging, holding hands, sitting in your lap.",
        options: [
          { id: "welcome", label: "I welcome it — physical affection recharges me", dimensions: { "tactile-sensitivity": 1 } },
          { id: "neutral", label: "It's fine — I don't mind but don't seek it out", dimensions: { "tactile-sensitivity": 2 } },
          { id: "uncomfortable", label: "I feel uncomfortable but push through because of guilt", dimensions: { "tactile-sensitivity": 3 } },
          { id: "cant-bear", label: "I physically cannot bear it — my skin crawls and I need to escape", dimensions: { "tactile-sensitivity": 4 } },
        ],
      },
      {
        id: "so-ts-2",
        question: "How sensitive are you to clothing textures, tags, seams, or tightness?",
        description: "Things that most people don't notice.",
        options: [
          { id: "not-bothered", label: "Not bothered — I wear whatever without thinking about it", dimensions: { "tactile-sensitivity": 1 } },
          { id: "preferences", label: "I have preferences but can tolerate most things", dimensions: { "tactile-sensitivity": 2 } },
          { id: "limited", label: "I'm limited in what I can wear — many textures are intolerable", dimensions: { "tactile-sensitivity": 3 } },
          { id: "extreme", label: "Extreme sensitivity — wrong fabric can ruin my entire day", dimensions: { "tactile-sensitivity": 4 } },
        ],
      },
      {
        id: "so-ts-3",
        question: "How often do you feel 'touched out' — where any physical contact feels like too much?",
        description: "Not just with kids. With anyone.",
        options: [
          { id: "rarely", label: "Rarely — I generally enjoy physical connection", dimensions: { "tactile-sensitivity": 1 } },
          { id: "sometimes", label: "Sometimes — usually after a long day of being needed", dimensions: { "tactile-sensitivity": 2 } },
          { id: "often", label: "Often — most evenings I can't stand being touched", dimensions: { "tactile-sensitivity": 3 } },
          { id: "constant", label: "Almost constantly — I feel touched out before the day even starts", dimensions: { "tactile-sensitivity": 4 } },
        ],
      },
    ],
  },
  {
    id: "visual-overwhelm",
    title: "Visual & Environmental",
    description: "How clutter, light, and visual chaos affect you",
    questions: [
      {
        id: "so-vo-1",
        question: "How does visual clutter affect your ability to think and function?",
        description: "Toys on the floor, dishes on the counter, papers everywhere.",
        options: [
          { id: "doesnt-bother", label: "Doesn't bother me — I can function fine in mess", dimensions: { "visual-overwhelm": 1 } },
          { id: "mild", label: "Mildly distracting — I prefer tidy but can cope", dimensions: { "visual-overwhelm": 2 } },
          { id: "overwhelms", label: "It overwhelms me — I can't think clearly when things are messy", dimensions: { "visual-overwhelm": 3 } },
          { id: "paralyzes", label: "It paralyzes me — the visual noise is so loud I can't start anything", dimensions: { "visual-overwhelm": 4 } },
        ],
      },
      {
        id: "so-vo-2",
        question: "How do you handle bright lights, fluorescent lighting, or screens?",
        description: "Grocery stores, offices, scrolling at night.",
        options: [
          { id: "fine", label: "Fine — lighting doesn't affect me much", dimensions: { "visual-overwhelm": 1 } },
          { id: "prefer-dim", label: "I prefer dimmer environments but can handle bright ones", dimensions: { "visual-overwhelm": 2 } },
          { id: "headaches", label: "Bright or fluorescent lights give me headaches or make me irritable", dimensions: { "visual-overwhelm": 3 } },
          { id: "avoids", label: "I actively avoid certain environments because the lighting is unbearable", dimensions: { "visual-overwhelm": 4 } },
        ],
      },
    ],
  },
  {
    id: "overwhelm-patterns",
    title: "Overwhelm Patterns",
    description: "How sensory overload builds and what happens when it peaks",
    questions: [
      {
        id: "so-op-1",
        question: "When multiple sensory inputs hit at once (noise + touch + questions + mess), what happens?",
        description: "The compound effect. Kids yelling while climbing on you while the TV is on while dinner is burning.",
        options: [
          { id: "manage", label: "I can manage it — I feel stimulated but stay regulated", dimensions: { "overwhelm-patterns": 1 } },
          { id: "tense", label: "I get tense and need to take a breath, but I hold it together", dimensions: { "overwhelm-patterns": 2 } },
          { id: "snap", label: "I snap or raise my voice, then feel terrible about it", dimensions: { "overwhelm-patterns": 3 } },
          { id: "shutdown", label: "I shut down completely — freeze, dissociate, or have to physically leave", dimensions: { "overwhelm-patterns": 4 } },
        ],
      },
      {
        id: "so-op-2",
        question: "How do you handle environments like grocery stores, birthday parties, or school events?",
        description: "Places with noise, crowds, fluorescent lights, and the pressure to perform as a 'together' parent.",
        options: [
          { id: "enjoy", label: "I mostly enjoy them — they're tiring but fun", dimensions: { "overwhelm-patterns": 1 } },
          { id: "tolerate", label: "I tolerate them but need recovery time after", dimensions: { "overwhelm-patterns": 2 } },
          { id: "dread", label: "I dread them — I often feel overwhelmed or dissociated during", dimensions: { "overwhelm-patterns": 3 } },
          { id: "avoid", label: "I avoid them whenever possible — the sensory cost is too high", dimensions: { "overwhelm-patterns": 4 } },
        ],
      },
      {
        id: "so-op-3",
        question: "After a high-sensory day, how long does it take you to recover?",
        description: "A day at a theme park, a family gathering, a school event, a busy shopping trip.",
        options: [
          { id: "evening", label: "By evening I'm fine — a quiet hour resets me", dimensions: { "overwhelm-patterns": 1 } },
          { id: "next-day", label: "I need the next day to be low-key to recover", dimensions: { "overwhelm-patterns": 2 } },
          { id: "days", label: "It takes 2-3 days to feel normal again", dimensions: { "overwhelm-patterns": 3 } },
          { id: "week", label: "A full week or more — I'm wrecked for days after sensory-heavy events", dimensions: { "overwhelm-patterns": 4 } },
        ],
      },
    ],
  },
  {
    id: "regulation-strategies",
    title: "Self-Regulation",
    description: "What you do (or can't do) to manage sensory overload",
    questions: [
      {
        id: "so-rs-1",
        question: "Do you have strategies that help you regulate when you're getting overwhelmed?",
        description: "Things you do intentionally to bring your nervous system back down.",
        options: [
          { id: "yes-effective", label: "Yes — I have tools that work and I use them regularly", dimensions: { "regulation-strategies": 1 } },
          { id: "yes-inconsistent", label: "I know what helps but I don't always do it in time", dimensions: { "regulation-strategies": 2 } },
          { id: "nothing-works", label: "I've tried things but nothing seems to work once I'm past the tipping point", dimensions: { "regulation-strategies": 3 } },
          { id: "no-strategies", label: "I don't have any strategies — I just endure until I break", dimensions: { "regulation-strategies": 4 } },
        ],
      },
      {
        id: "so-rs-2",
        question: "Can you identify when you're approaching sensory overload BEFORE you hit the wall?",
        description: "Early warning signs — jaw clenching, shoulders rising, irritability building.",
        options: [
          { id: "yes-early", label: "Yes — I notice early signs and can intervene", dimensions: { "regulation-strategies": 1 } },
          { id: "sometimes", label: "Sometimes — but often I only realize once I'm already overwhelmed", dimensions: { "regulation-strategies": 2 } },
          { id: "rarely", label: "Rarely — it seems to go from fine to explosion with no warning", dimensions: { "regulation-strategies": 3 } },
          { id: "never", label: "Never — I'm blindsided every time and don't understand why I snapped", dimensions: { "regulation-strategies": 4 } },
        ],
      },
    ],
  },
]

export const SENSORY_OVERWHELM_META = {
  id: "sensory-overwhelm",
  slug: "sensory-overwhelm",
  title: "Sensory & Overwhelm",
  subtitle: "Your nervous system's capacity and triggers",
  description: "This reflection maps how your nervous system processes sensory input — sound, touch, visual clutter, and compound overwhelm. Understanding your triggers is the first step to managing them instead of being ambushed by them.",
  estimatedMinutes: 8,
  questionCount: 13,
}
