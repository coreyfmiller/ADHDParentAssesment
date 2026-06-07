"use client"

import { useState } from "react"
import { ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { saveUserBasics, KID_AGE_LABELS, PARTNER_LABELS, AGE_LABELS, CONDITION_LABELS } from "@/lib/user-basics"
import type { KidAge, PartnerStatus, AgeRange, Condition } from "@/lib/user-basics"

interface OnboardingBasicsProps {
  onComplete: () => void
}

export function OnboardingBasics({ onComplete }: OnboardingBasicsProps) {
  const [step, setStep] = useState(0)
  const [kidAges, setKidAges] = useState<KidAge[]>([])
  const [partnerStatus, setPartnerStatus] = useState<PartnerStatus>("")
  const [ageRange, setAgeRange] = useState<AgeRange>("")
  const [conditions, setConditions] = useState<Condition[]>([])
  const [extraInput, setExtraInput] = useState("")
  const [extras, setExtras] = useState<string[]>([])

  const handleKidToggle = (age: KidAge) => {
    setKidAges((prev) =>
      prev.includes(age) ? prev.filter((a) => a !== age) : [...prev, age]
    )
  }

  const handleConditionToggle = (condition: Condition) => {
    setConditions((prev) => {
      if (condition === "none-unsure") return ["none-unsure"]
      const without = prev.filter((c) => c !== "none-unsure")
      return without.includes(condition) ? without.filter((c) => c !== condition) : [...without, condition]
    })
  }

  const handleAddExtra = () => {
    if (extraInput.trim() && !extras.includes(extraInput.trim())) {
      setExtras([...extras, extraInput.trim()])
      setExtraInput("")
    }
  }

  const handleComplete = () => {
    saveUserBasics({
      kidAges,
      partnerStatus,
      ageRange,
      conditions,
      extras,
      completedAt: Date.now(),
      lastUpdated: Date.now(),
    })
    onComplete()
  }

  const canProgress = () => {
    if (step === 0) return kidAges.length > 0
    if (step === 1) return partnerStatus !== ""
    if (step === 2) return ageRange !== ""
    if (step === 3) return conditions.length > 0
    return true
  }

  const totalSteps = 5

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-background/95 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-card rounded-3xl p-6 md:p-8 max-w-md w-full shadow-xl border border-border animate-in slide-in-from-bottom-4 duration-300 max-h-[90vh] overflow-y-auto">
        {/* Progress dots */}
        <div className="flex items-center justify-center gap-1.5 mb-6">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all ${
                i === step ? "bg-primary w-6" : i < step ? "bg-primary/40" : "bg-secondary"
              }`}
            />
          ))}
        </div>

        {/* Step 0: Kids */}
        {step === 0 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-medium text-foreground mb-1">How old are your children?</h2>
              <p className="text-sm text-muted-foreground">Select all that apply. This helps us personalize everything for your life stage.</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {(Object.entries(KID_AGE_LABELS) as [KidAge, string][]).map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => handleKidToggle(id)}
                  className={`p-3 rounded-xl border text-left text-sm transition-all ${
                    kidAges.includes(id)
                      ? "border-primary bg-primary/5 text-foreground"
                      : "border-border hover:border-primary/30 text-muted-foreground"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {kidAges.includes(id) && <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />}
                    <span>{label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 1: Partner */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-medium text-foreground mb-1">Your parenting setup</h2>
              <p className="text-sm text-muted-foreground">This shapes which strategies and scripts are most relevant.</p>
            </div>
            <div className="space-y-2">
              {(Object.entries(PARTNER_LABELS) as [string, string][]).map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => setPartnerStatus(id as PartnerStatus)}
                  className={`w-full p-4 rounded-xl border text-left text-sm transition-all ${
                    partnerStatus === id
                      ? "border-primary bg-primary/5 text-foreground"
                      : "border-border hover:border-primary/30 text-muted-foreground"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Age */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-medium text-foreground mb-1">Your age range</h2>
              <p className="text-sm text-muted-foreground">Helps us show you content relevant to your life stage — hormonal, physical, and developmental.</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {(Object.entries(AGE_LABELS) as [string, string][]).map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => setAgeRange(id as AgeRange)}
                  className={`p-4 rounded-xl border text-center text-sm transition-all ${
                    ageRange === id
                      ? "border-primary bg-primary/5 text-foreground font-medium"
                      : "border-border hover:border-primary/30 text-muted-foreground"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Conditions */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-medium text-foreground mb-1">What resonates with you?</h2>
              <p className="text-sm text-muted-foreground">This ensures we only show you content that&apos;s actually relevant to your experience. Select all that apply.</p>
            </div>
            <div className="space-y-2">
              {(Object.entries(CONDITION_LABELS) as [Condition, string][]).map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => handleConditionToggle(id)}
                  className={`w-full p-3.5 rounded-xl border text-left text-sm transition-all ${
                    conditions.includes(id)
                      ? "border-primary bg-primary/5 text-foreground"
                      : "border-border hover:border-primary/30 text-muted-foreground"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {conditions.includes(id) && <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />}
                    <span>{label}</span>
                  </div>
                </button>
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground/60">
              This is not a diagnosis. It&apos;s about showing you content that fits YOUR experience.
            </p>
          </div>
        )}

        {/* Step 4: Extras */}
        {step === 4 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-medium text-foreground mb-1">Anything else?</h2>
              <p className="text-sm text-muted-foreground">Optional. Things like &quot;going through a divorce,&quot; &quot;recently diagnosed,&quot; &quot;single income stress&quot; — anything that shapes your daily experience.</p>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={extraInput}
                onChange={(e) => setExtraInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddExtra() } }}
                placeholder="Type and press Enter..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-secondary/30 border border-border text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring/50"
              />
              <Button onClick={handleAddExtra} size="sm" variant="outline" className="rounded-xl" disabled={!extraInput.trim()}>
                Add
              </Button>
            </div>
            {extras.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {extras.map((extra, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium cursor-pointer hover:bg-primary/20"
                    onClick={() => setExtras(extras.filter((_, idx) => idx !== i))}
                  >
                    {extra} ×
                  </span>
                ))}
              </div>
            )}
            <p className="text-[10px] text-muted-foreground/60">Tap a tag to remove it. This is completely optional.</p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/50">
          {step > 0 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Back
            </button>
          ) : (
            <button
              onClick={onComplete}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Skip for now
            </button>
          )}

          {step < totalSteps - 1 ? (
            <Button
              onClick={() => setStep(step + 1)}
              disabled={!canProgress()}
              className="rounded-xl"
              size="sm"
            >
              Next <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          ) : (
            <Button onClick={handleComplete} className="rounded-xl" size="sm">
              Done <Check className="w-3.5 h-3.5 ml-1" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
