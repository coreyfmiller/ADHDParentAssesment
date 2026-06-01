"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Sparkles, MessageCircle, X } from "lucide-react"
import { getProactiveMessage, dismissProactiveMessage } from "@/lib/engagement/proactive-coach"
import type { ProactiveMessage } from "@/lib/engagement/proactive-coach"
import type { PatternMap } from "@/lib/assessments/types"
import type { Archetype } from "@/lib/archetypes"

interface ProactiveCoachMessageProps {
  patternMap: PatternMap | null
  archetype: Archetype | null
}

export function ProactiveCoachMessage({ patternMap, archetype }: ProactiveCoachMessageProps) {
  const [message, setMessage] = useState<ProactiveMessage | null>(null)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    // Small delay so it feels like the coach is "thinking"
    const timer = setTimeout(() => {
      const msg = getProactiveMessage(patternMap, archetype)
      setMessage(msg)
    }, 500)
    return () => clearTimeout(timer)
  }, [patternMap, archetype])

  if (!message || dismissed) return null

  const handleDismiss = () => {
    setDismissed(true)
    dismissProactiveMessage()
  }

  return (
    <div className="bg-card rounded-2xl border border-primary/15 overflow-hidden shadow-sm animate-in fade-in slide-in-from-top-2 duration-500">
      <div className="p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
            </div>
            <span className="text-xs font-medium text-primary">Your coach</span>
          </div>
          <button
            onClick={handleDismiss}
            className="p-1 text-muted-foreground/40 hover:text-muted-foreground transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Message */}
        <p className="text-sm text-foreground leading-relaxed">
          {message.message}
        </p>

        {/* Follow-up question/suggestion */}
        {message.followUp && (
          <p className="text-sm text-foreground/70 mt-2 italic">
            {message.followUp}
          </p>
        )}

        {/* Action — go to coach for deeper conversation */}
        <div className="flex items-center gap-3 mt-4 pt-3 border-t border-border/50">
          <Link
            href="/dashboard/coach"
            className="flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 font-medium transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            Talk to me about this
          </Link>
          <button
            onClick={handleDismiss}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors ml-auto"
          >
            I&apos;m good
          </button>
        </div>
      </div>
    </div>
  )
}
