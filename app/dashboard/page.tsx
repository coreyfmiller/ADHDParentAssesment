"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Brain, Zap, Coffee, MessageCircle, BookOpen, FileText, Sparkles, Compass } from "lucide-react"
import type { PatternMap } from "@/lib/assessments/types"
import { getContentRecommendations, type ContentRecommendation } from "@/lib/assessments/content-matching"

const sections = [
  {
    href: "/dashboard/coach",
    icon: Sparkles,
    title: "AI Parenting Coach",
    description: "Talk through what's happening right now. Personalized support for the hard moments.",
    color: "bg-primary/10 text-primary",
  },
  {
    href: "/dashboard/toolkit",
    icon: Zap,
    title: "Emergency Toolkit",
    description: "In-the-moment support when you're about to snap, just snapped, or can't start.",
    color: "bg-red-500/10 text-red-600",
  },
  {
    href: "/dashboard/scripts",
    icon: MessageCircle,
    title: "Script Library",
    description: "Ready-to-use words for repair, boundaries, partner conversations, and more.",
    color: "bg-primary/10 text-primary",
  },
  {
    href: "/dashboard/rhythms",
    icon: Coffee,
    title: "Daily Rhythms",
    description: "Templates for high-spoon, low-spoon, and crisis days. Plus the meal system.",
    color: "bg-amber-500/10 text-amber-600",
  },
  {
    href: "/dashboard/guides",
    icon: BookOpen,
    title: "Guides",
    description: "Deep dives: seasonal survival, relationships, hormones, sleep, and identity.",
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    href: "/dashboard/printables",
    icon: FileText,
    title: "Printables",
    description: "Visual checklists, routine cards, and tools to stick on your fridge.",
    color: "bg-green-500/10 text-green-600",
  },
]

export default function DashboardPage() {
  const [patternMap, setPatternMap] = useState<PatternMap | null>(null)
  const [contentRecs, setContentRecs] = useState<ContentRecommendation[]>([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem("mindful-mama-pattern-map")
      if (stored) {
        const map = JSON.parse(stored) as PatternMap
        setPatternMap(map)
        setContentRecs(getContentRecommendations(map))
      }
    } catch {}
  }, [])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-medium text-foreground mb-2">Welcome back</h1>
        <p className="text-muted-foreground">
          Your parenting toolkit — built for how your brain actually works.
        </p>
      </div>

      {/* Pattern Map Summary or CTA */}
      {patternMap ? (
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
                <p className="text-xs text-muted-foreground mt-0.5">{rec.reason}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Quick access grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map((section) => {
          const Icon = section.icon
          return (
            <Link
              key={section.href}
              href={section.href}
              className="bg-card rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-sm transition-all group"
            >
              <div className={`w-10 h-10 rounded-xl ${section.color} flex items-center justify-center mb-3`}>
                <Icon className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-medium text-foreground mb-1 group-hover:text-primary transition-colors">
                {section.title}
              </h2>
              <p className="text-sm text-muted-foreground">{section.description}</p>
            </Link>
          )
        })}
      </div>

      {/* Quick reminder */}
      <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10 text-center">
        <p className="text-foreground/80 text-sm">
          Remember: pick <strong>one thing</strong> at a time. Not the whole toolkit. Just the one thing that will help you most today.
        </p>
      </div>
    </div>
  )
}
