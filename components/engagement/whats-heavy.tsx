"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { CloudRain, Send, ArrowRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { logHeavyThing, getRepairSuggestion } from "@/lib/engagement/whats-heavy"
import { detectCrisis } from "@/lib/crisis-detection"
import { CrisisAlert } from "@/components/crisis-alert"
import type { HeavyEntry, HeavyCategory } from "@/lib/engagement/whats-heavy"
import type { CrisisDetectionResult } from "@/lib/crisis-detection"
import type { PatternMap } from "@/lib/assessments/types"

interface WhatsHeavyProps {
  patternMap: PatternMap | null
}

export function WhatsHeavy({ patternMap }: WhatsHeavyProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const [lastEntry, setLastEntry] = useState<HeavyEntry | null>(null)
  const [repairLink, setRepairLink] = useState<{ href: string; label: string } | null>(null)
  const [aiWitness, setAiWitness] = useState<string | null>(null)
  const [isLoadingAI, setIsLoadingAI] = useState(false)
  const [crisisResult, setCrisisResult] = useState<CrisisDetectionResult | null>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Crisis detection — runs BEFORE anything else
    const crisis = detectCrisis(input)
    if (crisis.isCrisis) {
      setCrisisResult(crisis)
      // Still log it (for their record) but show crisis resources first
    }

    const entry = logHeavyThing(input, patternMap)
    setLastEntry(entry)
    setInput("")

    const repair = getRepairSuggestion(entry.category)
    setRepairLink(repair)

    // Only call AI if NOT a crisis (crisis gets resources, not a witty response)
    if (!crisis.isCrisis) {
      setIsLoadingAI(true)
      fetchAIWitness(entry.text, entry.category, patternMap)
    }
  }

  const fetchAIWitness = async (text: string, category: string, pm: PatternMap | null) => {
    try {
      const body: Record<string, unknown> = { text, category }
      if (pm) {
        const elevated = pm.dimensions
          .filter((d) => d.intensity === "high" || d.intensity === "critical")
          .map((d) => d.label)
        if (elevated.length > 0) body.elevatedDimensions = elevated
      }
      // Get archetype from localStorage
      try {
        const archData = localStorage.getItem("mindful-mama-archetype")
        if (archData) {
          const arch = JSON.parse(archData)
          if (arch.name) body.archetype = arch.name
        }
      } catch {}

      const response = await fetch("/api/coach/witness", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      if (response.ok) {
        const data = await response.json()
        if (data.witness) setAiWitness(data.witness)
      }
    } catch {
      // Silently fail — pre-written response is already showing
    } finally {
      setIsLoadingAI(false)
    }
  }

  const handleClose = () => {
    setLastEntry(null)
    setRepairLink(null)
    setAiWitness(null)
    setIsOpen(false)
  }

  const handleReset = () => {
    setLastEntry(null)
    setRepairLink(null)
    setAiWitness(null)
  }

  // Crisis alert — overlays everything
  if (crisisResult?.isCrisis) {
    return (
      <>
        <CrisisAlert result={crisisResult} onDismiss={() => setCrisisResult(null)} />
      </>
    )
  }

  // Collapsed state — just a subtle entry point
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full bg-card rounded-2xl border border-border/70 p-4 text-left hover:border-border transition-all group"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-secondary/50 flex items-center justify-center group-hover:bg-secondary transition-colors">
            <CloudRain className="w-4 h-4 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground/80">Something heavy?</p>
            <p className="text-xs text-muted-foreground">Put it down here. No judgment. Just release.</p>
          </div>
        </div>
      </button>
    )
  }

  // Response state — after submitting
  if (lastEntry) {
    return (
      <div className="bg-card rounded-2xl border border-border overflow-hidden animate-in fade-in duration-300">
        <div className="p-5">
          {/* Close button */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <CloudRain className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Heard.</span>
            </div>
            <button
              onClick={handleClose}
              className="p-1 text-muted-foreground/50 hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* What they said (faded, not the focus) */}
          <p className="text-sm text-muted-foreground/70 italic mb-4 pl-3 border-l-2 border-border">
            {lastEntry.text}
          </p>

          {/* The response (the focus) */}
          <p className="text-foreground leading-relaxed mb-4">
            {aiWitness || lastEntry.response}
          </p>
          {isLoadingAI && !aiWitness && (
            <div className="h-1 w-16 bg-primary/20 rounded-full overflow-hidden mb-4">
              <div className="h-full w-full bg-primary/50 rounded-full animate-pulse" />
            </div>
          )}

          {/* Repair link if available */}
          {repairLink && (
            <Link
              href={repairLink.href}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary/5 border border-primary/10 text-sm text-primary hover:bg-primary/10 transition-colors"
            >
              {repairLink.label}
              <ArrowRight className="w-3 h-3" />
            </Link>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border/50">
            <button
              onClick={handleReset}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Put something else down
            </button>
            <button
              onClick={handleClose}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors ml-auto"
            >
              I&apos;m okay. Close this.
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Input state — open and ready
  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
      <div className="p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <CloudRain className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">What&apos;s heavy right now?</span>
          </div>
          <button
            onClick={handleClose}
            className="p-1 text-muted-foreground/50 hover:text-foreground transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-muted-foreground mb-3">
          This isn&apos;t a failure log. It&apos;s a place to put things down so you don&apos;t have to carry them in your head.
        </p>

        {/* Input */}
        <form onSubmit={handleSubmit}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="I yelled at my kid. I forgot the school thing again. I can't do this anymore. I resent my partner. Whatever it is — put it here."
            className="w-full px-4 py-3 rounded-xl bg-secondary/30 border border-border text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring/50 resize-none transition-all"
            rows={3}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSubmit(e)
              }
            }}
          />
          <div className="flex items-center justify-between mt-3">
            <p className="text-[10px] text-muted-foreground/60">
              Private. Not stored long-term. Just for you.
            </p>
            <Button
              type="submit"
              size="sm"
              disabled={!input.trim()}
              variant="ghost"
              className="rounded-xl text-primary hover:text-primary hover:bg-primary/10"
            >
              <Send className="w-4 h-4 mr-1" />
              Put it down
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
