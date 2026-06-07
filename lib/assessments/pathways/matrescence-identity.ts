// ============================================================
// Matrescence & Identity Transition — Pathway Assessment
//
// The developmental earthquake of becoming a mother. The grief
// of the old self, the cultural silence around ambivalence,
// the loss of autonomy, and the slow work of rebuilding identity
// within (not despite) motherhood.
// ============================================================

import type { AssessmentSection } from "../types"

export const MATRESCENCE_IDENTITY_SECTIONS: AssessmentSection[] = [
  {
    id: "identity-loss",
    title: "The Self You Were Before",
    description: "What happened to the person you used to be",
    questions: [
      {
        id: "mi-il-1",
        question: "When you think about who you were before children, what comes up?",
        options: [
          { id: "evolved", label: "I've evolved — different, but still connected to that person", dimensions: { "identity-grief": 1 } },
          { id: "miss-parts", label: "I miss specific things — my freedom, my hobbies, my spontaneity", dimensions: { "identity-grief": 2 } },
          { id: "stranger", label: "She feels like a stranger — I can barely remember what she wanted", dimensions: { "identity-grief": 3 } },
          { id: "grief", label: "Deep grief — like she died and I'm living someone else's life now", dimensions: { "identity-grief": 4 } },
        ],
      },
      {
        id: "mi-il-2",
        question: "Do you have interests, hobbies, or passions that are ONLY yours — nothing to do with your children or household?",
        options: [
          { id: "yes-active", label: "Yes — I actively maintain at least one thing that's just mine", dimensions: { "identity-grief": 1 } },
          { id: "used-to", label: "I used to — I still identify with them but don't do them anymore", dimensions: { "identity-grief": 2 } },
          { id: "cant-remember", label: "I can't remember what I used to enjoy — it's been that long", dimensions: { "identity-grief": 3 } },
          { id: "guilt", label: "Wanting things for myself feels selfish — I don't feel entitled to have interests", dimensions: { "identity-grief": 4 } },
        ],
      },
      {
        id: "mi-il-3",
        question: "If someone asked 'Tell me about yourself' and you couldn't mention your children, what would you say?",
        options: [
          { id: "plenty", label: "I have plenty to say — my work, my interests, my personality", dimensions: { "identity-grief": 1 } },
          { id: "struggle", label: "I'd struggle for a moment but find something", dimensions: { "identity-grief": 2 } },
          { id: "blank", label: "My mind goes blank — 'mom' IS my identity right now", dimensions: { "identity-grief": 3 } },
          { id: "panic", label: "That question makes me panicky — there's nothing left outside this role", dimensions: { "identity-grief": 4 } },
        ],
      },
    ],
  },
  {
    id: "ambivalence",
    title: "The Feelings Nobody Talks About",
    description: "The taboo emotions of motherhood — named without shame",
    questions: [
      {
        id: "mi-a-1",
        question: "Have you ever thought 'I love my children but I don't love this life'?",
        options: [
          { id: "no", label: "No — my life is hard but I'm glad I chose this", dimensions: { "maternal-ambivalence": 1 } },
          { id: "occasionally", label: "Occasionally — on the hardest days, briefly", dimensions: { "maternal-ambivalence": 2 } },
          { id: "regularly", label: "Regularly — I love them fiercely AND I sometimes wish I could walk away from it all", dimensions: { "maternal-ambivalence": 3 } },
          { id: "daily", label: "Daily — and the guilt of feeling this is its own kind of suffering", dimensions: { "maternal-ambivalence": 4 } },
        ],
      },
      {
        id: "mi-a-2",
        question: "Do you ever grieve the life you might have had if you hadn't had children (or had them later)?",
        options: [
          { id: "no-regret", label: "No — I don't entertain that counterfactual", dimensions: { "maternal-ambivalence": 1 } },
          { id: "sometimes", label: "Sometimes — a flicker of 'what if' that I quickly dismiss", dimensions: { "maternal-ambivalence": 2 } },
          { id: "yes", label: "Yes — I think about it more than I'd ever admit to anyone", dimensions: { "maternal-ambivalence": 3 } },
          { id: "heavy-grief", label: "Heavy, persistent grief for a parallel life — and crushing shame for feeling this", dimensions: { "maternal-ambivalence": 4 } },
        ],
      },
      {
        id: "mi-a-3",
        question: "How do you feel about the cultural narrative of motherhood — 'it's the hardest job but the most rewarding'?",
        options: [
          { id: "resonates", label: "It resonates — hard and rewarding coexist for me", dimensions: { "maternal-ambivalence": 1 } },
          { id: "partial", label: "Partially true — the 'rewarding' part requires more effort to feel than I expected", dimensions: { "maternal-ambivalence": 2 } },
          { id: "angry", label: "It makes me angry — nobody told me it would feel like THIS", dimensions: { "maternal-ambivalence": 3 } },
          { id: "betrayed", label: "I feel betrayed by the narrative — I was sold a version of motherhood that doesn't exist", dimensions: { "maternal-ambivalence": 4 } },
        ],
      },
    ],
  },
  {
    id: "autonomy",
    title: "Autonomy & Choice",
    description: "How much freedom you have over your own time, body, and decisions",
    questions: [
      {
        id: "mi-au-1",
        question: "How much control do you feel you have over your own time?",
        options: [
          { id: "some", label: "Some — I can carve out time when I'm intentional about it", dimensions: { "autonomy-loss": 1 } },
          { id: "little", label: "Very little — my schedule belongs to everyone else", dimensions: { "autonomy-loss": 2 } },
          { id: "none", label: "None — I can't go to the bathroom without someone needing me", dimensions: { "autonomy-loss": 3 } },
          { id: "forgotten", label: "I've forgotten what choosing how to spend time even feels like", dimensions: { "autonomy-loss": 4 } },
        ],
      },
      {
        id: "mi-au-2",
        question: "When was the last time you made a decision purely for yourself — not considering anyone else's needs?",
        options: [
          { id: "this-week", label: "This week — I make small choices for myself regularly", dimensions: { "autonomy-loss": 1 } },
          { id: "this-month", label: "This month — it's rare but it happens", dimensions: { "autonomy-loss": 2 } },
          { id: "cant-remember", label: "I genuinely can't remember", dimensions: { "autonomy-loss": 3 } },
          { id: "dont-know-how", label: "I don't even know what I'd choose — I've lost access to my own wants", dimensions: { "autonomy-loss": 4 } },
        ],
      },
      {
        id: "mi-au-3",
        question: "Does your body feel like it belongs to you?",
        description: "After pregnancy, breastfeeding, being touched all day, being needed physically — does your body feel like yours?",
        options: [
          { id: "yes", label: "Mostly yes — it's been a journey but I've reclaimed it", dimensions: { "autonomy-loss": 1 } },
          { id: "shared", label: "Partially — it's shared territory. Some parts are mine, some aren't yet.", dimensions: { "autonomy-loss": 2 } },
          { id: "theirs", label: "It feels like it belongs to my children — they've colonized it", dimensions: { "autonomy-loss": 3 } },
          { id: "alien", label: "It doesn't feel like it belongs to anyone — not them, not me. It's just... a vessel.", dimensions: { "autonomy-loss": 4 } },
        ],
      },
    ],
  },
]
