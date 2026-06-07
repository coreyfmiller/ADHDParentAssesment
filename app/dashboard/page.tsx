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
import { DimensionExplainerModal } from "@/components/dimension-explainer-modal"
import { getDailyAIContent, getCachedDailyContent } from "@/lib/engagement/daily-ai"
import type { DailyAIContent } from "@/lib/engagement/daily-ai"
import { hasCompletedBasics } from "@/lib/user-basics"
import { OnboardingBasics } from "@/components/onboarding-basics"
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
  const [selectedDimension, setSelectedDimension] = useState<string | null>(null)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [pathwayProgress, setPathwayProgress] = useState({ completed: 0, total: 12 })

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

        // Show onboarding if she has assessment data but hasn't told us basics
        if (!hasCompletedBasics()) {
          setShowOnboarding(true)
        }

        // Check pathway progress
        const pathwaySlugs = ["executive-function", "depletion-burnout", "sensory-overwhelm", "hormonal-patterns", "sleep-recovery", "trauma-nervous-system", "systemic-load", "attachment-relationships", "self-worth-inner-critic", "rage-emotional-dysregulation", "matrescence-identity", "social-connection-isolation"]
        const completedCount = pathwaySlugs.filter(slug => {
          try { return localStorage.getItem(`mindful-mama-pathway-result-${slug}`) !== null } catch { return false }
        }).length
        setPathwayProgress({ completed: completedCount, total: 12 })
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
              src={`/images/wildflower/wildflower${(new Date().getDate() % 4) + 1}.png`}
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

      {/* Today's Learn — featured editorial banner */}
      {dailyGuide && (
        <Link
          href="/dashboard/micro-guides"
          className={`block rounded-2xl overflow-hidden transition-all group ${
            guideRead
              ? "bg-secondary/30 border border-border/50"
              : "bg-gradient-to-br from-amber-50/80 to-orange-50/50 border border-amber-200/40 hover:border-amber-300/60 shadow-sm"
          }`}
        >
          <div className="p-5">
            {guideRead ? (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-green-600 font-medium">Done — you learned something today</p>
                  <p className="text-sm text-muted-foreground truncate">{dailyGuide.title}</p>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-4 h-4 text-amber-600" />
                  <span className="text-[10px] font-medium text-amber-700 uppercase tracking-wide">Today&apos;s learn</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${CATEGORY_COLORS[dailyGuide.category]}`}>
                    {CATEGORY_LABELS[dailyGuide.category]}
                  </span>
                </div>
                <h3 className="text-base font-medium text-foreground group-hover:text-amber-800 transition-colors mb-1">
                  {dailyGuide.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {dailyGuide.subtitle}
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-xs text-amber-700/70 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {dailyGuide.readTime}
                  </span>
                  <span className="text-xs text-amber-700 font-medium ml-auto group-hover:translate-x-0.5 transition-transform">
                    Read →
                  </span>
                </div>
              </>
            )}
          </div>
        </Link>
      )}

      {/* Evening Recap — shows after 6pm with day's evidence */}
      <EveningRecap />

      {/* ═══════════════════════════════════════════════════════
          TIER 1 — "Right Now" (active prompts, daily actions)
          Styled: left accent border, slightly larger, prominent
         ═══════════════════════════════════════════════════════ */}
      <div className="space-y-3">
        <h2 className="text-[11px] font-medium text-primary uppercase tracking-widest px-1">→ Today</h2>

        {/* One Thing Today */}
        <div className={`transition-all duration-300 border-l-[3px] border-primary/40 rounded-r-2xl ${completedWidgets.has("one-thing") ? "opacity-60 border-primary/15" : ""}`}>
          {firstIncomplete === "one-thing" && (
            <p className="text-[10px] font-medium text-primary uppercase tracking-wide mb-1 flex items-center gap-1 px-3">
              <ArrowRight className="w-3 h-3" /> Start here
            </p>
          )}
          <OneThingInteractive patternMap={patternMap} aiOneThing={aiContent?.oneThing} />
        </div>

        {/* What's Hard This Week */}
        <div className="border-l-[3px] border-primary/25 rounded-r-2xl">
          <WhatsHardThisWeek />
        </div>
      </div>

      {/* Proactive Coach Message */}
      <ProactiveCoachMessage patternMap={patternMap} archetype={archetype} />

      {/* Weekly Recap — AI-generated summary, shows Sun/Mon only */}
      <WeeklyRecap />

      {/* ═══════════════════════════════════════════════════════
          TIER 2 — "Your Tools" (interactive, use when ready)
          Styled: standard cards, slightly smaller, quieter
         ═══════════════════════════════════════════════════════ */}
      <div className="space-y-2.5 pt-2">
        <h2 className="text-[11px] font-medium text-muted-foreground uppercase tracking-widest px-1">→ Your Tools</h2>

        {/* Pathway Progress Nudge — shows when pathways are incomplete */}
        {patternMap && pathwayProgress.completed < pathwayProgress.total && (
          <Link
            href="/assess"
            className="block bg-gradient-to-r from-primary/5 to-indigo-500/5 rounded-2xl p-4 border border-primary/10 hover:border-primary/20 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Compass className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  Continue your deep dive
                </p>
                <p className="text-xs text-muted-foreground">
                  {pathwayProgress.completed} of {pathwayProgress.total} reflections explored — each one makes your toolkit more personalized
                </p>
              </div>
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full border-2 border-primary/20 flex items-center justify-center">
                  <span className="text-xs font-medium text-primary">{pathwayProgress.completed}/{pathwayProgress.total}</span>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Daily Identity Anchor */}
        <IdentityAnchorCard patternMap={patternMap} aiAnchor={aiContent?.anchor} />

        {/* Pulse Check-In */}
        <div className={`transition-all duration-300 ${completedWidgets.has("pulse") ? "opacity-60" : ""}`}>
          <PulseCheckin patternMap={patternMap} />
        </div>

        {/* Micro-Win Logger */}
        <MicroWinLogger patternMap={patternMap} />

        {/* What's Heavy */}
        <WhatsHeavy patternMap={patternMap} />

        {/* Time Capsule */}
        <TimeCapsuleWidget />

        {/* What Worked */}
        <WhatWorkedTracker />
      </div>

      {/* ═══════════════════════════════════════════════════════
          TIER 3 — "Your Progress" (reflective, data, review)
          Styled: compact, muted backgrounds, grouped
         ═══════════════════════════════════════════════════════ */}
      <div className="space-y-3 pt-2">
        <h2 className="text-[11px] font-medium text-muted-foreground uppercase tracking-widest px-1">→ Your Progress</h2>

        {/* Activity Heatmap */}
        <ActivityHeatmap />

        {/* Pattern Map */}
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
              </div>
              <div className="space-y-3">
                {patternMap.dimensions.map((dim) => (
                  <button
                    key={dim.dimension}
                    onClick={() => setSelectedDimension(dim.dimension)}
                    className="w-full text-left space-y-1.5 hover:opacity-80 transition-opacity"
                  >
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-foreground">{dim.label}</span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        dim.intensity === "critical" ? "bg-red-500/10 text-red-600" :
                        dim.intensity === "high" ? "bg-amber-500/10 text-amber-600" :
                        dim.intensity === "moderate" ? "bg-yellow-500/10 text-yellow-700" :
                        "bg-green-500/10 text-green-600"
                      }`}>
                        {dim.intensity}
                      </span>
                    </div>
                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          dim.intensity === "critical" ? "bg-red-500" :
                          dim.intensity === "high" ? "bg-amber-500" :
                          dim.intensity === "moderate" ? "bg-yellow-500" :
                          "bg-green-500"
                        }`}
                        style={{ width: `${(dim.score / dim.maxScore) * 100}%` }}
                      />
                    </div>
                  </button>
                ))}
              </div>
              <p className="text-[9px] text-muted-foreground mt-3">Tap any dimension to learn more</p>
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

        {/* Evidence Journal */}
        <EvidenceJournalCard patternMap={patternMap} />
      </div>

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

      {/* Dimension explainer modal */}
      {selectedDimension && patternMap && (
        <DimensionExplainerModal
          dimensionId={selectedDimension}
          intensity={patternMap.dimensions.find(d => d.dimension === selectedDimension)?.intensity || "low"}
          onClose={() => setSelectedDimension(null)}
        />
      )}

      {/* Onboarding — shows once after first assessment */}
      {showOnboarding && (
        <OnboardingBasics onComplete={() => setShowOnboarding(false)} />
      )}
    </div>
  )
}
