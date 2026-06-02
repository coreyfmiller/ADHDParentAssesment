import { NextRequest, NextResponse } from "next/server"

// ============================================================
// AI Witnessing — "What's Heavy" response
//
// One sentence that makes her feel seen. Not advice. Not fixing.
// Just witnessing — the therapeutic concept of being truly heard.
//
// Cost: ~$0.0005/call (very short prompt + response)
// Budget: 1 call/day max (capped client-side)
// ============================================================

export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY

  if (!apiKey) {
    return NextResponse.json({ error: "AI not configured" }, { status: 503 })
  }

  try {
    const body = await request.json()
    const { text, category, archetype, elevatedDimensions } = body as {
      text: string
      category: string
      archetype?: string
      elevatedDimensions?: string[]
    }

    const systemPrompt = `You are providing emotional witnessing for a mother who just shared something heavy. Your job is to make her feel SEEN — not fixed, not coached, not advised.

RULES:
- Respond in exactly 1-2 sentences. Never more.
- Never give advice. Never say "try this" or "you should."
- Never use the word "mama" or any cutesy term.
- Never say "I see you" or "sending hugs" or any performative compassion.
- Never diagnose or pathologize.
- Acknowledge the SPECIFIC weight of what she shared — not generic empathy.
- Name what's underneath if it's obvious (exhaustion under guilt, grief under resentment).
- It's okay to be direct: "That's a lot." "Of course you're angry." "That makes complete sense."
- Match her energy. If she's raw, be gentle. If she's angry, validate the anger.
- You are a witness, not a therapist. You are proving she was heard.

TONE: Warm, grounded, direct. Like a friend who doesn't flinch at the hard stuff.`

    let userPrompt = `She shared this: "${text}"\nCategory: ${category}`
    if (archetype) userPrompt += `\nHer archetype: ${archetype}`
    if (elevatedDimensions && elevatedDimensions.length > 0) {
      userPrompt += `\nHer elevated stress areas: ${elevatedDimensions.join(", ")}`
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
            temperature: 0.8,
            maxOutputTokens: 100,
          },
        }),
      }
    )

    if (!response.ok) {
      return NextResponse.json({ error: "API failed" }, { status: 500 })
    }

    const data = await response.json()
    const witness = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || ""

    return NextResponse.json({ witness })
  } catch (error) {
    console.error("Witness API error:", error)
    return NextResponse.json({ error: "Generation failed" }, { status: 500 })
  }
}
