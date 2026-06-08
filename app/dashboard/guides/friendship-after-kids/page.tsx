"use client"

import Link from "next/link"
import { Users, ArrowLeft } from "lucide-react"

export default function FriendshipAfterKidsGuide() {
  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div>
        <Link href="/dashboard/guides" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Guides
        </Link>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center">
            <Users className="w-5 h-5 text-teal-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-medium text-foreground">Friendship After Kids</h1>
        </div>
        <p className="text-muted-foreground">
          Why friendships faded, why loneliness hurts so much, and how to build connection when you have zero spare capacity.
        </p>
      </div>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">The Loneliness No One Warned You About</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            You are surrounded by people all day. Small people who need you constantly, who cling to your body, who never stop talking. And yet the loneliness is suffocating. Because the presence of dependents is not the same as the presence of peers. Being needed is not the same as being known.
          </p>
          <p>
            Maternal loneliness is one of the most under-discussed experiences of modern motherhood. Research shows that new mothers experience loneliness at rates comparable to elderly people in isolation — but without the social acknowledgment. Because how can you be lonely when you&apos;re never alone?
          </p>
          <p>
            If you feel isolated, unseen, disconnected from the women you used to be close to — this is not a personal failing. It&apos;s a structural problem. The conditions of modern motherhood (nuclear families, geographic mobility, the disappearance of community) create isolation by design. You are not bad at friendship. The infrastructure for friendship has collapsed around you.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Why Friendships Faded (It Wasn&apos;t Personal)</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            The friendships that dissolved after you had children didn&apos;t dissolve because of you — or because of them. They dissolved because the CONDITIONS that maintained them disappeared:
          </p>
          <ul className="space-y-2 ml-4">
            <li>&bull; <strong>Proximity:</strong> You used to see each other at work, at the gym, at social events. Now you&apos;re home. Friendships that ran on proximity faded when proximity vanished.</li>
            <li>&bull; <strong>Shared time:</strong> Friendships need time together. When your available time drops to near zero, maintenance becomes impossible.</li>
            <li>&bull; <strong>Energy:</strong> Even wanting to connect requires bandwidth. When you&apos;re depleted, the thought of making plans, arranging childcare, showing up presentable, and being &quot;on&quot; is exhausting before it even begins.</li>
            <li>&bull; <strong>Life stage divergence:</strong> Friends without children can&apos;t fully understand your new reality. Friends with older children have forgotten how consuming it is. The gap widens until the connection feels threadbare.</li>
          </ul>
          <p>
            Understanding that this is structural — not personal rejection or being &quot;bad at keeping friends&quot; — can ease some of the shame. You didn&apos;t fail at friendship. The context that made friendship easy disappeared.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">The Shape Loneliness Takes</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Loneliness in motherhood doesn&apos;t always look like sadness. It disguises itself:
          </p>
          <ul className="space-y-2 ml-4">
            <li>&bull; <strong>Scrolling:</strong> Hours on social media, watching other women&apos;s lives — not for information, but for the illusion of connection. The temporary feeling of being part of something without the vulnerability of real relationship.</li>
            <li>&bull; <strong>Over-giving to your children:</strong> Pouring all relational energy into your kids because they&apos;re the only relationship available. Making them your primary companion, which burdens them and leaves you still empty.</li>
            <li>&bull; <strong>Rage at your partner:</strong> When your partner is your only adult relationship, every unmet need concentrates there. The anger might actually be grief about the broader connections you&apos;ve lost.</li>
            <li>&bull; <strong>Nostalgia:</strong> Aching for the past — university friends, work friendships, the ease of connection before responsibilities consumed everything.</li>
            <li>&bull; <strong>Performing fine:</strong> &quot;I&apos;m just an introvert.&quot; &quot;I don&apos;t need a lot of people.&quot; Sometimes true. Sometimes a protective story over a wound.</li>
          </ul>
          <p>
            Humans are social animals. We are not designed to parent in isolation. The loneliness you feel is your nervous system registering the absence of community — a resource that throughout human history was always present for mothers. Its absence is not normal, even though it&apos;s common.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Maintaining Connection with Zero Capacity</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            &quot;Just reach out to people&quot; sounds simple. It isn&apos;t — not when you barely have energy to brush your teeth, let alone compose a text that doesn&apos;t sound desperate. Here are strategies calibrated for zero capacity:
          </p>
          <div className="space-y-3">
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">The react, don&apos;t compose, rule</p>
              <p className="text-sm">When you see a friend&apos;s post or message, react to it (a heart, a quick response) rather than trying to compose something original. Presence is connection. Perfection is not required.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Voice notes over texts</p>
              <p className="text-sm">Send a 30-second voice note while loading the dishwasher. It&apos;s lower effort than typing, feels more connected, and can be done while your hands are occupied with children. Tell friends you prefer voice notes — give them permission to be imperfect too.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Parallel existing</p>
              <p className="text-sm">Not every interaction needs to be a &quot;catch-up.&quot; Send a photo. Share a meme. Say &quot;thinking of you.&quot; These micro-connections maintain the thread without requiring energy you don&apos;t have.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">The standing invitation</p>
              <p className="text-sm">Instead of making individual plans (which require decision-making, scheduling, and commitment), create a standing thing: &quot;I walk at the park every Tuesday at 10am. Join me if you can. No need to confirm.&quot; Zero planning. Zero obligation. Still connection.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Making Friends as an Adult (It&apos;s Awkward)</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            If your old friendships didn&apos;t survive the transition, or if you moved, or if you need people who understand your current reality — you may need to make new friends. As an adult. Which feels approximately as comfortable as middle school.
          </p>
          <p>
            The truth about adult friendship: it requires the same ingredients as childhood friendship (proximity + repeated unplanned interaction + shared vulnerability) but adults have to engineer these conditions deliberately. They don&apos;t happen naturally anymore.
          </p>
          <p>
            Where to find potential friends:
          </p>
          <ul className="space-y-2 ml-4">
            <li>&bull; Repeated contexts: classes, groups, regular activities where you see the same people weekly. Friendship forms through repeated exposure, not one-off meetings.</li>
            <li>&bull; Interest-based rather than child-based: a book club, a gym class, a creative group. Friendships built on shared interest tend to be deeper than those built only on shared parenthood.</li>
            <li>&bull; Online communities that match your specific experience: particularly helpful if your situation is uncommon (solo parenting, neurodivergent parenting, loss, specific challenges).</li>
            <li>&bull; Be the one who initiates: &quot;Want to grab a coffee after this?&quot; feels vulnerable. Do it anyway. Most people are waiting for someone else to ask first.</li>
          </ul>
          <p>
            It takes approximately 50 hours of interaction for an acquaintance to become a casual friend, and 200 hours for a close friend. This is normal. New friendship is slow. It&apos;s not that you&apos;re doing it wrong — it&apos;s that real connection takes time.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">The Friendships That Didn&apos;t Survive</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Some friendships didn&apos;t just fade — they broke. Maybe a friend disappointed you during a crisis. Maybe someone said something about your parenting you can&apos;t forgive. Maybe the distance became so great that reconnecting would mean pretending nothing changed.
          </p>
          <p>
            You are allowed to grieve friendships that ended. You are allowed to feel angry about people who didn&apos;t show up. And you are allowed to decide — without guilt — which relationships deserve your limited energy and which don&apos;t.
          </p>
          <p>
            Questions that help:
          </p>
          <ul className="space-y-2 ml-4">
            <li>&bull; &quot;Do I feel better or worse after interacting with this person?&quot;</li>
            <li>&bull; &quot;Is this friendship reciprocal, or am I always the one reaching out?&quot;</li>
            <li>&bull; &quot;Do they see my current reality, or do they relate to who I was before?&quot;</li>
            <li>&bull; &quot;Can I be honest with this person about how I&apos;m really doing?&quot;</li>
          </ul>
          <p>
            Not every friendship needs to be saved. Some served a season. Releasing them isn&apos;t failure — it&apos;s discernment about where to invest your very limited relational energy.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">When to Seek Professional Help</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Loneliness is painful. When it becomes persistent, it can affect your mental and physical health. Consider professional support if:
          </p>
          <ul className="space-y-2 ml-4">
            <li>&bull; You feel isolated to the point of hopelessness — like no one would notice if you disappeared</li>
            <li>&bull; Loneliness is contributing to depression, anxiety, or suicidal thoughts</li>
            <li>&bull; You want to connect but something blocks you — social anxiety, fear of rejection, or past relational trauma</li>
            <li>&bull; Your loneliness is driving you to depend entirely on your children or partner for emotional connection, creating pressure in those relationships</li>
            <li>&bull; You had a major relational loss (friendship breakup, family estrangement) that you can&apos;t process alone</li>
            <li>&bull; You find yourself unable to trust people enough to let them close</li>
          </ul>
          <p className="mt-4">
            A therapist can help you explore what blocks connection, process grief about relationships that ended, and build the relational skills and confidence to create new ones. Groups — therapy groups, support groups, community groups — can also be powerful because they provide the repeated contact that builds connection.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">You Deserve to Be Known</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            You deserve relationships where you are seen — not just as a mother, but as a person. Where someone asks how YOU are and actually wants the honest answer. Where you can be messy, funny, struggling, brilliant, and imperfect without performing.
          </p>
          <p>
            Building these connections in motherhood is harder than it should be. It takes more effort, more vulnerability, more persistence than feels fair when you&apos;re already depleted. But the research is unequivocal: social connection is not optional for human wellbeing. It is as essential as food and sleep. You need people. And that need is not weakness — it&apos;s biology.
          </p>
          <div className="bg-primary/5 rounded-xl p-5 border border-primary/10 mt-4">
            <p className="italic text-foreground/90">
              &quot;I am allowed to need people. My loneliness is not a character flaw — it is a normal response to abnormal isolation. I can start small. I can be imperfect. I can reach out even when it feels awkward. Connection is not a luxury I need to earn. It is a human need I deserve to have met.&quot;
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
