// ============================================================
// Micro-Win Logger — "I Did a Thing"
// Tracks tiny wins throughout the day, provides reflections
// ============================================================

import type { MicroWin, DailyWins, StreakData } from "./types"
import type { PatternMap } from "../assessments/types"

const WINS_KEY = "mindful-mama-micro-wins"
const STREAK_KEY = "mindful-mama-wins-streak"

// ---- Storage ----

export function getWinsForDate(date: string): MicroWin[] {
  try {
    const all = getAllWins()
    const day = all.find((d) => d.date === date)
    return day?.wins || []
  } catch {
    return []
  }
}

export function getTodaysWins(): MicroWin[] {
  return getWinsForDate(getToday())
}

export function getAllWins(): DailyWins[] {
  try {
    const data = localStorage.getItem(WINS_KEY)
    if (!data) return []
    return JSON.parse(data)
  } catch {
    return []
  }
}

export function addWin(text: string, patternMap: PatternMap | null): MicroWin {
  const win: MicroWin = {
    id: generateId(),
    text: text.trim(),
    timestamp: Date.now(),
    category: categorizeWin(text),
    reflection: generateReflection(text, patternMap),
  }

  const all = getAllWins()
  const today = getToday()
  const dayIndex = all.findIndex((d) => d.date === today)

  if (dayIndex >= 0) {
    all[dayIndex].wins.push(win)
  } else {
    all.push({ date: today, wins: [win] })
  }

  // Keep last 90 days
  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - 90)
  const cutoffStr = formatDate(cutoff)
  const trimmed = all.filter((d) => d.date >= cutoffStr)

  try {
    localStorage.setItem(WINS_KEY, JSON.stringify(trimmed))
  } catch {}

  updateStreak()
  return win
}

export function removeWin(winId: string): void {
  const all = getAllWins()
  for (const day of all) {
    day.wins = day.wins.filter((w) => w.id !== winId)
  }
  const filtered = all.filter((d) => d.wins.length > 0)
  try {
    localStorage.setItem(WINS_KEY, JSON.stringify(filtered))
  } catch {}
}

// ---- Streaks ----

export function getWinStreak(): StreakData {
  try {
    const data = localStorage.getItem(STREAK_KEY)
    if (data) return JSON.parse(data)
  } catch {}
  return { currentStreak: 0, longestStreak: 0, lastActiveDate: "" }
}

function updateStreak(): void {
  const streak = getWinStreak()
  const today = getToday()
  const yesterday = getYesterday()

  if (streak.lastActiveDate === today) {
    // Already counted today
    return
  }

  if (streak.lastActiveDate === yesterday) {
    // Continuing streak
    streak.currentStreak += 1
  } else if (streak.lastActiveDate !== today) {
    // Streak broken (or first entry)
    streak.currentStreak = 1
  }

  streak.lastActiveDate = today
  if (streak.currentStreak > streak.longestStreak) {
    streak.longestStreak = streak.currentStreak
  }

  try {
    localStorage.setItem(STREAK_KEY, JSON.stringify(streak))
  } catch {}
}

// ---- Daily Summary ----

export function getDailySummary(date?: string): { count: number; categories: Record<string, number> } {
  const wins = getWinsForDate(date || getToday())
  const categories: Record<string, number> = {}
  for (const win of wins) {
    categories[win.category] = (categories[win.category] || 0) + 1
  }
  return { count: wins.length, categories }
}

// ---- Win Categorization ----

const categoryKeywords: Record<string, string[]> = {
  survival: ["fed", "ate", "cereal", "shower", "dressed", "alive", "survived", "got up", "woke", "morning", "laundry", "dishes", "cleaned", "cooked", "dinner", "lunch", "breakfast", "groceries", "picked up", "dropped off", "packed", "made beds", "tidied", "vacuumed", "mopped", "wiped", "trash", "garbage", "recycl"],
  care: ["water", "rest", "nap", "walked", "outside", "breath", "sat down", "quiet", "alone", "bath", "bathed", "exercise", "exercised", "ran", "run", "yoga", "stretch", "meditat", "journal", "read", "tea", "coffee", "vitamin", "supplement", "skincare", "lotion", "makeup", "hair"],
  connection: ["talked", "texted", "called", "hugged", "played", "listened", "friend", "partner", "laughed", "date", "visited", "hang", "met up", "coffee with", "lunch with", "facetime", "zoom"],
  progress: ["finished", "started", "made", "organized", "planned", "booked", "appointment", "email", "paid", "submitted", "filed", "sorted", "signed", "enrolled", "registered", "applied", "scheduled", "completed", "bought", "ordered", "returned", "fixed", "repaired", "built"],
  rest: ["slept", "rested", "said no", "cancelled", "skipped", "let go", "didn't", "stopped", "boundaries", "delegated", "asked for help"],
}

function categorizeWin(text: string): MicroWin["category"] {
  const lower = text.toLowerCase()
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some((kw) => lower.includes(kw))) {
      return category as MicroWin["category"]
    }
  }
  return "uncategorized"
}

// ---- Reflections (pattern-aware responses) ----
// Large library — 30+ per category so responses feel unique and fresh

const RECENTLY_SHOWN_KEY = "mindful-mama-recent-reflections"
const MAX_RECENT = 15

const reflections: Record<string, string[]> = {
  survival: [
    "That counts. Especially today.",
    "Survival mode is still a mode. You're still here.",
    "The bare minimum when you're depleted IS the maximum.",
    "Not glamorous. Still counts.",
    "You kept the chaos from winning today. That's something.",
    "Nobody's giving you a trophy for this. But it deserves one.",
    "The unglamorous work of keeping life running. You did it again.",
    "Another day where everyone is alive and fed. That's not nothing.",
    "You showed up. Even when showing up felt impossible.",
    "This is the invisible labor no one thanks you for. But it's real.",
    "Functioning while exhausted is a skill. You have it.",
    "The world doesn't see this work. But it happened. You made it happen.",
    "Bare minimum days are still days you survived. Count it.",
    "You did the thing your body didn't want to do. That took something.",
    "One foot in front of the other. That's all today required. You did it.",
    "This is what endurance looks like. Not pretty. But real.",
    "The house didn't burn down. The kids are okay. You did that.",
    "Survival isn't failure. It's the foundation everything else gets built on.",
    "You held it together. Even if 'together' looked messy from the outside.",
    "Another thing done that nobody will notice. But you did it.",
    "The mental load of just keeping things running is enormous. You carried it.",
    "Not every day is a highlight reel. Some days are just getting through. You got through.",
    "You made it work with what you had. That's resourcefulness, not failure.",
    "Today asked a lot of you. You answered.",
    "The fact that you're still going is the accomplishment.",
    "You didn't quit. On a day when quitting would have been understandable.",
    "This is what 'doing your best' actually looks like. It's enough.",
    "Nobody sees the thousand micro-decisions you made today to keep things afloat. But they happened.",
    "You navigated today. That's more than some people understand.",
    "Still standing. Still trying. That's the whole thing.",
  ],
  care: [
    "You chose yourself for a moment. That's not selfish — it's sustainable.",
    "Your body needed that. Thank you for listening to it.",
    "Self-care when you're depleted isn't indulgent. It's maintenance.",
    "One small act of care. The compound effect is real.",
    "You can't pour from empty. This is you refilling.",
    "You treated yourself like someone worth taking care of. Because you are.",
    "That small thing you just did for yourself? Your nervous system noticed.",
    "Most people in your position skip this step. You didn't.",
    "Your future self will thank you for this. Even if it felt small.",
    "You put yourself on your own priority list. Even briefly. That matters.",
    "Care isn't earned. It's needed. You gave yourself what you needed.",
    "This is you choosing sustainability over martyrdom. Good.",
    "A moment of care in a day of giving. Your body registered that.",
    "You interrupted the depletion cycle. Even for a minute. That's how it starts.",
    "Self-neglect is the default. You just chose something different.",
    "Your body keeps score. This one went in the 'good' column.",
    "You didn't wait until you were completely empty. That's growth.",
    "Taking care of yourself isn't taking from your family. It's investing in them.",
    "One act of self-care is one vote for the person you want to be.",
    "You noticed you needed something and you gave it to yourself. That's not small.",
    "The guilt that comes with self-care is a lie. What you just did was necessary.",
    "You are a person with needs. Meeting one of them is not optional — it's essential.",
    "This is what it looks like to stop running on fumes. One choice at a time.",
    "You just proved that you matter to yourself. Keep proving it.",
    "Rest isn't the reward for finishing everything. It's the fuel for doing anything.",
    "Your body has been asking for this. You finally listened.",
    "Small acts of care, repeated, become a life that sustains you.",
    "You chose repair over pushing through. That's wisdom, not weakness.",
    "The version of you that takes care of herself is still in there. You just proved it.",
    "Caring for yourself with the same energy you care for everyone else. That's the goal. This is a step.",
  ],
  connection: [
    "Human connection is a biological need, not a luxury.",
    "You let someone in. That takes more courage than people realize.",
    "Relationships need tending. You tended.",
    "That moment of connection matters more than you think.",
    "Isolation is the default when you're overwhelmed. You pushed against it.",
    "You reached out. That's brave when you're running on empty.",
    "Connection is how humans regulate. You just regulated.",
    "You reminded someone you exist. And they're glad you did.",
    "Being seen — even for a moment — changes the chemistry of your day.",
    "You chose presence over productivity. That's not wasted time.",
    "The people in your life need you to show up. You just did.",
    "One real moment with another person. That's more than most people get today.",
    "You invested in a relationship. That compounds over time.",
    "Loneliness thrives in silence. You broke the silence.",
    "You let yourself be human with another human. That's connection.",
    "The wall comes down one interaction at a time. This was one.",
    "You chose to not do this alone today. That's strength, not weakness.",
    "Someone else's day got better because you showed up. Yours did too.",
    "Connection doesn't require perfection. Just presence. You were present.",
    "You made space for someone else. And in doing so, made space for yourself.",
    "That interaction fed something in you that productivity never will.",
    "You didn't disappear into the role today. You stayed a person with people.",
    "Reaching out when you're depleted is harder than people know. You did it anyway.",
    "You maintained a thread of connection. That thread holds more weight than you think.",
    "Being known by someone — even imperfectly — is medicine.",
    "You showed up for a relationship. Even when you had nothing left. That's love.",
    "The mask came off for a second. That's how real connection works.",
    "You chose vulnerability over isolation. That's the harder path. And the better one.",
    "One moment of genuine connection outweighs hours of scrolling. You chose the real thing.",
    "You reminded yourself that you're not alone in this. Because you're not.",
  ],
  progress: [
    "Look at you, getting things done despite everything stacking against you.",
    "Executive function win. Your brain showed up today.",
    "One thing forward. That's all it takes.",
    "Done is better than perfect. And you got it done.",
    "Progress doesn't require perfection. This is proof.",
    "You initiated something. That's the hardest part and you did it.",
    "Your brain fought you on this and you did it anyway.",
    "Task initiation with a depleted brain is like running uphill. You ran.",
    "You turned intention into action. That gap is where most things die. Not this one.",
    "Something that was undone is now done. The world shifted slightly. Because of you.",
    "You didn't wait for motivation. You just started. That's how it works.",
    "Momentum is built one completed thing at a time. You just added one.",
    "Your to-do list got shorter. Even by one item. That's real.",
    "You overcame inertia. That's not willpower — that's your brain working hard for you.",
    "The thing is done. Not perfectly. But done. And done is what matters.",
    "You moved something from 'hanging over me' to 'handled.' That's relief you earned.",
    "Getting things done with executive function challenges is twice the work. You did twice the work.",
    "You proved your brain can still do things. Even when it tells you it can't.",
    "Action despite resistance. That's the whole game. You played it today.",
    "One less thing on the mental pile. Your working memory thanks you.",
    "You didn't let the overwhelm win. You picked one thing and you did it.",
    "That thing you've been avoiding? You just faced it. That took guts.",
    "Completion is its own reward. But also: you should feel good about this.",
    "You wrestled your brain into cooperation. That's harder than anyone who doesn't live it understands.",
    "The gap between 'I should' and 'I did' is enormous. You crossed it.",
    "You made a decision and followed through. That's executive function in action.",
    "Something exists now that didn't before. Because you made it happen.",
    "You didn't need the perfect moment. You used this one. That's enough.",
    "Progress isn't linear. But this? This is a data point in the right direction.",
    "You got something done that your brain said was impossible. Your brain was wrong.",
  ],
  rest: [
    "Choosing rest is an act of rebellion against a system that wants you depleted.",
    "You protected your energy. That's a skill.",
    "Saying no is a complete sentence. You used it.",
    "Rest is not laziness. It's recovery. You chose recovery.",
    "The hardest thing for a depleted person to do is stop. You stopped.",
    "You chose yourself over the to-do list. The to-do list will survive.",
    "Rest is productive. It produces a person who can function tomorrow.",
    "You set a boundary with your own expectations. That's advanced self-care.",
    "The guilt you might feel about this? It's lying to you. You needed this.",
    "You let something go. The world didn't end. It never does.",
    "Stopping is not quitting. It's strategic. You were strategic today.",
    "You chose recovery over performance. That's not lazy — that's smart.",
    "The thing you didn't do today? It'll still be there tomorrow. But you'll be more rested to face it.",
    "You gave yourself permission. That's harder than doing the thing.",
    "Rest is how you break the cycle of depletion. You just broke it a little.",
    "You trusted that enough was enough. That's self-knowledge.",
    "Cancelling was the right call. You don't owe anyone your last reserves.",
    "You chose not to push through. That's not weakness. That's wisdom.",
    "The world rewards burnout. You just refused to play that game.",
    "You let yourself be a person with limits. Because you are one.",
    "Doing less today means having more tomorrow. That's math, not laziness.",
    "You stopped before you broke. That's better than most people manage.",
    "The boundary you just set protects everyone — including the people who depend on you.",
    "You chose sustainability over heroics. Heroics don't last. Sustainability does.",
    "Rest isn't the absence of productivity. It's the presence of self-respect.",
    "You didn't earn this rest. You don't have to. Rest isn't a reward. It's a right.",
    "Letting go of one thing freed up space for something better. Even if that something is just breathing.",
    "You said no to something so you could say yes to yourself. That's a trade worth making.",
    "The hustle culture voice in your head is wrong. You were right to stop.",
    "You chose to not be a machine today. Because you're not one.",
  ],
  uncategorized: [
    "Logged. Counted. Real.",
    "Another thing you did that you might have forgotten by tonight. Not anymore.",
    "This is evidence. Against the voice that says you do nothing.",
    "Small? Maybe. But it happened. You made it happen.",
    "Added to your evidence file. You're building a case for yourself.",
    "You did a thing. In a life where things are hard to do. That's not nothing.",
    "This goes on the record. The record of you showing up.",
    "One more thing you can point to and say: I did that.",
    "Your brain might minimize this later. But right now, it's real and it counts.",
    "The voice that says 'that doesn't count' is wrong. It counts.",
    "You noticed what you did. Most people don't even get that far.",
    "This is you, building evidence that you're not the person your worst thoughts say you are.",
    "Documented. Because you deserve to remember what you actually do all day.",
    "Another brick in the wall of proof that you're handling things.",
    "You did something. And then you acknowledged it. Both of those matter.",
    "This is what a day is made of. Small things that add up to a life.",
    "Not every win needs to be big. This one is exactly the right size.",
    "You're tracking your own life. That's more self-awareness than most people practice.",
    "Filed under: things you did that matter, even if no one else notices.",
    "The fact that you logged this means you're paying attention to yourself. Keep paying attention.",
    "One more piece of evidence that today wasn't wasted.",
    "You did it. You don't need to justify it or explain it. You just did it.",
    "This is you, refusing to let the day disappear without a trace.",
    "Noted. Witnessed. It happened and now there's proof.",
    "Your day has more in it than you think. This is proof.",
    "You're collecting evidence of your own competence. Smart.",
    "Another thing that happened because you exist and you tried.",
    "This is what showing up looks like. Not perfect. Just present.",
    "You made something happen today. That's agency. That's you.",
    "The record grows. The evidence accumulates. You are not doing nothing.",
  ],
}

// Pattern-aware bonus reflections — used when dimensions are elevated
const patternReflections: { condition: (patternMap: PatternMap, category: string) => boolean; reflection: string }[] = [
  { condition: (pm, cat) => pm.dimensions.filter(d => d.intensity === "critical").length >= 2 && cat === "survival", reflection: "Multiple systems at critical and you still did this. That's not nothing. That's everything." },
  { condition: (pm, cat) => pm.dimensions.filter(d => d.intensity === "critical").length >= 2 && cat === "care", reflection: "Everything is at critical and you still chose to care for yourself. That's radical." },
  { condition: (pm, cat) => pm.dimensions.filter(d => d.intensity === "critical").length >= 3, reflection: "You're doing this on the hardest difficulty setting. And you're still doing it." },
  { condition: (pm, cat) => pm.dimensions.some(d => d.dimension === "physical-depletion" && (d.intensity === "high" || d.intensity === "critical")) && cat === "care", reflection: "Your body is running on fumes and you still chose to care for it. That matters more than you know right now." },
  { condition: (pm, cat) => pm.dimensions.some(d => d.dimension === "physical-depletion" && (d.intensity === "high" || d.intensity === "critical")) && cat === "survival", reflection: "Depleted and still functioning. That's not baseline — that's extraordinary." },
  { condition: (pm, cat) => pm.dimensions.some(d => d.dimension === "cognitive-load" && (d.intensity === "high" || d.intensity === "critical")) && cat === "progress", reflection: "Your working memory is maxed and you still got something done. Your brain is working harder than anyone sees." },
  { condition: (pm, cat) => pm.dimensions.some(d => d.dimension === "cognitive-load" && (d.intensity === "high" || d.intensity === "critical")) && cat === "survival", reflection: "Too many tabs open in your brain and you still managed this. That's not easy. You made it look easy." },
  { condition: (pm, cat) => pm.dimensions.some(d => d.dimension === "emotional-bandwidth" && (d.intensity === "high" || d.intensity === "critical")) && cat === "connection", reflection: "Connecting with people when your emotional bandwidth is this thin takes real courage." },
  { condition: (pm, cat) => pm.dimensions.some(d => d.dimension === "emotional-bandwidth" && (d.intensity === "high" || d.intensity === "critical")) && cat === "rest", reflection: "Your emotional tank is near empty and you chose to protect what's left. That's self-preservation. That's smart." },
  { condition: (pm, cat) => pm.dimensions.some(d => d.dimension === "identity-erosion" && (d.intensity === "high" || d.intensity === "critical")) && cat === "rest", reflection: "You chose yourself. Not mom-you. Just you. Keep that thread alive." },
  { condition: (pm, cat) => pm.dimensions.some(d => d.dimension === "identity-erosion" && (d.intensity === "high" || d.intensity === "critical")) && cat === "connection", reflection: "You showed up as a person, not just a role. That's how identity comes back — one interaction at a time." },
  { condition: (pm, cat) => pm.dimensions.some(d => d.dimension === "system-friction" && (d.intensity === "high" || d.intensity === "critical")) && cat === "progress", reflection: "Getting things done without functional systems is twice the work. You did twice the work." },
  { condition: (pm, cat) => pm.dimensions.some(d => d.dimension === "system-friction" && (d.intensity === "high" || d.intensity === "critical")) && cat === "survival", reflection: "No structure, no support, and you still kept things running. The system failed you. You didn't fail." },
]

/**
 * Simple string hash that produces a consistent number for any input.
 * Used to select reflections based on win text so different inputs
 * always produce different responses.
 */
function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return Math.abs(hash)
}

/**
 * Get recently shown reflections to avoid repetition
 */
function getRecentlyShown(): string[] {
  try {
    const data = localStorage.getItem(RECENTLY_SHOWN_KEY)
    if (!data) return []
    return JSON.parse(data)
  } catch {
    return []
  }
}

/**
 * Track a reflection as recently shown
 */
function markAsShown(reflection: string): void {
  const recent = getRecentlyShown()
  recent.push(reflection)
  // Keep only the last N
  const trimmed = recent.slice(-MAX_RECENT)
  try {
    localStorage.setItem(RECENTLY_SHOWN_KEY, JSON.stringify(trimmed))
  } catch {}
}

function generateReflection(text: string, patternMap: PatternMap | null): string {
  const category = categorizeWin(text)

  // Check pattern-aware reflections first (20% chance if applicable)
  if (patternMap) {
    const applicable = patternReflections.filter((pr) => pr.condition(patternMap, category))
    if (applicable.length > 0) {
      const hash = hashString(text + "pattern")
      // Use pattern reflection ~30% of the time
      if (hash % 3 === 0) {
        const selected = applicable[hash % applicable.length]
        markAsShown(selected.reflection)
        return selected.reflection
      }
    }
  }

  // Select from main pool using text hash + avoid recently shown
  const pool = reflections[category] || reflections.uncategorized
  const recentlyShown = getRecentlyShown()

  // Filter out recently shown
  const available = pool.filter((r) => !recentlyShown.includes(r))
  const finalPool = available.length > 0 ? available : pool // Fall back to full pool if all shown

  // Use hash of the win text for selection — different text = different reflection
  const hash = hashString(text + category + String(Date.now()).slice(0, -4)) // Changes every ~10 seconds
  const index = hash % finalPool.length
  const selected = finalPool[index]

  markAsShown(selected)
  return selected
}

// ---- Helpers ----

function generateId(): string {
  return `win-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function getToday(): string {
  return formatDate(new Date())
}

function getYesterday(): string {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return formatDate(d)
}

function formatDate(d: Date): string {
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

// ---- Weekly Stats (for Evidence Journal) ----

export function getWeeklyWinStats(weekStartDate: string): {
  totalWins: number
  daysActive: number
  topCategories: { category: string; count: number }[]
  topWins: MicroWin[]
} {
  const all = getAllWins()
  const start = new Date(weekStartDate)
  const end = new Date(weekStartDate)
  end.setDate(end.getDate() + 7)
  const endStr = formatDate(end)

  const weekDays = all.filter((d) => d.date >= weekStartDate && d.date < endStr)
  const allWins = weekDays.flatMap((d) => d.wins)

  const catCounts: Record<string, number> = {}
  for (const win of allWins) {
    catCounts[win.category] = (catCounts[win.category] || 0) + 1
  }

  const topCategories = Object.entries(catCounts)
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 3)

  // Top wins = most recent from each active day
  const topWins = weekDays
    .map((d) => d.wins[d.wins.length - 1])
    .filter(Boolean)
    .slice(0, 5)

  return {
    totalWins: allWins.length,
    daysActive: weekDays.length,
    topCategories,
    topWins,
  }
}
