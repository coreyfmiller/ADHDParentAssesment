"use client"

import Link from "next/link"
import { Sparkles, ArrowLeft } from "lucide-react"

export default function IdentityGuide() {
  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div>
        <Link href="/dashboard/guides" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Guides
        </Link>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-amber-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-medium text-foreground">Reclaiming Your Identity</h1>
        </div>
        <p className="text-muted-foreground">
          For the woman who disappeared into &quot;mum&quot; and doesn&apos;t know how to find herself again. This isn&apos;t about self-care. It&apos;s about self.
        </p>
      </div>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">The Disappearing Act</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            It happens gradually. First you lose your hobbies (no time). Then your friendships (no energy). Then your opinions (no one asks). Then one day someone says &quot;What do YOU want?&quot; and you realise you have no idea. You&apos;ve been meeting everyone else&apos;s needs for so long that you&apos;ve lost track of your own.
          </p>
          <p>
            Researchers call this transition &quot;matrescence&quot; — the developmental shift of becoming a mother. Like adolescence, it involves a fundamental reorganisation of identity, neurology, hormones, and social role. Unlike adolescence, nobody names it. There&apos;s no cultural framework. No acknowledgment that you&apos;re in the middle of one of the most profound identity upheavals a human being can experience.
          </p>
          <p>
            This guide isn&apos;t about bubble baths (that won&apos;t fix an identity crisis). It&apos;s about the deeper work of remembering who you are, grieving who you were, and making space for who you&apos;re becoming — alongside the mother, not instead of her.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Self-Care vs. Identity (They&apos;re Not the Same)</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            The wellness industry has conflated these two things, and it&apos;s causing real harm.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-2">Self-care is maintenance:</p>
              <p className="text-sm">Sleep, nutrition, hygiene, medical appointments, basic rest. These keep you functional. They&apos;re necessary. But they don&apos;t answer the question &quot;Who am I?&quot;</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-2">Identity is meaning:</p>
              <p className="text-sm">What interests you? What makes you feel alive? What would you do if no one needed you for an afternoon? What did you love before children? What might you love now that you haven&apos;t explored yet?</p>
            </div>
          </div>
          <p className="mt-4">
            A bubble bath is self-care. Reading a book that has nothing to do with parenting because YOU find it fascinating — that&apos;s identity. Both matter. But only one addresses the emptiness you feel when someone asks who you are and the only answer you have is &quot;a mum.&quot;
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">The Grief Nobody Talks About</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            You&apos;re grieving. Maybe you don&apos;t have a word for it yet. But underneath the numbness, the resentment, the &quot;I should be grateful&quot; — there&apos;s grief. For the woman you were before. Her freedom. Her spontaneity. Her body that belonged to her. Her time. Her sense of being a complete person rather than a function.
          </p>
          <p>
            The cultural message is clear: you chose this. You wanted children. So you&apos;re not allowed to grieve what motherhood cost you. But that message is a lie. Choosing something and grieving what it cost are not contradictions. They&apos;re the full complexity of being human.
          </p>
          <p>
            The grief is for:
          </p>
          <ul className="space-y-2 ml-4">
            <li>&bull; The career trajectory that shifted or stalled</li>
            <li>&bull; The friendships that couldn&apos;t survive the structural barriers</li>
            <li>&bull; The relationship that became a logistics operation</li>
            <li>&bull; The body that doesn&apos;t feel like yours</li>
            <li>&bull; The spontaneity that evaporated</li>
            <li>&bull; The version of motherhood you imagined vs. the one you got</li>
          </ul>
          <p className="mt-4">
            This grief is not ingratitude. It&apos;s not depression (though they can overlap). It&apos;s a normal, necessary response to profound loss — loss that occurred inside a role you&apos;re supposed to feel only joy about. Naming it is the first step to moving through it.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">The Guilt of Wanting Time Alone</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            You feel guilty for wanting time away from your children. For not enjoying every moment. For fantasising about being alone. For resenting the people you love most. Let&apos;s name that directly because it&apos;s one of the most universal and least spoken experiences of motherhood.
          </p>
          <p>
            The guilt is rooted in a belief: a good mother is a selfless mother. Wanting things for yourself means taking from them. Your needs and their needs are in competition.
          </p>
          <p>
            They&apos;re not. A mother with a sense of self raises children who learn that adults are allowed to be whole people. A mother who martyrs herself teaches her children that love requires self-erasure. Which lesson do you want them to carry into their own relationships?
          </p>
          <h3 className="text-lg font-medium text-foreground mt-6 mb-3">Reframes for the guilt:</h3>
          <div className="space-y-3">
            <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
              <p className="italic text-foreground/90">&quot;Needing time alone doesn&apos;t mean I don&apos;t love them. It means I&apos;m a human being with a nervous system that needs recovery.&quot;</p>
            </div>
            <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
              <p className="italic text-foreground/90">&quot;My children benefit from a mother who knows herself. They don&apos;t benefit from a mother who&apos;s disappeared.&quot;</p>
            </div>
            <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
              <p className="italic text-foreground/90">&quot;I am modelling for my daughter what it looks like to be a woman who takes up space. That matters.&quot;</p>
            </div>
            <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
              <p className="italic text-foreground/90">&quot;The resentment I feel when I never get time alone is more damaging to my family than the time itself would be.&quot;</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Finding Yourself Again (Practically)</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            You can&apos;t think your way back to yourself. You have to DO things and notice what lights up. Identity is discovered through action, not reflection alone.
          </p>
          <h3 className="text-lg font-medium text-foreground mt-4 mb-3">The Micro-Identity Experiment (4 weeks):</h3>
          <div className="space-y-3">
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Week 1: Remember</p>
              <p className="text-sm">Write down 10 things you enjoyed before children. Not &quot;productive&quot; things. Things that made you feel alive, curious, or like yourself. Don&apos;t judge the list. Just remember.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Week 2: Try one</p>
              <p className="text-sm">Pick the easiest thing from your list and do it for 15 minutes. Not an hour. Fifteen minutes. Notice how it feels in your body. Does something wake up? Does it feel familiar? Does it feel like coming home?</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Week 3: Try something new</p>
              <p className="text-sm">You&apos;re not the same person you were before children. Some old interests won&apos;t fit anymore. Try something you&apos;ve never done: a podcast on a topic that intrigues you, a 10-minute sketch, a walk with no destination, a recipe from a cuisine you&apos;ve never cooked. Who is the woman you&apos;re becoming?</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Week 4: Protect it</p>
              <p className="text-sm">Whatever sparked something — schedule it. Put it in the calendar like a medical appointment. Tell someone: &quot;Thursday 8-9pm is mine.&quot; It doesn&apos;t have to be big. It has to be consistent. Consistency is how identity rebuilds.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">When the Barriers Are Structural</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Not everyone reading this has a partner to cover evenings, money for childcare, or even 15 minutes that aren&apos;t already spoken for. If the barrier to identity isn&apos;t internal (guilt, permission) but structural (no time, no money, no support) — that&apos;s not a personal failure. It&apos;s an access issue.
          </p>
          <p>
            When structural barriers are real, identity micro-doses become even more important:
          </p>
          <ul className="space-y-2 ml-4">
            <li>&bull; Listen to one song with your eyes closed while the kettle boils (2 minutes)</li>
            <li>&bull; Read one page of a book in the bathroom (the only locked door in the house)</li>
            <li>&bull; Follow one account that reflects an interest that isn&apos;t parenting</li>
            <li>&bull; Save one podcast for the school run that&apos;s just for you</li>
            <li>&bull; Write one sentence each night about how you felt today (30 seconds)</li>
          </ul>
          <p className="mt-4">
            These feel pathetically small. They&apos;re not. Each one is a vote for the person underneath the role. Each one says: &quot;I still exist.&quot; And over weeks, they compound into something that feels like a self.
          </p>
          <p>
            If your circumstances don&apos;t allow more right now — that&apos;s okay. This isn&apos;t about grand gestures. It&apos;s about keeping the thread alive until your circumstances shift.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">The Resentment Signal</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Resentment isn&apos;t a character flaw. It&apos;s a signal that something has been unsustainable for too long. If you feel resentment toward your partner, your children, or your life — that&apos;s not evidence that you&apos;re ungrateful. It&apos;s evidence that your needs have been unmet for so long that your psyche is protesting.
          </p>
          <p>
            What resentment is trying to tell you:
          </p>
          <ul className="space-y-2 ml-4">
            <li>&bull; &quot;I need something to change and I&apos;ve been waiting too long for someone to notice&quot;</li>
            <li>&bull; &quot;I&apos;ve been saying yes when I mean no, and the cost has accumulated&quot;</li>
            <li>&bull; &quot;I&apos;ve lost myself and I&apos;m angry about it but don&apos;t know who to be angry at&quot;</li>
            <li>&bull; &quot;I love these people AND I need more than this life is currently giving me&quot;</li>
          </ul>
          <p className="mt-4">
            The antidote to resentment isn&apos;t gratitude (that just adds guilt on top). The antidote is action: naming what you need, asking for it clearly, and building a life that has room for you in it. Not someday. Now.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">When Identity Loss Becomes Something More</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            There&apos;s a line between &quot;I&apos;ve lost touch with who I am&quot; and &quot;I don&apos;t want to exist.&quot; Identity erosion can slide into depression — and the slide is often invisible because the symptoms overlap. Both involve numbness, lack of motivation, loss of interest, and feeling empty.
          </p>
          <p>
            Consider reaching out to a professional if:
          </p>
          <ul className="space-y-2 ml-4">
            <li>&bull; The emptiness doesn&apos;t shift even when you DO get time alone</li>
            <li>&bull; You&apos;ve lost interest in everything — not just motherhood things, but ALL things</li>
            <li>&bull; You feel like your family would be better off without you</li>
            <li>&bull; The numbness has lasted more than a few weeks with no breaks</li>
            <li>&bull; You&apos;re going through the motions but feel nothing — not even resentment</li>
          </ul>
          <p className="mt-4">
            Identity rebuilding is personal work. Depression is clinical work. Both are valid. And sometimes you need the clinical support before the personal work can even begin. There&apos;s no shame in that.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">You Are Allowed to Exist</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            This is the permission slip no one gives you:
          </p>
          <p>
            You are allowed to have interests that have nothing to do with your children. You are allowed to spend money on yourself without justifying it. You are allowed to close a door and be alone. You are allowed to say &quot;I don&apos;t want to play right now.&quot; You are allowed to have ambitions beyond raising good humans. You are allowed to miss your old life without it meaning you don&apos;t love your current one.
          </p>
          <p>
            You are a person. Not just a mother. Not just a partner. Not just a function. A person with desires, boundaries, opinions, and a right to take up space in her own life.
          </p>
          <p>
            Start small. Start today. One thing that&apos;s just for you.
          </p>
        </div>
      </section>

      <p className="text-sm text-muted-foreground/70 text-center leading-relaxed">
        This guide is for educational and self-reflection purposes only. It is not a substitute for professional mental health care. If you are in crisis, contact 988 (Suicide &amp; Crisis Lifeline) or your local emergency services.
      </p>
    </div>
  )
}
