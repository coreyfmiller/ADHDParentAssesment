"use client"

import Link from "next/link"
import { Sparkles, ArrowLeft } from "lucide-react"

export default function HolidayGuide() {
  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div>
        <Link href="/dashboard/guides" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Guides
        </Link>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-red-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-medium text-foreground">Holiday Season Without Burnout</h1>
        </div>
        <p className="text-muted-foreground">
          The emotional labor of making magic for everyone else — and how to survive December with your sanity intact.
        </p>
      </div>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Why the Holidays Break Overwhelmed Mothers</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            The holiday season is a perfect storm for overwhelmed brains: disrupted routines, increased social demands, financial pressure, family dynamics, sensory overload (lights, noise, crowds), and the invisible expectation that YOU will create &quot;the magic&quot; for everyone else while managing your own emotional responses to all of it.
          </p>
          <p>
            Add executive function challenges to this mix and you get: forgotten gifts, missed deadlines, over-committed schedules, sensory meltdowns at family gatherings, and the crushing guilt of not enjoying what you&apos;re &quot;supposed&quot; to enjoy.
          </p>
          <p>
            This guide is your permission slip to do less, expect less, and protect yourself through a season designed to deplete you.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">The December Audit: What Can You Drop?</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>Before the season starts, do this exercise:</p>
          <div className="bg-secondary/30 rounded-xl p-5 space-y-3">
            <p><strong className="text-foreground">List everything you did last December.</strong> Every event, every tradition, every gift, every meal, every card, every decoration. All of it.</p>
            <p><strong className="text-foreground">Now mark each one:</strong></p>
            <ul className="space-y-1 ml-4 text-sm">
              <li>&bull; ❤️ = genuinely brings joy to me or my children</li>
              <li>&bull; 😐 = obligation that no one would miss if it disappeared</li>
              <li>&bull; 😰 = actively drains me or causes stress</li>
            </ul>
            <p><strong className="text-foreground">Drop everything marked 😐 or 😰.</strong> Not &quot;do them with less effort.&quot; Drop them entirely. The world will not end. Your children will not be traumatized. You will arrive at January with something left.</p>
          </div>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Gift Buying Without Executive Function Collapse</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <div className="space-y-3">
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">The One-Day Rule</p>
              <p className="text-sm">All gift buying happens in ONE session. Online. With a list made in advance. Not spread across 6 weeks of &quot;I should probably start thinking about...&quot; One focused session. Done. Wrapped (or gift-bagged — wrapping is optional).</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">The Category System</p>
              <p className="text-sm">Everyone gets the same categories: something to wear, something to read, something to do, something they need. Four gifts per person. No agonizing over the &quot;perfect&quot; thing. Categories remove the decision paralysis.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">The &quot;Good Enough Gift&quot; Permission</p>
              <p className="text-sm">A gift card is a gift. A donation in someone&apos;s name is a gift. A consumable (nice soap, fancy chocolate, a candle) is a gift. You do not need to find meaningful, personalized, Instagram-worthy presents for 15 people. That expectation was invented by people with more time and fewer children.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Surviving Family Gatherings</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>Family events combine every trigger: sensory overload, social performance, old family dynamics, disrupted routines for kids, and the pressure to appear happy and grateful.</p>
          <div className="space-y-3">
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Set a departure time BEFORE you arrive</p>
              <p className="text-sm">Agree with your partner: &quot;We&apos;re leaving at 3pm regardless.&quot; Having an exit plan reduces the anxiety of being trapped. You can always stay longer if you&apos;re enjoying it — but the boundary exists.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Build in escape valves</p>
              <p className="text-sm">Every 45-60 minutes, take a break: bathroom, step outside, check on the kids in another room. Brief sensory resets prevent the cumulative crash. You don&apos;t need to announce it. Just disappear for 3 minutes.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Prepare for the comments</p>
              <p className="text-sm">If family members comment on your parenting, your house, your weight, your career, or your children&apos;s behavior — have a response ready: &quot;We&apos;re doing what works for our family.&quot; Repeat as needed. You don&apos;t owe explanations.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">The recovery day</p>
              <p className="text-sm">The day after a big gathering: nothing. No plans. No obligations. No productivity expectations. Recovery is not laziness. It&apos;s how your nervous system processes what it just endured.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">The &quot;Magic&quot; Myth</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Somewhere along the way, mothers became responsible for manufacturing holiday magic. The elf, the advent calendar, the matching pajamas, the cookie decorating, the handmade ornaments, the perfectly styled tree, the photo card, the teacher gifts, the class party contribution.
          </p>
          <p>
            Here&apos;s what your children will actually remember: whether you were present or stressed. Whether the season felt warm or frantic. Whether you were enjoying it or performing it.
          </p>
          <p>
            A mother who does three things with genuine presence creates more magic than a mother who does thirty things while dissociated and resentful. Pick your three. Let the rest go.
          </p>
          <div className="bg-primary/5 rounded-xl p-5 border border-primary/10 mt-4">
            <p className="italic text-foreground/90">
              &quot;My children don&apos;t need a perfect holiday. They need a mother who&apos;s still standing in January. I choose presence over performance. I choose connection over Pinterest. I choose enough over everything.&quot;
            </p>
          </div>
        </div>
      </section>

      <p className="text-sm text-muted-foreground/70 text-center leading-relaxed">
        This guide is for educational and self-reflection purposes only.
      </p>
    </div>
  )
}
