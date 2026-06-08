"use client"

import Link from "next/link"
import { Sun, ArrowLeft } from "lucide-react"

export default function WhatComesNextGuide() {
  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div>
        <Link href="/dashboard/guides" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Guides
        </Link>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center">
            <Sun className="w-5 h-5 text-yellow-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-medium text-foreground">What Comes Next</h1>
        </div>
        <p className="text-muted-foreground">
          Emerging from the hardest season. When the fog lifts, what remains, and the quiet permission to want more from your life again.
        </p>
      </div>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">The Strange Feeling of It Getting Easier</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            One day you realise — not dramatically, not like a lightbulb — that something has shifted. Maybe it&apos;s that you slept through the night without waking in a panic. Maybe it&apos;s that you had a thought about something other than your children. Maybe it&apos;s that you got through a whole day without feeling like you were drowning. It&apos;s quiet. It&apos;s disorienting.
          </p>
          <p>
            The hardest season of motherhood doesn&apos;t end with a clear before-and-after. There&apos;s no finish line, no declaration of &quot;you made it.&quot; Instead, the fog thins gradually. You start noticing yourself again — your wants, your thoughts, your energy returning in small increments. And with that return comes a feeling you might not have expected: confusion.
          </p>
          <p>
            Because when you&apos;ve been in survival mode for months or years, you build an entire identity around it. When survival is no longer required, who are you? What do you want? What do you do with space that isn&apos;t consumed by crisis?
          </p>
          <p>
            If the lifting of the fog feels strange — even unsettling — that&apos;s normal. You&apos;re not doing it wrong. You&apos;re adjusting to a nervous system that is no longer in emergency mode. That adjustment takes time.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">When the Fog Lifts</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            The fog lifting looks different for everyone. It might feel like:
          </p>
          <ul className="space-y-2 ml-4">
            <li>&bull; Having a genuine curiosity about something unrelated to your children — a book, an idea, a project</li>
            <li>&bull; Feeling bored (which means your brain is no longer in constant crisis management and has capacity for under-stimulation)</li>
            <li>&bull; Noticing beauty again — a sunset, music, a good meal — without it being tinged by exhaustion</li>
            <li>&bull; Making a plan for next month and actually believing you&apos;ll have energy for it</li>
            <li>&bull; Feeling restless — like something in you wants to stretch, grow, reach beyond the domestic sphere</li>
            <li>&bull; Laughing hard. Feeling desire. Getting angry about injustice rather than just tired.</li>
          </ul>
          <p>
            These are signs of emergence. Your system is coming back online after a long period of conservation. The parts of you that shut down to survive — your ambition, your creativity, your desire, your fire — are tentatively waking up. They may feel rusty. They may feel foreign. They are still yours.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Guilt About Wanting More</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Here is what nobody will tell you: wanting more than motherhood does not make you ungrateful. Wanting a career, a creative life, an identity beyond &quot;Mum&quot; — wanting to be a full, complex human — is not a betrayal of your children. The guilt you feel about this desire is cultural conditioning, not moral truth.
          </p>
          <p>
            The guilt might sound like:
          </p>
          <ul className="space-y-2 ml-4">
            <li>&bull; &quot;My children are enough. I should be fulfilled.&quot;</li>
            <li>&bull; &quot;Other mothers don&apos;t need more. What&apos;s wrong with me?&quot;</li>
            <li>&bull; &quot;If I pursue something for myself, I&apos;m taking from them.&quot;</li>
            <li>&bull; &quot;I fought so hard to have these children — how dare I want something else too?&quot;</li>
          </ul>
          <p>
            Let&apos;s reframe: a mother who is growing, engaged with life, pursuing things that light her up — she is not less available to her children. She is modelling what a full life looks like. She is teaching her children that women are allowed to want things. That people don&apos;t stop mattering when they become parents.
          </p>
          <p>
            You can love your children completely AND want a life beyond them. These are not competing truths.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Rebuilding After the Hard Season</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Rebuilding doesn&apos;t mean going back to who you were before. That person existed in different conditions — before the losses, the growth, the profound transformation of becoming a mother through the hardest version of it. You can&apos;t (and probably don&apos;t want to) return to her. You&apos;re building something new.
          </p>
          <p>
            Practical rebuilding looks like:
          </p>
          <div className="space-y-3">
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Start with curiosity, not commitment</p>
              <p className="text-sm">You don&apos;t have to know what you want yet. Try things. Take a class. Read outside your usual genres. Say yes to an invitation. Let yourself explore without needing it to become A Thing. Follow the energy rather than the plan.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Rebuild capacity gradually</p>
              <p className="text-sm">Your tolerance for stimulation, demand, and social energy has shrunk during the hard season. It will expand again — but not all at once. Overscheduling yourself because you finally have energy will land you back in burnout. Build slowly. Leave gaps.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Reclaim one thing that&apos;s just yours</p>
              <p className="text-sm">A run. A sketchbook. A Saturday morning project. Something that has nothing to do with children, household, or productivity. Something that exists only because you enjoy it. This is not selfish. This is identity reconstruction.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Let some things stay different</p>
              <p className="text-sm">You don&apos;t have to rebuild everything that fell apart. Some of what you lost — the performative friendships, the overcommitted schedule, the need to appear perfect — maybe those don&apos;t need to come back. You get to choose what you rebuild.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">What Thriving Actually Looks Like</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Thriving is not perfection. It&apos;s not Instagram motherhood, a spotless house, a six-figure side hustle, and abs. Thriving after a hard season is quieter, deeper, and more real than that:
          </p>
          <ul className="space-y-2 ml-4">
            <li>&bull; Having energy left at the end of the day — even a little</li>
            <li>&bull; Being able to respond to your children from presence rather than survival</li>
            <li>&bull; Knowing what you need and asking for it without guilt</li>
            <li>&bull; Feeling pleasure — in food, in rest, in beauty, in your own body</li>
            <li>&bull; Having something to look forward to that isn&apos;t just &quot;getting through&quot;</li>
            <li>&bull; Being able to tolerate a hard day without it destabilising your entire week</li>
            <li>&bull; Feeling like yourself — imperfect, complicated, alive</li>
          </ul>
          <p>
            Thriving doesn&apos;t mean hard days disappear. It means you have the resilience to move through them without drowning. It means the ratio shifts — more good days than bad. More presence than autopilot. More living than surviving.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Permission to Want More</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            If you&apos;ve spent the last months or years in survival mode, the idea of wanting MORE might feel audacious. Even greedy. You learned to want nothing because wanting led to disappointment. You shrunk your desires until they fit inside the tiny space of what was available.
          </p>
          <p>
            Now there&apos;s a little more space. And the old desires are stirring — or new ones you haven&apos;t met yet. This is what they might sound like:
          </p>
          <ul className="space-y-2 ml-4">
            <li>&bull; &quot;I want work that challenges me intellectually&quot;</li>
            <li>&bull; &quot;I want to feel attractive and desired&quot;</li>
            <li>&bull; &quot;I want friendships that go deep&quot;</li>
            <li>&bull; &quot;I want to travel, or learn, or make something&quot;</li>
            <li>&bull; &quot;I want to feel like more than someone&apos;s mother&quot;</li>
            <li>&bull; &quot;I want joy — real, embodied, unearned joy&quot;</li>
          </ul>
          <p>
            These wants are not selfish. They are signs of a life returning to health. A plant that was drought-stressed doesn&apos;t just stop wilting — it starts reaching toward the light again. That reaching IS recovery. Let yourself reach.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">When to Seek Professional Help</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Sometimes the fog doesn&apos;t lift on its own. Or it lifts but leaves something behind that needs attention. Consider professional support if:
          </p>
          <ul className="space-y-2 ml-4">
            <li>&bull; You feel the hard season should be over but nothing has shifted — the flatness, numbness, or hopelessness persists</li>
            <li>&bull; You want to move forward but feel paralysed — stuck between the old life and the new one</li>
            <li>&bull; The hard season left trauma that surfaces now that you have space to feel it</li>
            <li>&bull; You don&apos;t know who you are anymore and the identity confusion is creating distress, not just curiosity</li>
            <li>&bull; You&apos;re sabotaging good things — unable to tolerate ease, success, or connection because your system is calibrated for crisis</li>
            <li>&bull; You notice that wanting more triggers intense guilt, anxiety, or self-punishment</li>
          </ul>
          <p className="mt-4">
            Therapy isn&apos;t only for crisis. It&apos;s also for transition — for the disorienting work of becoming someone new after you&apos;ve survived something hard. A therapist can help you integrate what happened, grieve what was lost, and build toward what comes next with support.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">You Made It Through</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            You survived the hardest season of your life. Not gracefully. Not perfectly. Not without cost. But you are here. Your children are here. And something is beginning to open up — slowly, tentatively, but undeniably.
          </p>
          <p>
            What comes next doesn&apos;t have to be figured out today. It doesn&apos;t have to be grand or impressive. It just has to be YOURS. Chosen by you. For you. Because you are still a person with a life ahead of you — not just a life behind you.
          </p>
          <p>
            You are allowed to be excited about what comes next. You are allowed to grieve what the hard season cost you. You are allowed to feel both simultaneously. You are allowed to take your time. And you are allowed — finally, fully — to want.
          </p>
          <div className="bg-primary/5 rounded-xl p-5 border border-primary/10 mt-4">
            <p className="italic text-foreground/90">
              &quot;I survived the hardest season. Not perfectly — but completely. I am emerging, slowly, into something new. I do not need to know what it looks like yet. I just need to stay open. I am allowed to want more than survival. I am allowed to reach toward joy. What comes next is mine to choose.&quot;
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
