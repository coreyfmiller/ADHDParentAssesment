"use client"

import Link from "next/link"
import { Users, ArrowLeft } from "lucide-react"

export default function CoParentingGuide() {
  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div>
        <Link href="/dashboard/guides" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Guides
        </Link>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
            <Users className="w-5 h-5 text-indigo-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-medium text-foreground">Co-Parenting After Separation</h1>
        </div>
        <p className="text-muted-foreground">
          Navigating two households, handover grief, and the relentless work of keeping your children stable when your world has split in two.
        </p>
      </div>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">The Feeling No One Names</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            There&apos;s a specific kind of grief that lives in co-parenting — one that nobody prepared you for. It&apos;s not the grief of losing your partner. It&apos;s the grief of losing the intact family you imagined your children would have. It&apos;s watching your child pack a bag to go to their other house, and feeling a tear in your chest that never fully heals.
          </p>
          <p>
            You might feel relief that the relationship ended. And you might simultaneously feel devastated that your child now lives in two places. Both are true. Both are allowed. The complexity of this emotional territory is what makes co-parenting so exhausting — it&apos;s not just logistics. It&apos;s constant emotional labour performed in the aftermath of loss.
          </p>
          <p>
            If you feel guilt about the separation, fear about the impact on your children, rage at your co-parent, or deep loneliness in the empty house — you are having normal responses to an abnormally difficult situation. None of these feelings mean you made the wrong choice.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Handover Emotions: Why Transitions Hurt</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            The handover — that moment when your child walks away from you toward their other parent — activates something primal. Your nervous system reads it as separation, as loss. Even if you trust the other parent. Even if you logically know your child is safe. Your body doesn&apos;t care about logic in that moment.
          </p>
          <p>
            Children often struggle at transitions too. They might cling, cry, act out, or go silent. This isn&apos;t evidence that the arrangement is wrong — it&apos;s evidence that transitions are hard for developing brains. Children need time to shift between worlds, and their distress at handover usually resolves within 20-30 minutes.
          </p>
          <p>
            What helps:
          </p>
          <ul className="space-y-2 ml-4">
            <li>&bull; A consistent handover ritual (a phrase, a hug pattern, a small object they carry between houses)</li>
            <li>&bull; Keeping the goodbye brief and warm — lingering increases their anxiety</li>
            <li>&bull; Having something to do immediately after the handover so you don&apos;t sit in the emptiness</li>
            <li>&bull; Naming the feeling to yourself: &quot;This is the hard part. It always passes.&quot;</li>
          </ul>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Different Houses, Different Rules</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Your co-parent does things differently. Maybe their house has different bedtimes, different screen rules, different food standards. Maybe there&apos;s a new partner there. Maybe the standards feel lower (or rigidly higher) than yours. This is one of the hardest losses of co-parenting: you can no longer control your child&apos;s entire environment.
          </p>
          <p>
            The research is clear on this: children can adapt to different rules in different houses remarkably well — as long as each house is internally consistent. What harms children is not difference. It&apos;s conflict about the difference. It&apos;s being put in the middle. It&apos;s hearing one parent disparage the other&apos;s choices.
          </p>
          <p>
            What you can do:
          </p>
          <ul className="space-y-2 ml-4">
            <li>&bull; Focus only on issues that affect safety — let go of everything else</li>
            <li>&bull; Use the phrase internally: &quot;Different, not dangerous&quot;</li>
            <li>&bull; Keep your home stable and predictable — that&apos;s what you can control</li>
            <li>&bull; When your child says &quot;but at Dad&apos;s/Mum&apos;s house we can...&quot; — respond with &quot;I hear you. In this house, we do it this way&quot; without adding commentary about the other house</li>
          </ul>
          <p>
            You do not need to match their household. You need to be clear and consistent in yours.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">High-Conflict Co-Parenting</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            If your co-parent is high-conflict — if every interaction leaves you shaking, if messages feel like landmines, if you live in a state of hypervigilance about what they&apos;ll do next — then standard &quot;co-parenting advice&quot; doesn&apos;t apply to you. You cannot collaborate with someone who weaponises collaboration.
          </p>
          <p>
            In high-conflict situations, the goal shifts from cooperation to containment:
          </p>
          <div className="space-y-3">
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Communicate in writing only</p>
              <p className="text-sm">Use email or a co-parenting app. Keep messages factual, brief, and emotionally neutral. The BIFF method: Brief, Informative, Friendly, Firm. No explanations, no emotions, no defending yourself.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Use the &quot;grey rock&quot; approach</p>
              <p className="text-sm">Be as boring and unreactive as possible. High-conflict individuals feed on emotional reactions. Give them nothing to work with. Respond to logistics only. Ignore provocations entirely.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Document everything</p>
              <p className="text-sm">Keep records of communications, schedule changes, incidents. Not to weaponise — to protect. If you need to demonstrate a pattern later, you&apos;ll have evidence.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Build your support system</p>
              <p className="text-sm">You need people who understand what you&apos;re dealing with. A therapist familiar with high-conflict dynamics, a solicitor/lawyer if needed, friends who don&apos;t minimise your experience with &quot;just try to get along.&quot;</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Keeping Your Children Stable</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            What children need most during and after separation isn&apos;t a perfect arrangement. It&apos;s emotional safety. They need to know they are allowed to love both parents. They need to not be the messenger, the mediator, or the spy. They need their feelings about the situation to have somewhere safe to land.
          </p>
          <p>
            Things that protect children:
          </p>
          <ul className="space-y-2 ml-4">
            <li>&bull; Never asking them to carry messages between households</li>
            <li>&bull; Never asking them to report on the other parent&apos;s life</li>
            <li>&bull; Allowing them to express love for their other parent without it feeling like disloyalty to you</li>
            <li>&bull; Keeping conflict out of their awareness as much as possible</li>
            <li>&bull; Maintaining their routines, friendships, and activities across the transition</li>
            <li>&bull; Naming that the separation is the adults&apos; decision — not their fault, not their responsibility to fix</li>
          </ul>
          <p>
            You will not do this perfectly. Some days your pain will leak through. Some days you&apos;ll say something you wish you hadn&apos;t. What matters is the overall pattern — not every individual moment. Repair is always available to you.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">The Empty House</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Nobody talks about this enough: the silence when they&apos;re at the other house. The empty rooms. The absence of noise. For some mothers, these days feel like freedom. For many, they feel like grief with nothing to distract from it.
          </p>
          <p>
            Both responses are valid. And they might alternate — relief one weekend, devastation the next.
          </p>
          <p>
            Strategies for the empty time:
          </p>
          <ul className="space-y-2 ml-4">
            <li>&bull; Resist the urge to fill every moment with productivity — rest counts</li>
            <li>&bull; Have one anchoring activity you look forward to (not for self-improvement — for pleasure)</li>
            <li>&bull; Let yourself feel the loss without judging it — missing them doesn&apos;t mean you need to change the arrangement</li>
            <li>&bull; Connect with other adults — even a text thread helps break the isolation</li>
            <li>&bull; If the silence feels unbearable, keep background sound on (podcasts, music, audiobooks) while you adjust</li>
          </ul>
          <p>
            Over time, many mothers find that the time without their children allows them to return with more patience, more presence, more capacity. But you don&apos;t have to feel grateful for it right now.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Practical Systems That Help</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Co-parenting requires you to operate like a small business with someone you may not want to speak to. Systems reduce friction:
          </p>
          <div className="space-y-3">
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Shared calendar</p>
              <p className="text-sm">One digital calendar both parents can access. Put everything there — pickups, school events, appointments, schedule changes. Reduce the need for back-and-forth communication.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Transition bag</p>
              <p className="text-sm">A bag that lives in the car with essentials that go between houses. Medication, comfort items, school things. Reduces the &quot;forgot it at Mum&apos;s/Dad&apos;s&quot; stress.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Communication window</p>
              <p className="text-sm">Set a time when you check and respond to co-parent messages. Outside of emergencies, you don&apos;t need to be available 24/7. Boundaries are not hostile — they&apos;re sustainable.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">The 24-hour rule</p>
              <p className="text-sm">Before responding to anything that triggers you, wait 24 hours. Draft the response. Sleep on it. Edit out the emotion. Send the factual version. This single habit prevents more conflict than anything else.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">When to Seek Professional Help</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Co-parenting after separation is inherently stressful. But some situations require professional support:
          </p>
          <ul className="space-y-2 ml-4">
            <li>&bull; Your child is showing persistent distress (regression, aggression, withdrawal) that isn&apos;t improving over time</li>
            <li>&bull; You feel unable to manage your emotional reactions around your co-parent</li>
            <li>&bull; Conflict is escalating rather than settling</li>
            <li>&bull; There are concerns about your child&apos;s safety at the other household</li>
            <li>&bull; You&apos;re experiencing symptoms of trauma (hypervigilance, flashbacks, numbness) related to the co-parent</li>
            <li>&bull; You find yourself unable to separate your feelings about your ex from your child&apos;s need for a relationship with them</li>
          </ul>
          <p className="mt-4">
            Consider: individual therapy for processing the separation, family mediation for logistics, a child psychologist if your child is struggling beyond normal adjustment. These aren&apos;t signs of failure — they&apos;re signs of a situation that needs more support than one person can provide alone.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">You Are Still a Whole Family</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            The narrative of &quot;broken homes&quot; is a lie. Your family changed shape. It didn&apos;t break. Your children have a home with you — a real, whole, complete home. Not half a home. Not a &quot;broken&quot; home. A home.
          </p>
          <p>
            You are doing something extraordinarily hard: raising children across two worlds while managing your own healing. Some days you will do this with grace. Other days you will cry in the car after handover. Both days count. Both days are mothering.
          </p>
          <div className="bg-primary/5 rounded-xl p-5 border border-primary/10 mt-4">
            <p className="italic text-foreground/90">
              &quot;My family changed shape, but it did not break. I am building something stable and loving in my home, and that is enough. My children do not need perfection from either household — they need one parent who is doing the inner work. I am that parent.&quot;
            </p>
          </div>
        </div>
      </section>

      <p className="text-sm text-muted-foreground/70 text-center leading-relaxed">
        This guide is for educational and self-reflection purposes only. It is not a substitute for professional mental health care. If you are in crisis or experiencing thoughts of self-harm, contact 988 (Suicide &amp; Crisis Lifeline) or your local emergency services.
      </p>
    </div>
  )
}
