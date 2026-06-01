// ============================================================
// "One Thing Today" — Personalized daily micro-action
// Based on the user's pattern map and completed pathways
// ============================================================

import type { PatternMap } from "./assessments/types"

export interface DailyAction {
  action: string
  why: string
  timeNeeded: string
  category: string
}

/**
 * Generates a personalized daily micro-action based on the user's
 * pattern map. Rotates through relevant actions so she doesn't
 * see the same one every day.
 */
export function getOneThingToday(patternMap: PatternMap | null): DailyAction {
  if (!patternMap) {
    // No assessment data yet — give real, universal micro-actions
    const generalPool: DailyAction[] = [
      { action: "Drink a full glass of water right now. Not coffee. Water.", why: "Dehydration impairs cognitive function by 15-20%. It's the lowest-effort intervention with measurable impact.", timeNeeded: "1 min", category: "physical" },
      { action: "Write down the 3 things that MUST happen today. Only 3. Let your brain release the rest.", why: "Your working memory is overloaded. Externalizing the list frees cognitive resources for actually doing things.", timeNeeded: "2 min", category: "cognitive" },
      { action: "Name your current emotional state out loud. Just name it. 'I feel overwhelmed.' 'I feel tired.' 'I feel fine.'", why: "Research shows that naming an emotion reduces its intensity. It moves the experience from the amygdala to the prefrontal cortex.", timeNeeded: "30 sec", category: "emotional" },
      { action: "Step outside for 60 seconds. Feel the air. Look at something far away. Then come back in.", why: "Sixty seconds of natural light and distance vision resets your circadian rhythm and reduces cortisol. Minimum effective dose.", timeNeeded: "1 min", category: "physical" },
      { action: "Put your hand on your chest for 10 seconds and take one slow breath. That's it.", why: "Self-touch activates the vagus nerve and signals safety to your nervous system. It's the fastest regulation tool you have.", timeNeeded: "10 sec", category: "emotional" },
      { action: "Set one phone reminder for something you keep forgetting. Just one.", why: "Every task you offload to a reminder is one less thing your brain has to hold. That's not cheating — it's working with your brain.", timeNeeded: "1 min", category: "cognitive" },
      { action: "Eat something with protein in the next hour. Anything. A handful of nuts. A cheese stick. An egg.", why: "Your brain runs on glucose and amino acids. If you've been running on coffee and adrenaline, your cognitive function is impaired by fuel deficit.", timeNeeded: "2 min", category: "physical" },
      { action: "Say no to one thing today. The smallest, easiest no you can find.", why: "Every yes you don't mean costs emotional energy. One honest no today protects bandwidth for the things that actually matter.", timeNeeded: "1 min", category: "emotional" },
      { action: "Lower one standard today. Intentionally. Cereal for dinner. Unwashed hair. Unfolded laundry. Pick one.", why: "Perfectionism in one area steals resources from every other area. Deliberately lowering one standard frees energy for things that actually matter.", timeNeeded: "0 min", category: "systems" },
      { action: "Do one thing in the next hour that has nothing to do with being a mother. Read a page. Listen to a song. Look at something beautiful.", why: "Identity rebuilds through action, not reflection. Even 60 seconds of being a person — not a function — keeps the thread alive.", timeNeeded: "1 min", category: "identity" },
    ]
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000)
    return generalPool[dayOfYear % generalPool.length]
  }

  // Build a pool of actions based on elevated dimensions
  const pool: DailyAction[] = []
  const dims = patternMap.dimensions

  const cogLoad = dims.find((d) => d.dimension === "cognitive-load")
  const emotional = dims.find((d) => d.dimension === "emotional-bandwidth")
  const physical = dims.find((d) => d.dimension === "physical-depletion")
  const system = dims.find((d) => d.dimension === "system-friction")
  const identity = dims.find((d) => d.dimension === "identity-erosion")

  // Cognitive Load actions
  if (cogLoad && (cogLoad.intensity === "high" || cogLoad.intensity === "critical")) {
    pool.push(
      { action: "Write down the 3 things that MUST happen today. Only 3. Let your brain release the rest.", why: "Your working memory is overloaded. Externalizing the list frees cognitive resources for actually doing things.", timeNeeded: "2 min", category: "cognitive" },
      { action: "Set one phone reminder for something you keep forgetting. Just one.", why: "Every task you offload to a reminder is one less thing your brain has to hold. That's not cheating — it's assistive technology.", timeNeeded: "1 min", category: "cognitive" },
      { action: "Put tomorrow's most important item somewhere you'll physically trip over it.", why: "Your brain forgets what it can't see. Making the invisible visible bypasses the working memory gap entirely.", timeNeeded: "1 min", category: "cognitive" },
      { action: "Before bed tonight, spend 2 minutes writing down everything your brain is holding. Don't organize. Just dump.", why: "A brain dump before sleep tells your prefrontal cortex it's safe to power down. The thoughts are captured. They won't be lost.", timeNeeded: "2 min", category: "cognitive" },
      { action: "Delete or unsubscribe from one source of digital noise today — an email list, a notification, a group chat.", why: "Every notification competes for your limited attention. Removing one source of input is a permanent reduction in cognitive load.", timeNeeded: "1 min", category: "cognitive" },
    )
  }

  // Emotional Bandwidth actions
  if (emotional && (emotional.intensity === "high" || emotional.intensity === "critical")) {
    pool.push(
      { action: "Name your current emotional state out loud. Just name it. 'I feel overwhelmed.' 'I feel angry.' 'I feel numb.'", why: "Research shows that naming an emotion reduces its intensity by up to 50%. It moves the experience from the amygdala to the prefrontal cortex. Naming is regulating.", timeNeeded: "30 sec", category: "emotional" },
      { action: "The next time you feel reactive, pause for 3 seconds before responding. Just 3.", why: "Three seconds is enough for your prefrontal cortex to come online. You won't always catch it. But each time you do, you're building a new neural pathway.", timeNeeded: "3 sec", category: "emotional" },
      { action: "Say no to one thing today. The smallest, easiest no you can find.", why: "Every yes you don't mean costs emotional energy. One honest no today protects bandwidth for the things that actually matter.", timeNeeded: "1 min", category: "emotional" },
      { action: "Put your hand on your chest for 10 seconds and take one slow breath. That's it.", why: "Self-touch activates the vagus nerve and signals safety to your nervous system. It's the fastest regulation tool you have — and no one can see you doing it.", timeNeeded: "10 sec", category: "emotional" },
      { action: "Text one person something honest: 'Today is hard.' You don't have to explain. Just let one person know.", why: "Isolation amplifies every emotion. One moment of honesty with another human breaks the seal. You don't have to perform 'fine' for everyone.", timeNeeded: "1 min", category: "emotional" },
    )
  }

  // Physical Depletion actions
  if (physical && (physical.intensity === "high" || physical.intensity === "critical")) {
    pool.push(
      { action: "Drink a full glass of water right now. Not coffee. Water.", why: "Dehydration impairs cognitive function by 15-20%. It's the lowest-effort intervention with measurable impact. Your brain is 75% water.", timeNeeded: "1 min", category: "physical" },
      { action: "Set a timer for 10 minutes and lie down. Not scrolling. Just lying down with your eyes closed.", why: "Even without sleeping, horizontal rest with closed eyes allows your nervous system to shift from sympathetic (fight/flight) to parasympathetic (rest/digest). Ten minutes of this is worth more than an hour of 'resting' while scrolling.", timeNeeded: "10 min", category: "physical" },
      { action: "Go to bed 30 minutes earlier tonight. Not tomorrow. Tonight.", why: "One night of even slightly more sleep improves emotional regulation, working memory, and frustration tolerance the next day. The compound effect of 30 extra minutes over a week is significant.", timeNeeded: "0 min", category: "physical" },
      { action: "Eat something with protein in the next hour. Anything. A handful of nuts. A cheese stick. An egg.", why: "Your brain runs on glucose and amino acids. If you've been running on coffee and adrenaline, your cognitive function is impaired by fuel deficit, not brain deficit.", timeNeeded: "2 min", category: "physical" },
      { action: "Step outside for 60 seconds. Feel the air. Look at something far away. Then come back in.", why: "Sixty seconds of natural light and distance vision resets your circadian rhythm and reduces cortisol. It's the minimum effective dose of 'getting outside.'", timeNeeded: "1 min", category: "physical" },
    )
  }

  // System Friction actions
  if (system && (system.intensity === "high" || system.intensity === "critical")) {
    pool.push(
      { action: "Identify the ONE recurring friction point that costs you the most energy this week. Just name it.", why: "You can't fix a system you haven't identified. Naming the specific friction point — not the general overwhelm — is how change starts.", timeNeeded: "2 min", category: "systems" },
      { action: "Automate one thing: set a bill to auto-pay, a grocery item to auto-order, or a recurring reminder.", why: "Every task you automate is permanently removed from your cognitive load. One automation today saves hundreds of future decisions.", timeNeeded: "5 min", category: "systems" },
      { action: "Put one thing in its 'home' — a hook for keys, a tray for mail, a bin for shoes. Just one.", why: "Environmental design is more powerful than willpower. When things have a home, finding them doesn't require memory — just habit.", timeNeeded: "2 min", category: "systems" },
      { action: "Ask for one specific thing from one specific person today. Not 'help.' A specific task.", why: "Vague requests get vague responses. 'Can you handle dinner tonight?' is actionable. 'I need more help' is not. Specificity gets results.", timeNeeded: "1 min", category: "systems" },
      { action: "Lower one standard today. Intentionally. Cereal for dinner. Unwashed hair. Unfolded laundry. Pick one.", why: "Perfectionism in one area steals resources from every other area. Deliberately lowering one standard frees energy for things that actually matter.", timeNeeded: "0 min", category: "systems" },
    )
  }

  // Identity Erosion actions
  if (identity && (identity.intensity === "high" || identity.intensity === "critical")) {
    pool.push(
      { action: "Do one thing in the next hour that has nothing to do with being a mother. Read a page. Listen to a song. Look at something beautiful.", why: "Identity rebuilds through action, not reflection. Even 60 seconds of being a person — not a function — keeps the thread alive.", timeNeeded: "1 min", category: "identity" },
      { action: "Finish this sentence in your head: 'If I had an afternoon to myself, I would...' Don't judge the answer. Just notice it.", why: "Desire is the first sign of self. If you can want something — even something small — you haven't disappeared completely. That wanting is you.", timeNeeded: "30 sec", category: "identity" },
      { action: "Say your own name out loud. Not 'mom.' Your name. Remember that you have one.", why: "This sounds strange. Try it. When you've been 'mom' for so long, hearing your own name — from your own mouth — can be surprisingly grounding.", timeNeeded: "5 sec", category: "identity" },
      { action: "Text a friend about something that isn't your kids. A show you watched. A thought you had. Anything that's just YOU.", why: "Maintaining one thread of connection that isn't about motherhood keeps a part of you alive that motherhood can't touch.", timeNeeded: "2 min", category: "identity" },
      { action: "Write down one thing you're good at that has nothing to do with caregiving.", why: "You are more than what you provide. Remembering your competence outside of motherhood is an act of resistance against identity erasure.", timeNeeded: "1 min", category: "identity" },
    )
  }

  // If nothing is elevated, give general actions
  if (pool.length === 0) {
    pool.push(
      { action: "Notice one thing that went well today. Not big. Just one moment that wasn't terrible.", why: "Your brain has a negativity bias — it remembers failures and dismisses successes. Deliberately noticing one good thing retrains the filter.", timeNeeded: "30 sec", category: "general" },
      { action: "Take 3 slow breaths. In for 4, hold for 4, out for 6. That's it.", why: "Extended exhale activates the parasympathetic nervous system. Three breaths is enough to shift your baseline. You can do this anywhere, anytime.", timeNeeded: "1 min", category: "general" },
      { action: "Look at your pattern map and ask: 'Which dimension feels most urgent today?' Trust your gut.", why: "Your needs shift daily. Checking in with yourself — even briefly — means you're responding to today's reality, not yesterday's plan.", timeNeeded: "1 min", category: "general" },
    )
  }

  // Select based on day of year (rotates daily, deterministic)
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000)
  const index = dayOfYear % pool.length

  return pool[index]
}
