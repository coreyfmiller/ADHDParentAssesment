"use client"

import { Check, Shield, Heart, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PaywallProps {
  onUnlock: () => void
  isLoading?: boolean
}

const benefits = [
  "Your personalized ADHD Parenting Profile with specific strengths identified",
  "Concrete, low-friction strategies matched to YOUR overwhelm patterns",
  "Repair scripts for reconnecting with your child after hard moments",
  "Sensory overload management plan tailored to your triggers",
  "Energy-based routines — what to do on high-spoon vs. low-spoon days",
  "Visual system recommendations that work with your brain, not against it",
]

export function Paywall({ onUnlock, isLoading = false }: PaywallProps) {
  return (
    <div className="space-y-6">
      {/* Teaser */}
      <div className="bg-card rounded-3xl p-8 md:p-10 shadow-sm border border-border">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Brain className="w-4 h-4" />
            Your Profile is Ready
          </div>
          <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-4 text-balance">
            You&apos;re Not a Bad Mom.<br />Your Brain Just Works Differently.
          </h2>
          <p className="text-lg text-muted-foreground max-w-lg mx-auto">
            Based on your answers, we&apos;ve built a personalized parenting profile with strategies designed specifically for how your brain processes the world.
          </p>
        </div>

        {/* Preview of what they'll get */}
        <div className="bg-secondary/50 rounded-2xl p-6 md:p-8 mb-8">
          <h3 className="text-lg font-medium text-foreground mb-5 flex items-center gap-2">
            <Heart className="w-5 h-5 text-primary" />
            Your full report includes:
          </h3>
          <ul className="space-y-4">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-primary-foreground" />
                </div>
                <span className="text-foreground/90">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Social proof */}
        <div className="bg-primary/5 rounded-2xl p-5 mb-8 border border-primary/10">
          <p className="text-foreground/80 italic text-center">
            &quot;I cried reading my results — not from shame, but because someone finally understood what mornings feel like in my house.&quot;
          </p>
          <p className="text-sm text-muted-foreground text-center mt-2">— Sarah, mom of 3, diagnosed at 34</p>
        </div>

        <div className="text-center">
          <div className="mb-6">
            <span className="text-4xl font-semibold text-foreground">$12.99</span>
            <span className="text-muted-foreground ml-2">one-time access</span>
          </div>
          <Button
            onClick={onUnlock}
            disabled={isLoading}
            size="lg"
            className="w-full md:w-auto md:px-12 py-6 text-lg rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-200 hover:shadow-lg"
          >
            {isLoading ? "Processing..." : "Unlock My Parenting Profile"}
          </Button>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
            <Shield className="w-4 h-4" />
            <span>Secure payment · Instant access · Keep forever</span>
          </div>
        </div>
      </div>
    </div>
  )
}
