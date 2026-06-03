"use client"

import { useState, useEffect } from "react"
import { Flame, X, Check, Battery, CloudRain, Trophy } from "lucide-react"
import { getActivityData, getActivitySummary, getDayDetail, getWeekSummary } from "@/lib/engagement/activity-heatmap"
import type { DayActivity, DayDetail, WeekSummary } from "@/lib/engagement/activity-heatmap"

const dayLabels = ["M", "T", "W", "T", "F", "S", "S"]
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const levelColors = [
  "bg-secondary/40",        // 0 — no activity
  "bg-primary/20",          // 1 — light
  "bg-primary/50",          // 2 — moderate
  "bg-primary",             // 3 — strong
]

const levelRing = [
  "",
  "ring-1 ring-primary/30",
  "ring-1 ring-primary/50",
  "ring-1 ring-primary/70",
]

export function ActivityHeatmap() {
  const [data, setData] = useState<DayActivity[]>([])
  const [summary, setSummary] = useState({ activeDays: 0, totalDays: 28, currentStreak: 0, longestStreak: 0 })
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const [dayDetail, setDayDetail] = useState<DayDetail | null>(null)
  const [selectedWeek, setSelectedWeek] = useState<string | null>(null)
  const [weekDetail, setWeekDetail] = useState<WeekSummary | null>(null)

  useEffect(() => {
    const activityData = getActivityData(28)
    setData(activityData)
    setSummary(getActivitySummary(activityData))
  }, [])

  const handleDayClick = (day: DayActivity) => {
    if (day.actions === 0) return
    if (selectedDay === day.date) {
      setSelectedDay(null)
      setDayDetail(null)
      return
    }
    setSelectedDay(day.date)
    setDayDetail(getDayDetail(day.date))
    setSelectedWeek(null)
    setWeekDetail(null)
  }

  const handleWeekClick = (weekStart: string) => {
    if (selectedWeek === weekStart) {
      setSelectedWeek(null)
      setWeekDetail(null)
      return
    }
    setSelectedWeek(weekStart)
    setWeekDetail(getWeekSummary(weekStart))
    setSelectedDay(null)
    setDayDetail(null)
  }

  if (data.length === 0) return null

  // Organize into weeks (rows of 7, aligned Mon-Sun)
  const weeks: DayActivity[][] = []
  for (let i = 0; i < data.length; i += 7) {
    weeks.push(data.slice(i, i + 7))
  }

  // Detect month boundaries for labels
  const monthLabels: { weekIdx: number; label: string }[] = []
  let lastMonth = -1
  weeks.forEach((week, weekIdx) => {
    const firstDay = week[0]
    if (firstDay && firstDay.month !== lastMonth) {
      monthLabels.push({ weekIdx, label: monthNames[firstDay.month] })
      lastMonth = firstDay.month
    }
  })

  const formatDayLabel = (date: string) => {
    const [y, m, d] = date.split("-").map(Number)
    const dt = new Date(y, m - 1, d)
    return dt.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })
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
      <div className="space-y-1">
        {/* Day-of-week labels */}
        <div className="grid grid-cols-[auto_1fr] gap-2">
          <div className="w-8" />
          <div className="grid grid-cols-7 gap-1.5">
            {dayLabels.map((label, i) => (
              <span key={i} className="text-[9px] text-muted-foreground/60 text-center">
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Week rows with month labels */}
        {weeks.map((week, weekIdx) => {
          const monthLabel = monthLabels.find((m) => m.weekIdx === weekIdx)
          const weekStart = week[0]?.date

          return (
            <div key={weekIdx} className="grid grid-cols-[auto_1fr] gap-2 items-center">
              {/* Month/date label */}
              <button
                onClick={() => weekStart && handleWeekClick(weekStart)}
                className={`w-8 text-[9px] text-muted-foreground/70 text-right pr-1 hover:text-primary transition-colors ${
                  selectedWeek === weekStart ? "text-primary font-medium" : ""
                }`}
              >
                {monthLabel ? monthLabel.label : week[0]?.dayOfMonth <= 7 ? monthNames[week[0].month] : `${week[0]?.dayOfMonth}`}
              </button>
              {/* Day cells */}
              <div className="grid grid-cols-7 gap-1.5">
                {week.map((day) => {
                  const isSelected = selectedDay === day.date
                  const isToday = day.date === getToday()
                  return (
                    <button
                      key={day.date}
                      onClick={() => handleDayClick(day)}
                      disabled={day.actions === 0}
                      className={`aspect-square rounded-md transition-all relative ${levelColors[day.level]} ${
                        day.actions > 0 ? "cursor-pointer hover:scale-110" : "cursor-default"
                      } ${isSelected ? "ring-2 ring-primary scale-110" : ""} ${
                        isToday ? "ring-1 ring-foreground/20" : ""
                      }`}
                    >
                      {isToday && (
                        <span className="absolute inset-0 flex items-center justify-center text-[7px] font-bold text-foreground/40">
                          •
                        </span>
                      )}
                    </button>
                  )
                })}
                {week.length < 7 && Array.from({ length: 7 - week.length }).map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square rounded-md" />
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between mt-3">
        <span className="text-[9px] text-muted-foreground/60">Tap a day or week for details</span>
        <div className="flex items-center gap-1.5">
          <span className="text-[9px] text-muted-foreground/60">Less</span>
          {levelColors.map((color, i) => (
            <div key={i} className={`w-3 h-3 rounded-sm ${color}`} />
          ))}
          <span className="text-[9px] text-muted-foreground/60">More</span>
        </div>
      </div>

      {/* Day Detail Panel */}
      {dayDetail && selectedDay && (
        <div className="mt-4 pt-4 border-t border-border/50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-foreground">{formatDayLabel(selectedDay)}</h3>
            <button
              onClick={() => { setSelectedDay(null); setDayDetail(null) }}
              className="p-1 text-muted-foreground/50 hover:text-foreground transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="space-y-2">
            {/* One Thing */}
            {dayDetail.oneThing && (
              <div className="flex items-start gap-2">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  dayDetail.oneThing.completed ? "bg-green-500/10" : "bg-secondary/50"
                }`}>
                  <Check className={`w-3 h-3 ${dayDetail.oneThing.completed ? "text-green-600" : "text-muted-foreground/40"}`} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">One Thing</p>
                  <p className={`text-sm ${dayDetail.oneThing.completed ? "text-foreground" : "text-muted-foreground line-through"}`}>
                    {dayDetail.oneThing.action}
                  </p>
                </div>
              </div>
            )}

            {/* Wins */}
            {dayDetail.wins.length > 0 && (
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Trophy className="w-3 h-3 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{dayDetail.wins.length} win{dayDetail.wins.length !== 1 ? "s" : ""} logged</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {dayDetail.wins.slice(0, 5).map((win, i) => (
                      <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-secondary/50 text-foreground/70">
                        {win}
                      </span>
                    ))}
                    {dayDetail.wins.length > 5 && (
                      <span className="text-xs text-muted-foreground">+{dayDetail.wins.length - 5} more</span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Energy */}
            {dayDetail.pulseEnergies.length > 0 && (
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-amber-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Battery className="w-3 h-3 text-amber-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Energy</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    {dayDetail.pulseEnergies.map((e, i) => (
                      <span key={i} className="text-sm font-medium text-foreground">{e}/5</span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Heavy */}
            {dayDetail.heavyThings.length > 0 && (
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-slate-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CloudRain className="w-3 h-3 text-slate-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Put down something heavy</p>
                  <p className="text-xs text-foreground/60 italic mt-0.5">&quot;{dayDetail.heavyThings[0]}&quot;</p>
                </div>
              </div>
            )}

            {/* Empty day but has data somehow */}
            {dayDetail.wins.length === 0 && !dayDetail.oneThing && dayDetail.pulseEnergies.length === 0 && dayDetail.heavyThings.length === 0 && (
              <p className="text-xs text-muted-foreground">Active but no specific details recorded.</p>
            )}
          </div>
        </div>
      )}

      {/* Week Summary Panel */}
      {weekDetail && selectedWeek && (
        <div className="mt-4 pt-4 border-t border-border/50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-foreground">
              Week of {formatWeekLabel(selectedWeek)}
            </h3>
            <button
              onClick={() => { setSelectedWeek(null); setWeekDetail(null) }}
              className="p-1 text-muted-foreground/50 hover:text-foreground transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-secondary/20 rounded-xl p-3 text-center">
              <p className="text-lg font-medium text-foreground">{weekDetail.activeDays}/7</p>
              <p className="text-[10px] text-muted-foreground">days active</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-3 text-center">
              <p className="text-lg font-medium text-foreground">{weekDetail.totalWins}</p>
              <p className="text-[10px] text-muted-foreground">wins logged</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-3 text-center">
              <p className="text-lg font-medium text-foreground">{weekDetail.oneThingCompleted}/7</p>
              <p className="text-[10px] text-muted-foreground">one things done</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-3 text-center">
              <p className="text-lg font-medium text-foreground">
                {weekDetail.avgEnergy ? `${weekDetail.avgEnergy.toFixed(1)}` : "—"}
              </p>
              <p className="text-[10px] text-muted-foreground">avg energy</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ---- Helpers ----

function getToday(): string {
  const d = new Date()
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

function formatWeekLabel(weekStart: string): string {
  const [y, m, d] = weekStart.split("-").map(Number)
  const start = new Date(y, m - 1, d)
  const end = new Date(y, m - 1, d + 6)
  const opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" }
  return `${start.toLocaleDateString("en-US", opts)} – ${end.toLocaleDateString("en-US", opts)}`
}
