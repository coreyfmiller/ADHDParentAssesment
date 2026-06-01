"use client"

import Link from "next/link"
import Image from "next/image"
import { BookOpen, ArrowRight } from "lucide-react"

const guides = [
  {
    slug: "relationship-maintenance",
    image: "/images/hearthshape.png",
    title: "The Relationship Maintenance Guide",
    description: "Division of labor, the recurring argument, explaining your brain to your partner, and staying connected when you're both depleted.",
  },
  {
    slug: "sleep-and-the-brain",
    image: "/images/moon2.png",
    title: "Sleep & The Overwhelmed Brain",
    description: "Why your brain resists bedtime, the racing-mind toolkit, revenge bedtime procrastination, and realistic sleep strategies that account for night wakings.",
  },
  {
    slug: "hormonal-connection",
    image: "/images/circle2.png",
    title: "The Hormonal Connection",
    description: "How your cycle affects executive function, why some weeks are harder, perimenopause, and planning around your biology.",
  },
  {
    slug: "reclaiming-identity",
    image: "/images/silhouette2.png",
    title: "Reclaiming Your Identity",
    description: "Who you were before kids, the guilt of wanting time alone, the difference between self-care and identity, and rebuilding a sense of self.",
  },
  {
    slug: "back-to-school",
    image: "/images/buildingblocks.png",
    title: "Back to School Survival Guide",
    description: "New routines, new teachers, new forms. How to rebuild your systems without burning out in September.",
  },
  {
    slug: "holiday-survival",
    image: "/images/hands2.png",
    title: "Holiday Season Without Burnout",
    description: "Gift buying, event scheduling, family gatherings, and the emotional labor of making magic for everyone else.",
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
            className="bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 hover:shadow-sm transition-all group"
          >
            <div className="aspect-[2/1] relative bg-secondary/30">
              <Image
                src={guide.image}
                alt={guide.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-5">
              <h2 className="text-base font-medium text-foreground mb-1 group-hover:text-primary transition-colors">{guide.title}</h2>
              <p className="text-sm text-muted-foreground mb-3">{guide.description}</p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                Read guide <ArrowRight className="w-3 h-3" />
              </span>
            </div>
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
