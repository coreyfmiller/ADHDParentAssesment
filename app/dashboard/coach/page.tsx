"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Sparkles, Loader2, RotateCcw, Brain } from "lucide-react"
import { cn } from "@/lib/utils"
import { canAccessPremium } from "@/lib/access-control"
import { UpgradeGate } from "@/components/upgrade-gate"
import {
  getCurrentConversation,
  saveCurrentConversation,
  clearCurrentConversation,
  saveToPastConversations,
  getCoachMemory,
  updateMemoryFromSummary,
  buildMemoryPrompt,
} from "@/lib/coach-memory"
import { buildWhatWorkedPrompt } from "@/lib/engagement/what-worked"
import type { CoachConversation } from "@/lib/coach-memory"

interface Message {
  role: "user" | "assistant"
  content: string
}

const suggestedStarters = [
  { label: "Help me with this morning", prompt: "This morning was chaos. I yelled at my kids and we were late again. I feel terrible. Help me figure out what went wrong and what to try tomorrow." },
  { label: "I just snapped — help me repair", prompt: "I just lost my temper with my 7-year-old over something small. I yelled and now they're upset. I feel awful. Can you help me repair this?" },
  { label: "I can't start anything today", prompt: "I'm staring at a messy house and a pile of tasks and I physically cannot make myself start. I know what needs doing but my body won't move. What do I do?" },
  { label: "I'm completely touched out", prompt: "My kids have been climbing on me all day and I feel like my skin is crawling. I love them but I can't handle being touched anymore. How do I handle this without guilt?" },
  { label: "I forgot something important again", prompt: "I forgot it was costume day at school. My kid was the only one without a costume. The shame is crushing me. How do I deal with this?" },
  { label: "I need a bedtime survival plan", prompt: "It's 6pm, I'm completely depleted, and I still have to get through dinner and bedtime. I have nothing left. Give me the bare minimum survival plan." },
]

export default function CoachPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [profile, setProfile] = useState<Record<string, string> | null>(null)
  const [patternMap, setPatternMap] = useState<Record<string, unknown> | null>(null)
  const [pathwayResults, setPathwayResults] = useState<Record<string, unknown> | null>(null)
  const [hasAccess, setHasAccess] = useState(true)
  const [coachGreeting, setCoachGreeting] = useState("Tell me what's happening — or tap a starter below.")
  const [hasMemory, setHasMemory] = useState(false)
  const [isExtractingMemory, setIsExtractingMemory] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Check access on mount
  useEffect(() => {
    setHasAccess(canAccessPremium())
  }, [])

  // Load conversation + profile from localStorage on mount
  useEffect(() => {
    try {
      // Restore previous conversation
      const savedConversation = getCurrentConversation()
      if (savedConversation && savedConversation.messages.length > 0) {
        setMessages(savedConversation.messages)
      }

      // Check if we have memory
      const memory = getCoachMemory()
      setHasMemory(memory.facts.length > 0 || memory.patterns.length > 0 || memory.strategies.length > 0)

      // Load assessment profile
      const saved = localStorage.getItem("mindful-mama-answers")
      if (saved) {
        const answers = JSON.parse(saved) as Record<number, string>
        const profileData: Record<string, string> = {}
        Object.entries(answers).forEach(([qId, answerId]) => {
          profileData[`q${qId}`] = answerId
        })
        setProfile(profileData)
      }

      // Load pattern map
      const mapData = localStorage.getItem("mindful-mama-pattern-map")
      if (mapData) {
        const map = JSON.parse(mapData)
        setPatternMap(map)

        // Generate context-aware greeting
        const dims = map.dimensions || []
        const critical = dims.filter((d: any) => d.intensity === "critical")
        const high = dims.filter((d: any) => d.intensity === "high")

        if (critical.length > 0) {
          const area = critical[0].label.toLowerCase()
          setCoachGreeting(`I can see your ${area} is at a critical level right now. I'm here — whether you want to talk about that specifically, or something else entirely is on your mind.`)
        } else if (high.length > 0) {
          const areas = high.slice(0, 2).map((d: any) => d.label.toLowerCase())
          setCoachGreeting(`Based on your check-in, ${areas.join(" and ")} are where you're feeling the most strain. Want to dig into that, or is something else coming up today?`)
        }
      }

      // Load pathway results
      const pathways = ["executive-function", "depletion-burnout", "sensory-overwhelm", "systemic-load", "hormonal-patterns", "sleep-recovery", "trauma-nervous-system"]
      const results: Record<string, unknown> = {}
      for (const p of pathways) {
        const data = localStorage.getItem(`mindful-mama-pathway-result-${p}`)
        if (data) results[p] = JSON.parse(data)
      }
      if (Object.keys(results).length > 0) setPathwayResults(results)
    } catch {}
  }, [])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto"
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`
    }
  }, [input])

  // Save conversation to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      saveCurrentConversation(messages)
    }
  }, [messages])

  const extractMemoryAndReset = async (oldMessages: Message[]) => {
    // Save the old conversation to history
    const oldConversation = getCurrentConversation()
    if (oldConversation) {
      saveToPastConversations(oldConversation)
    }

    // Extract memory from the old conversation (background, non-blocking)
    if (oldMessages.length >= 3) {
      setIsExtractingMemory(true)
      try {
        const response = await fetch("/api/coach/memory", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: oldMessages }),
        })
        const data = await response.json()
        if (data.memory) {
          updateMemoryFromSummary(data.memory)
          setHasMemory(true)
        }
      } catch {}
      setIsExtractingMemory(false)
    }

    // Clear and start fresh
    clearCurrentConversation()
    setMessages([])
  }

  const handleNewChat = () => {
    if (messages.length > 0) {
      extractMemoryAndReset(messages)
    }
  }

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return

    // Client-side daily limit (20 messages per day)
    const today = new Date().toDateString()
    const limitKey = `mindful-mama-coach-limit-${today}`
    const currentCount = parseInt(localStorage.getItem(limitKey) || "0", 10)
    if (currentCount >= 20) {
      setError("You've reached your daily message limit (20). Come back tomorrow — your coach will be here.")
      return
    }
    localStorage.setItem(limitKey, String(currentCount + 1))

    setError(null)
    const userMessage: Message = { role: "user", content: content.trim() }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages,
          profile: profile,
          patternMap: patternMap,
          pathwayResults: pathwayResults,
          memory: (buildMemoryPrompt() + buildWhatWorkedPrompt()) || null,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Something went wrong.")
        setIsLoading(false)
        return
      }

      const newMessages = [...updatedMessages, { role: "assistant" as const, content: data.message }]
      setMessages(newMessages)
    } catch (err) {
      setError("Failed to connect. Please check your internet and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  return (
    <div className="flex flex-col h-[calc(100dvh-10rem)]">
      {!hasAccess ? (
        <UpgradeGate context="coach" />
      ) : (
      <>
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-medium text-foreground">Your Coach</h1>
              <p className="text-xs text-muted-foreground">
                Personalized support based on your profile
                {hasMemory && (
                  <span className="inline-flex items-center gap-1 ml-2 text-primary">
                    <Brain className="w-3 h-3" />
                    remembers you
                  </span>
                )}
              </p>
            </div>
          </div>
          {messages.length > 0 && (
            <button
              onClick={handleNewChat}
              disabled={isExtractingMemory}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors disabled:opacity-50"
            >
              <RotateCcw className="w-3 h-3" />
              {isExtractingMemory ? "Saving memory..." : "New chat"}
            </button>
          )}
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto space-y-4 pb-4" aria-live="polite" aria-label="Chat messages">
        {messages.length === 0 && (
          <div className="space-y-4">
            <div className="bg-primary/5 rounded-2xl p-5 border border-primary/10">
              <p className="text-sm text-foreground/80 leading-relaxed">
                {coachGreeting}
              </p>
              {hasMemory && (
                <p className="text-xs text-primary/70 mt-2">
                  I remember our previous conversations. Pick up where we left off, or start something new.
                </p>
              )}
            </div>

            {/* Suggested starters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {suggestedStarters.map((starter, idx) => (
                <button
                  key={idx}
                  onClick={() => sendMessage(starter.prompt)}
                  className="text-left p-3 rounded-xl bg-card border border-border hover:border-primary/30 hover:bg-primary/5 transition-all"
                >
                  <span className="text-sm font-medium text-foreground">{starter.label}</span>
                </button>
              ))}
            </div>

            <p className="text-xs text-muted-foreground text-center">
              This coach provides educational support, not therapy. If you&apos;re in crisis, contact 988.
            </p>
          </div>
        )}

        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={cn(
              "flex",
              msg.role === "user" ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={cn(
                "max-w-[85%] rounded-2xl px-4 py-3",
                msg.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border"
              )}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-card border border-border rounded-2xl px-4 py-3">
              <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
            </div>
          </div>
        )}

        {error && (
          <div className="flex justify-center">
            <p className="text-sm text-destructive bg-destructive/10 rounded-xl px-4 py-2">{error}</p>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <form onSubmit={handleSubmit} className="flex gap-2 pt-4 border-t border-border">
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Tell me what's happening..."
          rows={1}
          className="flex-1 resize-none px-4 py-3 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring max-h-32"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors self-end"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
      </>
      )}
    </div>
  )
}
