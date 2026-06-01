// ============================================================
// Archetype System — Identity-based pattern recognition
// Maps pattern map dimensions to a recognizable "type"
// ============================================================

import type { PatternMap, DimensionScore } from "./assessments/types"

export interface Archetype {
  id: string
  name: string
  tagline: string
  description: string
  hiddenStrength: string
  kryptonite: string
  whatHelps: string
  typicalExperience: string
  icon: string // lucide icon name
  color: string // tailwind color
}

export const ARCHETYPES: Record<string, Archetype> = {
  "plate-spinner": {
    id: "plate-spinner",
    name: "The Plate Spinner",
    tagline: "Your brain holds everything — and one interruption crashes the whole system.",
    description: "Your brain is holding everything — every appointment, every permission slip, every meal plan, every emotional need — and it's all spinning at once. You're not disorganized. You're overloaded. The system requires more working memory than any human brain can provide, and yours is running at 200% capacity just to keep the plates from crashing.",
    hiddenStrength: "You see the whole picture. You're the one who knows what everyone needs, when it's due, and what falls apart if you stop. That's not a flaw — it's an extraordinary cognitive feat that nobody acknowledges.",
    kryptonite: "Interruptions. One disruption and the whole system cascades. Not because you're fragile — because you're holding too much for any single interruption to be \"small.\"",
    whatHelps: "Externalization. Getting things OUT of your head and into systems — visual, physical, automated. Your brain isn't broken. It just needs to stop being the only hard drive.",
    typicalExperience: "I walk into a room and forget why I'm there. I start a sentence and lose the thought. I lie awake at night running through everything I might have forgotten. People think I'm scattered but I'm actually tracking 47 things at once — I just can't hold them all.",
    icon: "Orbit",
    color: "purple",
  },
  "quiet-volcano": {
    id: "quiet-volcano",
    name: "The Quiet Volcano",
    tagline: "Calm on the outside. At the edge on the inside.",
    description: "On the outside, you're holding it together. On the inside, you're at the edge — and the smallest thing can tip you into eruption. The rage, the tears, the shutdown — they come fast and they come hard. Not because you're unstable. Because you've been absorbing everyone else's emotions for so long that there's no room left for your own.",
    hiddenStrength: "You are the emotional regulator for your entire family. You hold space for everyone. You absorb, process, and manage feelings that aren't even yours. That's an extraordinary capacity — it's just been exploited past its limit.",
    kryptonite: "Being touched out, noise, one more demand. The straw that breaks you is never the real problem — it's the 400 straws that came before it.",
    whatHelps: "Micro-regulation throughout the day (not just after the explosion). Naming emotions in real-time. Permission to feel anger without it meaning you're a bad person. Repair scripts for after the rupture.",
    typicalExperience: "I go from fine to screaming in 3 seconds. Then I feel crushing guilt. I'm everyone's safe space but nobody is mine. I've gone numb to my own feelings because there's no bandwidth left after managing everyone else's.",
    icon: "Flame",
    color: "rose",
  },
  "running-on-empty": {
    id: "running-on-empty",
    name: "The Running-on-Empty",
    tagline: "Not tired. Depleted. At a level sleep can't fix.",
    description: "You're not tired. You're depleted at a cellular level. Sleep doesn't fix it. Coffee doesn't fix it. You wake up exhausted and the day hasn't even started. Your body has been in survival mode for so long it's forgotten what rested feels like. Everything is harder when you're running on fumes — and you've been running on fumes for months. Maybe years.",
    hiddenStrength: "You are still functioning. Still showing up. Still keeping people alive. The fact that you're doing ANY of this on the reserves you have is extraordinary. Most systems would have shut down by now.",
    kryptonite: "Anything that requires sustained energy — long outings, social events, exercise, even cooking a real meal. Not because you're lazy. Because your tank is genuinely empty.",
    whatHelps: "Permission to rest WITHOUT earning it first. Minimum viable routines for low-energy days. Nutrition and hydration as cognitive support, not wellness culture. Acknowledging that depletion is a physical state, not a mindset problem.",
    typicalExperience: "I wake up feeling like I didn't sleep even when I did. My body hurts. I get sick constantly. I can't remember the last time I did something for my own physical wellbeing. I'm running on adrenaline and obligation.",
    icon: "BatteryLow",
    color: "amber",
  },
  "invisible-architect": {
    id: "invisible-architect",
    name: "The Invisible Architect",
    tagline: "You run the whole system. Nobody sees it.",
    description: "You are the operating system of your household — and nobody sees it. You manage the schedules, the logistics, the emotional labor, the anticipation of needs, the backup plans for the backup plans. The system runs because of you. But the system was never designed for one person to run, and the invisibility of your labor is eroding you from the inside.",
    hiddenStrength: "You are a systems thinker. You see what needs to happen three steps ahead. You hold the architecture of an entire family's life in your head. That's project management at an elite level — it's just unpaid and unrecognized.",
    kryptonite: "Lack of support. When the system breaks (illness, holidays, schedule changes), there's no backup. Recovery takes weeks because you're rebuilding alone.",
    whatHelps: "Making the invisible visible — to yourself and others. Delegation with specificity (not \"help\" but \"handle dinner Tuesday through Thursday\"). Lowering standards intentionally in areas that don't actually matter. Systems that don't require you to be the engine.",
    typicalExperience: "I'm the default parent for everything. My partner 'helps' but I'm still the manager. If I stopped, everything would fall apart within 48 hours. I'm doing the work of three people and nobody notices until I stop.",
    icon: "Layers",
    color: "emerald",
  },
  "the-disappeared": {
    id: "the-disappeared",
    name: "The Disappeared",
    tagline: "You used to be a person. You're finding her again.",
    description: "You used to be a person. You had interests, opinions, desires, a name that wasn't \"Mom.\" Somewhere in the relentless demands of motherhood, you disappeared. Not all at once — slowly. Eroded. Until one day you realized you don't know what you want, what you need, or who you are outside of this role. The resentment is building. The grief is real.",
    hiddenStrength: "The fact that you notice you've disappeared means you haven't. Completely lost people don't grieve their absence — you do. That grief is the thread back to yourself. It's thin, but it's not broken.",
    kryptonite: "Being needed constantly. Every demand reinforces the role and erases the person. The guilt of wanting something for yourself keeps you trapped in the function.",
    whatHelps: "Micro-acts of identity — tiny things that have nothing to do with motherhood. One song. One page. One text to a friend about something that isn't your kids. Rebuilding happens in seconds, not hours. Permission to want things.",
    typicalExperience: "If someone asked what I need, I couldn't answer. I don't know what I like anymore. I feel resentment toward my partner, my kids, my life — and then guilt for feeling it. I'm grieving someone I used to be.",
    icon: "Ghost",
    color: "indigo",
  },
  "burning-engine": {
    id: "burning-engine",
    name: "The Burning Engine",
    tagline: "Depleted AND reactive. The hardest combination.",
    description: "You're depleted AND reactive. Your body is empty and your emotions are overflowing — the worst combination. You have nothing left to give but everything is demanding more. You snap, then crash. Crash, then snap. The cycle is relentless and you can't find the off switch because there isn't one. You're burning fuel you don't have.",
    hiddenStrength: "Your intensity is a sign of how much you care. The rage, the tears, the exhaustion — they're all signals from a person who is trying desperately hard in impossible conditions. You haven't given up. You're just running the engine without oil.",
    kryptonite: "The combination of physical exhaustion and emotional demand. When your body is empty, your emotional regulation goes offline. It's not a character flaw — it's neuroscience.",
    whatHelps: "Physical recovery FIRST (you can't regulate from empty). Sleep, food, water before any emotional work. Crisis-day templates that require nothing from you. Emergency scripts for the moments you can't think straight.",
    typicalExperience: "I'm exhausted AND angry. I have nothing left but I'm still expected to be patient, present, and calm. I yell, then I cry, then I feel numb. I can't tell if I'm depressed or just completely used up.",
    icon: "Zap",
    color: "red",
  },
  "storm-weatherer": {
    id: "storm-weatherer",
    name: "The Storm Weatherer",
    tagline: "Emotionally maxed with no structure to catch you.",
    description: "You're emotionally maxed AND your daily life has no structure to catch you. Every day is improvised. Every disruption is a crisis. You're navigating intense emotions without any scaffolding — no routines that hold, no support that's reliable, no systems that work. You're weathering a storm without shelter.",
    hiddenStrength: "You are adaptable. You've been improvising survival every single day without a safety net. That's not chaos — that's resilience under impossible conditions. You've been building the plane while flying it.",
    kryptonite: "Unpredictability. When you can't predict what's coming, you can't prepare. And when you can't prepare, your emotional system stays in fight-or-flight permanently.",
    whatHelps: "Structure that's forgiving — not rigid routines but flexible rhythms. \"Good enough\" systems that don't require perfection. Reducing decision fatigue. Building ONE reliable anchor point in the day.",
    typicalExperience: "Every day feels like chaos. I have no routines that stick. I'm reactive to everything because I'm already at the edge before the day starts. I have no support and no structure and I'm drowning.",
    icon: "CloudLightning",
    color: "sky",
  },
  "weight-bearer": {
    id: "weight-bearer",
    name: "The Weight Bearer",
    tagline: "It's not one thing. It's everything. All at once.",
    description: "It's not one thing. It's everything. Your cognitive load is maxed, your emotions are overflowing, your body is depleted, your systems are broken, and you're losing yourself in the process. You're not failing at one area of life — you're carrying an impossible weight across all of them. This isn't a personal failing. This is what happens when a person is systematically unsupported for too long.",
    hiddenStrength: "You are still here. Still reading this. Still trying to understand what's happening. With this much weight, the fact that you haven't completely shut down is remarkable. You are stronger than this situation — even when it doesn't feel like it.",
    kryptonite: "Everything. When all systems are critical, there's no safe place to land. Every direction feels overwhelming because it is.",
    whatHelps: "Triage, not optimization. Not \"fix everything\" but \"what is the ONE thing that, if it improved even slightly, would take pressure off everything else?\" Usually it's sleep or support. Start there. One thing. Not five.",
    typicalExperience: "I can't even identify what's wrong because everything is wrong. I'm exhausted, angry, scattered, unsupported, and I don't recognize myself anymore. I don't know where to start because every direction feels impossible.",
    icon: "Mountain",
    color: "slate",
  },
  "steady-ground": {
    id: "steady-ground",
    name: "The Steady Ground",
    tagline: "Manageable. For now. And that's worth protecting.",
    description: "Right now, things are manageable. Not perfect — but manageable. Your dimensions are at low or moderate levels, which means you have capacity. This isn't the absence of challenge — it's the presence of enough support, enough rest, or enough structure to keep things from tipping. This can shift with seasons, hormones, life changes, or loss of support. Protect what's working.",
    hiddenStrength: "You have bandwidth. That's rare and valuable. Use it to build systems and habits that will hold you when things get harder — because they will, eventually. The work you do now is insurance for future you.",
    kryptonite: "Complacency. When things feel okay, it's easy to stop maintaining the systems that got you here. Or to take on more because you \"can handle it\" — until you can't.",
    whatHelps: "Maintenance. Keep doing what's working. Build margins. Don't fill every gap with more obligation. Use this season to invest in yourself — not just survive.",
    typicalExperience: "Things are okay right now. Not amazing, but okay. I have some capacity. I'm managing. I want to keep it this way.",
    icon: "Leaf",
    color: "green",
  },
}

// ---- Archetype Determination ----

export function determineArchetype(patternMap: PatternMap): Archetype {
  const dims = patternMap.dimensions
  const getIntensity = (id: string): string => {
    const dim = dims.find((d) => d.dimension === id)
    return dim?.intensity || "low"
  }

  const isHighOrCritical = (id: string): boolean => {
    const intensity = getIntensity(id)
    return intensity === "high" || intensity === "critical"
  }

  const isModerateOrAbove = (id: string): boolean => {
    const intensity = getIntensity(id)
    return intensity === "moderate" || intensity === "high" || intensity === "critical"
  }

  // Count how many dimensions are high/critical
  const highCriticalCount = dims.filter(
    (d) => d.intensity === "high" || d.intensity === "critical"
  ).length

  // Priority 1: Weight Bearer (3+ dimensions at high/critical)
  if (highCriticalCount >= 3) {
    return ARCHETYPES["weight-bearer"]
  }

  // Priority 2: Burning Engine (physical + emotional both high/critical)
  if (isHighOrCritical("physical-depletion") && isHighOrCritical("emotional-bandwidth")) {
    return ARCHETYPES["burning-engine"]
  }

  // Priority 3: Storm Weatherer (emotional + system both high/critical)
  if (isHighOrCritical("emotional-bandwidth") && isHighOrCritical("system-friction")) {
    return ARCHETYPES["storm-weatherer"]
  }

  // Priority 4: Check primary dimensions in order
  // Identity Erosion → The Disappeared
  if (isHighOrCritical("identity-erosion") && isModerateOrAbove("emotional-bandwidth")) {
    return ARCHETYPES["the-disappeared"]
  }

  // Emotional Bandwidth → Quiet Volcano
  if (isHighOrCritical("emotional-bandwidth") && isModerateOrAbove("identity-erosion")) {
    return ARCHETYPES["quiet-volcano"]
  }

  // Physical Depletion → Running-on-Empty
  if (isHighOrCritical("physical-depletion") && isModerateOrAbove("cognitive-load")) {
    return ARCHETYPES["running-on-empty"]
  }

  // System Friction → Invisible Architect
  if (isHighOrCritical("system-friction") && isModerateOrAbove("identity-erosion")) {
    return ARCHETYPES["invisible-architect"]
  }

  // Cognitive Load → Plate Spinner
  if (isHighOrCritical("cognitive-load") && isModerateOrAbove("system-friction")) {
    return ARCHETYPES["plate-spinner"]
  }

  // Fallback: check single high/critical dimensions without secondary requirement
  if (isHighOrCritical("identity-erosion")) return ARCHETYPES["the-disappeared"]
  if (isHighOrCritical("emotional-bandwidth")) return ARCHETYPES["quiet-volcano"]
  if (isHighOrCritical("physical-depletion")) return ARCHETYPES["running-on-empty"]
  if (isHighOrCritical("system-friction")) return ARCHETYPES["invisible-architect"]
  if (isHighOrCritical("cognitive-load")) return ARCHETYPES["plate-spinner"]

  // Nothing elevated — Steady Ground
  return ARCHETYPES["steady-ground"]
}

// ---- Storage ----

const ARCHETYPE_KEY = "mindful-mama-archetype"
const ARCHETYPE_HISTORY_KEY = "mindful-mama-archetype-history"

export interface ArchetypeRecord {
  archetypeId: string
  determinedAt: number
}

export function saveArchetype(archetype: Archetype): void {
  const record: ArchetypeRecord = {
    archetypeId: archetype.id,
    determinedAt: Date.now(),
  }
  try {
    localStorage.setItem(ARCHETYPE_KEY, JSON.stringify(record))

    // Also save to history
    const history = getArchetypeHistory()
    history.push(record)
    localStorage.setItem(ARCHETYPE_HISTORY_KEY, JSON.stringify(history.slice(-12)))
  } catch {}
}

export function getCurrentArchetype(): Archetype | null {
  try {
    const data = localStorage.getItem(ARCHETYPE_KEY)
    if (!data) return null
    const record = JSON.parse(data) as ArchetypeRecord
    return ARCHETYPES[record.archetypeId] || null
  } catch {
    return null
  }
}

export function getArchetypeHistory(): ArchetypeRecord[] {
  try {
    const data = localStorage.getItem(ARCHETYPE_HISTORY_KEY)
    if (!data) return []
    return JSON.parse(data)
  } catch {
    return []
  }
}
