"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Heart, Copy, Check, Brain, Battery, Volume2, Settings, Fingerprint } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { PatternMap } from "@/lib/assessments/types"
import { getCurrentArchetype } from "@/lib/archetypes"
import type { Archetype } from "@/lib/archetypes"

const dimensionPartnerExplainers: Record<string, { title: string; forPartner: string; whatHelps: string[] }> = {
  "cognitive-load": {
    title: "Her Brain Is Overloaded",
    forPartner: "Her working memory — the part of the brain that holds active tasks and information — is operating at maximum capacity. She's tracking the school schedule, the grocery list, the doctor appointment, who needs what, what's due when, and the emotional state of everyone in the family. Simultaneously. When she forgets something, it's not carelessness. It's overflow. Her 'desktop' is full and something fell off.",
    whatHelps: [
      "Don't tell her things verbally and expect her to remember — text it or write it down",
      "Own entire domains (not tasks) so she can stop tracking them mentally",
      "Don't ask 'what needs doing?' — that still makes her the manager. Look around and decide yourself",
      "Forgetting ≠ not caring. She needs systems, not more effort",
    ],
  },
  "emotional-bandwidth": {
    title: "Her Emotional Tank Is Empty",
    forPartner: "She's been regulating everyone else's emotions — the kids' meltdowns, your frustrations, her own guilt — with nothing left in the tank for herself. When she snaps or withdraws, it's not that she's being difficult. It's that the part of her brain responsible for calm, measured responses has run out of fuel. She's not choosing to be reactive. Her regulator is depleted.",
    whatHelps: [
      "Don't take her reactivity personally — it's not about you, it's about capacity",
      "Validate before problem-solving: 'That sounds really hard' before 'Have you tried...'",
      "Take the kids without being asked. An hour of silence is medicine for her nervous system",
      "When she says 'I'm fine' and clearly isn't — gently say 'You don't have to be fine with me'",
    ],
  },
  "physical-depletion": {
    title: "Her Body Is Running on Empty",
    forPartner: "She hasn't had adequate sleep, rest, or physical recovery in a long time. This isn't 'being tired' — it's a state where every physical task costs twice the energy it should. Her body has been giving and giving (pregnancy, breastfeeding, carrying, the sheer physicality of managing small humans) with no time to replenish. The exhaustion is cumulative and it affects everything — mood, patience, cognitive function, immune system.",
    whatHelps: [
      "Let her sleep in. Even one morning per week changes everything",
      "Handle bedtime so she can stop being 'on' earlier in the evening",
      "Don't touch her expecting something in return — sometimes she needs contact that isn't a request",
      "When she says she's tired, believe the depth of it. It's not regular tired",
    ],
  },
  "system-friction": {
    title: "She's Carrying the Invisible Load",
    forPartner: "The 'mental load' isn't about who does more tasks — it's about who REMEMBERS that tasks need doing. Who knows the shoe sizes, the teacher's name, when picture day is, that the dog needs flea medicine, that the last clean uniform is in the dryer. She's running the operating system of your household — and that management work is invisible, unacknowledged, and exhausting. When she says she does 'everything' — she means the remembering, planning, and anticipating. Not just the doing.",
    whatHelps: [
      "Own things completely — 'I handle all medical appointments' means booking, remembering, taking them, following up",
      "Stop saying 'just tell me what to do' — that's still making her the project manager",
      "Notice things that need doing without being told. Look at the environment with fresh eyes",
      "Acknowledge the invisible work: 'I know you're holding a lot that I don't see. Thank you.'",
    ],
  },
  "identity-erosion": {
    title: "She's Losing Herself",
    forPartner: "Before children, she was a whole person with interests, opinions, friendships, and a sense of self that wasn't 'mom.' That person hasn't disappeared — but she's been buried under the demands of caregiving with no time or space to exist. When she seems distant, resentful, or says 'I don't know what I want anymore' — that's identity erosion. It's not depression (though it can look like it). It's the loss of self that comes from giving everything to a role with nothing flowing back.",
    whatHelps: [
      "Encourage her to do things that have nothing to do with being a mother — and make it possible (handle the kids)",
      "Ask about HER — her thoughts, her day, her opinions — not just logistics",
      "Don't call self-care 'selfish.' It's how she stays a person, not just a function",
      "Remember who she was before this. Reference it. Remind her she's still that person too",
    ],
  },
}

export default function PartnerPage() {
  const [patternMap, setPatternMap] = useState<PatternMap | null>(null)
  const [archetype, setArchetype] = useState<Archetype | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem("mindful-mama-pattern-map")
      if (stored) setPatternMap(JSON.parse(stored))
    } catch {}
    setArchetype(getCurrentArchetype())
  }, [])

  const elevatedDimensions = patternMap?.dimensions.filter(
    (d) => d.intensity === "high" || d.intensity === "critical"
  ) || []

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div>
        <Link href="/dashboard/me" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
        <h1 className="text-2xl md:text-3xl font-medium text-foreground mb-2">For Your Partner</h1>
        <p className="text-muted-foreground leading-relaxed">
          This page explains what&apos;s happening in a way your partner can understand. It&apos;s not a complaint list — it&apos;s a translation guide. You can share this link with them directly.
        </p>
      </div>

      {/* Opening — Written TO the partner */}
      <div className="bg-gradient-to-br from-primary/5 to-amber-500/5 rounded-2xl p-6 md:p-8 border border-primary/10">
        <div className="flex items-center gap-2 mb-4">
          <Heart className="w-5 h-5 text-primary" />
          <h2 className="text-base font-medium text-foreground">Hey.</h2>
        </div>
        <div className="space-y-3 text-sm text-foreground/80 leading-relaxed">
          <p>
            The person who shared this with you is trying to help you understand something that&apos;s been hard to put into words. This isn&apos;t about blame. It&apos;s about making the invisible visible — so you can be a team instead of two people running parallel.
          </p>
          <p>
            She took a self-assessment that maps where her energy is going. Below is what it showed — translated into terms that explain what&apos;s happening in your household, your relationship, and her daily experience.
          </p>
          <p className="font-medium text-foreground">
            Reading this is an act of love. It means you want to understand.
          </p>
        </div>
      </div>

      {/* Elevated dimensions — the ones that matter */}
      {elevatedDimensions.length > 0 ? (
        <div className="space-y-5">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide px-1">
            Where she&apos;s at right now
          </h2>
          {elevatedDimensions.map((dim) => {
            const explainer = dimensionPartnerExplainers[dim.dimension]
            if (!explainer) return null
            return (
              <div key={dim.dimension} className="bg-card rounded-2xl p-6 border border-border">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    dim.intensity === "critical" ? "bg-red-500/10 text-red-600" : "bg-amber-500/10 text-amber-600"
                  }`}>
                    {dim.intensity}
                  </span>
                  <h3 className="text-base font-medium text-foreground">{explainer.title}</h3>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed mb-4">
                  {explainer.forPartner}
                </p>
                <div>
                  <h4 className="text-xs font-medium text-primary uppercase tracking-wide mb-2">What actually helps</h4>
                  <div className="space-y-2">
                    {explainer.whatHelps.map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-primary mt-0.5 flex-shrink-0">→</span>
                        <p className="text-sm text-foreground/70">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="bg-card rounded-2xl p-6 border border-border text-center">
          <p className="text-sm text-muted-foreground">
            Complete the check-in to generate personalized content for your partner based on your specific patterns.
          </p>
          <Link href="/assess/snapshot">
            <Button className="mt-4 rounded-xl" size="sm">Take the Check-In</Button>
          </Link>
        </div>
      )}

      {/* The Don'ts */}
      <div className="bg-card rounded-2xl p-6 border border-border">
        <h3 className="text-base font-medium text-foreground mb-4">What NOT to say</h3>
        <div className="space-y-3">
          {[
            { wrong: "\"Just make a list\"", why: "Her problem isn't organization. It's that her brain has a smaller working memory under current conditions." },
            { wrong: "\"You just need to relax\"", why: "Relaxation requires safety signals her nervous system isn't receiving. The suggestion itself adds pressure." },
            { wrong: "\"I help when you ask\"", why: "If she has to ask, she's still the manager. That management work IS the load." },
            { wrong: "\"Other moms seem fine\"", why: "Other moms are masking. Or they have different neurology. Or more support. Comparison isn't data." },
            { wrong: "\"What do you want me to do?\"", why: "This puts the cognitive labor of deciding back on her. Instead: look, notice, and act." },
          ].map((item, i) => (
            <div key={i} className="bg-secondary/20 rounded-xl p-4">
              <p className="text-sm font-medium text-foreground">{item.wrong}</p>
              <p className="text-xs text-muted-foreground mt-1">{item.why}</p>
            </div>
          ))}
        </div>
      </div>

      {/* What TO say */}
      <div className="bg-card rounded-2xl p-6 border border-border">
        <h3 className="text-base font-medium text-foreground mb-4">What TO say</h3>
        <div className="space-y-2">
          {[
            "\"I'm taking the kids for an hour. Don't do chores — rest.\"",
            "\"I noticed the dishwasher needed unloading so I did it.\"",
            "\"You seem tapped out. What would help most right now?\"",
            "\"I don't fully understand what you're going through, but I want to.\"",
            "\"You don't have to hold all of this alone. Tell me what to own.\"",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 bg-primary/5 rounded-xl">
              <span className="text-primary mt-0.5 flex-shrink-0">✓</span>
              <p className="text-sm text-foreground/80 italic">{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Closing */}
      <div className="bg-secondary/20 rounded-2xl p-6 border border-border/50 text-center">
        <p className="text-sm text-foreground/70 leading-relaxed max-w-md mx-auto">
          She didn&apos;t share this to make you feel guilty. She shared it because she trusts you enough to be honest about what&apos;s happening. That trust is the foundation of change.
        </p>
      </div>

      {/* Share button */}
      <div className="text-center">
        <Button onClick={handleCopyLink} variant="outline" className="rounded-xl">
          {copied ? <><Check className="w-4 h-4 mr-2" /> Link copied</> : <><Copy className="w-4 h-4 mr-2" /> Copy link to share</>}
        </Button>
      </div>

      {/* Disclaimer */}
      <p className="text-[10px] text-muted-foreground/60 text-center leading-relaxed">
        This content is for educational and self-reflection purposes only. It is not relationship counseling or a substitute for professional support.
      </p>
    </div>
  )
}
