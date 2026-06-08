"use client"

import Link from "next/link"
import { Battery, ArrowLeft } from "lucide-react"

export default function BurnoutGuide() {
  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div>
        <Link href="/dashboard/guides" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Guides
        </Link>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
            <Battery className="w-5 h-5 text-orange-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-medium text-foreground">Burnout &amp; Recovery</h1>
        </div>
        <p className="text-muted-foreground">
          When depletion becomes burnout. What recovery actually requires — because it&apos;s not a weekend off.
        </p>
      </div>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Burnout Is Not Just Being Tired</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Tiredness responds to rest. You sleep, you feel better. Burnout doesn&apos;t work that way. You can sleep 10 hours and wake up feeling nothing. You can have a day off and feel emptier than before. The exhaustion isn&apos;t in your muscles — it&apos;s in your nervous system, your motivation, your capacity to care.
          </p>
          <p>
            Burnout is what happens when you&apos;ve been outputting more than you&apos;re inputting for so long that your system has gone into conservation mode. Your brain has concluded: &quot;Resources are not coming. Reduce all non-essential function to preserve survival.&quot; That&apos;s why you feel flat, empty, disconnected, unable to care about things you used to love.
          </p>
          <p>
            This isn&apos;t laziness or ingratitude or depression (though they can overlap). It&apos;s your nervous system&apos;s rational response to chronic resource deficit. You&apos;re not broken. You&apos;re depleted. And depletion has a different treatment than &quot;try harder.&quot;
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">The Three Dimensions of Burnout</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Research identifies three core dimensions. You may experience one, two, or all three:
          </p>
          <div className="space-y-3">
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Exhaustion (physical and emotional)</p>
              <p className="text-sm">Not just tired — emptied. You have nothing left to give. Rest doesn&apos;t restore. You wake up as depleted as you went to bed. Your body feels heavy. Your emotions are flat or absent. The tank isn&apos;t just low — it feels like it has a hole in the bottom.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Depersonalisation (emotional distance)</p>
              <p className="text-sm">You feel disconnected from your children, your partner, your life. You&apos;re going through the motions but you&apos;re not present. You might feel numb, robotic, or like you&apos;re watching yourself from outside. You love your family but you can&apos;t feel it. That absence of feeling is terrifying — and it&apos;s a burnout symptom, not a character flaw.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Reduced efficacy (nothing works)</p>
              <p className="text-sm">Everything you try feels pointless. You can&apos;t see the impact of your efforts. The house gets dirty again immediately. The kids misbehave despite your best strategies. You start to wonder: &quot;What&apos;s the point?&quot; This isn&apos;t nihilism — it&apos;s your brain conserving energy by reducing engagement with tasks that feel futile.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">How You Got Here (It Wasn&apos;t One Thing)</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Burnout doesn&apos;t happen because of one bad week. It builds over months or years through a predictable sequence:
          </p>
          <ul className="space-y-2 ml-4">
            <li>&bull; <strong>Phase 1: The honeymoon</strong> — High energy, high commitment. You&apos;re managing. Maybe even thriving. You take on more because you can.</li>
            <li>&bull; <strong>Phase 2: Stress onset</strong> — Cracks appear. Sleep suffers. Patience thins. But you push through because &quot;it&apos;s just a phase.&quot;</li>
            <li>&bull; <strong>Phase 3: Chronic stress</strong> — This is your new normal. Always tired, always behind, always snapping. You compensate with caffeine, willpower, or adrenaline. You tell yourself this is what motherhood is.</li>
            <li>&bull; <strong>Phase 4: Burnout</strong> — The compensation strategies stop working. Everything feels impossible. Joy disappears. You function on autopilot or not at all. This is where you are when you read this.</li>
            <li>&bull; <strong>Phase 5: Collapse</strong> — If phase 4 isn&apos;t addressed, the system crashes entirely. Physical illness, mental health crisis, relationship breakdown, or complete inability to function.</li>
          </ul>
          <p className="mt-4">
            Most mothers live in phases 3-4 for years because the culture normalises it. &quot;This is just how motherhood is.&quot; &quot;You&apos;ll sleep when they&apos;re older.&quot; &quot;Everyone&apos;s tired.&quot; These messages prevent intervention by reframing pathology as normal.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Why a Weekend Off Won&apos;t Fix It</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            A weekend away, a spa day, a &quot;self-care&quot; morning — these are maintenance. They address surface-level fatigue. Burnout lives deeper. It&apos;s not a battery that recharges with one good night. It&apos;s a system that&apos;s been running in deficit for so long that the infrastructure itself has degraded.
          </p>
          <p>
            Think of it like a building. Surface fatigue is dirt on the windows — clean them and you can see again. Burnout is cracks in the foundation — you can&apos;t fix it by cleaning the windows. You need to address the structure underneath.
          </p>
          <p>
            This is why people say &quot;I went on holiday and felt WORSE afterward.&quot; The holiday highlighted the contrast between rested and depleted — and then you went back to the same conditions that caused the burnout. Nothing structural changed. The burnout was waiting for you when you returned.
          </p>
          <p>
            Real recovery requires structural change. Not a break FROM the life — a change IN the life.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">What Recovery Actually Looks Like</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Burnout recovery is measured in months, not days. It requires intervention at multiple levels simultaneously:
          </p>
          <div className="space-y-3">
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">1. Reduce the output (non-negotiable)</p>
              <p className="text-sm">Something has to come off your plate. Not temporarily — structurally. Delegate tasks. Lower standards permanently (not just until you &quot;feel better&quot;). Say no to new commitments. Withdraw from obligations that aren&apos;t essential. You cannot recover while maintaining the load that caused the burnout.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">2. Increase the input</p>
              <p className="text-sm">Sleep more (even if imperfect sleep). Eat consistently (not well — consistently). Hydrate. Get outside for 10 minutes. These aren&apos;t transformative on their own — but without them, nothing else works. You can&apos;t rebuild on a foundation of biological deficit.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">3. Rebuild one thing at a time</p>
              <p className="text-sm">Not everything at once. Pick the one area that would make the biggest difference and address it. Maybe it&apos;s sleep. Maybe it&apos;s the relationship dynamic. Maybe it&apos;s getting a proper evaluation for something you&apos;ve been pushing through. One thing. Then the next.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">4. Address the resentment</p>
              <p className="text-sm">Burnout almost always coexists with resentment — toward a partner who doesn&apos;t carry equal load, toward a culture that demands impossible standards, toward yourself for &quot;letting it get this bad.&quot; The resentment is valid. And it needs somewhere to go — a conversation, a boundary, a therapist. Swallowing it feeds the burnout.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">5. Accept the timeline</p>
              <p className="text-sm">You will not feel better in a week. Research on burnout recovery suggests 3-6 months minimum for meaningful improvement — longer if the circumstances don&apos;t change. This isn&apos;t discouraging. It&apos;s permission to stop expecting instant results and start measuring progress in gentler units.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Why You Keep Crashing</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            If you&apos;ve experienced burnout before — recovered, felt better, then crashed again — the pattern is usually one of these:
          </p>
          <ul className="space-y-2 ml-4">
            <li>&bull; <strong>You rested but didn&apos;t change the structure.</strong> You recovered enough to return to the same conditions. The conditions caused the burnout. The burnout returned.</li>
            <li>&bull; <strong>You recovered to 60% and called it &quot;fine.&quot;</strong> Your new normal became chronic depletion. You never fully recovered — you just reached a slightly higher floor. The next stressor tipped you back.</li>
            <li>&bull; <strong>You rebuilt at the same pace you burned out at.</strong> Once you felt better, you took everything back on — because the demands hadn&apos;t changed and someone had to do it. You ran the same program that crashed the system last time.</li>
          </ul>
          <p className="mt-4">
            Breaking the cycle requires changing the equation permanently — not temporarily recovering enough to run the same unsustainable system again.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">The Hardest Part: Asking for Help</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Burnout recovery almost always requires help from others. And asking for help when you&apos;re burned out is its own special torture — because:
          </p>
          <ul className="space-y-2 ml-4">
            <li>&bull; You feel like you &quot;should&quot; be able to handle this alone</li>
            <li>&bull; Asking feels like admitting failure</li>
            <li>&bull; You don&apos;t trust anyone to do things to your standard (which may be part of the problem)</li>
            <li>&bull; You&apos;ve asked before and been let down</li>
            <li>&bull; You don&apos;t even know what to ask for because you can&apos;t think clearly enough to identify what you need</li>
          </ul>
          <p className="mt-4">
            If you can&apos;t identify what you need, try this sentence with your partner, a friend, or a professional: &quot;I&apos;m burned out. I don&apos;t know what I need but I know I can&apos;t continue like this. Can you help me figure out what to change?&quot;
          </p>
          <p>
            You don&apos;t have to have the solution before you ask for help. Sometimes the help IS figuring out what you need.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Burnout vs. Depression: When to Seek Clinical Support</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Burnout and depression share many symptoms: flatness, exhaustion, loss of interest, cognitive impairment, withdrawal. They can also coexist. The distinction isn&apos;t always clear from the inside, and you don&apos;t need to diagnose yourself to seek support.
          </p>
          <p>Consider professional support if:</p>
          <ul className="space-y-2 ml-4">
            <li>&bull; You&apos;ve been in this state for more than 4 weeks with no improvement</li>
            <li>&bull; You feel hopeless — not just tired, but like nothing will ever change</li>
            <li>&bull; You&apos;ve lost interest in EVERYTHING, not just the demands (including things you used to love)</li>
            <li>&bull; You&apos;re having thoughts of escape that go beyond fantasy (&quot;I wish I could disappear&quot; → &quot;they&apos;d be better off without me&quot;)</li>
            <li>&bull; You&apos;re using alcohol, food, or other substances to cope with the emptiness</li>
            <li>&bull; Rest and structural changes haven&apos;t moved the needle at all</li>
          </ul>
          <p className="mt-4">
            Say to a provider: &quot;I think I&apos;m burned out, but I want to explore whether depression might also be a factor. I&apos;ve been feeling [specific symptoms] for [duration] and rest isn&apos;t helping.&quot;
          </p>
          <p>
            Both burnout and depression deserve support. You don&apos;t need a definitive label to ask for help. You just need to know that what you&apos;re experiencing isn&apos;t sustainable and you can&apos;t fix it alone.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Permission to Recover Slowly</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            You didn&apos;t get here overnight. You won&apos;t get out overnight. Recovery isn&apos;t linear — you&apos;ll have better days and worse days. The better days don&apos;t mean you&apos;re fixed. The worse days don&apos;t mean you&apos;re failing.
          </p>
          <p>
            What &quot;recovering&quot; looks like (it&apos;s quieter than you think):
          </p>
          <ul className="space-y-2 ml-4">
            <li>&bull; One day you notice you laughed and it was genuine</li>
            <li>&bull; You have a hard day but it doesn&apos;t send you into a week-long spiral</li>
            <li>&bull; You feel irritated by something (which means you&apos;re feeling again)</li>
            <li>&bull; You want something — a book, a meal, a walk — that isn&apos;t just survival</li>
            <li>&bull; You have energy left at the end of the day (even a tiny amount)</li>
          </ul>
          <p className="mt-4">
            These are small signs. They&apos;re what recovery actually looks like before it looks like &quot;I feel great.&quot; Notice them. They matter.
          </p>
          <div className="bg-primary/5 rounded-xl p-5 border border-primary/10 mt-4">
            <p className="italic text-foreground/90">
              &quot;I did not get burned out because I am weak. I got burned out because I was strong for too long without enough support. Recovery is not a luxury. It is the only thing that allows me to continue. I deserve the same compassion I give everyone else.&quot;
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
