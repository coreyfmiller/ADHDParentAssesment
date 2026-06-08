"use client"

import Link from "next/link"
import { Wind, ArrowLeft } from "lucide-react"

export default function OverwhelmGuide() {
  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div>
        <Link href="/dashboard/guides" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Guides
        </Link>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
            <Wind className="w-5 h-5 text-violet-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-medium text-foreground">The Overwhelm Spiral</h1>
        </div>
        <p className="text-muted-foreground">
          What&apos;s actually happening in your brain when everything stacks, why you can&apos;t &quot;just prioritise,&quot; and how to find the floor when you&apos;re in freefall.
        </p>
      </div>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">This Isn&apos;t &quot;Being Busy&quot;</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            There&apos;s a difference between having a lot to do and being overwhelmed. Busy is a full plate. Overwhelm is a plate that&apos;s shattered — everything on the floor, and you&apos;re standing in the middle of it unable to decide which piece to pick up first. So you pick up nothing. And then you feel worse.
          </p>
          <p>
            Overwhelm is not a time management problem. It&apos;s a nervous system state. It&apos;s what happens when the demand on your brain exceeds its available resources — and instead of operating at reduced capacity, your system freezes entirely. Like a computer with too many programs open that stops responding to any input at all.
          </p>
          <p>
            If someone tells you to &quot;just make a list&quot; or &quot;start with the most important thing&quot; when you&apos;re in this state — that advice is useless. Not because you&apos;re incapable. Because the part of your brain that prioritises, decides, and initiates is the exact part that&apos;s offline. You can&apos;t use a tool that requires the thing you&apos;ve lost.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">The Neurology of Overwhelm</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            When demand exceeds capacity, your brain goes through a predictable cascade:
          </p>
          <div className="space-y-3">
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Stage 1: Working memory overload</p>
              <p className="text-sm">Too many items fighting for space on your brain&apos;s scratchpad. You can&apos;t hold the grocery list AND the school schedule AND the appointment AND the emotional needs AND the dinner plan AND the work deadline. Something drops. Then something else. Then everything.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Stage 2: Decision paralysis</p>
              <p className="text-sm">With too many inputs and insufficient resources to evaluate them, your brain can&apos;t determine what matters most. Everything feels equally urgent. So you can&apos;t start anything — because starting one thing means deciding the others can wait, and you can&apos;t make that decision.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Stage 3: Emotional flooding</p>
              <p className="text-sm">The frustration of being frozen triggers an emotional cascade — shame (&quot;why can&apos;t I handle this?&quot;), anxiety (&quot;everything is falling apart&quot;), anger (&quot;nobody helps me&quot;). These emotions consume what little cognitive resource remained. Now you&apos;re paralysed AND dysregulated.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Stage 4: Shutdown or explosion</p>
              <p className="text-sm">The system either freezes (dissociation, blankness, scrolling for hours, staring at nothing) or explodes (rage, crying, slamming things). Both are your nervous system&apos;s emergency response to overload it can&apos;t resolve through normal channels.</p>
            </div>
          </div>
          <p className="mt-4">
            This entire cascade can happen in seconds. You go from &quot;I have a lot to do&quot; to &quot;I can&apos;t move or think&quot; faster than you can consciously track. That&apos;s because it&apos;s not a cognitive process — it&apos;s a neurological one. Your thinking brain isn&apos;t running the show anymore.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Why &quot;Just Prioritise&quot; Doesn&apos;t Work</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Prioritising is an executive function task. It requires your prefrontal cortex to: evaluate multiple options, assign relative importance, suppress the urgency of less-important items, and sequence actions. Every single one of these steps requires the resources that overwhelm has already depleted.
          </p>
          <p>
            Telling an overwhelmed person to prioritise is like telling someone drowning to swim more efficiently. The problem isn&apos;t their technique. The problem is they&apos;re underwater.
          </p>
          <p>
            Additionally, for mothers, genuine prioritisation is often impossible because everything IS important. The child crying, the deadline looming, the dinner unmade, the form unsigned — these aren&apos;t &quot;nice to haves.&quot; They&apos;re all real needs with real consequences for real people who depend on you. The problem isn&apos;t a failure to prioritise. The problem is that the demands genuinely exceed what one person can hold.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Finding the Floor (When You&apos;re in Freefall)</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            When you&apos;re mid-spiral, you need strategies that don&apos;t require the thing you&apos;ve lost (executive function). These work BECAUSE they&apos;re simple, physical, and don&apos;t ask your thinking brain to do anything.
          </p>
          <div className="space-y-3">
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">1. Stop and land in your body</p>
              <p className="text-sm">Feet on the floor. Notice the weight. Hands on your thighs. Notice the pressure. Five slow breaths — in for 4, out for 6. You&apos;re not solving anything yet. You&apos;re telling your nervous system: &quot;I am here. I am present. I am not in danger.&quot; This shifts you from sympathetic (panic) toward parasympathetic (function).</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">2. Pick ONE thing — the smallest one</p>
              <p className="text-sm">Not the most important. The smallest. The one that takes under 2 minutes. Put one dish in the dishwasher. Send one text. Move one thing from the floor. You&apos;re not solving the overwhelm. You&apos;re proving to your brain that action is possible. One action creates momentum. Momentum creates the next action.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">3. Dump it out of your head</p>
              <p className="text-sm">Grab anything — phone, paper, back of an envelope — and write down every single thing your brain is trying to hold. Don&apos;t organise. Don&apos;t prioritise. Just dump. The act of externalising reduces internal pressure. Your brain can stop trying to hold it all once it&apos;s on paper.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">4. Ask: &quot;What needs to happen in the next hour?&quot;</p>
              <p className="text-sm">Not today. Not this week. The next hour. Shrink the timeframe until it&apos;s manageable. &quot;In the next hour: feed the kids, put on a show, eat something myself.&quot; That&apos;s the plan. Everything else can wait an hour.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">5. Say out loud: &quot;I am one person&quot;</p>
              <p className="text-sm">Not as defeat. As reality. &quot;I am one person. I cannot do everything. I will do the next thing.&quot; This sentence interrupts the shame spiral that says &quot;everyone else manages this.&quot; They don&apos;t. Or they have support you can&apos;t see.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">The Overwhelm Cycle (And How to Interrupt It)</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Overwhelm isn&apos;t usually a single event. It&apos;s a cycle:
          </p>
          <div className="bg-secondary/30 rounded-xl p-5 space-y-2 text-sm">
            <p>Demands accumulate → You push through without rest → Resources deplete → Executive function drops → Things fall through cracks → Shame and self-criticism increase → You try harder (using more resources you don&apos;t have) → More depletion → Bigger crash → More shame → Repeat</p>
          </div>
          <p className="mt-4">
            The cycle sustains itself because shame prevents the one thing that would break it: stopping. The voice that says &quot;you can&apos;t stop, everything will fall apart&quot; is the voice that keeps you in the spiral. The paradox: stopping for 10 minutes will cost you less than the crash that&apos;s coming if you don&apos;t.
          </p>
          <h3 className="text-lg font-medium text-foreground mt-4 mb-3">Interruption points:</h3>
          <ul className="space-y-2 ml-4">
            <li>&bull; <strong>Before it builds:</strong> Regular micro-rests throughout the day (not one big rest later — small ones now)</li>
            <li>&bull; <strong>At the first sign:</strong> When you notice the jaw tightening, the brain speeding up, the internal &quot;too much&quot; signal — act immediately. Don&apos;t push through.</li>
            <li>&bull; <strong>During the spiral:</strong> The 5 strategies above. Land, move, dump, shrink, name.</li>
            <li>&bull; <strong>After the crash:</strong> Recovery before rebuilding. Rest before planning. Compassion before correction.</li>
          </ul>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">What&apos;s Underneath the Overwhelm</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Chronic overwhelm is not just &quot;too much to do.&quot; It&apos;s usually a signal of one or more structural problems:
          </p>
          <ul className="space-y-3 ml-4">
            <li>&bull; <strong>The load is genuinely unsustainable</strong> — You&apos;re carrying more than one person can hold. The solution isn&apos;t better coping strategies. It&apos;s redistributing the load, getting help, or dropping things.</li>
            <li>&bull; <strong>Your nervous system is depleted</strong> — You haven&apos;t had adequate recovery for so long that your baseline capacity has shrunk. What you could handle 6 months ago, you can&apos;t handle now. Not because you&apos;re weaker — because you&apos;re emptier.</li>
            <li>&bull; <strong>Boundaries don&apos;t exist or aren&apos;t held</strong> — You say yes to everything because no feels impossible. Each yes adds to the load without anything being removed.</li>
            <li>&bull; <strong>Support isn&apos;t reaching you</strong> — Either you can&apos;t ask for help (shame, independence, past rejection), or help isn&apos;t available (isolation, solo parenting, unsupportive partner).</li>
            <li>&bull; <strong>Perfectionism is inflating the load</strong> — Some of what you&apos;re carrying doesn&apos;t need to be done. Or doesn&apos;t need to be done by you. Or doesn&apos;t need to be done to that standard. But you can&apos;t let go because &quot;good enough&quot; feels like failure.</li>
          </ul>
          <p className="mt-4">
            The overwhelm is the symptom. The structural issue underneath is the cause. Strategies help you survive the symptom. Addressing the cause changes whether it keeps happening.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">The Difference Between Hard and Unsustainable</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Motherhood is hard. That&apos;s not pathology — that&apos;s reality. But there&apos;s a line between &quot;hard&quot; and &quot;unsustainable,&quot; and many women don&apos;t recognise when they&apos;ve crossed it because the crossing is gradual.
          </p>
          <p>
            <strong>Hard</strong> means: demanding, tiring, stretching. You recover with rest. You have good days mixed with bad. You can still feel joy sometimes. You&apos;re stretched but not breaking.
          </p>
          <p>
            <strong>Unsustainable</strong> means: rest doesn&apos;t restore you. You can&apos;t remember the last good day. Joy is absent. You&apos;re functioning on fumes. Small things cause crashes. You feel like you&apos;re failing at everything simultaneously. The overwhelm is your permanent state rather than an occasional spike.
          </p>
          <p>
            If you&apos;re in &quot;unsustainable&quot; — coping strategies alone won&apos;t fix it. Something structural needs to change: less on your plate, more help, lower standards, better support, or professional intervention. This isn&apos;t optional self-improvement. It&apos;s necessary for your survival and your family&apos;s.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">When to Seek Professional Help</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>Reach out to a professional if:</p>
          <ul className="space-y-2 ml-4">
            <li>&bull; Overwhelm is your baseline state, not an occasional spike</li>
            <li>&bull; You&apos;re experiencing daily shutdowns (can&apos;t move, think, or engage)</li>
            <li>&bull; The overwhelm is accompanied by thoughts of escape, self-harm, or hopelessness</li>
            <li>&bull; You&apos;re unable to meet basic needs (yours or your children&apos;s) due to paralysis</li>
            <li>&bull; Nothing improves despite trying strategies consistently</li>
            <li>&bull; You suspect an underlying condition (executive function difficulty, anxiety disorder, burnout) that needs assessment</li>
          </ul>
          <p className="mt-4">
            Say to a provider: &quot;I&apos;m experiencing chronic overwhelm that&apos;s affecting my daily functioning. I&apos;d like help understanding whether this is situational, neurological, or both — and what kind of support would actually help.&quot;
          </p>
        </div>
      </section>

      <p className="text-sm text-muted-foreground/70 text-center leading-relaxed">
        This guide is for educational and self-reflection purposes only. It is not a substitute for professional mental health care. If you are in crisis, contact 988 (Suicide &amp; Crisis Lifeline) or your local emergency services.
      </p>
    </div>
  )
}
