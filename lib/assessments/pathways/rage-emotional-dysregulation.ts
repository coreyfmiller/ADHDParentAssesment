// ============================================================
// Rage & Emotional Dysregulation — Pathway Assessment
//
// Maternal rage as its own phenomenon. The cycle of pressure →
// explosion → shame → overcompensation → pressure. Named with
// compassion, explored without judgment.
// ============================================================

import type { AssessmentSection } from "../types"

export const RAGE_EMOTIONAL_DYSREGULATION_SECTIONS: AssessmentSection[] = [
  {
    id: "rage-frequency",
    title: "The Rage Pattern",
    description: "How often and how intensely anger shows up in your mothering",
    questions: [
      {
        id: "re-rf-1",
        question: "How often do you experience rage — not frustration, not annoyance, but actual rage — as a mother?",
        description: "The kind where your body heats up, your vision narrows, and you don't feel in control of what comes out.",
        options: [
          { id: "rarely", label: "Rarely — maybe a few times a year in extreme circumstances", dimensions: { "rage-frequency": 1 } },
          { id: "monthly", label: "Monthly — it builds and erupts in a cycle", dimensions: { "rage-frequency": 2 } },
          { id: "weekly", label: "Weekly — I hit the boiling point most weeks", dimensions: { "rage-frequency": 3 } },
          { id: "daily", label: "Daily or near-daily — I live at the edge of eruption", dimensions: { "rage-frequency": 4 } },
        ],
      },
      {
        id: "re-rf-2",
        question: "What typically triggers the rage?",
        description: "Not the final straw — the pattern underneath.",
        options: [
          { id: "specific", label: "Specific situations — I can predict what will set me off", dimensions: { "rage-triggers": 2 } },
          { id: "cumulative", label: "Cumulative — nothing in particular, just the buildup of a full day", dimensions: { "rage-triggers": 3 } },
          { id: "sensory", label: "Sensory overload — noise + touch + demands happening simultaneously", dimensions: { "rage-triggers": 3 } },
          { id: "anything", label: "Almost anything can trigger it when I'm at capacity — it's not the trigger, it's the tank being empty", dimensions: { "rage-triggers": 4 } },
        ],
      },
      {
        id: "re-rf-3",
        question: "What does your rage look like when it happens?",
        options: [
          { id: "raised-voice", label: "Raised voice — loud but controlled. I yell but I don't say destructive things.", dimensions: { "rage-expression": 1 } },
          { id: "verbal", label: "Verbal explosion — I say things I don't mean. Words come out that I can't take back.", dimensions: { "rage-expression": 3 } },
          { id: "physical", label: "Physical — slamming doors, throwing things, aggressive movements (not at people)", dimensions: { "rage-expression": 3 } },
          { id: "implode", label: "Implosion — I go completely silent, leave the room, or shut down entirely", dimensions: { "rage-expression": 2 } },
        ],
      },
    ],
  },
  {
    id: "aftermath",
    title: "After the Rage",
    description: "What happens in your body, mind, and relationships after an episode",
    questions: [
      {
        id: "re-a-1",
        question: "Immediately after a rage episode, what do you feel?",
        options: [
          { id: "regret", label: "Regret — 'I wish I hadn't done that' — but I can move to repair", dimensions: { "post-rage": 1 } },
          { id: "shame-spiral", label: "Deep shame — 'I'm a terrible mother' — it consumes me for hours", dimensions: { "post-rage": 3 } },
          { id: "numb", label: "Numb — I feel nothing. Like I left my body during it and haven't come back", dimensions: { "post-rage": 3 } },
          { id: "relief-then-shame", label: "Brief relief (the pressure released) followed by crushing guilt", dimensions: { "post-rage": 2 } },
        ],
      },
      {
        id: "re-a-2",
        question: "What's your repair pattern after you've raged at or near your children?",
        options: [
          { id: "quick-repair", label: "I apologize within minutes and reconnect — imperfect but consistent", dimensions: { "post-rage": 1 } },
          { id: "overcompensate", label: "I overcompensate — extra treats, extra yes's, extra permissiveness out of guilt", dimensions: { "post-rage": 2 } },
          { id: "avoid", label: "I avoid addressing it — pretend it didn't happen and hope they forget", dimensions: { "post-rage": 3 } },
          { id: "delayed", label: "It takes me hours or days to repair because the shame is so paralyzing", dimensions: { "post-rage": 4 } },
        ],
      },
      {
        id: "re-a-3",
        question: "After a bad episode, what story do you tell yourself about who you are?",
        options: [
          { id: "human", label: "'I'm a human who lost it. I can do better next time.'", dimensions: { "post-rage": 1 } },
          { id: "failing", label: "'I'm failing at this. Other mothers don't do this.'", dimensions: { "post-rage": 2 } },
          { id: "dangerous", label: "'I'm becoming the parent I swore I'd never be.'", dimensions: { "post-rage": 3 } },
          { id: "monster", label: "'My children are afraid of me. I'm damaging them.'", dimensions: { "post-rage": 4 } },
        ],
      },
    ],
  },
  {
    id: "rage-context",
    title: "Understanding the Rage",
    description: "What's underneath it — because rage is always a message",
    questions: [
      {
        id: "re-rc-1",
        question: "If your rage could speak, what would it be saying?",
        description: "Underneath the explosion, there's usually a need that's been ignored for too long.",
        options: [
          { id: "overwhelmed", label: "'I have too much on my plate and nobody is helping.'", dimensions: { "rage-source": 2 } },
          { id: "unseen", label: "'Nobody sees how hard I'm working. Nobody cares that I'm drowning.'", dimensions: { "rage-source": 3 } },
          { id: "trapped", label: "'I'm trapped. I can't leave. I can't rest. There's no escape.'", dimensions: { "rage-source": 4 } },
          { id: "boundary", label: "'My boundaries have been crossed so many times that I have nothing left.'", dimensions: { "rage-source": 3 } },
        ],
      },
      {
        id: "re-rc-2",
        question: "Was anger modeled in your childhood? How was it handled in your family of origin?",
        options: [
          { id: "healthy", label: "It was expressed and resolved — I saw healthy anger", dimensions: { "rage-source": 1 } },
          { id: "suppressed", label: "It was forbidden — I learned anger isn't allowed", dimensions: { "rage-source": 3 } },
          { id: "explosive", label: "It was explosive and scary — I learned anger means danger", dimensions: { "rage-source": 3 } },
          { id: "unpredictable", label: "It was unpredictable — I never knew what would trigger an adult's rage", dimensions: { "rage-source": 4 } },
        ],
      },
      {
        id: "re-rc-3",
        question: "Do you believe your rage is proportional to what's happening, or does it surprise you with its intensity?",
        options: [
          { id: "proportional", label: "Usually proportional — I'm angry about genuinely hard situations", dimensions: { "rage-source": 1 } },
          { id: "sometimes-big", label: "Sometimes bigger than the situation warrants — I know it's about more than the spilled milk", dimensions: { "rage-source": 2 } },
          { id: "disproportionate", label: "Often disproportionate — the intensity scares me", dimensions: { "rage-source": 3 } },
          { id: "volcanic", label: "It builds invisibly and erupts on small triggers — like a volcano on a hair-trigger", dimensions: { "rage-source": 4 } },
        ],
      },
    ],
  },
]
