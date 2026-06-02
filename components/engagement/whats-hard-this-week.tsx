"use client"

import { useState, useEffect } from "react"
import { AlertTriangle, Check, ChevronDown, ChevronUp, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  getThisWeeksHardThing,
  setHardThing,
  resolveHardThing,
  getPrepSuggestions,
  getLastWeeksHardThing,
} from "@/lib/engagement/whats-hard-this-week"
import type { HardThingEntry, PrepSuggestion } from "@/lib/engagement/whats-hard-this-week"

const outcomeLabels: Record<string, string> = {
  "better-than-expected": "Better than I expected",
  "as-expected": "About what I expected",
  "harder-than-expected": "Harder than I expected",
  "didnt-happen": "It didn't happen",
}

const timingLabels: Record<string, string> = {
  now: "Right now",
  "day-before": "The day before",
  "day-of": "The day of",
  after: "After it's done",
}

export function WhatsHardThisWeek() {
  const [entry, setEntry] = useState<HardThingEntry | null>(null)
  const [lastWeek, setLastWeek] = useState<HardThingEntry | null>(null)
  const [input, setInput] = useState("")
  const [suggestions, setSuggestions] = useState<PrepSuggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [showResolve, setShowResolve] = useState(false)
  const [justSet, setJustSet] = useState(false)

  useEffect(() => {
    const current = getThisWeeksHardThing()
    setEntry(current)
    if (current) {
      setSuggestions(getPrepSuggestions(current))
    }

    // Check if last week's entry needs resolution
    const prev = getLastWeeksHardThing()
    if (prev && !prev.resolved) {
      setLastWeek(prev)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const newEntry = setHardThing(input)
    setEntry(newEntry)
    setSuggestions(getPrepSuggestions(newEntry))
    setInput("")
    setJustSet(true)
    setShowSuggestions(true)
    setTimeout(() => setJustSet(false), 3000)
  }

  const handleResolve = (howItWent: HardThingEntry["howItWent"]) => {
    if (lastWeek) {
      resolveHardThing(howItWent)
      setLastWeek(null)
    }
    setShowResolve(false)
  }

  // Last week's unresolved entry — follow up
  if (lastWeek && !entry) {
    return (
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
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

  // Current entry set — show it with prep suggestions
  if (entry) {
    return (
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-medium text-amber-600 uppercase tracking-wide">This week&apos;s hard thing</span>
            </div>
            {entry.tags.length > 0 && (
              <div className="flex gap-1">
                {entry.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded-full bg-secondary/50 text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <p className="text-sm font-medium text-foreground mb-3">
            {entry.text}
          </p>

          {justSet && (
            <p className="text-xs text-primary mb-3 animate-in fade-in duration-300">
              ✓ Got it. I&apos;ll help you work toward this.
            </p>
          )}

          {/* Prep suggestions */}
          {suggestions.length > 0 && (
            <div>
              <button
                onClick={() => setShowSuggestions(!showSuggestions)}
                className="flex items-center gap-1 text-xs text-primary font-medium hover:text-primary/80 transition-colors mb-2"
              >
                {showSuggestions ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                {showSuggestions ? "Hide" : "Show"} prep suggestions
              </button>
              {showSuggestions && (
                <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  {suggestions.map((suggestion, idx) => (
                    <div key={idx} className="bg-secondary/20 rounded-xl p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                          {timingLabels[suggestion.timing]}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {suggestion.category}
                        </span>
                      </div>
                      <p className="text-sm text-foreground/80">{suggestion.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Change / update */}
          <div className="mt-3 pt-3 border-t border-border/50">
            <button
              onClick={() => { setEntry(null) }}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Change this week&apos;s hard thing
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Input mode — no entry set yet
  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden">
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          <span className="text-xs font-medium text-amber-600 uppercase tracking-wide">This week</span>
        </div>
        <p className="text-sm text-foreground mb-1 font-medium">
          What&apos;s the hard thing coming this week?
        </p>
        <p className="text-xs text-muted-foreground mb-3">
          Name it and I&apos;ll help you prep for it.
        </p>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="IEP meeting Thursday... dentist appointment... hosting in-laws..."
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
