// ============================================================
// Trauma & Nervous System — Pathway Assessment
// Survival strategies still running in the background
// NOTE: This pathway requires the most careful, gentle language.
// ============================================================

import type { AssessmentSection } from "../types"

export const TRAUMA_NERVOUS_SYSTEM_SECTIONS: AssessmentSection[] = [
  {
    id: "nervous-system-state",
    title: "Your Nervous System",
    description: "How your body holds and responds to stress — past and present",
    questions: [
      {
        id: "tns-ns-1",
        question: "Does your body often feel like it's on alert — even when nothing is actually wrong?",
        description: "Tension, scanning for danger, startling easily, difficulty relaxing. This isn't anxiety about a specific thing — it's a baseline state.",
        options: [
          { id: "rarely", label: "Rarely — I feel generally safe and relaxed in my body", dimensions: { "nervous-system-state": 1 } },
          { id: "sometimes", label: "Sometimes — in certain situations or environments I feel on edge", dimensions: { "nervous-system-state": 2 } },
          { id: "often", label: "Often — I carry tension constantly and startle easily", dimensions: { "nervous-system-state": 3 } },
          { id: "always", label: "Always — my body never fully relaxes. I'm always braced for something", dimensions: { "nervous-system-state": 4 } },
        ],
      },
      {
        id: "tns-ns-2",
        question: "When conflict happens (with your partner, your kids, anyone), what does your body do?",
        description: "Not what you think — what your body does automatically.",
        options: [
          { id: "engaged", label: "I stay present and engaged — I can handle conflict calmly", dimensions: { "nervous-system-state": 1 } },
          { id: "fight", label: "I get activated — heart racing, voice rising, ready to defend", dimensions: { "nervous-system-state": 2 } },
          { id: "freeze", label: "I freeze — I go blank, can't think, can't respond", dimensions: { "nervous-system-state": 3 } },
          { id: "fawn", label: "I immediately try to fix it — apologize, people-please, make it stop at any cost", dimensions: { "nervous-system-state": 4 } },
        ],
      },
      {
        id: "tns-ns-3",
        question: "How does your body respond to your child's big emotions — tantrums, crying, anger?",
        description: "When they're dysregulated, what happens inside you?",
        options: [
          { id: "grounded", label: "I can stay grounded — their emotions don't destabilize me", dimensions: { "nervous-system-state": 1 } },
          { id: "activated", label: "I get activated — my heart rate spikes and I have to work to stay calm", dimensions: { "nervous-system-state": 2 } },
          { id: "overwhelmed", label: "I'm overwhelmed — their distress triggers something deep in me that feels disproportionate", dimensions: { "nervous-system-state": 3 } },
          { id: "triggered", label: "I'm triggered — I react from a place that doesn't feel like 'me,' almost like a survival response", dimensions: { "nervous-system-state": 4 } },
        ],
      },
    ],
  },
  {
    id: "childhood-patterns",
    title: "Patterns from Your Own Childhood",
    description: "Whether your history is showing up in your parenting — gently explored",
    questions: [
      {
        id: "tns-cp-1",
        question: "Do you ever hear your parent's voice coming out of your mouth — and it horrifies you?",
        description: "Saying things you swore you'd never say. Reacting in ways that feel inherited, not chosen.",
        options: [
          { id: "no", label: "No — I parent very differently from how I was raised", dimensions: { "childhood-patterns": 1 } },
          { id: "occasionally", label: "Occasionally — it catches me off guard but I can redirect", dimensions: { "childhood-patterns": 2 } },
          { id: "often", label: "Often — I catch myself repeating patterns I hate, especially when stressed", dimensions: { "childhood-patterns": 3 } },
          { id: "constantly", label: "Constantly — I feel like I'm becoming the parent I swore I'd never be", dimensions: { "childhood-patterns": 4 } },
        ],
      },
      {
        id: "tns-cp-2",
        question: "Were your emotional needs met as a child?",
        description: "Were you comforted when upset? Were your feelings validated? Did you feel safe to be yourself?",
        options: [
          { id: "yes", label: "Yes — I had emotionally attuned caregivers who made me feel safe", dimensions: { "childhood-patterns": 1 } },
          { id: "partially", label: "Partially — some needs were met, others weren't. It was inconsistent.", dimensions: { "childhood-patterns": 2 } },
          { id: "rarely", label: "Rarely — I learned early to manage my own emotions because no one else would", dimensions: { "childhood-patterns": 3 } },
          { id: "no", label: "No — my emotions were dismissed, punished, or used against me", dimensions: { "childhood-patterns": 4 } },
        ],
      },
      {
        id: "tns-cp-3",
        question: "Do you find yourself parenting in direct opposition to how you were raised — and exhausting yourself in the process?",
        description: "Gentle parenting as a trauma response. Never yelling because you were yelled at. Over-explaining because no one explained to you.",
        options: [
          { id: "no", label: "No — I parent from a place of choice, not reaction", dimensions: { "childhood-patterns": 1 } },
          { id: "somewhat", label: "Somewhat — I'm intentional but it doesn't feel exhausting", dimensions: { "childhood-patterns": 2 } },
          { id: "yes-exhausting", label: "Yes — I'm constantly monitoring myself to NOT be like my parents, and it's draining", dimensions: { "childhood-patterns": 3 } },
          { id: "unsustainable", label: "It's unsustainable — I'm so focused on not repeating the past that I have nothing left for the present", dimensions: { "childhood-patterns": 4 } },
        ],
      },
    ],
  },
  {
    id: "protective-patterns",
    title: "Protective Patterns",
    description: "Survival strategies that helped you then but may be hurting you now",
    questions: [
      {
        id: "tns-pp-1",
        question: "Do you find it difficult to set boundaries — even when you know you need them?",
        description: "Saying no, expressing needs, pushing back, taking up space.",
        options: [
          { id: "comfortable", label: "I'm comfortable with boundaries — I can set and hold them", dimensions: { "protective-patterns": 1 } },
          { id: "working-on-it", label: "I'm working on it — I know I need them but it feels uncomfortable", dimensions: { "protective-patterns": 2 } },
          { id: "very-hard", label: "Very hard — saying no triggers guilt, fear, or panic", dimensions: { "protective-patterns": 3 } },
          { id: "impossible", label: "Nearly impossible — I'd rather burn out than risk someone being upset with me", dimensions: { "protective-patterns": 4 } },
        ],
      },
      {
        id: "tns-pp-2",
        question: "Do you tend to over-function — doing everything yourself because asking for help feels unsafe or pointless?",
        description: "Not just 'I'm capable.' More like 'I can't rely on anyone else because they'll let me down.'",
        options: [
          { id: "no", label: "No — I can rely on others and accept help comfortably", dimensions: { "protective-patterns": 1 } },
          { id: "somewhat", label: "Somewhat — I prefer to do things myself but can delegate", dimensions: { "protective-patterns": 2 } },
          { id: "yes", label: "Yes — I do everything because deep down I don't trust anyone to show up for me", dimensions: { "protective-patterns": 3 } },
          { id: "survival", label: "Completely — self-reliance isn't a preference, it's a survival strategy I can't turn off", dimensions: { "protective-patterns": 4 } },
        ],
      },
      {
        id: "tns-pp-3",
        question: "Do you struggle to rest, receive care, or let yourself be vulnerable?",
        description: "Not just 'I'm busy.' A deeper resistance to being cared for or letting your guard down.",
        options: [
          { id: "no", label: "No — I can receive care and rest without guilt or discomfort", dimensions: { "protective-patterns": 1 } },
          { id: "some-guilt", label: "Some guilt — but I can push through it", dimensions: { "protective-patterns": 2 } },
          { id: "very-hard", label: "Very hard — being cared for feels wrong, unsafe, or like I don't deserve it", dimensions: { "protective-patterns": 3 } },
          { id: "cant", label: "I can't — vulnerability feels dangerous. I have to stay in control at all times.", dimensions: { "protective-patterns": 4 } },
        ],
      },
    ],
  },
  {
    id: "healing-readiness",
    title: "Where You Are Now",
    description: "Understanding your current relationship with these patterns",
    questions: [
      {
        id: "tns-hr-1",
        question: "Are you aware that some of your current struggles might be connected to your past?",
        description: "Not blame — awareness. Understanding where patterns come from.",
        options: [
          { id: "yes-working", label: "Yes — I'm actively working on this with professional support", dimensions: { "healing-readiness": 1 } },
          { id: "yes-alone", label: "Yes — I see the connections but I'm navigating it alone", dimensions: { "healing-readiness": 2 } },
          { id: "starting-to", label: "Starting to — this reflection is helping me see things I hadn't connected before", dimensions: { "healing-readiness": 3 } },
          { id: "new", label: "This is new — I hadn't considered that my past might be affecting my parenting", dimensions: { "healing-readiness": 4 } },
        ],
      },
      {
        id: "tns-hr-2",
        question: "Do you have access to trauma-informed support — a therapist, counselor, or group who understands this?",
        description: "Not just any therapist. Someone who gets trauma, attachment, and how it shows up in parenting.",
        options: [
          { id: "yes", label: "Yes — I have professional support that's helping", dimensions: { "healing-readiness": 1 } },
          { id: "had-before", label: "I've had it before but not currently — I know it helps", dimensions: { "healing-readiness": 2 } },
          { id: "want-but-cant", label: "I want it but can't access it — cost, time, availability, or not knowing where to start", dimensions: { "healing-readiness": 3 } },
          { id: "never", label: "Never — I've never had support for this and don't know where to begin", dimensions: { "healing-readiness": 4 } },
        ],
      },
    ],
  },
]

export const TRAUMA_NERVOUS_SYSTEM_META = {
  id: "trauma-nervous-system",
  slug: "trauma-nervous-system",
  title: "Trauma & Nervous System",
  subtitle: "Survival strategies still running in the background",
  description: "This reflection gently explores whether patterns from your own childhood or past experiences are showing up in your parenting. It's not about blame or diagnosis — it's about understanding why certain moments trigger responses that feel bigger than the situation warrants, and recognizing that your survival strategies deserve compassion, not shame.",
  estimatedMinutes: 10,
  questionCount: 11,
}
