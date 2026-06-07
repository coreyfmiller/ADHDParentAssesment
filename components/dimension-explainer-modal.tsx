"use client"

import { X, Brain, Heart, Battery, Settings, Fingerprint, ArrowRight } from "lucide-react"
import Link from "next/link"
import { DIMENSION_EXPLAINERS } from "@/lib/dimension-explainers"
import type { DimensionExplainer } from "@/lib/dimension-explainers"

const iconMap: Record<string, React.ElementType> = {
  Brain, Heart, Battery, Settings, Fingerprint,
}

interface DimensionExplainerModalProps {
  dimensionId: string
  intensity: string
  onClose: () => void
}

export function DimensionExplainerModal({ dimensionId, intensity, onClose }: DimensionExplainerModalProps) {
  const explainer = DIMENSION_EXPLAINERS[dimensionId]
  if (!explainer) return null

  const Icon = iconMap[explainer.icon] || Brain

  const intensityColor = intensity === "critical" ? "text-red-600 bg-red-500/10" :
    intensity === "high" ? "text-amber-600 bg-amber-500/10" :
    intensity === "moderate" ? "text-yellow-700 bg-yellow-500/10" :
    "text-green-600 bg-green-500/10"

  return (
    <div className="fixed inset-0 z-[90] flex items-end md:items-center justify-center bg-black/30 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}>
      <div
        className="bg-card rounded-t-3xl md:rounded-3xl w-full max-w-lg max-h-[85vh] overflow-y-auto shadow-2xl border border-border animate-in slide-in-from-bottom-4 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-card/95 backdrop-blur-sm border-b border-border/50 p-5 flex items-center justify-between rounded-t-3xl">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${intensityColor}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-medium text-foreground">{explainer.label}</h2>
              <p className="text-xs text-muted-foreground">{explainer.oneLiner}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-muted-foreground hover:text-foreground transition-colors" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-6">
          {/* Current level */}
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${intensityColor}`}>
            Your level: {intensity}
          </div>

          {/* What it is */}
          <section>
            <h3 className="text-sm font-medium text-foreground mb-2">What this means</h3>
            <p className="text-sm text-foreground/70 leading-relaxed">{explainer.whatItIs}</p>
          </section>

          {/* What it feels like */}
          <section>
            <h3 className="text-sm font-medium text-foreground mb-2">What it feels like</h3>
            <div className="space-y-1.5">
              {explainer.whatItFeelsLike.map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40 flex-shrink-0 mt-2" />
                  <p className="text-sm text-foreground/70">{item}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Why it happens */}
          <section>
            <h3 className="text-sm font-medium text-foreground mb-2">Why this happens</h3>
            <p className="text-sm text-foreground/70 leading-relaxed">{explainer.whyItHappens}</p>
          </section>

          {/* What helps */}
          <section>
            <h3 className="text-sm font-medium text-foreground mb-2">What helps</h3>
            <div className="space-y-2">
              {explainer.whatHelps.map((item, i) => (
                <div key={i} className="flex items-start gap-2 p-2.5 rounded-xl bg-secondary/30">
                  <span className="text-primary text-xs mt-0.5 flex-shrink-0">→</span>
                  <p className="text-sm text-foreground/80">{item}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Related pathway CTA */}
          <Link
            href={`/assess/pathway/${explainer.relatedPathway}`}
            onClick={onClose}
            className="flex items-center justify-between p-4 rounded-xl bg-primary/5 border border-primary/10 hover:border-primary/20 transition-colors group"
          >
            <div>
              <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">Explore this deeper</p>
              <p className="text-xs text-muted-foreground">Take the related pathway reflection</p>
            </div>
            <ArrowRight className="w-4 h-4 text-primary" />
          </Link>

          {/* Disclaimer */}
          <p className="text-[10px] text-muted-foreground/60 text-center leading-relaxed">
            This information is for educational and self-reflection purposes. It is not a diagnosis or clinical assessment.
          </p>
        </div>
      </div>
    </div>
  )
}
