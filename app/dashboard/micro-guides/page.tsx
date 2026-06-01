"use client"

import { useState, useEffect } from "react"
import { BookOpen, Check, Clock, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  MICRO_GUIDES,
  getTodaysGuide,
  getReadGuideIds,
  getReadCount,
  markGuideRead,
  CATEGORY_LABELS,
  CATEGORY_COLORS,
} from "@/lib/micro-guides"
import { getCurrentArchetype, determineArchetype } from "@/lib/archetypes"
import type { MicroGuide } from "@/lib/micro-guides"
import type { PatternMap } from "@/lib/assessments/types"
import type { Archetype } from "@/lib/archetypes"

export default function MicroGuidesPage() {
  const [todaysGuide, setTodaysGuide] = useState<MicroGuide | null>(null)
  const [archetype, setArchetype] = useState<Archetype | null>(null)
  const [patternMap, setPatternMap] = useState<PatternMap | null>(null)
  const [readIds, setReadIds] = useState<string[]>([])
  const [expandedGuide, setExpandedGuide] = useState<string | null>(null)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    let map: PatternMap | null = null
    let arch: Archetype | null = null

    try {
      const stored = localStorage.getItem("mindful-mama-pattern-map")
      if (stored) {
        map = JSON.parse(stored)
        setPatternMap(map)
      }
      arch = getCurrentArchetype()
      if (!arch && map) {
        arch = determineArchetype(map)
      }
      setArchetype(arch)
    } catch {}

    const guide = getTodaysGuide(map, arch)
    setTodaysGuide(guide)
    setReadIds(getReadGuideIds())
  }, [])

  const handleMarkRead = (id: string) => {
    markGuideRead(id)
    setReadIds(getReadGuideIds())
  }

  const readCount = readIds.length
  const totalCount = MICRO_GUIDES.length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-medium text-foreground">Micro-Guides</h1>
            <p className="text-xs text-muted-foreground">{readCount}/{totalCount} read</p>
          </div>
        </div>
        <p className="text-muted-foreground">
          Short reads that help you understand why your brain works the way it does — and what to do about it. One new guide surfaces each day, matched to your type.
        </p>
      </div>

      {/* Progress */}
      <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500"
          style={{ width: `${(readCount / totalCount) * 100}%` }}
        />
      </div>

      {/* Today's Guide — Featured */}
      {todaysGuide && (
        <div className="bg-card rounded-2xl border border-primary/20 overflow-hidden shadow-sm">
          <div className="p-5 pb-3">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-medium text-primary uppercase tracking-wide">Today&apos;s guide</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${CATEGORY_COLORS[todaysGuide.category]}`}>
                {CATEGORY_LABELS[todaysGuide.category]}
              </span>
              <span className="text-xs text-muted-foreground ml-auto flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {todaysGuide.readTime}
              </span>
            </div>
            <h2 className="text-xl font-medium text-foreground mb-1">{todaysGuide.title}</h2>
            <p className="text-sm text-muted-foreground">{todaysGuide.subtitle}</p>
          </div>

          {/* Body */}
          <div className="px-5 pb-5 space-y-3">
            {todaysGuide.body.map((paragraph, i) => (
              <p key={i} className="text-sm text-foreground/80 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Try This */}
          <div className="border-t border-border/50 px-5 py-4 bg-primary/[0.02]">
            <p className="text-xs font-medium text-primary uppercase tracking-wide mb-2">Try this</p>
            <p className="text-sm text-foreground/80 leading-relaxed">{todaysGuide.tryThis}</p>
          </div>

          {/* Remember */}
          <div className="border-t border-border/50 px-5 py-4 bg-secondary/20">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Remember</p>
            <p className="text-sm text-foreground font-medium leading-relaxed italic">{todaysGuide.remember}</p>
          </div>

          {/* Mark as read */}
          <div className="border-t border-border/50 px-5 py-3">
            {readIds.includes(todaysGuide.id) ? (
              <p className="text-xs text-green-600 flex items-center gap-1">
                <Check className="w-3 h-3" /> Read
              </p>
            ) : (
              <Button
                onClick={() => handleMarkRead(todaysGuide.id)}
                variant="ghost"
                size="sm"
                className="text-primary hover:text-primary hover:bg-primary/10 rounded-xl"
              >
                <Check className="w-3 h-3 mr-1" />
                Mark as read
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Browse All */}
      <div>
        <button
          onClick={() => setShowAll(!showAll)}
          className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
        >
          {showAll ? "Hide" : "Browse"} all guides ({totalCount})
          {showAll ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showAll && (
          <div className="mt-4 space-y-3">
            {MICRO_GUIDES.map((guide) => {
              const isRead = readIds.includes(guide.id)
              const isExpanded = expandedGuide === guide.id

              return (
                <div
                  key={guide.id}
                  className={`bg-card rounded-2xl border overflow-hidden transition-all ${
                    isRead ? "border-green-500/20" : "border-border"
                  }`}
                >
                  <button
                    onClick={() => setExpandedGuide(isExpanded ? null : guide.id)}
                    className="w-full p-4 text-left hover:bg-secondary/20 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        isRead ? "bg-green-500 border-green-500" : "border-border"
                      }`}>
                        {isRead && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${CATEGORY_COLORS[guide.category]}`}>
                            {CATEGORY_LABELS[guide.category]}
                          </span>
                          <span className="text-[10px] text-muted-foreground">{guide.readTime}</span>
                        </div>
                        <h3 className="text-sm font-medium text-foreground">{guide.title}</h3>
                        <p className="text-xs text-muted-foreground">{guide.subtitle}</p>
                      </div>
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="border-t border-border/50">
                      <div className="px-5 py-4 space-y-3">
                        {guide.body.map((p, i) => (
                          <p key={i} className="text-sm text-foreground/80 leading-relaxed">{p}</p>
                        ))}
                      </div>
                      <div className="border-t border-border/50 px-5 py-3 bg-primary/[0.02]">
                        <p className="text-xs font-medium text-primary uppercase tracking-wide mb-1">Try this</p>
                        <p className="text-sm text-foreground/80">{guide.tryThis}</p>
                      </div>
                      <div className="border-t border-border/50 px-5 py-3 bg-secondary/20">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Remember</p>
                        <p className="text-sm text-foreground font-medium italic">{guide.remember}</p>
                      </div>
                      {!isRead && (
                        <div className="border-t border-border/50 px-5 py-3">
                          <Button
                            onClick={() => handleMarkRead(guide.id)}
                            variant="ghost"
                            size="sm"
                            className="text-primary hover:text-primary hover:bg-primary/10 rounded-xl"
                          >
                            <Check className="w-3 h-3 mr-1" /> Mark as read
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-muted-foreground/70 text-center leading-relaxed">
        These guides are for educational and self-reflection purposes only. They are informed by research but are not a substitute for professional care.
      </p>
    </div>
  )
}
