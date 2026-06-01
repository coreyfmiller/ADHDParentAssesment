"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, RotateCcw, Share2, Fingerprint } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getCurrentArchetype, getArchetypeHistory, ARCHETYPES, determineArchetype, saveArchetype } from "@/lib/archetypes"
import { ArchetypeCard } from "@/components/archetype-card"
import type { Archetype, ArchetypeRecord } from "@/lib/archetypes"
import type { PatternMap } from "@/lib/assessments/types"

export default function MePage() {
  const [archetype, setArchetype] = useState<Archetype | null>(null)
  const [history, setHistory] = useState<ArchetypeRecord[]>([])

  useEffect(() => {
    let arch = getCurrentArchetype()
    if (!arch) {
      try {
        const mapData = localStorage.getItem("mindful-mama-pattern-map")
        if (mapData) {
          const map = JSON.parse(mapData) as PatternMap
          arch = determineArchetype(map)
          saveArchetype(arch)
        }
      } catch {}
    }
    setArchetype(arch)
    setHistory(getArchetypeHistory())
  }, [])

  if (!archetype) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <Fingerprint className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-medium text-foreground mb-3">About You</h1>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Complete the check-in to discover your overwhelm archetype and unlock personalized content.
          </p>
          <Link href="/assess/snapshot">
            <Button className="rounded-xl">
              Take the Check-In
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-medium text-foreground mb-2">About You</h1>
        <p className="text-muted-foreground">
          Your overwhelm pattern — not a diagnosis, not a flaw. A recognition.
        </p>
      </div>

      {/* Archetype card */}
      <ArchetypeCard archetype={archetype} showFull />

      {/* Type history */}
      {history.length > 1 && (
        <div className="bg-card rounded-2xl border border-border p-5">
          <h2 className="text-sm font-medium text-foreground mb-3">Your type over time</h2>
          <div className="space-y-2">
            {history.slice().reverse().map((record, i) => {
              const arch = ARCHETYPES[record.archetypeId]
              if (!arch) return null
              const date = new Date(record.determinedAt).toLocaleDateString("en-US", {
                month: "short", day: "numeric", year: "numeric",
              })
              return (
                <div
                  key={i}
                  className={`flex items-center justify-between py-2 px-3 rounded-xl ${
                    i === 0 ? "bg-primary/5 border border-primary/10" : "bg-secondary/20"
                  }`}
                >
                  <div>
                    <span className="text-sm font-medium text-foreground">{arch.name}</span>
                    {i === 0 && <span className="text-xs text-primary ml-2">Current</span>}
                  </div>
                  <span className="text-xs text-muted-foreground">{date}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Link href="/assess/snapshot">
          <Button variant="outline" className="w-full rounded-xl">
            <RotateCcw className="w-4 h-4 mr-2" />
            Check in again
          </Button>
        </Link>
        <Link href="/dashboard/share">
          <Button variant="outline" className="w-full rounded-xl">
            <Share2 className="w-4 h-4 mr-2" />
            Share my type
          </Button>
        </Link>
      </div>

      {/* What this means */}
      <div className="bg-secondary/20 rounded-2xl p-5 border border-border/50">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Your archetype shapes which strategies work best for you. Your AI coach knows your type and tailors advice accordingly. Your daily content is weighted toward what helps your specific pattern.
        </p>
      </div>
    </div>
  )
}
