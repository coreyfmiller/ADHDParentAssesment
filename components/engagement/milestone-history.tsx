"use client"

import { useState, useEffect } from "react"
import { Award, Trophy, Flame, Heart, Brain } from "lucide-react"
import { getAchievedMilestones } from "@/lib/engagement/milestones"
import type { Milestone } from "@/lib/engagement/milestones"

const typeIcons: Record<string, React.ElementType> = {
  wins: Trophy,
  streak: Flame,
  pulse: Heart,
  archetype: Brain,
  time: Award,
}

const typeColors: Record<string, string> = {
  wins: "bg-amber-500/10 text-amber-600",
  streak: "bg-orange-500/10 text-orange-600",
  pulse: "bg-pink-500/10 text-pink-600",
  archetype: "bg-violet-500/10 text-violet-600",
  time: "bg-primary/10 text-primary",
}

export function MilestoneHistory() {
  const [milestones, setMilestones] = useState<Milestone[]>([])

  useEffect(() => {
    setMilestones(getAchievedMilestones())
  }, [])

  if (milestones.length === 0) return null

  return (
    <section className="bg-card rounded-2xl p-6 border border-border">
      <div className="flex items-center gap-2 mb-4">
        <Award className="w-5 h-5 text-primary" />
        <h2 className="text-base font-medium text-foreground">Milestones Earned</h2>
        <span className="text-xs text-muted-foreground ml-auto">{milestones.length} earned</span>
      </div>
      <div className="space-y-2">
        {milestones.map((milestone) => {
          const Icon = typeIcons[milestone.type] || Award
          const color = typeColors[milestone.type] || "bg-primary/10 text-primary"
          return (
            <div key={milestone.id} className="flex items-start gap-3 p-3 rounded-xl bg-secondary/20">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground">{milestone.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{milestone.message}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
