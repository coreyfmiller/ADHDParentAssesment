import { NextRequest, NextResponse } from "next/server"

// ============================================================
// AI Profile Synthesis — The Whole Picture
//
// Called ONCE after she completes pathways (or retakes).
// Generates a deep, personalized synthesis that reads like it
// was written by a psychologist who spent an hour with her.
//
// This is not a diagnosis. It's recognition. The feeling of
// "someone finally understands what's happening to me."
//
// Cost: ~$0.003/call (longer output, rich context)
// Budget: 1 call per assessment cycle (cached until retake)
// ============================================================

interface ProfileContext {
  dimensions: { label: string; intensity: string; score: number; maxScore: number }[]
  archetype?: string
  completedPathways: string[]
  stackingChains: { chain: string[]; description: string }[]
  strengths: { area: string; description: string }[]
  leveragePoints: { title: string; description: string; impact: string }[]
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY

  if (!apiKey) {
    return NextResponse.json({ error: "AI not configured" }, { status: 503 })
  }

  try {
    const body = await request.json()
    const ctx = body as ProfileContext

    const systemPrompt = `You are a clinical psychologist with expertise in maternal mental health, ADHD in women, burnout, and nervous system regulation. You've reviewed a mother's complete self-assessment data across multiple dimensions.

Your task is to write THREE distinct pieces:

1. DEEP_NARRATIVE — A 4-6 sentence paragraph that synthesizes her complete picture. Write it like you're explaining her pattern to HER in a session — warm, direct, insightful. Not a report. A recognition. She should read this and think "yes, that's exactly it." Connect the dots between her dimensions. Name what's underneath the symptoms. Make her feel understood at a level she hasn't experienced before.

2. CROSS_PATTERNS — 3-4 specific insights about how her patterns INTERACT with each other. These are things she might not see because she's inside them. Format each as a brief insight (2-3 sentences). Focus on:
   - How one dimension worsens another
   - Hidden connections she might not have identified
   - Where a single change could create cascading relief
   - Seasonal or cyclical patterns that compound

3. PERSONAL_INSIGHT — One powerful, specific observation about her that goes beyond the data. Something a skilled clinician would notice. The "between the lines" reading. One sentence that makes her feel genuinely seen. This should feel like a moment of therapeutic recognition.

CRITICAL RULES:
- Never diagnose. Never say "you have ADHD/depression/anxiety."
- Never recommend medication or specific treatments.
- Use "your brain" or "your nervous system" not "your disorder."
- Frame everything as patterns and adaptations, not pathology.
- Be specific to HER data. No generic statements that could apply to anyone.
- Write at a literacy level that feels accessible, not clinical.
- Never use "mama." Never be saccharine. Be a professional who also happens to be kind.
- This is psychoeducation and self-reflection support, NOT a clinical assessment.

RESPONSE FORMAT (follow exactly):
DEEP_NARRATIVE: [your paragraph]
---
CROSS_PATTERNS:
- [insight 1]
- [insight 2]
- [insight 3]
- [insight 4 if relevant]
---
PERSONAL_INSIGHT: [your one sentence]`

    let userPrompt = "Here is this person's complete assessment data:\n\n"

    userPrompt += "DIMENSION SCORES:\n"
    for (const dim of ctx.dimensions) {
      const pct = Math.round((dim.score / dim.maxScore) * 100)
      userPrompt += `- ${dim.label}: ${dim.intensity} (${pct}%)\n`
    }

    if (ctx.archetype) {
      userPrompt += `\nARCHETYPE: ${ctx.archetype}\n`
    }

    userPrompt += `\nCOMPLETED PATHWAYS: ${ctx.completedPathways.join(", ")}\n`

    if (ctx.stackingChains.length > 0) {
      userPrompt += "\nSTACKING CHAINS DETECTED:\n"
      for (const chain of ctx.stackingChains) {
        userPrompt += `- ${chain.chain.join(" → ")}: ${chain.description}\n`
      }
    }

    if (ctx.strengths.length > 0) {
      userPrompt += "\nSTRENGTHS/STABLE AREAS:\n"
      for (const s of ctx.strengths) {
        userPrompt += `- ${s.area}: ${s.description}\n`
      }
    }

    if (ctx.leveragePoints.length > 0) {
      userPrompt += "\nLEVERAGE POINTS IDENTIFIED:\n"
      for (const lp of ctx.leveragePoints) {
        userPrompt += `- ${lp.title} (${lp.impact} impact): ${lp.description}\n`
      }
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemPrompt }] },
          contents: [{ role: "user", parts: [{ text: userPrompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024,
          },
        }),
      }
    )

    if (!response.ok) {
      return NextResponse.json({ error: "API failed" }, { status: 500 })
    }

    const result = await response.json()
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || ""

    // Parse structured response
    const parsed = parseResponse(text)

    return NextResponse.json(parsed)
  } catch (error) {
    console.error("Profile synthesis error:", error)
    return NextResponse.json({ error: "Generation failed" }, { status: 500 })
  }
}

function parseResponse(text: string): {
  deepNarrative?: string
  crossPatterns?: string[]
  personalInsight?: string
} {
  const result: {
    deepNarrative?: string
    crossPatterns?: string[]
    personalInsight?: string
  } = {}

  // Extract deep narrative
  const narrativeMatch = text.match(/DEEP_NARRATIVE:\s*([\s\S]*?)(?=---|\n(?:CROSS_PATTERNS|PERSONAL_INSIGHT))/i)
  if (narrativeMatch) {
    result.deepNarrative = narrativeMatch[1].trim()
  }

  // Extract cross patterns
  const patternsMatch = text.match(/CROSS_PATTERNS:\s*([\s\S]*?)(?=---|\nPERSONAL_INSIGHT)/i)
  if (patternsMatch) {
    const lines = patternsMatch[1].trim().split("\n")
    result.crossPatterns = lines
      .map((l) => l.replace(/^[-•*]\s*/, "").trim())
      .filter((l) => l.length > 10)
  }

  // Extract personal insight
  const insightMatch = text.match(/PERSONAL_INSIGHT:\s*(.+)/i)
  if (insightMatch) {
    result.personalInsight = insightMatch[1].trim()
  }

  return result
}
