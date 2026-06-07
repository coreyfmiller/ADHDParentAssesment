// ============================================================
// Dimension Explainers — What Each Dimension MEANS
//
// When she sees "Cognitive Load: Critical" on her pattern map,
// she should be able to tap and understand what that actually
// means in her body, her life, and her daily experience.
//
// These are written as psychoeducation — accessible neuroscience
// that gives her a framework for understanding herself.
// ============================================================

export interface DimensionExplainer {
  id: string
  label: string
  oneLiner: string
  whatItIs: string
  whatItFeelsLike: string[]
  whyItHappens: string
  whatHelps: string[]
  relatedPathway: string
  icon: string // lucide icon name
}

export const DIMENSION_EXPLAINERS: Record<string, DimensionExplainer> = {
  "cognitive-load": {
    id: "cognitive-load",
    label: "Cognitive Load",
    oneLiner: "How much your working memory is trying to hold at once.",
    icon: "Brain",
    whatItIs: "Cognitive load is the total demand on your working memory — the mental 'desktop' where you hold active tasks, decisions, and information. Research shows working memory can hold 3-5 items at a time. Mothers routinely try to hold 15-20: the school schedule, the grocery list, the permission slip deadline, who needs new shoes, the appointment you haven't booked, the emotional temperature of every family member. When load exceeds capacity, things start falling through — not because you don't care, but because the system is physically overfull.",
    whatItFeelsLike: [
      "Forgetting things you were told 30 seconds ago",
      "Walking into a room and not knowing why you're there",
      "The constant feeling of 'I'm forgetting something important'",
      "Can't start tasks because you can't hold the steps in your head",
      "Losing things that were just in your hand",
      "Brain feels 'full' — like there's no space for one more piece of information",
      "Time blindness — genuinely not knowing how long things take",
    ],
    whyItHappens: "Motherhood demands more simultaneous cognitive tracking than almost any other role. You're holding logistics, emotional states, future planning, and real-time problem-solving all at once. Add sleep deprivation (which reduces working memory by 20-30%), hormonal fluctuations, and the constant interruptions of life with children — and you have a brain operating at maximum capacity with minimum recovery time. If you also have ADHD or executive function differences, your baseline working memory was already smaller — and now it's being asked to hold even more.",
    whatHelps: [
      "Externalize everything — if it's not written down, it doesn't exist for your brain",
      "Reduce decisions (meal rotation, capsule wardrobe, automated bills)",
      "One task at a time — multitasking is a myth for overloaded brains",
      "Brain dumps before bed to release what you're holding",
      "Visual systems: if you can't see it, your brain forgets it exists",
    ],
    relatedPathway: "executive-function",
  },
  "emotional-bandwidth": {
    id: "emotional-bandwidth",
    label: "Emotional Bandwidth",
    oneLiner: "How much emotional capacity you have left for regulation, connection, and repair.",
    icon: "Heart",
    whatItIs: "Emotional bandwidth is your remaining capacity to regulate your own emotions, attune to others' emotions, and recover from emotional disruption. Think of it like a battery — every emotional demand (your child's meltdown, your partner's frustration, your own guilt, the sad news story you scrolled past) drains it. When bandwidth is depleted, you become reactive instead of responsive. You snap. You withdraw. You can't access the 'calm, regulated parent' you want to be — not because you're a bad person, but because the resource is genuinely empty.",
    whatItFeelsLike: [
      "Snapping at small things that normally wouldn't bother you",
      "Feeling like you're going to cry but don't know why",
      "Numbness — can't feel anything, not sad, not happy, just flat",
      "Overwhelming guilt after every reaction",
      "Can't handle anyone else's emotions on top of your own",
      "The urge to hide, run, or disappear",
      "Resentment building toward people you love",
    ],
    whyItHappens: "Emotional regulation requires the prefrontal cortex — the same brain region that handles working memory, impulse control, and decision-making. When that region is already overtaxed by cognitive load and undersupplied due to sleep deprivation, your emotional regulation capacity shrinks. You're not 'too emotional' — your regulator is underfueled. Add the invisible emotional labor of motherhood (tracking everyone's feelings, anticipating needs, performing okayness) and you have a system running perpetually at capacity with no recovery budget.",
    whatItFeelsLike: [
      "Snapping at small things that normally wouldn't bother you",
      "Feeling like you're going to cry but don't know why",
      "Numbness — can't feel anything, not sad, not happy, just flat",
      "Overwhelming guilt after every reaction",
    ],
    whatHelps: [
      "Name emotions out loud — naming reduces intensity by up to 50%",
      "Repair after rupture — it's not the snap that damages, it's the lack of repair",
      "One honest conversation per week (not performing 'fine')",
      "Reduce emotional labor where possible (stop managing everyone's feelings)",
      "Physical regulation: cold water, long exhale, hand on chest",
    ],
    relatedPathway: "depletion-burnout",
  },
  "physical-depletion": {
    id: "physical-depletion",
    label: "Physical Depletion",
    oneLiner: "How empty your body's reserves are — sleep, nutrition, rest, recovery.",
    icon: "Battery",
    whatItIs: "Physical depletion is the cumulative deficit in your body's basic needs: sleep, nutrition, rest, and physical recovery. It's not just 'being tired' — it's a state where your body has been running on reserves for so long that the reserves themselves are depleted. Research shows that chronic sleep deprivation (common in mothers of young children) impairs cognitive function at rates comparable to legal intoxication. You're not failing to function — you're functioning under conditions that would impair anyone.",
    whatItFeelsLike: [
      "Exhaustion that sleep doesn't fix (because you're never getting enough)",
      "Body aches, headaches, getting sick more often",
      "Can't stay awake past 8pm but can't fall asleep either",
      "Running on coffee and adrenaline instead of actual energy",
      "Feeling physically heavy — like gravity is stronger on you",
      "No reserve for anything unexpected",
      "Being 'touched out' — your body has nothing left to give",
    ],
    whyItHappens: "The physical demands of motherhood are relentless and largely invisible. Night wakings, physical carrying, constant sensory input, breastfeeding, the sheer physicality of managing small humans — all while society expects you to 'bounce back.' Chronic under-sleeping (even 30 minutes less than needed per night) compounds over weeks into a debt that can't be repaid in a single weekend. Your body isn't weak — it's underfueled and overdrawn.",
    whatHelps: [
      "Sleep as medicine — even 30 extra minutes per night changes everything",
      "Eat protein within an hour of waking (your brain runs on fuel, not willpower)",
      "Lower every bar on depleted days (survival mode IS the plan)",
      "Horizontal rest with eyes closed — even without sleeping, it helps",
      "Ask for one night 'off' per week if possible",
    ],
    relatedPathway: "sleep-recovery",
  },
  "system-friction": {
    id: "system-friction",
    label: "System Friction",
    oneLiner: "How much your environment, systems, and support structures are working against you.",
    icon: "Settings",
    whatItIs: "System friction measures the gap between what your life demands and what your structures can handle. It's the invisible resistance created by disorganized systems, absent support, unfair labor division, and environments not designed for how your brain works. High system friction means every task costs more energy than it should — not because you're inefficient, but because the infrastructure around you requires constant workarounds. You're doing the work of maintaining a household designed for a different era (one with a stay-at-home parent, extended family nearby, and a single-income sufficiency).",
    whatItFeelsLike: [
      "Every task has 5 invisible steps before the actual task",
      "Feeling like you're the only one who sees what needs doing",
      "Systems you set up falling apart within a week",
      "The house is always behind no matter how hard you try",
      "Can't find things, can't keep up with paperwork, can't stay on top of anything",
      "Partner 'helps' but you're still the manager of everything",
      "Guilt about asking for help or spending money on solutions",
    ],
    whyItHappens: "Modern motherhood operates without the infrastructure it was designed around. No village, no extended family support, two working parents, and an expectation that one person can manage a household, raise children, maintain a relationship, and possibly work — all while appearing effortless. If you also have ADHD or executive function differences, neurotypical organizational systems (calendars, planners, filing systems) were never built for your brain. The friction isn't your incompetence — it's a design failure.",
    whatHelps: [
      "Automate one thing this week (auto-pay a bill, auto-order a staple)",
      "Transfer ownership, not tasks ('you OWN bedtime' not 'can you help with bedtime')",
      "Lower standards intentionally (cereal for dinner is a PLAN, not a failure)",
      "Visual systems: if your brain can't see it, it doesn't exist",
      "Environmental design over willpower (hooks for keys, bins for shoes, tray for mail)",
    ],
    relatedPathway: "systemic-load",
  },
  "identity-erosion": {
    id: "identity-erosion",
    label: "Identity Erosion",
    oneLiner: "How much of 'you' has disappeared into the role of mother.",
    icon: "Fingerprint",
    whatItIs: "Identity erosion is the gradual disappearance of your sense of self — your desires, your opinions, your interests, your personhood — into the all-consuming role of caregiving. It's not that you chose to lose yourself. It's that motherhood demanded so much of your attention, energy, and time that there was nothing left for the person underneath. Research on 'matrescence' (the developmental transition of becoming a mother) shows this is a normal psychological process — but our culture doesn't name it, support it, or make space for the grief that comes with it.",
    whatItFeelsLike: [
      "Not knowing what you want (for dinner, for your life, for anything)",
      "Feeling like 'mom' is your entire identity now",
      "Guilt when you do anything for yourself",
      "Can't remember what you used to enjoy",
      "Comparing yourself to who you were 'before' and feeling like a lesser version",
      "Resentment toward your children for 'taking' your life (followed by shame for feeling that)",
      "Feeling invisible — seen only as a function, not a person",
    ],
    whyItHappens: "Identity exists in the gap between demand and self-expression. When demand fills every available hour, self-expression gets crowded out. It's not a single moment of loss — it's a thousand small surrenders: the hobby you stopped, the friend you ghosted, the opinion you stopped voicing because no one asked. The cultural message that 'good mothers sacrifice everything' makes the erosion feel virtuous — until it becomes unbearable. You didn't fail at maintaining yourself. The conditions made it nearly impossible.",
    whatHelps: [
      "One thing per day that has nothing to do with being a mother (even 5 minutes)",
      "Say your own name out loud. Remember you have one.",
      "Maintain one friendship thread that isn't about kids",
      "Name what you miss — the missing is proof the person is still there",
      "Give yourself permission to want things. Desire is the first sign of self.",
    ],
    relatedPathway: "reclaiming-identity",
  },
}
