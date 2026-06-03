"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Compass, BookOpen, Clock, Check, ArrowRight } from "lucide-react"
import type { PatternMap } from "@/lib/assessments/types"
import { getContentRecommendations, type ContentRecommendation } from "@/lib/assessments/content-matching"
import { getCurrentArchetype, determineArchetype, saveArchetype } from "@/lib/archetypes"
import type { Archetype } from "@/lib/archetypes"

// Engagement components
import { IdentityAnchorCard } from "@/components/engagement/identity-anchor-card"
import { PulseCheckin } from "@/components/engagement/pulse-checkin"
import { OneThingInteractive } from "@/components/engagement/one-thing-interactive"
import { MicroWinLogger } from "@/components/engagement/micro-win-logger"
import { WhatsHeavy } from "@/components/engagement/whats-heavy"
import { EvidenceJournalCard } from "@/components/engagement/evidence-journal-card"
import { TimeCapsuleWidget } from "@/components/engagement/time-capsule"
import { WhatWorkedTracker } from "@/components/engagement/what-worked-tracker"
import { MilestoneToast } from "@/components/engagement/milestone-toast"
import { ProactiveCoachMessage } from "@/components/engagement/proactive-coach-message"
import { ActivityHeatmap } from "@/components/engagement/activity-heatmap"
import { WhatsHardThisWeek } from "@/components/engagement/whats-hard-this-week"
import { WeeklyRecap } from "@/components/engagement/weekly-recap"
import { EveningRecap } from "@/components/engagement/evening-recap"
import { PatternMapFlower } from "@/components/pattern-map-flower"
import { getDailyAIContent, getCachedDailyContent } from "@/lib/engagement/daily-ai"
import type { DailyAIContent } from "@/lib/engagement/daily-ai"
import { getTodaysGuide, markGuideRead, getReadGuideIds, CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/micro-guides"
import type { MicroGuide } from "@/lib/micro-guides"

const sections = [
  {
    href: "/dashboard/coach",
    image: "/images/sitting3.png",
    title: "AI Parenting Coach",
    description: "Talk through what's happening right now. Personalized support for the hard moments.",
  },
  {
    href: "/dashboard/toolkit",
    image: "/images/deepbreath.png",
    title: "Emergency Toolkit",
    description: "In-the-moment support when you're about to snap, just snapped, or can't start.",
  },
  {
    href: "/dashboard/scripts",
    image: "/images/script.png",
    title: "Script Library",
    description: "Ready-to-use words for repair, boundaries, partner conversations, and more.",
  },
  {
    href: "/dashboard/rhythms",
    image: "/images/flowing4.png",
    title: "Daily Rhythms",
    description: "Templates for high-spoon, low-spoon, and crisis days. Plus the meal system.",
  },
  {
    href: "/dashboard/guides",
    image: "/images/mind3.png",
    title: "Guides",
    description: "Deep dives: seasonal survival, relationships, hormones, sleep, and identity.",
  },
  {
    href: "/dashboard/printables",
    image: "/images/checklist.png",
    title: "Checklists",
    description: "Interactive routines, grocery lists, and tools designed for ADHD brains.",
  },
]

export default function DashboardPage() {
  const [patternMap, setPatternMap] = useState<PatternMap | null>(null)
  const [contentRecs, setContentRecs] = useState<ContentRecommendation[]>([])
  const [archetype, setArchetype] = useState<Archetype | null>(null)
  const [dailyGuide, setDailyGuide] = useState<MicroGuide | null>(null)
  const [guideRead, setGuideRead] = useState(false)
  const [completedWidgets, setCompletedWidgets] = useState<Set<string>>(new Set())
  const [aiContent, setAiContent] = useState<DailyAIContent | null>(null)
  const [mapView, setMapView] = useState<"flower" | "bars">("flower")

  useEffect(() => {
    try {
      const stored = localStorage.getItem("mindful-mama-pattern-map")
      let map: PatternMap | null = null
      let arch: Archetype | null = null

      if (stored) {
        map = JSON.parse(stored) as PatternMap
        setPatternMap(map)
        setContentRecs(getContentRecommendations(map))

        arch = getCurrentArchetype()
        if (!arch) {
          arch = determineArchetype(map)
          saveArchetype(arch)
        }
        setArchetype(arch)
      }

      // Get today's micro-guide
      const guide = getTodaysGuide(map, arch)
      setDailyGuide(guide)
      const isGuideRead = getReadGuideIds().includes(guide.id)
      setGuideRead(isGuideRead)

      // Check which widgets have been completed today
      const done = new Set<string>()
      const now = new Date()
      const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`

      // One Thing
      try {
        const oneThingData = localStorage.getItem("mindful-mama-one-thing-history")
        if (oneThingData) {
          const history = JSON.parse(oneThingData)
          const todayEntry = history.find((e: { date: string; completed: boolean }) => e.date === today)
          if (todayEntry?.completed) done.add("one-thing")
        }
      } catch {}

      // Pulse Check-In
      try {
        const pulseData = localStorage.getItem("mindful-mama-pulse-checkins")
        if (pulseData) {
          const pulses = JSON.parse(pulseData)
          const todayPulse = pulses.find((p: { date: string }) => p.date === today)
          if (todayPulse?.entries?.length > 0) done.add("pulse")
        }
      } catch {}

      // Micro-Guide read
      if (isGuideRead) done.add("micro-guide")

      setCompletedWidgets(done)
    } catch {}
  }, [])

  // Daily AI content — one call per day, cached
  useEffect(() => {
    // Check cache synchronously first
    const cached = getCachedDailyContent()
    if (cached) {
      setAiContent(cached)
      return
    }

    // Make the API call (only if no cache for today)
    getDailyAIContent(patternMap, archetype).then((content) => {
      if (content) setAiContent(content)
    })
  }, [patternMap, archetype])

  // Determine the first incomplete widget to highlight
  const widgetOrder = ["one-thing", "micro-guide", "pulse"]
  const firstIncomplete = widgetOrder.find((w) => !completedWidgets.has(w)) || null

  return (
    <div className="space-y-4">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-medium text-foreground mb-1">Welcome back</h1>
        <p className="text-sm text-muted-foreground">
          Your parenting toolkit — built for how your brain actually works.
        </p>
      </div>

      {/* Archetype badge — prominent, tappable */}
      {archetype && (
        <Link
          href="/dashboard/me"
          className="block bg-card rounded-2xl overflow-hidden border border-primary/15 hover:border-primary/30 transition-all group"
        >
          <div className="aspect-[3.2/1] relative bg-secondary/20">
            <Image
              src="/images/glowingseed.png"
              alt="Your type"
              fill
              className="object-cover object-[center_40%]"
            />
          </div>
          <div className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                <span className="text-base">✦</span>
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Your type</p>
                <p className="text-base font-medium text-foreground group-hover:text-primary transition-colors">
                  {archetype.name}
                </p>
              </div>
              <span className="text-xs text-primary">
                View →
              </span>
            </div>
          </div>
        </Link>
      )}

      {/* Evening Recap — shows after 6pm with day's evidence */}
      <EveningRecap />

      {/* One Thing Today — the daily anchor action */}
      <div className={`transition-all duration-300 ${completedWidgets.has("one-thing") ? "opacity-60" : ""} ${firstIncomplete === "one-thing" ? "ring-2 ring-primary/20 rounded-2xl" : ""}`}>
        {firstIncomplete === "one-thing" && (
          <p className="text-[10px] font-medium text-primary uppercase tracking-wide mb-1 flex items-center gap-1 px-1">
            <ArrowRight className="w-3 h-3" /> Start here
          </p>
        )}
        <OneThingInteractive patternMap={patternMap} aiOneThing={aiContent?.oneThing} />
      </div>

      {/* What's Hard This Week — anticipatory support */}
      <WhatsHardThisWeek />

      {/* Proactive Coach Message — the coach reaches out first */}
      <ProactiveCoachMessage patternMap={patternMap} archetype={archetype} />

      {/* Weekly Recap — AI-generated summary, shows Sun/Mon only */}
      <WeeklyRecap />

      {/* Today's Micro-Guide */}
      {dailyGuide && (
        <div className={`transition-all duration-300 ${completedWidgets.has("micro-guide") ? "opacity-60" : ""} ${firstIncomplete === "micro-guide" ? "ring-2 ring-primary/20 rounded-2xl" : ""}`}>
          {firstIncomplete === "micro-guide" && (
            <p className="text-[10px] font-medium text-primary uppercase tracking-wide mb-1 flex items-center gap-1 px-1">
              <ArrowRight className="w-3 h-3" /> Up next
            </p>
          )}
          <Link
            href="/dashboard/micro-guides"
            className="block bg-card rounded-2xl border border-border hover:border-primary/20 transition-all overflow-hidden group"
          >
            <div className="p-4">
              <div className="flex items-center gap-2 mb-1.5">
                <BookOpen className="w-3.5 h-3.5 text-primary" />
                <span className="text-[10px] font-medium text-primary uppercase tracking-wide">{guideRead ? "Done — you learned something today" : "Today\u0027s learn"}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${CATEGORY_COLORS[dailyGuide.category]}`}>
                  {CATEGORY_LABELS[dailyGuide.category]}
                </span>
                <span className="text-[10px] text-muted-foreground ml-auto flex items-center gap-0.5">
                  <Clock className="w-2.5 h-2.5" />
                  {dailyGuide.readTime}
                </span>
              </div>
              <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                {dailyGuide.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">{dailyGuide.subtitle}</p>
            </div>
          </Link>
        </div>
      )}

      {/* Daily Identity Anchor — first thing she sees */}
      <IdentityAnchorCard patternMap={patternMap} aiAnchor={aiContent?.anchor} />

      {/* Pulse Check-In — contextual based on time of day */}
      <div className={`transition-all duration-300 ${completedWidgets.has("pulse") ? "opacity-60" : ""} ${firstIncomplete === "pulse" ? "ring-2 ring-primary/20 rounded-2xl" : ""}`}>
        {firstIncomplete === "pulse" && (
          <p className="text-[10px] font-medium text-primary uppercase tracking-wide mb-1 flex items-center gap-1 px-1">
            <ArrowRight className="w-3 h-3" /> Up next
          </p>
        )}
        <PulseCheckin patternMap={patternMap} />
      </div>

      {/* Micro-Win Logger — always accessible */}
      <MicroWinLogger patternMap={patternMap} />

      {/* What's Heavy — emotional release valve */}
      <WhatsHeavy patternMap={patternMap} />

      {/* Time Capsule — letter to future self */}
      <TimeCapsuleWidget />

      {/* What Worked — personal strategy playbook */}
      <WhatWorkedTracker />

      {/* Activity Heatmap — visual proof of showing up */}
      <ActivityHeatmap />

      {/* Pattern Map Summary or CTA */}
      {patternMap ? (
        <div className="space-y-3">
          <div className="bg-card rounded-2xl p-6 border border-primary/20">
            <div className="flex items-center justify-between mb-4">
              <Link href="/assess" className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Compass className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                    Your Pattern Map
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    {patternMap.recommendedPathways.length} pathway{patternMap.recommendedPathways.length !== 1 ? "s" : ""} recommended
                  </p>
                </div>
              </Link>
              {/* View toggle */}
              <div className="flex items-center gap-1 bg-secondary/50 rounded-lg p-0.5">
                <button
                  onClick={() => setMapView("flower")}
                  className={`px-2 py-1 rounded-md text-[10px] font-medium transition-colors ${
                    mapView === "flower" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Flower
                </button>
                <button
                  onClick={() => setMapView("bars")}
                  className={`px-2 py-1 rounded-md text-[10px] font-medium transition-colors ${
                    mapView === "bars" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Bars
                </button>
              </div>
            </div>

            {mapView === "flower" ? (
              <div className="flex justify-center py-2">
                <PatternMapFlower dimensions={patternMap.dimensions} size={240} />
              </div>
            ) : (
              <div className="grid grid-cols-5 gap-2">
                {patternMap.dimensions.map((dim) => (
                  <div key={dim.dimension} className="space-y-1">
                    <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          dim.intensity === "critical" ? "bg-red-500" :
                          dim.intensity === "high" ? "bg-amber-500" :
                          dim.intensity === "moderate" ? "bg-yellow-500" :
                          "bg-green-500"
                        }`}
                        style={{ width: `${(dim.score / dim.maxScore) * 100}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-muted-foreground truncate">{dim.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <Link
            href="/assess/snapshot"
            className="block bg-secondary/20 rounded-xl p-4 border border-border/50 hover:border-primary/20 transition-all text-center"
          >
            <p className="text-sm text-muted-foreground">
              Patterns shift with seasons and life changes. <span className="text-primary font-medium">Check in again →</span>
            </p>
          </Link>
        </div>
      ) : (
        <Link
          href="/assess"
          className="block bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 border border-primary/20 hover:border-primary/40 transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Compass className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                Check In With Yourself
              </h2>
              <p className="text-sm text-muted-foreground">
                5 minutes to understand where your energy is going — and what to do about it.
              </p>
            </div>
          </div>
        </Link>
      )}

      {/* Evidence Journal — weekly summary */}
      <EvidenceJournalCard patternMap={patternMap} />

      {/* Personalized Recommendations */}
      {contentRecs.length > 0 && (
        <div>
          <h2 className="text-sm font-medium text-primary uppercase tracking-wide mb-3">
            Recommended for you right now
          </h2>
          <div className="space-y-2">
            {contentRecs.filter(r => r.priority === "high").slice(0, 3).map((rec) => (
              <Link
                key={rec.href}
                href={rec.href}
                className="block bg-primary/5 rounded-xl p-4 border border-primary/10 hover:border-primary/30 transition-all"
              >
                <p className="text-sm font-medium text-foreground">{rec.title}</p>
                <p className="text-sm text-muted-foreground mt-0.5">{rec.reason}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Quick access grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 hover:shadow-sm transition-all group"
          >
            <div className="aspect-[2.5/1] relative bg-secondary/20">
              <Image
                src={section.image}
                alt={section.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="text-base font-medium text-foreground mb-0.5 group-hover:text-primary transition-colors">
                {section.title}
              </h2>
              <p className="text-xs text-muted-foreground">{section.description}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick reminder */}
      <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10 text-center">
        <p className="text-foreground/80 text-xs">
          Pick <strong>one thing</strong> at a time. Not the whole toolkit. Just the one thing that will help you most today.
        </p>
      </div>

      {/* Milestone celebrations — fixed toast */}
      <MilestoneToast />
    </div>
  )
}
