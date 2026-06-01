"use client"

import Link from "next/link"
import { Heart, ArrowLeft } from "lucide-react"

export default function RelationshipGuide() {
  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      {/* Header */}
      <div>
        <Link href="/dashboard/guides" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Guides
        </Link>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center">
            <Heart className="w-5 h-5 text-pink-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-medium text-foreground">The Relationship Maintenance Guide</h1>
        </div>
        <p className="text-muted-foreground">
          For the partnership that&apos;s become a logistics operation. How to stay connected when you&apos;re both running on empty.
        </p>
      </div>

      {/* The Real Problem */}
      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">The Real Problem</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Most relationship advice assumes two rested, regulated adults with spare emotional bandwidth. That&apos;s not you. You&apos;re two depleted people trying to co-manage a household, raise children, and somehow still like each other at the end of the day.
          </p>
          <p>
            The fights aren&apos;t really about the dishes. They&apos;re about feeling unseen. About carrying invisible weight. About one person&apos;s brain working differently and the other person not understanding why &quot;just write it down&quot; isn&apos;t a solution.
          </p>
          <p>
            This guide isn&apos;t about fixing your relationship. It&apos;s about understanding the specific friction points that overwhelm, neurodivergence, and depletion create in partnerships — and having actual words for the conversations that need to happen.
          </p>
        </div>
      </section>

      {/* The Mental Load Conversation */}
      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">The Mental Load Conversation</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            The mental load isn&apos;t about who does more tasks. It&apos;s about who REMEMBERS that tasks need doing. Who tracks the dentist appointments, knows when the school forms are due, notices the milk is running low, and holds the emotional temperature of every family member in their head simultaneously.
          </p>
          <p>
            Research consistently shows this cognitive labor falls disproportionately on mothers — and it&apos;s invisible. Your partner may genuinely not understand what you&apos;re carrying because they&apos;ve never had to carry it.
          </p>
          <h3 className="text-lg font-medium text-foreground mt-6 mb-3">How to have this conversation:</h3>
          <div className="bg-secondary/30 rounded-xl p-5 space-y-3">
            <p className="font-medium text-foreground">Step 1: Make it visible</p>
            <p>For one week, write down every single thing you track, remember, anticipate, or manage. Every permission slip, every meal plan, every &quot;we&apos;re almost out of...&quot;, every emotional check-in with a child. Don&apos;t organize it. Just dump it.</p>
            <p className="font-medium text-foreground mt-4">Step 2: Show, don&apos;t tell</p>
            <p>Sit down with your partner when you&apos;re both calm (not mid-argument). Say: &quot;I want to show you something. This is everything I tracked this week for our family. I&apos;m not saying you don&apos;t help — I&apos;m saying the REMEMBERING part is what&apos;s crushing me.&quot;</p>
            <p className="font-medium text-foreground mt-4">Step 3: Transfer ownership, not tasks</p>
            <p>Don&apos;t ask for &quot;help.&quot; That keeps you as the manager. Instead: &quot;I need you to fully OWN bedtime routine. That means remembering teeth, choosing books, handling the stalling, and getting them down. I will not remind you or check.&quot; The key word is OWN.</p>
          </div>
        </div>
      </section>

      {/* Explaining Your Brain */}
      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Explaining Your Brain to Your Partner</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            If your brain works differently — whether that&apos;s ADHD, autistic traits, sensory sensitivity, or executive function challenges — your partner needs to understand what that actually means in daily life. Not as an excuse. As information that changes how you solve problems together.
          </p>
          <h3 className="text-lg font-medium text-foreground mt-6 mb-3">Scripts for the conversation:</h3>
          <div className="space-y-4">
            <div className="bg-primary/5 rounded-xl p-5 border border-primary/10">
              <p className="text-sm font-medium text-foreground mb-2">About forgetting:</p>
              <p className="italic text-foreground/90">&quot;When I forget things, it&apos;s not because I don&apos;t care. My brain has a smaller &apos;desktop&apos; — it can only hold 2-3 things at once. If something isn&apos;t visible or immediate, it literally stops existing in my awareness. I need external systems, not more effort.&quot;</p>
            </div>
            <div className="bg-primary/5 rounded-xl p-5 border border-primary/10">
              <p className="text-sm font-medium text-foreground mb-2">About paralysis:</p>
              <p className="italic text-foreground/90">&quot;When I&apos;m staring at a mess and not moving, I&apos;m not being lazy. My brain can&apos;t fire the &apos;start&apos; signal. It&apos;s like having a car with a dead starter — the engine works fine, but the ignition won&apos;t turn. I need help getting started, not criticism for being stuck.&quot;</p>
            </div>
            <div className="bg-primary/5 rounded-xl p-5 border border-primary/10">
              <p className="text-sm font-medium text-foreground mb-2">About sensory overload:</p>
              <p className="italic text-foreground/90">&quot;When I snap at the end of the day, it&apos;s usually because my nervous system has hit capacity. The noise, the touching, the questions — they build up until I can&apos;t process anymore. I need you to take over before I hit that wall, not after I&apos;ve already broken.&quot;</p>
            </div>
            <div className="bg-primary/5 rounded-xl p-5 border border-primary/10">
              <p className="text-sm font-medium text-foreground mb-2">About inconsistency:</p>
              <p className="italic text-foreground/90">&quot;Some days I can handle everything. Other days I can barely function. That&apos;s not me being difficult — it&apos;s how my brain and body work. I need you to trust that when I say I can&apos;t, I genuinely can&apos;t. Not won&apos;t. Can&apos;t.&quot;</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Recurring Argument */}
      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">The Recurring Argument (And How to Break It)</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Every couple has The Argument. The one that comes back in different costumes but is always the same fight underneath. For couples where one partner is overwhelmed or neurodivergent, it usually sounds like one of these:
          </p>
          <ul className="space-y-2 ml-4">
            <li>&bull; &quot;You never help unless I ask&quot; vs. &quot;You never tell me what you need&quot;</li>
            <li>&bull; &quot;You forgot again&quot; vs. &quot;I&apos;m trying my best&quot;</li>
            <li>&bull; &quot;The house is a mess&quot; vs. &quot;I can&apos;t see it the way you do&quot;</li>
            <li>&bull; &quot;I do everything&quot; vs. &quot;Nothing I do is good enough&quot;</li>
          </ul>
          <p className="mt-4">
            These arguments persist because both people are right AND both people are missing something. She&apos;s right that the load is unequal. He&apos;s right that he doesn&apos;t know what she needs. She&apos;s right that she shouldn&apos;t have to ask. He&apos;s right that he can&apos;t read her mind.
          </p>
          <h3 className="text-lg font-medium text-foreground mt-6 mb-3">Breaking the cycle:</h3>
          <div className="bg-secondary/30 rounded-xl p-5 space-y-3">
            <p><strong className="text-foreground">1. Name the pattern, not the person.</strong> Instead of &quot;You always...&quot; try &quot;We keep having this fight about dishes. Can we solve the SYSTEM instead of blaming each other?&quot;</p>
            <p><strong className="text-foreground">2. Separate the logistics from the feelings.</strong> The dishes aren&apos;t the problem. The feeling of being unseen is. Address the feeling first: &quot;I feel invisible when I&apos;m the only one who notices what needs doing.&quot;</p>
            <p><strong className="text-foreground">3. Build systems, not promises.</strong> &quot;I&apos;ll try harder&quot; doesn&apos;t work for either of you. What works: a shared task app, a visible chore chart, designated ownership of specific domains. Systems don&apos;t require willpower or memory.</p>
            <p><strong className="text-foreground">4. Accept different standards.</strong> If your partner loads the dishwasher &quot;wrong&quot; — is it actually wrong, or is it different? If the kids are alive and fed after his solo evening, does it matter that bedtime was 20 minutes late? Pick your battles with intention.</p>
          </div>
        </div>
      </section>

      {/* Low-Energy Connection */}
      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Low-Energy Connection</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            When you&apos;re both depleted, &quot;date night&quot; feels like another task on the list. The pressure to have quality time when you have no quality energy left creates its own resentment. Here&apos;s what actually works when capacity is low:
          </p>
          <h3 className="text-lg font-medium text-foreground mt-4 mb-3">5-minute connection rituals:</h3>
          <div className="space-y-3">
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">The 2-minute check-in</p>
              <p className="text-sm">Every evening after kids are down, before screens come out: &quot;What was the hardest part of your day?&quot; Listen. Don&apos;t fix. Just witness each other. Two minutes. That&apos;s it.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Parallel rest</p>
              <p className="text-sm">You don&apos;t have to DO something together. Sitting on the couch, each doing your own thing, feet touching — that&apos;s connection. Proximity without demand. It counts.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">The gratitude text</p>
              <p className="text-sm">Once a day, text your partner one specific thing: &quot;Thank you for handling bedtime so I could sit down.&quot; Not generic. Specific. It takes 10 seconds and it shifts the emotional temperature.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">The 6-second kiss</p>
              <p className="text-sm">Research by the Gottman Institute shows that a 6-second kiss (longer than a peck) maintains physical connection even when intimacy feels impossible. It&apos;s brief enough to not feel like a demand, long enough to register as real.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">The weekly question</p>
              <p className="text-sm">Pick one question each week that isn&apos;t about logistics or kids: &quot;What are you looking forward to?&quot; &quot;What do you need from me this week?&quot; &quot;What&apos;s one thing I could do that would make you feel loved?&quot;</p>
            </div>
          </div>
        </div>
      </section>

      {/* When Resentment Has Built Up */}
      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">When Resentment Has Already Built Up</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            If you&apos;re reading this with a knot of anger in your chest — if the resentment has been building for months or years — these strategies won&apos;t land until you address what&apos;s underneath. Resentment is a signal that something has been unsustainable for too long.
          </p>
          <h3 className="text-lg font-medium text-foreground mt-4 mb-3">What resentment is actually saying:</h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span> &quot;I&apos;ve been giving more than I&apos;m getting back for too long&quot;</li>
            <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span> &quot;My needs have been invisible and I&apos;m tired of pretending that&apos;s okay&quot;</li>
            <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span> &quot;I asked for change and it didn&apos;t come, so I stopped asking and started keeping score&quot;</li>
            <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span> &quot;I love this person but I don&apos;t like our life together right now&quot;</li>
          </ul>
          <h3 className="text-lg font-medium text-foreground mt-6 mb-3">The resentment conversation script:</h3>
          <div className="bg-primary/5 rounded-xl p-5 border border-primary/10">
            <p className="italic text-foreground/90 leading-relaxed">
              &quot;I need to be honest about something. I&apos;ve been carrying resentment and it&apos;s affecting how I feel about us. It&apos;s not that I don&apos;t love you — it&apos;s that I&apos;ve been running on empty for so long that I&apos;ve started keeping score, and that&apos;s not who I want to be. I need things to change — not because you&apos;re a bad partner, but because what we&apos;re doing isn&apos;t sustainable for me. Can we talk about what that change looks like?&quot;
            </p>
          </div>
          <p className="mt-4">
            If this conversation feels impossible — if you can&apos;t imagine saying these words without it becoming a fight — that&apos;s information too. A couples therapist who understands neurodivergence and unequal load dynamics can hold the space that feels too charged to hold alone.
          </p>
        </div>
      </section>

      {/* When You're the Neurodivergent Partner */}
      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">When You&apos;re the One Whose Brain Works Differently</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            If you&apos;re the partner with ADHD, executive function challenges, or sensory differences — you carry a specific kind of guilt. The guilt of forgetting. The guilt of not seeing the mess. The guilt of needing reminders. The guilt of being the &quot;difficult&quot; one.
          </p>
          <p>
            Here&apos;s what&apos;s true: your brain differences are real, they&apos;re not your fault, AND they affect your partner. Both things are true simultaneously. You don&apos;t have to choose between self-compassion and accountability.
          </p>
          <h3 className="text-lg font-medium text-foreground mt-4 mb-3">What accountability looks like (without shame):</h3>
          <div className="bg-secondary/30 rounded-xl p-5 space-y-3">
            <p><strong className="text-foreground">Own the impact, not the intent.</strong> &quot;I know I forgot the appointment. That wasn&apos;t intentional, but I understand it affects you. Here&apos;s what I&apos;m putting in place so it doesn&apos;t happen again.&quot;</p>
            <p><strong className="text-foreground">Build systems instead of making promises.</strong> &quot;I&apos;ll try harder&quot; is a promise your brain can&apos;t keep. &quot;I&apos;ve set three alarms and put it on the wall calendar&quot; is a system that doesn&apos;t require your memory to work.</p>
            <p><strong className="text-foreground">Ask for what you need without apologizing for needing it.</strong> &quot;I need you to tell me things in writing, not verbally. My brain doesn&apos;t hold spoken information. That&apos;s not me being difficult — it&apos;s me telling you how to communicate with my brain effectively.&quot;</p>
            <p><strong className="text-foreground">Acknowledge their frustration as valid.</strong> Living with someone whose brain works differently IS harder in some ways. Your partner is allowed to feel frustrated. That doesn&apos;t mean you&apos;re a burden — it means the situation is genuinely challenging for both of you.</p>
          </div>
        </div>
      </section>

      {/* The Intimacy Gap */}
      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">The Intimacy Gap</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            When you&apos;re touched out, depleted, resentful, or running on survival mode — physical intimacy often becomes another demand on a body that&apos;s already given everything. This is one of the most common and least talked-about friction points for overwhelmed mothers.
          </p>
          <p>
            What&apos;s important to understand: low desire in the context of depletion and overwhelm is not a libido problem. It&apos;s a resource problem. Your body is in survival mode. Survival mode shuts down everything non-essential — and your nervous system has categorized intimacy as non-essential because it&apos;s trying to keep you alive.
          </p>
          <h3 className="text-lg font-medium text-foreground mt-4 mb-3">What helps:</h3>
          <div className="space-y-3">
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Name it without shame</p>
              <p className="text-sm">&quot;My body is in survival mode right now. It&apos;s not about you or my attraction to you — it&apos;s about my nervous system being maxed out. I need to feel safe and rested before I can feel desire.&quot;</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Separate touch from expectation</p>
              <p className="text-sm">If every touch feels like a precursor to sex, you&apos;ll avoid all touch. Agree explicitly: &quot;This is just a hug. No expectations.&quot; Rebuilding non-sexual physical connection creates the safety that desire needs to return.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Address the load first</p>
              <p className="text-sm">Research consistently shows that for women, the biggest predictor of desire isn&apos;t romance — it&apos;s feeling like the domestic load is fair. If you want more intimacy, start with the dishes. Seriously.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Consider responsive desire</p>
              <p className="text-sm">Many women (especially when depleted) don&apos;t experience spontaneous desire — they experience responsive desire. That means desire shows up AFTER arousal begins, not before. This is normal, not broken. It just means initiation looks different.</p>
            </div>
          </div>
        </div>
      </section>

      {/* When to Seek Help */}
      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">When to Seek Professional Support</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>Consider couples therapy if:</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span> The same argument keeps happening with no resolution</li>
            <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span> You&apos;ve stopped talking about anything real</li>
            <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span> Resentment has hardened into contempt</li>
            <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span> One or both of you feels more like a roommate than a partner</li>
            <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span> You can&apos;t have the load conversation without it becoming a fight</li>
            <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span> Neurodivergence is creating friction neither of you knows how to navigate</li>
          </ul>
          <p className="mt-4">
            Look for a therapist who understands: neurodivergence in relationships, unequal domestic labor dynamics, and the specific pressures of parenting young children. A general couples therapist who says &quot;just schedule date nights&quot; won&apos;t reach the real issues.
          </p>
        </div>
      </section>

      {/* Disclaimer */}
      <p className="text-sm text-muted-foreground/70 text-center leading-relaxed">
        This guide is for educational and self-reflection purposes only. It is not a substitute for couples therapy or professional relationship support.
      </p>
    </div>
  )
}
