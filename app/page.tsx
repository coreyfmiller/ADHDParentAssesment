"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  const [isReturningUser, setIsReturningUser] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem("mindful-mama-pattern-map")
      if (stored) setIsReturningUser(true)
    } catch {}
  }, [])

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <Image src="/logo2.png" alt="Mindful Mama" width={120} height={32} className="h-8 w-auto" priority />
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            My Toolkit
          </Link>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-12 md:py-20">
        {/* Hero — The hook. She should feel understood in the first 3 seconds. */}
        <section className="text-center mb-16">
          <Image
            src="/logo.png"
            alt="Mindful Mama"
            width={200}
            height={200}
            className="mx-auto mb-8"
            priority
          />
          <h1 className="text-3xl md:text-5xl font-medium text-foreground mb-6 text-balance leading-tight">
            You&apos;re not failing.<br />
            Your brain is carrying<br />
            more than it was built for.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto mb-8 leading-relaxed">
            Five minutes to understand what&apos;s actually going on — and get strategies that work with how you&apos;re wired, not against it.
          </p>

          {isReturningUser ? (
            <div className="space-y-3">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="px-8 py-6 text-lg rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-lg shadow-primary/20"
                >
                  Go to My Toolkit
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <div>
                <Link href="/assess/snapshot" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Check in again →
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <Link href="/assess/snapshot">
                <Button
                  size="lg"
                  className="px-8 py-6 text-lg rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-lg shadow-primary/20"
                >
                  Start My Check-In — Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground">
                5 minutes · No email · No sign-up · Instant results
              </p>
              <div className="pt-1">
                <Link href="/dashboard" className="text-xs text-muted-foreground/70 hover:text-primary transition-colors">
                  Already been here? Go to your toolkit →
                </Link>
              </div>
            </div>
          )}
        </section>

        {/* The Recognition Section — She sees herself here */}
        <section className="mb-16">
          <div className="bg-card rounded-3xl p-8 md:p-10 border border-border shadow-sm">
            <h2 className="text-xl md:text-2xl font-medium text-foreground mb-6 text-center text-balance">
              If any of this sounds familiar, you&apos;re in the right place.
            </h2>
            <div className="space-y-4 max-w-lg mx-auto">
              {[
                "You forget things constantly and it makes you feel broken",
                "By evening, you have nothing left — for anyone, including yourself",
                "Noise, touch, and chaos make you want to crawl out of your skin",
                "Some weeks you can handle everything. Other weeks, you can barely get dressed",
                "You snap at your kids and then spiral in guilt for hours",
                "You're doing everything and it's still not enough",
                "You don't remember who you were before this",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-primary/60" />
                  </div>
                  <p className="text-sm md:text-base text-foreground/80 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground mt-8 max-w-md mx-auto">
              These aren&apos;t character flaws. They&apos;re patterns — neurological, hormonal, systemic — and once you see them, you can work with them instead of against them.
            </p>
          </div>
        </section>

        {/* What You Get — Specific, tangible, not vague */}
        <section className="mb-16">
          <h2 className="text-xl md:text-2xl font-medium text-foreground mb-8 text-center">
            What you get in 5 minutes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "Your Pattern Map",
                description: "See exactly where your energy is leaking — not a vague score, a visual map of the five dimensions stacking up on you right now.",
              },
              {
                title: "Your Overwhelm Type",
                description: "Not a personality quiz. A recognition of your specific pattern — how your brain, body, and circumstances interact to create your unique overwhelm.",
              },
              {
                title: "Matched Strategies",
                description: "Concrete tools that fit YOUR patterns. Scripts for the hard conversations. Rhythms for different energy days. An AI coach that knows your context.",
              },
              {
                title: "A Daily Toolkit",
                description: "One action each morning. An evening recap of what you actually did. Micro-wins logged. Evidence that you're not doing nothing — even when it feels like it.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-secondary/20 rounded-2xl p-5">
                <h3 className="text-sm font-medium text-foreground mb-1.5">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works — Simplified */}
        <section className="mb-16">
          <h2 className="text-xl md:text-2xl font-medium text-foreground mb-8 text-center">
            How it works
          </h2>
          <div className="space-y-3">
            {[
              { step: "1", title: "Answer 15 honest questions", subtitle: "No right answers. Just what's true for you right now." },
              { step: "2", title: "See your pattern map", subtitle: "Where your energy is going. What's stacking up. What's driving the overwhelm." },
              { step: "3", title: "Get strategies that actually fit", subtitle: "Not generic advice. Tools matched to your specific brain, your specific load, your specific life." },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4 p-4 rounded-2xl bg-card border border-border/50">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary font-medium text-sm">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Social Proof */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-primary/5 to-amber-500/5 rounded-3xl p-8 border border-primary/10">
            <p className="text-foreground/80 italic text-base md:text-lg leading-relaxed text-center max-w-lg mx-auto">
              &quot;I finally understood why some weeks I can handle everything and other weeks I can barely get out of bed. It&apos;s not random. It&apos;s not weakness. There are actual patterns — and now I can work with them instead of against them.&quot;
            </p>
            <p className="text-xs text-muted-foreground mt-4 text-center">— Illustrative example of user experience</p>
          </div>
        </section>

        {/* Trust Signals */}
        <section className="mb-16">
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-primary" /> Free to use</span>
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-primary" /> No email required</span>
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-primary" /> No diagnosis</span>
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-primary" /> Research-informed</span>
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-primary" /> Private & secure</span>
          </div>
        </section>

        {/* This Is / Isn't — Compressed */}
        <section className="mb-16">
          <div className="bg-card rounded-2xl p-6 border border-border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-foreground mb-3">What this is</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2"><span className="text-primary mt-0.5">✓</span> A self-reflection tool informed by neuroscience research</li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-0.5">✓</span> Practical strategies for real life, not Instagram life</li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-0.5">✓</span> Built specifically for how overwhelmed mothers&apos; brains actually work</li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium text-foreground mb-3">What this is not</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2"><span className="text-muted-foreground/50 mt-0.5">✗</span> Not a diagnosis or medical device</li>
                  <li className="flex items-start gap-2"><span className="text-muted-foreground/50 mt-0.5">✗</span> Not a substitute for therapy</li>
                  <li className="flex items-start gap-2"><span className="text-muted-foreground/50 mt-0.5">✗</span> Not going to tell you what&apos;s &quot;wrong&quot; with you</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA — The close */}
        <section className="text-center mb-12">
          <div className="bg-gradient-to-br from-card to-secondary/20 rounded-3xl p-8 md:p-10 border border-border shadow-sm">
            {isReturningUser ? (
              <>
                <h2 className="text-2xl md:text-3xl font-medium text-foreground mb-3 text-balance">
                  Your toolkit is ready.
                </h2>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Your strategies, your coach, your progress — all waiting where you left off.
                </p>
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    className="px-8 py-6 text-lg rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-lg shadow-primary/20"
                  >
                    Go to My Toolkit
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <h2 className="text-2xl md:text-3xl font-medium text-foreground mb-3 text-balance">
                  You deserve to understand yourself —<br className="hidden md:block" /> not just push through another day.
                </h2>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Five minutes. No sign-up. Just clarity about what&apos;s actually going on — and what to do about it.
                </p>
                <Link href="/assess/snapshot">
                  <Button
                    size="lg"
                    className="px-8 py-6 text-lg rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-lg shadow-primary/20"
                  >
                    Start My Check-In
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}
