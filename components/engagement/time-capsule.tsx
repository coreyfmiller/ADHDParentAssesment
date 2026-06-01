"use client"

import { useState, useEffect } from "react"
import { Mail, MailOpen, Lock, Send, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  createTimeCapsule,
  getReadyCapsules,
  getLockedCapsules,
  openCapsule,
  getRandomPrompt,
  hasReadyCapsule,
} from "@/lib/engagement/time-capsule"
import type { TimeCapsule } from "@/lib/engagement/time-capsule"
import { getCurrentArchetype } from "@/lib/archetypes"

export function TimeCapsuleWidget() {
  const [readyCapsules, setReadyCapsules] = useState<TimeCapsule[]>([])
  const [lockedCapsules, setLockedCapsules] = useState<TimeCapsule[]>([])
  const [isWriting, setIsWriting] = useState(false)
  const [message, setMessage] = useState("")
  const [daysUntilOpen, setDaysUntilOpen] = useState(14)
  const [prompt, setPrompt] = useState("")
  const [justSent, setJustSent] = useState(false)
  const [openedCapsule, setOpenedCapsule] = useState<TimeCapsule | null>(null)

  useEffect(() => {
    setReadyCapsules(getReadyCapsules())
    setLockedCapsules(getLockedCapsules())
    setPrompt(getRandomPrompt())
  }, [])

  const handleSend = () => {
    if (!message.trim()) return

    const archetype = getCurrentArchetype()
    const context = archetype ? `Archetype: ${archetype.name}` : undefined

    createTimeCapsule(message, daysUntilOpen, context)
    setMessage("")
    setIsWriting(false)
    setJustSent(true)
    setLockedCapsules(getLockedCapsules())

    setTimeout(() => setJustSent(false), 4000)
  }

  const handleOpen = (capsule: TimeCapsule) => {
    const opened = openCapsule(capsule.id)
    if (opened) {
      setOpenedCapsule(opened)
      setReadyCapsules(getReadyCapsules())
    }
  }

  const handleDismissOpened = () => {
    setOpenedCapsule(null)
  }

  // A capsule is ready to open — show it prominently
  if (openedCapsule) {
    const writtenDate = new Date(openedCapsule.writtenAt).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    })
    return (
      <div className="bg-card rounded-2xl border border-primary/20 overflow-hidden shadow-sm">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <MailOpen className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary">A letter from past-you</span>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            Written on {writtenDate}
            {openedCapsule.context && ` · ${openedCapsule.context}`}
          </p>
          <div className="bg-primary/5 rounded-xl p-5 border border-primary/10">
            <p className="text-foreground leading-relaxed italic">
              &quot;{openedCapsule.message}&quot;
            </p>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <Button
              onClick={handleDismissOpened}
              variant="ghost"
              size="sm"
              className="rounded-xl text-muted-foreground"
            >
              Close
            </Button>
            <button
              onClick={() => { handleDismissOpened(); setIsWriting(true) }}
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              Write another →
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Ready capsules waiting to be opened
  if (readyCapsules.length > 0) {
    const capsule = readyCapsules[0]
    const writtenDate = new Date(capsule.writtenAt).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    })
    return (
      <div className="bg-card rounded-2xl border border-primary/20 overflow-hidden shadow-sm">
        <div className="p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">
                Past-you left you something
              </p>
              <p className="text-xs text-muted-foreground">
                Written {writtenDate} · Ready to open
              </p>
            </div>
            <Button
              onClick={() => handleOpen(capsule)}
              size="sm"
              className="rounded-xl"
            >
              Open
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Just sent confirmation
  if (justSent) {
    return (
      <div className="bg-card rounded-2xl border border-primary/15 p-5 text-center">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
          <Lock className="w-5 h-5 text-primary" />
        </div>
        <p className="text-sm font-medium text-foreground">Sealed and waiting.</p>
        <p className="text-xs text-muted-foreground mt-1">
          Your letter will arrive in {daysUntilOpen} days. Future-you will be glad you wrote it.
        </p>
      </div>
    )
  }

  // Writing mode
  if (isWriting) {
    return (
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Mail className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Letter to future-you</span>
          </div>
          <p className="text-sm text-muted-foreground italic mb-4">{prompt}</p>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write something to the version of you who opens this later..."
            className="w-full px-4 py-3 rounded-xl bg-secondary/30 border border-border text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring/50 resize-none"
            rows={4}
          />
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              <Clock className="w-3 h-3 text-muted-foreground" />
              <select
                value={daysUntilOpen}
                onChange={(e) => setDaysUntilOpen(Number(e.target.value))}
                className="text-xs bg-secondary/50 border border-border rounded-lg px-2 py-1 text-foreground"
              >
                <option value={7}>Opens in 1 week</option>
                <option value={14}>Opens in 2 weeks</option>
                <option value={30}>Opens in 1 month</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setIsWriting(false)}
                variant="ghost"
                size="sm"
                className="rounded-xl text-muted-foreground"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSend}
                disabled={!message.trim()}
                size="sm"
                className="rounded-xl"
              >
                <Send className="w-3 h-3 mr-1" />
                Seal it
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Default — collapsed entry point
  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden">
      <button
        onClick={() => setIsWriting(true)}
        className="w-full p-4 text-left hover:bg-secondary/20 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Mail className="w-4 h-4 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">Write a letter to future-you</p>
            <p className="text-xs text-muted-foreground">
              {lockedCapsules.length > 0
                ? `${lockedCapsules.length} letter${lockedCapsules.length > 1 ? "s" : ""} waiting to arrive`
                : "It'll arrive when you need it most"
              }
            </p>
          </div>
        </div>
      </button>
    </div>
  )
}
