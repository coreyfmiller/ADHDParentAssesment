// ============================================================
// Access Control — Manages free tier vs paid access
// ============================================================

const SUBSCRIPTION_KEY = "mindful-mama-subscription"
const FREE_PATHWAY_LIMIT = 2

export interface SubscriptionState {
  isPaid: boolean
  plan: "monthly" | "annual" | null
  subscribedAt: number | null
  expiresAt: number | null
}

/**
 * Check if user has an active subscription
 */
export function getSubscription(): SubscriptionState {
  try {
    const data = localStorage.getItem(SUBSCRIPTION_KEY)
    if (!data) return { isPaid: false, plan: null, subscribedAt: null, expiresAt: null }
    const sub = JSON.parse(data) as SubscriptionState
    // Check expiry
    if (sub.expiresAt && Date.now() > sub.expiresAt) {
      return { isPaid: false, plan: null, subscribedAt: null, expiresAt: null }
    }
    return sub
  } catch {
    return { isPaid: false, plan: null, subscribedAt: null, expiresAt: null }
  }
}

/**
 * Save subscription state (called after successful payment)
 */
export function setSubscription(plan: "monthly" | "annual"): void {
  const now = Date.now()
  const duration = plan === "monthly" ? 30 * 24 * 60 * 60 * 1000 : 365 * 24 * 60 * 60 * 1000
  const sub: SubscriptionState = {
    isPaid: true,
    plan,
    subscribedAt: now,
    expiresAt: now + duration,
  }
  try {
    localStorage.setItem(SUBSCRIPTION_KEY, JSON.stringify(sub))
  } catch {}
}

/**
 * Get the number of completed pathways
 */
export function getCompletedPathwayCount(): number {
  const slugs = [
    "executive-function",
    "depletion-burnout",
    "sensory-overwhelm",
    "systemic-load",
    "hormonal-patterns",
    "sleep-recovery",
    "trauma-nervous-system",
  ]
  let count = 0
  try {
    for (const slug of slugs) {
      if (localStorage.getItem(`mindful-mama-pathway-result-${slug}`)) {
        count++
      }
    }
  } catch {}
  return count
}

/**
 * Check if user can access a pathway (free tier allows 2)
 */
export function canAccessPathway(slug: string): boolean {
  const sub = getSubscription()
  if (sub.isPaid) return true

  // Check if this pathway is already completed (always allow re-viewing)
  try {
    if (localStorage.getItem(`mindful-mama-pathway-result-${slug}`)) return true
  } catch {}

  // Check if under the free limit
  return getCompletedPathwayCount() < FREE_PATHWAY_LIMIT
}

/**
 * Check if user can access premium features (coach, dashboard content)
 */
export function canAccessPremium(): boolean {
  return getSubscription().isPaid
}

/**
 * Check if user should see the upgrade prompt
 */
export function shouldShowUpgrade(): boolean {
  const sub = getSubscription()
  if (sub.isPaid) return false
  return getCompletedPathwayCount() >= FREE_PATHWAY_LIMIT
}
