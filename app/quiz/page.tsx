"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Brain, Battery, Volume2, Moon, CloudMoon, Shield, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

// This is the viral landing page — "What's Your Overwhelm Type?"
// Designed to be shared on social media and drive new users to the snapshot.

const types = [
  { name: "The Plate Spinner", desc: "Brain holding everything at once", color: "bg-purple-500/10 text-purple-600" },
  { name: "The Quiet Volcano", desc: "Calm outside, erupting inside", color: "bg-rose-500/10 text-rose-600" },
  { name: "The Running-on-Empty", desc: "Depleted at a cellular level", color: "bg-amber-500/10 text-amber-600" },
  { name: "The Invisible Architect", desc: "Running the system nobody sees", color: "bg-emerald-500/10 text-emerald-600" },
  { name: "The Disappeared", desc: "Lost herself in the role", color: "bg-indigo-500/10 text-indigo-600" },
  { name: "The Burning Engine", desc: "Depleted AND reactive", color: "bg-red-500/10 text-red-600" },
  { name: "The Storm Weatherer", desc: "Emotionally maxed, no structure", color: "bg-sky-500/10 text-sky-600" },
  { name: "The Weight Bearer", desc: "Everything, everywhere, all at once", color: "bg-slate-500/10 text-slate-600" },
]

export default function QuizPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/">
            <Image src="/logo2.png" alt="Mindful Mama" width={120} height={32} className="h-8 w-auto" priority />
          </Link>
          <Link
            href="/assess/snapshot"
            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Take the quiz →
          </Link>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-12 md:py-20">
        {/* Hero */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-medium text-foreground mb-6 text-balance leading-tight">
            What&apos;s your overwhelm type?
          </h1>
          <p className="text-xl text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
            It&apos;s not just &quot;stressed.&quot; It&apos;s not just &quot;tired.&quot; There are patterns to your overwhelm — and knowing your type changes how you handle it.
          </p>
          <Link href="/assess/snapshot">
            <Button
              size="lg"
              className="px-8 py-6 text-lg rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
            >
              Find My Type
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <p className="text-sm text-muted-foreground mt-3">
            5 minutes · Free · No email required
          </p>
        </section>

        {/* The Types Grid */}
        <section className="mb-12">
          <h2 className="text-2xl font-medium text-foreground mb-6 text-center">
            The 8 overwhelm archetypes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {types.map((type) => (
              <div
                key={type.name}
                className="bg-card rounded-2xl p-5 border border-border"
              >
                <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full ${type.color} mb-2`}>
                  {type.name}
                </span>
                <p className="text-sm text-muted-foreground">{type.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="mb-12">
          <div className="bg-card rounded-3xl p-8 border border-border text-center">
            <h2 className="text-xl font-medium text-foreground mb-4">
              How it works
            </h2>
            <div className="space-y-3 text-sm text-muted-foreground max-w-md mx-auto text-left">
              <p><strong className="text-foreground">1.</strong> Answer 15 honest questions about your current state (5 min)</p>
              <p><strong className="text-foreground">2.</strong> Get your pattern map — where your energy is actually going</p>
              <p><strong className="text-foreground">3.</strong> Discover your archetype — the shorthand for your specific overwhelm pattern</p>
              <p><strong className="text-foreground">4.</strong> Get matched strategies that work for YOUR type, not generic advice</p>
            </div>
          </div>
        </section>

        {/* Social proof */}
        <section className="mb-12">
          <div className="bg-primary/5 rounded-3xl p-8 border border-primary/10 text-center">
            <p className="text-foreground/80 italic text-lg leading-relaxed max-w-lg mx-auto">
              &quot;I&apos;m a Plate Spinner. The moment I read the description I started crying because someone finally put words to what I&apos;ve been experiencing for years. It&apos;s not that I&apos;m failing — my brain is just holding too much.&quot;
            </p>
            <p className="text-xs text-muted-foreground mt-3">— Illustrative example of user experience</p>
          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center">
          <Link href="/assess/snapshot">
            <Button
              size="lg"
              className="px-8 py-6 text-lg rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
            >
              Find My Overwhelm Type
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <p className="text-sm text-muted-foreground mt-4">
            For self-reflection purposes only. Not a diagnostic tool.
          </p>
        </section>
      </div>
    </main>
  )
}
