// ============================================================
// Profile Generator — Synthesizes all pathway data into a
// unified, personalized profile
// ============================================================

import type { PatternMap, DimensionScore } from "./types"
import { SNAPSHOT_SECTIONS } from "./overwhelm-snapshot"
import { EXECUTIVE_FUNCTION_SECTIONS } from "./pathways/executive-function"
import { DEPLETION_BURNOUT_SECTIONS } from "./pathways/depletion-burnout"
import { SENSORY_OVERWHELM_SECTIONS } from "./pathways/sensory-overwhelm"
import { SYSTEMIC_LOAD_SECTIONS } from "./pathways/systemic-load"
import { HORMONAL_PATTERNS_SECTIONS } from "./pathways/hormonal-patterns"
import { SLEEP_RECOVERY_SECTIONS } from "./pathways/sleep-recovery"
import { TRAUMA_NERVOUS_SYSTEM_SECTIONS } from "./pathways/trauma-nervous-system"

// ============================================================
// Types
// ============================================================

export interface UserProfile {
  narrative: string
  leveragePoints: LeveragePoint[]
  stackingChains: StackingChain[]
  strengths: Strength[]
  strategyPriority: StrategyPriority[]
  completedPathways: string[]
  generatedAt: number
}

export interface LeveragePoint {
  title: string
  description: string
  impact: "high" | "medium"
}

export interface StackingChain {
  chain: string[]
  description: string
}

export interface Strength {
  area: string
  description: string
}

export interface StrategyPriority {
  order: number
  area: string
  action: string
  reason: string
}

// ============================================================
// Answer interpretation maps
// ============================================================

interface PathwayAnswers {
  pathwayId: string
  answers: Record<string, string>
}

interface DimensionResult {
  dimension: string
  score: number
  maxScore: number
  intensity: "low" | "moderate" | "high" | "critical"
}

function getIntensity(score: number, maxScore: number): "low" | "moderate" | "high" | "critical" {
  const ratio = score / maxScore
  if (ratio <= 0.3) return "low"
  if (ratio <= 0.55) return "moderate"
  if (ratio <= 0.8) return "high"
  return "critical"
}

function scoreDimensions(
  sections: typeof EXECUTIVE_FUNCTION_SECTIONS,
  answers: Record<string, string>
): DimensionResult[] {
  const scores: Record<string, { score: number; max: number }> = {}

  for (const section of sections) {
    for (const question of section.questions) {
      const answerId = answers[question.id]
      if (!answerId) continue
      const option = question.options.find((o) => o.id === answerId)
      if (!option?.dimensions) continue
      for (const [dim, val] of Object.entries(option.dimensions)) {
        if (!scores[dim]) scores[dim] = { score: 0, max: 0 }
        scores[dim].score += val
        scores[dim].max += 4
      }
    }
  }

  return Object.entries(scores).map(([dim, { score, max }]) => ({
    dimension: dim,
    score,
    maxScore: max,
    intensity: getIntensity(score, max),
  }))
}

// ============================================================
// Narrative Generation
// ============================================================

const DIMENSION_DESCRIPTORS: Record<string, Record<string, string>> = {
  // Executive Function
  "time-perception": {
    high: "time-blind",
    critical: "severely time-blind",
  },
  "task-initiation": {
    high: "paralysis-prone",
    critical: "stuck in chronic task paralysis",
  },
  "working-memory": {
    high: "working-memory-maxed",
    critical: "cognitively drowning",
  },
  "organization-systems": {
    high: "system-abandoning",
    critical: "structureless",
  },
  "attention-regulation": {
    high: "attention-scattered",
    critical: "unable to direct focus",
  },
  // Depletion
  "energy-patterns": {
    high: "chronically low-energy",
    critical: "running on nothing",
  },
  "recovery-capacity": {
    high: "unable to recover",
    critical: "rest doesn't reach you",
  },
  "burnout-signals": {
    high: "showing burnout signals",
    critical: "in active burnout",
  },
  "giving-patterns": {
    high: "over-giving",
    critical: "pouring from an empty cup",
  },
  "depletion-vs-depression": {
    high: "beyond simple tiredness",
    critical: "possibly beyond overwhelm into something deeper",
  },
  // Sensory
  "auditory-processing": {
    high: "noise-sensitive",
    critical: "auditory-overwhelmed",
  },
  "tactile-sensitivity": {
    high: "touched-out",
    critical: "touch-averse",
  },
  "visual-overwhelm": {
    high: "visually overwhelmed by clutter",
    critical: "paralyzed by visual chaos",
  },
  "overwhelm-patterns": {
    high: "easily overwhelmed by compound input",
    critical: "in constant sensory overload",
  },
  "regulation-strategies": {
    high: "lacking regulation tools",
    critical: "without any way to self-regulate",
  },
  // Systemic
  "mental-load": {
    high: "carrying the entire mental load",
    critical: "solo-carrying everything",
  },
  "division-of-labor": {
    high: "doing most of the labor alone",
    critical: "functionally a single parent in a partnership",
  },
  "support-systems": {
    high: "under-supported",
    critical: "completely isolated",
  },
  "structural-barriers": {
    high: "fighting structural barriers",
    critical: "trapped by systemic constraints",
  },
  // Hormonal
  "cycle-awareness": {
    high: "cyclically impacted",
    critical: "dramatically different person across cycle phases",
  },
  "hormonal-impact": {
    high: "hormonally destabilized",
    critical: "hormonally incapacitated at times",
  },
  "life-stage": {
    high: "in a hormonally disruptive life stage",
    critical: "in hormonal crisis",
  },
  "planning-around-cycle": {
    high: "not planning around hormonal shifts",
    critical: "unable to accommodate cyclical needs",
  },
  // Sleep
  "sleep-quality": {
    high: "poor sleep quality",
    critical: "severely sleep-disrupted",
  },
  "sleep-disruption": {
    high: "frequently woken",
    critical: "chronically sleep-interrupted",
  },
  "sleep-habits": {
    high: "revenge-bedtime-procrastinating",
    critical: "without any sleep hygiene",
  },
  "daytime-impact": {
    high: "sleep-deprived and impaired",
    critical: "non-functional from exhaustion",
  },
  // Trauma
  "nervous-system-state": {
    high: "hypervigilant",
    critical: "nervous system stuck in survival mode",
  },
  "childhood-patterns": {
    high: "repeating childhood patterns",
    critical: "trapped in intergenerational cycles",
  },
  "protective-patterns": {
    high: "over-functioning as a survival strategy",
    critical: "unable to receive help or rest safely",
  },
  "healing-readiness": {
    high: "aware but unsupported",
    critical: "newly seeing these connections",
  },
}

function buildNarrative(
  patternMap: PatternMap,
  allDimensions: DimensionResult[],
  completedPathways: string[]
): string {
  // Collect high/critical descriptors
  const descriptors: string[] = []
  for (const dim of allDimensions) {
    const desc = DIMENSION_DESCRIPTORS[dim.dimension]
    if (desc && (dim.intensity === "high" || dim.intensity === "critical")) {
      descriptors.push(desc[dim.intensity] || desc["high"])
    }
  }

  // Build the snapshot-level summary
  const snapshotDims = patternMap.dimensions
  const criticalDims = snapshotDims.filter((d) => d.intensity === "critical")
  const highDims = snapshotDims.filter((d) => d.intensity === "high")
  const lowDims = snapshotDims.filter((d) => d.intensity === "low")

  let narrative = ""

  // Opening based on overall severity
  const totalStrain = criticalDims.length + highDims.length
  if (totalStrain >= 4) {
    narrative += "You're carrying an extraordinary amount right now. "
  } else if (totalStrain >= 2) {
    narrative += "You're under significant strain in multiple areas. "
  } else if (totalStrain >= 1) {
    narrative += "You have specific pressure points that are making everything harder. "
  } else {
    narrative += "Your overall picture is manageable, with room to strengthen specific areas. "
  }

  // Core pattern description
  if (descriptors.length > 0) {
    const topDescriptors = descriptors.slice(0, 5)
    narrative += `Based on your reflections, you're ${topDescriptors.join(", ")}. `
  }

  // Stacking context
  if (criticalDims.length >= 2) {
    const critNames = criticalDims.map((d) => d.label.toLowerCase())
    narrative += `Your ${critNames.join(" and ")} are at critical levels and compounding each other. `
  }

  // Strengths acknowledgment
  if (lowDims.length > 0) {
    const strengthNames = lowDims.map((d) => d.label.toLowerCase())
    narrative += `Your ${strengthNames.join(" and ")} ${lowDims.length === 1 ? "is" : "are"} holding steady — that's genuine resilience worth protecting. `
  }

  // Pathway depth
  if (completedPathways.length >= 4) {
    narrative += "You've explored your patterns deeply across multiple dimensions, which gives us a rich picture to work with."
  } else if (completedPathways.length >= 2) {
    narrative += "You've started mapping your patterns in detail. The more pathways you explore, the clearer the connections become."
  }

  return narrative.trim()
}

// ============================================================
// Stacking Chain Detection
// ============================================================

function detectStackingChains(
  patternMap: PatternMap,
  allDimensions: DimensionResult[]
): StackingChain[] {
  const chains: StackingChain[] = []
  const dimMap = new Map(allDimensions.map((d) => [d.dimension, d]))
  const snapMap = new Map(patternMap.dimensions.map((d) => [d.dimension, d]))

  const isHigh = (dim: string) => {
    const d = dimMap.get(dim) || snapMap.get(dim)
    return d && (d.intensity === "high" || d.intensity === "critical")
  }

  // Sleep → Executive Function → Shame
  if (isHigh("sleep-quality") || isHigh("sleep-disruption") || isHigh("physical-depletion")) {
    if (isHigh("working-memory") || isHigh("task-initiation") || isHigh("cognitive-load")) {
      chains.push({
        chain: ["Sleep deprivation", "Worse executive function", "More dropped balls", "More shame"],
        description: "Your exhaustion is directly impairing your brain's ability to plan, remember, and initiate. The things you're 'failing' at may improve significantly if sleep is addressed first.",
      })
    }
  }

  // Sensory overload → Snapping → Guilt → More depletion
  if (isHigh("auditory-processing") || isHigh("tactile-sensitivity") || isHigh("overwhelm-patterns")) {
    if (isHigh("emotional-bandwidth")) {
      chains.push({
        chain: ["Sensory overload", "Snapping or shutting down", "Guilt and shame", "Emotional depletion"],
        description: "Your nervous system hits capacity, you react, then the guilt drains what little emotional energy you had left. Breaking this cycle means intervening at the sensory level — before the snap happens.",
      })
    }
  }

  // Solo carrying → No recovery → Burnout → Identity loss
  if (isHigh("mental-load") || isHigh("division-of-labor")) {
    if (isHigh("recovery-capacity") || isHigh("energy-patterns")) {
      if (isHigh("identity-erosion")) {
        chains.push({
          chain: ["Carrying everything alone", "No time to recover", "Burnout deepens", "You disappear into the role"],
          description: "You're giving everything to everyone else with nothing coming back. The depletion isn't just physical — you're losing yourself in the process. Something structural needs to change.",
        })
      }
    }
  }

  // Trauma → People-pleasing → Over-functioning → Burnout
  if (isHigh("childhood-patterns") || isHigh("protective-patterns") || isHigh("nervous-system-state")) {
    if (isHigh("giving-patterns") || isHigh("mental-load")) {
      chains.push({
        chain: ["Childhood survival patterns", "People-pleasing and over-functioning", "Can't say no or rest", "Burnout"],
        description: "Your nervous system learned early that safety comes from being useful, needed, or perfect. That pattern is now driving you to give beyond your capacity — not because you want to, but because stopping feels dangerous.",
      })
    }
  }

  // Hormonal shifts → Worse everything → Confusion about what's wrong
  if (isHigh("cycle-awareness") || isHigh("hormonal-impact")) {
    if (isHigh("cognitive-load") || isHigh("emotional-bandwidth")) {
      chains.push({
        chain: ["Hormonal shift", "Executive function drops", "Everything falls apart", "Shame about inconsistency"],
        description: "Your capacity isn't consistent because your hormones aren't consistent. The weeks where you 'can't cope' aren't weakness — they're predictable neurochemical shifts that can be planned around.",
      })
    }
  }

  // Task paralysis → Avoidance → Pile grows → More paralysis
  if (isHigh("task-initiation") || isHigh("organization-systems")) {
    if (isHigh("system-friction")) {
      chains.push({
        chain: ["Can't start tasks", "Avoidance", "The pile grows", "Starting feels even more impossible"],
        description: "Your brain's activation threshold is high, so tasks pile up. The bigger the pile, the harder it is to start. This isn't laziness — it's a neurological loop that needs external structure to break.",
      })
    }
  }

  return chains
}

// ============================================================
// Strength Detection
// ============================================================

function detectStrengths(
  patternMap: PatternMap,
  allDimensions: DimensionResult[]
): Strength[] {
  const strengths: Strength[] = []
  const dimMap = new Map(allDimensions.map((d) => [d.dimension, d]))
  const snapMap = new Map(patternMap.dimensions.map((d) => [d.dimension, d]))

  const isLow = (dim: string) => {
    const d = dimMap.get(dim) || snapMap.get(dim)
    return d && d.intensity === "low"
  }
  const isLowOrMod = (dim: string) => {
    const d = dimMap.get(dim) || snapMap.get(dim)
    return d && (d.intensity === "low" || d.intensity === "moderate")
  }

  if (isLow("system-friction")) {
    strengths.push({
      area: "Daily Structure",
      description: "Your routines and systems are holding. This is your anchor — it's carrying more weight than you realize. Protect it fiercely during hard periods.",
    })
  }
  if (isLow("emotional-bandwidth")) {
    strengths.push({
      area: "Emotional Regulation",
      description: "You have emotional capacity to spare. You can hold space for your children's big feelings without losing yourself. This is a genuine gift.",
    })
  }
  if (isLow("identity-erosion")) {
    strengths.push({
      area: "Sense of Self",
      description: "You still feel like yourself underneath the role of 'mom.' You know what you need and who you are. That's rarer than you think.",
    })
  }
  if (isLowOrMod("regulation-strategies")) {
    strengths.push({
      area: "Self-Regulation Awareness",
      description: "You have tools for managing overwhelm and you use them. This means you can catch yourself before the crash — that's a skill many people never develop.",
    })
  }
  if (isLow("cognitive-load")) {
    strengths.push({
      area: "Cognitive Capacity",
      description: "Your brain isn't maxed out. You have mental bandwidth available, which means you can direct it intentionally toward the areas that need attention.",
    })
  }
  if (isLowOrMod("support-systems")) {
    strengths.push({
      area: "Support Network",
      description: "You have people around you. That's not nothing — it's the foundation that makes everything else possible. Lean on it.",
    })
  }
  if (isLow("childhood-patterns") || isLow("nervous-system-state")) {
    strengths.push({
      area: "Nervous System Safety",
      description: "Your body feels relatively safe. You're not operating from survival mode, which means you have access to your full cognitive and emotional capacity.",
    })
  }

  return strengths
}

// ============================================================
// Leverage Points
// ============================================================

function detectLeveragePoints(
  patternMap: PatternMap,
  allDimensions: DimensionResult[]
): LeveragePoint[] {
  const points: LeveragePoint[] = []
  const dimMap = new Map(allDimensions.map((d) => [d.dimension, d]))
  const snapMap = new Map(patternMap.dimensions.map((d) => [d.dimension, d]))

  const isHighOrCrit = (dim: string) => {
    const d = dimMap.get(dim) || snapMap.get(dim)
    return d && (d.intensity === "high" || d.intensity === "critical")
  }
  const isCritical = (dim: string) => {
    const d = dimMap.get(dim) || snapMap.get(dim)
    return d && d.intensity === "critical"
  }

  // Sleep is almost always the highest leverage when it's bad
  if (isHighOrCrit("sleep-quality") || isHighOrCrit("sleep-disruption") || isHighOrCrit("daytime-impact")) {
    points.push({
      title: "Fix sleep first",
      description: "Sleep deprivation mimics ADHD, worsens emotional regulation, tanks executive function, and accelerates burnout. Addressing sleep — even partially — may improve multiple other dimensions simultaneously. This is likely your highest-return intervention.",
      impact: "high",
    })
  }

  // Structural support when solo-carrying
  if (isHighOrCrit("mental-load") || isHighOrCrit("division-of-labor") || isHighOrCrit("support-systems")) {
    points.push({
      title: "Change the structure, not yourself",
      description: "You're trying to perform at a level that requires support you don't have. No amount of personal optimization will fix a structural problem. The leverage is in getting help, redistributing labor, or dropping responsibilities — not in trying harder.",
      impact: "high",
    })
  }

  // Sensory management
  if (isHighOrCrit("auditory-processing") || isHighOrCrit("tactile-sensitivity") || isHighOrCrit("overwhelm-patterns")) {
    points.push({
      title: "Reduce sensory input before it peaks",
      description: "Your nervous system is hitting capacity daily. Small environmental changes (noise-reducing earbuds, fewer visual stimuli, scheduled quiet time) can prevent the overwhelm cascade before it starts. Intervene early, not after the snap.",
      impact: "high",
    })
  }

  // Hormonal planning
  if (isHighOrCrit("cycle-awareness") || isHighOrCrit("hormonal-impact")) {
    points.push({
      title: "Plan around your cycle, not against it",
      description: "Your capacity is cyclical, not broken. Track your phases and front-load demanding tasks to your high-capacity weeks. Protect your low-capacity phases with lighter expectations. This single shift can reduce shame and increase effectiveness dramatically.",
      impact: "medium",
    })
  }

  // External systems for executive function
  if (isHighOrCrit("task-initiation") || isHighOrCrit("working-memory") || isHighOrCrit("organization-systems")) {
    points.push({
      title: "Build external scaffolding for your brain",
      description: "Your brain won't hold things internally — stop expecting it to. Visual systems, timers, body doubling, and environmental cues bypass the executive function deficit entirely. The goal isn't to remember more — it's to need to remember less.",
      impact: "high",
    })
  }

  // Professional support for trauma
  if (isCritical("nervous-system-state") || isCritical("childhood-patterns") || isCritical("protective-patterns")) {
    points.push({
      title: "Get trauma-informed professional support",
      description: "The patterns running your nervous system were built in childhood and they won't resolve through self-help alone. A trauma-informed therapist (EMDR, somatic experiencing, IFS) can help rewire responses that no amount of strategies will touch. This isn't weakness — it's the appropriate tool for the job.",
      impact: "high",
    })
  }

  // Burnout recovery
  if (isCritical("energy-patterns") || isCritical("burnout-signals") || isCritical("recovery-capacity")) {
    points.push({
      title: "This may require professional support",
      description: "Your depletion has gone past what rest and strategies can fix. When joy disappears, rest doesn't help, and your body is breaking down — that's clinical burnout or depression, not just 'being tired.' A healthcare provider can help distinguish and treat what's happening.",
      impact: "high",
    })
  }

  // Sort by impact
  points.sort((a, b) => (a.impact === "high" ? 0 : 1) - (b.impact === "high" ? 0 : 1))
  return points.slice(0, 4) // Top 4 leverage points
}

// ============================================================
// Strategy Priority
// ============================================================

function buildStrategyPriority(
  patternMap: PatternMap,
  allDimensions: DimensionResult[]
): StrategyPriority[] {
  const priorities: StrategyPriority[] = []
  const dimMap = new Map(allDimensions.map((d) => [d.dimension, d]))
  const snapMap = new Map(patternMap.dimensions.map((d) => [d.dimension, d]))

  const getIntensityVal = (dim: string): number => {
    const d = dimMap.get(dim) || snapMap.get(dim)
    if (!d) return 0
    return d.intensity === "critical" ? 4 : d.intensity === "high" ? 3 : d.intensity === "moderate" ? 2 : 1
  }

  // Score each area by urgency
  const areas: { area: string; dims: string[]; action: string; reason: string }[] = [
    { area: "Sleep", dims: ["sleep-quality", "sleep-disruption", "daytime-impact", "physical-depletion"], action: "Address sleep disruption — even one extra hour makes a measurable difference to everything else", reason: "Sleep is the foundation. Everything else is harder without it." },
    { area: "Sensory Management", dims: ["auditory-processing", "tactile-sensitivity", "overwhelm-patterns", "emotional-bandwidth"], action: "Get noise-reducing earbuds, create one quiet zone, and practice the pre-emptive break", reason: "Preventing sensory overload stops the snap-guilt-depletion cycle." },
    { area: "Structural Support", dims: ["mental-load", "division-of-labor", "support-systems", "system-friction"], action: "Have the load conversation, delegate one thing fully, or drop one responsibility entirely", reason: "You can't optimize your way out of a support deficit." },
    { area: "Executive Function Systems", dims: ["task-initiation", "working-memory", "organization-systems", "cognitive-load"], action: "Set up one external system this week — visual timer, wall calendar, or launch pad by the door", reason: "External scaffolding bypasses the brain's limitations entirely." },
    { area: "Emotional Recovery", dims: ["emotional-bandwidth", "identity-erosion", "burnout-signals", "giving-patterns"], action: "Do one thing this week that has nothing to do with being a mother", reason: "You can't pour from empty. Reconnecting with yourself isn't selfish — it's maintenance." },
    { area: "Nervous System Work", dims: ["nervous-system-state", "childhood-patterns", "protective-patterns"], action: "Consider trauma-informed therapy, or start with one boundary practice this week", reason: "Survival patterns won't resolve through willpower. They need a different kind of support." },
    { area: "Hormonal Awareness", dims: ["cycle-awareness", "hormonal-impact", "planning-around-cycle"], action: "Track your cycle against your capacity for one month — just notice the pattern", reason: "Awareness alone reduces shame. Planning around it reduces suffering." },
  ]

  // Score and sort
  const scored = areas.map((a) => {
    const score = a.dims.reduce((sum, dim) => sum + getIntensityVal(dim), 0)
    return { ...a, score }
  }).filter((a) => a.score >= 6) // Only include areas with meaningful strain
    .sort((a, b) => b.score - a.score)

  scored.forEach((item, idx) => {
    priorities.push({
      order: idx + 1,
      area: item.area,
      action: item.action,
      reason: item.reason,
    })
  })

  return priorities.slice(0, 5) // Top 5 priorities
}

// ============================================================
// Main Profile Generator
// ============================================================

const PATHWAY_SECTIONS_MAP: Record<string, typeof EXECUTIVE_FUNCTION_SECTIONS> = {
  "executive-function": EXECUTIVE_FUNCTION_SECTIONS,
  "depletion-burnout": DEPLETION_BURNOUT_SECTIONS,
  "sensory-overwhelm": SENSORY_OVERWHELM_SECTIONS,
  "systemic-load": SYSTEMIC_LOAD_SECTIONS,
  "hormonal-patterns": HORMONAL_PATTERNS_SECTIONS,
  "sleep-recovery": SLEEP_RECOVERY_SECTIONS,
  "trauma-nervous-system": TRAUMA_NERVOUS_SYSTEM_SECTIONS,
}

export function generateProfile(
  patternMap: PatternMap,
  pathwayResults: Record<string, { pathwayId: string; answers: Record<string, string> }>
): UserProfile {
  // Score all pathway dimensions
  const allDimensions: DimensionResult[] = []

  for (const [pathwayId, result] of Object.entries(pathwayResults)) {
    const sections = PATHWAY_SECTIONS_MAP[pathwayId]
    if (sections) {
      const dims = scoreDimensions(sections, result.answers)
      allDimensions.push(...dims)
    }
  }

  const completedPathways = Object.keys(pathwayResults)

  const narrative = buildNarrative(patternMap, allDimensions, completedPathways)
  const stackingChains = detectStackingChains(patternMap, allDimensions)
  const strengths = detectStrengths(patternMap, allDimensions)
  const leveragePoints = detectLeveragePoints(patternMap, allDimensions)
  const strategyPriority = buildStrategyPriority(patternMap, allDimensions)

  return {
    narrative,
    leveragePoints,
    stackingChains,
    strengths,
    strategyPriority,
    completedPathways,
    generatedAt: Date.now(),
  }
}
