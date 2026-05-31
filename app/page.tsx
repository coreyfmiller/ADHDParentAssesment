"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Brain, Battery, Volume2, Moon, CloudMoon, Shield, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

const patterns = [
  {
    icon: Brain,
    label: "Executive function differences",
    description: "Forgetting, losing track, can't start tasks, time blindness",
  },
  {
    icon: Battery,
    label: "Postpartum or chronic depletion",
    description: "Running on empty so long you forgot what energy feels like",
  },
  {
    icon: Volume2,
    label: "Sensory overwhelm & burnout",
    description: "Noise, touch, chaos — your nervous system hitting capacity",
  },
  {
    icon: Moon,
    label: "Hormonal shifts",
    description: "Capacity that fluctuates with your cycle, postpartum, or perimenopause",
  },
  {
    icon: CloudMoon,
    label: "Sleep deprivation",
    description: "Exhaustion so deep it mimics every other condition on this list",
  },
  {
    icon: Shield,
    label: "Trauma patterns repeating",
    description: "Your childhood survival strategies still running in the background",
  },
  {
    icon: Users,
    label: "Systemic overwhelm",
    description: "Doing too much with too little support — the system is broken, not you",
  },
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <Image src="/logo2.png" alt="Mindful Mama" width={120} height={32} className="h-8 w-auto" priority />
          <Link
            href="/dashboard"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            My Toolkit
          </Link>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-12 md:py-20">
        {/* Hero */}
        <section className="text-center mb-16">
          <Image
            src="/logo.png"
            alt="Mindful Mama"
            width={280}
            height={280}
            className="mx-auto mb-8"
            priority
          />
          <h1 className="text-4xl md:text-5xl font-medium text-foreground mb-6 text-balance leading-tight">
            It&apos;s not just you.<br />It&apos;s not just one thing.<br />Let&apos;s untangle it all.
          </h1>
          <p className="text-xl text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
            A self-reflection tool that helps mothers understand why everything feels harder than it should — and gives you strategies that actually fit your brain, your body, and your life.
          </p>
          <Link href="/assess/snapshot">
            <Button
              size="lg"
              className="px-8 py-6 text-lg rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
            >
              Check In With Yourself
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <p className="text-sm text-muted-foreground mt-3">
            5 minutes · Free · No email required
          </p>
        </section>

        {/* Validation Section */}
        <section className="mb-16">
          <div className="bg-card rounded-3xl p-8 md:p-10 border border-border shadow-sm">
            <h2 className="text-2xl font-medium text-foreground mb-2 text-center">
              You&apos;re not failing. You&apos;re carrying too much.
            </h2>
            <p className="text-muted-foreground text-center mb-8 max-w-lg mx-auto">
              Most mothers dealing with overwhelm have multiple things stacking up at once. It&apos;s rarely just one diagnosis or one problem. See if any of these resonate:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {patterns.map((pattern) => {
                const Icon = pattern.icon
                return (
                  <div key={pattern.label} className="flex items-start gap-3 p-4 rounded-2xl bg-secondary/30">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{pattern.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{pattern.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
            <p className="text-center text-sm text-muted-foreground mt-6">
              If you nodded at more than one — that&apos;s exactly why this tool exists.
            </p>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-16">
          <h2 className="text-2xl font-medium text-foreground mb-8 text-center">
            How it works
          </h2>
          <div className="space-y-4">
            {[
              {
                step: "1",
                title: "Check in with yourself",
                description: "5 minutes. 15 questions. Maps where your energy is leaking across five dimensions — cognitive load, emotional bandwidth, physical depletion, system friction, and identity.",
              },
              {
                step: "2",
                title: "See your pattern map",
                description: "Not a score. Not a diagnosis. A visual map of what's stacking up for you right now — and which deeper reflections will be most useful.",
              },
              {
                step: "3",
                title: "Explore your pathways",
                description: "Deeper reflections on the specific patterns driving your overwhelm. Executive function, burnout, sensory overload, hormones, sleep, trauma, systemic load — only the ones relevant to you.",
              },
              {
                step: "4",
                title: "Get matched strategies",
                description: "Concrete, low-friction tools tailored to your patterns. Scripts for hard conversations. Rhythms for different energy days. An AI coach that knows your context.",
              },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4 p-5 rounded-2xl bg-secondary/20">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary font-medium text-sm">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-base font-medium text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Social Proof */}
        <section className="mb-16">
          <div className="bg-primary/5 rounded-3xl p-8 border border-primary/10">
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-foreground/80 italic text-lg leading-relaxed">
                  &quot;I finally understood why some weeks I can handle everything and other weeks I can barely get out of bed. It&apos;s not random. It&apos;s not weakness. There are actual patterns — and now I can work with them instead of against them.&quot;
                </p>
                <p className="text-xs text-muted-foreground mt-3">— Illustrative example of user experience</p>
              </div>
            </div>
          </div>
        </section>

        {/* What This Is / Isn't */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card rounded-2xl p-6 border border-border">
              <h3 className="text-base font-medium text-foreground mb-3">This is</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  A self-reflection and psychoeducation tool
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  Informed by research on executive function, burnout, and neurodivergence
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  Practical strategies that work with your brain, not against it
                </li>
              </ul>
            </div>
            <div className="bg-card rounded-2xl p-6 border border-border">
              <h3 className="text-base font-medium text-foreground mb-3">This is not</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-muted-foreground/50 mt-0.5">✗</span>
                  A diagnostic tool or medical device
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-muted-foreground/50 mt-0.5">✗</span>
                  A substitute for therapy or professional care
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-muted-foreground/50 mt-0.5">✗</span>
                  A one-size-fits-all solution
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-muted-foreground/50 mt-0.5">✗</span>
                  Something that will tell you what&apos;s &quot;wrong&quot; with you
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center mb-12">
          <div className="bg-card rounded-3xl p-8 md:p-10 border border-border shadow-sm">
            <h2 className="text-2xl md:text-3xl font-medium text-foreground mb-4 text-balance">
              You deserve to understand yourself — not just push through.
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Start with a 5-minute check-in. See what&apos;s actually going on — and what to do about it.
            </p>
            <Link href="/assess/snapshot">
              <Button
                size="lg"
                className="px-8 py-6 text-lg rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
              >
                Start My Check-In
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
