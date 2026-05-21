"use client"

import { useState, useEffect } from "react"
import { Gift, Copy, Check, Share2, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

function generateReferralCode(): string {
  // Generate a simple unique code
  return "MM-" + Math.random().toString(36).substring(2, 8).toUpperCase()
}

export default function ReferPage() {
  const [referralCode, setReferralCode] = useState("")
  const [copied, setCopied] = useState(false)
  const [referralCount, setReferralCount] = useState(0)

  useEffect(() => {
    // Load or generate referral code from localStorage
    const stored = localStorage.getItem("mindful-mama-referral-code")
    if (stored) {
      setReferralCode(stored)
    } else {
      const code = generateReferralCode()
      localStorage.setItem("mindful-mama-referral-code", code)
      setReferralCode(code)
    }

    // Load referral count
    const count = localStorage.getItem("mindful-mama-referral-count")
    if (count) setReferralCount(parseInt(count, 10))
  }, [])

  const referralLink = typeof window !== "undefined"
    ? `${window.location.origin}?ref=${referralCode}`
    : ""

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      const input = document.createElement("input")
      input.value = referralLink
      document.body.appendChild(input)
      input.select()
      document.execCommand("copy")
      document.body.removeChild(input)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const shareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Mindful Mama — ADHD Parenting Assessment",
          text: "This helped me understand why parenting feels so hard with my ADHD brain. Take the 8-minute assessment — it's worth it.",
          url: referralLink,
        })
      } catch {}
    } else {
      copyLink()
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Gift className="w-7 h-7 text-primary" />
        </div>
        <h1 className="text-2xl md:text-3xl font-medium text-foreground mb-2">
          Share With a Mom Who Needs This
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          When a friend takes the assessment using your link, you get a <strong>free month of AI Coach</strong> access.
        </p>
      </div>

      {/* How it works */}
      <div className="bg-card rounded-2xl p-6 border border-border">
        <h2 className="font-medium text-foreground mb-4">How it works</h2>
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-medium text-primary">1</span>
            </div>
            <p className="text-sm text-foreground/80 pt-1">Share your unique link with a mom who might benefit</p>
          </div>
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-medium text-primary">2</span>
            </div>
            <p className="text-sm text-foreground/80 pt-1">She takes the assessment and unlocks her report ($12.99)</p>
          </div>
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-medium text-primary">3</span>
            </div>
            <p className="text-sm text-foreground/80 pt-1">You get 1 free month of AI Parenting Coach — automatically</p>
          </div>
        </div>
      </div>

      {/* Referral link */}
      <div className="bg-card rounded-2xl p-6 border border-border">
        <h2 className="font-medium text-foreground mb-3">Your referral link</h2>
        <div className="flex gap-2">
          <div className="flex-1 px-4 py-3 rounded-xl bg-secondary/50 border border-border text-sm text-foreground/70 truncate">
            {referralLink}
          </div>
          <Button
            onClick={copyLink}
            variant="outline"
            className="rounded-xl flex-shrink-0"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </Button>
        </div>

        <div className="flex gap-2 mt-4">
          <Button
            onClick={shareLink}
            className="flex-1 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share Link
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-card rounded-2xl p-6 border border-border text-center">
        <p className="text-3xl font-semibold text-foreground">{referralCount}</p>
        <p className="text-sm text-muted-foreground mt-1">
          {referralCount === 1 ? "friend has" : "friends have"} used your link
        </p>
        {referralCount > 0 && (
          <p className="text-sm text-primary mt-2 font-medium">
            🎉 You&apos;ve earned {referralCount} free {referralCount === 1 ? "month" : "months"} of AI Coach!
          </p>
        )}
      </div>

      {/* Suggested message */}
      <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
        <div className="flex items-center gap-2 mb-3">
          <Heart className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground">Suggested message to send</span>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border">
          <p className="text-sm text-foreground/80 leading-relaxed">
            &quot;Hey — I took this ADHD parenting assessment and it genuinely helped me understand why mornings/organization/sensory stuff feels so impossible. It&apos;s not a diagnosis thing, more like a &apos;here&apos;s how your brain works and what to do about it&apos; thing. Thought of you. No pressure, but here&apos;s the link if you want to check it out: [your link]&quot;
          </p>
        </div>
      </div>
    </div>
  )
}
