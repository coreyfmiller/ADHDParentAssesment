import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { dimensions, pathwayAnswers, coachMemory, recentWins, recentHeavy, hardThings, archetypeName, userBasics } = await req.json()

    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 })
    }

    const systemPrompt = `You are a leading clinical psychologist writing a comprehensive psychological profile for a mother who has completed 12 in-depth self-reflections. This is the most important content in the app — it should make her feel DEEPLY seen, understood, and validated.

You have access to:
- Her pattern map dimensions (5 scores showing cognitive load, emotional bandwidth, physical depletion, system friction, identity erosion)
- Her answers across 12 reflections covering: executive function, burnout, sensory overwhelm, hormonal patterns, sleep, trauma/nervous system, systemic load, attachment, self-worth, rage/emotional dysregulation, matrescence/identity, social connection
- What her AI coach has noticed about her (facts, patterns, strategies discussed)
- Her recent wins and what's been heavy for her
- Her archetype
- Her basic demographics (if available)

Write a COMPREHENSIVE analysis. This should feel like a 45-minute therapy intake distilled into rich, readable sections. Be warm, direct, psychologically sophisticated. Use second person ("you"). Never diagnose. Frame as psychoeducation and reflection.

Return JSON with these fields:
{
  "reflectionInsights": [
    { "pathway": "pathway name", "insight": "2-3 sentences about what emerged from this specific reflection — what it reveals about her" }
  ],
  "crossPatterns": [
    { "title": "short title", "description": "2-3 sentences about how two or more patterns interact/compound in her life" }
  ],
  "strengths": [
    { "title": "strength name", "description": "1-2 sentences about a genuine strength her data reveals — not toxic positivity, real evidence of capability" }
  ],
  "nervousSystemProfile": "3-4 sentences. How her nervous system operates: what her default state is, what pushes her into dysregulation, where her window of tolerance narrows",
  "capacityMap": "3-4 sentences. When she has most capacity, when she has least, what depletes her fastest, what (if anything) restores her",
  "relationalSignature": "3-4 sentences. How she shows up in relationships under stress — does she withdraw, over-give, people-please, rage? What she needs from others that she's not getting",
  "identityCore": "3-4 sentences. Who she is underneath the role. What she values most deeply. Where the tension lives between who she is and who she's expected to be",
  "parentingWisdom": "3-4 sentences. Her parenting style under pressure. What triggers her most with her children and why. What she's already doing well that she can't see",
  "growthEdge": "3-4 sentences. The one shift that would create the most change right now — not 10 things, ONE thing. Based on her full data, where is the highest-leverage intervention point?",
  "seasonSummary": "2-3 sentences. What season of motherhood she's in right now and what that season typically needs",
  "letterToHer": "4-5 sentences. A compassionate, direct letter from 'future her' — the version of her who made it through this season. Warm, specific to her data, not generic motivation"
}

Generate ALL fields. Be specific to her data — reference actual patterns, actual answers, actual behaviours. Generic content is worthless. She gave you 12 reflections worth of vulnerable truth. Honour that with specificity.`

    const userContent = JSON.stringify({
      dimensions,
      pathwayAnswers: pathwayAnswers || {},
      coachMemory: coachMemory || {},
      recentWins: recentWins || [],
      recentHeavy: recentHeavy || [],
      hardThings: hardThings || [],
      archetypeName: archetypeName || null,
      userBasics: userBasics || null,
    })

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userContent },
        ],
        max_tokens: 8000,
        temperature: 0.7,
        response_format: { type: "json_object" },
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      console.error("Full analysis API error:", err)
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
    console.error("Full analysis error:", error)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}
