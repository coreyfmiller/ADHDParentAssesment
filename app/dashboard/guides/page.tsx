"use client"

import Link from "next/link"
import { BookOpen, Calendar, Heart, Moon, Sparkles, Baby, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

const guides = [
  {
    slug: "relationship-maintenance",
    icon: <Heart className="w-5 h-5" />,
    title: "The Relationship Maintenance Guide",
    description: "Division of labor, the recurring argument, explaining your brain to your partner, and staying connected when you're both depleted.",
    color: "bg-pink-500/10 text-pink-600",
  },
  {
    slug: "sleep-and-the-brain",
    icon: <Moon className="w-5 h-5" />,
    title: "Sleep & The Overwhelmed Brain",
    description: "Why your brain resists bedtime, the racing-mind toolkit, revenge bedtime procrastination, and realistic sleep strategies that account for night wakings.",
    color: "bg-indigo-500/10 text-indigo-600",
  },
  {
    slug: "hormonal-connection",
    icon: <Baby className="w-5 h-5" />,
    title: "The Hormonal Connection",
    description: "How your cycle affects executive function, why some weeks are harder, perimenopause and the 'am I losing my mind' experience, and planning around your biology.",
    color: "bg-purple-500/10 text-purple-600",
  },
  {
    slug: "reclaiming-identity",
    icon: <Sparkles className="w-5 h-5" />,
    title: "Reclaiming Your Identity",
    description: "Who you were before kids, the guilt of wanting time alone, the difference between self-care and identity, and rebuilding a sense of self inside motherhood.",
    color: "bg-amber-500/10 text-amber-600",
  },
  {
    slug: "back-to-school",
    icon: <Calendar className="w-5 h-5" />,
    title: "Back to School Survival Guide",
    description: "New routines, new teachers, new forms. How to rebuild your systems without burning out in September — and what to do when they collapse by October.",
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    slug: "holiday-survival",
    icon: <Sparkles className="w-5 h-5" />,
    title: "Holiday Season Without Burnout",
    description: "Gift buying, event scheduling, family gatherings, cooking expectations, and the emotional labor of making magic for everyone else. Your December survival plan.",
    color: "bg-red-500/10 text-red-600",
  },
]

export default function GuidesPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-blue-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-medium text-foreground">Guides</h1>
        </div>
        <p className="text-muted-foreground">
          Deeper dives into specific challenges. Read when you have capacity — not when you&apos;re in crisis.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/dashboard/guides/${guide.slug}`}
            className="bg-card rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-sm transition-all group"
          >
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-3", guide.color)}>
              {guide.icon}
            </div>
            <h2 className="text-lg font-medium text-foreground mb-1 group-hover:text-primary transition-colors">{guide.title}</h2>
            <p className="text-sm text-muted-foreground mb-3">{guide.description}</p>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
              Read guide <ArrowRight className="w-3 h-3" />
            </span>
          </Link>
        ))}
      </div>

      <div className="text-center pt-4">
        <p className="text-sm text-muted-foreground">
          All content is for educational and self-reflection purposes only.
        </p>
      </div>
    </div>
  )
}
