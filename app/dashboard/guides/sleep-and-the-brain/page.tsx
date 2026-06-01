"use client"

import Link from "next/link"
import { Moon, ArrowLeft } from "lucide-react"

export default function SleepGuide() {
  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div>
        <Link href="/dashboard/guides" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Guides
        </Link>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
            <Moon className="w-5 h-5 text-indigo-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-medium text-foreground">Sleep & The Overwhelmed Brain</h1>
        </div>
        <p className="text-muted-foreground">
          Why your brain won&apos;t let you sleep, why rest doesn&apos;t reach you, and what to do when &quot;sleep hygiene&quot; advice was written for people without children.
        </p>
      </div>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Why Standard Sleep Advice Doesn&apos;t Work for You</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Every sleep article says the same things: consistent bedtime, no screens, cool room, no caffeine after 2pm. And you&apos;ve tried all of it. It doesn&apos;t work — not because you&apos;re doing it wrong, but because that advice assumes:
          </p>
          <ul className="space-y-2 ml-4">
            <li>&bull; You control when you go to bed (you don&apos;t — the kids do)</li>
            <li>&bull; You won&apos;t be woken at 2am (you will)</li>
            <li>&bull; Your brain can &quot;wind down&quot; on command (it can&apos;t)</li>
            <li>&bull; Nighttime is for sleeping (for you, it&apos;s the only time that&apos;s yours)</li>
          </ul>
          <p>
            This guide works with your reality, not against it.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">The Racing Mind Problem</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            You lie down. Your body is exhausted. And your brain turns ON. The to-do list starts running. You replay the argument from this morning. You remember the form you forgot to sign. You plan tomorrow&apos;s meals. You worry about your child&apos;s behavior at school.
          </p>
          <p>
            This isn&apos;t insomnia in the traditional sense. It&apos;s a brain that doesn&apos;t feel safe enough to power down. All day, you&apos;ve been managing, tracking, anticipating. Your prefrontal cortex has been running at full capacity. It doesn&apos;t know how to stop — because stopping feels dangerous. What if you forget something? What if something goes wrong while you&apos;re not vigilant?
          </p>
          <h3 className="text-lg font-medium text-foreground mt-6 mb-3">What actually helps:</h3>
          <div className="space-y-3">
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">The Brain Dump (3 minutes, non-negotiable)</p>
              <p className="text-sm">Keep a notebook by your bed. Before lights out, write down everything your brain is holding: tasks, worries, half-thoughts, things you forgot today. Don&apos;t organize. Just dump. You&apos;re telling your brain: &quot;I&apos;ve captured this. You can let go.&quot;</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">The Worry Window (earlier in the evening)</p>
              <p className="text-sm">Set a timer for 10 minutes at 8pm. Worry intentionally. Write down every concern. When the timer goes off: &quot;I&apos;ve done my worrying for today. Anything else can wait until tomorrow&apos;s window.&quot; This sounds absurd. It works because it gives your brain a designated container.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">The Body Scan Redirect</p>
              <p className="text-sm">When thoughts start racing, redirect attention to physical sensation. Start at your feet: notice the weight, the temperature, the texture of the sheets. Move up slowly. You&apos;re not trying to relax — you&apos;re giving your brain something boring to do instead of planning tomorrow.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">The &quot;Boring Story&quot; Technique</p>
              <p className="text-sm">Imagine yourself doing something extremely mundane in vivid detail: walking through a familiar grocery store, painting a wall one stroke at a time, organizing a bookshelf by color. The key is BORING but DETAILED. It occupies the narrative brain without activating the worry brain.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Revenge Bedtime Procrastination</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            It&apos;s 11pm. You&apos;re exhausted. The kids are finally asleep. And instead of going to bed, you stay up scrolling, watching, reading — anything to extend this precious window of time that belongs only to you.
          </p>
          <p>
            This isn&apos;t a discipline problem. It&apos;s an identity problem. After a day of being needed by everyone, nighttime is the only space where you exist as a person — not as mom, not as partner, not as employee. You&apos;re trading sleep for selfhood. And that trade makes complete psychological sense, even as it destroys you physically.
          </p>
          <h3 className="text-lg font-medium text-foreground mt-6 mb-3">The real fix (it&apos;s not &quot;just go to bed earlier&quot;):</h3>
          <div className="space-y-3">
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Claim daytime identity minutes</p>
              <p className="text-sm">Find 15-20 minutes during daylight hours that are YOURS. Not productive time. Identity time. Read a chapter. Listen to a podcast that has nothing to do with parenting. Sit in your car for 10 minutes after school pickup. If nighttime doesn&apos;t have to carry ALL of your personhood, you can let it go earlier.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">The 10:30 Alarm</p>
              <p className="text-sm">Set an alarm for 90 minutes before you need to be asleep. When it goes off, you have 15 minutes to wrap up. Not negotiable. Not &quot;one more episode.&quot; Your future morning self is begging your current nighttime self for this boundary. Honor her.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Make the transition less abrupt</p>
              <p className="text-sm">Going from &quot;my time&quot; to &quot;unconscious&quot; feels like a loss. Build a bridge: 15 minutes of something that&apos;s still yours but calmer. A book (physical, not phone). A skincare routine that feels like self-care. A podcast with a sleep timer. You&apos;re not giving up your time — you&apos;re transitioning it.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Night Wakings & Fragmented Sleep</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            If you haven&apos;t slept through the night in months or years — whether from a baby, a toddler, a child with nightmares, or your own body waking you — the cumulative effect is devastating. Fragmented sleep prevents your brain from completing full sleep cycles, which means even 8 hours of interrupted sleep gives you less restoration than 5 hours of unbroken sleep.
          </p>
          <h3 className="text-lg font-medium text-foreground mt-4 mb-3">Strategies for the reality you&apos;re in:</h3>
          <div className="space-y-3">
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Protect one 4-hour block</p>
              <p className="text-sm">Your brain needs at least one complete sleep cycle (90 min) to do repair work. Ideally, fight for a 4-hour unbroken stretch. If you have a partner: split the night. One person is &quot;on&quot; from 8pm-1am, the other from 1am-6am. During your off shift, sleep in a separate room with earplugs. You will feel guilty. Do it anyway.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">The 60-second rule</p>
              <p className="text-sm">When a child calls out or fusses, wait 60 seconds before responding. Not to be cruel — to give them a chance to self-settle. Many brief wake-ups resolve on their own if you don&apos;t intervene immediately. This is especially true for toddlers and older children.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">The re-entry protocol</p>
              <p className="text-sm">When you&apos;re woken and can&apos;t fall back asleep: don&apos;t look at your phone (the light resets your circadian clock). Don&apos;t calculate how many hours you have left (that creates anxiety). Instead: feet on floor, bathroom if needed, back to bed, body scan from feet up. Give yourself 20 minutes. If still awake, get up and do something boring in dim light until drowsy.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Nap strategically (if possible)</p>
              <p className="text-sm">A 20-minute nap between 1-3pm can partially compensate for nighttime fragmentation. Set an alarm — longer than 30 minutes and you&apos;ll enter deep sleep, making you groggier. Even closing your eyes for 10 minutes without sleeping (non-sleep deep rest) provides some neural recovery.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Sleep Deprivation Is Not a Badge of Honor</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Motherhood culture normalizes exhaustion. &quot;Sleep when the baby sleeps&quot; (impossible). &quot;You&apos;ll sleep when they&apos;re 18&quot; (not helpful). &quot;I survived on 4 hours for years&quot; (that&apos;s not survival, that&apos;s damage).
          </p>
          <p>
            Here&apos;s what chronic sleep deprivation actually does to your brain:
          </p>
          <ul className="space-y-2 ml-4">
            <li>&bull; <strong>Working memory drops 30-40%</strong> — you forget things, lose track, can&apos;t hold information</li>
            <li>&bull; <strong>Emotional regulation collapses</strong> — your fuse shortens, reactivity increases, you snap at things that normally wouldn&apos;t bother you</li>
            <li>&bull; <strong>Executive function impairment</strong> — planning, prioritizing, and task initiation all suffer. This mimics ADHD so closely that many women are misidentified as having ADHD when they&apos;re actually chronically sleep-deprived</li>
            <li>&bull; <strong>Immune function drops</strong> — you get sick more often, recover more slowly</li>
            <li>&bull; <strong>Pain sensitivity increases</strong> — everything hurts more when you&apos;re exhausted</li>
          </ul>
          <p className="mt-4">
            If you&apos;re reading this and recognizing yourself — some of what you&apos;ve been attributing to &quot;being broken&quot; or &quot;having ADHD&quot; or &quot;being a bad mom&quot; may actually be your brain running on insufficient rest. That&apos;s not a character flaw. That&apos;s a resource problem with a solution.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">When to Seek Help</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>Talk to a healthcare provider if:</p>
          <ul className="space-y-2 ml-4">
            <li>&bull; You&apos;re getting adequate hours but never feel rested (possible sleep disorder)</li>
            <li>&bull; You stop breathing or snore heavily (sleep apnea is underdiagnosed in women)</li>
            <li>&bull; Anxiety or racing thoughts prevent sleep most nights despite trying strategies</li>
            <li>&bull; You&apos;re relying on alcohol or medication to fall asleep</li>
            <li>&bull; Daytime impairment is affecting your safety or your children&apos;s safety</li>
          </ul>
          <p className="mt-4">
            Say this to your doctor: &quot;I&apos;m experiencing chronic sleep disruption that&apos;s impairing my daily function. I&apos;d like to explore whether there&apos;s a physiological component beyond my circumstances.&quot;
          </p>
        </div>
      </section>

      <p className="text-sm text-muted-foreground/70 text-center leading-relaxed">
        This guide is for educational purposes only. It is not medical advice. If you have concerns about a sleep disorder, please consult a healthcare provider.
      </p>
    </div>
  )
}
