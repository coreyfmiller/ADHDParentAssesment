"use client"

import Link from "next/link"
import { Heart, ArrowLeft } from "lucide-react"

export default function BodyGuide() {
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
          <h1 className="text-2xl md:text-3xl font-medium text-foreground">Your Body After Kids</h1>
        </div>
        <p className="text-muted-foreground">
          This isn&apos;t about &quot;getting your body back.&quot; It&apos;s about living in a body that doesn&apos;t feel like yours anymore — and finding your way back to it.
        </p>
      </div>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">The Body That Isn&apos;t Yours Anymore</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Your body grew, birthed, and possibly fed a human being. It did something extraordinary. And now it feels like a stranger. Not just different-looking — different-feeling. Disconnected. Like you&apos;re wearing a suit that doesn&apos;t fit. Like your body belongs to everyone except you.
          </p>
          <p>
            The children climb on it. The partner touches it. The world has opinions about it. Your clothes don&apos;t fit. Your joints ache. You&apos;re exhausted in ways sleep doesn&apos;t fix. And somewhere underneath all the function — the feeding, the carrying, the comforting, the doing — there&apos;s a person who used to live in this body. She&apos;s quiet now.
          </p>
          <p>
            This guide is not about weight loss, fitness routines, or &quot;bouncing back.&quot; It&apos;s about the profound disconnect between you and your physical self — and the slow, gentle work of coming home to a body that&apos;s been through a war it never got credit for fighting.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">The Disconnect Is Real (Not Vanity)</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            When women talk about not recognising their bodies after children, they&apos;re often dismissed: &quot;But you made a baby! Be grateful!&quot; As though gratitude and grief can&apos;t coexist. As though acknowledging loss means rejecting your children.
          </p>
          <p>
            The disconnect isn&apos;t about appearance — though that&apos;s part of it. It&apos;s about:
          </p>
          <ul className="space-y-2 ml-4">
            <li>&bull; <strong>Proprioceptive disconnection</strong> — your brain&apos;s map of your body hasn&apos;t updated. You bump into things. You misjudge spaces. Your body feels unfamiliar in dimensions.</li>
            <li>&bull; <strong>Interoceptive suppression</strong> — you&apos;ve learned to ignore hunger, thirst, pain, and fatigue so thoroughly that you&apos;ve lost access to what your body is telling you.</li>
            <li>&bull; <strong>Touch as function, not pleasure</strong> — your body has become a tool that serves others. Touch means someone needs something. You&apos;ve forgotten that your body can also receive.</li>
            <li>&bull; <strong>Identity fragmentation</strong> — you used to know this body. Its rhythms, its strengths, its pleasures. Now it feels like borrowed equipment.</li>
          </ul>
          <p className="mt-4">
            This isn&apos;t vanity. It&apos;s dissociation — a low-grade, normalised disconnection between mind and body that motherhood both creates and demands. You leave your body to survive the demands on it. And then you don&apos;t know how to come back.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">The Pain Nobody Explains</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Your back hurts. Your hips ache. Your shoulders are concrete. Your pelvic floor isn&apos;t what it was. You carry tension in places you didn&apos;t know existed. And everyone — doctors included — normalises it as &quot;just being a mum.&quot;
          </p>
          <p>
            Here&apos;s what&apos;s actually happening:
          </p>
          <div className="space-y-3">
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Postpartum musculoskeletal changes</p>
              <p className="text-sm">Pregnancy releases relaxin, which loosens joints and ligaments. These don&apos;t always return to their pre-pregnancy state. Core muscles separate (diastasis recti). Pelvic floor muscles stretch and may not recover without targeted rehabilitation. This isn&apos;t &quot;just aging&quot; — it&apos;s a specific physiological consequence of pregnancy that&apos;s treatable.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Chronic tension from hypervigilance</p>
              <p className="text-sm">Your body has been in low-grade &quot;ready mode&quot; since your first child was born. Muscles that are perpetually braced (jaw, shoulders, upper back, pelvic floor) develop chronic pain from sustained contraction. You don&apos;t notice the tension because it became your baseline.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Nutritional depletion</p>
              <p className="text-sm">Pregnancy and breastfeeding deplete iron, calcium, magnesium, B12, and vitamin D — all of which affect muscle function, pain sensitivity, and energy. Many women remain depleted years later because nobody tested and nobody treated. Pain that won&apos;t resolve may have a nutritional component.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Sleep deprivation amplifies pain</p>
              <p className="text-sm">Poor sleep lowers your pain threshold. Literally. The same stimulus that registers as &quot;mild discomfort&quot; when you&apos;re rested registers as &quot;significant pain&quot; when you&apos;re chronically underslept. You&apos;re not being dramatic. Your nervous system is sensitised.</p>
            </div>
          </div>
          <p className="mt-4">
            If you&apos;re living with chronic pain: you are allowed to seek help for it. A pelvic health physiotherapist, a postnatal exercise specialist, or a GP who takes &quot;everything hurts&quot; seriously (and doesn&apos;t just tell you it&apos;s normal) can change your daily experience significantly.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Touched Out: When Your Body Belongs to Everyone Else</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Being &quot;touched out&quot; isn&apos;t a mood or a preference. It&apos;s a neurological state — your somatosensory cortex has exceeded its processing capacity for tactile input. Additional touch, even loving touch, registers as a threat rather than comfort.
          </p>
          <p>
            This creates a specific kind of suffering: your child reaches for you and your skin crawls. Your partner wants closeness and you want to be in a room alone with the door locked. You feel guilty for recoiling from the people you love. You feel broken for not wanting to be touched.
          </p>
          <p>
            You&apos;re not broken. Your nervous system has a touch budget, and your children spent all of it. There&apos;s nothing left for anyone else — including yourself. This is physiology, not failure.
          </p>
          <h3 className="text-lg font-medium text-foreground mt-4 mb-3">What helps:</h3>
          <div className="space-y-3">
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Name it to your family</p>
              <p className="text-sm">&quot;My body needs a break from touching right now. I love you and I need my body to be mine for a little while.&quot; Children can learn this. Partners can respect it. But only if you name it instead of pushing through until you snap.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Build in untouched time</p>
              <p className="text-sm">Even 10 minutes where no one is on you, near you, or requiring physical proximity. A locked bathroom. A walk alone. Sitting in the car after a school run. Your nervous system needs recovery windows where the body belongs only to you.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Reclaim touch on YOUR terms</p>
              <p className="text-sm">When you&apos;re touched out, all touch feels like demand. To reclaim your body, you need touch that&apos;s chosen — not demanded. A hot shower. Self-massage. Stretching. Wrapping yourself in a weighted blanket. Touch that&apos;s FOR you, not FROM you.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">The Pelvic Floor: What Nobody Told You</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Leaking when you sneeze. Pain during intimacy. A heaviness or dragging sensation. Urgency that wasn&apos;t there before. These are common postpartum experiences — and they are NOT &quot;just what happens.&quot; They are treatable symptoms that most women are never told they can fix.
          </p>
          <p>
            Your pelvic floor underwent enormous strain during pregnancy and birth. For many women, it doesn&apos;t recover on its own — it needs targeted rehabilitation, just like any other muscle group that&apos;s been injured. &quot;Just do Kegels&quot; is incomplete advice (and sometimes wrong — some pelvic floors need releasing, not strengthening).
          </p>
          <p>
            A pelvic health physiotherapist can assess what YOUR pelvic floor actually needs. This is standard postnatal care in many countries. In others, you may need to advocate for a referral. Say to your GP: &quot;I&apos;m experiencing [specific symptom] and I&apos;d like a referral to a pelvic health specialist.&quot;
          </p>
          <p>
            You do not have to live with these symptoms. They are not &quot;the price of motherhood.&quot; They are treatable conditions that deserve the same attention as any other injury.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Coming Home to Your Body</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Reconnecting with your body isn&apos;t about fitness or appearance. It&apos;s about inhabiting your physical self again — feeling present in your own skin rather than disconnected from it.
          </p>
          <h3 className="text-lg font-medium text-foreground mt-4 mb-3">Slow, gentle re-entry:</h3>
          <div className="space-y-3">
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Notice without judging</p>
              <p className="text-sm">Put your hand on your belly. Not to assess its shape — to feel it rise and fall with breath. Feel the warmth under your palm. This body kept someone alive. You don&apos;t have to love how it looks yet. You can start by noticing that it&apos;s there.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Move for sensation, not performance</p>
              <p className="text-sm">Not to burn calories or achieve a shape. To feel alive in your body. Stretch because stretching feels good. Walk because your legs want to move. Dance because the music moves you. The goal isn&apos;t fitness — it&apos;s presence. Being IN your body instead of just operating it.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Reclaim one sensory pleasure</p>
              <p className="text-sm">A hot shower without rushing. Lotion applied slowly rather than functionally. Clothing that feels good against your skin. One physical experience that exists for YOUR pleasure — not for function, not for someone else&apos;s benefit.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Grieve what changed</p>
              <p className="text-sm">You&apos;re allowed to miss your pre-pregnancy body. You&apos;re allowed to feel grief about changes that are permanent. Grief and acceptance aren&apos;t opposites — grief is the path TO acceptance. Let yourself feel it without immediately redirecting to gratitude.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">When to Seek Support</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>Talk to a healthcare provider if:</p>
          <ul className="space-y-2 ml-4">
            <li>&bull; Chronic pain is affecting your daily functioning (not &quot;just part of being a mum&quot;)</li>
            <li>&bull; Pelvic floor symptoms aren&apos;t resolving on their own</li>
            <li>&bull; Fatigue persists despite adequate sleep (get nutrient levels checked)</li>
            <li>&bull; Your relationship with your body involves significant distress, restriction, or self-harm</li>
            <li>&bull; You feel so disconnected from your body that you don&apos;t recognise yourself</li>
          </ul>
          <p className="mt-4">
            You deserve to feel comfortable in your own body. Not perfect — comfortable. Present. At home. And if you can&apos;t get there alone, that&apos;s not failure. It&apos;s a body that went through something enormous asking for proportionate support.
          </p>
        </div>
      </section>

      <p className="text-sm text-muted-foreground/70 text-center leading-relaxed">
        This guide is for educational and self-reflection purposes only. It is not medical advice. If you have concerns about pain, pelvic health, or body image, please consult a healthcare provider. If you are in crisis, contact 988 (Suicide &amp; Crisis Lifeline) or your local emergency services.
      </p>
    </div>
  )
}
