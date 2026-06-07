// ============================================================
// Social Connection & Isolation — Pathway Assessment
//
// The epidemic of maternal loneliness. Whether she has anyone
// who sees her, whether friendships survive motherhood, and
// the specific isolation of feeling alone in a room full of
// people who need you.
// ============================================================

import type { AssessmentSection } from "../types"

export const SOCIAL_CONNECTION_ISOLATION_SECTIONS: AssessmentSection[] = [
  {
    id: "friendship-state",
    title: "Your Friendships Now",
    description: "What happened to your connections when motherhood arrived",
    questions: [
      {
        id: "sc-fs-1",
        question: "How many friends do you have regular, meaningful contact with (not just liking posts)?",
        options: [
          { id: "several", label: "3 or more — I have a circle I genuinely connect with", dimensions: { "social-connection": 1 } },
          { id: "one-two", label: "1-2 close friends — small but real", dimensions: { "social-connection": 2 } },
          { id: "acquaintances", label: "I have acquaintances but no one I'd call at 2am", dimensions: { "social-connection": 3 } },
          { id: "none", label: "Nobody. My friendships have all faded or died.", dimensions: { "social-connection": 4 } },
        ],
      },
      {
        id: "sc-fs-2",
        question: "When you talk to other mothers, do conversations go beyond logistics and kids?",
        options: [
          { id: "yes", label: "Yes — I have friends I talk to about ME, not just mothering", dimensions: { "social-connection": 1 } },
          { id: "sometimes", label: "Sometimes — but it takes effort to get past the surface", dimensions: { "social-connection": 2 } },
          { id: "rarely", label: "Rarely — our conversations are entirely about children and schedules", dimensions: { "social-connection": 3 } },
          { id: "no-conversations", label: "I barely have conversations with other adults at all", dimensions: { "social-connection": 4 } },
        ],
      },
      {
        id: "sc-fs-3",
        question: "What happened to your friendships when you became a mother?",
        options: [
          { id: "adapted", label: "They adapted — different shape, but still alive", dimensions: { "social-connection": 1 } },
          { id: "faded", label: "Most faded — not dramatically, just slowly disappeared", dimensions: { "social-connection": 3 } },
          { id: "i-withdrew", label: "I withdrew — I stopped reaching out because I had nothing to give", dimensions: { "social-connection": 3 } },
          { id: "ghosted", label: "I ghosted people I love and now it's been too long to reconnect", dimensions: { "social-connection": 4 } },
        ],
      },
    ],
  },
  {
    id: "loneliness",
    title: "Loneliness & Isolation",
    description: "The specific aloneness of being needed by everyone and known by no one",
    questions: [
      {
        id: "sc-l-1",
        question: "How often do you feel lonely — not alone (you're never alone), but LONELY?",
        options: [
          { id: "rarely", label: "Rarely — I feel connected and supported", dimensions: { "loneliness": 1 } },
          { id: "sometimes", label: "Sometimes — usually in the evenings or on weekends", dimensions: { "loneliness": 2 } },
          { id: "often", label: "Often — I'm surrounded by people who need me but I feel completely alone", dimensions: { "loneliness": 3 } },
          { id: "constant", label: "Constantly — the loneliness is so deep I've stopped noticing it as unusual", dimensions: { "loneliness": 4 } },
        ],
      },
      {
        id: "sc-l-2",
        question: "Do you feel like you belong anywhere — a group, a community, a circle that gets it?",
        options: [
          { id: "yes", label: "Yes — I have my people. They're not perfect but they're mine.", dimensions: { "loneliness": 1 } },
          { id: "periphery", label: "I'm on the periphery of groups but don't feel truly part of them", dimensions: { "loneliness": 2 } },
          { id: "different", label: "I feel fundamentally different from other mothers — like they're managing something I can't", dimensions: { "loneliness": 3 } },
          { id: "nowhere", label: "Nowhere. I don't belong anywhere.", dimensions: { "loneliness": 4 } },
        ],
      },
      {
        id: "sc-l-3",
        question: "When you imagine reaching out to someone right now — texting a friend, calling your mom — what stops you?",
        options: [
          { id: "nothing", label: "Nothing — I'd just do it", dimensions: { "loneliness": 1 } },
          { id: "energy", label: "Energy — I want to but can't summon the bandwidth for a conversation", dimensions: { "loneliness": 2 } },
          { id: "guilt-burden", label: "I don't want to be a burden or bring the mood down", dimensions: { "loneliness": 3 } },
          { id: "too-long", label: "It's been so long that reaching out now feels impossible — the gap is too wide", dimensions: { "loneliness": 4 } },
        ],
      },
    ],
  },
  {
    id: "masking-social",
    title: "Masking & Performance",
    description: "How much energy you spend appearing okay in social settings",
    questions: [
      {
        id: "sc-ms-1",
        question: "How much energy do social interactions cost you compared to what they give you?",
        options: [
          { id: "gives-more", label: "They give me energy — I feel better after connecting", dimensions: { "social-masking": 1 } },
          { id: "neutral", label: "About even — nice in the moment but I need recovery after", dimensions: { "social-masking": 2 } },
          { id: "costs-more", label: "They cost more than they give — performing 'fine' is exhausting", dimensions: { "social-masking": 3 } },
          { id: "dreaded", label: "I dread them — the effort of appearing okay takes everything I have", dimensions: { "social-masking": 4 } },
        ],
      },
      {
        id: "sc-ms-2",
        question: "At social events (school functions, family gatherings, playdates), how do you feel?",
        options: [
          { id: "comfortable", label: "Mostly comfortable — I can be myself", dimensions: { "social-masking": 1 } },
          { id: "performing", label: "Performing — I'm charming and engaged on the outside, counting minutes on the inside", dimensions: { "social-masking": 3 } },
          { id: "invisible", label: "Invisible — I fade into the background and hope nobody notices me", dimensions: { "social-masking": 2 } },
          { id: "wrong", label: "Wrong — like I don't speak the same language as other mothers there", dimensions: { "social-masking": 4 } },
        ],
      },
      {
        id: "sc-ms-3",
        question: "If the people in your social circle saw how you really are at home — unmasked, on a hard day — what would happen?",
        options: [
          { id: "accepted", label: "They'd understand — I'm already pretty open with them", dimensions: { "social-masking": 1 } },
          { id: "surprised", label: "They'd be surprised — I come across as much more put together than I am", dimensions: { "social-masking": 2 } },
          { id: "shocked", label: "They'd be shocked — the gap between my public self and private self is enormous", dimensions: { "social-masking": 3 } },
          { id: "terrified", label: "I'm terrified of this happening — it would confirm I'm not fit for this", dimensions: { "social-masking": 4 } },
        ],
      },
    ],
  },
]
