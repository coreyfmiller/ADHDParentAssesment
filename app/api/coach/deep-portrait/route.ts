import { NextRequest, NextResponse } from "next/server"

// ============================================================
// Deep Portrait — AI-generated psychological portrait
//
// The most intimate page in the app. This generates a complete
// portrait of who she is based on ALL data we have: assessment,
// pathways, daily interactions, coach conversations.
//
// This should feel like what happens after 6 months of therapy —
// that moment where someone reflects back who you are and you
// think "nobody has ever understood me this clearly."
//
// Cost: ~$0.005/call (long output, rich context)
// Budget: 1 call per assessment cycle, cached until retake
// ============================================================

interface PortraitContext {
  dimensions: { label: string; intensity: string; score: number; maxScore: number }[]
  archetype?: string
  completedPathways: string[]
  coachMemory: { facts: string[]; patterns: string[]; strategies: string[] }
  recentWins: string[]
  recentHeavy: string[]
  energyTrend: string
  avgEnergy: number | null
  hardThings: string[]
  daysActive: number
  totalWins: number
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY

  if (!apiKey) {
    return NextResponse.json({ error: "AI not configured" }, { status: 503 })
  }

  try {
    const body = await request.json()
    const ctx = body as PortraitContext

    const systemPrompt = `You are a clinical psychologist specializing in maternal mental health, ADHD in women, nervous system regulation, and burnout. You have reviewed extensive self-assessment data from a mother. Your task is to write a DEEP PSYCHOLOGICAL PORTRAIT — the kind of reflection a brilliant clinician would offer after truly understanding someone.

This is not a report. It is a mirror. She should read this and feel SEEN at a level she has never experienced from an app — possibly deeper than most therapy sessions have reached.

Generate EXACTLY these sections in this format:

NERVOUS_SYSTEM: [3-5 sentences about her dominant stress response (fight/flight/freeze/fawn), her window of tolerance, what narrows it, and what happens when she exceeds it. Be specific to her data. Name what her body does, not just what she feels.]

CAPACITY_RHYTHM: [3-5 sentences about when her capacity is highest/lowest, what depletes her fastest, how her energy patterns interact with her responsibilities, and what this means for how she should structure her days.]

RELATIONAL_PATTERN: [3-5 sentences about how she relates to others under stress — does she withdraw, accommodate, mask, pursue? What does this cost her? How does help-seeking work for her? What do the people around her see vs. what's actually happening inside?]

IDENTITY_TRUTH: [3-5 sentences about who she is underneath the overwhelm — what threads of self are still alive based on her data, what she's grieving, what's trying to come back. Name something specific she might not have noticed about herself.]

PARENTING_PATTERN: [3-5 sentences about her parenting triggers, her rupture-repair cycle, and what her children likely experience from her. Name this with deep compassion — she already carries enough guilt. Frame it as: what her children are GETTING from her, not what they're missing.]

SEASON: [2-3 sentences about what season she's in right now — contraction, expansion, survival, rebuilding — and what that season needs from her. Name it clearly.]

FUTURE_LETTER: [4-6 sentences written AS IF from the version of her 6 months from now. Written in first person, to her current self. Warm, specific to her actual patterns, grounded in earned hope. Reference specific things from her data that might be different by then. Not toxic positivity — the kind of hope that comes from evidence, not wishes.]

CRITICAL RULES:
- Never diagnose. Say "your nervous system does X" not "you have X disorder."
- Never recommend medication or specific treatments.
- Be SPECIFIC to her data. No generic statements.
- Write with warmth and directness. No clinical distance. No saccharine.
- Never use "mama." Be professional AND kind.
- This is psychoeducation, not a clinical assessment. Make that clear in tone.
- The goal is recognition — she reads this and thinks "yes, that's me."
- When discussing her children's experience of her, be DEEPLY compassionate. She already carries enough guilt.
- Keep each section tight. This is a portrait, not a textbook.`

    let userPrompt = "Generate a deep psychological portrait from this data:\n\n"

    userPrompt += "DIMENSION SCORES:\n"
    for (const dim of ctx.dimensions) {
      const pct = Math.round((dim.score / dim.maxScore) * 100)
      userPrompt += `- ${dim.label}: ${dim.intensity} (${pct}%)\n`
    }

    if (ctx.archetype) userPrompt += `\nARCHETYPE: ${ctx.archetype}\n`
    userPrompt += `\nCOMPLETED PATHWAYS: ${ctx.completedPathways.join(", ")}\n`

    if (ctx.coachMemory.facts.length > 0) {
      userPrompt += `\nKNOWN FACTS ABOUT HER LIFE:\n`
      ctx.coachMemory.facts.forEach(f => { userPrompt += `- ${f}\n` })
    }

    if (ctx.coachMemory.patterns.length > 0) {
      userPrompt += `\nRECURRING PATTERNS OBSERVED:\n`
      ctx.coachMemory.patterns.forEach(p => { userPrompt += `- ${p}\n` })
    }

    if (ctx.coachMemory.strategies.length > 0) {
      userPrompt += `\nSTRATEGIES SHE'S TRIED:\n`
      ctx.coachMemory.strategies.forEach(s => { userPrompt += `- ${s}\n` })
    }

    if (ctx.recentWins.length > 0) {
      userPrompt += `\nRECENT WINS SHE LOGGED: ${ctx.recentWins.join("; ")}\n`
    }

    if (ctx.recentHeavy.length > 0) {
      userPrompt += `\nTHINGS SHE SAID WERE HEAVY RECENTLY: ${ctx.recentHeavy.join("; ")}\n`
    }

    if (ctx.avgEnergy) {
      userPrompt += `\nAVERAGE ENERGY LEVEL: ${ctx.avgEnergy.toFixed(1)}/5 (trend: ${ctx.energyTrend})\n`
    }

    if (ctx.hardThings.length > 0) {
      userPrompt += `\nHARD THINGS SHE'S NAMED RECENTLY: ${ctx.hardThings.join("; ")}\n`
    }

    userPrompt += `\nENGAGEMENT: ${ctx.daysActive} days active, ${ctx.totalWins} total wins logged\n`

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemPrompt }] },
          contents: [{ role: "user", parts: [{ text: userPrompt }] }],
          generationConfig: {
            temperature: 0.75,
            maxOutputTokens: 8000,
          },
        }),
      }
    )

    if (!response.ok) {
      return NextResponse.json({ error: "API failed" }, { status: 500 })
    }

    const result = await response.json()
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || ""

    const parsed = parsePortrait(text)
    return NextResponse.json(parsed)
  } catch (error) {
    console.error("Deep portrait error:", error)
    return NextResponse.json({ error: "Generation failed" }, { status: 500 })
  }
}

function parsePortrait(text: string): Record<string, string> {
  const sections: Record<string, string> = {}
  const keys = ["NERVOUS_SYSTEM", "CAPACITY_RHYTHM", "RELATIONAL_PATTERN", "IDENTITY_TRUTH", "PARENTING_PATTERN", "SEASON", "FUTURE_LETTER"]

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const startPattern = new RegExp(`${key}\\s*:`, "i")
    const startMatch = text.match(startPattern)
    if (!startMatch || startMatch.index === undefined) continue

    const contentStart = startMatch.index + startMatch[0].length

    // Find where this section ends (start of next key, or end of text)
    let contentEnd = text.length
    for (let j = i + 1; j < keys.length; j++) {
      const nextPattern = new RegExp(`\\n\\s*${keys[j]}\\s*:`, "i")
      const nextMatch = text.slice(contentStart).match(nextPattern)
      if (nextMatch && nextMatch.index !== undefined) {
        contentEnd = contentStart + nextMatch.index
        break
      }
    }

    const content = text.slice(contentStart, contentEnd).replace(/^[\s\-—]+/, "").trim()
    if (content.length > 10) {
      sections[key.toLowerCase().replace(/_/g, "")] = content
    }
  }

  return sections
}
