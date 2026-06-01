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
          New routines, new demands, new forms. How to rebuild without burning out by October.
        </p>
      </div>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Why September Breaks You</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Summer has a rhythm — loose, forgiving, low-stakes. Then September hits like a wall: new schedules, new teachers, new expectations, forms to sign, supplies to buy, routines to establish, lunches to pack, homework to manage, activities to coordinate. All at once. With no ramp-up period.
          </p>
          <p>
            For a brain that struggles with transitions, executive function, or working memory — this isn&apos;t just stressful. It&apos;s a system crash. Everything that was &quot;fine&quot; during summer suddenly isn&apos;t, because the cognitive demand just tripled overnight.
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
          <p className="mt-4">Routines take 2-4 weeks to become automatic. Expecting them to work on day one is setting yourself up for shame.</p>
        </div>
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-medium text-foreground mb-4">Systems That Survive October</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>Most back-to-school systems collapse by mid-October because they were built for your best self, not your real self. Build for your worst Tuesday instead:</p>
          <div className="space-y-3">
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">The Launch Pad</p>
              <p className="text-sm">One physical station by the door. Hooks for bags, bin for shoes, tray for forms/keys/water bottles. Everything needed to leave the house lives here. If it&apos;s not at the launch pad, it doesn&apos;t go. No exceptions, no hunting.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">The Sunday 15</p>
              <p className="text-sm">Every Sunday, spend 15 minutes (set a timer): check the week&apos;s calendar, pack what you can, sign anything that needs signing, lay out Monday&apos;s clothes. Not the whole week. Just Monday. And check the calendar. That&apos;s it.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">The Lunch Rotation</p>
              <p className="text-sm">5 lunches. Rotating. Written on a card stuck inside the pantry. Monday is always sandwich. Tuesday is always wrap. No decisions. No creativity. Just execution. Decision fatigue is the enemy of morning routines.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">The Communication Funnel</p>
              <p className="text-sm">Tell the school: &quot;Please email important notices rather than sending paper home in backpacks. I process written digital communication more reliably.&quot; Most schools will accommodate this. If they won&apos;t, set a daily alarm: &quot;CHECK BACKPACK&quot; at 4pm.</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-4">
              <p className="font-medium text-foreground mb-1">The &quot;Good Enough&quot; Morning</p>
              <p className="text-sm">Define it: everyone dressed, everyone fed something, everyone at school with their bag. That&apos;s the bar. Hair brushed? Bonus. Matching socks? Irrelevant. Homemade lunch? Not required. Lower the bar to something achievable on your worst day.</p>
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
          <p>The restart protocol:</p>
          <div className="bg-secondary/30 rounded-xl p-5 space-y-3">
            <p><strong className="text-foreground">Day 1 after disruption:</strong> Don&apos;t try to fix everything. Just do the launch pad and the morning minimum.</p>
            <p><strong className="text-foreground">Day 2:</strong> Add back one routine (bedtime OR morning, not both).</p>
            <p><strong className="text-foreground">Day 3:</strong> Add the second routine.</p>
            <p><strong className="text-foreground">By end of week:</strong> You&apos;re back to baseline. Not perfect. Baseline.</p>
          </div>
          <p className="mt-4">
            The key insight: you don&apos;t have to rebuild from scratch every time. You just have to restart the sequence. The neural pathways are still there — they just need reactivation.
          </p>
        </div>
      </section>

      <p className="text-sm text-muted-foreground/70 text-center leading-relaxed">
        This guide is for educational and self-reflection purposes only.
      </p>
    </div>
  )
}
