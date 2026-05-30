"use client"

import { useState, useEffect } from "react"
import { canAccessPremium } from "@/lib/access-control"
import { UpgradeGate } from "@/components/upgrade-gate"

interface PremiumContentProps {
  children: React.ReactNode
  context?: "pathway" | "coach" | "dashboard"
}

/**
 * Wraps content that requires a paid subscription.
 * Shows the upgrade gate if user doesn't have access.
 */
export function PremiumContent({ children, context = "dashboard" }: PremiumContentProps) {
  const [hasAccess, setHasAccess] = useState<boolean | null>(null)

  useEffect(() => {
    setHasAccess(canAccessPremium())
  }, [])

  // Don't render anything until we've checked (prevents flash)
  if (hasAccess === null) return null

  if (!hasAccess) {
    return (
      <div className="py-8">
        <UpgradeGate context={context} />
      </div>
    )
  }

  return <>{children}</>
}
