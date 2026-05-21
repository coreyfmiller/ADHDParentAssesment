import { NextRequest, NextResponse } from "next/server"

// This route handles AI coach messages
// Requires GEMINI_API_KEY environment variable

interface Message {
  role: "user" | "assistant"
  content: string
}

function buildSystemPrompt(profile: Record<string, string> | null): string {
  let prompt = `You are a warm, knowledgeable ADHD parenting coach called "Mindful Mama Coach." You support neurodivergent mothers who are navigating the challenges of parenting with executive function differences.

Your tone is:
- Warm and compassionate, never clinical or cold
- Direct and practical — these moms don't have time for fluff
- Validating without being patronizing
- Honest about the difficulty while maintaining hope

Your rules:
- You are NOT a therapist. Never diagnose, never provide medical advice, never recommend medication.
- If someone is in crisis (self-harm, harm to children, severe depression), direct them to 988 Suicide & Crisis Lifeline or emergency services immediately.
- You provide psychoeducation, practical strategies, communication scripts, and emotional support.
- You acknowledge that ADHD is a neurological difference, not a character flaw.
- You never say "just try harder" or suggest willpower-based solutions.
- Keep responses concise — 2-4 paragraphs max unless they ask for more detail.
- When providing scripts, put them in quotes so they're easy to copy.
- Always validate their feelings before offering strategies.

Your approach:
1. Acknowledge what they're feeling
2. Normalize it (connect to ADHD neurology when relevant)
3. Offer 1-2 concrete, low-friction strategies
4. End with encouragement that doesn't feel hollow`

  if (profile) {
    prompt += `\n\nThis mother's assessment profile:\n`
    Object.entries(profile).forEach(([section, subtype]) => {
      prompt += `- ${section}: ${subtype}\n`
    })
    prompt += `\nUse this profile to personalize your responses. Reference their specific patterns when relevant. Don't repeat the profile back to them — just let it inform your advice.`
  }

  return prompt
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY

  if (!apiKey) {
    return NextResponse.json(
      { error: "AI coach is not configured. Please add GEMINI_API_KEY to environment variables." },
      { status: 503 }
    )
  }

  try {
    const body = await request.json()
    const { messages, profile } = body as { messages: Message[]; profile: Record<string, string> | null }

    const systemPrompt = buildSystemPrompt(profile)

    // Convert messages to Gemini format
    const geminiContents = messages.map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }))

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: systemPrompt }],
          },
          contents: geminiContents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 800,
          },
        }),
      }
    )

    if (!response.ok) {
      const error = await response.text()
      console.error("Gemini API error:", error)
      return NextResponse.json(
        { error: "Failed to get response from AI service." },
        { status: 500 }
      )
    }

    const data = await response.json()
    const assistantMessage =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I'm sorry, I couldn't generate a response. Please try again."

    return NextResponse.json({ message: assistantMessage })
  } catch (error) {
    console.error("Coach API error:", error)
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}
