"use client"

import { useState, useEffect } from "react"
import { Zap, ArrowLeft, Wind, Heart, Play, Brain, Hand } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type ToolkitCard = {
  id: string
  title: string
  subtitle: string
  icon: React.ReactNode
  color: string
  steps: { title: string; description: string }[]
  reminder: string
}

const toolkitCards: ToolkitCard[] = [
  {
    id: "about-to-snap",
    title: "I'm About to Snap",
    subtitle: "Your nervous system is at capacity. Here's your 60-second reset.",
    icon: <Wind className="w-6 h-6" />,
    color: "bg-red-500/10 text-red-600 border-red-200",
    steps: [
      { title: "Name it", description: "Say internally: 'I'm dysregulated. This is my nervous system, not my character.'" },
      { title: "Announce it", description: "Say out loud: 'Mama needs 2 minutes. I'll be right back.' Then walk away." },
      { title: "Cold water", description: "Run cold water on your wrists for 30 seconds. This activates your dive reflex and calms your vagus nerve." },
      { title: "5 breaths", description: "Breathe in for 4 counts, out for 6 counts. The longer exhale signals safety to your brain." },
      { title: "Return", description: "Go back. You don't need to be calm — just calmer. 'Okay, I'm back. What do we need?'" },
    ],
    reminder: "Stepping away is not abandonment. It's modeling self-regulation for your children.",
  },
  {
    id: "just-snapped",
    title: "I Just Snapped",
    subtitle: "It happened. The guilt is coming. Here's what to do in the next 5 minutes.",
    icon: <Heart className="w-6 h-6" />,
    color: "bg-orange-500/10 text-orange-600 border-orange-200",
    steps: [
      { title: "Pause the shame", description: "Say to yourself: 'I made a mistake. That's a behavior, not my identity. I can repair this.'" },
      { title: "Take 60 seconds", description: "Breathe. Splash water on your face. You cannot repair while you're still activated." },
      { title: "Go to your child", description: "Get on their level physically. Eye contact. Soft voice." },
      { title: "Say the repair", description: "'I'm sorry I yelled. That wasn't okay. You didn't deserve that. I was feeling overwhelmed and I handled it badly. I love you.'" },
      { title: "Reconnect", description: "Offer a hug, a hand hold, or simply sit near them. Let them decide what they need." },
    ],
    reminder: "Research shows it's not the rupture that damages attachment — it's the lack of repair. You're repairing. That's what matters.",
  },
  {
    id: "cant-start",
    title: "I Can't Start",
    subtitle: "You can see what needs doing. Your body won't move. That's task initiation failure, not laziness.",
    icon: <Play className="w-6 h-6" />,
    color: "bg-amber-500/10 text-amber-600 border-amber-200",
    steps: [
      { title: "Forgive the freeze", description: "'My brain is frozen right now. That's okay. I'm not lazy — my activation threshold isn't being met.'" },
      { title: "Shrink the task", description: "Don't think about the whole thing. What's the TINIEST first step? Not 'clean the kitchen.' Just 'pick up one cup.'" },
      { title: "Add stimulation", description: "Put on music, a podcast, or call someone. Your brain needs parallel input to activate on boring tasks." },
      { title: "The 5-minute contract", description: "'I will do this for 5 minutes only. Then I can stop.' Set a timer. Usually, starting is the hardest part." },
      { title: "If nothing works", description: "That's okay too. Ask: 'What's the ONE thing that will make the next hour easier?' Do only that." },
    ],
    reminder: "Paralysis is a neurological state, not a moral failing. The signal from intention to action is blocked. Be patient with yourself.",
  },
  {
    id: "forgot-something",
    title: "I Forgot Something Important",
    subtitle: "The shame is hitting. Here's how to handle the next 10 minutes.",
    icon: <Brain className="w-6 h-6" />,
    color: "bg-purple-500/10 text-purple-600 border-purple-200",
    steps: [
      { title: "Interrupt the shame", description: "'I forgot because my working memory has limits, not because I don't care. What can I do RIGHT NOW?'" },
      { title: "Fix what you can", description: "Is there a quick fix? Call the school. Email the teacher. Send the form late. Most things are recoverable." },
      { title: "If it can't be fixed", description: "Acknowledge it to whoever's affected: 'I'm sorry I missed this. I'm working on better systems.'" },
      { title: "Patch the system", description: "Ask: 'What ONE thing could prevent this specific thing from happening again?' A reminder? A visual cue? A checklist?" },
      { title: "Release it", description: "You handled it. It's done. Ruminating won't change it. Move forward." },
    ],
    reminder: "Forgetting doesn't mean you don't care. It means your brain has a smaller 'desktop' — and parenting demands enormous RAM.",
  },
  {
    id: "touched-out",
    title: "I'm Touched Out",
    subtitle: "Your skin is crawling. You need space. Here's how to get it without guilt.",
    icon: <Hand className="w-6 h-6" />,
    color: "bg-teal-500/10 text-teal-600 border-teal-200",
    steps: [
      { title: "Acknowledge it", description: "'My body has hit its touch capacity. This is neurological, not emotional. I still love my kids.'" },
      { title: "Use the script", description: "Say: 'I love you AND my body needs space right now. Can we do side-by-side time instead?'" },
      { title: "Offer alternatives", description: "Sit next to them. Hold hands instead of hugging. Read a book together without lap-sitting. Blow kisses." },
      { title: "Create a buffer", description: "Put on a show or audiobook. Give yourself 10 minutes of zero physical contact. Bathroom break. Car break." },
      { title: "Return with intention", description: "When you're ready: 'Okay, I'm recharged. Who wants a hug?' Let it be on YOUR terms." },
    ],
    reminder: "Being touched out is a real neurological state. It's your nervous system communicating a boundary that deserves respect.",
  },
  {
    id: "bedtime-falling-apart",
    title: "Bedtime Is Falling Apart",
    subtitle: "You're depleted. They're wired. Here's the survival protocol.",
    icon: <Zap className="w-6 h-6" />,
    color: "bg-indigo-500/10 text-indigo-600 border-indigo-200",
    steps: [
      { title: "Lower every bar", description: "Tonight's goal: kids in bed, safe, and alive. Not bathed. Not storied. Not perfectly routined. Just in bed." },
      { title: "Simplify radically", description: "Skip the bath. One short book or no book. Teeth brushed (or not — one night won't cause cavities). PJs or sleep in clothes." },
      { title: "Use your calm voice", description: "Even if you don't feel calm. Whisper. Slow down your speech. Your regulated tone helps regulate them." },
      { title: "The 'boring parent' technique", description: "Be as boring as possible. Monotone voice. No engagement with stalling tactics. Boring = no dopamine = sleep comes faster." },
      { title: "Forgive the imperfect night", description: "Tomorrow is a new bedtime. Tonight just needed to end. And it did. You did that." },
    ],
    reminder: "A 'good enough' bedtime with a regulated parent is better than a 'perfect' routine with a parent who's falling apart.",
  },
]

export default function ToolkitPage() {
  const [activeCard, setActiveCard] = useState<string | null>(null)

  // Listen for clicks on the nav link to this page to reset state
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a[href="/dashboard/toolkit"]')
      if (link) {
        setActiveCard(null)
      }
    }
    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [])

  const selectedCard = toolkitCards.find((c) => c.id === activeCard)

  if (selectedCard) {
    return (
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => setActiveCard(null)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to toolkit
        </button>

        <div className={cn("rounded-3xl p-8 md:p-10 border", selectedCard.color.replace("text-", "border-").split(" ")[2] || "border-border")}>
          <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-4", selectedCard.color.split(" ").slice(0, 2).join(" "))}>
            {selectedCard.icon}
          </div>
          <h1 className="text-2xl md:text-3xl font-medium text-foreground mb-2">
            {selectedCard.title}
          </h1>
          <p className="text-muted-foreground mb-8">
            {selectedCard.subtitle}
          </p>

          {/* Steps */}
          <div className="space-y-4 mb-8">
            {selectedCard.steps.map((step, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                  <span className="text-sm font-medium text-foreground">{idx + 1}</span>
                </div>
                <div className="pt-1">
                  <h3 className="font-medium text-foreground mb-0.5">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Reminder */}
          <div className="bg-primary/5 rounded-2xl p-5 border border-primary/10">
            <p className="text-sm text-foreground/80 italic leading-relaxed">
              {selectedCard.reminder}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
            <Zap className="w-5 h-5 text-red-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-medium text-foreground">Emergency Toolkit</h1>
        </div>
        <p className="text-muted-foreground">
          Tap the one that matches right now. Each card gives you a step-by-step intervention you can use in under 2 minutes.
        </p>
      </div>

      {/* Card grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {toolkitCards.map((card) => (
          <button
            key={card.id}
            onClick={() => setActiveCard(card.id)}
            className={cn(
              "text-left rounded-2xl p-6 border-2 transition-all hover:shadow-md hover:scale-[1.02] active:scale-[0.98]",
              card.color.split(" ").slice(0, 1).join(" "),
              "border-border hover:border-current"
            )}
          >
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-3", card.color.split(" ").slice(0, 2).join(" "))}>
              {card.icon}
            </div>
            <h2 className="text-lg font-medium text-foreground mb-1">{card.title}</h2>
            <p className="text-sm text-muted-foreground line-clamp-2">{card.subtitle}</p>
          </button>
        ))}
      </div>

      <div className="text-center pt-4">
        <p className="text-xs text-muted-foreground">
          These tools are for self-regulation support, not a substitute for professional care.
          If you are in crisis, contact 988 or your local emergency services.
        </p>
      </div>
    </div>
  )
}
