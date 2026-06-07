// ============================================================
// User Basics — Core demographic/life context
//
// Collected once after first check-in. Used everywhere to
// personalize content, reflections, scripts, and coach context.
// Includes condition identifiers for content filtering.
// ============================================================

const BASICS_KEY = "mindful-mama-user-basics"
const LIFE_UPDATE_KEY = "mindful-mama-last-life-update"

export interface UserBasics {
  kidAges: KidAge[]
  partnerStatus: PartnerStatus
  ageRange: AgeRange
  conditions: Condition[]
  extras: string[]
  completedAt: number
  lastUpdated: number
}

export type KidAge = "infant" | "toddler" | "preschool" | "school-age" | "tween" | "teen"
export type PartnerStatus = "together" | "coparenting-separate" | "solo" | ""
export type AgeRange = "under-25" | "25-34" | "35-44" | "45-plus" | ""

export type Condition =
  | "adhd"
  | "autism"
  | "postpartum"
  | "perimenopause"
  | "hormonal-cycle"
  | "anxiety-depression"
  | "trauma"
  | "none-unsure"

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

export const CONDITION_LABELS: Record<Condition, string> = {
  adhd: "I have (or suspect) ADHD",
  autism: "I have (or suspect) autism",
  postpartum: "I'm currently postpartum (baby under 12 months)",
  perimenopause: "I'm in perimenopause or menopause",
  "hormonal-cycle": "I notice hormonal changes affect my capacity",
  "anxiety-depression": "I have a history of anxiety or depression",
  trauma: "I have a trauma background",
  "none-unsure": "None of these / I'm not sure yet",
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
  basics.lastUpdated = Date.now()
  try {
    localStorage.setItem(BASICS_KEY, JSON.stringify(basics))
  } catch {}
}

export function hasCompletedBasics(): boolean {
  return getUserBasics() !== null
}

// ---- Content Relevance ----

export type ContentTag =
  | "universal"        // shows for everyone
  | "adhd"            // only if she identified ADHD
  | "autism"          // only if she identified autism
  | "postpartum"     // only if infant + postpartum selected
  | "perimenopause"  // only if 35+ or selected perimenopause
  | "hormonal"       // if she noted hormonal changes
  | "trauma"         // if she identified trauma background
  | "executive-function" // if cognitive load is elevated
  | "sensory"        // if sensory overwhelm is elevated
  | "depletion"      // if physical depletion is elevated
  | "identity"       // if identity erosion is elevated
  | "relationships"  // if system friction/attachment is elevated
  | "infant-parent"  // has infant
  | "toddler-parent" // has toddler
  | "school-parent"  // has school-age
  | "teen-parent"    // has teen

/**
 * Determine which content tags are relevant for this user.
 * Used to filter micro-guides, scripts, and daily content.
 */
export function getUserContentTags(): ContentTag[] {
  const basics = getUserBasics()
  const tags: ContentTag[] = ["universal"]

  if (!basics) return tags

  // Condition-based tags
  if (basics.conditions?.includes("adhd")) tags.push("adhd")
  if (basics.conditions?.includes("autism")) tags.push("autism")
  if (basics.conditions?.includes("postpartum")) tags.push("postpartum")
  if (basics.conditions?.includes("perimenopause")) tags.push("perimenopause")
  if (basics.conditions?.includes("hormonal-cycle")) tags.push("hormonal")
  if (basics.conditions?.includes("anxiety-depression")) tags.push("depletion")
  if (basics.conditions?.includes("trauma")) tags.push("trauma")

  // Age-based inference
  if (basics.ageRange === "35-44" || basics.ageRange === "45-plus") {
    // Perimenopause content is relevant for 35+ even if not explicitly selected
    if (!tags.includes("perimenopause")) tags.push("perimenopause")
    tags.push("hormonal")
  }

  // Kid-age-based tags
  if (basics.kidAges?.includes("infant")) { tags.push("infant-parent"); tags.push("postpartum") }
  if (basics.kidAges?.includes("toddler")) tags.push("toddler-parent")
  if (basics.kidAges?.includes("school-age") || basics.kidAges?.includes("tween")) tags.push("school-parent")
  if (basics.kidAges?.includes("teen")) tags.push("teen-parent")

  // Pattern-map-based tags (from localStorage)
  try {
    const mapData = localStorage.getItem("mindful-mama-pattern-map")
    if (mapData) {
      const map = JSON.parse(mapData)
      for (const dim of map.dimensions || []) {
        if (dim.intensity === "high" || dim.intensity === "critical") {
          if (dim.dimension === "cognitive-load") tags.push("executive-function")
          if (dim.dimension === "emotional-bandwidth") tags.push("depletion")
          if (dim.dimension === "physical-depletion") tags.push("depletion")
          if (dim.dimension === "system-friction") tags.push("relationships")
          if (dim.dimension === "identity-erosion") tags.push("identity")
        }
      }
    }
  } catch {}

  // Deduplicate
  return [...new Set(tags)]
}

/**
 * Check if a piece of content with given tags is relevant for this user.
 * Content is relevant if ANY of its tags match the user's tags.
 * Content tagged only as "universal" always shows.
 */
export function isContentRelevant(contentTags: ContentTag[]): boolean {
  // Universal content always shows
  if (contentTags.includes("universal")) return true

  const userTags = getUserContentTags()
  return contentTags.some((tag) => userTags.includes(tag))
}

// ---- Life Update Prompts ----

/**
 * Check if we should prompt her to update her basics.
 * Returns true if:
 * - It's been 6+ months since last update
 * - Her age range might have shifted (approaching menopause age)
 * - She has an infant who might now be a toddler
 */
export function shouldPromptLifeUpdate(): boolean {
  const basics = getUserBasics()
  if (!basics) return false

  const lastUpdate = basics.lastUpdated || basics.completedAt
  const sixMonths = 180 * 24 * 60 * 60 * 1000

  // Check if last prompt was dismissed recently
  try {
    const lastPrompt = localStorage.getItem(LIFE_UPDATE_KEY)
    if (lastPrompt) {
      const lastPromptTime = parseInt(lastPrompt, 10)
      // Don't prompt again within 30 days of dismissal
      if (Date.now() - lastPromptTime < 30 * 24 * 60 * 60 * 1000) return false
    }
  } catch {}

  // Has it been 6+ months since last update?
  if (Date.now() - lastUpdate > sixMonths) return true

  return false
}

export function dismissLifeUpdate(): void {
  try {
    localStorage.setItem(LIFE_UPDATE_KEY, String(Date.now()))
  } catch {}
}
