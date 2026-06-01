"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Compass, BookOpen, Clock, Check } from "lucide-react"
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
      setGuideRead(getReadGuideIds().includes(guide.id))
    } catch {}
  }, [])

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
          <div className="aspect-[3/1] relative bg-secondary/20">
            <Image
              src="/images/glowingseed.png"
              alt="Your type"
              fill
              className="object-cover"
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
              <span className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                View →
              </span>
            </div>
          </div>
        </Link>
      )}

      {/* One Thing Today — the daily anchor action */}
      <OneThingInteractive patternMap={patternMap} />

      {/* Proactive Coach Message — the coach reaches out first */}
      <ProactiveCoachMessage patternMap={patternMap} archetype={archetype} />

      {/* Today's Micro-Guide */}
      {dailyGuide && (
        <Link
          href="/dashboard/micro-guides"
          className="block bg-card rounded-2xl border border-border hover:border-primary/20 transition-all overflow-hidden group"
        >
          <div className="p-4">
            <div className="flex items-center gap-2 mb-1.5">
              <BookOpen className="w-3.5 h-3.5 text-primary" />
              <span className="text-[10px] font-medium text-primary uppercase tracking-wide">Today&apos;s learn</span>
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
      )}

      {/* Daily Identity Anchor — first thing she sees */}
      <IdentityAnchorCard patternMap={patternMap} />

      {/* Pulse Check-In — contextual based on time of day */}
      <PulseCheckin patternMap={patternMap} />

      {/* Micro-Win Logger — always accessible */}
      <MicroWinLogger patternMap={patternMap} />

      {/* What's Heavy — emotional release valve */}
      <WhatsHeavy patternMap={patternMap} />

      {/* Time Capsule — letter to future self */}
      <TimeCapsuleWidget />

      {/* What Worked — personal strategy playbook */}
      <WhatWorkedTracker />

      {/* Pattern Map Summary or CTA */}
      {patternMap ? (
        <div className="space-y-3">
          <Link
            href="/assess"
            className="block bg-card rounded-2xl p-6 border border-primary/20 hover:border-primary/40 transition-all group"
          >
            <div className="flex items-center gap-3 mb-4">
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
            </div>
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
          </Link>
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
