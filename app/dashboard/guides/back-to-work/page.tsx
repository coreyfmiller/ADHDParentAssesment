"use client"

import Link from "next/link"
import { Briefcase, ArrowLeft } from "lucide-react"

export default function BackToWorkGuide() {
  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div>
        <Link href="/dashboard/guides" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Guides
        </Link>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-blue-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-medium text-foreground">The First Year Back at Work</h1>
        </div>
        <p className="text-muted-foreground">
          The guilt, the identity split, the impossible logistics — and how to survive re-entry without losing yourself (again).
        </p>
      </div>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Nobody Tells You How Hard This Is</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            You went back to work. Maybe you wanted to. Maybe you had to. Maybe both. And nobody told you that re-entry would feel like being split in half — one part of you at a desk performing competence, the other part at home with your child, wondering if you&apos;re damaging them by not being there.
          </p>
          <p>
            The cultural narrative gives you two options: be a devoted stay-at-home mother (and feel invisible, unstimulated, financially vulnerable), or be a working mother (and feel guilty, exhausted, and perpetually behind in both domains). Neither option accounts for the reality: you&apos;re a whole person who needs BOTH meaningful work AND connected parenting, and the system makes having both nearly impossible.
          </p>
          <p>
            This guide isn&apos;t about &quot;having it all&quot; (that phrase should be retired permanently). It&apos;s about navigating the re-entry with honesty about what&apos;s hard, practical strategies for what&apos;s manageable, and permission to be imperfect in every direction simultaneously.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">The Guilt That Never Stops</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            At work, you feel guilty about not being with your child. At home, you feel guilty about not being more productive at work. In transit, you feel guilty about being in neither place. The guilt is constant, directionless, and exhausting — because it&apos;s not actually about any specific failing. It&apos;s about the impossible expectation that you should be fully present in two places simultaneously.
          </p>
          <h3 className="text-lg font-medium text-foreground mt-4 mb-3">What the guilt is actually about:</h3>
          <ul className="space-y-2 ml-4">
            <li>&bull; <strong>Cultural messaging:</strong> &quot;Good mothers are always there.&quot; This message was designed for a world where one income supported a family. That world doesn&apos;t exist for most people anymore — but the messaging hasn&apos;t updated.</li>
            <li>&bull; <strong>Attachment anxiety:</strong> Fear that your child is harmed by your absence. Research consistently shows that children thrive with multiple secure attachment figures — quality of presence matters more than quantity of hours.</li>
            <li>&bull; <strong>Identity confusion:</strong> You don&apos;t know which version of yourself is &quot;real&quot; — the professional or the mother. Both feel like performances.</li>
          </ul>
          <h3 className="text-lg font-medium text-foreground mt-6 mb-3">Reframes that actually help:</h3>
          <div className="space-y-3">
            <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
              <p className="italic text-foreground/90">&quot;My child does not need me every hour. They need me regulated, present, and genuine in the hours I have with them.&quot;</p>
            </div>
            <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
              <p className="italic text-foreground/90">&quot;Working mothers raise children who see women as capable, ambitious, and multidimensional. That&apos;s not damage — that&apos;s modelling.&quot;</p>
            </div>
            <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
              <p className="italic text-foreground/90">&quot;The guilt I feel is not evidence that I&apos;m doing something wrong. It&apos;s evidence that I care deeply while navigating an impossible system.&quot;</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">The Cognitive Load Doubles (Nobody Warns You)</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Before returning to work, you carried the household mental load. When you go back to work, you don&apos;t put that load down. You add a second one on top. Now you&apos;re tracking: work deadlines AND school schedules. Colleague dynamics AND child developmental needs. Your performance review AND the doctor appointment you need to book. The meeting at 2pm AND the childcare pickup at 5:30.
          </p>
          <p>
            Research calls this &quot;the second shift&quot; — the reality that employed mothers perform full-time work AND still carry the majority of domestic and cognitive labour at home. The result: you&apos;re working two jobs while being evaluated on only one, and carrying guilt about &quot;not doing enough&quot; in both.
          </p>
          <h3 className="text-lg font-medium text-foreground mt-4 mb-3">What helps:</h3>
          <div className="space-y-3">
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Redistribute before you return</p>
              <p className="text-sm">The conversation about who owns what domestically needs to happen BEFORE day one — not after you&apos;re drowning. &quot;I can&apos;t carry the full mental load AND work full time. We need to split ownership of specific domains.&quot;</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Accept that some things will drop</p>
              <p className="text-sm">You cannot maintain the same household standard while adding 40 hours of work. Something has to give: the cleanliness level, the dinner complexity, the volunteering, the handmade birthday party. Choose consciously what drops rather than letting everything half-fail.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Batch your brain-switching</p>
              <p className="text-sm">Constant toggling between &quot;work brain&quot; and &quot;home brain&quot; is cognitively expensive. Where possible: handle all home logistics in one block (morning or lunch), keep work hours protected for work, and build a transition ritual between the two (a walk, a podcast, 5 minutes in the car).</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">The Identity Split</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            At work you perform competence, composure, and childlessness (because many workplaces still punish visible motherhood). At home you perform patience, presence, and domesticity. In between, you&apos;re not sure who you actually are. Both feel like costumes.
          </p>
          <p>
            This split is exhausting not because you can&apos;t handle either role — but because maintaining two separate performances simultaneously uses enormous executive function and emotional regulation resources. You&apos;re essentially running two operating systems at once with shared hardware.
          </p>
          <p>
            The integration comes slowly. Eventually, &quot;working mother&quot; becomes one identity rather than two competing ones. But in year one, the split is real and the energy cost is significant. Be gentle with yourself about how tired you are. You&apos;re not tired because of work OR motherhood. You&apos;re tired because of the constant switching between the two.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Setting Boundaries at Work</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            The pre-kids you could stay late, respond to emails at 9pm, take on extra projects, and be &quot;flexible.&quot; The post-kids you has a hard stop at pickup time, can&apos;t travel without 3 weeks notice, and needs to leave when a child is sick. This feels like becoming less. It&apos;s not — it&apos;s becoming boundaried. But the workplace may not see it that way.
          </p>
          <div className="space-y-3">
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Communicate capacity, not apology</p>
              <p className="text-sm">Not: &quot;Sorry, I can&apos;t stay late because of my kids.&quot; Instead: &quot;I&apos;m available until 5. If this needs more time, I can pick it up tomorrow morning.&quot; You&apos;re stating availability, not apologising for having a life.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Protect the transitions</p>
              <p className="text-sm">The 30 minutes before pickup and 30 minutes after arriving home are the highest-stress transitions of your day. Protect them. No work calls during pickup. No emails during the first 30 minutes home. Your nervous system needs the switch time.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Quality over visibility</p>
              <p className="text-sm">If your workplace values hours-in-seat over output, that&apos;s a structural problem with the workplace — not evidence of your inadequacy. Focus on delivering excellent work within your hours rather than competing on availability with people who have different home responsibilities.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">The Transition Home (The Hardest 30 Minutes)</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            You walk in the door after a full day of work. Your children explode toward you — needing, demanding, touching, talking. You haven&apos;t even put your bag down. You&apos;re still carrying the cognitive residue of your last work task. And now you need to switch from &quot;professional&quot; to &quot;patient parent&quot; in zero seconds.
          </p>
          <p>
            This transition is brutal because it requires: task-switching (work to home), emotional regulation (absorbing their energy when you&apos;re depleted), sensory adjustment (from quiet office to noisy house), and identity shift (from colleague to mother) — all simultaneously, with no buffer.
          </p>
          <h3 className="text-lg font-medium text-foreground mt-4 mb-3">Strategies for the transition:</h3>
          <div className="space-y-3">
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">The 5-minute buffer</p>
              <p className="text-sm">Sit in the car for 5 minutes before going in. Or walk around the block. Or tell your partner/carer: &quot;I need 5 minutes when I get home before I&apos;m available.&quot; This isn&apos;t avoidance. It&apos;s allowing your nervous system to transition so you can actually be present when you arrive.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">The reconnection ritual</p>
              <p className="text-sm">After your buffer: 5 minutes of full attention. Get on their level. Ask one question. Hug them. You&apos;re signalling: &quot;I&apos;m here now.&quot; Children need the reconnection before they can regulate — and 5 minutes of genuine presence will buy you a smoother evening than walking in and immediately starting dinner.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">When to Seek Support</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>Consider reaching out if:</p>
          <ul className="space-y-2 ml-4">
            <li>&bull; The guilt is paralysing rather than passing</li>
            <li>&bull; You&apos;re unable to be present in either domain (dissociated at work AND at home)</li>
            <li>&bull; Anxiety about your child&apos;s wellbeing during your absence is constant and intrusive</li>
            <li>&bull; The load distribution at home hasn&apos;t shifted despite conversations</li>
            <li>&bull; You&apos;re crying daily or dreading both work and home</li>
            <li>&bull; You&apos;re seriously considering leaving a job you love because the guilt is unbearable</li>
          </ul>
          <p className="mt-4">
            A therapist who understands maternal mental health and work-life integration (not &quot;balance&quot; — that word implies something achievable) can help you untangle the guilt, set boundaries, and grieve the version of motherhood you thought you&apos;d have.
          </p>
        </div>
      </section>

      <p className="text-sm text-muted-foreground/70 text-center leading-relaxed">
        This guide is for educational and self-reflection purposes only. It is not a substitute for professional mental health care. If you are in crisis, contact 988 (Suicide &amp; Crisis Lifeline) or your local emergency services.
      </p>
    </div>
  )
}
