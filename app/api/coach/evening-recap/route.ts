import { NextRequest, NextResponse } from "next/server"

// ============================================================
// Evening Recap — "Here's What You Actually Did Today"
//
// Triggered after 6pm. One call per evening. Generates a 2-3
// sentence summary of her day focused on EVIDENCE of showing up.
// Not cheerleading. Not "you're amazing." Just: here's what
// you did. It was real. It counted.
//
// Psychology: Evening is when rumination peaks and self-criticism
// intensifies. Providing concrete evidence of action interrupts
// the "I did nothing today" narrative that depleted mothers
// default to.
//
// Cost: ~$0.0005/call (short prompt, short response)
// Budget: 1 call/user/day (evening only)
// ============================================================

interface EveningData {
  wins: string[]
  oneThingAction?: string
  oneThingCompleted: boolean
  pulseEnergies: number[]
  heavyThings: string[]
  hardThing?: string
  archetype?: string
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY

  if (!apiKey) {
    return NextResponse.json({ error: "AI not configured" }, { status: 503 })
  }

  try {
    const body = await request.json()
    const data = body as EveningData

    const systemPrompt = `You write evening recaps for overwhelmed mothers — a short summary of what they ACTUALLY did today. Your job is to counter the "I did nothing" narrative by presenting the evidence.

RULES:
- Write exactly 2-3 sentences. Never more.
- Be specific — reference the actual things she logged, not generic praise.
- Focus on EVIDENCE, not feelings. "You did X, Y, and Z" not "You're amazing."
- If she logged something heavy, acknowledge she faced it: "You named what was hard instead of swallowing it."
- If she completed her One Thing, note it simply.
- Never use "mama." Never use exclamation points. Never say "proud of you."
- Tone: matter-of-fact warmth. Like reading a receipt of your day that makes you think "oh, I guess I did do things."
- If she only did one thing — that's still worth naming. "One thing on a hard day is still one thing."
- End with something grounding, not aspirational. Not "tomorrow will be better!" — more like "That's today. It happened. You made it happen."

ANTI-PATTERNS (never do these):
- "You're such a good mom!" — patronizing
- "Look at all you accomplished!" — performative
- "I'm so proud of you!" — parasocial
- "Tomorrow is a new day!" — toxic positivity`

    let userPrompt = "Write an evening recap for this person's day:\n"

    if (data.wins.length > 0) {
      userPrompt += `\nWins she logged today (${data.wins.length} total): ${data.wins.slice(0, 8).join("; ")}`
    }

    if (data.oneThingAction) {
      userPrompt += `\nHer One Thing today was: "${data.oneThingAction}" — ${data.oneThingCompleted ? "she completed it" : "she didn't get to it"}`
    }

    if (data.pulseEnergies.length > 0) {
      const avg = data.pulseEnergies.reduce((s, e) => s + e, 0) / data.pulseEnergies.length
      userPrompt += `\nEnergy check-ins today: ${data.pulseEnergies.join(", ")}/5 (average: ${avg.toFixed(1)})`
    }

    if (data.heavyThings.length > 0) {
      userPrompt += `\nShe put down something heavy today: "${data.heavyThings[0]}"`
    }

    if (data.hardThing) {
      userPrompt += `\nThis week's hard thing she's facing: "${data.hardThing}"`
    }

    if (data.archetype) {
      userPrompt += `\nHer archetype: ${data.archetype}`
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
            maxOutputTokens: 150,
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
    console.error("Evening recap error:", error)
    return NextResponse.json({ error: "Generation failed" }, { status: 500 })
  }
}
