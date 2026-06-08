"use client"

import Link from "next/link"
import { Volume2, ArrowLeft } from "lucide-react"

export default function SensoryLifeGuide() {
  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div>
        <Link href="/dashboard/guides" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Guides
        </Link>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
            <Volume2 className="w-5 h-5 text-violet-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-medium text-foreground">Sensory Life</h1>
        </div>
        <p className="text-muted-foreground">
          Why noise, touch, and light feel unbearable — understanding your sensory needs and building a life that doesn&apos;t assault your nervous system.
        </p>
      </div>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">When the World Is Too Loud</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            The screaming. The whining. The TV playing over the toy that makes noise over the sibling fighting over the baby crying. The sound of chewing. The sound of someone saying &quot;Mum&quot; for the fortieth time. You feel your skin crawling, your jaw clenching, your whole body screaming: STOP.
          </p>
          <p>
            This isn&apos;t impatience. This isn&apos;t being a bad mother who can&apos;t handle her children&apos;s noise. This is your sensory system telling you it has exceeded capacity. The rage, the urge to flee, the feeling that you might explode — these are neurological overflow, not character failure.
          </p>
          <p>
            Maybe you&apos;ve always been this way — sensitive to sounds, textures, light, crowds. Maybe it got worse after having children (because children are a constant sensory assault on every channel simultaneously). Maybe it worsens cyclically with your hormones, your sleep, your stress. However it shows up — the experience is real, it&apos;s physiological, and it deserves to be taken seriously.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Sensory Processing Is a Spectrum</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Everyone processes sensory information differently. It&apos;s not binary — &quot;normal&quot; versus &quot;disordered.&quot; It&apos;s a spectrum, and many people sit at the sensitive end without ever having language for it.
          </p>
          <p>
            You might be more sensory-sensitive if:
          </p>
          <ul className="space-y-2 ml-4">
            <li>&bull; Certain textures (food, clothing, being touched) feel physically uncomfortable or intolerable</li>
            <li>&bull; Noise makes you feel agitated, angry, or panicky — especially layered noise</li>
            <li>&bull; Bright or flickering lights bother you more than others around you</li>
            <li>&bull; You feel overwhelmed in busy environments (shops, parties, soft play) and need recovery time afterward</li>
            <li>&bull; Being touched when you don&apos;t want to be (even by your children) triggers a visceral &quot;get off me&quot; response</li>
            <li>&bull; Clutter and visual chaos genuinely affects your ability to think</li>
            <li>&bull; You crave silence and solitude not as luxury but as necessity</li>
          </ul>
          <p>
            Sensory sensitivity can exist on its own or alongside ADHD, autism, anxiety, or trauma responses. The cause matters less than the management. If your nervous system is easily overwhelmed by sensory input, you need strategies — regardless of why.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Why Motherhood Is a Sensory Emergency</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Motherhood is, objectively, one of the most sensory-intensive experiences a human can have. Consider what your nervous system processes daily:
          </p>
          <ul className="space-y-2 ml-4">
            <li>&bull; <strong>Sound:</strong> Crying, whining, shouting, repetitive questions, toys with batteries, multiple children speaking simultaneously, high-pitched squealing</li>
            <li>&bull; <strong>Touch:</strong> Constant physical contact, being climbed on, breastfeeding, sticky hands, being grabbed while trying to think</li>
            <li>&bull; <strong>Visual:</strong> Toys everywhere, clutter, bright colours, screens, visual chaos in every room</li>
            <li>&bull; <strong>Smell:</strong> Nappies, food, sick, the particular smell of child sweat</li>
            <li>&bull; <strong>Proprioceptive:</strong> Carrying heavy children, bending, lifting, the physical labour of caregiving</li>
          </ul>
          <p>
            For a sensory-sensitive person, this is not just tiring — it&apos;s an assault. Your nervous system is processing all of this at heightened intensity, all day, with no recovery time. The rage you feel isn&apos;t about your children. It&apos;s about a system that has exceeded its processing capacity and is signalling: DANGER. STOP. TOO MUCH.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">The Witching Hour as Sensory Emergency</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Between 4pm and 7pm, something collapses. The children are tired and dysregulated. The noise escalates. Dinner needs making (clanging, sizzling, timers). Everyone wants something from you. And you — who have been absorbing sensory input all day with no break — hit overload.
          </p>
          <p>
            This isn&apos;t a parenting failure. It&apos;s a predictable neurological crash. By evening, your sensory tolerance — already lower than average — has been depleted to nothing. Every noise is now ten times louder than it actually is. Every touch is an intrusion. You want to scream, or cry, or hide in the bathroom with the door locked.
          </p>
          <p>
            Emergency strategies for the witching hour:
          </p>
          <ul className="space-y-2 ml-4">
            <li>&bull; <strong>Reduce input BEFORE you crash:</strong> Turn off background noise. Dim lights. Remove one source of stimulation before the overwhelm peaks.</li>
            <li>&bull; <strong>Earplugs or noise-reducing earbuds:</strong> You can still hear your children (especially with loop-style filtered earplugs) but at reduced volume. This is not neglect. This is regulation.</li>
            <li>&bull; <strong>Screen time as a tool:</strong> 30 minutes of screen time at 5pm to reduce the noise load while you recover enough to get through bedtime. This is strategic, not lazy.</li>
            <li>&bull; <strong>Cold water:</strong> Splash your face, hold ice, run cold water over your wrists. Cold activates the dive reflex and brings your nervous system down quickly.</li>
            <li>&bull; <strong>Lower your standards for this window:</strong> Frozen food is fine. Skipping the bath is fine. Survival is the goal between 4-7pm, not Pinterest motherhood.</li>
          </ul>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Building a Sensory-Friendlier Home</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            You cannot eliminate sensory input when you live with children. But you can reduce the background load so your system isn&apos;t starting at 80% capacity before the day even begins:
          </p>
          <div className="space-y-3">
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Sound management</p>
              <p className="text-sm">Remove batteries from the most offensive toys. Use rugs and soft furnishings to absorb sound. Establish &quot;quiet hours&quot; (even 20 minutes). Invest in noise-cancelling headphones for your recovery time. Consider a white noise machine in YOUR space.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Visual calm</p>
              <p className="text-sm">You don&apos;t need to minimalist-ify your entire home. But one room — even one corner — that is visually calm can serve as your reset point. Contain toy chaos with baskets, closed storage. Reduce clutter in the spaces where you spend the most time.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Lighting</p>
              <p className="text-sm">Swap harsh overhead lights for lamps, especially in the evening. Warm bulbs over cool. Dimmer switches are a small investment with outsized impact on nervous system regulation.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Touch boundaries</p>
              <p className="text-sm">It is okay to say: &quot;I love you and I need a break from being touched right now.&quot; Give children alternatives — a heavy blanket, a stuffed toy, sitting next to you without climbing on you. Your body belongs to you, even though motherhood pretends otherwise.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Communicating Your Sensory Needs</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            One of the hardest parts of sensory sensitivity is that it&apos;s invisible. Your partner, family, and friends may not understand why noise that doesn&apos;t bother them makes you feel like you&apos;re losing your mind. You may have been told you&apos;re &quot;too sensitive,&quot; &quot;dramatic,&quot; or &quot;overreacting&quot; your entire life.
          </p>
          <p>
            Communicating your needs without these responses:
          </p>
          <ul className="space-y-2 ml-4">
            <li>&bull; Lead with neuroscience, not emotion: &quot;My brain processes sensory input differently. When the noise level is high, my system goes into overload and I can&apos;t think or regulate my emotions.&quot;</li>
            <li>&bull; Be specific about what helps: &quot;I need 15 minutes of silence after work before I can engage&quot; is more actionable than &quot;I need less noise&quot;</li>
            <li>&bull; Frame it as a need, not a preference: &quot;This isn&apos;t me being difficult. This is my nervous system reaching capacity. When I hit that point, I become a worse parent, not a better one.&quot;</li>
            <li>&bull; Teach your children age-appropriate language: &quot;Mummy&apos;s ears need a rest right now. Can you use your quiet voice for five minutes?&quot;</li>
          </ul>
          <p>
            You are not asking for too much. You are asking for conditions in which your nervous system can function. That is the baseline, not a luxury.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">When to Seek Professional Help</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Sensory sensitivity exists on a spectrum from preference to significant impairment. Consider professional support if:
          </p>
          <ul className="space-y-2 ml-4">
            <li>&bull; Sensory overwhelm is causing you to rage at your children regularly</li>
            <li>&bull; You avoid leaving the house, social events, or activities your family needs because of sensory dread</li>
            <li>&bull; Your quality of life is significantly affected — you can&apos;t enjoy time with your children because you&apos;re always in overload</li>
            <li>&bull; You suspect your sensory sensitivity may be part of a broader neurodivergent profile (ADHD, autism) that hasn&apos;t been explored</li>
            <li>&bull; You&apos;re using alcohol, food, or other substances to &quot;turn down the volume&quot; on your nervous system</li>
            <li>&bull; The sensitivity has worsened significantly since becoming a parent and isn&apos;t improving with basic strategies</li>
          </ul>
          <p className="mt-4">
            Consider: an occupational therapist specialising in sensory processing (not just for children — adult sensory needs are real), a neurodivergence assessment if other traits resonate, or a psychologist who understands nervous system regulation.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Your Sensory Needs Are Valid</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            You are not too sensitive. You are not overreacting. You are not a bad mother because noise makes you want to scream. You have a nervous system that processes input at higher intensity — and you live in an environment (motherhood) that provides relentless, uncontrollable sensory input all day, every day.
          </p>
          <p>
            Managing your sensory environment is not self-indulgent. It is the thing that determines whether you can be patient, present, and regulated with your children. Earplugs are not weakness. Needing quiet is not failure. Asking for fewer demands on your senses is not asking for too much.
          </p>
          <div className="bg-primary/5 rounded-xl p-5 border border-primary/10 mt-4">
            <p className="italic text-foreground/90">
              &quot;My sensitivity is not a flaw. It is how my nervous system works. I am allowed to protect my senses, set boundaries around touch and noise, and build a home that doesn&apos;t constantly overwhelm me. When I manage my sensory needs, I am a calmer, kinder, more present parent. This is not selfishness. This is sustainability.&quot;
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
