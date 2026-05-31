// ============================================================
// Pathway Results Generator
// Analyzes answers from a completed pathway and generates
// personalized insights, strategies, scripts, and connections
// ============================================================

import type { AssessmentSection } from "./types"

export interface PathwayInsight {
  patternTitle: string
  patternDescription: string
  primaryChallenge: string
  secondaryChallenges: string[]
  strategies: PathwayStrategy[]
  script: PathwayScript
  connectionToSnapshot: string | null
  nextPathwaySuggestion: { slug: string; title: string; reason: string } | null
}

export interface PathwayStrategy {
  title: string
  description: string
  timeframe: "today" | "this-week" | "this-month"
}

export interface PathwayScript {
  title: string
  context: string
  words: string
}

// ============================================================
// Dimension scoring helper
// ============================================================

interface DimScore {
  dimension: string
  score: number
  maxScore: number
  intensity: "low" | "moderate" | "high" | "critical"
}

function scoreSections(
  sections: AssessmentSection[],
  answers: Record<string, string>
): DimScore[] {
  const scores: Record<string, { score: number; max: number }> = {}

  for (const section of sections) {
    for (const question of section.questions) {
      const answerId = answers[question.id]
      if (!answerId) continue
      const option = question.options.find((o) => o.id === answerId)
      if (!option?.dimensions) continue
      for (const [dim, val] of Object.entries(option.dimensions)) {
        if (!scores[dim]) scores[dim] = { score: 0, max: 0 }
        scores[dim].score += val
        scores[dim].max += 4
      }
    }
  }

  return Object.entries(scores).map(([dim, { score, max }]) => {
    const ratio = score / max
    const intensity = ratio <= 0.3 ? "low" : ratio <= 0.55 ? "moderate" : ratio <= 0.8 ? "high" : "critical"
    return { dimension: dim, score, maxScore: max, intensity }
  })
}

function getHighest(dims: DimScore[]): DimScore | null {
  if (dims.length === 0) return null
  return dims.reduce((a, b) => (a.score / a.maxScore > b.score / b.maxScore ? a : b))
}

function getHighDims(dims: DimScore[]): DimScore[] {
  return dims.filter((d) => d.intensity === "high" || d.intensity === "critical")
}

// ============================================================
// Executive Function Results
// ============================================================

function generateExecutiveFunctionResults(dims: DimScore[], answers: Record<string, string>): PathwayInsight {
  const highest = getHighest(dims)
  const highDims = getHighDims(dims)

  // Pattern identification
  let patternTitle = "Your Executive Function Profile"
  let patternDescription = ""
  let primaryChallenge = ""

  if (highest?.dimension === "task-initiation") {
    patternTitle = "The Initiation Gap"
    patternDescription = "Your core challenge isn't knowing what to do — it's starting. The signal from intention to action gets stuck. This isn't laziness or lack of motivation. It's a neurological gap between wanting and doing that requires specific strategies to bridge."
    primaryChallenge = "Task initiation — the gap between knowing and doing"
  } else if (highest?.dimension === "time-perception") {
    patternTitle = "Time Blindness"
    patternDescription = "Your brain doesn't feel time passing the way other brains do. You genuinely believe you have more time than you do, and you're consistently shocked when it runs out. This affects everything downstream — planning, punctuality, and the shame that follows."
    primaryChallenge = "Time perception — your internal clock runs differently"
  } else if (highest?.dimension === "working-memory") {
    patternTitle = "The Overloaded Desktop"
    patternDescription = "Your working memory — the brain's ability to hold and juggle information in real time — is maxed out. Things that aren't directly in front of you cease to exist. This isn't carelessness. It's a smaller cognitive 'desktop' being asked to run too many programs."
    primaryChallenge = "Working memory — too many tabs open, things falling off"
  } else if (highest?.dimension === "organization-systems") {
    patternTitle = "The System Graveyard"
    patternDescription = "You've tried every planner, app, and routine. They work for two weeks, then die. This isn't a discipline problem — it's a novelty-dependent brain losing the dopamine hit that made the system work initially. You need systems designed for how your brain actually operates."
    primaryChallenge = "Organization — systems that don't stick"
  } else if (highest?.dimension === "attention-regulation") {
    patternTitle = "The Attention Tug-of-War"
    patternDescription = "You can focus — intensely, sometimes for hours. But you can't always choose WHAT gets your focus. Important things compete with interesting things, and interesting usually wins. Then hyperfocus steals time you didn't mean to give."
    primaryChallenge = "Attention regulation — focus goes where it wants, not where you need it"
  } else {
    patternTitle = "Functional but Effortful"
    patternDescription = "Your executive function is working, but it takes more effort than it should. You've built compensatory strategies that mostly hold — the work now is making them more sustainable and less exhausting."
    primaryChallenge = "Maintaining systems takes more energy than it should"
  }

  const secondaryChallenges = highDims
    .filter((d) => d.dimension !== highest?.dimension)
    .map((d) => {
      switch (d.dimension) {
        case "task-initiation": return "Starting tasks requires external pressure or tricks"
        case "time-perception": return "Time estimates are consistently inaccurate"
        case "working-memory": return "Things disappear from awareness when not visible"
        case "organization-systems": return "Systems collapse after the novelty wears off"
        case "attention-regulation": return "Attention is pulled by interest, not importance"
        default: return ""
      }
    })
    .filter(Boolean)

  // Strategies matched to primary challenge
  let strategies: PathwayStrategy[] = []

  if (highest?.dimension === "task-initiation") {
    strategies = [
      { title: "The 5-Minute Contract", description: "Tell yourself: 'I will do this for 5 minutes only.' Set a timer. When it goes off, you can stop guilt-free. Most of the time, starting is the hardest part — once you're moving, momentum carries you. But if 5 minutes is all you do? That's infinitely more than zero.", timeframe: "today" },
      { title: "Body Doubling", description: "Get someone on the phone, on FaceTime, or in the room. Their presence activates your brain. It sounds strange — it works. Your brain needs parallel presence to fire the 'go' signal. Try a virtual co-working session or just call a friend while you fold laundry.", timeframe: "this-week" },
      { title: "Pair Boring with Stimulating", description: "Your brain needs stimulation to activate. Dishes + podcast. Laundry + music. Tidying + phone call. Give your brain the dopamine it needs WHILE doing the task, not instead of it. This isn't cheating — it's working with your neurology.", timeframe: "today" },
    ]
  } else if (highest?.dimension === "time-perception") {
    strategies = [
      { title: "Visual Timers", description: "Get a Time Timer (the one with the red disappearing disk) or use a phone app that shows time visually shrinking. Your brain can't feel time, but it can SEE it disappearing. Put it where you'll see it during transitions.", timeframe: "this-week" },
      { title: "The 15-Minute Buffer Rule", description: "Whatever time you think something will take, add 15 minutes. Every time. Yes, even for things you're 'sure' about. Your brain underestimates by 25-40% on average. Build the buffer into every plan.", timeframe: "today" },
      { title: "Alarm Chains", description: "Set a chain of phone alarms for important transitions: 30 min before, 15 min, 10 min, 5 min. Label each one with what should be happening ('SHOES NOW'). Your phone becomes your external sense of time.", timeframe: "today" },
    ]
  } else if (highest?.dimension === "working-memory") {
    strategies = [
      { title: "The Capture Notebook", description: "Carry ONE small notebook everywhere. Every thought, task, reminder goes in immediately — don't organize, just capture. Your brain will drop it in 30 seconds if you don't write it down. The notebook is your external hard drive.", timeframe: "today" },
      { title: "Visual Cues, Not Mental Notes", description: "Put the permission slip ON your keys. Put the library books BY the door. Put the birthday card ON the steering wheel. If it's not visible, it doesn't exist to your brain. Use physical placement as your reminder system.", timeframe: "today" },
      { title: "The 2-Minute Rule", description: "If something takes less than 2 minutes — signing a form, replying to a text, putting something away — do it the MOMENT it enters your awareness. Don't put it down. Don't say 'later.' Two minutes, done, gone. Your future self will not remember.", timeframe: "today" },
    ]
  } else if (highest?.dimension === "organization-systems") {
    strategies = [
      { title: "Expect the Novelty Drop-Off", description: "You WILL lose interest in any new system around week 3. Plan for it: set a calendar reminder that says 'The novelty is wearing off. This is normal. Keep going for one more week.' Knowing it's coming makes it survivable.", timeframe: "this-week" },
      { title: "Boring Systems That Work", description: "Stop looking for the perfect system. The best system is the boring one you'll actually use. A plain notebook beats a beautiful planner you abandon. A basic phone reminder beats an elaborate app you forget to open. Function over aesthetics.", timeframe: "today" },
      { title: "Rotate, Don't Abandon", description: "Instead of abandoning systems entirely, rotate between 2-3 that work. Planner until it's stale, then the app, then the whiteboard, then back. Rotation satisfies novelty-seeking without losing function.", timeframe: "this-month" },
    ]
  } else if (highest?.dimension === "attention-regulation") {
    strategies = [
      { title: "The Hyperfocus Alarm", description: "Before starting anything absorbing, set an alarm for when you MUST stop. Not when you want to stop — when you must. Your brain won't track time once it's locked in. The alarm is your only exit ramp.", timeframe: "today" },
      { title: "Make Important Things Interesting", description: "Your brain follows interest, not importance. So make important tasks more interesting: gamify them, add a challenge, race a timer, or pair them with something novel. You're not broken — you're interest-driven.", timeframe: "this-week" },
      { title: "Environment Design", description: "Remove distractions before you need willpower to resist them. Phone in another room. Browser blockers on. TV off. Don't rely on self-control — design your environment so the right thing is the easy thing.", timeframe: "today" },
    ]
  } else {
    strategies = [
      { title: "Protect What's Working", description: "You've built compensatory strategies that function. The risk now is disruption — illness, holidays, schedule changes. Build a 'restart protocol' for getting back on track within 2 days of any disruption.", timeframe: "this-week" },
      { title: "Reduce Decision Fatigue", description: "Every decision uses cognitive resources. Automate what you can: same breakfast rotation, capsule wardrobe, standing grocery order. Save your executive function for things that actually need it.", timeframe: "this-month" },
      { title: "Build Redundancy", description: "What happens when your system fails? Have a backup: spare essentials in the car, a 'grab and go' bag, a neighbor who can help. Systems need safety nets for the days your brain can't compensate.", timeframe: "this-month" },
    ]
  }

  // Script matched to pattern
  let script: PathwayScript

  if (highest?.dimension === "task-initiation" || highest?.dimension === "organization-systems") {
    script = {
      title: "The 'Help Me Start' Script",
      context: "When you need someone to help you break through paralysis:",
      words: "I'm stuck. I can see what needs doing but my brain won't let me start. Can you just sit with me while I do it? Or tell me the first tiny step? I don't need you to do it for me — I just need help getting unstuck.",
    }
  } else if (highest?.dimension === "time-perception") {
    script = {
      title: "The 'Running Late' Self-Talk",
      context: "When you're late again and the shame is building:",
      words: "I'm late because my brain processes time differently, not because I don't care. I'm going to text them honestly, take a breath, and get there safely. Being late doesn't make me a bad person or a bad mother.",
    }
  } else if (highest?.dimension === "working-memory") {
    script = {
      title: "The 'I Forgot' Repair Script",
      context: "When you've forgotten something important and need to address it:",
      words: "I forgot, and I'm sorry. It wasn't because this doesn't matter to me — my brain has a hard time holding things that aren't right in front of me. I'm going to set up a system so this specific thing doesn't slip again. Can you help me figure out what would work?",
    }
  } else {
    script = {
      title: "The Self-Permission Script",
      context: "When you're beating yourself up about executive function struggles:",
      words: "My brain works differently. That's not an excuse — it's information. I'm going to work WITH how my brain functions instead of punishing myself for not being wired like everyone else. What's one small thing I can do right now?",
    }
  }

  // Connection to snapshot dimensions
  let connectionToSnapshot: string | null = null
  try {
    const mapData = localStorage.getItem("mindful-mama-pattern-map")
    if (mapData) {
      const map = JSON.parse(mapData)
      const cogLoad = map.dimensions?.find((d: any) => d.dimension === "cognitive-load")
      const systemFriction = map.dimensions?.find((d: any) => d.dimension === "system-friction")
      if (cogLoad?.intensity === "high" || cogLoad?.intensity === "critical") {
        connectionToSnapshot = `Your check-in showed critical cognitive load. This executive function pathway reveals WHY — ${primaryChallenge.toLowerCase()}. When your brain can't ${highest?.dimension === "task-initiation" ? "start tasks" : highest?.dimension === "time-perception" ? "track time" : "hold information"}, everything piles up and your cognitive load skyrockets. Addressing this specific pattern will reduce the overall noise.`
      } else if (systemFriction?.intensity === "high" || systemFriction?.intensity === "critical") {
        connectionToSnapshot = `Your check-in showed high system friction — daily life fighting you instead of supporting you. This pathway shows the mechanism: ${primaryChallenge.toLowerCase()}. Building external systems that compensate for this specific gap will make your daily structure feel less like a battle.`
      }
    }
  } catch {}

  // Next pathway suggestion
  let nextPathwaySuggestion: PathwayInsight["nextPathwaySuggestion"] = null
  if (highest?.dimension === "task-initiation" || highest?.dimension === "working-memory") {
    nextPathwaySuggestion = {
      slug: "sleep-recovery",
      title: "Sleep & Recovery",
      reason: "Sleep deprivation directly impairs task initiation and working memory. If you're not sleeping well, fixing that may improve your executive function more than any strategy.",
    }
  } else if (highest?.dimension === "time-perception" || highest?.dimension === "attention-regulation") {
    nextPathwaySuggestion = {
      slug: "hormonal-patterns",
      title: "Hormonal Patterns",
      reason: "Many women find their time perception and attention regulation fluctuate dramatically with their cycle. Understanding that pattern can help you plan around it.",
    }
  }

  return {
    patternTitle,
    patternDescription,
    primaryChallenge,
    secondaryChallenges,
    strategies,
    script,
    connectionToSnapshot,
    nextPathwaySuggestion,
  }
}

// ============================================================
// Depletion & Burnout Results
// ============================================================

function generateDepletionResults(dims: DimScore[], answers: Record<string, string>): PathwayInsight {
  const highest = getHighest(dims)
  const highDims = getHighDims(dims)

  let patternTitle = "Your Depletion Profile"
  let patternDescription = ""
  let primaryChallenge = ""

  if (highest?.dimension === "depletion-vs-depression") {
    patternTitle = "Beyond Tired"
    patternDescription = "What you're experiencing may go deeper than depletion. When rest doesn't help, joy has disappeared, and you can't point to a specific cause — that's worth exploring with a professional. This isn't failure. It's your body asking for a different kind of support than self-help tools can provide."
    primaryChallenge = "This may be beyond what rest and strategies can fix"
  } else if (highest?.dimension === "energy-patterns") {
    patternTitle = "Running on Empty"
    patternDescription = "Your energy tank isn't just low — it's been low for so long that you've forgotten what 'full' feels like. You've adapted to functioning on fumes, which means you don't even register how depleted you are until you crash. Your baseline has shifted dangerously low."
    primaryChallenge = "Chronic energy deficit — you've normalized running on nothing"
  } else if (highest?.dimension === "recovery-capacity") {
    patternTitle = "Rest That Doesn't Reach You"
    patternDescription = "You're not just tired — you're unable to recover. Even when you get rest, it doesn't restore you. This suggests your nervous system is stuck in 'on' mode, your recovery windows are too short or too shallow, or the demands resume before restoration is complete."
    primaryChallenge = "Recovery isn't happening — rest doesn't equal restoration"
  } else if (highest?.dimension === "burnout-signals") {
    patternTitle = "Burnout in Progress"
    patternDescription = "Your body and mind are sending clear burnout signals: loss of joy, cynicism, physical health changes, emotional flatness. This isn't a bad week — it's a pattern that's been building. Burnout doesn't resolve with a weekend off. It requires structural change."
    primaryChallenge = "Active burnout — joy is gone, cynicism is building, body is protesting"
  } else if (highest?.dimension === "giving-patterns") {
    patternTitle = "Pouring From Empty"
    patternDescription = "You give everything to everyone else and there's nothing left for you. This isn't generosity — it's a pattern that's destroying you. Whether it comes from guilt, obligation, or an inability to say no, the result is the same: you're disappearing into service."
    primaryChallenge = "Over-giving — everyone else's needs come before yours, always"
  } else {
    patternTitle = "Tired but Holding"
    patternDescription = "You're depleted but not in crisis. You have some recovery capacity and some boundaries in place. The work now is protecting what's working and building more sustainable patterns before the balance tips."
    primaryChallenge = "Maintaining sustainability before depletion deepens"
  }

  const secondaryChallenges = highDims
    .filter((d) => d.dimension !== highest?.dimension)
    .map((d) => {
      switch (d.dimension) {
        case "energy-patterns": return "Energy is chronically low with no recovery"
        case "recovery-capacity": return "Rest doesn't restore — you wake up just as tired"
        case "burnout-signals": return "Joy has faded, cynicism is creeping in"
        case "giving-patterns": return "You put everyone else first, always"
        case "depletion-vs-depression": return "This may be deeper than situational exhaustion"
        default: return ""
      }
    })
    .filter(Boolean)

  let strategies: PathwayStrategy[] = []

  if (highest?.dimension === "depletion-vs-depression") {
    strategies = [
      { title: "Talk to Someone Professional", description: "This isn't a strategy you can self-help your way through. If rest doesn't help, joy is gone, and you can't explain why — please reach out to a healthcare provider. Say exactly this: 'I'm exhausted in a way that sleep doesn't fix, I've lost interest in things I used to enjoy, and I need help figuring out what's happening.' You deserve support.", timeframe: "this-week" },
      { title: "Lower Every Bar Today", description: "While you figure out next steps, give yourself permission to operate at absolute minimum. Cereal for dinner. Screens for kids. Cancel anything optional. You're not being lazy — you're conserving resources for survival.", timeframe: "today" },
      { title: "Tell One Person", description: "Break the isolation. Text one person you trust: 'I'm not doing well and I've been hiding it.' You don't have to explain everything. Just let one person know. Isolation makes everything worse.", timeframe: "today" },
    ]
  } else if (highest?.dimension === "energy-patterns" || highest?.dimension === "recovery-capacity") {
    strategies = [
      { title: "The Non-Negotiable Rest Window", description: "Block 20 minutes today where you are OFF. Not scrolling. Not 'resting' while listening for the kids. Actually off duty. Lock the bathroom door. Sit in your car. Put headphones in. Your nervous system needs to know it's safe to stop.", timeframe: "today" },
      { title: "Energy Accounting", description: "For 3 days, notice what GIVES you energy vs. what TAKES it. Write it down. You'll likely find you're spending 90% on withdrawals and 10% on deposits. You can't fix what you can't see. Then: add one deposit daily, even if it's tiny.", timeframe: "this-week" },
      { title: "The 'Good Enough' Day", description: "Define what a 'good enough' day looks like at your CURRENT capacity — not your ideal capacity. Everyone fed, everyone safe, one load of laundry. That's it. Everything above that line is bonus. Stop measuring yourself against a standard set when you had more resources.", timeframe: "today" },
    ]
  } else if (highest?.dimension === "giving-patterns") {
    strategies = [
      { title: "Say No to One Thing This Week", description: "Not the hardest thing. The easiest no you can find. A volunteer request. An optional event. A favor that would cost you more than it gives them. Practice the muscle. It will feel terrible the first time. Do it anyway.", timeframe: "this-week" },
      { title: "The Oxygen Mask Reframe", description: "You're not being selfish by attending to your own needs. You're being strategic. A depleted mother gives her children a depleted mother. A mother who protects her energy gives her children someone who's actually present. This isn't philosophy — it's math.", timeframe: "today" },
      { title: "Notice the Guilt — Don't Obey It", description: "Guilt will show up when you set a boundary. That's normal. Notice it. Name it: 'There's the guilt.' Then ask: 'Is this guilt protecting me, or is it keeping me trapped in a pattern that's destroying me?' Usually, it's the latter.", timeframe: "today" },
    ]
  } else {
    strategies = [
      { title: "Protect Your Recovery Windows", description: "You have some capacity to recover — protect it fiercely. When life tries to steal your rest time, treat it like a medical appointment. It's not optional. It's what keeps you functional.", timeframe: "this-week" },
      { title: "Build One Sustainable Boundary", description: "Choose one area where you consistently over-give and set a limit. Not a dramatic one — a sustainable one. 'I don't answer messages after 9pm.' 'I don't volunteer for things on Wednesdays.' Small, consistent, holdable.", timeframe: "this-month" },
      { title: "Track Your Capacity Honestly", description: "Rate your energy 1-10 each morning. After a week, you'll see patterns: which days are harder, what depletes you fastest, when you need to protect yourself. Data removes the guesswork.", timeframe: "this-week" },
    ]
  }

  let script: PathwayScript
  if (highest?.dimension === "giving-patterns") {
    script = {
      title: "The Boundary Script",
      context: "When someone asks you to do something and you need to say no:",
      words: "I appreciate you thinking of me, but I can't take that on right now. I'm at capacity and I need to protect my energy for my family. I hope you understand.",
    }
  } else if (highest?.dimension === "depletion-vs-depression") {
    script = {
      title: "The Asking-for-Help Script",
      context: "When you need to tell someone you're struggling:",
      words: "I need to be honest with you. I'm not okay. I've been pushing through but I'm running on nothing and I think I need more help than I've been asking for. I don't need you to fix it — I just need you to know.",
    }
  } else {
    script = {
      title: "The Self-Permission Script",
      context: "When guilt hits for resting or doing less:",
      words: "I am not a machine. My body is telling me something important right now. Resting isn't quitting — it's how I stay in the game. My children need a mother who's present, not a mother who's running on fumes performing productivity.",
    }
  }

  let connectionToSnapshot: string | null = null
  try {
    const mapData = localStorage.getItem("mindful-mama-pattern-map")
    if (mapData) {
      const map = JSON.parse(mapData)
      const physical = map.dimensions?.find((d: any) => d.dimension === "physical-depletion")
      const emotional = map.dimensions?.find((d: any) => d.dimension === "emotional-bandwidth")
      if (physical?.intensity === "critical") {
        connectionToSnapshot = `Your check-in flagged critical physical depletion. This pathway reveals the mechanism: ${primaryChallenge.toLowerCase()}. Your body isn't just tired — it's been running a deficit for so long that normal rest can't catch up. Something structural needs to change.`
      } else if (emotional?.intensity === "high" || emotional?.intensity === "critical") {
        connectionToSnapshot = `Your check-in showed strained emotional bandwidth. This pathway shows why: when you're this depleted, emotional regulation is the first thing to go. You're not 'too reactive' — you're under-resourced. Addressing the depletion will give your emotional system room to breathe.`
      }
    }
  } catch {}

  let nextPathwaySuggestion: PathwayInsight["nextPathwaySuggestion"] = null
  if (highest?.dimension === "giving-patterns") {
    nextPathwaySuggestion = { slug: "systemic-load", title: "Systemic Load", reason: "Your over-giving may be driven by a system that demands too much from you. This pathway maps whether the problem is your boundaries or your circumstances." }
  } else if (highest?.dimension === "energy-patterns" || highest?.dimension === "recovery-capacity") {
    nextPathwaySuggestion = { slug: "sleep-recovery", title: "Sleep & Recovery", reason: "Chronic low energy often has a sleep component. This pathway explores whether disrupted sleep is compounding your depletion." }
  } else if (highest?.dimension === "depletion-vs-depression") {
    nextPathwaySuggestion = { slug: "trauma-nervous-system", title: "Trauma & Nervous System", reason: "When depletion goes this deep, there may be nervous system patterns from your past keeping you stuck. This pathway explores that gently." }
  }

  return { patternTitle, patternDescription, primaryChallenge, secondaryChallenges, strategies, script, connectionToSnapshot, nextPathwaySuggestion }
}

// ============================================================
// Sensory & Overwhelm Results
// ============================================================

function generateSensoryResults(dims: DimScore[], answers: Record<string, string>): PathwayInsight {
  const highest = getHighest(dims)
  const highDims = getHighDims(dims)

  let patternTitle = "Your Sensory Profile"
  let patternDescription = ""
  let primaryChallenge = ""

  if (highest?.dimension === "auditory-processing") {
    patternTitle = "Sound is Your Trigger"
    patternDescription = "Your brain struggles to filter auditory input. Every noise competes for attention at equal volume — the TV, the sibling argument, the question being asked, the dog barking. It builds until your nervous system hits a wall. This is auditory processing sensitivity, and it's incredibly common in neurodivergent brains."
    primaryChallenge = "Auditory overwhelm — noise builds until you break"
  } else if (highest?.dimension === "tactile-sensitivity") {
    patternTitle = "Touched Out"
    patternDescription = "Physical contact — which should feel nurturing — has become a source of sensory overwhelm. By the end of the day (or sometimes before it starts), your skin crawls at the thought of another small body climbing on you. This is your nervous system hitting capacity, not a failure of maternal love."
    primaryChallenge = "Touch sensitivity — your body needs space it's not getting"
  } else if (highest?.dimension === "overwhelm-patterns") {
    patternTitle = "The Compound Crash"
    patternDescription = "Individual sensory inputs might be manageable alone. But when they stack — noise + touch + questions + visual mess + time pressure — your system crashes. You either snap or shut down. The recovery time after these crashes is getting longer."
    primaryChallenge = "Compound overwhelm — multiple inputs crash your system simultaneously"
  } else if (highest?.dimension === "regulation-strategies") {
    patternTitle = "No Tools for the Storm"
    patternDescription = "You don't have effective strategies for managing sensory overload — or you can't access them once you're past the tipping point. You endure until you break, then deal with the aftermath. Building early-warning awareness and pre-emptive tools is your highest priority."
    primaryChallenge = "Lacking regulation strategies — you endure until you break"
  } else {
    patternTitle = "Sensory Aware"
    patternDescription = "You have awareness of your sensory limits and some tools for managing them. Your work now is building consistency — catching overwhelm earlier and intervening before the crash rather than after."
    primaryChallenge = "Maintaining regulation during high-demand periods"
  }

  const secondaryChallenges = highDims
    .filter((d) => d.dimension !== highest?.dimension)
    .map((d) => {
      switch (d.dimension) {
        case "auditory-processing": return "Noise sensitivity is high"
        case "tactile-sensitivity": return "Touch aversion is significant"
        case "visual-overwhelm": return "Visual clutter impairs your thinking"
        case "overwhelm-patterns": return "Compound sensory input crashes your system"
        case "regulation-strategies": return "You lack tools to intervene before the snap"
        default: return ""
      }
    })
    .filter(Boolean)

  let strategies: PathwayStrategy[] = []

  if (highest?.dimension === "auditory-processing") {
    strategies = [
      { title: "Loop Earbuds — Today", description: "Order Loop Quiet or Loop Experience earbuds. They reduce decibel levels by 18-27dB without blocking voices entirely. You can still hear your kids — it just removes the sharp, overwhelming edge. Many neurodivergent mothers describe these as life-changing. Wear them during high-noise periods proactively.", timeframe: "this-week" },
      { title: "The Noise Budget", description: "You have a daily noise budget. TV counts. Music counts. Sibling arguments count. When you notice the budget getting low (jaw clenching, shoulders rising), proactively reduce input: turn off background TV, move to a quieter room, or put in one earbud. Early intervention is 10x easier than crisis management.", timeframe: "today" },
      { title: "Teach Volume Levels", description: "Teach your kids about volume levels: 1 is whisper, 3 is indoor voice, 5 is outdoor voice. When noise is building, say: 'We're at a 4 right now. Can we bring it to a 2 for 10 minutes?' Give them the language so you're not just yelling 'BE QUIET' from overwhelm.", timeframe: "this-week" },
    ]
  } else if (highest?.dimension === "tactile-sensitivity") {
    strategies = [
      { title: "Proactive Touch Boundaries", description: "Before you hit capacity, build in 'no touch' windows. After school pickup: 'I'm going to sit quietly for 5 minutes, then I'm all yours for hugs.' Setting boundaries BEFORE overwhelm prevents the snap. Your kids learn that your needs are valid too.", timeframe: "today" },
      { title: "Alternative Connection", description: "Not all connection requires physical touch. Try: making eye contact and smiling, verbal affirmations ('I love watching you play'), parallel activities (coloring together), or 'air hugs' from across the room. You can be deeply connected without skin contact.", timeframe: "today" },
      { title: "The Recovery Window", description: "After high-touch periods (nursing, carrying toddlers, bedtime cuddles), give yourself 10 minutes of zero physical contact. Lock the bathroom door. Sit in the car. Your nervous system needs reset time — taking it isn't selfish, it's maintenance.", timeframe: "today" },
    ]
  } else if (highest?.dimension === "overwhelm-patterns") {
    strategies = [
      { title: "Learn Your Early Warning Signs", description: "Before the crash, your body sends signals: jaw clenching, shoulders rising, irritability building, breathing getting shallow. For the next 3 days, just NOTICE these signals. Don't try to fix them yet — just notice. Awareness is the first intervention.", timeframe: "today" },
      { title: "The Pre-Emptive Exit", description: "When you notice early warning signs, take your break THEN — not after the snap. Say: 'I need 2 minutes' and step away. A 2-minute break at 70% overwhelm prevents a 30-minute recovery from 100% overwhelm. The math is clear.", timeframe: "today" },
      { title: "Reduce Compound Input", description: "When multiple inputs are hitting at once, remove ONE. Turn off the TV. Move to a different room. Put in one earbud. You don't have to fix everything — just reduce the total load below your threshold. One less input can be the difference between coping and crashing.", timeframe: "today" },
    ]
  } else {
    strategies = [
      { title: "Build Your Regulation Toolkit", description: "You need 2-3 go-to strategies that work for YOU. Common ones: deep pressure (weighted blanket, tight hug), cold water on wrists, stepping outside for 60 seconds, noise-canceling headphones, or a specific breathing pattern. Try each one this week and note what actually helps.", timeframe: "this-week" },
      { title: "The Sensory First Aid Kit", description: "Create a physical kit you can grab: earbuds, a fidget, a cold eye mask, a scented hand cream, a piece of dark chocolate. Keep it somewhere accessible. When overwhelm hits, you don't have to think — just grab the kit.", timeframe: "this-week" },
      { title: "Communicate Your Needs", description: "Tell your family: 'When I put my hand up / put in my earbuds / go to my chair, it means my brain needs a reset. It's not about you. I'll be back in a few minutes.' Give them a visible signal so they know what's happening without you having to explain mid-overwhelm.", timeframe: "today" },
    ]
  }

  const script: PathwayScript = highest?.dimension === "tactile-sensitivity"
    ? { title: "The Touched-Out Script", context: "When physical contact has become unbearable:", words: "I love you so much, and right now my body needs a break from being touched. It's not about you at all — my skin just feels too full. Can we sit next to each other instead? I'll be ready for hugs again after dinner." }
    : { title: "The Sensory Break Script", context: "When you need to step away before you snap:", words: "I need 2 minutes of quiet. I'm not angry at you — my brain just needs a tiny rest from all the noise. I'll be right back and then we can keep going together." }

  let connectionToSnapshot: string | null = null
  try {
    const mapData = localStorage.getItem("mindful-mama-pattern-map")
    if (mapData) {
      const map = JSON.parse(mapData)
      const emotional = map.dimensions?.find((d: any) => d.dimension === "emotional-bandwidth")
      if (emotional?.intensity === "high" || emotional?.intensity === "critical") {
        connectionToSnapshot = `Your check-in showed strained emotional bandwidth — you're reactive and your fuse is short. This pathway reveals a key driver: sensory overload is burning through your emotional capacity before you even get to the hard parenting moments. Managing sensory input earlier in the day will give you more emotional bandwidth when you need it.`
      }
    }
  } catch {}

  const nextPathwaySuggestion: PathwayInsight["nextPathwaySuggestion"] = {
    slug: "depletion-burnout",
    title: "Depletion & Burnout",
    reason: "Sensory overwhelm is exhausting. If you're also physically depleted, the two compound each other — less energy means lower sensory threshold means faster overwhelm means more energy spent recovering. Understanding your depletion pattern completes the picture.",
  }

  return { patternTitle, patternDescription, primaryChallenge, secondaryChallenges, strategies, script, connectionToSnapshot, nextPathwaySuggestion }
}

// ============================================================
// Generic fallback for pathways without custom results yet
// ============================================================

function generateGenericResults(pathwayId: string, dims: DimScore[]): PathwayInsight {
  const highest = getHighest(dims)
  const highDims = getHighDims(dims)

  const patternTitle = highest?.intensity === "critical" ? "Significant Strain" : highest?.intensity === "high" ? "Notable Patterns" : "Emerging Awareness"
  const patternDescription = highDims.length >= 3
    ? "Multiple dimensions of this area are under significant strain. The patterns you've identified here are real and they deserve attention — not as problems to fix, but as information about what you need."
    : highDims.length >= 1
    ? "You've identified specific pressure points in this area. These aren't character flaws — they're patterns that can be understood and worked with."
    : "Your responses suggest this area is manageable for you right now. That's genuine strength worth acknowledging."

  const primaryChallenge = highest
    ? `Your highest strain is in ${highest.dimension.replace(/-/g, " ")}`
    : "No critical pressure points identified"

  const secondaryChallenges = highDims
    .filter((d) => d.dimension !== highest?.dimension)
    .map((d) => `${d.dimension.replace(/-/g, " ")} is elevated`)

  const strategies: PathwayStrategy[] = [
    { title: "Sit With What You've Learned", description: "You just spent time being deeply honest with yourself. That takes courage. Before rushing to fix anything, let yourself absorb what you've noticed. Awareness itself is the first intervention.", timeframe: "today" },
    { title: "Choose One Thing", description: "From everything you've reflected on, what's the ONE pattern that costs you the most energy? Not the biggest problem — the one where a small change would give you the most relief. Start there.", timeframe: "this-week" },
    { title: "Talk to Your Coach", description: "Your AI Coach now has context about these patterns. Ask it for specific strategies tailored to what you've shared. It can go deeper than generic advice because it knows YOUR picture.", timeframe: "today" },
  ]

  const script: PathwayScript = {
    title: "The Self-Acknowledgment Script",
    context: "After completing a reflection and feeling the weight of what you've seen:",
    words: "I just looked honestly at something hard. That took courage. I don't have to fix everything today. I just have to know what I'm working with. And now I do. That's not nothing — that's the beginning.",
  }

  return {
    patternTitle,
    patternDescription,
    primaryChallenge,
    secondaryChallenges,
    strategies,
    script,
    connectionToSnapshot: null,
    nextPathwaySuggestion: null,
  }
}

// ============================================================
// Main export — generates results for any pathway
// ============================================================

import { EXECUTIVE_FUNCTION_SECTIONS } from "./pathways/executive-function"
import { DEPLETION_BURNOUT_SECTIONS } from "./pathways/depletion-burnout"
import { SENSORY_OVERWHELM_SECTIONS } from "./pathways/sensory-overwhelm"
import { SYSTEMIC_LOAD_SECTIONS } from "./pathways/systemic-load"
import { HORMONAL_PATTERNS_SECTIONS } from "./pathways/hormonal-patterns"
import { SLEEP_RECOVERY_SECTIONS } from "./pathways/sleep-recovery"
import { TRAUMA_NERVOUS_SYSTEM_SECTIONS } from "./pathways/trauma-nervous-system"
import {
  generateSystemicLoadResults,
  generateHormonalResults,
  generateSleepResults,
  generateTraumaResults,
} from "./pathway-results-custom"

const SECTIONS_MAP: Record<string, AssessmentSection[]> = {
  "executive-function": EXECUTIVE_FUNCTION_SECTIONS,
  "depletion-burnout": DEPLETION_BURNOUT_SECTIONS,
  "sensory-overwhelm": SENSORY_OVERWHELM_SECTIONS,
  "systemic-load": SYSTEMIC_LOAD_SECTIONS,
  "hormonal-patterns": HORMONAL_PATTERNS_SECTIONS,
  "sleep-recovery": SLEEP_RECOVERY_SECTIONS,
  "trauma-nervous-system": TRAUMA_NERVOUS_SYSTEM_SECTIONS,
}

export function generatePathwayResults(
  pathwayId: string,
  answers: Record<string, string>
): PathwayInsight | null {
  const sections = SECTIONS_MAP[pathwayId]
  if (!sections) return null

  const dims = scoreSections(sections, answers)

  switch (pathwayId) {
    case "executive-function":
      return generateExecutiveFunctionResults(dims, answers)
    case "depletion-burnout":
      return generateDepletionResults(dims, answers)
    case "sensory-overwhelm":
      return generateSensoryResults(dims, answers)
    case "systemic-load":
      return generateSystemicLoadResults(dims, answers)
    case "hormonal-patterns":
      return generateHormonalResults(dims, answers)
    case "sleep-recovery":
      return generateSleepResults(dims, answers)
    case "trauma-nervous-system":
      return generateTraumaResults(dims, answers)
    default:
      return generateGenericResults(pathwayId, dims)
  }
}
