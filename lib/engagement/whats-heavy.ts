// ============================================================
// "What's Heavy Right Now" — Private emotional release valve
// Not a failure log. A place to put things down.
// ============================================================

import type { PatternMap } from "../assessments/types"

const HEAVY_KEY = "mindful-mama-whats-heavy"
const RECENT_RESPONSES_KEY = "mindful-mama-heavy-recent"
const MAX_RECENT = 20

export interface HeavyEntry {
  id: string
  text: string
  timestamp: number
  category: HeavyCategory
  response: string
  repairAvailable: boolean
}

export type HeavyCategory =
  | "rupture"       // yelled, snapped, lost it with kids
  | "guilt"         // forgot something, feel like bad mom
  | "overwhelm"     // can't cope, drowning, too much
  | "resentment"    // angry at partner, life, situation
  | "shame"         // comparison, not good enough
  | "grief"         // loss of self, loss of what was expected
  | "exhaustion"    // can't go on, nothing left
  | "uncategorized"

// ---- Storage ----

export function logHeavyThing(text: string, patternMap: PatternMap | null): HeavyEntry {
  const category = categorizeHeavy(text)
  const entry: HeavyEntry = {
    id: `heavy-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    text: text.trim(),
    timestamp: Date.now(),
    category,
    response: generateResponse(text, category, patternMap),
    repairAvailable: category === "rupture" || category === "guilt",
  }

  // Save (keep last 30 days only — this is meant to be released, not hoarded)
  const all = getAllHeavy()
  all.push(entry)
  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - 30)
  const cutoffTime = cutoff.getTime()
  const trimmed = all.filter((e) => e.timestamp > cutoffTime)

  try {
    localStorage.setItem(HEAVY_KEY, JSON.stringify(trimmed))
  } catch {}

  return entry
}

export function getAllHeavy(): HeavyEntry[] {
  try {
    const data = localStorage.getItem(HEAVY_KEY)
    if (!data) return []
    return JSON.parse(data)
  } catch {
    return []
  }
}

export function clearHeavy(): void {
  try {
    localStorage.removeItem(HEAVY_KEY)
  } catch {}
}

// ---- Categorization ----

const heavyKeywords: Record<HeavyCategory, string[]> = {
  rupture: ["yelled", "screamed", "snapped", "hit", "lost it", "blew up", "shouted", "slammed", "scared them", "hurt", "grabbed", "rage", "exploded"],
  guilt: ["forgot", "missed", "late", "didn't", "should have", "bad mom", "terrible mother", "failed", "let them down", "wasn't there", "neglected"],
  overwhelm: ["can't", "too much", "drowning", "overwhelmed", "breaking", "falling apart", "can't cope", "everything", "impossible", "suffocating"],
  resentment: ["angry", "resent", "unfair", "partner", "husband", "alone in this", "no help", "all on me", "trapped", "stuck", "hate"],
  shame: ["everyone else", "other moms", "not good enough", "broken", "wrong with me", "stupid", "worthless", "pathetic", "embarrassed", "judged"],
  grief: ["miss", "used to", "before kids", "lost myself", "who am I", "never again", "mourning", "gone", "old life", "person I was"],
  exhaustion: ["tired", "exhausted", "can't anymore", "done", "empty", "nothing left", "running on", "depleted", "burnt out", "no energy"],
  uncategorized: [],
}

function categorizeHeavy(text: string): HeavyCategory {
  const lower = text.toLowerCase()
  let bestMatch: HeavyCategory = "uncategorized"
  let bestCount = 0

  for (const [category, keywords] of Object.entries(heavyKeywords)) {
    if (category === "uncategorized") continue
    const matchCount = keywords.filter((kw) => lower.includes(kw)).length
    if (matchCount > bestCount) {
      bestCount = matchCount
      bestMatch = category as HeavyCategory
    }
  }

  return bestMatch
}

// ---- Response Generation ----

const responses: Record<HeavyCategory, string[]> = {
  rupture: [
    "Rupture happens. It doesn't define you. Repair is still available.",
    "You lost it. That's a signal your system was overwhelmed, not that you're a bad person.",
    "The fact that you feel bad about this IS the evidence that you care. Bad parents don't feel this.",
    "Your nervous system hit capacity and it overflowed. That's physiology, not character.",
    "You snapped. You're human. The repair matters more than the rupture.",
    "This moment doesn't erase everything else you are to them. It's one moment.",
    "Dysregulation is contagious and you caught it. That doesn't make you dangerous. It makes you depleted.",
    "The guilt you're feeling right now? It means your values are intact. You just didn't have the resources to live them in that moment.",
    "You can't regulate from empty. What happened is what happens when a person runs out of capacity. Not when a person is bad.",
    "They will not remember this one moment. They will remember the pattern. And the pattern includes all the times you tried.",
    "Yelling doesn't make you a bad mother. It makes you a tired one who hit a wall. The wall was the problem, not you.",
    "Your reaction was too big for the moment. That's because it wasn't about the moment — it was about everything that came before it.",
    "You're not broken. You're overloaded. There's a difference. And repair is always, always available.",
    "The shame spiral after a rupture is often worse than the rupture itself. You don't have to spiral. You can just repair.",
    "What you did doesn't feel okay. And that's because your standards are high. But right now, you need compassion more than standards.",
    "Every parent who has ever lived has had moments like this. Every single one. You are not the exception.",
    "The repair you do after this will teach them more than the rupture took. Repair is where the real parenting happens.",
    "You were running on nothing and your system crashed. That's not a moral failure. That's a resource failure.",
    "Put this down. You don't have to carry the shame of it all day. Feel it, name it, and then let it move through.",
    "This is the moment your body told you the truth: you need more support than you're getting.",
  ],
  guilt: [
    "The thing you forgot? It's because your brain is holding 400 other things. That's not carelessness. That's overload.",
    "Guilt is not evidence of failure. It's evidence of caring too much with too little capacity.",
    "You missed something. You're not the first. You won't be the last. It doesn't mean what you think it means.",
    "The shame isn't helping. It's just taking up space where problem-solving could go.",
    "You forgot because your working memory is finite and your load is infinite. The math doesn't work. That's not your fault.",
    "A good mother who forgets things is still a good mother. Full stop.",
    "The guilt you feel is disproportionate to what actually happened. Notice that gap. That's the shame talking, not reality.",
    "You're holding yourself to a standard that requires a brain with unlimited capacity. Yours is human. Human is enough.",
    "What you forgot matters less than what you remember every single day. And you remember so much.",
    "This feeling will pass. What won't pass is the fact that you show up, imperfectly, every day. That's what they'll remember.",
    "You didn't fail them. You had a human moment in an inhuman workload.",
    "The mental load you carry would break most systems. One dropped ball doesn't mean the system is broken.",
    "Guilt says 'I did something bad.' Shame says 'I am bad.' You did something human. You are not bad.",
    "You're not a bad mom who forgot. You're a good mom whose brain is full.",
    "The thing about guilt is it makes you think you're the only one. You're not. Every mother you admire has a list like yours.",
    "Forgetting doesn't mean not caring. It means your brain ran out of RAM. That's neurology, not love.",
    "You can feel bad about this AND know it doesn't define you. Both things are true.",
    "The standard you're measuring yourself against doesn't exist. No one is meeting it. Not one person.",
    "Let this one go. Not because it doesn't matter — but because carrying it won't change it.",
    "You are more than your worst moment today. So much more.",
  ],
  overwhelm: [
    "You're not weak for feeling this. You're overloaded. There's a difference.",
    "When everything feels like too much, it's because it IS too much. Your feelings are accurate.",
    "You don't need to fix this right now. You just need to survive this moment. That's enough.",
    "The overwhelm is real. It's not in your head. It's in your nervous system and it's telling the truth.",
    "You're not falling apart. You're hitting the limit of what one person can hold. That limit exists for everyone.",
    "Right now, nothing needs to be solved. Just breathe. The solving can come later.",
    "This feeling is temporary. It doesn't feel temporary. But it is.",
    "You are not the problem. The amount on your plate is the problem.",
    "Overwhelm is your body's way of saying: this is unsustainable. Listen to it. It's right.",
    "You don't have to figure it all out right now. You just have to get through the next hour.",
    "The fact that you're overwhelmed means you're paying attention. Numb would be worse.",
    "This is too much for one person. It's not too much for you specifically — it's too much for ANY one person.",
    "You're allowed to not be okay right now. You're allowed to say 'this is too hard.'",
    "Nothing is wrong with you. Something is wrong with the load. Those are different problems.",
    "When everything feels urgent, nothing is. Pick one thing. Just one. The rest can wait.",
    "You're drowning in a system that was never designed to support you. The drowning makes sense.",
    "This moment will pass. You will still be here when it does. And you'll figure out the next step then.",
    "Overwhelm lies to you. It says 'forever.' It means 'right now.' Right now is survivable.",
    "You don't need more willpower. You need less on your plate. That's not a personal failing.",
    "Put this down for a second. Just the weight of naming it is enough for now.",
  ],
  resentment: [
    "Resentment isn't a character flaw. It's a signal that something is unsustainable.",
    "You're allowed to be angry. The anger is telling you something true about your situation.",
    "The rage you feel makes sense. You're doing too much with too little support. Anyone would be angry.",
    "Resentment is what happens when your needs go unmet for too long. It's not ugly — it's honest.",
    "You're not ungrateful. You're unsupported. Those are completely different things.",
    "The anger isn't the problem. What's causing the anger is the problem.",
    "You're allowed to feel trapped AND love your family. Both things can be true at once.",
    "Resentment is the tax on invisible labor. You've been paying it too long.",
    "Your anger is proportionate to what you're carrying. Don't let anyone tell you otherwise.",
    "The fact that you feel guilty about the resentment shows how much you care. But the resentment itself is valid.",
    "You're not a bad person for being angry. You're a person whose limits have been crossed too many times.",
    "Resentment builds when boundaries don't exist. This feeling is asking you to build one.",
    "You didn't choose to feel this way. Your circumstances created it. That's not your fault.",
    "The rage is information. It's saying: something needs to change. Not you. Something around you.",
    "You can love someone and be furious at the imbalance. Love doesn't require silence about injustice.",
    "This anger is yours. You don't have to perform gratitude over it. You don't have to smile through it.",
    "Resentment is the sound of a person who has been giving more than she's receiving. For too long.",
    "You're not too much. You're not asking too much. You're asking for what should already be there.",
    "The unfairness you feel? It's because it IS unfair. Your perception is correct.",
    "Put this down. Not because it doesn't matter — but because holding it alone is making it heavier.",
  ],
  shame: [
    "The voice that says you're not good enough is lying. It's loud, but it's lying.",
    "Comparison is a thief and it just robbed you. What you see in others isn't the full picture.",
    "You're measuring yourself against a standard that doesn't exist in real life. Only on Instagram.",
    "The shame you feel right now is not evidence. It's a feeling. Feelings aren't facts.",
    "You are not broken. You are a whole person having a hard time. Those are different things.",
    "Every mother you think is doing better is also struggling with something you can't see.",
    "Shame wants you to hide. But hiding makes it grow. You just brought it into the light. That's brave.",
    "You are not the worst version of yourself. You are not your worst day. You are the whole picture.",
    "The 'not good enough' story has been running for a long time. It was never true. It's still not true.",
    "What would you say to a friend who told you what you just told me? Say that to yourself.",
    "Shame is a liar with a loud voice. It says 'you are bad.' The truth is: you are human.",
    "You don't have to earn your place in your own family. You belong here. As you are.",
    "The other moms you're comparing yourself to? They're comparing themselves to someone else. It's turtles all the way down.",
    "You are enough. Not because you did enough today. Because you ARE enough. That's not conditional.",
    "Shame thrives in isolation. The fact that you're naming it here means it's already losing power.",
    "You are not what you produce. You are not what you provide. You are a person. That's enough.",
    "The voice that says 'everyone else can do this' is wrong. Everyone else is also struggling. They're just hiding it too.",
    "You don't need to be fixed. You need to be supported. Those are wildly different things.",
    "Shame says you're alone in this. You're not. Not even close.",
    "Right now, in this moment, you are worthy of compassion. Especially from yourself.",
  ],
  grief: [
    "You're allowed to grieve the person you were. That's not ungrateful. That's honest.",
    "Missing your old self doesn't mean you don't love your life. It means you lost something real.",
    "The person you were before isn't gone. She's buried under the weight of everything. She's still in there.",
    "Grief for your former self is one of the most unacknowledged losses of motherhood. It's real.",
    "You didn't just gain a child. You lost a version of yourself. Both things deserve acknowledgment.",
    "The life you imagined and the life you have — the gap between them is allowed to hurt.",
    "You're mourning something no one else can see. That makes it lonelier. But it doesn't make it less real.",
    "Identity doesn't disappear overnight. It erodes. And erosion is grievable.",
    "You're allowed to want things that have nothing to do with your children. That wanting is you, still alive.",
    "The grief isn't about not loving them. It's about losing yourself in the loving.",
    "You can hold gratitude and grief in the same hand. They're not opposites. They're companions.",
    "Missing who you were is not the same as regretting who you became. You can miss and still love.",
    "The person you were is not dead. She's dormant. And dormant things can wake up.",
    "This loss is invisible to everyone around you. But it's real. And it deserves to be named.",
    "You're not being dramatic. You lost something. The fact that no one else sees it doesn't make it less true.",
    "Motherhood asked you to become someone new. It didn't ask if you were ready to let go of who you were.",
    "The ache you feel is the distance between who you are and who you remember being. That distance is real.",
    "You're allowed to grieve without a funeral. Some losses don't have ceremonies. They still count.",
    "The thread of who you were is still there. Thin, maybe. But not broken. You can find it again.",
    "This feeling is not forever. Identity comes back. Slowly. In pieces. But it comes back.",
  ],
  exhaustion: [
    "You're not lazy. You're depleted. There's a canyon of difference between those two things.",
    "Your body is telling you the truth. Listen to it. It's saying: this pace is not sustainable.",
    "Exhaustion this deep isn't fixed by one good night's sleep. It's accumulated. And it's real.",
    "You're running on nothing. The fact that you're still running at all is remarkable.",
    "You don't need to push through. You need to stop. Even for a moment. Stopping is allowed.",
    "This level of tired isn't normal. It's the result of sustained, unsupported effort. You deserve better.",
    "Your tank is empty. Not because you wasted it — because you gave it all away.",
    "Exhaustion lies to you. It says 'you're weak.' The truth is: you've been strong for too long.",
    "You can't think your way out of depletion. You can only rest your way out. And rest is not earned.",
    "The tiredness you feel is not a personal failing. It's the natural consequence of doing too much for too long.",
    "You're not broken. You're empty. And empty can be refilled. When someone lets you.",
    "This exhaustion is your body's final warning before it forces you to stop. Listen before it forces.",
    "You've been running on adrenaline and obligation. Neither of those is fuel. They're fumes.",
    "The world asks too much of you. Your tiredness is the proof.",
    "You don't need motivation. You need rest. Motivation comes back when the tank isn't empty.",
    "Bone-deep tired isn't dramatic. It's diagnostic. Your body is telling you something important.",
    "You're allowed to be done for today. Done doesn't mean forever. It means right now.",
    "The exhaustion isn't weakness. It's the weight of everything you carry finally registering.",
    "You've been strong for so long that people forgot you need support too. But you do. You really do.",
    "Put this down. All of it. Just for this moment. You can pick it back up later. But right now, put it down.",
  ],
  uncategorized: [
    "You named it. That's the first step. The naming itself takes weight off.",
    "Whatever this is — it's allowed to be here. You don't have to fix it right now.",
    "This is heavy. And you've been carrying it. Thank you for putting it down, even for a moment.",
    "You don't have to have a solution. Sometimes just saying 'this is hard' is enough.",
    "The fact that you're acknowledging this means you're not ignoring yourself. That matters.",
    "This feeling is real. It's valid. And it won't last forever, even though it feels like it will.",
    "You brought something into the light. That's braver than pushing it down.",
    "Whatever you're carrying — you don't have to carry it perfectly. You just have to survive it.",
    "This is you being honest with yourself. Honesty is the beginning of change.",
    "You don't owe anyone an explanation for why this is hard. It just is. And that's enough.",
    "Some things don't have solutions. They just need to be witnessed. Consider this witnessed.",
    "You're allowed to struggle. You're allowed to say it out loud. You're allowed to not be fine.",
    "This is a moment of truth. And truth, even when it hurts, is better than pretending.",
    "You put it into words. That's more than most people manage. Words make things smaller.",
    "Right now, you don't need to do anything with this. Just let it exist outside your head for a moment.",
    "The weight of unspoken things is heavier than spoken ones. You just made this lighter.",
    "You're not complaining. You're processing. There's a difference. And processing is healthy.",
    "This is you refusing to pretend everything is fine. That refusal is a form of self-respect.",
    "Whatever this is — you don't have to solve it alone. But naming it alone is a start.",
    "Heard. Held. Not judged. That's what this space is for.",
  ],
}

// ---- Response Generation ----

function getRecentResponses(): string[] {
  try {
    const data = localStorage.getItem(RECENT_RESPONSES_KEY)
    if (!data) return []
    return JSON.parse(data)
  } catch {
    return []
  }
}

function markResponseShown(response: string): void {
  const recent = getRecentResponses()
  recent.push(response)
  const trimmed = recent.slice(-MAX_RECENT)
  try {
    localStorage.setItem(RECENT_RESPONSES_KEY, JSON.stringify(trimmed))
  } catch {}
}

function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return Math.abs(hash)
}

function generateResponse(text: string, category: HeavyCategory, patternMap: PatternMap | null): string {
  const pool = responses[category] || responses.uncategorized
  const recent = getRecentResponses()

  // Filter out recently shown
  const available = pool.filter((r) => !recent.includes(r))
  const finalPool = available.length > 0 ? available : pool

  // Hash-based selection
  const hash = hashString(text + category + String(Date.now()).slice(0, -4))
  const index = hash % finalPool.length
  const selected = finalPool[index]

  markResponseShown(selected)
  return selected
}

// ---- Repair Script Suggestions ----

export function getRepairSuggestion(category: HeavyCategory): { available: boolean; href: string; label: string } | null {
  if (category === "rupture") {
    return {
      available: true,
      href: "/dashboard/scripts",
      label: "Get a repair script for this",
    }
  }
  if (category === "guilt") {
    return {
      available: true,
      href: "/dashboard/scripts",
      label: "Find words for what you're feeling",
    }
  }
  if (category === "resentment") {
    return {
      available: true,
      href: "/dashboard/scripts",
      label: "Get a script for this conversation",
    }
  }
  if (category === "exhaustion" || category === "overwhelm") {
    return {
      available: true,
      href: "/dashboard/toolkit",
      label: "Go to your emergency toolkit",
    }
  }
  return null
}
