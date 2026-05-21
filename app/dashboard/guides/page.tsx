"use client"

import { BookOpen, Calendar, Heart, Moon, Sparkles, Baby } from "lucide-react"
import { cn } from "@/lib/utils"

const guides = [
  {
    icon: <Calendar className="w-5 h-5" />,
    title: "Back to School Survival Guide",
    description: "New routines, new teachers, new forms. How to rebuild your systems without burning out in September.",
    color: "bg-blue-500/10 text-blue-600",
    available: true,
  },
  {
    icon: <Sparkles className="w-5 h-5" />,
    title: "Holiday Season Without Burnout",
    description: "Gift buying, event scheduling, family gatherings, cooking expectations. Your December survival plan.",
    color: "bg-red-500/10 text-red-600",
    available: true,
  },
  {
    icon: <Heart className="w-5 h-5" />,
    title: "The Relationship Maintenance Guide",
    description: "Division of labor, the recurring chores argument, explaining your brain to your partner, and low-energy connection.",
    color: "bg-pink-500/10 text-pink-600",
    available: true,
  },
  {
    icon: <Moon className="w-5 h-5" />,
    title: "Sleep & The ADHD Brain",
    description: "Why your brain resists bedtime, the 'can't turn off' toolkit, and realistic sleep strategies.",
    color: "bg-indigo-500/10 text-indigo-600",
    available: true,
  },
  {
    icon: <Baby className="w-5 h-5" />,
    title: "The Hormonal Connection",
    description: "How your menstrual cycle affects ADHD symptoms, why some weeks are harder, and how to plan around it.",
    color: "bg-purple-500/10 text-purple-600",
    available: true,
  },
  {
    icon: <Sparkles className="w-5 h-5" />,
    title: "Reclaiming Your Identity",
    description: "Who you were before kids, the guilt of wanting time alone, unmasking, and redefining what success looks like.",
    color: "bg-amber-500/10 text-amber-600",
    available: true,
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
        {guides.map((guide, idx) => (
          <div
            key={idx}
            className="bg-card rounded-2xl p-6 border border-border"
          >
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-3", guide.color)}>
              {guide.icon}
            </div>
            <h2 className="text-lg font-medium text-foreground mb-1">{guide.title}</h2>
            <p className="text-sm text-muted-foreground">{guide.description}</p>
            <span className="inline-block mt-3 text-xs font-medium text-muted-foreground bg-secondary px-2 py-0.5 rounded">Coming soon</span>
          </div>
        ))}
      </div>

      <div className="text-center pt-4">
        <p className="text-xs text-muted-foreground">
          New guides are added regularly. All content is for educational purposes only.
        </p>
      </div>
    </div>
  )
}
