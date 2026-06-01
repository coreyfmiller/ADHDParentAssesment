"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getCurrentArchetype, getArchetypeHistory, ARCHETYPES } from "@/lib/archetypes"
import { ArchetypeCard } from "@/components/archetype-card"
import type { Archetype, ArchetypeRecord } from "@/lib/archetypes"

export default function ArchetypePage() {
  const [archetype, setArchetype] = useState<Archetype | null>(null)
  const [history, setHistory] = useState<ArchetypeRecord[]>([])

  useEffect(() => {
    setArchetype(getCurrentArchetype())
    setHistory(getArchetypeHistory())
  }, [])

  if (!archetype) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <h1 className="text-2xl font-medium text-foreground mb-3">Your Archetype</h1>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Complete the check-in to discover your overwhelm archetype — a shorthand for how your overwhelm stacks up and what helps most.
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
      {/* Header */}
      <div>
        <h1 className="text-3xl font-medium text-foreground mb-2">Your Archetype</h1>
        <p className="text-muted-foreground">
          This is your overwhelm pattern — not a diagnosis, not a flaw. A recognition.
        </p>
      </div>

      {/* Main archetype card — fully expanded */}
      <ArchetypeCard archetype={archetype} showFull />

      {/* Archetype history (if she's retaken) */}
      {history.length > 1 && (
        <div className="bg-card rounded-2xl border border-border p-5">
          <h2 className="text-sm font-medium text-foreground mb-3">Your type over time</h2>
          <div className="space-y-2">
            {history.slice().reverse().map((record, i) => {
              const arch = ARCHETYPES[record.archetypeId]
              if (!arch) return null
              const date = new Date(record.determinedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
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
                    {i === 0 && (
                      <span className="text-xs text-primary ml-2">Current</span>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">{date}</span>
                </div>
              )
            })}
          </div>
          {history.length >= 2 && history[history.length - 1].archetypeId !== history[history.length - 2].archetypeId && (
            <p className="text-xs text-muted-foreground mt-3 italic">
              Your type shifted. That means something in your life changed — for better or for different. You&apos;re not static. You&apos;re evolving.
            </p>
          )}
        </div>
      )}

      {/* Retake CTA */}
      <div className="bg-secondary/20 rounded-2xl p-5 border border-border/50">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">Has your type shifted?</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Your patterns change with seasons, hormones, and life stages. Retake anytime.
            </p>
          </div>
          <Link href="/assess/snapshot">
            <Button variant="outline" size="sm" className="rounded-xl">
              <RotateCcw className="w-3 h-3 mr-1" />
              Check in again
            </Button>
          </Link>
        </div>
      </div>

      {/* What this means for your toolkit */}
      <div className="bg-card rounded-2xl border border-border p-5">
        <h2 className="text-sm font-medium text-foreground mb-3">What this means for you</h2>
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>
            Your archetype shapes which strategies will work best for you. A Plate Spinner needs externalization tools. A Burning Engine needs physical recovery first. A Disappeared needs micro-acts of identity.
          </p>
          <p>
            Your AI coach knows your type and tailors its advice accordingly. Your One Thing Today is weighted toward what helps your specific pattern.
          </p>
        </div>
        <div className="flex gap-2 mt-4">
          <Link href="/dashboard/coach">
            <Button variant="outline" size="sm" className="rounded-xl">
              Talk to your coach
            </Button>
          </Link>
          <Link href="/dashboard/share">
            <Button variant="outline" size="sm" className="rounded-xl">
              Share your type
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
