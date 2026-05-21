"use client"

import Link from "next/link"
import { Brain, Zap, Coffee, MessageCircle, BookOpen, FileText } from "lucide-react"

const sections = [
  {
    href: "/dashboard/toolkit",
    icon: Zap,
    title: "Emergency Toolkit",
    description: "In-the-moment support when you're about to snap, just snapped, or can't start.",
    color: "bg-red-500/10 text-red-600",
  },
  {
    href: "/dashboard/scripts",
    icon: MessageCircle,
    title: "Script Library",
    description: "Ready-to-use words for repair, boundaries, partner conversations, and more.",
    color: "bg-primary/10 text-primary",
  },
  {
    href: "/dashboard/rhythms",
    icon: Coffee,
    title: "Daily Rhythms",
    description: "Templates for high-spoon, low-spoon, and crisis days. Plus the meal system.",
    color: "bg-amber-500/10 text-amber-600",
  },
  {
    href: "/dashboard/guides",
    icon: BookOpen,
    title: "Guides",
    description: "Deep dives: seasonal survival, relationships, hormones, sleep, and identity.",
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    href: "/dashboard/printables",
    icon: FileText,
    title: "Printables",
    description: "Visual checklists, routine cards, and tools to stick on your fridge.",
    color: "bg-green-500/10 text-green-600",
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-medium text-foreground mb-2">Welcome back</h1>
        <p className="text-muted-foreground">
          Your parenting toolkit — built for how your brain actually works.
        </p>
      </div>

      {/* Quick access grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map((section) => {
          const Icon = section.icon
          return (
            <Link
              key={section.href}
              href={section.href}
              className="bg-card rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-sm transition-all group"
            >
              <div className={`w-10 h-10 rounded-xl ${section.color} flex items-center justify-center mb-3`}>
                <Icon className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-medium text-foreground mb-1 group-hover:text-primary transition-colors">
                {section.title}
              </h2>
              <p className="text-sm text-muted-foreground">{section.description}</p>
            </Link>
          )
        })}
      </div>

      {/* Quick reminder */}
      <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10 text-center">
        <p className="text-foreground/80 text-sm">
          Remember: pick <strong>one thing</strong> at a time. Not the whole toolkit. Just the one thing that will help you most today.
        </p>
      </div>
    </div>
  )
}
