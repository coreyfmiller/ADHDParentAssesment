"use client"

import Link from "next/link"
import { Flame, ArrowLeft } from "lucide-react"

export default function RageGuide() {
  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div>
        <Link href="/dashboard/guides" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Guides
        </Link>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
            <Flame className="w-5 h-5 text-red-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-medium text-foreground">Navigating Rage</h1>
        </div>
        <p className="text-muted-foreground">
          The fury that terrifies you. Where it comes from, what it means, and what to do when you feel like you&apos;re going to explode.
        </p>
      </div>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">This Rage Is Not Who You Are</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            You love your children. You would do anything for them. And sometimes you feel a rage so white-hot it scares you. You slam doors. You scream. You grip the counter so hard your knuckles go white. You say things in a voice that doesn&apos;t sound like yours. And afterward, you feel like a monster.
          </p>
          <p>
            You are not a monster. You are not your mother. You are not dangerous. You are a person whose nervous system has been pushed past its capacity — repeatedly, chronically, without adequate recovery — and rage is the emergency pressure valve your body uses when everything else has failed.
          </p>
          <p>
            Rage in mothers is one of the most common and least discussed experiences of parenthood. It&apos;s underresearched, underacknowledged, and wrapped in so much shame that most women suffer it in silence, convinced they are uniquely broken. They are not. You are not.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">What&apos;s Actually Happening in Your Body</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Rage is not an emotion in isolation. It&apos;s the end-stage of a neurological cascade that&apos;s been building — usually for hours, sometimes for days.
          </p>
          <p>
            Here&apos;s the sequence: Throughout the day, your amygdala (threat detection centre) is being activated by input — noise, demands, touch, decisions, conflict, sensory stimulation. Each activation adds to your allostatic load (the accumulated stress on your system). Your prefrontal cortex (the rational, regulating part of your brain) works to contain each activation. But it has finite resources.
          </p>
          <p>
            When the load exceeds what your prefrontal cortex can contain — when the input outpaces the regulation — your amygdala fires without a check. The rage isn&apos;t proportionate to the trigger (the spilled milk, the whining, the &quot;Mum!&quot; for the 400th time) because it&apos;s not actually about the trigger. It&apos;s about everything that came before. The trigger is just the last drop in an already-overflowing cup.
          </p>
          <p>
            This is why you can be fine at 9am and explosive at 5pm. Your regulation resources depleted across the day. By evening, your prefrontal cortex is offline and your amygdala is running the show. It&apos;s not a character flaw. It&apos;s a resource failure.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">The Fuel Behind the Fire</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Rage doesn&apos;t come from nowhere. When you trace it back, there&apos;s almost always a cocktail of specific fuels:
          </p>
          <div className="space-y-3">
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Sensory overload</p>
              <p className="text-sm">Noise, touch, visual clutter, multiple inputs at once. By late afternoon, your sensory processing capacity is spent. One more &quot;Mum!&quot; and the system crashes.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Unmet basic needs</p>
              <p className="text-sm">You haven&apos;t eaten properly. You&apos;re dehydrated. You didn&apos;t sleep enough. You haven&apos;t sat down. Your body is in deficit and your brain is rationing resources — regulation goes first.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Accumulated resentment</p>
              <p className="text-sm">You&apos;ve been carrying the invisible load without acknowledgment. You&apos;ve swallowed your needs for days or weeks. The rage is what resentment becomes when it has nowhere to go.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Hormonal shifts</p>
              <p className="text-sm">Premenstrual drops in estrogen reduce emotional regulation capacity. Postpartum hormonal upheaval can trigger rage as a primary mood symptom. Perimenopause introduces rage many women have never experienced before.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Being triggered</p>
              <p className="text-sm">Your child does something that activates something old in you — defiance that echoes how you were punished, neediness that mirrors what you were denied, helplessness that triggers your own childhood powerlessness. The rage belongs to a different time.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Feeling trapped</p>
              <p className="text-sm">No escape valve. No break coming. No end in sight. Rage is your nervous system&apos;s attempt to create an exit — to discharge energy when there&apos;s no other way to release it.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Rage vs. Abuse: The Distinction That Matters</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Many women in the grip of rage immediately conclude: &quot;I&apos;m abusive. I&apos;m just like my mother. I&apos;m damaging my children.&quot; This fear is so powerful that it prevents them from seeking help — because admitting the rage feels like admitting to being a danger.
          </p>
          <p>
            Here&apos;s the clinical distinction:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-2">Dysregulated rage (what most mothers experience):</p>
              <ul className="space-y-1 text-sm">
                <li>&bull; Happens when capacity is exceeded</li>
                <li>&bull; Followed by remorse and desire to repair</li>
                <li>&bull; Feels ego-dystonic (not like &quot;you&quot;)</li>
                <li>&bull; You&apos;re scared of it</li>
                <li>&bull; You want it to stop</li>
                <li>&bull; It&apos;s about YOUR overwhelm, not about control</li>
              </ul>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-2">Abusive anger (a different pattern):</p>
              <ul className="space-y-1 text-sm">
                <li>&bull; Used to control, punish, or intimidate</li>
                <li>&bull; Followed by blame (&quot;you made me do that&quot;)</li>
                <li>&bull; Feels justified — the other person &quot;deserved it&quot;</li>
                <li>&bull; No genuine remorse or desire to change</li>
                <li>&bull; Targeted and strategic</li>
                <li>&bull; It&apos;s about POWER, not overwhelm</li>
              </ul>
            </div>
          </div>
          <p className="mt-4">
            If you&apos;re reading this with fear and shame — if you&apos;re terrified of what you become when you rage — that terror itself is evidence that you&apos;re in the first category. Abusive people don&apos;t Google &quot;am I abusive?&quot; They don&apos;t lie awake in shame. They don&apos;t desperately want to stop.
          </p>
          <p>
            This doesn&apos;t mean the rage is okay or that your children aren&apos;t affected. It means you&apos;re not a monster — you&apos;re a depleted person who needs support, not condemnation.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">In the Moment: When Rage Is Rising</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            You can feel it building. The jaw tightens. The chest gets hot. Your voice changes pitch. You have a narrow window — maybe 10 seconds — between &quot;I&apos;m getting angry&quot; and &quot;I&apos;ve exploded.&quot; These strategies are for that window.
          </p>
          <div className="space-y-3">
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">1. Leave the room</p>
              <p className="text-sm">Not abandonment. Self-regulation. Say: &quot;I need 2 minutes. I&apos;ll be right back.&quot; Then go. Bathroom, outside, another room. Physical distance creates neurological space. Your children are safe alone for 2 minutes. You are not safe staying in a room where you&apos;re about to explode.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">2. Cold water — immediately</p>
              <p className="text-sm">Run cold water on your wrists, splash your face, hold ice. This activates the mammalian dive reflex and drops your heart rate within 30 seconds. It works when nothing cognitive can. Your body responds to cold faster than your brain can respond to logic.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">3. Discharge the energy physically</p>
              <p className="text-sm">Rage is energy with nowhere to go. Give it somewhere: stomp your feet, push against a wall, squeeze a towel, clench and release your fists. The energy needs to move THROUGH your body — suppressing it just delays the explosion.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">4. Drop your voice, not raise it</p>
              <p className="text-sm">Counterintuitive but neurologically effective: whisper. Speaking in a whisper forces your nervous system to de-escalate because whispering requires parasympathetic engagement. You physiologically cannot whisper from full fight-mode.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">5. Name it out loud</p>
              <p className="text-sm">&quot;I am very angry right now.&quot; Naming activates the prefrontal cortex, which begins to regulate the amygdala. It&apos;s called &quot;name it to tame it&quot; and it&apos;s backed by neuroimaging research — labelling an emotion literally reduces its intensity in the brain.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">After the Explosion: Repair</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            You exploded. It happened. The guilt and shame are descending. Before they paralyse you, do this:
          </p>
          <div className="space-y-3">
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Wait until your heart rate is below 100</p>
              <p className="text-sm">You cannot repair while still activated. Give yourself 5-15 minutes. Drink water. Breathe. You&apos;re not ignoring your child — you&apos;re making yourself safe to approach them.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Go to your child. Get low. Be specific.</p>
              <p className="text-sm">&quot;I&apos;m sorry I yelled. That wasn&apos;t okay. You didn&apos;t do anything to deserve that. I was feeling overwhelmed and I handled it badly. I love you and I&apos;m working on it.&quot; This is the repair. The cycle breaks here — not in prevention, but in this moment.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Don&apos;t over-explain or burden them</p>
              <p className="text-sm">Children don&apos;t need to understand your nervous system. They need to hear: I&apos;m sorry. It wasn&apos;t your fault. I love you. I&apos;m working on it. That&apos;s enough. The explanation is for your therapist, not your 5-year-old.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Then — and this matters — forgive yourself</p>
              <p className="text-sm">Not dismiss. Not excuse. Forgive. &quot;I made a mistake. I repaired it. I am learning. I am not my worst moment.&quot; Shame will not make you a better parent. It will deplete you further, making the next explosion more likely.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">The Long Game: Preventing the Build-Up</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            In-the-moment strategies are triage. They don&apos;t fix the underlying cause — which is a nervous system that&apos;s chronically running at capacity with no margin. The real work is creating conditions where rage doesn&apos;t build to explosion in the first place.
          </p>
          <div className="space-y-3">
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Track your pattern</p>
              <p className="text-sm">For one week, note when rage hits: time of day, what happened in the 2 hours before, your physical state (hungry? tired? touched out?), where you are in your cycle. You will see a pattern. That pattern is your intervention point.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Reduce the input BEFORE you hit capacity</p>
              <p className="text-sm">If rage always comes at 5pm, the intervention isn&apos;t at 5pm — it&apos;s at 3pm. What can you reduce between 3-5? Screen time for kids (reduces noise). Earbuds with nothing playing (reduces sensory input). Simpler dinner plan (reduces decisions). You&apos;re lowering the load so the cup doesn&apos;t overflow.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Meet your own basic needs first</p>
              <p className="text-sm">Eat before you&apos;re starving. Drink water. Sit down for 5 minutes mid-afternoon. Pee when you need to, not 3 hours later. These aren&apos;t luxuries. They are the biological floor below which regulation becomes impossible.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Build micro-regulation throughout the day</p>
              <p className="text-sm">Don&apos;t wait until you&apos;re at 9/10 to regulate. Build small resets into the day: 5 long exhales at every nappy change. 30 seconds of cold water on wrists after lunch. One song with headphones during the school run. You&apos;re making small withdrawals from the stress account so it never overflows.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Name the resentment underneath</p>
              <p className="text-sm">If you peel back the rage, what&apos;s under it? Usually: feeling unseen, unsupported, trapped, or powerless. Those are structural problems with structural solutions — conversations to have, boundaries to set, help to ask for. The rage is the alarm. The resentment is the fire.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">The Hormonal Rage No One Warns You About</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            If your rage appeared or dramatically worsened at specific life stages — postpartum, premenstrually, or in your late 30s-40s — it may have a hormonal component that isn&apos;t being addressed.
          </p>
          <ul className="space-y-2 ml-4">
            <li>&bull; <strong>Postpartum rage</strong> is a recognised manifestation of postpartum mood disorders. It&apos;s driven by the same hormonal upheaval as postpartum depression but expresses as anger rather than sadness. It&apos;s severely underdiagnosed because screening tools ask about crying, not fury.</li>
            <li>&bull; <strong>Premenstrual rage</strong> (especially with PMDD) occurs when the luteal-phase hormone drop disrupts serotonin and emotional regulation. If your rage clusters in the week before your period, this is likely a factor.</li>
            <li>&bull; <strong>Perimenopausal rage</strong> appears in the late 30s-40s as estrogen fluctuates. Many women say: &quot;I never had a temper before. Now I want to throw things.&quot; This is neurochemical, not character.</li>
          </ul>
          <p className="mt-4">
            If your rage has a hormonal pattern, addressing the hormonal component (through medical support) alongside nervous system strategies will be significantly more effective than either alone. This is a conversation to have with a healthcare provider who understands reproductive psychiatry.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">When to Seek Professional Support</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>Consider reaching out to a professional if:</p>
          <ul className="space-y-2 ml-4">
            <li>&bull; You&apos;re afraid of what you might do when you rage</li>
            <li>&bull; The rage is escalating in frequency or intensity</li>
            <li>&bull; You&apos;ve hurt or come close to hurting your child physically</li>
            <li>&bull; The strategies in this guide aren&apos;t creating enough space</li>
            <li>&bull; You suspect a hormonal component that needs medical attention</li>
            <li>&bull; The rage connects to your own childhood experiences of anger or abuse</li>
            <li>&bull; You&apos;re using substances to manage the rage or its aftermath</li>
          </ul>
          <p className="mt-4">
            Say this to a provider: &quot;I&apos;m experiencing intense rage that feels disproportionate and out of my control. I want help understanding what&apos;s driving it and building strategies to manage it. I&apos;m also concerned about a possible hormonal component.&quot;
          </p>
          <p>
            Look for: a therapist who understands maternal mental health, nervous system regulation, and doesn&apos;t pathologise mothers for being angry. Anger is not a disorder. Unmanageable anger is a signal that something needs attention.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">What Your Children Actually Need to Know</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Your children know you get angry. They&apos;re not stupid and they&apos;re not fragile. What matters isn&apos;t whether they see your anger. It&apos;s what they learn from watching you navigate it.
          </p>
          <p>
            If you explode and never repair — they learn: adults are unpredictable and unsafe. My feelings don&apos;t matter. I must have caused this.
          </p>
          <p>
            If you explode, repair, and show them what you&apos;re doing to manage it — they learn: even big emotions pass. Adults take responsibility. Relationships survive conflict. I am safe even when things go wrong. It&apos;s okay to struggle and ask for help.
          </p>
          <p>
            You are not damaging your children by being imperfect. You are showing them how a human being manages a hard thing — with honesty, with repair, and with the courage to keep trying.
          </p>
          <div className="bg-primary/5 rounded-xl p-5 border border-primary/10 mt-4">
            <p className="italic text-foreground/90">
              &quot;I am not my rage. My rage is a signal — of depletion, of overload, of needs unmet for too long. I listen to the signal. I address what&apos;s underneath. I repair when I fail. And I refuse to let shame stop me from getting the support I need.&quot;
            </p>
          </div>
        </div>
      </section>

      <p className="text-sm text-muted-foreground/70 text-center leading-relaxed">
        This guide is for educational and self-reflection purposes only. It is not a substitute for professional mental health care. If you are in crisis or feel you may harm yourself or your children, contact 988 (Suicide &amp; Crisis Lifeline) or your local emergency services immediately.
      </p>
    </div>
  )
}
