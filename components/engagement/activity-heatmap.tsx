"use client"

import { useState, useEffect } from "react"
import { Flame } from "lucide-react"
import { getActivityData, getActivitySummary } from "@/lib/engagement/activity-heatmap"
import type { DayActivity } from "@/lib/engagement/activity-heatmap"

const dayLabels = ["M", "T", "W", "T", "F", "S", "S"]

const levelColors = [
  "bg-secondary/40",        // 0 — no activity
  "bg-primary/20",          // 1 — light
  "bg-primary/50",          // 2 — moderate
  "bg-primary",             // 3 — strong
]

export function ActivityHeatmap() {
  const [data, setData] = useState<DayActivity[]>([])
  const [summary, setSummary] = useState({ activeDays: 0, totalDays: 30, currentStreak: 0, longestStreak: 0 })

  useEffect(() => {
    const activityData = getActivityData(28) // 4 full weeks
    setData(activityData)
    setSummary(getActivitySummary(activityData))
  }, [])

  if (data.length === 0) return null

  // Organize into weeks (rows of 7)
  const weeks: DayActivity[][] = []
  for (let i = 0; i < data.length; i += 7) {
    weeks.push(data.slice(i, i + 7))
  }

  return (
    <div className="bg-card rounded-2xl border border-border p-4 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Your last 4 weeks
          </h2>
          <p className="text-sm text-foreground mt-0.5">
            <span className="font-medium">{summary.activeDays}</span>
            <span className="text-muted-foreground"> of {summary.totalDays} days active</span>
          </p>
        </div>
        {summary.currentStreak > 1 && (
          <span className="flex items-center gap-1 text-xs text-amber-600 font-medium bg-amber-50 px-2 py-1 rounded-lg">
            <Flame className="w-3 h-3" />
            {summary.currentStreak} day streak
          </span>
        )}
      </div>

      {/* Grid */}
      <div className="space-y-1.5">
        {/* Day labels */}
        <div className="grid grid-cols-7 gap-1.5">
          {dayLabels.map((label, i) => (
            <span key={i} className="text-[9px] text-muted-foreground/60 text-center">
              {label}
            </span>
          ))}
        </div>
        {/* Week rows */}
        {weeks.map((week, weekIdx) => (
          <div key={weekIdx} className="grid grid-cols-7 gap-1.5">
            {week.map((day) => (
              <div
                key={day.date}
                className={`aspect-square rounded-md ${levelColors[day.level]} transition-colors`}
                title={`${day.date}: ${day.actions} action${day.actions !== 1 ? "s" : ""}`}
              />
            ))}
            {/* Fill remaining cells if week is incomplete */}
            {week.length < 7 && Array.from({ length: 7 - week.length }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square rounded-md" />
            ))}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end gap-1.5 mt-3">
        <span className="text-[9px] text-muted-foreground/60">Less</span>
        {levelColors.map((color, i) => (
          <div key={i} className={`w-3 h-3 rounded-sm ${color}`} />
        ))}
        <span className="text-[9px] text-muted-foreground/60">More</span>
      </div>
    </div>
  )
}
