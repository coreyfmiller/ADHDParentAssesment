"use client"

import Link from "next/link"
import { Shield, ArrowLeft } from "lucide-react"

export default function SoloParentingGuide() {
  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div>
        <Link href="/dashboard/guides" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Guides
        </Link>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center">
            <Shield className="w-5 h-5 text-teal-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-medium text-foreground">Solo Parenting</h1>
        </div>
        <p className="text-muted-foreground">
          Systems without a safety net. For when there&apos;s no one to tag in — and no one&apos;s coming.
        </p>
      </div>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">This Is a Different Kind of Hard</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Most parenting advice assumes a partner. &quot;Split the mornings.&quot; &quot;Tag team bedtime.&quot; &quot;Have your partner take over so you can regulate.&quot; If you&apos;re doing this alone — whether single, separated, widowed, or effectively solo because your partner is absent, deployed, or incapable of sharing the load — that advice isn&apos;t just unhelpful. It&apos;s cruel.
          </p>
          <p>
            Solo parenting isn&apos;t &quot;parenting but harder.&quot; It&apos;s a fundamentally different task. There&apos;s no one to hand the screaming child to when your nervous system is at capacity. No one to take a shift at 3am. No one who notices when the milk is running low. No one to be the backup plan when you&apos;re sick. The cognitive load, the physical load, and the emotional load sit entirely on one person. You.
          </p>
          <p>
            This guide doesn&apos;t offer platitudes about &quot;strong single mums.&quot; You don&apos;t need to be strong. You need strategies, systems, and someone to acknowledge that what you&apos;re doing is genuinely harder — not to pity you, but to build solutions calibrated for your actual reality.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">The Loneliness Nobody Talks About</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            The hardest part of solo parenting often isn&apos;t the logistics. It&apos;s the loneliness — specifically, the loneliness of having no one to witness your day. No one who saw what it took. No one who says &quot;you did well today.&quot; No one to debrief with after a hard bedtime. No one who understands why the small victory of getting three kids to school on time with matching shoes feels monumental.
          </p>
          <p>
            This kind of loneliness is different from being alone. You&apos;re never alone (children see to that). But you&apos;re unwitnessed. Unacknowledged. Carrying the full weight of the household&apos;s function without anyone seeing what that costs you.
          </p>
          <p>
            If this resonates: you&apos;re not being dramatic. Humans need to be witnessed. The absence of that witnessing — not the absence of help, though that matters too — is what makes solo parenting emotionally exhausting in a way that&apos;s hard to articulate to people who have someone.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Systems for One (Not Halved-for-Two)</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Systems designed for two-parent households don&apos;t adapt well to solo parenting by simply removing one person. They need redesigning from scratch — built around the constraint of ONE brain, ONE body, ONE pair of hands.
          </p>
          <div className="space-y-3">
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Ruthless simplification</p>
              <p className="text-sm">If it can be simplified, simplify it. Meal rotation (5 meals, repeating). Capsule wardrobes for children. Batch cooking on the one evening you have energy. Automated bill payments. Online grocery delivery. Every decision you eliminate is one less thing your solo brain has to make.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Evening-you prepares for morning-you</p>
              <p className="text-sm">With no one else to cover the morning, evening preparation is non-negotiable. Clothes out. Bags packed. Breakfast decided. Shoes at the door. Morning-you has the least capacity of any version of you. Do her thinking for her the night before.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Lower the bar — permanently</p>
              <p className="text-sm">The house standard, the meal standard, the activity standard — all need to be calibrated for what ONE person can maintain sustainably. Not what two-parent families achieve. Not what Instagram shows. What is achievable for one depleted human running an entire household alone.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Involve children (age-appropriate)</p>
              <p className="text-sm">Children as young as 3 can carry their plate to the kitchen. 5-year-olds can set the table. 8-year-olds can pack their own lunch. This isn&apos;t parentification — it&apos;s participation in family function. You&apos;re teaching them capability while reducing your load.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">When You&apos;re Dysregulated and There&apos;s No One to Tag In</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            This is the crisis moment unique to solo parenting: you&apos;re about to explode, and there&apos;s no one to take the children. You can&apos;t leave the room because they&apos;re too young to be left. You can&apos;t hand them off. You&apos;re trapped in a room with your rage and the people you love most.
          </p>
          <div className="space-y-3">
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">The safe containment reset</p>
              <p className="text-sm">If your children are in a safe space (cot, playpen, gated room): step to the other side of a door for 60 seconds. You&apos;re not abandoning them. You&apos;re ensuring you don&apos;t do something you&apos;ll regret. 60 seconds of crying alone is safer than a parent at breaking point.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">The narration technique</p>
              <p className="text-sm">If you can&apos;t leave: narrate what&apos;s happening inside you. Out loud. &quot;Mummy is feeling very big feelings right now. I&apos;m going to take some big breaths. I&apos;m safe. You&apos;re safe.&quot; This activates your prefrontal cortex (naming = regulation), models emotional literacy for your child, and buys you time.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Phone-a-friend as emergency valve</p>
              <p className="text-sm">Have one person — friend, family member, helpline — who you can call or text in that moment. Not for advice. Just for witness. &quot;I&apos;m at my limit right now and I need someone to know.&quot; Being witnessed, even remotely, can be enough to prevent the worst moment.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Building Your Micro-Village</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            &quot;It takes a village&quot; is true — and infuriating when you don&apos;t have one. But a village doesn&apos;t have to be large. You don&apos;t need 20 people. You need 3-5 people and 2-3 systems.
          </p>
          <div className="space-y-3">
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">The emergency backup</p>
              <p className="text-sm">One person who can take your children on zero notice. A neighbour, a family member, a parent friend. This person doesn&apos;t need to be available often — just when things go wrong. Knowing they exist reduces ambient anxiety.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">The reciprocal arrangement</p>
              <p className="text-sm">Find one other parent (ideally another solo parent) and trade: you take their kids Tuesday, they take yours Thursday. Not charity — exchange. Both of you get one child-free window per week. Both of you feel less alone.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">The school infrastructure</p>
              <p className="text-sm">Breakfast club buys you 30 minutes of morning breathing room. After-school club means you don&apos;t have to leave work early every day. Holiday clubs cover breaks. These aren&apos;t luxuries — they&apos;re structural support that keeps a solo parent functioning.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">The digital witness</p>
              <p className="text-sm">An online group, a WhatsApp thread with other solo parents, a friend who texts &quot;how was today?&quot; Connection doesn&apos;t have to be in-person to count. Having someone who checks in — even virtually — breaks the isolation.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Rest When There&apos;s No One to Cover</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Every piece of advice about rest assumes someone else is available. &quot;Take a break.&quot; &quot;Ask your partner to handle bedtime.&quot; &quot;Sleep in on Saturday.&quot; When you&apos;re solo, rest has to be designed differently:
          </p>
          <div className="space-y-3">
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Rest ALONGSIDE, not AWAY from</p>
              <p className="text-sm">Put on a film. Lie on the couch next to them. Close your eyes. You&apos;re present enough for safety. You&apos;re resting. This isn&apos;t lazy parenting — it&apos;s the only option available, and it&apos;s enough.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Early bedtime = your recovery window</p>
              <p className="text-sm">If children are in bed by 7:30, you have the evening. Not for chores (though some nights you will). For rest. For existing. For the identity-time that keeps you human. Protect this window ferociously. It&apos;s all you have.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Screens are a legitimate rest tool</p>
              <p className="text-sm">A solo parent who uses screens to get 30 minutes of silence is not failing. They&apos;re surviving. Guilt about screen time is a luxury for parents who have alternatives. You don&apos;t. Use the tool without shame.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">When to Seek Support</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>Reach out if:</p>
          <ul className="space-y-2 ml-4">
            <li>&bull; You&apos;re regularly at breaking point with no safety valve</li>
            <li>&bull; The loneliness is becoming depression (numbness, hopelessness, withdrawal)</li>
            <li>&bull; You&apos;re co-parenting with someone who&apos;s destabilising your children or you</li>
            <li>&bull; You can&apos;t meet basic needs (yours or theirs) due to exhaustion or circumstance</li>
            <li>&bull; You need practical help but don&apos;t know where to start</li>
          </ul>
          <p className="mt-4">
            You don&apos;t have to be in crisis to deserve help. Solo parents are under-supported by design — the system assumes two parents. Asking for help isn&apos;t admitting failure. It&apos;s correctly identifying that one person doing a two-person job needs more resources than the system currently provides.
          </p>
        </div>
      </section>

      <p className="text-sm text-muted-foreground/70 text-center leading-relaxed">
        This guide is for educational and self-reflection purposes only. It is not a substitute for professional support. If you are in crisis, contact 988 (Suicide &amp; Crisis Lifeline) or your local emergency services.
      </p>
    </div>
  )
}
