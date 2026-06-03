"use client"

// ============================================================
// Pattern Map Flower — Blue → Deep Rose Petal Visualization
// The default visual for the pattern map.
// Size of petal = severity. Color shifts from calm blue
// to deep rose as intensity increases.
// ============================================================

interface Dimension {
  dimension: string
  label: string
  score: number
  maxScore: number
  intensity: string
}

interface PatternMapFlowerProps {
  dimensions: Dimension[]
  size?: number
}

export function PatternMapFlower({ dimensions, size = 260 }: PatternMapFlowerProps) {
  const center = size / 2
  const angleStep = (2 * Math.PI) / dimensions.length
  const startAngle = -Math.PI / 2

  const getColor = (score: number, maxScore: number) => {
    const ratio = score / maxScore
    // Blue (hue 220) → Deep Rose (hue 340)
    // As intensity increases: cool blue → purple → rose → deep rose
    const hue = 220 + ratio * 120 // 220 → 340
    const sat = 45 + ratio * 40 // 45% → 85%
    const light = 72 - ratio * 28 // 72% (light blue) → 44% (deep rose)
    const opacity = 0.3 + ratio * 0.5
    return {
      fill: `hsla(${hue}, ${sat}%, ${light}%, ${opacity})`,
      stroke: `hsla(${hue}, ${sat + 10}%, ${light - 8}%, ${opacity + 0.2})`,
    }
  }

  const buildPetalPath = (angle: number, score: number, maxScore: number) => {
    const ratio = score / maxScore
    const petalLength = 35 + ratio * (size * 0.27)
    const petalWidth = 20 + ratio * (size * 0.08)
    const tipX = center + petalLength * Math.cos(angle)
    const tipY = center + petalLength * Math.sin(angle)

    const perpAngle = angle + Math.PI / 2
    const cp1X = center + petalWidth * Math.cos(perpAngle) + (petalLength * 0.5) * Math.cos(angle)
    const cp1Y = center + petalWidth * Math.sin(perpAngle) + (petalLength * 0.5) * Math.sin(angle)
    const cp2X = center - petalWidth * Math.cos(perpAngle) + (petalLength * 0.5) * Math.cos(angle)
    const cp2Y = center - petalWidth * Math.sin(perpAngle) + (petalLength * 0.5) * Math.sin(angle)

    return `M ${center} ${center} Q ${cp1X} ${cp1Y} ${tipX} ${tipY} Q ${cp2X} ${cp2Y} ${center} ${center}`
  }

  const labelDist = size * 0.47

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        {dimensions.map((dim, i) => {
          const angle = startAngle + i * angleStep
          const path = buildPetalPath(angle, dim.score, dim.maxScore)
          const colors = getColor(dim.score, dim.maxScore)
          return (
            <path
              key={dim.dimension}
              d={path}
              fill={colors.fill}
              stroke={colors.stroke}
              strokeWidth="1.5"
              className="transition-all duration-700"
            />
          )
        })}
        {/* Center dot */}
        <circle cx={center} cy={center} r={size * 0.045} fill="hsla(280, 40%, 65%, 0.15)" />
        <circle cx={center} cy={center} r={size * 0.022} fill="hsla(280, 50%, 55%, 0.4)" />
      </svg>

      {/* Labels */}
      {dimensions.map((dim, i) => {
        const angle = startAngle + i * angleStep
        const x = center + labelDist * Math.cos(angle)
        const y = center + labelDist * Math.sin(angle)
        return (
          <div
            key={dim.dimension}
            className="absolute text-[10px] font-medium text-muted-foreground text-center w-16 -translate-x-1/2 -translate-y-1/2"
            style={{ left: x, top: y }}
          >
            {dim.label.split(" ")[0]}
          </div>
        )
      })}
    </div>
  )
}
