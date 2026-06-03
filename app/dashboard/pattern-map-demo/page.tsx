"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import type { PatternMap } from "@/lib/assessments/types"

// Sample data for demo (will use real data if available)
const defaultDimensions = [
  { dimension: "cognitive-load", label: "Cognitive Load", score: 14, maxScore: 20, intensity: "critical" as const, description: "" },
  { dimension: "emotional-bandwidth", label: "Emotional Bandwidth", score: 12, maxScore: 20, intensity: "high" as const, description: "" },
  { dimension: "physical-depletion", label: "Physical Depletion", score: 16, maxScore: 20, intensity: "critical" as const, description: "" },
  { dimension: "system-friction", label: "System Friction", score: 8, maxScore: 20, intensity: "moderate" as const, description: "" },
  { dimension: "identity-erosion", label: "Identity Erosion", score: 10, maxScore: 20, intensity: "high" as const, description: "" },
]

export default function PatternMapDemoPage() {
  const [dimensions, setDimensions] = useState(defaultDimensions)
  const [scores, setScores] = useState(defaultDimensions.map((d) => d.score))

  useEffect(() => {
    try {
      const stored = localStorage.getItem("mindful-mama-pattern-map")
      if (stored) {
        const map = JSON.parse(stored) as PatternMap
        if (map.dimensions?.length > 0) {
          setDimensions(map.dimensions)
          setScores(map.dimensions.map((d) => d.score))
        }
      }
    } catch {}
  }, [])

  const updateScore = (index: number, value: number) => {
    const newScores = [...scores]
    newScores[index] = value
    setScores(newScores)

    const newDims = dimensions.map((dim, i) => {
      if (i !== index) return dim
      const ratio = value / dim.maxScore
      let intensity: "low" | "moderate" | "high" | "critical" = "low"
      if (ratio >= 0.75) intensity = "critical"
      else if (ratio >= 0.55) intensity = "high"
      else if (ratio >= 0.35) intensity = "moderate"
      return { ...dim, score: value, intensity }
    })
    setDimensions(newDims)
  }

  return (
    <div className="space-y-12 pb-16">
      <div>
        <Link href="/dashboard" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        <h1 className="text-2xl font-medium text-foreground mb-2">Pattern Map Visualizations</h1>
        <p className="text-muted-foreground">Adjust the sliders to see how the visualizations respond.</p>
      </div>

      {/* Sliders */}
      <section className="bg-card rounded-2xl p-6 border border-border">
        <h2 className="text-sm font-medium text-foreground mb-4">Adjust Dimensions</h2>
        <div className="space-y-4">
          {dimensions.map((dim, i) => (
            <div key={dim.dimension} className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">{dim.label}</span>
                <span className="text-xs text-muted-foreground">{scores[i]}/{dim.maxScore}</span>
              </div>
              <input
                type="range"
                min="0"
                max={dim.maxScore}
                value={scores[i]}
                onChange={(e) => updateScore(i, Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none bg-secondary cursor-pointer accent-primary"
              />
            </div>
          ))}
        </div>
      </section>

      {/* 1. Horizontal Bars (current) */}
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
                  className={`h-full rounded-full transition-all duration-300 ${
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

      {/* 5. Flower Petals — Gradient */}
      <section className="bg-card rounded-2xl p-6 border border-border">
        <h2 className="text-lg font-medium text-foreground mb-1">3. Flower / Petals — Gradient</h2>
        <p className="text-sm text-muted-foreground mb-6">Brand color → warm coral as intensity rises. Size = severity.</p>
        <div className="flex justify-center">
          <FlowerPetalsGradient dimensions={dimensions} />
        </div>
      </section>

      {/* 6. Flower Petals — Single Brand Color */}
      <section className="bg-card rounded-2xl p-6 border border-border">
        <h2 className="text-lg font-medium text-foreground mb-1">4. Flower / Petals — Single Color (opacity + size)</h2>
        <p className="text-sm text-muted-foreground mb-6">All petals in brand palette. Bigger + more opaque = more overwhelm.</p>
        <div className="flex justify-center">
          <FlowerPetalsSingleColor dimensions={dimensions} />
        </div>
      </section>
    </div>
  )
}

// ============================================================
// VISUALIZATION COMPONENTS
// ============================================================

interface VizProps {
  dimensions: typeof defaultDimensions
}

// ---- Radar Chart ----
function RadarChart({ dimensions }: VizProps) {
  const size = 280
  const center = size / 2
  const maxRadius = 110
  const levels = 4

  const angleStep = (2 * Math.PI) / dimensions.length
  const startAngle = -Math.PI / 2

  const getPoint = (index: number, value: number): { x: number; y: number } => {
    const angle = startAngle + index * angleStep
    const radius = (value / 20) * maxRadius
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    }
  }

  const gridPaths = Array.from({ length: levels }, (_, level) => {
    const radius = ((level + 1) / levels) * maxRadius
    const points = dimensions.map((_, i) => {
      const angle = startAngle + i * angleStep
      return `${center + radius * Math.cos(angle)},${center + radius * Math.sin(angle)}`
    })
    return `M${points.join("L")}Z`
  })

  const dataPoints = dimensions.map((dim, i) => getPoint(i, dim.score))
  const dataPath = `M${dataPoints.map((p) => `${p.x},${p.y}`).join("L")}Z`

  return (
    <div className="relative">
      <svg width={size} height={size} className="overflow-visible">
        {gridPaths.map((path, i) => (
          <path key={i} d={path} fill="none" stroke="currentColor" className="text-border" strokeWidth="1" opacity={0.3 + i * 0.15} />
        ))}
        {dimensions.map((_, i) => {
          const end = getPoint(i, 20)
          return <line key={i} x1={center} y1={center} x2={end.x} y2={end.y} stroke="currentColor" className="text-border" strokeWidth="1" opacity="0.3" />
        })}
        <path d={dataPath} fill="hsl(var(--primary))" opacity="0.15" />
        <path d={dataPath} fill="none" stroke="hsl(var(--primary))" strokeWidth="2.5" />
        {dataPoints.map((point, i) => (
          <circle key={i} cx={point.x} cy={point.y} r="4" fill="hsl(var(--primary))" />
        ))}
      </svg>
      {dimensions.map((dim, i) => {
        const labelPoint = getPoint(i, 24)
        return (
          <div
            key={dim.dimension}
            className="absolute text-[10px] text-muted-foreground font-medium text-center w-20 -translate-x-1/2 -translate-y-1/2"
            style={{ left: labelPoint.x, top: labelPoint.y }}
          >
            {dim.label.split(" ")[0]}
          </div>
        )
      })}
    </div>
  )
}

// ---- Flower Petals — Gradient (brand → warm coral) ----
function FlowerPetalsGradient({ dimensions }: VizProps) {
  const size = 320
  const center = size / 2
  const angleStep = (2 * Math.PI) / dimensions.length
  const startAngle = -Math.PI / 2

  // Gradient: brand pink/mauve at low → warm coral/rose at critical
  // Using HSL: brand ~340 hue → coral ~15 hue
  const getColor = (score: number, maxScore: number) => {
    const ratio = score / maxScore
    // Interpolate hue from 340 (cool pink) to 10 (warm coral)
    const hue = 340 - ratio * 330 + (ratio > 0.5 ? (ratio - 0.5) * 40 : 0)
    const sat = 60 + ratio * 25
    const light = 65 - ratio * 15
    const opacity = 0.3 + ratio * 0.45
    return { fill: `hsla(${hue % 360}, ${sat}%, ${light}%, ${opacity})`, stroke: `hsla(${hue % 360}, ${sat}%, ${light - 10}%, ${opacity + 0.2})` }
  }

  return (
    <div className="relative">
      <svg width={size} height={size}>
        {dimensions.map((dim, i) => {
          const angle = startAngle + i * angleStep
          const ratio = dim.score / dim.maxScore
          const petalLength = 45 + ratio * 75
          const petalWidth = 28 + ratio * 22
          const tipX = center + petalLength * Math.cos(angle)
          const tipY = center + petalLength * Math.sin(angle)

          const perpAngle = angle + Math.PI / 2
          const cp1X = center + petalWidth * Math.cos(perpAngle) + (petalLength * 0.5) * Math.cos(angle)
          const cp1Y = center + petalWidth * Math.sin(perpAngle) + (petalLength * 0.5) * Math.sin(angle)
          const cp2X = center - petalWidth * Math.cos(perpAngle) + (petalLength * 0.5) * Math.cos(angle)
          const cp2Y = center - petalWidth * Math.sin(perpAngle) + (petalLength * 0.5) * Math.sin(angle)

          const path = `M ${center} ${center} Q ${cp1X} ${cp1Y} ${tipX} ${tipY} Q ${cp2X} ${cp2Y} ${center} ${center}`
          const colors = getColor(dim.score, dim.maxScore)

          return (
            <path
              key={dim.dimension}
              d={path}
              fill={colors.fill}
              stroke={colors.stroke}
              strokeWidth="1.5"
              className="transition-all duration-500"
            />
          )
        })}
        <circle cx={center} cy={center} r="14" fill="hsl(var(--primary))" opacity="0.15" />
        <circle cx={center} cy={center} r="7" fill="hsl(var(--primary))" opacity="0.4" />
      </svg>

      {/* Labels */}
      {dimensions.map((dim, i) => {
        const angle = startAngle + i * angleStep
        const ratio = dim.score / dim.maxScore
        const labelDist = 55 + ratio * 85
        const x = center + labelDist * Math.cos(angle)
        const y = center + labelDist * Math.sin(angle)
        return (
          <div
            key={dim.dimension}
            className="absolute text-[10px] font-medium text-muted-foreground text-center w-20 -translate-x-1/2 -translate-y-1/2"
            style={{ left: x, top: y }}
          >
            {dim.label}
          </div>
        )
      })}
    </div>
  )
}

// ---- Flower Petals — Single Brand Color (opacity + size only) ----
function FlowerPetalsSingleColor({ dimensions }: VizProps) {
  const size = 320
  const center = size / 2
  const angleStep = (2 * Math.PI) / dimensions.length
  const startAngle = -Math.PI / 2

  return (
    <div className="relative">
      <svg width={size} height={size}>
        {dimensions.map((dim, i) => {
          const angle = startAngle + i * angleStep
          const ratio = dim.score / dim.maxScore
          const petalLength = 45 + ratio * 75
          const petalWidth = 28 + ratio * 22
          const tipX = center + petalLength * Math.cos(angle)
          const tipY = center + petalLength * Math.sin(angle)

          const perpAngle = angle + Math.PI / 2
          const cp1X = center + petalWidth * Math.cos(perpAngle) + (petalLength * 0.5) * Math.cos(angle)
          const cp1Y = center + petalWidth * Math.sin(perpAngle) + (petalLength * 0.5) * Math.sin(angle)
          const cp2X = center - petalWidth * Math.cos(perpAngle) + (petalLength * 0.5) * Math.cos(angle)
          const cp2Y = center - petalWidth * Math.sin(perpAngle) + (petalLength * 0.5) * Math.sin(angle)

          const path = `M ${center} ${center} Q ${cp1X} ${cp1Y} ${tipX} ${tipY} Q ${cp2X} ${cp2Y} ${center} ${center}`
          const opacity = 0.15 + ratio * 0.5

          return (
            <path
              key={dim.dimension}
              d={path}
              fill={`hsl(var(--primary) / ${opacity})`}
              stroke={`hsl(var(--primary) / ${opacity + 0.15})`}
              strokeWidth="1.5"
              className="transition-all duration-500"
            />
          )
        })}
        <circle cx={center} cy={center} r="14" fill="hsl(var(--primary))" opacity="0.1" />
        <circle cx={center} cy={center} r="7" fill="hsl(var(--primary))" opacity="0.3" />
      </svg>

      {/* Labels */}
      {dimensions.map((dim, i) => {
        const angle = startAngle + i * angleStep
        const ratio = dim.score / dim.maxScore
        const labelDist = 55 + ratio * 85
        const x = center + labelDist * Math.cos(angle)
        const y = center + labelDist * Math.sin(angle)
        return (
          <div
            key={dim.dimension}
            className="absolute text-[10px] font-medium text-muted-foreground text-center w-20 -translate-x-1/2 -translate-y-1/2"
            style={{ left: x, top: y }}
          >
            {dim.label}
          </div>
        )
      })}
    </div>
  )
}
