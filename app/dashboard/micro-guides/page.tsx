"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function MicroGuidesRedirect() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/dashboard/guides?tab=quick-reads")
  }, [router])

  return (
    <div className="flex items-center justify-center py-12">
      <p className="text-sm text-muted-foreground">Redirecting to Quick Reads...</p>
    </div>
  )
}
