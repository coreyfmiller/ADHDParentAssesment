"use client"

import Link from "next/link"
import { Cloud, ArrowLeft } from "lucide-react"

export default function GriefAndMotherhoodGuide() {
  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div>
        <Link href="/dashboard/guides" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Guides
        </Link>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-slate-500/10 flex items-center justify-center">
            <Cloud className="w-5 h-5 text-slate-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-medium text-foreground">Grief &amp; Motherhood</h1>
        </div>
        <p className="text-muted-foreground">
          Miscarriage, loss, ambiguous grief, and the impossible work of mourning when no one gives you space to fall apart.
        </p>
      </div>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Grief That Has No Space</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Grief in motherhood is uniquely cruel because it rarely comes with permission to grieve. There&apos;s always someone who needs you. Always a lunch to pack, a bedtime to manage, a small person who doesn&apos;t understand why you&apos;re crying. You grieve in fragments — in the shower, in the car, in the three minutes between the school drop-off and the first task of the day.
          </p>
          <p>
            Maybe you lost a pregnancy. Maybe you lost a baby. Maybe you lost your own mother while you were mothering — and now you carry both roles with no one mothering you. Maybe your loss is ambiguous: the child you imagined but didn&apos;t have, the relationship that died slowly, the version of yourself that didn&apos;t survive the transition to motherhood.
          </p>
          <p>
            Whatever you&apos;re grieving, this is true: grief needs space, and motherhood rarely offers any. The tension between those two realities is its own form of suffering. You are not grieving wrong. You are grieving in impossible conditions.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Miscarriage and Pregnancy Loss</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Miscarriage is a death. It doesn&apos;t matter how early. It doesn&apos;t matter that no one else knew. You knew. Your body knew. You had already begun imagining that child — their face, their name, their place in the family. The loss of that imagined future is a real loss, and you are allowed to mourn it fully.
          </p>
          <p>
            What makes pregnancy loss particularly isolating:
          </p>
          <ul className="space-y-2 ml-4">
            <li>&bull; The loss is invisible — your body may look the same, you return to work, no one sends flowers</li>
            <li>&bull; Timelines are imposed: &quot;It was early,&quot; &quot;You can try again,&quot; &quot;At least you have your other children&quot;</li>
            <li>&bull; The grief is physical — hormones crashing, body bleeding, the brutal physiological evidence of loss</li>
            <li>&bull; You may be expected to comfort others&apos; discomfort about your loss</li>
            <li>&bull; If you have living children, you&apos;re still mothering through the grief with no pause button</li>
          </ul>
          <p>
            There is no timeline for this grief. &quot;Moving on&quot; is not a destination. The loss integrates — it becomes part of your story rather than consuming it — but it doesn&apos;t disappear. Anniversaries, due dates, seeing other pregnant women — these may always carry a weight. That is normal, not pathological.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Infant Loss: The Grief No One Can Fathom</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            If you have lost a baby — through stillbirth, neonatal death, SIDS, or illness — you are carrying a grief that most people cannot comprehend. The words available to describe this loss are insufficient. The world moved on while you stood still in the most devastating moment of your life.
          </p>
          <p>
            People say things that hurt because they don&apos;t know what else to say: &quot;Everything happens for a reason.&quot; &quot;They&apos;re in a better place.&quot; &quot;You&apos;re so strong.&quot; These words are not comfort. They are other people&apos;s inability to sit with the horror of what happened to you.
          </p>
          <p>
            What you may need to hear:
          </p>
          <ul className="space-y-2 ml-4">
            <li>&bull; Your baby was real. Their life mattered. Their death matters.</li>
            <li>&bull; You are their mother. You will always be their mother.</li>
            <li>&bull; There is no right way to grieve this. There is no timeline. There is no &quot;too much.&quot;</li>
            <li>&bull; You are allowed to talk about them. Say their name. Keep their memory alive in whatever way feels right.</li>
            <li>&bull; If you have other children, you can love them fully AND still grieve the one you lost. These are not competing realities.</li>
          </ul>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Losing Your Mother While Mothering</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Losing your own mother while you are mothering is a particular kind of devastation. You lose the person AND the role — no one to call when the baby is sick, no one who remembers your childhood, no one who thinks about you the way only a mother does. You become motherless while still being a mother. The symmetry is brutal.
          </p>
          <p>
            This loss reverberates through every stage of your children&apos;s lives: milestones she&apos;ll never see, questions you can&apos;t ask her, the grandparent relationship your children will never have. You grieve not once but repeatedly — at every birthday, every school event, every moment you reach for the phone and remember.
          </p>
          <p>
            And if your relationship with your mother was complicated — if she was difficult, absent, or harmful — the grief is even more complex. You may grieve the mother you wished you had more than the mother you lost. You may feel guilty for not grieving enough, or for feeling relieved alongside the sadness.
          </p>
          <p>
            All of it is valid. Grief doesn&apos;t require a perfect relationship. Sometimes the most complicated relationships produce the most complicated grief.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Ambiguous Grief: Mourning What You Can&apos;t Name</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Not all grief has a death certificate. Some of the most painful losses in motherhood are ambiguous — losses without clear endings, without funerals, without social permission to mourn:
          </p>
          <ul className="space-y-2 ml-4">
            <li>&bull; The relationship that ended without resolution</li>
            <li>&bull; The fertility journey that didn&apos;t end as planned</li>
            <li>&bull; The child you imagined versus the child you have (particularly in neurodiversity or disability)</li>
            <li>&bull; The career you lost to motherhood</li>
            <li>&bull; The body you used to have</li>
            <li>&bull; The version of yourself that existed before children</li>
            <li>&bull; The family structure that dissolved</li>
            <li>&bull; The parent who is alive but emotionally gone (through dementia, addiction, estrangement)</li>
          </ul>
          <p>
            Ambiguous grief is harder to process because there&apos;s no clear object of mourning. The loss is ongoing. There&apos;s no funeral, no marker, no socially sanctioned time to fall apart. People may not even recognise it as grief — because nothing &quot;happened.&quot; But your body knows. The ache is real.
          </p>
          <p>
            Naming ambiguous grief as grief — rather than disappointment, adjustment, or ingratitude — is the first step toward processing it. You are allowed to mourn things that didn&apos;t die in the traditional sense.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Grieving While No One Gives Space</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Practical strategies for grieving in the absence of space:
          </p>
          <div className="space-y-3">
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Claim fragments of time</p>
              <p className="text-sm">You may not get days or hours. But 10 minutes in the car after school drop-off. The shower. The walk to the letterbox. Use these fragments intentionally — to feel, to remember, to cry if tears come. Grief processed in small doses still processes.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Create a grief ritual</p>
              <p className="text-sm">Something small that honours the loss regularly. Lighting a candle. Writing a letter. Visiting a place. A ritual gives grief a container — a place and time where it belongs — so it doesn&apos;t flood everything else.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Tell your children what&apos;s age-appropriate</p>
              <p className="text-sm">&quot;Mummy is sad today because I miss someone. I&apos;m okay and I still love you. Sometimes grown-ups have big feelings too.&quot; Letting them see contained grief teaches them that sadness is a normal part of life.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Find your grief witnesses</p>
              <p className="text-sm">People who don&apos;t try to fix it, rush it, or compare it. Who say &quot;tell me about them&quot; instead of &quot;at least you have...&quot; Even one person who holds space makes the grief more bearable.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">When to Seek Professional Help</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Grief is not a mental illness. It is a normal response to loss. But grief can become complicated — stuck, consuming, or entangled with depression or trauma. Consider professional support if:
          </p>
          <ul className="space-y-2 ml-4">
            <li>&bull; Your grief feels as intense now as it did in the immediate aftermath, with no shift over many months</li>
            <li>&bull; You&apos;re unable to function — work, parenting, basic self-care are significantly impaired</li>
            <li>&bull; You feel numb or disconnected from your living children and cannot access warmth toward them</li>
            <li>&bull; You&apos;re using alcohol, food, or other substances to avoid the feelings</li>
            <li>&bull; You have persistent thoughts of joining the person you lost</li>
            <li>&bull; The loss is entangled with trauma (traumatic birth, medical negligence, sudden death)</li>
            <li>&bull; You feel stuck — unable to move forward but unable to process</li>
          </ul>
          <p className="mt-4">
            Grief counselling, bereavement therapy, or specialised support groups (particularly for pregnancy/infant loss) can provide the space that daily life doesn&apos;t offer. Seeking help is not a sign that your grief is &quot;wrong.&quot; It&apos;s recognition that some losses are too big to carry alone.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Grief Does Not Erase Love</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Grief is not a problem to be solved. It is love with nowhere to go. The pain you carry is directly proportional to the love — for the baby you lost, the parent who died, the life you imagined, the self you used to be. The grief honours what was lost by refusing to pretend it didn&apos;t matter.
          </p>
          <p>
            You do not need to &quot;get over it.&quot; You need to find a way to carry it that doesn&apos;t crush you. Over time, grief doesn&apos;t shrink — but your life grows around it. There becomes room for the grief AND for joy, AND for the present moment, AND for love of what you still have. They coexist. They always will.
          </p>
          <div className="bg-primary/5 rounded-xl p-5 border border-primary/10 mt-4">
            <p className="italic text-foreground/90">
              &quot;My grief is not a failure to heal. It is evidence of love that persists beyond loss. I will carry it with me — not as a weight that stops me, but as a testament to what mattered. I am allowed to grieve AND to live. I am allowed to feel joy AND still miss them. Both truths hold.&quot;
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
