import { NextRequest, NextResponse } from "next/server"

// ============================================================
// Hard Thing Support — AI-generated response when she names
// what's weighing on her this week.
//
// The response does THREE things:
// 1. Acknowledges what she named (so she feels heard)
// 2. Gives her ONE concrete thing she can do today to prepare
// 3. Offers a grounding reframe (you don't have to be perfect at this)
//
// This replaces the static tag-based prep suggestions with
// something that actually understands what she wrote.
//
// Cost: ~$0.001/call, once per week when she sets her hard thing
// ============================================================

export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY

  if (!apiKey) {
    return NextResponse.json({ error: "AI not configured" }, { status: 503 })
  }

  try {
    const body = await request.json()
    const { text, archetype, dayOfWeek } = body as {
      text: string
      archetype?: string
      dayOfWeek?: number
    }

    const systemPrompt = `You provide brief, practical support when a mother names something hard that's coming up in her week. She's just told you what's weighing on her. Your job is to respond in a way that makes her feel heard AND gives her something useful.

YOUR RESPONSE FORMAT (follow exactly):
ACKNOWLEDGMENT: [1 sentence that names what's actually hard about this — not generic empathy, the SPECIFIC emotional/logistical weight of what she described]
ONE_THING: [1 specific, concrete action she can do TODAY to feel 5% more prepared. Not a to-do list. One thing. Make it doable in under 5 minutes.]
REFRAME: [1 sentence that gives her permission to not be perfect at this. A grounding truth.]

RULES:
- Be SPECIFIC to what she wrote. If she said "dentist appointment," don't give advice about "social situations."
- If it's a custody/co-parenting thing — be sensitive. No judgment about the situation.
- If it's a medical appointment — focus on preparation, not anxiety.
- If it's a social obligation — focus on energy protection, not performance.
- If it's a work thing — separate work-self from home-self.
- If it's about her kids — validate that advocating for them is exhausting.
- Never diagnose. Never give medical advice. Never be saccharine.
- Never use "mama." Never use exclamation points.
- Tone: direct, warm, practical. Like a friend who gets logistics AND feelings.
- Keep the total response under 80 words.`

    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let userPrompt = `She said her hard thing this week is: "${text}"`
    if (archetype) userPrompt += `\nHer archetype: ${archetype}`
    if (dayOfWeek !== undefined) userPrompt += `\nToday is ${dayNames[dayOfWeek]}.`

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
            maxOutputTokens: 200,
          },
        }),
      }
    )

    if (!response.ok) {
      return NextResponse.json({ error: "API failed" }, { status: 500 })
    }

    const result = await response.json()
    const raw = result.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || ""

    // Parse structured response
    const parsed = parseResponse(raw)

    return NextResponse.json(parsed)
  } catch (error) {
    console.error("Hard thing API error:", error)
    return NextResponse.json({ error: "Generation failed" }, { status: 500 })
  }
}

function parseResponse(text: string): {
  acknowledgment?: string
  oneThing?: string
  reframe?: string
} {
  const result: { acknowledgment?: string; oneThing?: string; reframe?: string } = {}

  const ackMatch = text.match(/ACKNOWLEDGMENT:\s*(.+)/i)
  const oneMatch = text.match(/ONE_THING:\s*(.+)/i)
  const reframeMatch = text.match(/REFRAME:\s*(.+)/i)

  if (ackMatch) result.acknowledgment = ackMatch[1].trim()
  if (oneMatch) result.oneThing = oneMatch[1].trim()
  if (reframeMatch) result.reframe = reframeMatch[1].trim()

  return result
}
