import { NextRequest, NextResponse } from "next/server"

// This route handles AI coach messages
// Requires GEMINI_API_KEY environment variable

interface Message {
  role: "user" | "assistant"
  content: string
}

function buildSystemPrompt(
  profile: Record<string, string> | null,
  patternMap?: { dimensions: { label: string; intensity: string; description: string }[] } | null,
  pathwayResults?: Record<string, { pathwayId: string; completedAt: number }> | null
): string {
  let prompt = `You are a supportive, knowledgeable parenting coach. You help mothers navigating overwhelm, depletion, neurodivergence, and the invisible weight of modern motherhood.

Your tone is:
- Warm and grounded — like a smart friend who gets it, not a therapist or a greeting card
- Direct and practical — no fluff, no filler, no performative empathy
- Validating without being patronizing or saccharine
- Honest about the difficulty while maintaining hope
- Conversational — talk like a real person, not a wellness brand

CRITICAL TONE RULES:
- NEVER call the user "mama," "momma," "sweet mama," or any variation. Just talk to them like a person.
- NEVER open with "Oh mama" or "Oh friend" or any cutesy opener. Just respond directly.
- NEVER use excessive exclamation points or emoji-style enthusiasm.
- Avoid phrases like "I see you," "you've got this," "sending you a hug" — they feel hollow and performative.
- Don't be a cheerleader. Be a straight-talking ally who respects their intelligence.

Your rules:
- You are NOT a therapist. Never diagnose, never provide medical advice, never recommend medication.
- If someone is in crisis (self-harm, harm to children, severe depression), direct them to 988 Suicide & Crisis Lifeline or emergency services immediately.
- You provide psychoeducation, practical strategies, communication scripts, and emotional support.
- You acknowledge that neurodivergence (ADHD, autism, etc.) involves neurological differences, not character flaws.
- You understand that overwhelm can come from many sources: undiagnosed ADHD, postpartum depletion, autistic burnout, perimenopause, chronic sleep deprivation, trauma responses, or systemic overwhelm from doing too much with too little support.
- You never say "just try harder" or suggest willpower-based solutions.
- Keep responses concise — 2-4 paragraphs max unless they ask for more detail.
- CRITICAL: Always complete your response fully. Never stop mid-sentence or mid-thought. If you're running long, wrap up concisely — but ALWAYS finish with a complete sentence. An abruptly cut-off response is worse than a shorter complete one.
- When providing scripts, put them in quotes so they're easy to copy.
- Validate their feelings briefly, then move to what's actually useful.

Your approach:
1. Briefly acknowledge what they're dealing with (1-2 sentences, not a paragraph of validation)
2. Normalize it (connect to neurology, depletion, or systemic factors when relevant)
3. Offer 1-2 concrete, low-friction strategies
4. Close naturally — no forced positivity`

  if (profile && Object.keys(profile).length > 0) {
    prompt += `\n\nThis mother completed an assessment. Here are her answers (question number: answer chosen):\n`

    const answerMeanings: Record<string, Record<string, string>> = {
      q1: { smooth: "mornings are mostly smooth", "minor-chaos": "mornings have minor chaos", "daily-battle": "mornings are a daily battle", survival: "mornings are pure survival mode" },
      q2: { transitions: "hardest part is transitions", remembering: "hardest part is remembering everything", "my-readiness": "hardest part is getting herself ready too", emotional: "hardest part is emotional meltdowns" },
      q3: { accurate: "time estimation is accurate", "slightly-off": "underestimates time by 5-10 min", "way-off": "severe time blindness", "no-sense": "almost no internal sense of time" },
      q4: { adapt: "adapts to disruptions well", rattled: "gets rattled but pushes through", cascade: "one disruption cascades into total collapse", freeze: "freezes when disrupted" },
      q5: { rarely: "rarely the reason for lateness", sometimes: "sometimes loses track of time", often: "often can't manage self + kids simultaneously", "almost-always": "almost always the bottleneck" },
      q6: { rarely: "rarely lies awake about forgotten tasks", weekly: "a few times a week", "most-nights": "most nights brain won't stop", constant: "constantly feels like dropping balls" },
      q7: { remember: "usually remembers non-visible tasks", "sometimes-forget": "sometimes forgets", "often-gone": "out of sight = doesn't exist", "completely-gone": "repeatedly misses important things" },
      q8: { "on-top": "stays on top of admin", batches: "handles admin in panicked batches", avoidance: "avoids until consequences", drowning: "drowning in admin pile" },
      q9: { "yes-shared": "mental load shared equally", tries: "partner tries but she carries most", "no-idea": "partner has no idea", solo: "doing it completely alone" },
      q10: { "very-rarely": "very rarely forgets for child", occasionally: "occasionally forgets", regularly: "regularly forgets multiple times a month", constantly: "constantly forgets with crushing shame" },
      q11: { manage: "manages sensory input well", tense: "gets tense but holds together", snap: "snaps then feels terrible", shutdown: "shuts down or leaves the room" },
      q12: { welcome: "welcomes physical touch", neutral: "neutral about touch", uncomfortable: "uncomfortable but pushes through", "cant-bear": "physically cannot bear being touched" },
      q13: { fine: "handles background noise fine", distracting: "noise is distracting", agitating: "noise builds to agitation", unbearable: "noise becomes physically unbearable" },
      q14: { recharge: "has time to recharge evenings", "tired-ok": "tired but manages bedtime", depleted: "completely depleted by evening", "guilt-spiral": "exhausted AND guilt spiraling" },
      q15: { enjoy: "enjoys outings with kids", tolerate: "tolerates but needs recovery", dread: "dreads sensory-heavy environments", avoid: "avoids them whenever possible" },
      q16: { rarely: "rarely feels like failing", sometimes: "sometimes feels like failing", often: "often compares and falls short", daily: "daily shame companion" },
      q17: { "repair-quickly": "repairs quickly after rupture", "repair-delayed": "delayed repair", "guilt-spiral": "spirals into guilt and overcompensates", avoid: "shuts down and avoids repair" },
      q18: { compassionate: "gentle self-talk", mixed: "mixed self-talk", harsh: "harsh inner critic", devastating: "devastating spirals for hours/days" },
      q19: { open: "open about struggles", selective: "shares with few trusted people", "hide-most": "hides most struggles", "total-mask": "masks completely" },
      q20: { neutral: "neutral about other moms", "mild-envy": "mild envy but redirects", inadequate: "deep inadequacy from comparison", broken: "feels fundamentally broken" },
      q21: { works: "has working organization system", "start-strong": "starts strong then abandons systems", "nt-systems": "neurotypical systems don't work", "no-system": "given up on systems entirely" },
      q22: { manageable: "household management is manageable", overwhelming: "overwhelmed by decisions", paralyzed: "paralyzed — can't start", invisible: "doesn't notice until crisis" },
      q23: { "just-do": "just does boring tasks", "need-tricks": "needs stimulation tricks to start", "avoid-until-crisis": "avoids until crisis then panic-cleans", "cant-start": "physically cannot initiate boring tasks" },
      q24: { tidy: "home is reasonably tidy", "lived-in": "lived-in with some clutter", piles: "piles everywhere but functional", overwhelming: "clutter is overwhelming" },
      q25: { comfortable: "comfortable asking for help", "working-on-it": "working on asking for help", guilty: "feels guilty asking for help", impossible: "asking for help feels impossible" },
    }

    Object.entries(profile).forEach(([qKey, answerId]) => {
      const meanings = answerMeanings[qKey]
      if (meanings && meanings[answerId]) {
        prompt += `- ${meanings[answerId]}\n`
      }
    })

    prompt += `\nUse this profile to personalize your responses. Reference her specific patterns when relevant — for example, if she mentions mornings, you know she's in survival mode. If she mentions noise, you know it builds to physical unbearability. Don't repeat the profile back to her — just let it inform your advice naturally.`
  }

  // Add pattern map context from the check-in
  if (patternMap && patternMap.dimensions && patternMap.dimensions.length > 0) {
    prompt += `\n\nThis mother completed a self-check-in. Here is her current pattern map:\n`
    for (const dim of patternMap.dimensions) {
      prompt += `- ${dim.label}: ${dim.intensity} — ${dim.description}\n`
    }
    prompt += `\nUse this pattern map to understand her overall state. If she's at "critical" in physical depletion, don't suggest high-energy strategies. If her emotional bandwidth is "high," validate before strategizing. Match your advice to her actual capacity, not an idealized version of it.`
  }

  // Add pathway completion context
  if (pathwayResults && Object.keys(pathwayResults).length > 0) {
    const pathwayNames: Record<string, string> = {
      "executive-function": "Executive Function & Daily Life",
      "depletion-burnout": "Depletion & Burnout",
      "sensory-overwhelm": "Sensory & Overwhelm",
      "systemic-load": "Systemic Load",
      "hormonal-patterns": "Hormonal Patterns",
      "sleep-recovery": "Sleep & Recovery",
      "trauma-nervous-system": "Trauma & Nervous System",
    }
    prompt += `\n\nShe has completed these deeper pathway reflections: ${Object.values(pathwayResults).map(r => pathwayNames[r.pathwayId] || r.pathwayId).join(", ")}. She's actively working on understanding these areas of her life. Reference these when relevant.`
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
    const { messages, profile, patternMap, pathwayResults, memory } = body as {
      messages: Message[]
      profile: Record<string, string> | null
      patternMap?: { dimensions: { label: string; intensity: string; description: string }[] } | null
      pathwayResults?: Record<string, { pathwayId: string; completedAt: number }> | null
      memory?: string | null
    }

    // Rate limiting: max 20 messages per request context (client enforces daily limit)
    if (messages.filter(m => m.role === "user").length > 50) {
      return NextResponse.json(
        { error: "Conversation too long. Please start a new chat to continue." },
        { status: 429 }
      )
    }

    let systemPrompt = buildSystemPrompt(profile, patternMap, pathwayResults)

    // Append long-term memory if available
    if (memory) {
      systemPrompt += memory
    }

    // Convert messages to Gemini format
    const geminiContents = messages.map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }))

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
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
            maxOutputTokens: 2048,
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
