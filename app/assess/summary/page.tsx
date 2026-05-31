"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Brain,
  Battery,
  Volume2,
  Users,
  ArrowRight,
  Sparkles,
  Layers,
  AlertTriangle,
  Heart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { PATHWAYS } from "@/lib/assessments/types"
import type { PatternMap } from "@/lib/assessments/types"

interface PathwayResultData {
  pathwayId: string
  completedAt: number
  answers: Record<string, string>
}

interface IntegratedInsight {
  title: string
  description: string
  type: "stacking" | "interaction" | "leverage"
  icon: React.ElementType
}

const iconMap: Record<string, React.ElementType> = {
  Brain,
  Battery,
  Volume2,
  Users,
}

function generateIntegratedInsights(
  patternMap: PatternMap | null,
  completedPathways: Record<string, PathwayResultData>
): IntegratedInsight[] {
  const insights: IntegratedInsight[] = []

  if (!patternMap) return insights

  const dims = patternMap.dimensions
  const cogLoad = dims.find((d) => d.dimension === "cognitive-load")
  const emotional = dims.find((d) => d.dimension === "emotional-bandwidth")
  const physical = dims.find((d) => d.dimension === "physical-depletion")
  const system = dims.find((d) => d.dimension === "system-friction")
  const identity = dims.find((d) => d.dimension === "identity-erosion")

  // Stacking patterns
  const highDims = dims.filter((d) => d.intensity === "high" || d.intensity === "critical")
  if (highDims.length >= 3) {
    insights.push({
      title: "Multiple systems under strain",
      description: `You have ${highDims.length} dimensions at high or critical levels. When this many areas are strained simultaneously, each one makes the others worse. This isn't a personal failing — it's a system in overload. The priority is reducing load in ANY one area, which creates breathing room for the others.`,
      type: "stacking",
      icon: Layers,
    })
  }

  // Cognitive + Physical interaction
  if (cogLoad && physical && (cogLoad.intensity === "high" || cogLoad.intensity === "critical") && (physical.intensity === "high" || physical.intensity === "critical")) {
    insights.push({
      title: "Exhaustion is amplifying your cognitive struggles",
      description: "When your body is depleted, your brain's executive function drops significantly. Sleep deprivation alone can mimic ADHD symptoms. The forgetfulness, the inability to plan, the mental fog — some of this may lift if physical depletion is addressed first. Consider: is this a brain problem or an energy problem?",
      type: "interaction",
      icon: Brain,
    })
  }

  // Emotional + Identity interaction
  if (emotional && identity && (emotional.intensity === "high" || emotional.intensity === "critical") && (identity.intensity === "high" || identity.intensity === "critical")) {
    insights.push({
      title: "You've lost yourself in the giving",
      description: "Your emotional bandwidth is depleted AND you've lost connection with who you are outside of 'mom.' These feed each other: when you have no sense of self, you have no boundaries. When you have no boundaries, you pour out until there's nothing left. Reconnecting with even one thing that's 'yours' can interrupt this cycle.",
      type: "interaction",
      icon: Heart,
    })
  }

  // System + Cognitive interaction
  if (system && cogLoad && (system.intensity === "high" || system.intensity === "critical") && (cogLoad.intensity === "high" || cogLoad.intensity === "critical")) {
    insights.push({
      title: "No structure + overwhelmed brain = constant crisis mode",
      description: "Your brain struggles with executive function AND your daily life has little structure to compensate. This means you're relying on a brain that can't plan to navigate a life with no safety nets. The highest-leverage move: build ONE reliable routine (morning OR evening) that runs on autopilot. Structure is your brain's wheelchair ramp.",
      type: "leverage",
      icon: AlertTriangle,
    })
  }

  // Physical + System interaction
  if (physical && system && (physical.intensity === "high" || physical.intensity === "critical") && (system.intensity === "high" || system.intensity === "critical")) {
    insights.push({
      title: "You're depleted AND unsupported",
      description: "Your body is running on empty and there's no system around you to catch the slack. This is the burnout recipe: high output, low input, no safety net. Something structural needs to change — whether that's asking for help, lowering standards, or removing responsibilities. Willpower won't fix a structural problem.",
      type: "leverage",
      icon: Battery,
    })
  }

  // Emotional + Physical (burnout signal)
  if (emotional && physical && emotional.intensity === "critical" && physical.intensity === "critical") {
    insights.push({
      title: "This may be beyond overwhelm",
      description: "When both emotional and physical depletion are at critical levels, and especially if joy has disappeared and rest doesn't help, this may be clinical burnout or depression rather than 'just' overwhelm. We strongly encourage you to speak with a healthcare provider. This isn't weakness — it's your body telling you it needs more support than self-help tools can provide.",
      type: "stacking",
      icon: AlertTriangle,
    })
  }

  // Leverage points
  if (system && (system.intensity === "low" || system.intensity === "moderate") && highDims.length >= 2) {
    insights.push({
      title: "Your systems are a strength",
      description: "Despite high strain in other areas, your daily structure is holding. This is your anchor. Protect your routines fiercely during this period — they're carrying more weight than you realize. When other areas improve, it'll be because your systems kept the floor from dropping out.",
      type: "leverage",
      icon: Sparkles,
    })
  }

  return insights
}

function getHighestLeverageAction(patternMap: PatternMap | null): string {
  if (!patternMap) return ""

  const dims = patternMap.dimensions
  const critical = dims.filter((d) => d.intensity === "critical")
  const high = dims.filter((d) => d.intensity === "high")

  if (critical.length > 0) {
    const first = critical[0]
    switch (first.dimension) {
      case "physical-depletion":
        return "Your body is in crisis. Before anything else: can you get one full night of sleep this week? Can you ask someone to take the kids for 3 hours? Physical recovery unlocks everything else."
      case "emotional-bandwidth":
        return "Your emotional system is maxed. The single most helpful thing: reduce the number of decisions you make today by half. Cereal for dinner. Same clothes as yesterday. Say no to one thing. Preserve what's left."
      case "cognitive-load":
        return "Your brain is drowning. Right now: write down the 3 things that MUST happen today. Only 3. Everything else waits. Give your working memory permission to let go of the rest."
      case "system-friction":
        return "Your life has no safety net. One structural change this week: automate, delegate, or eliminate ONE recurring task. Just one. Build from there."
      case "identity-erosion":
        return "You've disappeared into the role. This week: do one thing that has nothing to do with being a mother. Read a chapter. Take a walk alone. Text a friend about something that isn't kids. You still exist."
    }
  }

  if (high.length > 0) {
    return "Multiple areas are strained. Pick the ONE dimension that feels most urgent to you — not the 'worst' one, but the one where a small change would give you the most relief. Start there."
  }

  return "Your pattern map shows manageable levels across the board. Focus on maintaining what's working and building resilience for harder seasons ahead."
}

export default function SummaryPage() {
  const [patternMap, setPatternMap] = useState<PatternMap | null>(null)
  const [completedPathways, setCompletedPathways] = useState<Record<string, PathwayResultData>>({})

  useEffect(() => {
    try {
      const mapData = localStorage.getItem("mindful-mama-pattern-map")
      if (mapData) setPatternMap(JSON.parse(mapData))

      // Load all completed pathway results
      const pathways: Record<string, PathwayResultData> = {}
      for (const p of PATHWAYS) {
        const data = localStorage.getItem(`mindful-mama-pathway-result-${p.slug}`)
        if (data) pathways[p.id] = JSON.parse(data)
      }
      setCompletedPathways(pathways)
    } catch {}
  }, [])

  const insights = generateIntegratedInsights(patternMap, completedPathways)
  const leverageAction = getHighestLeverageAction(patternMap)
  const completedCount = Object.keys(completedPathways).length

  if (!patternMap) {
    return (
      <main className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
          <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/assess" className="flex items-center gap-2">
              <Image src="/logo2.png" alt="Mindful Mama" width={120} height={32} className="h-8 w-auto" priority />
            </Link>
          </div>
        </header>
        <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
          <Layers className="w-12 h-12 text-muted-foreground mx-auto" />
          <h1 className="text-2xl font-medium text-foreground">Your Integrated Picture</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Complete the check-in first to see how your patterns interact and stack. The more pathways you complete, the richer this picture becomes.
          </p>
          <Link href="/assess/snapshot">
            <Button className="rounded-xl">
              Start My Check-In
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/assess" className="flex items-center gap-2">
            <Image src="/logo2.png" alt="Mindful Mama" width={120} height={32} className="h-8 w-auto" priority />
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            My Toolkit
          </Link>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8 md:py-12 space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-medium text-foreground">
            Your Integrated Picture
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            How your patterns interact, where they stack, and where to focus your energy.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <span>Snapshot: ✓</span>
            <span>·</span>
            <span>{completedCount} pathway{completedCount !== 1 ? "s" : ""} completed</span>
          </div>
        </div>

        {/* Pattern Map Overview */}
        <div className="bg-card rounded-3xl p-8 shadow-sm border border-border">
          <h2 className="text-lg font-medium text-foreground mb-4">Your Current State</h2>
          <div className="space-y-4">
            {patternMap.dimensions.map((dim) => (
              <div key={dim.dimension} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground font-medium">{dim.label}</span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    dim.intensity === "critical" ? "bg-red-500/10 text-red-600" :
                    dim.intensity === "high" ? "bg-amber-500/10 text-amber-600" :
                    dim.intensity === "moderate" ? "bg-yellow-500/10 text-yellow-700" :
                    "bg-green-500/10 text-green-600"
                  }`}>
                    {dim.intensity}
                  </span>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      dim.intensity === "critical" ? "bg-red-500" :
                      dim.intensity === "high" ? "bg-amber-500" :
                      dim.intensity === "moderate" ? "bg-yellow-500" :
                      "bg-green-500"
                    }`}
                    style={{ width: `${(dim.score / dim.maxScore) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Highest Leverage Action */}
        {leverageAction && (
          <div className="bg-primary/5 rounded-3xl p-8 border border-primary/20">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-medium text-foreground">Your Highest-Leverage Move</h2>
            </div>
            <p className="text-foreground/80 leading-relaxed">{leverageAction}</p>
          </div>
        )}

        {/* Integrated Insights */}
        {insights.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-medium text-foreground">How Your Patterns Interact</h2>
            <p className="text-sm text-muted-foreground">
              It&apos;s rarely just one thing. Here&apos;s how your dimensions are affecting each other.
            </p>
            {insights.map((insight, idx) => {
              const Icon = insight.icon
              return (
                <div
                  key={idx}
                  className={`bg-card rounded-2xl p-6 border ${
                    insight.type === "stacking" ? "border-red-500/20" :
                    insight.type === "interaction" ? "border-amber-500/20" :
                    "border-primary/20"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      insight.type === "stacking" ? "bg-red-500/10 text-red-600" :
                      insight.type === "interaction" ? "bg-amber-500/10 text-amber-600" :
                      "bg-primary/10 text-primary"
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-medium text-foreground mb-1">{insight.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{insight.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Completed Pathways */}
        {completedCount > 0 && (
          <div className="bg-card rounded-3xl p-8 shadow-sm border border-border">
            <h2 className="text-lg font-medium text-foreground mb-4">Pathways Explored</h2>
            <div className="space-y-3">
              {Object.entries(completedPathways).map(([id, result]) => {
                const pathway = PATHWAYS.find((p) => p.id === id)
                if (!pathway) return null
                const Icon = iconMap[pathway.icon] || Brain
                return (
                  <div key={id} className="flex items-center gap-3 p-3 bg-secondary/30 rounded-xl">
                    <div className={`w-8 h-8 rounded-lg ${pathway.color} flex items-center justify-center`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{pathway.title}</p>
                      <p className="text-xs text-muted-foreground">
                        Completed {new Date(result.completedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="text-xs text-green-600 bg-green-500/10 px-2 py-0.5 rounded-full">✓</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Explore More */}
        {completedCount < 4 && (
          <div className="bg-secondary/30 rounded-2xl p-6 border border-border/50 text-center">
            <p className="text-sm text-muted-foreground mb-3">
              The more pathways you complete, the richer your integrated picture becomes.
              {completedCount === 0 && " Start with your highest-priority recommendation."}
            </p>
            <Link href="/assess">
              <Button variant="outline" className="rounded-xl">
                Explore Pathways
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        )}

        {/* Coach CTA */}
        <div className="bg-card rounded-2xl p-6 border border-border hover:border-primary/30 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-medium text-foreground">Talk it through with your AI Coach</h3>
              <p className="text-sm text-muted-foreground">
                Your coach knows your patterns. Ask about strategies, scripts, or just vent.
              </p>
            </div>
            <Link href="/dashboard/coach">
              <Button size="sm" className="rounded-xl">
                Chat
                <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-muted-foreground/70 text-center leading-relaxed max-w-xl mx-auto">
          This integrated picture is for self-reflection purposes only. It is not a diagnostic tool or substitute for professional care. If multiple areas are at critical levels, please consider speaking with a healthcare provider.
        </p>
      </div>
    </main>
  )
}
