// ============================================================
// Pattern Map Scoring & Pathway Routing Logic
// ============================================================

import type { DimensionScore, PatternMap, PathwayRecommendation } from "./types"
import { SNAPSHOT_SECTIONS } from "./overwhelm-snapshot"

const DIMENSION_LABELS: Record<string, { label: string; descriptions: Record<string, string> }> = {
  "cognitive-load": {
    label: "Cognitive Load",
    descriptions: {
      low: "Your mental bandwidth is holding up. You have systems or capacity that keep the noise manageable.",
      moderate: "Your brain is working harder than it should. Things slip through, but you're catching most of them.",
      high: "Your working memory is maxed out. You're forgetting things, losing track, and the mental noise is constant.",
      critical: "Your cognitive system is in overload. The fog, the forgetting, the inability to plan — this isn't laziness. Your brain is drowning in demand.",
    },
  },
  "emotional-bandwidth": {
    label: "Emotional Bandwidth",
    descriptions: {
      low: "You have emotional capacity to spare. You can hold space for others without losing yourself.",
      moderate: "You're managing, but your fuse is shorter than you'd like. Recovery takes longer than it used to.",
      high: "You're emotionally depleted. Reactivity, guilt cycling, and numbness are showing up regularly.",
      critical: "Your emotional system is running on fumes. You're either numb or explosive — there's no middle ground left.",
    },
  },
  "physical-depletion": {
    label: "Physical Depletion",
    descriptions: {
      low: "Your body is holding up. You have energy and you're taking care of yourself.",
      moderate: "You're tired but functional. The body is sending signals, but you're managing.",
      high: "Your body is telling you something is unsustainable. Exhaustion, tension, and illness are becoming patterns.",
      critical: "You're physically breaking down. The depletion has gone past tiredness into something your body can't recover from without real change.",
    },
  },
  "system-friction": {
    label: "System Friction",
    descriptions: {
      low: "Your daily life has structure that supports you. Routines carry you through most days.",
      moderate: "You have some structure, but it's fragile. Disruptions knock you off course.",
      high: "Your daily life is mostly reactive. There's little structure to fall back on when things get hard.",
      critical: "There's no safety net. Every day is improvised, unsupported, and exhausting to navigate.",
    },
  },
  "identity-erosion": {
    label: "Identity & Self",
    descriptions: {
      low: "You still feel like yourself. Motherhood is part of your identity, not all of it.",
      moderate: "You're losing touch with who you are outside of 'mom.' There are glimpses, but they're fading.",
      high: "You've lost yourself in the role. Resentment, grief, and disconnection from your own needs are building.",
      critical: "You don't recognize yourself anymore. The person you were feels gone, and you don't know how to get her back.",
    },
  },
}

function getIntensity(score: number, maxScore: number): "low" | "moderate" | "high" | "critical" {
  const ratio = score / maxScore
  if (ratio <= 0.3) return "low"
  if (ratio <= 0.55) return "moderate"
  if (ratio <= 0.8) return "high"
  return "critical"
}

export function calculatePatternMap(answers: Record<string, string>): PatternMap {
  const dimensionScores: Record<string, number> = {
    "cognitive-load": 0,
    "emotional-bandwidth": 0,
    "physical-depletion": 0,
    "system-friction": 0,
    "identity-erosion": 0,
  }

  // Calculate scores from answers
  for (const section of SNAPSHOT_SECTIONS) {
    for (const question of section.questions) {
      const answerId = answers[question.id]
      if (!answerId) continue

      const option = question.options.find((o) => o.id === answerId)
      if (!option?.dimensions) continue

      for (const [dim, score] of Object.entries(option.dimensions)) {
        dimensionScores[dim] = (dimensionScores[dim] || 0) + score
      }
    }
  }

  // Build dimension results
  const maxPerDimension = 12 // 3 questions × max score of 4
  const dimensions: DimensionScore[] = Object.entries(dimensionScores).map(([dim, score]) => {
    const intensity = getIntensity(score, maxPerDimension)
    const meta = DIMENSION_LABELS[dim]
    return {
      dimension: dim,
      label: meta.label,
      score,
      maxScore: maxPerDimension,
      intensity,
      description: meta.descriptions[intensity],
    }
  })

  // Generate pathway recommendations based on pattern
  const recommendations = generateRecommendations(dimensions)

  return {
    dimensions,
    recommendedPathways: recommendations,
    timestamp: Date.now(),
  }
}

function generateRecommendations(dimensions: DimensionScore[]): PathwayRecommendation[] {
  const recommendations: PathwayRecommendation[] = []

  const cogLoad = dimensions.find((d) => d.dimension === "cognitive-load")!
  const emotional = dimensions.find((d) => d.dimension === "emotional-bandwidth")!
  const physical = dimensions.find((d) => d.dimension === "physical-depletion")!
  const system = dimensions.find((d) => d.dimension === "system-friction")!
  const identity = dimensions.find((d) => d.dimension === "identity-erosion")!

  // Executive Function — triggered by high cognitive load or system friction
  if (cogLoad.intensity === "high" || cogLoad.intensity === "critical" || system.intensity === "high" || system.intensity === "critical") {
    recommendations.push({
      pathwayId: "executive-function",
      slug: "executive-function",
      title: "Executive Function & Daily Life",
      reason: cogLoad.intensity === "critical"
        ? "Your cognitive load is at critical levels. This pathway will help you understand why your brain struggles with planning, memory, and task initiation — and give you systems that actually work."
        : "Your brain is working overtime to manage daily life. This pathway explores how executive function differences affect your routines, memory, and ability to keep up.",
      priority: cogLoad.intensity === "critical" || system.intensity === "critical" ? "high" : "medium",
      icon: "Brain",
      color: "bg-purple-500/10 text-purple-600",
    })
  }

  // Depletion & Burnout — triggered by physical depletion or emotional bandwidth issues
  if (physical.intensity === "high" || physical.intensity === "critical" || emotional.intensity === "high" || emotional.intensity === "critical") {
    recommendations.push({
      pathwayId: "depletion-burnout",
      slug: "depletion-burnout",
      title: "Depletion & Burnout",
      reason: physical.intensity === "critical"
        ? "Your body is sending urgent signals. This pathway helps you understand the difference between 'tired' and 'depleted' — and what genuine recovery looks like."
        : "You're running on less than you need. This pathway explores where your energy is going and why rest isn't reaching you.",
      priority: physical.intensity === "critical" || emotional.intensity === "critical" ? "high" : "medium",
      icon: "Battery",
      color: "bg-amber-500/10 text-amber-600",
    })
  }

  // Sensory & Overwhelm — triggered by emotional reactivity + physical depletion combo
  if ((emotional.intensity === "high" || emotional.intensity === "critical") && (physical.intensity !== "low")) {
    recommendations.push({
      pathwayId: "sensory-overwhelm",
      slug: "sensory-overwhelm",
      title: "Sensory & Overwhelm",
      reason: "Your emotional reactivity combined with physical depletion suggests your nervous system may be hitting capacity. This pathway maps your sensory triggers and overwhelm patterns.",
      priority: emotional.intensity === "critical" ? "high" : "medium",
      icon: "Volume2",
      color: "bg-rose-500/10 text-rose-600",
    })
  }

  // Systemic Load — triggered by system friction + identity erosion
  if (system.intensity === "high" || system.intensity === "critical" || identity.intensity === "high" || identity.intensity === "critical") {
    recommendations.push({
      pathwayId: "systemic-load",
      slug: "systemic-load",
      title: "Systemic Load",
      reason: identity.intensity === "critical"
        ? "You've lost yourself in the demands of a system that asks too much. This pathway validates that the problem isn't you — it's the structure around you."
        : "The friction in your daily life points to structural gaps — support, division of labor, or systems that weren't built for your brain.",
      priority: identity.intensity === "critical" ? "high" : "medium",
      icon: "Users",
      color: "bg-emerald-500/10 text-emerald-600",
    })
  }

  // Trauma & Nervous System — triggered by high emotional bandwidth + identity erosion
  if (emotional.intensity === "critical" && identity.intensity !== "low") {
    recommendations.push({
      pathwayId: "trauma-nervous-system",
      slug: "trauma-nervous-system",
      title: "Trauma & Nervous System",
      reason: "The depth of your emotional depletion and identity loss may have roots beyond current circumstances. This pathway gently explores whether survival patterns from your own history are still running.",
      priority: "medium",
      icon: "Shield",
      color: "bg-teal-500/10 text-teal-600",
    })
  }

  // Hormonal Patterns — triggered by physical depletion + emotional bandwidth combo
  if (physical.intensity !== "low" && emotional.intensity !== "low" && (physical.intensity === "high" || emotional.intensity === "high")) {
    recommendations.push({
      pathwayId: "hormonal-patterns",
      slug: "hormonal-patterns",
      title: "Hormonal Patterns",
      reason: "Your combination of physical depletion and emotional fluctuation may have a cyclical component. This pathway helps you see whether hormonal shifts are amplifying your other patterns.",
      priority: "low",
      icon: "Moon",
      color: "bg-indigo-500/10 text-indigo-600",
    })
  }

  // Sleep & Recovery — triggered by high physical depletion
  if (physical.intensity === "high" || physical.intensity === "critical") {
    recommendations.push({
      pathwayId: "sleep-recovery",
      slug: "sleep-recovery",
      title: "Sleep & Recovery",
      reason: physical.intensity === "critical"
        ? "Your physical depletion is critical. Sleep deprivation alone can mimic ADHD, worsen burnout, and destroy emotional regulation. This may be the highest-leverage pathway for you."
        : "Your body isn't recovering. This pathway explores whether sleep disruption is compounding your other struggles.",
      priority: physical.intensity === "critical" ? "high" : "medium",
      icon: "CloudMoon",
      color: "bg-sky-500/10 text-sky-600",
    })
  }

  // If nothing triggered (all low/moderate), recommend Executive Function as a starting point
  if (recommendations.length === 0) {
    recommendations.push({
      pathwayId: "executive-function",
      slug: "executive-function",
      title: "Executive Function & Daily Life",
      reason: "Your overall pattern looks manageable — but there's always room to understand your brain better. Start here to explore how your executive function shapes your daily life.",
      priority: "low",
      icon: "Brain",
      color: "bg-purple-500/10 text-purple-600",
    })
  }

  // Sort by priority
  const priorityOrder = { high: 0, medium: 1, low: 2 }
  recommendations.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])

  return recommendations
}
