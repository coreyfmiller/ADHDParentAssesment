"use client"

import { useState, useEffect } from "react"
import { AlertTriangle, Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  getThisWeeksHardThing,
  setHardThing,
  resolveHardThing,
  getLastWeeksHardThing,
} from "@/lib/engagement/whats-hard-this-week"
import type { HardThingEntry } from "@/lib/engagement/whats-hard-this-week"
import { getCurrentArchetype } from "@/lib/archetypes"

const AI_HARD_THING_KEY = "mindful-mama-hard-thing-ai"

interface AIResponse {
  acknowledgment?: string
  oneThing?: string
  reframe?: string
  forText: string
}

const outcomeLabels: Record<string, string> = {
  "better-than-expected": "Better than I expected",
  "as-expected": "About what I expected",
  "harder-than-expected": "Harder than I expected",
  "didnt-happen": "It didn't happen",
}

export function WhatsHardThisWeek() {
  const [entry, setEntry] = useState<HardThingEntry | null>(null)
  const [lastWeek, setLastWeek] = useState<HardThingEntry | null>(null)
  const [input, setInput] = useState("")
  const [aiResponse, setAiResponse] = useState<AIResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showChange, setShowChange] = useState(false)

  useEffect(() => {
    const current = getThisWeeksHardThing()
    setEntry(current)

    // Load cached AI response
    if (current) {
      const cached = getCachedAI()
      if (cached && cached.forText === current.text) {
        setAiResponse(cached)
      }
    }

    // Check last week
    const prev = getLastWeeksHardThing()
    if (prev && !prev.resolved) {
      setLastWeek(prev)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const newEntry = setHardThing(input)
    setEntry(newEntry)
    setInput("")
    setShowChange(false)

    // Call AI
    await fetchAIResponse(newEntry.text)
  }

  const fetchAIResponse = async (text: string) => {
    setIsLoading(true)
    try {
      const archetype = getCurrentArchetype()
      const response = await fetch("/api/coach/hard-thing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          archetype: archetype?.name,
          dayOfWeek: new Date().getDay(),
        }),
      })

      if (response.ok) {
        const data = await response.json()
        if (data.acknowledgment || data.oneThing || data.reframe) {
          const ai: AIResponse = { ...data, forText: text }
          setAiResponse(ai)
          try {
            localStorage.setItem(AI_HARD_THING_KEY, JSON.stringify(ai))
          } catch {}
        }
      }
    } catch {
      // Silently fail
    } finally {
      setIsLoading(false)
    }
  }

  const handleResolve = (howItWent: HardThingEntry["howItWent"]) => {
    resolveHardThing(howItWent)
    setLastWeek(null)
  }

  // Follow-up from last week
  if (lastWeek && !entry) {
    return (
      <div className="bg-card rounded-r-2xl border border-border border-l-0 overflow-hidden">
        <div className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-medium text-amber-600 uppercase tracking-wide">Follow up</span>
          </div>
          <p className="text-sm text-foreground mb-1">
            Last week you said this was hard:
          </p>
          <p className="text-sm font-medium text-foreground mb-4 italic">
            &quot;{lastWeek.text}&quot;
          </p>
          <p className="text-xs text-muted-foreground mb-3">How did it go?</p>
          <div className="grid grid-cols-2 gap-2">
            {(Object.entries(outcomeLabels) as [string, string][]).map(([key, label]) => (
              <button
                key={key}
                onClick={() => handleResolve(key as HardThingEntry["howItWent"])}
                className="text-xs text-left px-3 py-2 rounded-xl bg-secondary/30 hover:bg-secondary/50 text-foreground transition-colors"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Current entry — show with AI support
  if (entry && !showChange) {
    return (
      <div className="bg-card rounded-r-2xl border border-border border-l-0 overflow-hidden">
        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-medium text-amber-600 uppercase tracking-wide">This week</span>
            </div>
          </div>
          <p className="text-sm font-medium text-foreground mb-3">
            {entry.text}
          </p>

          {/* AI Response */}
          {isLoading ? (
            <div className="flex items-center gap-2 py-2">
              <Loader2 className="w-3.5 h-3.5 text-primary animate-spin" />
              <span className="text-xs text-muted-foreground">Thinking about this with you...</span>
            </div>
          ) : aiResponse ? (
            <div className="space-y-3 animate-in fade-in duration-300">
              {/* Acknowledgment */}
              {aiResponse.acknowledgment && (
                <p className="text-sm text-foreground/80 leading-relaxed">
                  {aiResponse.acknowledgment}
                </p>
              )}

              {/* One actionable thing */}
              {aiResponse.oneThing && (
                <div className="bg-primary/5 rounded-xl p-3 border border-primary/10">
                  <p className="text-[10px] font-medium text-primary uppercase tracking-wide mb-1">One thing you can do today</p>
                  <p className="text-sm text-foreground/80">{aiResponse.oneThing}</p>
                </div>
              )}

              {/* Reframe */}
              {aiResponse.reframe && (
                <p className="text-xs text-muted-foreground italic">
                  {aiResponse.reframe}
                </p>
              )}
            </div>
          ) : null}

          {/* Change link */}
          <div className="mt-3 pt-3 border-t border-border/50">
            <button
              onClick={() => setShowChange(true)}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Change this week&apos;s hard thing
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Input mode
  return (
    <div className="bg-card rounded-r-2xl border border-border border-l-0 overflow-hidden">
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          <span className="text-xs font-medium text-amber-600 uppercase tracking-wide">This week</span>
        </div>
        <p className="text-sm text-foreground mb-1 font-medium">
          Anything weighing on you this week?
        </p>
        <p className="text-xs text-muted-foreground mb-3">
          Name it and I&apos;ll help you face it.
        </p>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="The dentist... getting kids to their dad's... that work deadline..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-secondary/50 border border-border text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring/50 transition-all"
          />
          <Button
            type="submit"
            size="sm"
            disabled={!input.trim()}
            className="rounded-xl px-3"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}

// ---- Helpers ----

function getCachedAI(): AIResponse | null {
  try {
    const data = localStorage.getItem(AI_HARD_THING_KEY)
    if (!data) return null
    return JSON.parse(data)
  } catch {
    return null
  }
}
