"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Sparkles, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

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
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

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

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return

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
          profile: null, // TODO: load from localStorage after assessment
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Something went wrong.")
        setIsLoading(false)
        return
      }

      setMessages([...updatedMessages, { role: "assistant", content: data.message }])
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
    <div className="flex flex-col h-[calc(100vh-10rem)]">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-medium text-foreground">Your ADHD Parenting Coach</h1>
            <p className="text-xs text-muted-foreground">Personalized support for the hard moments</p>
          </div>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto space-y-4 pb-4">
        {messages.length === 0 && (
          <div className="space-y-4">
            <div className="bg-primary/5 rounded-2xl p-5 border border-primary/10">
              <p className="text-sm text-foreground/80 leading-relaxed">
                Hi there. I&apos;m your parenting coach — here for the hard moments, the messy mornings, and the guilt spirals. Tell me what&apos;s happening, or tap a starter below.
              </p>
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
    </div>
  )
}
