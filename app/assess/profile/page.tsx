"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  Sparkles,
  Layers,
  Target,
  Heart,
  ListOrdered,
  Link2,
  AlertTriangle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { PATHWAYS } from "@/lib/assessments/types"
import type { PatternMap } from "@/lib/assessments/types"
import { generateProfile, type UserProfile } from "@/lib/assessments/profile-generator"

const PROFILE_STORAGE_KEY = "mindful-mama-generated-profile"

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [patternMap, setPatternMap] = useState<PatternMap | null>(null)
  const [pathwayCount, setPathwayCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      // Load pattern map
      const mapData = localStorage.getItem("mindful-mama-pattern-map")
      if (!mapData) { setLoading(false); return }
      const map = JSON.parse(mapData) as PatternMap
      setPatternMap(map)

      // Load all pathway results
      const results: Record<string, { pathwayId: string; answers: Record<string, string> }> = {}
      for (const p of PATHWAYS) {
        const data = localStorage.getItem(`mindful-mama-pathway-result-${p.slug}`)
        if (data) {
          const parsed = JSON.parse(data)
          results[p.id] = { pathwayId: p.id, answers: parsed.answers || {} }
        }
      }
      setPathwayCount(Object.keys(results).length)

      // Generate profile if we have at least the snapshot
      if (Object.keys(results).length > 0) {
        const generated = generateProfile(map, results)
        setProfile(generated)
        localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(generated))
      } else {
        // Try loading a previously generated profile
        const cached = localStorage.getItem(PROFILE_STORAGE_KEY)
        if (cached) setProfile(JSON.parse(cached))
      }
    } catch {}
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading your profile...</p>
      </main>
    )
  }

  if (!patternMap || !profile) {
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
          <Target className="w-12 h-12 text-muted-foreground mx-auto" />
          <h1 className="text-2xl font-medium text-foreground">Your Profile</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Complete the check-in and at least one deeper pathway to generate your personalized profile. The more pathways you complete, the richer and more accurate your profile becomes.
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
            Your Profile
          </h1>
          <p className="text-sm text-muted-foreground">
            Generated from {pathwayCount} pathway{pathwayCount !== 1 ? "s" : ""} · Updated {new Date(profile.generatedAt).toLocaleDateString()}
          </p>
        </div>

        {/* Narrative Summary */}
        <div className="bg-card rounded-3xl p-8 md:p-10 shadow-sm border border-border">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-medium text-foreground">Your Pattern Summary</h2>
          </div>
          <p className="text-foreground/80 leading-relaxed text-lg">
            {profile.narrative}
          </p>
        </div>

        {/* Leverage Points */}
        {profile.leveragePoints.length > 0 && (
          <div className="bg-card rounded-3xl p-8 shadow-sm border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-medium text-foreground">Your Leverage Points</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              The changes that will create the most relief based on how your patterns interact.
            </p>
            <div className="space-y-4">
              {profile.leveragePoints.map((point, idx) => (
                <div key={idx} className={`rounded-2xl p-5 border ${
                  point.impact === "high" ? "bg-primary/5 border-primary/15" : "bg-secondary/30 border-border/50"
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-base font-medium text-foreground">{point.title}</h3>
                    {point.impact === "high" && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                        High impact
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{point.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stacking Chains */}
        {profile.stackingChains.length > 0 && (
          <div className="bg-card rounded-3xl p-8 shadow-sm border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Link2 className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-medium text-foreground">How Your Patterns Stack</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              These aren&apos;t separate problems — they&apos;re chains where each link makes the next one worse.
            </p>
            <div className="space-y-5">
              {profile.stackingChains.map((chain, idx) => (
                <div key={idx} className="bg-secondary/20 rounded-2xl p-5">
                  {/* Chain visualization */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    {chain.chain.map((link, linkIdx) => (
                      <span key={linkIdx} className="flex items-center gap-2">
                        <span className="text-xs font-medium text-foreground bg-card px-3 py-1.5 rounded-full border border-border">
                          {link}
                        </span>
                        {linkIdx < chain.chain.length - 1 && (
                          <span className="text-muted-foreground text-xs">→</span>
                        )}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{chain.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Strengths */}
        {profile.strengths.length > 0 && (
          <div className="bg-card rounded-3xl p-8 shadow-sm border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-medium text-foreground">What&apos;s Working</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              These areas are holding steady. They&apos;re your foundation — protect them.
            </p>
            <div className="space-y-3">
              {profile.strengths.map((strength, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-green-500/5 rounded-xl border border-green-500/10">
                  <span className="text-green-600 mt-0.5 flex-shrink-0">✓</span>
                  <div>
                    <p className="text-sm font-medium text-foreground">{strength.area}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{strength.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Strategy Priority */}
        {profile.strategyPriority.length > 0 && (
          <div className="bg-card rounded-3xl p-8 shadow-sm border border-border">
            <div className="flex items-center gap-2 mb-2">
              <ListOrdered className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-medium text-foreground">Your Strategy Priority</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              In order of impact. Start with #1. Don&apos;t try to do everything at once.
            </p>
            <div className="space-y-3">
              {profile.strategyPriority.map((item) => (
                <div key={item.order} className="flex items-start gap-4 p-4 bg-secondary/20 rounded-xl">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary font-medium text-sm">
                    {item.order}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.area}</p>
                    <p className="text-sm text-foreground/80 mt-1">{item.action}</p>
                    <p className="text-sm text-muted-foreground mt-1 italic">{item.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Deepen Profile CTA */}
        {pathwayCount < 4 && (
          <div className="bg-secondary/30 rounded-2xl p-6 border border-border/50 text-center">
            <p className="text-sm text-muted-foreground mb-3">
              You&apos;ve completed {pathwayCount} of 7 pathways. Each one you add makes this profile more accurate and your strategies more targeted.
            </p>
            <Link href="/assess">
              <Button variant="outline" className="rounded-xl">
                Explore More Pathways
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        )}

        {/* Coach CTA */}
        <div className="bg-card rounded-2xl p-6 border border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-medium text-foreground">Your coach knows all of this</h3>
              <p className="text-sm text-muted-foreground">
                When you chat with the AI Coach, it has your full profile context. Ask it about any of these patterns.
              </p>
            </div>
            <Link href="/dashboard/coach">
              <Button size="sm" className="rounded-xl">Chat</Button>
            </Link>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-muted-foreground/70 text-center leading-relaxed max-w-xl mx-auto">
          This profile is generated from your self-reflection responses for educational purposes only. It is not a clinical assessment, diagnosis, or treatment plan. If you&apos;re struggling, please reach out to a qualified healthcare provider.
        </p>
      </div>
    </main>
  )
}
