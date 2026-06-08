"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { BookOpen, ArrowRight, Clock, ChevronDown } from "lucide-react"
import { MICRO_GUIDES, type MicroGuide, CATEGORY_LABELS, type MicroGuideCategory } from "@/lib/micro-guides"
import { getUserContentTags, type ContentTag } from "@/lib/user-basics"

const deepDives = [
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
    description: "Why your brain resists bedtime, the racing-mind toolkit, revenge bedtime procrastination, and realistic sleep strategies.",
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
    description: "Who you were before kids, the guilt of wanting time alone, and rebuilding a sense of self.",
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
  {
    slug: "navigating-rage",
    image: "/images/hands2.png",
    title: "Navigating Rage",
    description: "The fury that terrifies you. Where it comes from, what it means, and what to do when you feel like you're going to explode.",
  },
  {
    slug: "your-body-after-kids",
    image: "/images/circle2.png",
    title: "Your Body After Kids",
    description: "The disconnect, the pain, being touched out — and the slow work of coming home to a body that's been through a war.",
  },
  {
    slug: "overwhelm-spiral",
    image: "/images/moon2.png",
    title: "The Overwhelm Spiral",
    description: "What's happening in your brain when everything stacks, why you can't 'just prioritise,' and how to find the floor.",
  },
  {
    slug: "burnout-recovery",
    image: "/images/silhouette2.png",
    title: "Burnout & Recovery",
    description: "When depletion becomes burnout. What recovery actually requires — because it's not a weekend off.",
  },
]

export default function GuidesPage() {
  const searchParams = useSearchParams()
  const tabParam = searchParams.get("tab")
  const [activeTab, setActiveTab] = useState<"deep-dives" | "quick-reads">(tabParam === "quick-reads" ? "quick-reads" : "deep-dives")
  const [categoryFilter, setCategoryFilter] = useState<MicroGuideCategory | "all">("all")
  const [expandedGuide, setExpandedGuide] = useState<string | null>(null)
  const [filteredGuides, setFilteredGuides] = useState<MicroGuide[]>([])

  useEffect(() => {
    // Filter guides by user's content tags
    const userTags = getUserContentTags()
    const relevant = MICRO_GUIDES.filter(g => {
      if (!g.tags || g.tags.length === 0) return true
      return g.tags.some(tag => userTags.includes(tag as ContentTag))
    })

    // Apply category filter
    if (categoryFilter === "all") {
      setFilteredGuides(relevant)
    } else {
      setFilteredGuides(relevant.filter(g => g.category === categoryFilter))
    }
  }, [categoryFilter])

  const categories = Object.keys(CATEGORY_LABELS) as MicroGuideCategory[]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-blue-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-medium text-foreground">Guides</h1>
        </div>
        <p className="text-muted-foreground">
          Learn at your own pace. Deep dives for when you have capacity, quick reads for everyday insight.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-secondary/50 rounded-xl p-1">
        <button
          onClick={() => setActiveTab("deep-dives")}
          className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
            activeTab === "deep-dives"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Deep Dives
        </button>
        <button
          onClick={() => setActiveTab("quick-reads")}
          className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
            activeTab === "quick-reads"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Quick Reads
          <span className="ml-1.5 text-xs text-muted-foreground">({filteredGuides.length})</span>
        </button>
      </div>

      {/* Deep Dives Tab */}
      {activeTab === "deep-dives" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {deepDives.map((guide) => (
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
      )}

      {/* Quick Reads Tab */}
      {activeTab === "quick-reads" && (
        <div className="space-y-4">
          {categoryFilter === "all" ? (
            /* Category Cards View */
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Tap a topic to explore.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {categories.map(cat => {
                  const count = filteredGuides.filter(g => g.category === cat).length
                  if (count === 0) return null
                  const colorMap: Record<string, string> = {
                    "executive-function": "bg-purple-500/10 text-purple-600",
                    "emotional-regulation": "bg-rose-500/10 text-rose-600",
                    "physical-nervous-system": "bg-amber-500/10 text-amber-600",
                    "hormonal": "bg-indigo-500/10 text-indigo-600",
                    "relationships": "bg-emerald-500/10 text-emerald-600",
                    "identity": "bg-sky-500/10 text-sky-600",
                    "systems-structure": "bg-teal-500/10 text-teal-600",
                    "parenting": "bg-pink-500/10 text-pink-600",
                  }
                  const colors = colorMap[cat] || "bg-secondary text-muted-foreground"
                  return (
                    <button
                      key={cat}
                      onClick={() => setCategoryFilter(cat)}
                      className="bg-card rounded-2xl p-5 border border-border hover:border-primary/30 hover:shadow-sm transition-all text-left group"
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${colors.split(" ")[0]} ${colors.split(" ")[1]}`}>
                        <span className="text-base font-medium">{count}</span>
                      </div>
                      <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        {CATEGORY_LABELS[cat]}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{count} quick reads</p>
                    </button>
                  )
                })}
              </div>
            </div>
          ) : (
            /* Guides within a category */
            <div className="space-y-4">
              <button
                onClick={() => setCategoryFilter("all")}
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                All topics
              </button>
              <h2 className="text-lg font-medium text-foreground">{CATEGORY_LABELS[categoryFilter]}</h2>

              <div className="space-y-3">
                {filteredGuides.filter(g => g.category === categoryFilter).map((guide) => (
                  <div
                    key={guide.id}
                    className="bg-card rounded-xl border border-border overflow-hidden"
                  >
                    {/* Header - always visible */}
                    <button
                      onClick={() => setExpandedGuide(expandedGuide === guide.id ? null : guide.id)}
                      className="w-full p-4 text-left flex items-start justify-between gap-3 hover:bg-secondary/30 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-foreground leading-tight">{guide.title}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">{guide.subtitle}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {guide.readTime}
                        </span>
                        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${
                          expandedGuide === guide.id ? "rotate-180" : ""
                        }`} />
                      </div>
                    </button>

                    {/* Expanded content */}
                    {expandedGuide === guide.id && (
                      <div className="px-4 pb-4 border-t border-border/50 pt-3 space-y-3">
                        {guide.body.map((paragraph, i) => (
                          <p key={i} className="text-sm text-muted-foreground leading-relaxed">
                            {paragraph}
                          </p>
                        ))}

                        {/* Try This */}
                        <div className="bg-primary/5 rounded-lg p-3 mt-3">
                          <p className="text-xs font-medium text-primary mb-1">Try this</p>
                          <p className="text-sm text-foreground">{guide.tryThis}</p>
                        </div>

                        {/* Remember */}
                        <div className="bg-secondary/50 rounded-lg p-3">
                          <p className="text-xs font-medium text-muted-foreground mb-1">Remember</p>
                          <p className="text-sm text-foreground italic">{guide.remember}</p>
                        </div>

                        {/* Caveat if present */}
                        {guide.caveat && (
                          <p className="text-xs text-muted-foreground italic border-l-2 border-border pl-3">
                            {guide.caveat}
                          </p>
                        )}

                        {/* Grounding note if present */}
                        {guide.groundingNote && (
                          <p className="text-xs text-muted-foreground italic border-l-2 border-amber-300 pl-3">
                            {guide.groundingNote}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {filteredGuides.filter(g => g.category === categoryFilter).length === 0 && (
                <div className="text-center py-8">
                  <p className="text-sm text-muted-foreground">No guides in this category yet.</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="text-center pt-4">
        <p className="text-sm text-muted-foreground">
          All content is for educational and self-reflection purposes only.
        </p>
      </div>
    </div>
  )
}
