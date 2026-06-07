"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Send, Loader2, Copy, Check, RefreshCw, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getCurrentArchetype } from "@/lib/archetypes"

const personOptions = [
  { id: "partner", label: "My partner", emoji: "💬" },
  { id: "child", label: "My child", emoji: "🧸" },
  { id: "school", label: "School / teacher", emoji: "🏫" },
  { id: "family", label: "Family member", emoji: "👥" },
  { id: "friend", label: "A friend", emoji: "☕" },
  { id: "other", label: "Someone else", emoji: "💭" },
]

const toneOptions = [
  { id: "gentle", label: "Gentle", description: "Soft, vulnerable, lots of 'I feel'" },
  { id: "firm", label: "Firm", description: "Clear boundaries, still kind" },
  { id: "direct", label: "Direct", description: "Minimal preamble, gets to the point" },
]

interface GeneratedScript {
  opening?: string
  coreMessage?: string
  ifTheyReact?: string
  closing?: string
  toneNote?: string
}

export default function GenerateScriptPage() {
  const [situation, setSituation] = useState("")
  const [person, setPerson] = useState<string | null>(null)
  const [tone, setTone] = useState<string>("firm")
  const [script, setScript] = useState<GeneratedScript | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!situation.trim() || !person) return
    setIsLoading(true)
    setError(null)
    setScript(null)

    try {
      const archetype = getCurrentArchetype()
      const response = await fetch("/api/coach/script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          situation: situation.trim(),
          person,
          tone,
          archetype: archetype?.name,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        if (data.opening || data.coreMessage) {
          setScript(data)
        } else {
          setError("Couldn't generate a script for this. Try describing the situation differently.")
        }
      } else {
        setError("Something went wrong. Please try again.")
      }
    } catch {
      setError("Failed to connect. Check your internet and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = () => {
    if (!script) return
    const text = [
      script.opening && `${script.opening}`,
      script.coreMessage && `${script.coreMessage}`,
      script.ifTheyReact && `If they push back: ${script.ifTheyReact}`,
      script.closing && `${script.closing}`,
    ].filter(Boolean).join("\n\n")

    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleReset = () => {
    setScript(null)
    setSituation("")
    setPerson(null)
    setTone("firm")
  }

  // Result view
  if (script) {
    return (
      <div className="space-y-6 pb-8">
        <div>
          <Link href="/dashboard/scripts" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Script Library
          </Link>
          <h1 className="text-2xl font-medium text-foreground mb-1">Your Script</h1>
          <p className="text-sm text-muted-foreground">Here&apos;s what to say. Use it word-for-word or adapt it.</p>
        </div>

        {/* The situation (context) */}
        <div className="bg-secondary/20 rounded-xl p-4 border border-border/50">
          <p className="text-xs text-muted-foreground mb-1">Your situation</p>
          <p className="text-sm text-foreground/70 italic">&quot;{situation}&quot;</p>
        </div>

        {/* The script */}
        <div className="bg-card rounded-2xl border border-primary/15 overflow-hidden shadow-sm">
          {/* Opening */}
          {script.opening && (
            <div className="p-5 border-b border-border/50">
              <p className="text-[10px] font-medium text-primary uppercase tracking-wide mb-2">Start with</p>
              <p className="text-base text-foreground leading-relaxed">{script.opening}</p>
            </div>
          )}

          {/* Core message */}
          {script.coreMessage && (
            <div className="p-5 border-b border-border/50 bg-primary/[0.02]">
              <p className="text-[10px] font-medium text-primary uppercase tracking-wide mb-2">The main thing to say</p>
              <p className="text-base text-foreground leading-relaxed">{script.coreMessage}</p>
            </div>
          )}

          {/* If they react */}
          {script.ifTheyReact && (
            <div className="p-5 border-b border-border/50">
              <p className="text-[10px] font-medium text-amber-600 uppercase tracking-wide mb-2">If they push back</p>
              <p className="text-sm text-foreground/80 leading-relaxed">{script.ifTheyReact}</p>
            </div>
          )}

          {/* Closing */}
          {script.closing && (
            <div className="p-5 border-b border-border/50">
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide mb-2">Close with</p>
              <p className="text-sm text-foreground/80 leading-relaxed">{script.closing}</p>
            </div>
          )}

          {/* Tone note */}
          {script.toneNote && (
            <div className="p-4 bg-secondary/20">
              <p className="text-xs text-muted-foreground italic">{script.toneNote}</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button onClick={handleCopy} variant="outline" className="rounded-xl flex-1">
            {copied ? <><Check className="w-4 h-4 mr-2" /> Copied</> : <><Copy className="w-4 h-4 mr-2" /> Copy script</>}
          </Button>
          <Button onClick={handleReset} variant="outline" className="rounded-xl flex-1">
            <RefreshCw className="w-4 h-4 mr-2" /> New script
          </Button>
        </div>

        <Button onClick={handleGenerate} variant="ghost" className="w-full rounded-xl text-muted-foreground">
          <RefreshCw className="w-4 h-4 mr-2" /> Regenerate (same situation, different words)
        </Button>
      </div>
    )
  }

  // Input view
  return (
    <div className="space-y-6 pb-8">
      <div>
        <Link href="/dashboard/scripts" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Script Library
        </Link>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-2xl font-medium text-foreground">Give Me the Words</h1>
        </div>
        <p className="text-muted-foreground">
          Describe what&apos;s happening. I&apos;ll give you exactly what to say.
        </p>
      </div>

      {/* Situation */}
      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">What&apos;s the situation?</label>
        <textarea
          value={situation}
          onChange={(e) => setSituation(e.target.value)}
          placeholder="My partner said bedtime is my job because I don't work... My kid hit another kid at school and I have to talk to them about it... I need to tell my mother-in-law to stop commenting on my parenting..."
          className="w-full px-4 py-3 rounded-xl bg-secondary/30 border border-border text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring/50 resize-none transition-all"
          rows={4}
        />
      </div>

      {/* Who */}
      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">Who do you need to talk to?</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {personOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setPerson(opt.id)}
              className={`p-3 rounded-xl border text-left transition-all ${
                person === opt.id
                  ? "border-primary bg-primary/5 text-foreground"
                  : "border-border bg-card hover:border-primary/30 text-muted-foreground"
              }`}
            >
              <span className="text-base">{opt.emoji}</span>
              <p className="text-xs font-medium mt-1">{opt.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Tone */}
      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">What tone feels right?</label>
        <div className="grid grid-cols-3 gap-2">
          {toneOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setTone(opt.id)}
              className={`p-3 rounded-xl border text-center transition-all ${
                tone === opt.id
                  ? "border-primary bg-primary/5 text-foreground"
                  : "border-border bg-card hover:border-primary/30 text-muted-foreground"
              }`}
            >
              <p className="text-xs font-medium">{opt.label}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{opt.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Error */}
      {error && (
        <p className="text-sm text-red-500 bg-red-500/5 rounded-xl p-3 border border-red-500/10">{error}</p>
      )}

      {/* Generate button */}
      <Button
        onClick={handleGenerate}
        disabled={!situation.trim() || !person || isLoading}
        className="w-full rounded-xl py-6 text-base"
        size="lg"
      >
        {isLoading ? (
          <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Writing your script...</>
        ) : (
          <><Send className="w-5 h-5 mr-2" /> Give me the words</>
        )}
      </Button>

      {/* Disclaimer */}
      <p className="text-[10px] text-muted-foreground/60 text-center leading-relaxed">
        Scripts are generated for self-reflection and communication support. They are not professional counseling or therapeutic advice.
      </p>
    </div>
  )
}
