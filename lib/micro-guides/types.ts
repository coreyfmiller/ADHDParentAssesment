// ============================================================
// Micro-Guides — Daily psychoeducation matched to archetype
// 2-3 minute reads that build self-understanding over time
// ============================================================

export interface MicroGuide {
  id: string
  title: string
  subtitle: string
  category: MicroGuideCategory
  archetypes: string[] // which archetypes this is most relevant for
  dimensions: string[] // which dimensions this relates to
  readTime: string // "2 min" or "3 min"
  body: string[] // paragraphs
  tryThis: string // one actionable takeaway
  remember: string // one-line reframe to carry with her
}

export type MicroGuideCategory =
  | "executive-function"
  | "emotional-regulation"
  | "physical-nervous-system"
  | "hormonal"
  | "relationships"
  | "identity"
  | "systems-structure"
  | "parenting"

export const CATEGORY_LABELS: Record<MicroGuideCategory, string> = {
  "executive-function": "Executive Function",
  "emotional-regulation": "Emotional Regulation",
  "physical-nervous-system": "Body & Nervous System",
  "hormonal": "Hormonal Patterns",
  "relationships": "Relationships",
  "identity": "Identity & Self",
  "systems-structure": "Systems & Structure",
  "parenting": "Parenting",
}

export const CATEGORY_COLORS: Record<MicroGuideCategory, string> = {
  "executive-function": "bg-purple-500/10 text-purple-600",
  "emotional-regulation": "bg-rose-500/10 text-rose-600",
  "physical-nervous-system": "bg-amber-500/10 text-amber-600",
  "hormonal": "bg-indigo-500/10 text-indigo-600",
  "relationships": "bg-emerald-500/10 text-emerald-600",
  "identity": "bg-sky-500/10 text-sky-600",
  "systems-structure": "bg-teal-500/10 text-teal-600",
  "parenting": "bg-pink-500/10 text-pink-600",
}
