"use client"

import { useState, useEffect } from "react"
import { Award, X } from "lucide-react"
import { checkForNewMilestone, dismissMilestone } from "@/lib/engagement/milestones"
import type { Milestone } from "@/lib/engagement/milestones"

export function MilestoneToast() {
  const [milestone, setMilestone] = useState<Milestone | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Check for milestones after a short delay (let the page load first)
    const timer = setTimeout(() => {
      const newMilestone = checkForNewMilestone()
      if (newMilestone) {
        setMilestone(newMilestone)
        setVisible(true)
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleDismiss = () => {
    if (milestone) {
      dismissMilestone(milestone.id)
    }
    setVisible(false)
    // Check for another milestone after dismissing
    setTimeout(() => {
      const next = checkForNewMilestone()
      if (next) {
        setMilestone(next)
        setVisible(true)
      }
    }, 500)
  }

  if (!visible || !milestone) return null

  return (
    <div className="fixed bottom-6 left-4 right-4 z-50 flex justify-center animate-in slide-in-from-bottom-4 fade-in duration-500">
      <div className="bg-card rounded-2xl border border-primary/20 shadow-lg max-w-md w-full overflow-hidden">
        <div className="p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Award className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-medium text-primary">{milestone.title}</h3>
                <button
                  onClick={handleDismiss}
                  className="p-1 text-muted-foreground/50 hover:text-foreground transition-colors flex-shrink-0"
                  aria-label="Dismiss"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed mt-1">
                {milestone.message}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
