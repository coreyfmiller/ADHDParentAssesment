"use client"

import Link from "next/link"
import { Baby, ArrowLeft } from "lucide-react"

export default function HormonalGuide() {
  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div>
        <Link href="/dashboard/guides" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Guides
        </Link>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
            <Baby className="w-5 h-5 text-purple-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-medium text-foreground">The Hormonal Connection</h1>
        </div>
        <p className="text-muted-foreground">
          Why some weeks you can handle everything and other weeks you can barely function — and what to do about it.
        </p>
      </div>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">You&apos;re Not Inconsistent. You&apos;re Cyclical.</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            If you&apos;ve ever thought &quot;Why could I handle this last week but not today?&quot; — the answer may be hormonal. Estrogen directly affects dopamine production in the brain. When estrogen drops (premenstrually, postpartum, in perimenopause), dopamine drops with it. And dopamine is the neurotransmitter responsible for executive function, motivation, emotional regulation, and focus.
          </p>
          <p>
            This means your ADHD symptoms, your overwhelm threshold, your sensory sensitivity, and your emotional reactivity can all fluctuate predictably with your cycle. You&apos;re not failing some weeks. Your neurochemistry is literally different.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">The Four Phases (And What They Mean for Your Brain)</h2>
        <div className="space-y-4">
          <div className="bg-secondary/20 rounded-xl p-5">
            <p className="font-medium text-foreground mb-2">Follicular Phase (Days 1-13) — Rising Estrogen</p>
            <p className="text-foreground/80 text-sm leading-relaxed">Estrogen climbs, dopamine increases. This is typically your &quot;power phase&quot; — better focus, more motivation, higher frustration tolerance, more social energy. If you have big tasks, hard conversations, or demanding events — schedule them here when possible.</p>
          </div>
          <div className="bg-secondary/20 rounded-xl p-5">
            <p className="font-medium text-foreground mb-2">Ovulation (Day 14-ish) — Peak Estrogen</p>
            <p className="text-foreground/80 text-sm leading-relaxed">Estrogen peaks. You may feel your most capable, social, and regulated. Enjoy it. Use it. Don&apos;t assume this is your &quot;real&quot; self and the rest is failure — this is one version of you, not the only valid one.</p>
          </div>
          <div className="bg-secondary/20 rounded-xl p-5">
            <p className="font-medium text-foreground mb-2">Luteal Phase (Days 15-28) — Falling Estrogen</p>
            <p className="text-foreground/80 text-sm leading-relaxed">Estrogen drops. Progesterone rises then falls. This is where many women experience: worse executive function, shorter fuse, increased sensory sensitivity, lower motivation, more intense emotional responses, and physical symptoms (fatigue, pain, bloating). If your &quot;bad weeks&quot; cluster here — it&apos;s not random.</p>
          </div>
          <div className="bg-secondary/20 rounded-xl p-5">
            <p className="font-medium text-foreground mb-2">Menstruation (Days 1-5) — Lowest Hormones</p>
            <p className="text-foreground/80 text-sm leading-relaxed">All hormones are at their lowest. Some women feel relief (the PMS fog lifts). Others feel their most depleted. Pay attention to YOUR pattern — it&apos;s individual.</p>
          </div>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Perimenopause: &quot;Am I Losing My Mind?&quot;</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            If you&apos;re in your late 30s or 40s and suddenly feel like your brain has stopped working — you&apos;re not imagining it. Perimenopause can begin 8-10 years before menopause, and its cognitive effects are profound and wildly under-discussed.
          </p>
          <p>Common experiences that are actually perimenopause:</p>
          <ul className="space-y-2 ml-4">
            <li>&bull; &quot;I used to be sharp and now I can&apos;t find words&quot;</li>
            <li>&bull; &quot;My ADHD symptoms suddenly got 10x worse&quot;</li>
            <li>&bull; &quot;I have rage I&apos;ve never experienced before&quot;</li>
            <li>&bull; &quot;I can&apos;t sleep even though I&apos;m exhausted&quot;</li>
            <li>&bull; &quot;My anxiety appeared out of nowhere in my 40s&quot;</li>
            <li>&bull; &quot;I feel like a completely different person&quot;</li>
          </ul>
          <p className="mt-4">
            This is not &quot;just stress.&quot; This is not &quot;just motherhood.&quot; If your doctor dismisses these symptoms, advocate for yourself. Say: &quot;I want my hormone levels tested. My cognitive function has changed significantly and I want to rule out hormonal factors.&quot;
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Postpartum: The Brain That Never Came Back</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            &quot;Mom brain&quot; is treated as a joke. It&apos;s not. Pregnancy and postpartum involve massive neurological restructuring. Your brain literally changes shape. Gray matter is redistributed. Hormones crash after birth. If you&apos;re breastfeeding, estrogen stays suppressed — which means dopamine stays low.
          </p>
          <p>
            Many women report that their cognitive function &quot;never came back&quot; after having children. For some, this is the point at which undiagnosed ADHD becomes visible — because the compensatory strategies that worked before kids can&apos;t handle the increased cognitive load of parenthood with reduced neurochemical support.
          </p>
          <p>
            If you feel like you lost yourself after having a baby and never recovered — that&apos;s not weakness. That&apos;s a brain that underwent a massive transition and may need support (hormonal, therapeutic, or structural) to find its new equilibrium.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Planning Around Your Cycle</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Once you know your pattern, you can stop fighting it and start planning around it:
          </p>
          <div className="space-y-3">
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">High-capacity phase (typically follicular/ovulation)</p>
              <p className="text-sm">Schedule: appointments, hard conversations, meal prep batches, admin tasks, social events, big projects. Front-load demanding tasks here.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Low-capacity phase (typically late luteal/early menstruation)</p>
              <p className="text-sm">Protect: lighter schedule, simpler meals, fewer commitments, more rest, lower expectations. Tell your partner: &quot;This is my low week. I need you to step up.&quot;</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Track for 3 months</p>
              <p className="text-sm">Rate your energy, mood, and cognitive function daily (1-10). Note your cycle day. After 3 months, the pattern will be undeniable. Use an app like Clue, or just a notebook. The data removes the self-blame.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Communicate the pattern</p>
              <p className="text-sm">Tell your partner, your support people, even your older kids (age-appropriately): &quot;Around [time], I have less capacity. It&apos;s not about you. It&apos;s my body. I need extra support during those days.&quot;</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">When to Seek Medical Support</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>Consider talking to a healthcare provider if:</p>
          <ul className="space-y-2 ml-4">
            <li>&bull; Your luteal phase symptoms are severe enough to impair daily functioning (this may be PMDD)</li>
            <li>&bull; You suspect perimenopause is affecting your cognition</li>
            <li>&bull; Your postpartum cognitive changes haven&apos;t resolved after 12+ months</li>
            <li>&bull; You&apos;re on hormonal birth control and wondering if it&apos;s affecting your mood/cognition</li>
            <li>&bull; Your ADHD medication stops working at certain times of the month</li>
          </ul>
          <p className="mt-4">
            Ask specifically for a provider who understands the estrogen-dopamine connection and hormonal effects on executive function. Many GPs are not trained in this. A reproductive psychiatrist or a menopause specialist may be more helpful.
          </p>
        </div>
      </section>

      <p className="text-sm text-muted-foreground/70 text-center leading-relaxed">
        This guide is for educational purposes only. It does not constitute medical advice. Consult a healthcare provider for hormonal concerns.
      </p>
    </div>
  )
}
