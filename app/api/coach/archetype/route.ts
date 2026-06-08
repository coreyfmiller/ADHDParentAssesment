import { NextRequest, NextResponse } from "next/server"

const ARCHETYPE_IDS = [
  "plate-spinner",
  "quiet-volcano",
  "running-on-empty",
  "invisible-architect",
  "the-disappeared",
  "burning-engine",
  "storm-weatherer",
  "weight-bearer",
  "steady-ground",
]

export async function POST(req: NextRequest) {
  try {
    const { dimensions, pathwayAnswers, coachMemory, recentWins, recentHeavy } = await req.json()

    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 })
    }

    const systemPrompt = `You are a clinical psychologist determining which archetype best fits a mother based on her complete self-reflection data.

Available archetypes (choose ONE):
- "plate-spinner" — Cognitive overload is dominant. Brain holds everything, one interruption crashes the system. Working memory maxed.
- "quiet-volcano" — Emotional regulation is the core struggle. Calm outside, erupting inside. Absorbs everyone's emotions until overflow.
- "running-on-empty" — Physical depletion dominates. Not tired — depleted at cellular level. Sleep doesn't fix it. Body in survival mode.
- "invisible-architect" — System friction is primary. Runs the entire household operating system invisibly. Mental load carrier. Unseen labor.
- "the-disappeared" — Identity erosion is central. Lost herself in the role. Doesn't know who she is anymore. Grieving the person she was.
- "burning-engine" — Depleted AND reactive simultaneously. Empty body + overflowing emotions. Snaps then crashes. The hardest combination.
- "storm-weatherer" — Emotional overwhelm + no structure. Every day improvised. No systems hold. Weathering storms without shelter.
- "weight-bearer" — Everything is critical simultaneously. 3+ dimensions at high/critical. Carrying impossible weight across all areas.
- "steady-ground" — Things are manageable right now. Has capacity. Not in crisis.

IMPORTANT: Look at the FULL picture — not just dimension scores. Consider:
- What her reflection answers reveal about her lived experience
- Patterns in what she finds heavy, what she wins at, what the coach has noticed
- The interaction between dimensions (how they compound)
- Whether one archetype captures her PRIMARY struggle better than others

Return JSON: { "archetypeId": "one-of-the-ids-above", "reasoning": "2-3 sentences explaining why this fits her based on the full picture" }`

    const userContent = JSON.stringify({
      dimensions,
      pathwayAnswers: pathwayAnswers || {},
      coachMemory: coachMemory || {},
      recentWins: recentWins || [],
      recentHeavy: recentHeavy || [],
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
        max_tokens: 300,
        temperature: 0.3,
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

    // Validate the archetype ID
    if (!ARCHETYPE_IDS.includes(parsed.archetypeId)) {
      return NextResponse.json({ error: "Invalid archetype returned" }, { status: 500 })
    }

    return NextResponse.json(parsed)
  } catch (error) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}
