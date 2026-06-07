"use client"

import Link from "next/link"
import { BookOpen, MessageCircle, Coffee, FileText, GraduationCap, ArrowRight, Bookmark, Brain } from "lucide-react"

const sections = [
  {
    href: "/dashboard/library/reflections",
    icon: Brain,
    title: "Your Reflections",
    description: "Revisit your pathway results — every answer you gave, preserved and accessible.",
    badge: "Personal",
  },
  {
    href: "/dashboard/saved",
    icon: Bookmark,
    title: "Saved",
    description: "Your bookmarked insights, strategies, and moments that resonated.",
    badge: "Personal",
  },
  {
    href: "/dashboard/micro-guides",
    icon: GraduationCap,
    title: "Micro-Guides",
    description: "Daily 2-minute reads on why your brain works the way it does — and what to do about it.",
  },
  {
    href: "/dashboard/scripts",
    icon: MessageCircle,
    title: "Script Library",
    description: "Ready-to-use words for repair, boundaries, partner conversations, and hard moments.",
  },
  {
    href: "/dashboard/rhythms",
    icon: Coffee,
    title: "Daily Rhythms",
    description: "Templates for high-spoon, low-spoon, and crisis days. Plus the meal system.",
  },
  {
    href: "/dashboard/printables",
    icon: FileText,
    title: "Checklists",
    description: "Interactive routines, grocery lists, and tools designed for ADHD brains.",
  },
  {
    href: "/dashboard/guides",
    icon: BookOpen,
    title: "Deep Guides",
    description: "Longer reads: seasonal survival, relationships, hormones, sleep, and identity.",
  },
]

export default function LibraryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-medium text-foreground mb-2">Library</h1>
        <p className="text-muted-foreground">
          Everything you need — scripts, rhythms, checklists, and guides. Browse what resonates.
        </p>
      </div>

      <div className="space-y-3">
        {sections.map((section) => {
          const Icon = section.icon
          return (
            <Link
              key={section.href}
              href={section.href}
              className="block bg-card rounded-2xl p-5 border border-border hover:border-primary/30 hover:shadow-sm transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h2 className="text-base font-medium text-foreground group-hover:text-primary transition-colors">
                      {section.title}
                    </h2>
                    {section.badge && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                        {section.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{section.description}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary flex-shrink-0 mt-3 transition-colors" />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
