// ============================================================
// The Overwhelm Snapshot — Universal Entry Assessment
// 5 dimensions, 3 questions each = 15 questions, ~5 minutes
// ============================================================

import type { AssessmentSection } from "./types"

export const SNAPSHOT_SECTIONS: AssessmentSection[] = [
  {
    id: "cognitive-load",
    title: "Cognitive Load",
    description: "How your brain handles the weight of everything you're tracking",
    questions: [
      {
        id: "cl-1",
        question: "How often does your brain feel like it has too many tabs open?",
        description: "That feeling of mental noise — thoughts competing, lists running, nothing quite landing.",
        options: [
          { id: "rarely", label: "Rarely — I can usually focus on what's in front of me", dimensions: { "cognitive-load": 1 } },
          { id: "sometimes", label: "A few times a week — usually when things pile up", dimensions: { "cognitive-load": 2 } },
          { id: "most-days", label: "Most days — my brain is loud and scattered", dimensions: { "cognitive-load": 3 } },
          { id: "constant", label: "Constantly — I can't remember what I was doing 30 seconds ago", dimensions: { "cognitive-load": 4 } },
        ],
      },
      {
        id: "cl-2",
        question: "When you try to plan your day, what happens?",
        description: "Not what you think should happen. What actually happens.",
        options: [
          { id: "follows-plan", label: "I make a plan and mostly follow it", dimensions: { "cognitive-load": 1 } },
          { id: "starts-well", label: "I start with a plan but get derailed by mid-morning", dimensions: { "cognitive-load": 2 } },
          { id: "cant-plan", label: "I can't even figure out where to start — the list overwhelms me", dimensions: { "cognitive-load": 3 } },
          { id: "no-point", label: "I've stopped planning because it never works anyway", dimensions: { "cognitive-load": 4 } },
        ],
      },
      {
        id: "cl-3",
        question: "How often do you walk into a room and forget why you're there?",
        description: "Or open your phone and forget what you needed, or start a sentence and lose the thought.",
        options: [
          { id: "occasionally", label: "Occasionally — it's annoying but rare", dimensions: { "cognitive-load": 1 } },
          { id: "few-times-day", label: "A few times a day — I've learned to retrace my steps", dimensions: { "cognitive-load": 2 } },
          { id: "constantly", label: "Constantly — it disrupts my ability to get things done", dimensions: { "cognitive-load": 3 } },
          { id: "frightening", label: "So often it frightens me — I worry something is wrong with me", dimensions: { "cognitive-load": 4 } },
        ],
      },
    ],
  },
  {
    id: "emotional-bandwidth",
    title: "Emotional Bandwidth",
    description: "How much capacity you have for feelings — yours and everyone else's",
    questions: [
      {
        id: "eb-1",
        question: "How quickly do you go from calm to overwhelmed or reactive?",
        description: "Think about your fuse length on an average day, not your best day.",
        options: [
          { id: "slow-build", label: "It takes a lot to push me over — I have a long fuse", dimensions: { "emotional-bandwidth": 1 } },
          { id: "moderate", label: "I can handle a fair amount, but I have a tipping point", dimensions: { "emotional-bandwidth": 2 } },
          { id: "quick", label: "I go from fine to snapping faster than I'd like", dimensions: { "emotional-bandwidth": 3 } },
          { id: "instant", label: "I'm already at the edge most of the time — anything can tip me", dimensions: { "emotional-bandwidth": 4 } },
        ],
      },
      {
        id: "eb-2",
        question: "After an emotional moment (yours or your child's), how long does it take you to recover?",
        description: "A meltdown, an argument, a moment of guilt or rage.",
        options: [
          { id: "minutes", label: "Minutes — I can shake it off and move on", dimensions: { "emotional-bandwidth": 1 } },
          { id: "hour", label: "An hour or so — it lingers but I can function", dimensions: { "emotional-bandwidth": 2 } },
          { id: "hours", label: "Hours — it colors the rest of my day", dimensions: { "emotional-bandwidth": 3 } },
          { id: "days", label: "Days — I replay it, spiral, and can't let go", dimensions: { "emotional-bandwidth": 4 } },
        ],
      },
      {
        id: "eb-3",
        question: "How do you feel about being the emotional regulator for your family?",
        description: "The one everyone comes to, the one who holds it together, the one who manages everyone's feelings.",
        options: [
          { id: "manageable", label: "It's manageable — I have capacity for this role", dimensions: { "emotional-bandwidth": 1 } },
          { id: "heavy", label: "It's heavy but I cope — I just wish someone held space for me too", dimensions: { "emotional-bandwidth": 2 } },
          { id: "drowning", label: "I'm drowning in everyone else's emotions — there's nothing left for mine", dimensions: { "emotional-bandwidth": 3 } },
          { id: "numb", label: "I've gone numb — I can't feel my own emotions anymore, just theirs", dimensions: { "emotional-bandwidth": 4 } },
        ],
      },
    ],
  },
  {
    id: "physical-depletion",
    title: "Physical Depletion",
    description: "What your body is telling you about how you're running",
    questions: [
      {
        id: "pd-1",
        question: "How do you feel when you wake up in the morning?",
        description: "Before the kids, before the demands. Just you and the alarm.",
        options: [
          { id: "rested", label: "Mostly rested — I have energy to start the day", dimensions: { "physical-depletion": 1 } },
          { id: "tired", label: "Tired but functional — coffee helps", dimensions: { "physical-depletion": 2 } },
          { id: "exhausted", label: "Exhausted — like I didn't sleep at all, even when I did", dimensions: { "physical-depletion": 3 } },
          { id: "dread", label: "Dread — the tiredness is so deep I don't want to face the day", dimensions: { "physical-depletion": 4 } },
        ],
      },
      {
        id: "pd-2",
        question: "How is your body holding up physically?",
        description: "Tension, pain, illness frequency, appetite, energy crashes.",
        options: [
          { id: "good", label: "Pretty good — I feel physically well most of the time", dimensions: { "physical-depletion": 1 } },
          { id: "tension", label: "Some tension and tiredness, but nothing alarming", dimensions: { "physical-depletion": 2 } },
          { id: "struggling", label: "I'm getting sick more often, carrying tension everywhere, energy crashes daily", dimensions: { "physical-depletion": 3 } },
          { id: "breaking", label: "My body is breaking down — chronic pain, illness, or exhaustion that won't lift", dimensions: { "physical-depletion": 4 } },
        ],
      },
      {
        id: "pd-3",
        question: "When was the last time you did something purely for your own physical wellbeing?",
        description: "Exercise, a bath, a walk alone, cooking yourself a real meal, sleeping in.",
        options: [
          { id: "this-week", label: "This week — I make time for myself regularly", dimensions: { "physical-depletion": 1 } },
          { id: "few-weeks", label: "A few weeks ago — it happens but not consistently", dimensions: { "physical-depletion": 2 } },
          { id: "cant-remember", label: "I genuinely can't remember — months maybe?", dimensions: { "physical-depletion": 3 } },
          { id: "never", label: "I don't even know what that would look like anymore", dimensions: { "physical-depletion": 4 } },
        ],
      },
    ],
  },
  {
    id: "system-friction",
    title: "System Friction",
    description: "Whether your daily life has structure that supports you — or fights you",
    questions: [
      {
        id: "sf-1",
        question: "How would you describe the daily routines in your household?",
        description: "Morning, meals, bedtime, chores — the recurring rhythms of family life.",
        options: [
          { id: "smooth", label: "We have routines that mostly work — they carry us through", dimensions: { "system-friction": 1 } },
          { id: "inconsistent", label: "We have routines but they fall apart regularly", dimensions: { "system-friction": 2 } },
          { id: "reactive", label: "We're mostly reactive — each day is improvised", dimensions: { "system-friction": 3 } },
          { id: "chaos", label: "There's no structure — everything feels chaotic and unpredictable", dimensions: { "system-friction": 4 } },
        ],
      },
      {
        id: "sf-2",
        question: "How much support do you have in running your household and family?",
        description: "Partner, family, friends, paid help, community — anyone who shares the load.",
        options: [
          { id: "well-supported", label: "I'm well-supported — I have people I can rely on", dimensions: { "system-friction": 1 } },
          { id: "some-help", label: "I have some help, but I'm still the primary manager of everything", dimensions: { "system-friction": 2 } },
          { id: "minimal", label: "Minimal support — I'm doing most of this alone", dimensions: { "system-friction": 3 } },
          { id: "none", label: "I have no meaningful support — it's all on me", dimensions: { "system-friction": 4 } },
        ],
      },
      {
        id: "sf-3",
        question: "When systems or routines break down (illness, holidays, schedule changes), how quickly can you recover?",
        description: "The bounce-back factor.",
        options: [
          { id: "quickly", label: "Within a day or two — we snap back to our rhythm", dimensions: { "system-friction": 1 } },
          { id: "week", label: "About a week — it takes effort but we get there", dimensions: { "system-friction": 2 } },
          { id: "weeks", label: "Weeks — once things fall apart, it's incredibly hard to rebuild", dimensions: { "system-friction": 3 } },
          { id: "never", label: "We never fully recover — each disruption leaves us worse off", dimensions: { "system-friction": 4 } },
        ],
      },
    ],
  },
  {
    id: "identity-erosion",
    title: "Identity & Self",
    description: "Whether you still feel like a person underneath the role of 'mom'",
    questions: [
      {
        id: "ie-1",
        question: "Do you still feel like yourself — the person you were before kids?",
        description: "Not that you should be the same person. But do you recognize yourself?",
        options: [
          { id: "yes", label: "Yes — I've evolved but I still feel like me", dimensions: { "identity-erosion": 1 } },
          { id: "sometimes", label: "Sometimes — there are glimpses, but mostly I feel like 'just mom'", dimensions: { "identity-erosion": 2 } },
          { id: "lost", label: "I've lost her — I don't know who I am outside of this role", dimensions: { "identity-erosion": 3 } },
          { id: "grieving", label: "I'm grieving the person I used to be — and I don't know how to get her back", dimensions: { "identity-erosion": 4 } },
        ],
      },
      {
        id: "ie-2",
        question: "How often do you feel resentment — toward your partner, your kids, or your life?",
        description: "Resentment isn't a character flaw. It's a signal that something is unsustainable.",
        options: [
          { id: "rarely", label: "Rarely — I feel generally content with how things are", dimensions: { "identity-erosion": 1 } },
          { id: "sometimes", label: "Sometimes — usually when I'm overtired or under-supported", dimensions: { "identity-erosion": 2 } },
          { id: "often", label: "Often — there's a simmering anger I can't quite name", dimensions: { "identity-erosion": 3 } },
          { id: "constant", label: "Constantly — I feel trapped and angry and guilty about feeling angry", dimensions: { "identity-erosion": 4 } },
        ],
      },
      {
        id: "ie-3",
        question: "If someone asked 'What do you need?' right now — could you answer?",
        description: "Not what your kids need. Not what your partner needs. What YOU need.",
        options: [
          { id: "yes-clearly", label: "Yes — I know what I need and I'm mostly getting it", dimensions: { "identity-erosion": 1 } },
          { id: "know-not-getting", label: "I know what I need but I'm not getting it", dimensions: { "identity-erosion": 2 } },
          { id: "vague", label: "I have a vague sense but I can't articulate it clearly", dimensions: { "identity-erosion": 3 } },
          { id: "no-idea", label: "I have no idea — I've been meeting everyone else's needs so long I've lost track of mine", dimensions: { "identity-erosion": 4 } },
        ],
      },
    ],
  },
]

export const SNAPSHOT_META = {
  id: "overwhelm-snapshot",
  slug: "snapshot",
  title: "Check In With Yourself",
  subtitle: "Where is your energy actually going?",
  description: "A 5-minute reflection that maps your current state across five dimensions. Not a diagnosis — a starting point for understanding what's stacking up.",
  estimatedMinutes: 5,
  questionCount: 15,
}
