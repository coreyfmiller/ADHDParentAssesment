"use client"

import { useState } from "react"
import {
  Orbit, Flame, BatteryLow, Layers, Ghost, Zap, CloudLightning, Mountain, Leaf,
  ChevronDown, ChevronUp, Share2, Copy, Check
} from "lucide-react"
import type { Archetype } from "@/lib/archetypes"

interface ArchetypeCardProps {
  archetype: Archetype
  showFull?: boolean
}

const iconMap: Record<string, React.ElementType> = {
  Orbit, Flame, BatteryLow, Layers, Ghost, Zap, CloudLightning, Mountain, Leaf,
}

const colorMap: Record<string, { bg: string; text: string; border: string; badge: string }> = {
  purple: { bg: "bg-purple-500/10", text: "text-purple-600", border: "border-purple-500/20", badge: "bg-purple-500/10 text-purple-600" },
  rose: { bg: "bg-rose-500/10", text: "text-rose-600", border: "border-rose-500/20", badge: "bg-rose-500/10 text-rose-600" },
  amber: { bg: "bg-amber-500/10", text: "text-amber-600", border: "border-amber-500/20", badge: "bg-amber-500/10 text-amber-600" },
  emerald: { bg: "bg-emerald-500/10", text: "text-emerald-600", border: "border-emerald-500/20", badge: "bg-emerald-500/10 text-emerald-600" },
  indigo: { bg: "bg-indigo-500/10", text: "text-indigo-600", border: "border-indigo-500/20", badge: "bg-indigo-500/10 text-indigo-600" },
  red: { bg: "bg-red-500/10", text: "text-red-600", border: "border-red-500/20", badge: "bg-red-500/10 text-red-600" },
  sky: { bg: "bg-sky-500/10", text: "text-sky-600", border: "border-sky-500/20", badge: "bg-sky-500/10 text-sky-600" },
  slate: { bg: "bg-slate-500/10", text: "text-slate-600", border: "border-slate-500/20", badge: "bg-slate-500/10 text-slate-600" },
  green: { bg: "bg-green-500/10", text: "text-green-600", border: "border-green-500/20", badge: "bg-green-500/10 text-green-600" },
}

export function ArchetypeCard({ archetype, showFull = false }: ArchetypeCardProps) {
  const [expanded, setExpanded] = useState(showFull)
  const [copied, setCopied] = useState(false)

  const Icon = iconMap[archetype.icon] || Orbit
  const colors = colorMap[archetype.color] || colorMap.purple

  const handleShare = async () => {
    const shareText = `I'm ${archetype.name} — ${archetype.tagline}\n\nFind your type: ${window.location.origin}/assess/snapshot`

    if (navigator.share) {
      try {
        await navigator.share({ text: shareText })
      } catch {}
    } else {
      await navigator.clipboard.writeText(shareText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className={`bg-card rounded-2xl border ${colors.border} overflow-hidden`}>
      {/* Header */}
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-2xl ${colors.bg} flex items-center justify-center flex-shrink-0`}>
            <Icon className={`w-6 h-6 ${colors.text}`} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${colors.badge}`}>
                Your archetype
              </span>
            </div>
            <h2 className="text-xl font-medium text-foreground">{archetype.name}</h2>
            <p className="text-sm text-muted-foreground mt-1">{archetype.tagline}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-foreground/80 leading-relaxed mt-4">
          {archetype.description}
        </p>

        {/* Expand/collapse */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 mt-4 text-sm text-primary hover:text-primary/80 transition-colors"
        >
          {expanded ? "Show less" : "Show more — strength, kryptonite, what helps"}
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div className="border-t border-border/50 px-6 py-5 space-y-5">
          {/* Hidden Strength */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-1.5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Your hidden strength
            </h3>
            <p className="text-sm text-foreground/80 leading-relaxed">
              {archetype.hiddenStrength}
            </p>
          </div>

          {/* Kryptonite */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-1.5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              Your kryptonite
            </h3>
            <p className="text-sm text-foreground/80 leading-relaxed">
              {archetype.kryptonite}
            </p>
          </div>

          {/* What Helps */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-1.5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              What helps most
            </h3>
            <p className="text-sm text-foreground/80 leading-relaxed">
              {archetype.whatHelps}
            </p>
          </div>

          {/* Typical Experience */}
          <div className="bg-secondary/30 rounded-xl p-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
              Sound familiar?
            </p>
            <p className="text-sm text-foreground/70 italic leading-relaxed">
              &quot;{archetype.typicalExperience}&quot;
            </p>
          </div>
        </div>
      )}

      {/* Share */}
      <div className="border-t border-border/50 px-6 py-3 flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          This is a self-reflection tool, not a diagnosis.
        </p>
        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-primary hover:bg-primary/5 transition-colors"
        >
          {copied ? <Check className="w-3 h-3" /> : <Share2 className="w-3 h-3" />}
          {copied ? "Copied" : "Share my type"}
        </button>
      </div>
    </div>
  )
}
