"use client"

import { useState } from "react"
import { Check, Shield, Sparkles, Brain, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { setSubscription } from "@/lib/access-control"

interface UpgradeGateProps {
  context?: "pathway" | "coach" | "dashboard"
  onUnlocked?: () => void
}

const benefits = [
  "All 7 deeper pathway reflections",
  "Your full unified profile with stacking chains and leverage points",
  "AI Coach that knows your patterns and gives personalized support",
  "Script library — ready-to-use words for repair, boundaries, and hard conversations",
  "Daily rhythm templates for high-spoon, low-spoon, and crisis days",
  "Printable tools, visual checklists, and routine cards",
  "Guides on hormones, sleep, relationships, and identity",
  "Emergency toolkit for the moments you're about to snap",
]

const contextMessages: Record<string, { title: string; subtitle: string }> = {
  pathway: {
    title: "You've explored 2 pathways. Your patterns are becoming clear.",
    subtitle: "Unlock all 7 pathways to see the full picture — how your patterns stack, where to intervene first, and strategies built specifically for your brain.",
  },
  coach: {
    title: "Your AI Coach is ready — it already knows your patterns.",
    subtitle: "Unlock personalized coaching conversations informed by your Overwhelm Snapshot and pathway reflections. No generic advice — just support that fits.",
  },
  dashboard: {
    title: "Your toolkit is built around your specific patterns.",
    subtitle: "Scripts, rhythms, printables, and guides — all matched to what your profile reveals about how you function best.",
  },
}

export function UpgradeGate({ context = "pathway", onUnlocked }: UpgradeGateProps) {
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "annual">("annual")
  const [isProcessing, setIsProcessing] = useState(false)

  const msg = contextMessages[context]

  const handleSubscribe = () => {
    setIsProcessing(true)
    // TODO: Replace with actual Stripe checkout
    // For now, simulate payment success
    setTimeout(() => {
      setSubscription(selectedPlan)
      setIsProcessing(false)
      onUnlocked?.()
      // Reload to reflect new access
      window.location.reload()
    }, 1500)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-card rounded-3xl p-8 md:p-10 shadow-sm border border-border">
        {/* Context-specific header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Your profile is taking shape
          </div>
          <h2 className="text-2xl md:text-3xl font-medium text-foreground mb-3 text-balance">
            {msg.title}
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            {msg.subtitle}
          </p>
        </div>

        {/* What's included */}
        <div className="bg-secondary/50 rounded-2xl p-6 md:p-8 mb-8">
          <h3 className="text-base font-medium text-foreground mb-4 flex items-center gap-2">
            <Brain className="w-4 h-4 text-primary" />
            Everything included:
          </h3>
          <ul className="space-y-2.5">
            {benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-primary-foreground" />
                </div>
                <span className="text-foreground/80 text-sm">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Plan selection */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={() => setSelectedPlan("monthly")}
            className={`relative rounded-2xl p-4 border-2 transition-all text-left ${
              selectedPlan === "monthly"
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/30"
            }`}
          >
            <p className="text-sm font-medium text-foreground">Monthly</p>
            <p className="text-2xl font-semibold text-foreground mt-1">$14.99</p>
            <p className="text-xs text-muted-foreground">/month</p>
          </button>
          <button
            onClick={() => setSelectedPlan("annual")}
            className={`relative rounded-2xl p-4 border-2 transition-all text-left ${
              selectedPlan === "annual"
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/30"
            }`}
          >
            <div className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-medium">
              Save 45%
            </div>
            <p className="text-sm font-medium text-foreground">Annual</p>
            <p className="text-2xl font-semibold text-foreground mt-1">$99</p>
            <p className="text-xs text-muted-foreground">/year · $8.25/mo</p>
          </button>
        </div>

        {/* CTA */}
        <Button
          onClick={handleSubscribe}
          disabled={isProcessing}
          size="lg"
          className="w-full py-6 text-lg rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
        >
          {isProcessing ? "Processing..." : `Unlock Everything — ${selectedPlan === "annual" ? "$99/year" : "$14.99/month"}`}
        </Button>

        <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
          <Shield className="w-4 h-4" />
          <span>Cancel anytime · No commitment · Instant access</span>
        </div>

        {/* Positioning */}
        <p className="text-xs text-muted-foreground text-center mt-4">
          Less than one therapy session per month. Built specifically for how your brain works.
        </p>
      </div>
    </div>
  )
}
