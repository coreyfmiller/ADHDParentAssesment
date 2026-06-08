"use client"

import Link from "next/link"
import { Calendar, ArrowLeft } from "lucide-react"

export default function BackToSchoolGuide() {
  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div>
        <Link href="/dashboard/guides" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Guides
        </Link>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-blue-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-medium text-foreground">Back to School Survival Guide</h1>
        </div>
        <p className="text-muted-foreground">
          New routines, new demands, new forms. How to rebuild without burning out by October — written for brains that are already running on empty.
        </p>
      </div>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Why September Breaks You</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Summer has a rhythm — loose, forgiving, low-stakes. Then September hits like a wall: new schedules, new teachers, new expectations, forms to sign, supplies to buy, routines to establish, lunches to pack, homework to manage, activities to coordinate. All at once. With no ramp-up period.
          </p>
          <p>
            For a brain that struggles with transitions, executive function, or working memory — this isn&apos;t just stressful. It&apos;s a system crash. The cognitive demand triples overnight, and you&apos;re expected to absorb it without dropping anything.
          </p>
          <p>
            And here&apos;s what nobody says: September is often harder for YOU than for the kids. They get the excitement of new things. You get the invisible labour of making new things work — the logistics, the emotional preparation, the systems-building, the anticipatory anxiety of &quot;what if I forget something and they suffer for it.&quot;
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">The Shame of Being &quot;The Disorganised Mum&quot;</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Your child didn&apos;t have their costume on dress-up day. The form was late. The lunch was thrown together from whatever was in the fridge. You forgot the school photos were today. And the shame hits like a wave — not just &quot;I forgot&quot; but &quot;I&apos;m the kind of mother who forgets.&quot;
          </p>
          <p>
            You see other mothers at the gate, apparently handling it effortlessly. Their children have the right thing on the right day. Their forms were returned on time. Their lunches are... intentional. And you feel like you&apos;re failing at something everyone else finds easy.
          </p>
          <p>
            Here&apos;s what&apos;s actually happening: those mothers either have more support than you can see (a partner who handles mornings, a parent nearby, a cleaner, fewer children, a brain that automates routine decisions), or they&apos;re masking their own chaos just as hard as you are. You&apos;re comparing your backstage to their front-of-house.
          </p>
          <p>
            The forgotten costume is not evidence of bad mothering. It&apos;s evidence of an overloaded working memory in a system that sends home 47 pieces of paper in the first week and expects you to track them all while also feeding, clothing, emotionally regulating, and transporting multiple small humans.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">The First Two Weeks: Survival Mode Is Okay</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>Give yourself permission to operate at minimum for the first two weeks. The goal is not &quot;smooth routine by day 3.&quot; The goal is:</p>
          <ul className="space-y-2 ml-4">
            <li>&bull; Everyone gets to school (late is fine)</li>
            <li>&bull; Everyone eats something (quality doesn&apos;t matter yet)</li>
            <li>&bull; Everyone sleeps (bedtime can be messy)</li>
            <li>&bull; You don&apos;t burn out before the routine has a chance to form</li>
          </ul>
          <p className="mt-4">
            Routines don&apos;t become automatic in a week. Research suggests habit formation takes an average of 66 days — and that&apos;s under optimal conditions. When you&apos;re depleted, managing multiple children, and adjusting to a brand new schedule? Give it a full term. Not a fortnight.
          </p>
          <p>
            For brains that struggle with automaticity, some routines may never become truly automatic — and that&apos;s okay. They can still work with external scaffolding (checklists, timers, visual cues) even if they never run on autopilot.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Systems That Survive October</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>Most back-to-school systems collapse by mid-October because they were built for your best self, not your real self. Build for your worst Tuesday instead:</p>
          <div className="space-y-3">
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">The Launch Pad</p>
              <p className="text-sm">One physical station by the door. Hooks for bags, bin for shoes, tray for forms/keys/water bottles. Everything needed to leave the house lives here. If it&apos;s not at the launch pad, it doesn&apos;t go. Build the habit of loading it the night before — morning becomes execution, not investigation.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">The Sunday 15</p>
              <p className="text-sm">Every Sunday, 15 minutes (set a timer): check the week&apos;s calendar, pack what you can, sign anything that needs signing, lay out Monday&apos;s clothes. Not the whole week — just Monday. And check what&apos;s coming. That&apos;s it. You&apos;re preventing ambush, not planning perfection.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">The Lunch Rotation</p>
              <p className="text-sm">5 lunches. Rotating. Written on a card stuck inside the pantry. Monday is always sandwich. Tuesday is always wrap. No decisions. No creativity. Just execution. Decision fatigue at 7am is the enemy of getting out the door.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">The Communication Funnel</p>
              <p className="text-sm">Tell the school: &quot;Please email important notices rather than sending paper home in backpacks.&quot; Most schools accommodate this. If they won&apos;t: set a daily alarm at 4pm — &quot;CHECK BACKPACK.&quot; The alarm does the remembering your brain can&apos;t.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">The &quot;Good Enough&quot; Morning</p>
              <p className="text-sm">Define it: everyone dressed, everyone fed something, everyone at school with their bag. That&apos;s the bar. Hair brushed? Bonus. Matching socks? Irrelevant. Homemade lunch? Not required. Set the bar at something achievable on your worst day.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">The After-School Crash</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Your child walks in the door and detonates. They were &quot;fine&quot; at school (holding it together all day), and now they&apos;re melting down, raging, or collapsing. This is called &quot;after-school restraint collapse&quot; — and it&apos;s completely normal. They saved their dysregulation for the person who feels safest: you.
          </p>
          <p>
            Meanwhile, YOU are also at your lowest capacity. Cortisol has dropped. Decision fatigue has peaked. Your patience tank is empty. And now you&apos;re being asked to co-regulate a child who has nothing left — with nothing left yourself.
          </p>
          <h3 className="text-lg font-medium text-foreground mt-4 mb-3">What helps the 3:30-5pm window:</h3>
          <div className="space-y-3">
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Don&apos;t ask questions immediately</p>
              <p className="text-sm">&quot;How was school?&quot; requires executive function they don&apos;t have right now. Give 15-30 minutes of zero demands. Snack, screen, quiet play — whatever decompresses them. Questions can wait until dinner or bath.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Feed first, everything else second</p>
              <p className="text-sm">Low blood sugar + depleted regulation = meltdown. A protein-rich snack within 10 minutes of arriving home changes the biochemistry of the entire afternoon. This isn&apos;t indulgent. It&apos;s neurological.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Protect YOUR transition too</p>
              <p className="text-sm">If possible, give yourself 5 minutes before pickup (sit in the car, breathe, transition from your afternoon brain to &quot;receiving a depleted child&quot; brain). You can&apos;t regulate them if you&apos;re already at capacity.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Delay homework</p>
              <p className="text-sm">Homework immediately after school is asking a depleted brain to perform its hardest task at its lowest point. If possible: snack → play/movement → THEN homework (20 minutes max). Or move homework to after dinner when some recovery has happened.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Managing School Admin When Your Brain Drops Things</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            The school sends: newsletters, forms, permission slips, payment requests, event notices, photo day information, uniform reminders, parent portal logins, volunteer requests, and fundraising asks. In paper. In emails. In apps. In texts from other parents. It&apos;s an avalanche of information directed at your already-full working memory.
          </p>
          <p>
            If you&apos;re someone whose brain drops non-visible information — this system is designed to make you fail. It&apos;s not your fault. It&apos;s a system that assumes a brain with infinite holding capacity.
          </p>
          <h3 className="text-lg font-medium text-foreground mt-4 mb-3">Your defence system:</h3>
          <div className="space-y-3">
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">One capture point</p>
              <p className="text-sm">Every school communication — regardless of how it arrives — gets immediately photographed/forwarded to ONE place. A note on your phone. A folder in your email. A physical tray by the door. It doesn&apos;t matter what it is. It matters that there&apos;s only ONE.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">The Friday process</p>
              <p className="text-sm">Every Friday: open the capture point. Process everything in it. Sign what needs signing. Calendar what needs calendaring. Pay what needs paying. Throw away the rest. 10 minutes. Done until next Friday.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Tell the school what you need</p>
              <p className="text-sm">You are allowed to say: &quot;I process information better digitally. Can important notices be emailed?&quot; or &quot;Can I get a term calendar of key dates at the start of term?&quot; Schools want engaged parents — most will accommodate reasonable requests.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Find your parent ally</p>
              <p className="text-sm">Identify one parent in each class who seems on top of things. Text them when you&apos;re unsure: &quot;Is there anything due this week I might have missed?&quot; This isn&apos;t embarrassing. It&apos;s a system. And they probably appreciate being asked.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">When Your Child Is Struggling Too</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            If your child finds transitions hard, struggles with new routines, melts down over changes, or has their own executive function challenges — September isn&apos;t just hard for you. It&apos;s hard for both of you simultaneously. And supporting a struggling child while you&apos;re already depleted is one of the most exhausting experiences in motherhood.
          </p>
          <p>
            What helps:
          </p>
          <div className="space-y-3">
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Regulate yourself first</p>
              <p className="text-sm">You cannot co-regulate a child from empty. If morning is chaos and your child is escalating — your regulation is the first priority. Three breaths. Drop your shoulders. Then engage. Your calm is their calm. (See the &quot;Co-Regulation&quot; Quick Read for more.)</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Communicate with the school early</p>
              <p className="text-sm">Don&apos;t wait until things are in crisis. Email the teacher in week one: &quot;My child finds transitions difficult. They may need extra time/warnings before changes. Here&apos;s what helps at home — it might help at school too.&quot; Most teachers want this information.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Lower the bar for both of you</p>
              <p className="text-sm">If your child is struggling, this is not the time to add enrichment activities, push homework perfection, or maintain a Pinterest-worthy lunchbox. Survival mode for both of you. The goal is: they feel safe enough to go back tomorrow.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">When It All Falls Apart (And It Will)</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Illness. A schedule change. A holiday that disrupts the rhythm. A bad week that cascades into a bad month. Your systems WILL collapse at some point. That&apos;s not failure — that&apos;s life with children.
          </p>
          <h3 className="text-lg font-medium text-foreground mt-4 mb-3">The restart protocol:</h3>
          <div className="bg-secondary/30 rounded-xl p-5 space-y-3">
            <p><strong className="text-foreground">Day 1 after disruption:</strong> Don&apos;t try to fix everything. Just do the launch pad and the morning minimum.</p>
            <p><strong className="text-foreground">Day 2:</strong> Add back one routine (bedtime OR morning, not both).</p>
            <p><strong className="text-foreground">Day 3:</strong> Add the second routine.</p>
            <p><strong className="text-foreground">By end of week:</strong> You&apos;re back to baseline. Not perfect. Baseline.</p>
          </div>
          <p className="mt-4">
            The key insight: you don&apos;t have to rebuild from scratch every time. You just have to restart the sequence. The neural pathways are still there — they just need reactivation. A collapse isn&apos;t starting over. It&apos;s rebooting.
          </p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">If You&apos;re Doing This Alone</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Much of back-to-school advice assumes a partner: &quot;split the mornings,&quot; &quot;tag team the homework,&quot; &quot;have dad do pickup.&quot; If you&apos;re doing this solo — whether single parenting, effectively solo parenting, or co-parenting with a difficult ex — the load is different. Not harder in a way that needs pity. Harder in a way that needs acknowledgment and different strategies.
          </p>
          <div className="space-y-3">
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Ruthlessly simplify</p>
              <p className="text-sm">With no one to delegate to, everything you take on is yours alone. This means the bar needs to be even lower. The lunch rotation. The capsule uniform. The &quot;no activities in September&quot; rule. Give yourself the first month to just survive the school run before adding anything else.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Build your micro-village</p>
              <p className="text-sm">One other parent who can be your emergency backup. A neighbour who can watch them for 20 minutes. A school breakfast club that buys you morning breathing room. You don&apos;t need a village — you need 2-3 people and 2-3 systems.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">Prep like your morning self is a different person</p>
              <p className="text-sm">Because she is. Evening-you has more capacity than 7am-you. Do everything possible the night before: clothes out, bags packed, breakfast decided, shoes at the door. Morning-you just has to execute the plan evening-you made.</p>
            </div>
          </div>
        </div>
      </section>

      <p className="text-sm text-muted-foreground/70 text-center leading-relaxed">
        This guide is for educational and self-reflection purposes only. It is not a substitute for professional support. If you are in crisis, contact 988 (Suicide &amp; Crisis Lifeline) or your local emergency services.
      </p>
    </div>
  )
}
