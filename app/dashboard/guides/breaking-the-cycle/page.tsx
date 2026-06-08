"use client"

import Link from "next/link"
import { RefreshCw, ArrowLeft } from "lucide-react"

export default function BreakingTheCycleGuide() {
  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div>
        <Link href="/dashboard/guides" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Guides
        </Link>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
            <RefreshCw className="w-5 h-5 text-emerald-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-medium text-foreground">Breaking the Cycle</h1>
        </div>
        <p className="text-muted-foreground">
          Intergenerational patterns, your parents&apos; voice in your head, and the brave, grieving work of parenting differently than you were parented.
        </p>
      </div>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">The Shock of Hearing Their Voice Come Out of Your Mouth</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            You swore you wouldn&apos;t do this. You spent years understanding what your parents did wrong, how it affected you, how you would be different. And then — in a moment of exhaustion, of overwhelm, of pure depletion — you hear it. Their tone. Their words. Their approach. Coming out of your mouth, directed at your child.
          </p>
          <p>
            The shame that follows is enormous. It feels like proof that you are them. That the cycle is inevitable. That everything you&apos;ve worked toward was an illusion.
          </p>
          <p>
            Here is what&apos;s actually happening: under stress, your brain defaults to its earliest programming. The patterns you absorbed in childhood are stored in implicit memory — the body&apos;s autopilot. When your executive function is offline (tired, triggered, overwhelmed), autopilot takes over. This isn&apos;t destiny. It&apos;s neuroscience. And what can be understood can be changed.
          </p>
          <p>
            The fact that you noticed — that you felt the horror of recognition — is itself the break in the cycle. Your parents didn&apos;t notice. They didn&apos;t question. You do. That awareness, painful as it is, is the foundation everything else is built on.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Understanding Intergenerational Patterns</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Patterns pass between generations not because parents are bad people, but because unprocessed pain doesn&apos;t stay contained. It leaks — into parenting, into relationships, into the atmosphere of a home. Your parents inherited their patterns from their parents. And so on, backwards.
          </p>
          <p>
            Common intergenerational patterns:
          </p>
          <div className="space-y-3">
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Emotional unavailability</p>
              <p className="text-sm">Parents who couldn&apos;t access their own emotions couldn&apos;t mirror yours. You may struggle to name feelings, to comfort without fixing, or to sit with your child&apos;s distress without shutting it down.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Rage and volatility</p>
              <p className="text-sm">If anger was the only &quot;allowed&quot; emotion in your home, you may find that frustration bypasses all other responses and goes straight to intensity. Or you may overcorrect — suppressing all anger until it explodes.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Perfectionism and conditional love</p>
              <p className="text-sm">If love was performance-based in your home, you may catch yourself praising outcomes over effort, or feeling anxious when your child is &quot;average.&quot; The drive to make them exceptional might be your internalised need to earn love.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Parentification</p>
              <p className="text-sm">If you were responsible for your parents&apos; emotions as a child, you may either lean too heavily on your child for emotional support, or go to the other extreme — never letting them see you struggle at all.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">The Grief of What You Didn&apos;t Get</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            One of the most painful aspects of conscious parenting is this: in learning what children actually need, you come face-to-face with what you didn&apos;t receive. Every book about secure attachment, every post about gentle parenting, every insight about what &quot;good enough&quot; parenting looks like — each one illuminates a gap in your own childhood.
          </p>
          <p>
            You might feel grief. You might feel rage. You might feel a desperate, aching sadness for the child you were — who didn&apos;t get gentleness, patience, attunement, safety. Who wasn&apos;t soothed. Who wasn&apos;t seen.
          </p>
          <p>
            This grief is real and it deserves space. Some mothers push it away because it feels self-indulgent — &quot;I had a roof over my head, it wasn&apos;t that bad.&quot; But emotional neglect is neglect. Growing up in a home without warmth affects the developing brain as profoundly as more visible forms of harm.
          </p>
          <p>
            You are allowed to grieve what you didn&apos;t get. In fact, the grief is part of the healing. You cannot truly give your child what you never received until you&apos;ve acknowledged the loss.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Parenting Without a Blueprint</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            When you decide to parent differently than you were parented, you lose your template. Other people can draw on positive memories — &quot;my mum always did this when I was upset&quot; — and replicate them. You&apos;re building from scratch. Every response has to be consciously chosen because your autopilot leads somewhere you don&apos;t want to go.
          </p>
          <p>
            This is exhausting. Conscious parenting requires exponentially more energy than automatic parenting. You&apos;re running manual override all day, every day. No wonder you&apos;re tired. No wonder you slip. No wonder it feels harder for you than it seems for other parents — because it IS harder. You&apos;re doing the work of building new neural pathways while simultaneously parenting.
          </p>
          <p>
            What helps:
          </p>
          <ul className="space-y-2 ml-4">
            <li>&bull; Collect &quot;new templates&quot; wherever you find them — other parents, books, therapists, even fictional characters who model what you want</li>
            <li>&bull; Practice specific responses until they become more automatic: &quot;When my child cries, I move toward them, not away&quot;</li>
            <li>&bull; Accept that some days, manual override will fail. The measure isn&apos;t perfection — it&apos;s the repair afterward</li>
            <li>&bull; Celebrate the moments you DO respond differently. Each one is literally rewiring your brain.</li>
          </ul>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">The Overcorrection Trap</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Many cycle-breakers swing to the opposite extreme. If your parents were harsh, you become permissive. If they were cold, you become enmeshed. If they were controlling, you avoid all limits. The overcorrection feels like safety — but it creates its own problems.
          </p>
          <p>
            A child who never hears &quot;no&quot; because their parent fears being authoritarian becomes anxious without boundaries. A child whose parent never shows frustration because they fear being like THEIR raging parent doesn&apos;t learn that anger is a normal human emotion. The goal isn&apos;t the opposite of what your parents did. It&apos;s the middle path.
          </p>
          <p>
            Questions that help find the middle:
          </p>
          <ul className="space-y-2 ml-4">
            <li>&bull; &quot;Am I choosing this because it&apos;s what my child needs, or because it&apos;s the opposite of what I experienced?&quot;</li>
            <li>&bull; &quot;What is my child actually communicating they need right now?&quot;</li>
            <li>&bull; &quot;Can I hold a boundary with warmth, rather than either rigidity or collapse?&quot;</li>
            <li>&bull; &quot;Would a healthy parent in a calm moment do this? Or am I reacting to my childhood rather than responding to my child?&quot;</li>
          </ul>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Repair as Cycle-Breaking</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Here is the most liberating truth in cycle-breaking: the goal is not to never make a mistake. It&apos;s to repair when you do. Your parents didn&apos;t repair. They didn&apos;t acknowledge harm. They didn&apos;t say &quot;I&apos;m sorry, that wasn&apos;t okay. You didn&apos;t deserve that.&quot; THAT is what perpetuated the cycle — not the mistakes, but the silence after them.
          </p>
          <p>
            Repair looks like:
          </p>
          <div className="space-y-3">
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Acknowledge what happened</p>
              <p className="text-sm">&quot;I shouted at you earlier. That was too much. You didn&apos;t deserve to be spoken to like that.&quot;</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Take responsibility without excuses</p>
              <p className="text-sm">&quot;I was frustrated, but that&apos;s not your problem. It&apos;s my job to handle my feelings without putting them on you.&quot;</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Reconnect</p>
              <p className="text-sm">&quot;Can we start again? I love you and I want to do better.&quot;</p>
            </div>
          </div>
          <p className="mt-4">
            Repair teaches your child something revolutionary: that love doesn&apos;t require perfection. That relationships can survive rupture. That adults can be wrong AND take responsibility. These are lessons your child will carry into every relationship they ever have.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">When to Seek Professional Help</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Breaking intergenerational patterns is some of the deepest psychological work a person can do. Consider professional support if:
          </p>
          <ul className="space-y-2 ml-4">
            <li>&bull; You&apos;re triggered frequently and intensely by your child&apos;s behaviour in ways that feel disproportionate</li>
            <li>&bull; You find yourself repeating patterns you swore you wouldn&apos;t, and awareness alone isn&apos;t changing the behaviour</li>
            <li>&bull; Grief about your own childhood is overwhelming or consuming</li>
            <li>&bull; You have unresolved trauma from your upbringing that surfaces in your parenting</li>
            <li>&bull; Your relationship with your parents is actively causing distress in your current life</li>
            <li>&bull; You feel stuck between cutting off your parents and maintaining a relationship that harms you</li>
          </ul>
          <p className="mt-4">
            Look for: therapists who specialise in attachment, intergenerational trauma, or family-of-origin work. EMDR, IFS (Internal Family Systems), and psychodynamic approaches can be particularly helpful for this work.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">You Are the One Who Changes Everything</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            You are the person in your lineage who said: this stops here. Not because it was easy. Not because you had support or resources or a blueprint. But because you decided that your child would know something different.
          </p>
          <p>
            This work is invisible. Nobody gives you an award for not repeating what was done to you. Nobody sees the thousand daily moments where you choose differently — where you pause instead of react, where you soften instead of harden, where you say &quot;I&apos;m sorry&quot; instead of pretending it didn&apos;t happen. But your child knows. Their nervous system knows. And their children will know.
          </p>
          <p>
            The cycle doesn&apos;t break perfectly or completely in one generation. It loosens. It shifts. You give your child a better starting point than you had — and they&apos;ll do the same for theirs. That is enough. That is extraordinary.
          </p>
          <div className="bg-primary/5 rounded-xl p-5 border border-primary/10 mt-4">
            <p className="italic text-foreground/90">
              &quot;I am not my parents. I am not destined to repeat what was done to me. Every repair I make, every conscious choice, every time I pause before reacting — I am rewriting the story. The cycle does not end perfectly. It ends with someone brave enough to do the work. I am that person.&quot;
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
