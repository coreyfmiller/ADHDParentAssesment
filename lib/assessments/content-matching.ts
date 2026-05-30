// ============================================================
// Content Matching — Routes pattern map to dashboard content
// Maps dimensions/intensities to relevant toolkit sections
// ============================================================

import type { PatternMap } from "./types"

export interface ContentRecommendation {
  href: string
  title: string
  reason: string
  priority: "high" | "medium"
}

/**
 * Given a pattern map, returns prioritized content recommendations
 * from the existing dashboard toolkit sections.
 */
export function getContentRecommendations(patternMap: PatternMap): ContentRecommendation[] {
  const recommendations: ContentRecommendation[] = []
  const dims = patternMap.dimensions

  const cogLoad = dims.find((d) => d.dimension === "cognitive-load")
  const emotional = dims.find((d) => d.dimension === "emotional-bandwidth")
  const physical = dims.find((d) => d.dimension === "physical-depletion")
  const system = dims.find((d) => d.dimension === "system-friction")
  const identity = dims.find((d) => d.dimension === "identity-erosion")

  // Emergency Toolkit — for critical emotional bandwidth or physical depletion
  if (emotional?.intensity === "critical" || physical?.intensity === "critical") {
    recommendations.push({
      href: "/dashboard/toolkit",
      title: "Emergency Toolkit",
      reason: "You're at critical levels. Start here for in-the-moment support when you're about to snap or can't function.",
      priority: "high",
    })
  }

  // Scripts — for high emotional bandwidth (reactivity, repair needs)
  if (emotional?.intensity === "high" || emotional?.intensity === "critical") {
    recommendations.push({
      href: "/dashboard/scripts",
      title: "Script Library",
      reason: "Your emotional bandwidth is strained. Ready-to-use scripts for repair, boundaries, and communication can reduce the cognitive load of finding the right words.",
      priority: "high",
    })
  }

  // Daily Rhythms — for high system friction or cognitive load
  if (system?.intensity === "high" || system?.intensity === "critical" || cogLoad?.intensity === "high" || cogLoad?.intensity === "critical") {
    recommendations.push({
      href: "/dashboard/rhythms",
      title: "Daily Rhythms",
      reason: "Your daily structure needs support. Templates for high-spoon, low-spoon, and crisis days give you a framework so your brain doesn't have to plan from scratch every morning.",
      priority: "high",
    })
  }

  // Printables — for high cognitive load (visual systems)
  if (cogLoad?.intensity === "high" || cogLoad?.intensity === "critical") {
    recommendations.push({
      href: "/dashboard/printables",
      title: "Printables",
      reason: "Your working memory is maxed. Visual checklists and routine cards externalize what your brain can't hold — put them where you'll see them.",
      priority: "medium",
    })
  }

  // Guides — for identity erosion or moderate+ across multiple dimensions
  if (identity?.intensity === "high" || identity?.intensity === "critical") {
    recommendations.push({
      href: "/dashboard/guides",
      title: "Guides",
      reason: "You're losing yourself in the role. The identity and relationship guides can help you reconnect with who you are beyond 'mom.'",
      priority: "medium",
    })
  }

  // AI Coach — always relevant but especially for high/critical states
  const criticalCount = dims.filter((d) => d.intensity === "critical").length
  if (criticalCount >= 2) {
    recommendations.push({
      href: "/dashboard/coach",
      title: "AI Coach",
      reason: "Multiple areas are at critical levels. Talk it through with your coach — it knows your patterns and can help you figure out what to do first.",
      priority: "high",
    })
  }

  return recommendations
}
