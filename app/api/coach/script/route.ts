import { NextRequest, NextResponse } from "next/server"

// ============================================================
// AI Script Generator — "Give me the words"
//
// She describes the situation. We give her exactly what to say.
// Not generic advice — actual words she can use, adapted to
// her specific relationship, her specific context, and her
// specific communication style.
//
// This is the feature she'll screenshot and send to a friend.
//
// Cost: ~$0.002/call
// ============================================================

export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY

  if (!apiKey) {
    return NextResponse.json({ error: "AI not configured" }, { status: 503 })
  }

  try {
    const body = await request.json()
    const { situation, person, archetype, tone } = body as {
      situation: string
      person: "partner" | "child" | "school" | "family" | "friend" | "other"
      archetype?: string
      tone?: "gentle" | "firm" | "direct"
    }

    const systemPrompt = `You write communication scripts for overwhelmed mothers who know what they want to say but can't find the words. She's described a situation and who she needs to talk to. Your job is to give her EXACT WORDS she can use.

RESPONSE FORMAT (follow exactly):

OPENING: [The first thing to say — how to start the conversation. 1-2 sentences max. Should feel natural, not rehearsed.]

CORE_MESSAGE: [The main thing she needs to communicate. 2-4 sentences. Clear, honest, non-blaming. Uses "I" statements where appropriate. Specific to her situation.]

IF_THEY_REACT_BADLY: [What to say if the other person gets defensive, dismisses her, or pushes back. 1-2 sentences. Holds the boundary without escalating.]

CLOSING: [How to end the conversation or transition out. 1 sentence. Leaves the door open for relationship repair if appropriate.]

TONE_NOTE: [One sentence about HOW to deliver this — body language, timing, or energy to bring.]

RULES:
- Give her EXACT WORDS in quotes that she can say verbatim
- Scripts must feel natural and conversational — not therapy-speak
- Never passive-aggressive, never manipulative, never punishing
- Adapt to the relationship: partner scripts are different from school scripts
- If it's about her child: age-appropriate, repair-focused, honest
- If it's about her partner: non-blaming, specific about needs, not complaints
- If it's school/professional: clear, boundary-maintaining, self-advocating
- If it's family: permission to be brief, permission to not explain
- Never use "mama" or saccharine language
- Keep the total response under 250 words
- The script should feel like something a REAL person would say — not a textbook

TONE GUIDANCE:
- gentle = soft entry, lots of "I feel" language, vulnerable
- firm = clear boundaries, less negotiation, still kind
- direct = minimal preamble, gets to the point, confident

If no tone specified, default to firm-but-kind.`

    const personLabels: Record<string, string> = {
      partner: "her romantic partner / co-parent",
      child: "her child",
      school: "a teacher or school administrator",
      family: "a family member (parent, in-law, sibling)",
      friend: "a friend",
      other: "someone in her life",
    }

    let userPrompt = `Situation: "${situation}"\n`
    userPrompt += `She needs to talk to: ${personLabels[person] || person}\n`
    if (tone) userPrompt += `Desired tone: ${tone}\n`
    if (archetype) userPrompt += `Her archetype: ${archetype} (this informs her communication style)\n`

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
            maxOutputTokens: 600,
          },
        }),
      }
    )

    if (!response.ok) {
      return NextResponse.json({ error: "API failed" }, { status: 500 })
    }

    const result = await response.json()
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || ""

    const parsed = parseScript(text)
    return NextResponse.json(parsed)
  } catch (error) {
    console.error("Script generator error:", error)
    return NextResponse.json({ error: "Generation failed" }, { status: 500 })
  }
}

function parseScript(text: string): {
  opening?: string
  coreMessage?: string
  ifTheyReact?: string
  closing?: string
  toneNote?: string
} {
  const result: Record<string, string> = {}

  const patterns: [string, string][] = [
    ["opening", "OPENING"],
    ["coreMessage", "CORE_MESSAGE"],
    ["ifTheyReact", "IF_THEY_REACT_BADLY"],
    ["closing", "CLOSING"],
    ["toneNote", "TONE_NOTE"],
  ]

  for (const [key, label] of patterns) {
    const regex = new RegExp(`${label}:\\s*([\\s\\S]*?)(?=\\n(?:OPENING|CORE_MESSAGE|IF_THEY_REACT_BADLY|CLOSING|TONE_NOTE):|$)`, "i")
    const match = text.match(regex)
    if (match) {
      result[key] = match[1].trim()
    }
  }

  return result
}
