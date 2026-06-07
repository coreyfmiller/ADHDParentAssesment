// ============================================================
// User Basics — Core demographic/life context
//
// Collected once after first check-in. Used everywhere to
// personalize content, reflections, scripts, and coach context.
// ============================================================

const BASICS_KEY = "mindful-mama-user-basics"

export interface UserBasics {
  kidAges: KidAge[]
  partnerStatus: PartnerStatus
  ageRange: AgeRange
  extras: string[] // free-text additions like "ADHD", "postpartum", "divorce"
  completedAt: number
}

export type KidAge = "infant" | "toddler" | "preschool" | "school-age" | "tween" | "teen"
export type PartnerStatus = "together" | "coparenting-separate" | "solo" | ""
export type AgeRange = "under-25" | "25-34" | "35-44" | "45-plus" | ""

export const KID_AGE_LABELS: Record<KidAge, string> = {
  infant: "Infant (0-12 months)",
  toddler: "Toddler (1-3)",
  preschool: "Preschool (3-5)",
  "school-age": "School-age (5-12)",
  tween: "Tween (10-13)",
  teen: "Teen (13+)",
}

export const PARTNER_LABELS: Record<string, string> = {
  together: "Parenting with a partner (same household)",
  "coparenting-separate": "Co-parenting separately",
  solo: "Solo parenting",
}

export const AGE_LABELS: Record<string, string> = {
  "under-25": "Under 25",
  "25-34": "25–34",
  "35-44": "35–44",
  "45-plus": "45+",
}

export function getUserBasics(): UserBasics | null {
  try {
    const data = localStorage.getItem(BASICS_KEY)
    if (!data) return null
    return JSON.parse(data)
  } catch {
    return null
  }
}

export function saveUserBasics(basics: UserBasics): void {
  try {
    localStorage.setItem(BASICS_KEY, JSON.stringify(basics))
  } catch {}
}

export function hasCompletedBasics(): boolean {
  return getUserBasics() !== null
}
