import { NextRequest, NextResponse } from "next/server"

// ============================================================
// Weekly Recap — AI-generated summary of her week
//
// One call per week, generates a personal 4-5 sentence letter
// from the coach summarizing what happened, what she did,
// and what patterns are emerging.
//
// Cost: ~$0.001/call
// Budget: 1 call/user/week
// ============================================================

interface WeeklyData {
  winsCount: number
  winsExamples: string[]
  oneThingCompleted: number
  oneThingTotal: number
  hardThing?: string
  hardThingResolved?: boolean
  hardThingOutcome?: string
  energyAverage?: number
  energyTrend?: string
  archetype?: string
  pulseCount?: number
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY

  if (!apiKey) {
    return NextResponse.json({ error: "AI not configured" }, { status: 503 })
  }

  try {
    const body = await request.json()
    const data = body as WeeklyData

    const systemPrompt = `You write weekly recaps for a self-reflection app for overwhelmed mothers. You're writing a short, personal summary of HER specific week — like a letter from a coach who's been watching.

RULES:
- Write exactly 4-5 sentences. No more.
- Reference her SPECIFIC data — wins she logged, her hard thing, her energy.
- Notice patterns and name them: "Your energy dipped mid-week but recovered" or "You showed up 5 out of 7 days."
- Be warm but not saccharine. Direct but not clinical.
- Never diagnose. Never use "mama." Never say "I'm so proud of you" (patronizing).
- End with something that makes her want to come back next week.
- If it was a hard week (low wins, low energy, missed days) — be gentle and normalize it.
- If it was a strong week — name it without over-celebrating.
- Never compare her to other users or any standard.

TONE: Like a text from a wise friend on Sunday night. Brief, real, grounded.`

    let userPrompt = `Write a weekly recap for this person's week:\n`
    userPrompt += `- Wins logged: ${data.winsCount}`
    if (data.winsExamples.length > 0) {
      userPrompt += ` (examples: ${data.winsExamples.slice(0, 5).join(", ")})`
    }
    userPrompt += `\n- One Thing completed: ${data.oneThingCompleted} of ${data.oneThingTotal} days`
    if (data.hardThing) {
      userPrompt += `\n- Hard thing this week: "${data.hardThing}"`
      if (data.hardThingResolved) {
        userPrompt += ` — she marked it as: ${data.hardThingOutcome || "resolved"}`
      } else {
        userPrompt += ` — not yet resolved`
      }
    }
    if (data.energyAverage) {
      userPrompt += `\n- Average energy: ${data.energyAverage.toFixed(1)}/5`
    }
    if (data.energyTrend) {
      userPrompt += ` (trend: ${data.energyTrend})`
    }
    if (data.archetype) {
      userPrompt += `\n- Her archetype: ${data.archetype}`
    }
    if (data.pulseCount) {
      userPrompt += `\n- Pulse check-ins this week: ${data.pulseCount}`
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
            maxOutputTokens: 256,
          },
        }),
      }
    )

    if (!response.ok) {
      return NextResponse.json({ error: "API failed" }, { status: 500 })
    }

    const result = await response.json()
    const recap = result.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || ""

    return NextResponse.json({ recap })
  } catch (error) {
    console.error("Weekly recap error:", error)
    return NextResponse.json({ error: "Generation failed" }, { status: 500 })
  }
}
