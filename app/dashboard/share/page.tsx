"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Share2, Copy, Check, Heart, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getCurrentArchetype } from "@/lib/archetypes"
import type { Archetype } from "@/lib/archetypes"
import type { PatternMap } from "@/lib/assessments/types"

export default function SharePage() {
  const [archetype, setArchetype] = useState<Archetype | null>(null)
  const [patternMap, setPatternMap] = useState<PatternMap | null>(null)
  const [copied, setCopied] = useState(false)
  const [giftCopied, setGiftCopied] = useState(false)

  useEffect(() => {
    setArchetype(getCurrentArchetype())
    try {
      const data = localStorage.getItem("mindful-mama-pattern-map")
      if (data) setPatternMap(JSON.parse(data))
    } catch {}
  }, [])

  const handleCopyPartnerMessage = async () => {
    if (!archetype) return

    const message = `Hey — I took this self-reflection quiz and it helped me understand my overwhelm patterns. I'm "${archetype.name}."

What that means:
${archetype.description.slice(0, 200)}...

My hidden strength: ${archetype.hiddenStrength.slice(0, 150)}...

My kryptonite (what drains me fastest): ${archetype.kryptonite}

What actually helps me: ${archetype.whatHelps}

I'm sharing this because I want you to understand what I'm dealing with — not as an excuse, but so we can work together better. This isn't about blame. It's about understanding.

If you want to find your own type: ${window.location.origin}/quiz`

    await navigator.clipboard.writeText(message)
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  const handleCopyGiftLink = async () => {
    const link = `${window.location.origin}/quiz`
    await navigator.clipboard.writeText(
      `I found something that finally helped me understand why everything feels so hard. It's not therapy — it's a self-reflection tool that maps your overwhelm patterns and gives you strategies that actually fit your brain.\n\nTake the 5-minute quiz and find your type: ${link}\n\nIt's free. No email required. I think you'd find it really validating.`
    )
    setGiftCopied(true)
    setTimeout(() => setGiftCopied(false), 3000)
  }

  if (!archetype) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <h1 className="text-2xl font-medium text-foreground mb-3">Share Your Type</h1>
          <p className="text-muted-foreground mb-6">
            Complete the check-in first to discover your archetype, then share it with your partner or a friend.
          </p>
          <Link href="/assess/snapshot">
            <Button className="rounded-xl">Take the Check-In</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-medium text-foreground mb-2">Share & Gift</h1>
        <p className="text-muted-foreground">
          Help the people in your life understand what you&apos;re dealing with — or give this tool to someone who needs it.
        </p>
      </div>

      {/* Share with Partner */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-foreground">Share with your partner</h2>
              <p className="text-xs text-muted-foreground">Help them understand your type</p>
            </div>
          </div>

          <div className="bg-secondary/30 rounded-xl p-5 mb-4">
            <p className="text-sm text-foreground font-medium mb-2">Your type: {archetype.name}</p>
            <p className="text-sm text-muted-foreground mb-3">{archetype.tagline}</p>

            <div className="space-y-3 text-sm">
              <div>
                <p className="text-xs font-medium text-foreground uppercase tracking-wide mb-1">What drains me fastest:</p>
                <p className="text-muted-foreground">{archetype.kryptonite}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-foreground uppercase tracking-wide mb-1">What actually helps:</p>
                <p className="text-muted-foreground">{archetype.whatHelps}</p>
              </div>
            </div>
          </div>

          <p className="text-xs text-muted-foreground mb-3">
            This copies a message you can text or email to your partner. It explains your type, what drains you, and what helps — without blame.
          </p>

          <Button
            onClick={handleCopyPartnerMessage}
            className="w-full rounded-xl"
            variant={copied ? "outline" : "default"}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copied — paste it in a text
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy message for my partner
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Gift to a Friend */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Gift className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-foreground">Gift to a friend</h2>
              <p className="text-xs text-muted-foreground">Know someone who needs this?</p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-4">
            Know another mom who&apos;s struggling? Send her the quiz with a personal message. Sometimes knowing &quot;it&apos;s not just me&quot; is the thing that changes everything.
          </p>

          <Button
            onClick={handleCopyGiftLink}
            className="w-full rounded-xl"
            variant={giftCopied ? "outline" : "default"}
          >
            {giftCopied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copied — send it to her
              </>
            ) : (
              <>
                <Gift className="w-4 h-4 mr-2" />
                Copy gift message
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground mt-3 text-center">
            The quiz is free. She&apos;ll get her type and pattern map at no cost.
          </p>
        </div>
      </div>

      {/* Share your type on social */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Share2 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-foreground">Share your type</h2>
              <p className="text-xs text-muted-foreground">Let others find theirs</p>
            </div>
          </div>

          <div className="bg-primary/5 rounded-xl p-5 border border-primary/10 mb-4">
            <p className="text-sm text-foreground italic">
              &quot;I&apos;m {archetype.name} — {archetype.tagline.toLowerCase()} What&apos;s your overwhelm type?&quot;
            </p>
          </div>

          <Button
            onClick={async () => {
              const text = `I'm ${archetype.name} — ${archetype.tagline.toLowerCase()} What's your overwhelm type?\n\nFind yours: ${window.location.origin}/quiz`
              if (navigator.share) {
                try { await navigator.share({ text }) } catch {}
              } else {
                await navigator.clipboard.writeText(text)
              }
            }}
            variant="outline"
            className="w-full rounded-xl"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>
    </div>
  )
}
