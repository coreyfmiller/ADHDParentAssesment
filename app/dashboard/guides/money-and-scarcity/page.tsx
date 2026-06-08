"use client"

import Link from "next/link"
import { DollarSign, ArrowLeft } from "lucide-react"

export default function MoneyAndScarcityGuide() {
  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div>
        <Link href="/dashboard/guides" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Guides
        </Link>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-amber-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-medium text-foreground">Money, Scarcity &amp; Decision-Making</h1>
        </div>
        <p className="text-muted-foreground">
          Financial anxiety as cognitive overload — why money feels impossible when your brain is already full, and practical systems that work for overloaded minds.
        </p>
      </div>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">The Feeling Under the Numbers</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Before we talk about money, let&apos;s name what&apos;s actually happening in your body when you think about finances: the tightening in your chest. The avoidance — how you don&apos;t open the banking app, don&apos;t look at the statement, don&apos;t calculate what&apos;s left. The low-grade dread that sits behind every purchase. The shame spiral after spending.
          </p>
          <p>
            Financial stress isn&apos;t just stress about money. It&apos;s cognitive overload, decision fatigue, and shame compounded by a culture that treats money management as a moral issue. You&apos;re not &quot;bad with money.&quot; You are trying to manage complex financial decisions with a brain that&apos;s already at capacity from everything else you carry.
          </p>
          <p>
            Research shows that financial scarcity — real or perceived — literally narrows cognitive bandwidth. It&apos;s the equivalent of losing 13 IQ points. Not because you&apos;re less intelligent, but because your brain is allocating so many resources to the threat of &quot;not enough&quot; that there&apos;s less available for planning, decision-making, and impulse control. You are not failing at money. Your brain is operating in scarcity mode.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Why Overloaded Brains Struggle with Finances</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Money management requires executive function — the same cognitive resources that are already depleted by motherhood, stress, sleep deprivation, and emotional labour. Specifically, managing money requires:
          </p>
          <div className="space-y-3">
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Working memory</p>
              <p className="text-sm">Holding multiple numbers, due dates, and account balances in mind simultaneously. When your working memory is full of children&apos;s schedules, school permissions, and grocery needs — there&apos;s no capacity left.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Future planning</p>
              <p className="text-sm">Thinking ahead, projecting income and expenses, preparing for irregular costs. When you&apos;re in survival mode, the brain shrinks its time horizon to TODAY. Next month feels impossible to plan for because today is taking everything you have.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Impulse regulation</p>
              <p className="text-sm">Saying no to the quick purchase that provides momentary relief. When your dopamine is chronically low (from exhaustion, monotony, depletion), spending becomes one of the few accessible sources of pleasure. It&apos;s not weakness. It&apos;s self-medication.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Emotional regulation around money</p>
              <p className="text-sm">Tolerating the discomfort of checking balances, facing debt, having difficult conversations. When your emotional capacity is already maxed, avoidance becomes the only viable strategy.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Impulse Spending: What It&apos;s Actually About</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            If you spend impulsively and then feel crushing shame afterward, know this: the spending is serving a function. It&apos;s not random and it&apos;s not character failure. It&apos;s usually one of these:
          </p>
          <ul className="space-y-2 ml-4">
            <li>&bull; <strong>Dopamine seeking</strong> — Your brain is understimulated, depleted, or depressed. Buying something provides a hit of novelty and anticipation. The package arriving gives you something to look forward to in days that otherwise blend together.</li>
            <li>&bull; <strong>Identity maintenance</strong> — You&apos;ve lost so much of yourself to motherhood. Buying things that feel like &quot;you&quot; (clothes, skincare, hobbies) is a way of insisting you still exist as a person.</li>
            <li>&bull; <strong>Providing for your children</strong> — The Amazon cart full of things for the kids. The gear, the activities, the clothes. This spending is driven by guilt, comparison, or the desire to give them what you didn&apos;t have.</li>
            <li>&bull; <strong>Emotional regulation</strong> — Shopping as soothing. The browsing, the choosing, the purchasing — it occupies the mind and temporarily replaces distress with focus.</li>
          </ul>
          <p>
            Understanding the function doesn&apos;t mean you have to continue the behaviour. But it means you can address the NEED behind it rather than just white-knuckling through willpower — which never works long-term.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">The Shame Cycle</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Financial shame is one of the most isolating emotions. You can&apos;t talk about it — because money is taboo, because admitting struggle feels like admitting failure, because you &quot;should&quot; be able to manage this.
          </p>
          <p>
            The shame cycle works like this: stress triggers spending → spending triggers shame → shame triggers avoidance (not looking at accounts) → avoidance creates more financial chaos → more chaos creates more stress → stress triggers spending. Round and round.
          </p>
          <p>
            Breaking the cycle requires interrupting it at the shame point. Not at the spending point (that comes later). Because shame drives avoidance, and avoidance is what makes everything worse.
          </p>
          <p>
            Shame interruptions:
          </p>
          <ul className="space-y-2 ml-4">
            <li>&bull; Tell one person the truth about your financial situation — shame cannot survive being spoken aloud</li>
            <li>&bull; Separate your moral worth from your bank balance: &quot;My finances are messy. I am not messy.&quot;</li>
            <li>&bull; Remember that financial difficulty is structural, not personal — wages, childcare costs, housing prices. This is bigger than you.</li>
            <li>&bull; Look at your accounts with the same compassion you&apos;d bring to a friend showing you theirs</li>
          </ul>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Practical Money Systems for Overloaded Brains</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Budgets don&apos;t work for most overloaded brains because they require daily tracking, categorisation, and decision-making — exactly the cognitive functions that are already depleted. Instead, try systems that automate the thinking:
          </p>
          <div className="space-y-3">
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">The two-account system</p>
              <p className="text-sm">Bills account and spending account. All income goes into bills. A set amount transfers to spending weekly (not monthly — weekly gives you a shorter horizon to manage). What&apos;s in the spending account is what you have. When it&apos;s gone, it&apos;s gone. No tracking required.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">The 24-hour rule for non-essentials</p>
              <p className="text-sm">Anything over a set amount (you decide — maybe £30/€30/$30) waits 24 hours. Put it in the cart. Close the app. If you still want it tomorrow, buy it. Most impulse purchases don&apos;t survive the wait.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Visual money</p>
              <p className="text-sm">Some brains need to SEE money to understand it. Cash in labelled envelopes. A whiteboard with the weekly amount. A jar that fills or empties. Abstract numbers on a screen don&apos;t feel real to everyone.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">One financial task per week</p>
              <p className="text-sm">Not an entire overhaul. One thing. Cancel one subscription. Check one statement. Set up one direct debit. The overwhelm of &quot;sort out all the money things&quot; paralyses. One task is achievable.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Decision Fatigue and Financial Choices</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            By the time most mothers sit down to think about money, they&apos;ve already made hundreds of decisions that day. What to feed them. What to wear. How to respond to the tantrum. Whether to take that appointment. Every decision costs cognitive energy, and financial decisions — which carry emotional weight and future consequences — cost the most.
          </p>
          <p>
            This is why you might find yourself making poor financial choices in the evening, or why big financial decisions feel impossible. You&apos;re not incapable. You&apos;re depleted.
          </p>
          <p>
            Strategies:
          </p>
          <ul className="space-y-2 ml-4">
            <li>&bull; Make financial decisions in the morning when cognitive resources are highest</li>
            <li>&bull; Reduce the number of financial decisions by automating everything possible</li>
            <li>&bull; Set spending rules ONCE (when you have capacity) so daily decisions are already made</li>
            <li>&bull; For big decisions: write the options down, sleep on them, decide fresh. Never make significant financial choices at the end of a hard day.</li>
            <li>&bull; Accept &quot;good enough&quot; over &quot;optimal&quot; — the energy cost of finding the absolute best deal often exceeds the savings</li>
          </ul>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">When to Seek Professional Help</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Financial difficulty intersects with mental health in complex ways. Consider seeking support if:
          </p>
          <ul className="space-y-2 ml-4">
            <li>&bull; Spending feels compulsive — you can&apos;t stop even when you want to</li>
            <li>&bull; Financial anxiety is affecting your sleep, relationships, or ability to function</li>
            <li>&bull; You&apos;re hiding spending from your partner or family</li>
            <li>&bull; Debt has reached a level that feels unmanageable and you don&apos;t know where to start</li>
            <li>&bull; Money-related shame is contributing to depression or hopelessness</li>
            <li>&bull; You recognise that your financial patterns are connected to deeper emotional needs that aren&apos;t being met</li>
          </ul>
          <p className="mt-4">
            Options: a financial counsellor (free services exist in most areas) for practical debt management, a therapist for the emotional patterns underlying financial behaviour, or both. If compulsive spending is the primary concern, look for professionals familiar with impulse control difficulties.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Money Is Not a Moral Issue</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Your bank balance does not reflect your worth as a mother or a person. Financial struggle in motherhood is overwhelmingly structural — inadequate parental leave, the cost of childcare, the wage gap that widens after children, the invisible labour that has no market value. You are navigating a system that was not designed with your life in mind.
          </p>
          <p>
            The goal is not to become &quot;good with money&quot; by some aspirational standard. The goal is to build systems simple enough that your overloaded brain can maintain them, reduce the shame enough that you can face your finances honestly, and meet your needs and your children&apos;s needs — imperfectly, sustainably.
          </p>
          <div className="bg-primary/5 rounded-xl p-5 border border-primary/10 mt-4">
            <p className="italic text-foreground/90">
              &quot;My worth is not measured by my bank balance. Financial struggle does not make me a bad mother. I can build simple systems, face what&apos;s real without shame, and make one small change at a time. I do not need to be perfect with money. I need to be honest with myself and gentle enough to keep trying.&quot;
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
