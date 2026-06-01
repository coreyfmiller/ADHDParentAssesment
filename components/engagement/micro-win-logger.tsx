"use client"

import { useState, useEffect, useRef } from "react"
import { Plus, Sparkles, X, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"
import { addWin, getTodaysWins, getWinStreak, removeWin } from "@/lib/engagement/micro-wins"
import type { MicroWin } from "@/lib/engagement/types"
import type { PatternMap } from "@/lib/assessments/types"

interface MicroWinLoggerProps {
  patternMap: PatternMap | null
}

const categoryEmoji: Record<string, string> = {
  survival: "🫠",
  care: "💧",
  connection: "💬",
  progress: "✓",
  rest: "🛋️",
  uncategorized: "·",
}

export function MicroWinLogger({ patternMap }: MicroWinLoggerProps) {
  const [wins, setWins] = useState<MicroWin[]>([])
  const [input, setInput] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [lastReflection, setLastReflection] = useState<string | null>(null)
  const [streak, setStreak] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setWins(getTodaysWins())
    setStreak(getWinStreak().currentStreak)
  }, [])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const win = addWin(input, patternMap)
    setWins(getTodaysWins())
    setStreak(getWinStreak().currentStreak)
    setLastReflection(win.reflection || null)
    setInput("")

    // Clear reflection after 5 seconds
    setTimeout(() => setLastReflection(null), 5000)
  }

  const handleRemove = (id: string) => {
    removeWin(id)
    setWins(getTodaysWins())
  }

  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden">
      {/* Header */}
      <div className="p-5 pb-3">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-base font-medium text-foreground flex items-center gap-2">
            I Did a Thing
            {wins.length > 0 && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                {wins.length} today
              </span>
            )}
          </h2>
          {streak > 1 && (
            <span className="flex items-center gap-1 text-xs text-amber-600 font-medium">
              <Flame className="w-3 h-3" />
              {streak} day streak
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          Log the small stuff. It all counts.
        </p>
      </div>

      {/* Reflection toast */}
      {lastReflection && (
        <div className="mx-5 mb-3 p-3 rounded-xl bg-primary/5 border border-primary/10 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            <p className="text-sm text-foreground/80 italic">{lastReflection}</p>
          </div>
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="px-5 pb-4">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Fed the kids. Drank water. Survived."
            className="flex-1 px-4 py-2.5 rounded-xl bg-secondary/50 border border-border text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring/50 transition-all"
          />
          <Button
            type="submit"
            size="sm"
            disabled={!input.trim()}
            className="rounded-xl px-3"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </form>

      {/* Today's wins */}
      {wins.length > 0 && (
        <div className="border-t border-border/50 px-5 py-3 max-h-48 overflow-y-auto">
          <div className="space-y-1.5">
            {wins.slice().reverse().map((win) => (
              <div
                key={win.id}
                className="flex items-center gap-2 group text-sm"
              >
                <span className="text-xs w-5 text-center flex-shrink-0">
                  {categoryEmoji[win.category]}
                </span>
                <span className="text-foreground/80 flex-1">{win.text}</span>
                <button
                  onClick={() => handleRemove(win.id)}
                  className="opacity-0 group-hover:opacity-100 text-muted-foreground/50 hover:text-destructive transition-all p-0.5"
                  aria-label="Remove"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* End of day summary teaser */}
      {wins.length >= 3 && (
        <div className="border-t border-border/50 px-5 py-3 bg-secondary/20">
          <p className="text-xs text-muted-foreground text-center">
            {wins.length} things done today. That&apos;s{" "}{wins.length}{" "}pieces of evidence you&apos;re not doing nothing.
          </p>
        </div>
      )}
    </div>
  )
}
