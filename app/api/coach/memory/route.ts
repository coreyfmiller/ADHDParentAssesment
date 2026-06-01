import { NextRequest, NextResponse } from "next/server"
import { MEMORY_EXTRACTION_PROMPT } from "@/lib/coach-memory"

// This route extracts memory from a completed conversation
// Called when the user starts a new chat (to summarize the old one)

interface Message {
  role: "user" | "assistant"
  content: string
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY

  if (!apiKey) {
    return NextResponse.json({ error: "Not configured" }, { status: 503 })
  }

  try {
    const body = await request.json()
    const { messages } = body as { messages: Message[] }

    // Only extract memory if there was a meaningful conversation (3+ messages)
    if (messages.length < 3) {
      return NextResponse.json({ memory: "" })
    }

    // Build the conversation as context + ask for memory extraction
    const conversationText = messages
      .map((m) => `${m.role === "user" ? "Her" : "Coach"}: ${m.content}`)
      .join("\n\n")

    const prompt = `Here is a coaching conversation:\n\n${conversationText}\n\n${MEMORY_EXTRACTION_PROMPT}`

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 1024,
          },
        }),
      }
    )

    if (!response.ok) {
      return NextResponse.json({ memory: "" })
    }

    const data = await response.json()
    const memoryText = data.candidates?.[0]?.content?.parts?.[0]?.text || ""

    return NextResponse.json({ memory: memoryText })
  } catch {
    return NextResponse.json({ memory: "" })
  }
}
