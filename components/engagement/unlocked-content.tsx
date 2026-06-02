"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Unlock, ArrowRight } from "lucide-react"

interface UnlockedItem {
  title: string
  description: string
  href: string
  pathway: string
  type: "toolkit" | "script" | "guide" | "rhythm"
}

// Content recommendations mapped to pathway completion
const PATHWAY_UNLOCKS: Record<string, UnlockedItem[]> = {
  "executive-function": [
    { title: "I Can't Start", description: "Task initiation emergency intervention — when your body won't move", href: "/dashboard/toolkit", pathway: "Executive Function", type: "toolkit" },
    { title: "I Forgot Something Important", description: "The shame spiral stopper + system patches", href: "/dashboard/toolkit", pathway: "Executive Function", type: "toolkit" },
    { title: "I Can't Make a Decision", description: "Decision fatigue protocol — when your brain can't choose", href: "/dashboard/toolkit", pathway: "Executive Function", type: "toolkit" },
    { title: "Daily Rhythms", description: "High-spoon, low-spoon, and crisis day templates built for executive function differences", href: "/dashboard/rhythms", pathway: "Executive Function", type: "rhythm" },
  ],
  "depletion-burnout": [
    { title: "Low-Spoon Day Template", description: "Survival-mode structure for days when capacity is at minimum", href: "/dashboard/rhythms", pathway: "Depletion & Burnout", type: "rhythm" },
    { title: "I Feel Like a Terrible Mother", description: "The shame spiral intervention — Neff's self-compassion framework", href: "/dashboard/toolkit", pathway: "Depletion & Burnout", type: "toolkit" },
    { title: "I Need to Be Alone But Can't", description: "Micro-solitude strategies when you're trapped in proximity", href: "/dashboard/toolkit", pathway: "Depletion & Burnout", type: "toolkit" },
  ],
  "sensory-overwhelm": [
    { title: "Everything Is Too Loud / Too Much", description: "Sensory overload emergency protocol — proprioceptive reset", href: "/dashboard/toolkit", pathway: "Sensory & Overwhelm", type: "toolkit" },
    { title: "I'm Touched Out", description: "Boundary scripts when your body needs space", href: "/dashboard/toolkit", pathway: "Sensory & Overwhelm", type: "toolkit" },
    { title: "Bedtime Is Falling Apart", description: "End-of-day depletion protocol — the 'boring parent' technique", href: "/dashboard/toolkit", pathway: "Sensory & Overwhelm", type: "toolkit" },
  ],
  "hormonal-patterns": [
    { title: "The Hormonal Connection Guide", description: "How your cycle affects executive function and why some weeks are harder", href: "/dashboard/guides/hormonal-connection", pathway: "Hormonal Patterns", type: "guide" },
    { title: "Sleep & The Overwhelmed Brain", description: "Why your brain resists bedtime + racing-mind toolkit", href: "/dashboard/guides/sleep-and-the-brain", pathway: "Hormonal Patterns", type: "guide" },
  ],
  "sleep-recovery": [
    { title: "Sleep & The Overwhelmed Brain Guide", description: "Revenge bedtime procrastination, racing mind, and realistic strategies", href: "/dashboard/guides/sleep-and-the-brain", pathway: "Sleep & Recovery", type: "guide" },
    { title: "Crisis Day Template", description: "For the days after terrible nights — bare minimum priorities", href: "/dashboard/rhythms", pathway: "Sleep & Recovery", type: "rhythm" },
  ],
  "trauma-nervous-system": [
    { title: "I'm Zoning Out / Checked Out", description: "Dorsal vagal shutdown protocol — gentle re-orientation", href: "/dashboard/toolkit", pathway: "Trauma & Nervous System", type: "toolkit" },
    { title: "I'm in a Rage Spiral", description: "Amygdala hijack de-escalation — when the thinking brain is offline", href: "/dashboard/toolkit", pathway: "Trauma & Nervous System", type: "toolkit" },
    { title: "I'm Crying and Can't Stop", description: "Emotional flooding containment — vagal activation protocol", href: "/dashboard/toolkit", pathway: "Trauma & Nervous System", type: "toolkit" },
  ],
  "systemic-load": [
    { title: "The Relationship Maintenance Guide", description: "Division of labor, recurring arguments, explaining your brain to your partner", href: "/dashboard/guides/relationship-maintenance", pathway: "Systemic Load", type: "guide" },
    { title: "Reclaiming Your Identity Guide", description: "Who you were before kids — the guilt of wanting time alone", href: "/dashboard/guides/reclaiming-identity", pathway: "Systemic Load", type: "guide" },
    { title: "The No-Decision Meal System", description: "Stop deciding what's for dinner — your editable weekly rotation", href: "/dashboard/rhythms", pathway: "Systemic Load", type: "rhythm" },
  ],
}

const TYPE_LABELS: Record<string, string> = {
  toolkit: "Emergency Tool",
  script: "Script",
  guide: "Deep Guide",
  rhythm: "Daily Rhythm",
}

const TYPE_COLORS: Record<string, string> = {
  toolkit: "bg-red-500/10 text-red-600",
  script: "bg-blue-500/10 text-blue-600",
  guide: "bg-purple-500/10 text-purple-600",
  rhythm: "bg-amber-500/10 text-amber-600",
}

interface UnlockedContentProps {
  completedPathways: string[]
}

export function UnlockedContent({ completedPathways }: UnlockedContentProps) {
  const [items, setItems] = useState<UnlockedItem[]>([])

  useEffect(() => {
    const unlocked: UnlockedItem[] = []
    for (const pathway of completedPathways) {
      const pathwayItems = PATHWAY_UNLOCKS[pathway]
      if (pathwayItems) {
        unlocked.push(...pathwayItems)
      }
    }
    // Deduplicate by href
    const seen = new Set<string>()
    const unique = unlocked.filter((item) => {
      if (seen.has(item.href + item.title)) return false
      seen.add(item.href + item.title)
      return true
    })
    setItems(unique)
  }, [completedPathways])

  if (items.length === 0) return null

  return (
    <div className="bg-card rounded-3xl p-8 shadow-sm border border-border">
      <div className="flex items-center gap-2 mb-2">
        <Unlock className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-medium text-foreground">Unlocked For You</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        Based on the pathways you&apos;ve explored, these tools are specifically relevant to your patterns. You don&apos;t need to use them all — just the ones that resonate.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {items.slice(0, 8).map((item, idx) => (
          <Link
            key={idx}
            href={item.href}
            className="group p-4 rounded-xl bg-secondary/20 border border-border/50 hover:border-primary/20 hover:bg-secondary/30 transition-all"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${TYPE_COLORS[item.type]}`}>
                {TYPE_LABELS[item.type]}
              </span>
              <span className="text-[10px] text-muted-foreground">via {item.pathway}</span>
            </div>
            <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
              {item.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{item.description}</p>
          </Link>
        ))}
      </div>
      {items.length > 8 && (
        <p className="text-xs text-muted-foreground text-center mt-4">
          + {items.length - 8} more tools available in your toolkit
        </p>
      )}
    </div>
  )
}
