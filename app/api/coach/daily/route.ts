import { NextRequest, NextResponse } from "next/server"

// ============================================================
// Daily AI Generation — One call per user per day
// Generates both a personalized One Thing and Identity Anchor
// based on the user's full context.
//
// Cost: ~$0.001/call with Gemini Flash
// Budget: 1 call/user/day = ~$0.03/user/month
// ============================================================

interface DailyContext {
  archetype?: string
  hardThing?: string
  hardThingTags?: string[]
  elevatedDimensions?: string[]
  recentWins?: string[]
  energyTrend?: string
  dayOfWeek?: number
  oneThingStreak?: number
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY

  if (!apiKey) {
    return NextResponse.json(
      { error: "AI not configured" },
      { status: 503 }
    )
  }

  try {
    const body = await request.json()
    const ctx = body as DailyContext

    const prompt = buildDailyPrompt(ctx)

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: getSystemInstruction() }],
          },
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.8,
            maxOutputTokens: 512,
          },
        }),
      }
    )

    if (!response.ok) {
      return NextResponse.json({ error: "API call failed" }, { status: 500 })
    }

    const data = await response.json()
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || ""

    // Parse the structured response
    const parsed = parseResponse(text)

    return NextResponse.json(parsed)
  } catch (error) {
    console.error("Daily AI generation error:", error)
    return NextResponse.json({ error: "Generation failed" }, { status: 500 })
  }
}

function getSystemInstruction(): string {
  return `You generate daily personalized content for a self-reflection app for overwhelmed mothers. You produce exactly two pieces of content per request:

1. ONE THING TODAY — A single, specific, low-friction micro-action she can do today. Must be:
   - Completable in under 5 minutes
   - Concrete and specific (not vague advice)
   - Matched to her current capacity and context
   - Never preachy, never condescending
   - If she has a hard thing coming this week, sometimes prep her for it

2. IDENTITY ANCHOR — A single statement about who she is today. Must be:
   - Written in second person ("Today you are...")
   - Grounded in her actual situation, not generic affirmation
   - Never toxic positivity — honest and compassionate
   - References her real context when possible (her archetype, her wins, her struggles)

RULES:
- Never diagnose. Never provide medical advice. Never recommend medication.
- Frame everything as psychoeducation and self-reflection.
- Match her energy — if she's depleted, don't suggest high-energy things.
- Be direct and warm. Not saccharine. Not performative.
- You are NOT a therapist. You're a knowledgeable friend.

RESPONSE FORMAT (follow exactly):
ONE_THING: [the action]
ONE_THING_WHY: [one sentence explaining why this helps — grounded in psychology]
ONE_THING_TIME: [time needed, e.g. "2 min"]
ANCHOR: [the identity statement]`
}

function buildDailyPrompt(ctx: DailyContext): string {
  const parts: string[] = ["Generate today's One Thing and Identity Anchor for this person:"]

  if (ctx.archetype) {
    parts.push(`Her archetype: ${ctx.archetype}`)
  }

  if (ctx.elevatedDimensions && ctx.elevatedDimensions.length > 0) {
    parts.push(`Her elevated stress dimensions: ${ctx.elevatedDimensions.join(", ")}`)
  }

  if (ctx.hardThing) {
    parts.push(`This week's hard thing she identified: "${ctx.hardThing}" (tags: ${ctx.hardThingTags?.join(", ") || "none"})`)
  }

  if (ctx.recentWins && ctx.recentWins.length > 0) {
    parts.push(`Recent wins she logged: ${ctx.recentWins.slice(0, 5).join("; ")}`)
  }

  if (ctx.energyTrend) {
    parts.push(`Her energy trend this week: ${ctx.energyTrend}`)
  }

  if (ctx.oneThingStreak && ctx.oneThingStreak > 2) {
    parts.push(`She's on a ${ctx.oneThingStreak}-day streak of completing her One Thing.`)
  }

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  if (ctx.dayOfWeek !== undefined) {
    parts.push(`Today is ${dayNames[ctx.dayOfWeek]}.`)
  }

  return parts.join("\n")
}

function parseResponse(text: string): {
  oneThing?: { action: string; why: string; timeNeeded: string }
  anchor?: string
} {
  const result: {
    oneThing?: { action: string; why: string; timeNeeded: string }
    anchor?: string
  } = {}

  const actionMatch = text.match(/ONE_THING:\s*(.+)/i)
  const whyMatch = text.match(/ONE_THING_WHY:\s*(.+)/i)
  const timeMatch = text.match(/ONE_THING_TIME:\s*(.+)/i)
  const anchorMatch = text.match(/ANCHOR:\s*(.+)/i)

  if (actionMatch && whyMatch && timeMatch) {
    result.oneThing = {
      action: actionMatch[1].trim(),
      why: whyMatch[1].trim(),
      timeNeeded: timeMatch[1].trim(),
    }
  }

  if (anchorMatch) {
    result.anchor = anchorMatch[1].trim()
  }

  return result
}
