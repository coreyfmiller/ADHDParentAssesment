"use client"

import { useState } from "react"
import { track } from "@vercel/analytics"
import { Check, Shield, Heart, Brain, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PaywallProps {
  onUnlock: () => void
  isLoading?: boolean
}

const benefits = [
  "Your personalized ADHD Parenting Profile with specific sub-type identification",
  "6-8 concrete strategies per section, organized by 'This Week' and 'This Month'",
  "Ready-to-use repair scripts for different ages (toddler, school-age, teen)",
  "Sensory overload management plan tailored to your specific triggers",
  "Daily rhythm templates for high-spoon, low-spoon, and crisis days",
  "Partner & family communication scripts",
  "Permission slips and cognitive reframes for your shame patterns",
  "The neuroscience behind your challenges (so you can stop blaming yourself)",
]

export function Paywall({ onUnlock, isLoading = false }: PaywallProps) {
  const [email, setEmail] = useState("")
  const [emailSubmitted, setEmailSubmitted] = useState(false)

  const handleEmailSubmit = () => {
    if (email.includes("@")) {
      setEmailSubmitted(true)
      track("email_captured")
      // In production: send to email service (ConvertKit, Mailchimp, etc.)
    }
  }

  return (
    <div className="space-y-6">
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
            Based on your 25 answers, we&apos;ve built a deeply personalized
            parenting profile with strategies designed specifically for how
            your brain processes the world.
          </p>
        </div>

        {/* What's included */}
        <div className="bg-secondary/50 rounded-2xl p-6 md:p-8 mb-8">
          <h3 className="text-lg font-medium text-foreground mb-5 flex items-center gap-2">
            <Heart className="w-5 h-5 text-primary" />
            Your full report includes:
          </h3>
          <ul className="space-y-3">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-primary-foreground" />
                </div>
                <span className="text-foreground/90 text-sm">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Social proof */}
        <div className="bg-primary/5 rounded-2xl p-5 mb-6 border border-primary/10">
          <p className="text-foreground/80 italic text-center text-sm">
            &quot;I cried reading my results — not from shame, but because someone finally understood what mornings feel like in my house. I sent it to my husband and he finally gets it.&quot;
          </p>
          <p className="text-xs text-muted-foreground text-center mt-2">— Sarah, mom of 3, diagnosed at 34</p>
        </div>

        <div className="bg-primary/5 rounded-2xl p-5 mb-8 border border-primary/10">
          <p className="text-foreground/80 italic text-center text-sm">
            &quot;The repair scripts alone were worth it. I used one that night with my 7-year-old and she said &apos;Thanks for saying sorry, Mama.&apos; I&apos;m keeping this forever.&quot;
          </p>
          <p className="text-xs text-muted-foreground text-center mt-2">— Jessica, mom of 2, self-identified ADHD</p>
        </div>

        {/* Email capture */}
        {!emailSubmitted ? (
          <div className="bg-secondary/30 rounded-2xl p-5 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Mail className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Get your results emailed to you</span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              So you can reference them anytime — especially on the hard days.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-4 py-2.5 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <Button
                onClick={handleEmailSubmit}
                disabled={!email.includes("@")}
                className="rounded-xl bg-primary/80 hover:bg-primary text-primary-foreground px-4"
                size="sm"
              >
                Save
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">No spam. Just your report + occasional ADHD parenting tips.</p>
          </div>
        ) : (
          <div className="bg-primary/5 rounded-2xl p-4 mb-6 border border-primary/10 text-center">
            <p className="text-sm text-foreground/80">
              ✓ We&apos;ll send your results to <strong>{email}</strong>
            </p>
          </div>
        )}

        {/* Price and CTA */}
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
