"use client"

// Quick one-line insight per completed pathway
// Shows on the assess hub under each completed pathway card

const PATHWAY_INSIGHTS: Record<string, string> = {
  "executive-function": "Your biggest friction is task initiation, not memory. Systems over willpower.",
  "depletion-burnout": "You've been running on reserves so long that empty feels normal. It's not.",
  "sensory-overwhelm": "Your nervous system is processing at full volume with no mute button. That's real.",
  "hormonal-patterns": "Your capacity isn't random — it's cyclical. The bad weeks have a pattern.",
  "sleep-recovery": "Sleep debt isn't just tiredness. It's mimicking every other symptom on your list.",
  "trauma-nervous-system": "Your body is still running survival software from a different chapter of your life.",
  "systemic-load": "The system wasn't designed for one person to carry this much. You're not failing it — it's failing you.",
}

interface PathwayInsightBadgeProps {
  pathwaySlug: string
}

export function PathwayInsightBadge({ pathwaySlug }: PathwayInsightBadgeProps) {
  const insight = PATHWAY_INSIGHTS[pathwaySlug]
  if (!insight) return null

  return (
    <p className="text-xs text-primary/80 italic mt-2 leading-relaxed">
      {insight}
    </p>
  )
}
