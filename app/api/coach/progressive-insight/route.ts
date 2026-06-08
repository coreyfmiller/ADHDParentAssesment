import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { tier, dimensions, completedPathways, pathwayAnswers } = await req.json()

    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 })
    }

    let systemPrompt = ""
    let maxTokens = 500

    if (tier === 3) {
      maxTokens = 300
      systemPrompt = `You are a warm, insightful psychologist writing a brief initial assessment for a mother who has completed 3 reflections in a self-reflection tool.

Based on her pattern map dimensions and the reflections she's completed so far, write a SHORT initial insight — 2-3 sentences that:
1. Name what's showing up most strongly for her
2. Validate it without diagnosing
3. Create curiosity to continue ("as you share more, the picture will deepen")

Tone: warm, direct, psychologically sophisticated. Like a therapist who genuinely sees her.
Format: Return a JSON object with one field: "insight" (string, 2-3 sentences).
Do NOT diagnose. Do NOT recommend medication. Frame as psychoeducation.`
    } else if (tier === 6) {
      maxTokens = 1500
      systemPrompt = `You are a warm, insightful psychologist writing a mid-point synthesis for a mother who has completed 6 reflections in a self-reflection tool.

Based on her pattern map dimensions, the reflections she's completed, and any pathway-specific answers, write a MEANINGFUL mini-portrait with 3 sections:
1. "dominant" — What pattern is showing up most prominently in her life right now (2-3 sentences)
2. "nervous" — How her nervous system tends to operate under the current load (2-3 sentences)  
3. "insight" — One key insight that connects multiple things she's shared — something she might not have seen on her own (2-3 sentences)

Tone: warm, direct, psychologically sophisticated. Make her feel deeply seen.
Format: Return a JSON object with three fields: "dominant" (string), "nervous" (string), "insight" (string).
Do NOT diagnose. Do NOT recommend medication. Frame as psychoeducation/self-reflection.`
    }

    const userContent = JSON.stringify({
      dimensions,
      completedPathways,
      pathwayAnswers: pathwayAnswers || {},
    })

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userContent },
        ],
        max_tokens: maxTokens,
        temperature: 0.7,
        response_format: { type: "json_object" },
      }),
    })

    if (!response.ok) {
      return NextResponse.json({ error: "AI request failed" }, { status: 500 })
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content
    if (!content) {
      return NextResponse.json({ error: "No response" }, { status: 500 })
    }

    const parsed = JSON.parse(content)
    return NextResponse.json(parsed)
  } catch (error) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}
