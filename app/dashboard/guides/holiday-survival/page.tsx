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
          The emotional labour of making magic for everyone else — and how to arrive at January with something left.
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
            <p><strong className="text-foreground">Drop everything marked 😐 or 😰.</strong> Not &quot;do them with less effort.&quot; Drop them entirely. The world will not end. Your children will not be traumatised. You will arrive at January with something left.</p>
          </div>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">The Financial Pressure Nobody Names</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Holidays are expensive. And the financial pressure compounds every other stressor — because money anxiety uses the same cognitive resources as decision-making, planning, and emotional regulation. You&apos;re not just spending money. You&apos;re spending executive function you don&apos;t have.
          </p>
          <p>
            The shame is layered: you can&apos;t afford the gifts they &quot;should&quot; get. You can&apos;t match what other families do. You feel guilty about the credit card bill. And the cultural message — &quot;it&apos;s the most wonderful time of the year&quot; — makes financial stress feel like personal failure rather than systemic reality.
          </p>
          <h3 className="text-lg font-medium text-foreground mt-4 mb-3">What helps:</h3>
          <div className="space-y-3">
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Set the number BEFORE the feelings hit</p>
              <p className="text-sm">Decide your total holiday budget when you&apos;re calm, not when you&apos;re in a shop feeling guilty. Write it down. Divide it by recipients. That number is the ceiling. Not a target — a ceiling.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Presence over presents (not a platitude — research)</p>
              <p className="text-sm">Studies on children&apos;s holiday memories consistently show they remember experiences (baking together, watching a film, staying up late) more than objects. One meaningful experience costs less and lasts longer than ten gifts they&apos;ll forget by February.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Name it to your partner</p>
              <p className="text-sm">If financial stress is amplifying your overwhelm: say it out loud. &quot;The money pressure of December is making everything harder for me. I need us to agree on a realistic plan together.&quot; Shame thrives in silence. Naming it breaks the cycle.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Gift Buying Without Executive Function Collapse</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <div className="space-y-3">
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">The One-Session Rule</p>
              <p className="text-sm">All gift buying happens in ONE session. Online. With a list made in advance. Not spread across 6 weeks of &quot;I should probably start thinking about...&quot; One focused session. Done. Gift-bagged (wrapping is optional).</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">The Category System</p>
              <p className="text-sm">Everyone gets the same categories: something to wear, something to read, something to do, something they need. Four gifts per person. No agonising over the &quot;perfect&quot; thing. Categories remove the decision paralysis.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">The &quot;Good Enough Gift&quot; Permission</p>
              <p className="text-sm">A gift card is a gift. A donation in someone&apos;s name is a gift. A consumable (nice soap, chocolate, a candle) is a gift. You do not need meaningful, personalised, Instagram-worthy presents for 15 people.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Surviving Family Gatherings</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>Family events combine every trigger: sensory overload, social performance, old family dynamics, disrupted routines for children, and the pressure to appear happy and grateful.</p>
          <div className="space-y-3">
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Set a departure time BEFORE you arrive</p>
              <p className="text-sm">Agree with your partner (or decide for yourself): &quot;We&apos;re leaving at 3pm regardless.&quot; Having an exit plan reduces the anxiety of being trapped. You can always stay longer — but the boundary exists.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Build in escape valves</p>
              <p className="text-sm">Every 45-60 minutes, take a break: bathroom, step outside, check on children in another room. Brief sensory resets prevent the cumulative crash. You don&apos;t need to announce it.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Prepare for the comments</p>
              <p className="text-sm">If family members comment on your parenting, your house, your weight, your career, or your children&apos;s behaviour — have a response ready: &quot;We&apos;re doing what works for our family.&quot; Repeat as needed. You don&apos;t owe explanations.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">The recovery day</p>
              <p className="text-sm">The day after a big gathering: nothing. No plans. No obligations. No productivity expectations. Recovery is not laziness. It&apos;s how your nervous system processes what it just endured.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">When Holidays Carry Grief</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Not everyone dreads holidays because of overwhelm. Some dread them because of loss. A parent who died. A relationship that ended. A baby you lost. A family that rejected you. A childhood where holidays weren&apos;t safe.
          </p>
          <p>
            The cultural demand that everyone be happy and grateful during the holidays is especially cruel when you&apos;re carrying grief. You&apos;re expected to perform joy while managing pain — and the gap between those two things is exhausting in a way that nobody around you sees.
          </p>
          <h3 className="text-lg font-medium text-foreground mt-4 mb-3">What helps when holidays = grief:</h3>
          <div className="space-y-3">
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Name it to yourself</p>
              <p className="text-sm">&quot;This time of year is hard because ___. I&apos;m allowed to feel that. I don&apos;t have to pretend it&apos;s fine.&quot; Just acknowledging the grief internally — without needing anyone else to validate it — can reduce its weight.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Create one small ritual of acknowledgment</p>
              <p className="text-sm">Light a candle for who&apos;s missing. Write them a letter you don&apos;t send. Set a place at the table. Or simply say their name. Grief needs a container. Even a tiny one.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Give yourself permission to opt out</p>
              <p className="text-sm">You don&apos;t have to attend the gathering that triggers your grief. You don&apos;t have to explain why. &quot;We&apos;re doing something different this year&quot; is a complete sentence.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">The &quot;Magic&quot; Myth</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Somewhere along the way, mothers became responsible for manufacturing holiday magic. The elf, the advent calendar, the matching pyjamas, the cookie decorating, the handmade ornaments, the perfectly styled tree, the photo card, the teacher gifts, the class party contribution.
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

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">The January Crash</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Nobody warns you about January. The decorations come down. The routine doesn&apos;t exist yet. The credit card bill arrives. The darkness and cold continue. And the adrenaline that carried you through December — the urgency, the performance energy, the &quot;just get through it&quot; fuel — suddenly withdraws. What&apos;s left is emptiness.
          </p>
          <p>
            Post-holiday low mood is common, documented, and not a personal failing. It&apos;s what happens when your nervous system drops from chronic activation to nothing. The crash is the bill for running on emergency fuel for a month.
          </p>
          <h3 className="text-lg font-medium text-foreground mt-4 mb-3">Preparing for January (while it&apos;s still December):</h3>
          <div className="space-y-3">
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Keep one thing to look forward to</p>
              <p className="text-sm">Plan one small thing for January that has nothing to do with recovery or productivity. A film you want to see. A book saved for that month. A single outing. Your brain needs a future anchor.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Don&apos;t rebuild everything at once</p>
              <p className="text-sm">January doesn&apos;t need a &quot;fresh start.&quot; It needs gentle re-entry. Routine rebuilds one piece at a time. Not a New Year overhaul. Just: what&apos;s the one thing that helps most? Start there.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Expect the low</p>
              <p className="text-sm">If you know January will be hard, you can plan for it instead of being ambushed by it. Lower your expectations for the first two weeks. Tell your partner: &quot;I always crash in January. I&apos;ll need extra support.&quot; Naming it reduces its power.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">If You&apos;re Navigating This Across Two Homes</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Co-parenting through the holidays adds a unique layer: scheduling negotiations, the guilt of not being with your children on &quot;the day,&quot; managing different traditions in different households, and the emotional weight of watching them leave.
          </p>
          <div className="space-y-3">
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">The day doesn&apos;t have to be THE day</p>
              <p className="text-sm">Christmas magic doesn&apos;t expire on December 26th. Your celebration can be December 23rd or December 27th and it&apos;s still real. Children adapt to &quot;our Christmas is on Saturday&quot; faster than adults think. Give yourself permission to redefine when.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Have a plan for the empty house</p>
              <p className="text-sm">If your children are with the other parent on a holiday: have a plan. Not a busy plan — a comforting one. A friend to call. A film. A meal you love. Don&apos;t leave empty time unplanned when grief might fill it.</p>
            </div>
          </div>
        </div>
      </section>

      <p className="text-sm text-muted-foreground/70 text-center leading-relaxed">
        This guide is for educational and self-reflection purposes only. It is not a substitute for professional mental health care. If you are in crisis, contact 988 (Suicide &amp; Crisis Lifeline) or your local emergency services.
      </p>
    </div>
  )
}
