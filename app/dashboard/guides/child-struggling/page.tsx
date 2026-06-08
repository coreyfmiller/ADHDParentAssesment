"use client"

import Link from "next/link"
import { Heart, ArrowLeft } from "lucide-react"

export default function ChildStrugglingGuide() {
  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div>
        <Link href="/dashboard/guides" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Guides
        </Link>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center">
            <Heart className="w-5 h-5 text-rose-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-medium text-foreground">When Your Child Is Struggling</h1>
        </div>
        <p className="text-muted-foreground">
          The unique pain of watching your child in difficulty — and the slow work of supporting them without losing yourself.
        </p>
      </div>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">The Pain of Watching</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            There is a specific kind of suffering that belongs only to parents: watching your child in pain and being unable to make it stop. It&apos;s a helplessness that lives in your body — a tightness in the chest, a constant low-level dread, a scanning alertness that never fully switches off.
          </p>
          <p>
            Maybe they&apos;re being excluded at school. Maybe they&apos;re drowning academically. Maybe their emotions are so big and so frequent that every day feels like navigating a storm. Maybe they&apos;re withdrawing and you can feel them slipping away from you but you don&apos;t know how to reach them.
          </p>
          <p>
            Whatever the struggle is, here&apos;s what nobody tells you: your child&apos;s pain activates the same brain regions as your own physical pain. You are not being dramatic. You are not overreacting. Your nervous system is responding to a genuine threat — because to your brain, your child&apos;s suffering IS an emergency. The ache you feel is neurobiologically real.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Big Emotions: When Your Child&apos;s Feelings Overwhelm Everything</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Some children feel everything at maximum volume. Their anger is explosive. Their sadness is all-consuming. Their frustration triggers reactions that look — from the outside — like &quot;bad behaviour.&quot; But from the inside, they are drowning in feelings their brain doesn&apos;t yet have the architecture to regulate.
          </p>
          <p>
            Living with a child whose emotions are intense is its own kind of exhausting. You walk on eggshells. You brace for the next meltdown. You feel like a failure because nothing you do seems to help. And you might carry a secret fear: is this my fault? Did I cause this?
          </p>
          <p>
            What the research shows: emotional intensity in children is primarily temperamental (they came this way) and neurological (their regulation circuits are still developing). It is not caused by bad parenting. It IS made harder by parental burnout — because a depleted parent has fewer resources to co-regulate a dysregulated child. This isn&apos;t blame. It&apos;s information about where to direct resources.
          </p>
          <p>
            What helps:
          </p>
          <ul className="space-y-2 ml-4">
            <li>&bull; Regulate yourself first (even 30 seconds of slow breathing) — you cannot calm a child from your own dysregulation</li>
            <li>&bull; Name their emotion without fixing it: &quot;You&apos;re so frustrated right now&quot;</li>
            <li>&bull; Reduce demands during emotional storms — this is not the teaching moment</li>
            <li>&bull; Wait for calm before discussing what happened — the learning brain isn&apos;t online during a meltdown</li>
          </ul>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">School Difficulties</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            When your child is struggling at school, the fear is layered: fear for their academic future, fear about what it means about their abilities, fear of the phone ringing with another incident report. And underneath all of that — the fear that you should have caught this earlier, done more, been more.
          </p>
          <p>
            School struggles can look like:
          </p>
          <ul className="space-y-2 ml-4">
            <li>&bull; Academic difficulties (reading, writing, maths, attention, organisation)</li>
            <li>&bull; Behavioural challenges (disrupting class, defiance, inability to follow instructions)</li>
            <li>&bull; Emotional difficulties (anxiety about attending, crying at school, refusal)</li>
            <li>&bull; Social exclusion (no friends, being bullied, difficulty reading social cues)</li>
          </ul>
          <p>
            What to remember: the education system was designed for a narrow range of brain types. A child who struggles in that system is not broken — they may simply have a brain that needs different conditions to learn. This doesn&apos;t mean you ignore it. It means you approach it from curiosity rather than panic.
          </p>
          <p>
            Practical steps:
          </p>
          <ul className="space-y-2 ml-4">
            <li>&bull; Request a meeting with their teacher — come with observations, not apologies</li>
            <li>&bull; Ask specifically: &quot;What are you seeing? What do you recommend we investigate?&quot;</li>
            <li>&bull; Keep records of what you&apos;re noticing at home — patterns, triggers, what helps</li>
            <li>&bull; Consider whether an assessment might give you useful information (educational, psychological, developmental)</li>
          </ul>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Social Struggles: When They Don&apos;t Fit In</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Watching your child be lonely is one of the deepest pains in parenting. Every birthday party they&apos;re not invited to. Every lunchtime spent alone. Every time they tell you — or worse, stop telling you — that no one played with them today.
          </p>
          <p>
            It activates your own social wounds too. Every memory of your own exclusion, your own loneliness, comes flooding back. You feel it for them AND through them. The pain doubles.
          </p>
          <p>
            What helps children socially is not what we instinctively do. We want to fix it — arrange playdates, coach them, talk to other parents. Sometimes that helps. But what helps most is:
          </p>
          <ul className="space-y-2 ml-4">
            <li>&bull; Being the safe landing pad — the person who listens without panicking</li>
            <li>&bull; Validating their pain without catastrophising: &quot;That sounds really lonely. I&apos;m sorry.&quot;</li>
            <li>&bull; Helping them find even one connection — one friend is enough for wellbeing</li>
            <li>&bull; Looking for social contexts outside school where they might find their people (interest-based groups, clubs, activities)</li>
            <li>&bull; Not forcing social interaction when they need to withdraw — some children need more alone time and that&apos;s okay</li>
          </ul>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">The Grief of Not Being Able to Fix It</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Here is the hardest truth of parenting a struggling child: you cannot fix it for them. You can support, advocate, scaffold, resource, love — but you cannot climb inside their brain and make it easier. You cannot make other children be kind. You cannot make school fit their needs. You cannot take their anxiety into your own body (though god knows you&apos;ve tried).
          </p>
          <p>
            This powerlessness is its own grief. It&apos;s the loss of the fantasy that good parenting can protect your child from all suffering. It can&apos;t. And sitting with that reality without collapsing into despair or hypercontrol is one of the most psychologically sophisticated things a parent can do.
          </p>
          <p>
            What to do with the powerlessness:
          </p>
          <ul className="space-y-2 ml-4">
            <li>&bull; Name it: &quot;I can&apos;t fix this and that is painful&quot;</li>
            <li>&bull; Ask yourself: &quot;What CAN I do?&quot; (usually: be present, advocate, resource)</li>
            <li>&bull; Separate their feelings from your feelings — their pain is theirs to process. Your pain about their pain is yours.</li>
            <li>&bull; Find a place to put YOUR distress that isn&apos;t on your child — a friend, a therapist, a journal</li>
            <li>&bull; Remember: your child needs a parent who can tolerate their struggle, not one who falls apart alongside them</li>
          </ul>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Managing Your Own Anxiety</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            When your child is struggling, your brain goes into threat-scanning mode. You watch them constantly for signs of distress. You replay their day looking for what went wrong. You research at 2am. You catastrophise about their future. This vigilance feels like love — and it is — but it also depletes you and, paradoxically, can increase their anxiety.
          </p>
          <p>
            Children read their parents&apos; nervous systems. If you are in constant alarm about their wellbeing, they receive the message: &quot;Something is very wrong with me.&quot; Your anxiety becomes their anxiety. This isn&apos;t blame — it&apos;s biology. And it&apos;s the reason managing your own state is not selfish. It&apos;s strategic.
          </p>
          <p>
            Practices for the vigilant parent:
          </p>
          <ul className="space-y-2 ml-4">
            <li>&bull; Set &quot;worry hours&quot; — a contained time when you allow yourself to research, plan, and problem-solve. Outside those hours, redirect.</li>
            <li>&bull; Ask: &quot;Is this an emergency or is this my fear of an emergency?&quot;</li>
            <li>&bull; Track what&apos;s going WELL alongside what&apos;s difficult — your brain will filter for threat unless you intentionally balance it</li>
            <li>&bull; Find other parents in similar situations — normalisation reduces isolation and panic</li>
            <li>&bull; Remember: children are resilient WITH support. Your awareness of their struggle IS the support. You don&apos;t also need to have solved it.</li>
          </ul>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">When to Seek Professional Help (For Them)</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Not every struggle requires professional intervention. Children go through hard phases. But some signs suggest that additional support would be helpful:
          </p>
          <ul className="space-y-2 ml-4">
            <li>&bull; The difficulty is persistent (more than a few weeks) and not improving with your support</li>
            <li>&bull; Their functioning is impaired — school attendance, friendships, daily activities are significantly affected</li>
            <li>&bull; They&apos;re expressing hopelessness, worthlessness, or self-harm thoughts</li>
            <li>&bull; Their behaviour has changed dramatically (sudden withdrawal, aggression, regression)</li>
            <li>&bull; YOU feel out of your depth — your instinct that something needs attention is valid data</li>
            <li>&bull; They&apos;re asking for help or expressing that they&apos;re struggling beyond what feels normal to them</li>
          </ul>
          <p className="mt-4">
            Consider: a child psychologist for emotional or behavioural concerns, an educational psychologist for learning difficulties, your GP/pediatrician as a starting point if you&apos;re unsure where to begin.
          </p>
          <p>
            Seeking help for your child is not evidence that you failed them. It&apos;s evidence that you&apos;re paying attention and responding to what they need.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">When to Seek Professional Help (For You)</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Parenting a struggling child is emotionally demanding in ways that can erode your own mental health gradually. Consider support for yourself if:
          </p>
          <ul className="space-y-2 ml-4">
            <li>&bull; You&apos;re experiencing persistent anxiety, dread, or hopelessness about your child&apos;s future</li>
            <li>&bull; Your sleep is significantly disrupted by worry</li>
            <li>&bull; You&apos;re losing your temper regularly and feeling unable to regulate yourself</li>
            <li>&bull; You feel isolated from other parents because your experience is so different</li>
            <li>&bull; You&apos;re grieving the child/family life you imagined and it&apos;s consuming you</li>
            <li>&bull; You&apos;re neglecting your own basic needs because all resources go toward your child</li>
          </ul>
          <p className="mt-4">
            You cannot pour from an empty vessel. Getting support for yourself is not taking resources away from your child — it&apos;s ensuring you can keep showing up.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">You Are Not Failing Them</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            A child who struggles is not evidence of a parent who failed. Some children face challenges that no amount of &quot;good parenting&quot; could have prevented. Some brains develop differently. Some environments are harsh in ways you couldn&apos;t control. Some pain is simply part of being human.
          </p>
          <p>
            What your child needs is not a parent who prevented all difficulty. They need a parent who stayed — who kept showing up, who kept trying to understand, who kept saying: &quot;I see you. I&apos;m here. We&apos;ll figure this out together.&quot;
          </p>
          <p>
            You are that parent. The fact that you&apos;re reading this — searching for ways to understand and help — is proof of that.
          </p>
          <div className="bg-primary/5 rounded-xl p-5 border border-primary/10 mt-4">
            <p className="italic text-foreground/90">
              &quot;I cannot take away my child&apos;s struggle. But I can be the person who stays steady while they move through it. My presence — imperfect, worried, sometimes at a loss — is still the most powerful thing I can offer them. I will keep showing up.&quot;
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
