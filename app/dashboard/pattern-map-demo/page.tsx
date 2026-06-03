"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import type { PatternMap } from "@/lib/assessments/types"

// Sample data for demo (will use real data if available)
const sampleDimensions = [
  { dimension: "cognitive-load", label: "Cognitive Load", score: 14, maxScore: 20, intensity: "critical" as const, description: "" },
  { dimension: "emotional-bandwidth", label: "Emotional Bandwidth", score: 12, maxScore: 20, intensity: "high" as const, description: "" },
  { dimension: "physical-depletion", label: "Physical Depletion", score: 16, maxScore: 20, intensity: "critical" as const, description: "" },
  { dimension: "system-friction", label: "System Friction", score: 8, maxScore: 20, intensity: "moderate" as const, description: "" },
  { dimension: "identity-erosion", label: "Identity Erosion", score: 10, maxScore: 20, intensity: "high" as const, description: "" },
]

export default function PatternMapDemoPage() {
  const [dimensions, setDimensions] = useState(sampleDimensions)

  useEffect(() => {
    try {
      const stored = localStorage.getItem("mindful-mama-pattern-map")
      if (stored) {
        const map = JSON.parse(stored) as PatternMap
        if (map.dimensions?.length > 0) {
          setDimensions(map.dimensions)
        }
      }
    } catch {}
  }, [])

  return (
    <div className="space-y-12 pb-16">
      <div>
        <Link href="/dashboard" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        <h1 className="text-2xl font-medium text-foreground mb-2">Pattern Map Visualizations</h1>
        <p className="text-muted-foreground">Same data, different ways to see it. Which one feels right?</p>
      </div>

      {/* 1. Current — Horizontal Bars */}
      <section className="bg-card rounded-2xl p-6 border border-border">
        <h2 className="text-lg font-medium text-foreground mb-1">1. Horizontal Bars (current)</h2>
        <p className="text-sm text-muted-foreground mb-6">Familiar, readable, but generic.</p>
        <div className="space-y-3 max-w-md">
          {dimensions.map((dim) => (
            <div key={dim.dimension} className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground">{dim.label}</span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  dim.intensity === "critical" ? "bg-red-500/10 text-red-600" :
                  dim.intensity === "high" ? "bg-amber-500/10 text-amber-600" :
                  dim.intensity === "moderate" ? "bg-yellow-500/10 text-yellow-700" :
                  "bg-green-500/10 text-green-600"
                }`}>
                  {dim.intensity}
                </span>
              </div>
              <div className="h-2.5 w-full bg-secondary rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    dim.intensity === "critical" ? "bg-red-500" :
                    dim.intensity === "high" ? "bg-amber-500" :
                    dim.intensity === "moderate" ? "bg-yellow-500" :
                    "bg-green-500"
                  }`}
                  style={{ width: `${(dim.score / dim.maxScore) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Radar / Spider Chart */}
      <section className="bg-card rounded-2xl p-6 border border-border">
        <h2 className="text-lg font-medium text-foreground mb-1">2. Radar Chart</h2>
        <p className="text-sm text-muted-foreground mb-6">The shape IS the insight. Lopsided = lopsided load.</p>
        <div className="flex justify-center">
          <RadarChart dimensions={dimensions} />
        </div>
      </section>

      {/* 3. Concentric Rings */}
      <section className="bg-card rounded-2xl p-6 border border-border">
        <h2 className="text-lg font-medium text-foreground mb-1">3. Concentric Rings</h2>
        <p className="text-sm text-muted-foreground mb-6">Compact, organic. Critical fills the full ring.</p>
        <div className="flex justify-center">
          <ConcentricRings dimensions={dimensions} />
        </div>
      </section>

      {/* 4. Body Map */}
      <section className="bg-card rounded-2xl p-6 border border-border">
        <h2 className="text-lg font-medium text-foreground mb-1">4. Body Map</h2>
        <p className="text-sm text-muted-foreground mb-6">Visceral. Where you carry it in your body.</p>
        <div className="flex justify-center">
          <BodyMap dimensions={dimensions} />
        </div>
      </section>

      {/* 5. Stacking Blocks */}
      <section className="bg-card rounded-2xl p-6 border border-border">
        <h2 className="text-lg font-medium text-foreground mb-1">5. Weight / Stacking Blocks</h2>
        <p className="text-sm text-muted-foreground mb-6">&quot;This is what you&apos;re carrying.&quot; Literal weight visualization.</p>
        <div className="flex justify-center">
          <StackingBlocks dimensions={dimensions} />
        </div>
      </section>

      {/* 6. Flower Petals */}
      <section className="bg-card rounded-2xl p-6 border border-border">
        <h2 className="text-lg font-medium text-foreground mb-1">6. Flower / Petals</h2>
        <p className="text-sm text-muted-foreground mb-6">Soft, organic. Oversized petals = overwhelm areas.</p>
        <div className="flex justify-center">
          <FlowerPetals dimensions={dimensions} />
        </div>
      </section>
    </div>
  )
}

// ============================================================
// VISUALIZATION COMPONENTS
// ============================================================

interface VizProps {
  dimensions: typeof sampleDimensions
}

// ---- 2. Radar Chart ----
function RadarChart({ dimensions }: VizProps) {
  const size = 280
  const center = size / 2
  const maxRadius = 110
  const levels = 4

  const angleStep = (2 * Math.PI) / dimensions.length
  const startAngle = -Math.PI / 2 // Start at top

  const getPoint = (index: number, value: number): { x: number; y: number } => {
    const angle = startAngle + index * angleStep
    const radius = (value / 20) * maxRadius
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    }
  }

  // Grid lines
  const gridPaths = Array.from({ length: levels }, (_, level) => {
    const radius = ((level + 1) / levels) * maxRadius
    const points = dimensions.map((_, i) => {
      const angle = startAngle + i * angleStep
      return `${center + radius * Math.cos(angle)},${center + radius * Math.sin(angle)}`
    })
    return `M${points.join("L")}Z`
  })

  // Data polygon
  const dataPoints = dimensions.map((dim, i) => getPoint(i, dim.score))
  const dataPath = `M${dataPoints.map((p) => `${p.x},${p.y}`).join("L")}Z`

  return (
    <div className="relative">
      <svg width={size} height={size} className="overflow-visible">
        {/* Grid */}
        {gridPaths.map((path, i) => (
          <path key={i} d={path} fill="none" stroke="currentColor" className="text-border" strokeWidth="1" opacity={0.3 + i * 0.15} />
        ))}

        {/* Axis lines */}
        {dimensions.map((_, i) => {
          const end = getPoint(i, 20)
          return <line key={i} x1={center} y1={center} x2={end.x} y2={end.y} stroke="currentColor" className="text-border" strokeWidth="1" opacity="0.3" />
        })}

        {/* Data fill */}
        <path d={dataPath} fill="hsl(var(--primary))" opacity="0.15" />
        <path d={dataPath} fill="none" stroke="hsl(var(--primary))" strokeWidth="2.5" />

        {/* Data points */}
        {dataPoints.map((point, i) => (
          <circle key={i} cx={point.x} cy={point.y} r="4" fill="hsl(var(--primary))" />
        ))}
      </svg>

      {/* Labels */}
      {dimensions.map((dim, i) => {
        const labelPoint = getPoint(i, 24)
        return (
          <div
            key={dim.dimension}
            className="absolute text-[10px] text-muted-foreground font-medium text-center w-20 -translate-x-1/2 -translate-y-1/2"
            style={{ left: labelPoint.x, top: labelPoint.y }}
          >
            {dim.label.split(" ")[0]}
            <br />
            <span className={`text-[9px] ${
              dim.intensity === "critical" ? "text-red-500" :
              dim.intensity === "high" ? "text-amber-500" :
              "text-muted-foreground/60"
            }`}>
              {dim.intensity}
            </span>
          </div>
        )
      })}
    </div>
  )
}

// ---- 3. Concentric Rings ----
function ConcentricRings({ dimensions }: VizProps) {
  const size = 280
  const center = size / 2
  const ringWidth = 18
  const gap = 4

  const getColor = (intensity: string) => {
    if (intensity === "critical") return "hsl(0, 84%, 60%)"
    if (intensity === "high") return "hsl(38, 92%, 50%)"
    if (intensity === "moderate") return "hsl(48, 96%, 53%)"
    return "hsl(142, 71%, 45%)"
  }

  return (
    <div className="relative">
      <svg width={size} height={size}>
        {dimensions.map((dim, i) => {
          const radius = center - (i * (ringWidth + gap)) - 30
          const circumference = 2 * Math.PI * radius
          const progress = dim.score / dim.maxScore
          const dashOffset = circumference * (1 - progress)

          return (
            <g key={dim.dimension}>
              {/* Background ring */}
              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke="currentColor"
                className="text-secondary"
                strokeWidth={ringWidth}
              />
              {/* Progress ring */}
              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke={getColor(dim.intensity)}
                strokeWidth={ringWidth}
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
                transform={`rotate(-90 ${center} ${center})`}
                className="transition-all duration-1000"
              />
            </g>
          )
        })}
      </svg>

      {/* Center label */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xs text-muted-foreground">Pattern</p>
          <p className="text-sm font-medium text-foreground">Map</p>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap justify-center gap-3">
        {dimensions.map((dim) => (
          <div key={dim.dimension} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getColor(dim.intensity) }} />
            <span className="text-[10px] text-muted-foreground">{dim.label.split(" ")[0]}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ---- 4. Body Map ----
function BodyMap({ dimensions }: VizProps) {
  const getOpacity = (dimension: string) => {
    const dim = dimensions.find((d) => d.dimension === dimension)
    if (!dim) return 0.1
    return 0.2 + (dim.score / dim.maxScore) * 0.8
  }

  const getColor = (dimension: string) => {
    const dim = dimensions.find((d) => d.dimension === dimension)
    if (!dim) return "#ccc"
    if (dim.intensity === "critical") return "rgb(239, 68, 68)"
    if (dim.intensity === "high") return "rgb(245, 158, 11)"
    if (dim.intensity === "moderate") return "rgb(234, 179, 8)"
    return "rgb(34, 197, 94)"
  }

  return (
    <div className="relative w-48">
      {/* Simple body silhouette with regions */}
      <svg viewBox="0 0 200 400" className="w-full h-auto">
        {/* Head — Cognitive Load */}
        <ellipse cx="100" cy="50" rx="35" ry="40" fill={getColor("cognitive-load")} opacity={getOpacity("cognitive-load")} />
        <ellipse cx="100" cy="50" rx="35" ry="40" fill="none" stroke={getColor("cognitive-load")} strokeWidth="2" opacity="0.6" />

        {/* Chest — Emotional Bandwidth */}
        <ellipse cx="100" cy="140" rx="45" ry="45" fill={getColor("emotional-bandwidth")} opacity={getOpacity("emotional-bandwidth")} />
        <ellipse cx="100" cy="140" rx="45" ry="45" fill="none" stroke={getColor("emotional-bandwidth")} strokeWidth="2" opacity="0.6" />

        {/* Core — Physical Depletion */}
        <ellipse cx="100" cy="220" rx="40" ry="40" fill={getColor("physical-depletion")} opacity={getOpacity("physical-depletion")} />
        <ellipse cx="100" cy="220" rx="40" ry="40" fill="none" stroke={getColor("physical-depletion")} strokeWidth="2" opacity="0.6" />

        {/* Arms/Hands — System Friction (carrying the load) */}
        <ellipse cx="40" cy="170" rx="20" ry="50" fill={getColor("system-friction")} opacity={getOpacity("system-friction")} />
        <ellipse cx="40" cy="170" rx="20" ry="50" fill="none" stroke={getColor("system-friction")} strokeWidth="2" opacity="0.6" />
        <ellipse cx="160" cy="170" rx="20" ry="50" fill={getColor("system-friction")} opacity={getOpacity("system-friction")} />
        <ellipse cx="160" cy="170" rx="20" ry="50" fill="none" stroke={getColor("system-friction")} strokeWidth="2" opacity="0.6" />

        {/* Legs/Foundation — Identity Erosion */}
        <ellipse cx="75" cy="330" rx="20" ry="55" fill={getColor("identity-erosion")} opacity={getOpacity("identity-erosion")} />
        <ellipse cx="75" cy="330" rx="20" ry="55" fill="none" stroke={getColor("identity-erosion")} strokeWidth="2" opacity="0.6" />
        <ellipse cx="125" cy="330" rx="20" ry="55" fill={getColor("identity-erosion")} opacity={getOpacity("identity-erosion")} />
        <ellipse cx="125" cy="330" rx="20" ry="55" fill="none" stroke={getColor("identity-erosion")} strokeWidth="2" opacity="0.6" />
      </svg>

      {/* Labels */}
      <div className="absolute top-1 right-0 text-[9px] text-right">
        <p className="font-medium" style={{ color: getColor("cognitive-load") }}>Cognitive</p>
      </div>
      <div className="absolute top-[30%] right-0 text-[9px] text-right">
        <p className="font-medium" style={{ color: getColor("emotional-bandwidth") }}>Emotional</p>
      </div>
      <div className="absolute top-[50%] right-0 text-[9px] text-right">
        <p className="font-medium" style={{ color: getColor("physical-depletion") }}>Physical</p>
      </div>
      <div className="absolute top-[38%] left-0 text-[9px]">
        <p className="font-medium" style={{ color: getColor("system-friction") }}>Systems</p>
      </div>
      <div className="absolute bottom-[10%] right-0 text-[9px] text-right">
        <p className="font-medium" style={{ color: getColor("identity-erosion") }}>Identity</p>
      </div>
    </div>
  )
}

// ---- 5. Stacking Blocks ----
function StackingBlocks({ dimensions }: VizProps) {
  const sorted = [...dimensions].sort((a, b) => b.score - a.score)

  const getColor = (intensity: string) => {
    if (intensity === "critical") return "bg-red-500/70 border-red-600/50"
    if (intensity === "high") return "bg-amber-500/60 border-amber-600/40"
    if (intensity === "moderate") return "bg-yellow-400/50 border-yellow-500/40"
    return "bg-green-400/40 border-green-500/30"
  }

  return (
    <div className="w-full max-w-sm">
      <div className="flex flex-col items-center gap-1.5">
        {sorted.map((dim) => {
          const widthPct = 40 + (dim.score / dim.maxScore) * 60
          return (
            <div
              key={dim.dimension}
              className={`rounded-xl border-2 py-3 px-4 flex items-center justify-between transition-all duration-500 ${getColor(dim.intensity)}`}
              style={{ width: `${widthPct}%` }}
            >
              <span className="text-xs font-medium text-foreground/90">{dim.label}</span>
              <span className="text-[10px] text-foreground/60">{Math.round((dim.score / dim.maxScore) * 100)}%</span>
            </div>
          )
        })}
      </div>
      <p className="text-center text-xs text-muted-foreground mt-4 italic">
        Widest blocks = heaviest weight you&apos;re carrying
      </p>
    </div>
  )
}

// ---- 6. Flower Petals ----
function FlowerPetals({ dimensions }: VizProps) {
  const size = 300
  const center = size / 2
  const angleStep = (2 * Math.PI) / dimensions.length
  const startAngle = -Math.PI / 2

  const getColor = (intensity: string) => {
    if (intensity === "critical") return "rgba(239, 68, 68, 0.5)"
    if (intensity === "high") return "rgba(245, 158, 11, 0.4)"
    if (intensity === "moderate") return "rgba(234, 179, 8, 0.35)"
    return "rgba(34, 197, 94, 0.3)"
  }

  const getStroke = (intensity: string) => {
    if (intensity === "critical") return "rgba(239, 68, 68, 0.8)"
    if (intensity === "high") return "rgba(245, 158, 11, 0.7)"
    if (intensity === "moderate") return "rgba(234, 179, 8, 0.6)"
    return "rgba(34, 197, 94, 0.5)"
  }

  return (
    <div className="relative">
      <svg width={size} height={size}>
        {/* Petals */}
        {dimensions.map((dim, i) => {
          const angle = startAngle + i * angleStep
          const petalLength = 40 + (dim.score / dim.maxScore) * 70
          const petalWidth = 25 + (dim.score / dim.maxScore) * 20
          const tipX = center + petalLength * Math.cos(angle)
          const tipY = center + petalLength * Math.sin(angle)

          // Control points for bezier curve (create petal shape)
          const perpAngle = angle + Math.PI / 2
          const cp1X = center + petalWidth * Math.cos(perpAngle) + (petalLength * 0.5) * Math.cos(angle)
          const cp1Y = center + petalWidth * Math.sin(perpAngle) + (petalLength * 0.5) * Math.sin(angle)
          const cp2X = center - petalWidth * Math.cos(perpAngle) + (petalLength * 0.5) * Math.cos(angle)
          const cp2Y = center - petalWidth * Math.sin(perpAngle) + (petalLength * 0.5) * Math.sin(angle)

          const path = `M ${center} ${center} Q ${cp1X} ${cp1Y} ${tipX} ${tipY} Q ${cp2X} ${cp2Y} ${center} ${center}`

          return (
            <path
              key={dim.dimension}
              d={path}
              fill={getColor(dim.intensity)}
              stroke={getStroke(dim.intensity)}
              strokeWidth="1.5"
              className="transition-all duration-700"
            />
          )
        })}

        {/* Center circle */}
        <circle cx={center} cy={center} r="12" fill="hsl(var(--primary))" opacity="0.2" />
        <circle cx={center} cy={center} r="6" fill="hsl(var(--primary))" opacity="0.5" />
      </svg>

      {/* Labels */}
      {dimensions.map((dim, i) => {
        const angle = startAngle + i * angleStep
        const labelDist = 50 + (dim.score / dim.maxScore) * 80
        const x = center + labelDist * Math.cos(angle)
        const y = center + labelDist * Math.sin(angle)
        return (
          <div
            key={dim.dimension}
            className="absolute text-[10px] font-medium text-center w-16 -translate-x-1/2 -translate-y-1/2"
            style={{ left: x, top: y, color: getStroke(dim.intensity) }}
          >
            {dim.label.split(" ")[0]}
          </div>
        )
      })}
    </div>
  )
}
