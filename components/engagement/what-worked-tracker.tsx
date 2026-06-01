"use client"

import { useState, useEffect } from "react"
import { ThumbsUp, ThumbsDown, Minus, Lightbulb, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  logStrategyFeedback,
  getPersonalPlaybook,
  getAllFeedback,
} from "@/lib/engagement/what-worked"
import type { StrategyFeedback } from "@/lib/engagement/what-worked"

export function WhatWorkedTracker() {
  const [playbook, setPlaybook] = useState<StrategyFeedback[]>([])
  const [isAdding, setIsAdding] = useState(false)
  const [newStrategy, setNewStrategy] = useState("")
  const [newFeedback, setNewFeedback] = useState<StrategyFeedback["feedback"] | null>(null)
  const [showPlaybook, setShowPlaybook] = useState(false)
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    setPlaybook(getPersonalPlaybook())
    setTotalCount(getAllFeedback().length)
  }, [])

  const handleSubmit = () => {
    if (!newStrategy.trim() || !newFeedback) return
    logStrategyFeedback(newStrategy, newFeedback, "manual")
    setNewStrategy("")
    setNewFeedback(null)
    setIsAdding(false)
    setPlaybook(getPersonalPlaybook())
    setTotalCount(getAllFeedback().length)
  }

  // Nothing tracked yet — show entry point
  if (totalCount === 0 && !isAdding) {
    return (
      <button
        onClick={() => setIsAdding(true)}
        className="w-full bg-card rounded-2xl border border-border p-4 text-left hover:border-primary/20 transition-all"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Lightbulb className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">What&apos;s working for you?</p>
            <p className="text-xs text-muted-foreground">Track strategies so you remember what actually helps.</p>
          </div>
        </div>
      </button>
    )
  }

  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden">
      {/* Header */}
      <div className="p-5 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-primary" />
            <h2 className="text-base font-medium text-foreground">What Works for Me</h2>
          </div>
          <button
            onClick={() => setIsAdding(true)}
            className="p-1.5 rounded-lg hover:bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Add strategy"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Your personal playbook — built from your own experience.
        </p>
      </div>

      {/* Add new strategy */}
      {isAdding && (
        <div className="px-5 pb-4 border-t border-border/50 pt-4">
          <input
            type="text"
            value={newStrategy}
            onChange={(e) => setNewStrategy(e.target.value)}
            placeholder="What strategy did you try?"
            className="w-full px-4 py-2.5 rounded-xl bg-secondary/30 border border-border text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring/50 mb-3"
            autoFocus
          />
          <p className="text-xs text-muted-foreground mb-2">Did it help?</p>
          <div className="flex items-center gap-2 mb-3">
            <button
              onClick={() => setNewFeedback("worked")}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm transition-all ${
                newFeedback === "worked"
                  ? "bg-green-500/10 text-green-600 ring-2 ring-green-500/20"
                  : "bg-secondary/30 text-muted-foreground hover:bg-secondary/50"
              }`}
            >
              <ThumbsUp className="w-3 h-3" />
              Worked
            </button>
            <button
              onClick={() => setNewFeedback("kinda")}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm transition-all ${
                newFeedback === "kinda"
                  ? "bg-amber-500/10 text-amber-600 ring-2 ring-amber-500/20"
                  : "bg-secondary/30 text-muted-foreground hover:bg-secondary/50"
              }`}
            >
              <Minus className="w-3 h-3" />
              Kinda
            </button>
            <button
              onClick={() => setNewFeedback("didnt-work")}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm transition-all ${
                newFeedback === "didnt-work"
                  ? "bg-red-500/10 text-red-600 ring-2 ring-red-500/20"
                  : "bg-secondary/30 text-muted-foreground hover:bg-secondary/50"
              }`}
            >
              <ThumbsDown className="w-3 h-3" />
              Nope
            </button>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={handleSubmit}
              disabled={!newStrategy.trim() || !newFeedback}
              size="sm"
              className="rounded-xl"
            >
              Save
            </Button>
            <Button
              onClick={() => { setIsAdding(false); setNewStrategy(""); setNewFeedback(null) }}
              variant="ghost"
              size="sm"
              className="rounded-xl text-muted-foreground"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Playbook — strategies that worked */}
      {playbook.length > 0 && (
        <div className="border-t border-border/50">
          <button
            onClick={() => setShowPlaybook(!showPlaybook)}
            className="w-full px-5 py-3 text-left hover:bg-secondary/20 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground font-medium">
                {playbook.length} thing{playbook.length !== 1 ? "s" : ""} that work for you
              </span>
              <span className="text-xs text-muted-foreground">
                {showPlaybook ? "Hide" : "View"}
              </span>
            </div>
          </button>

          {showPlaybook && (
            <div className="px-5 pb-4 space-y-2">
              {playbook.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-start gap-2 py-2 border-b border-border/30 last:border-0"
                >
                  <ThumbsUp className="w-3 h-3 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-foreground">{entry.strategy}</p>
                    {entry.note && (
                      <p className="text-xs text-muted-foreground mt-0.5">{entry.note}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
