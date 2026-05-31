// ============================================================
// Custom Pathway Results: Systemic Load, Hormonal, Sleep, Trauma
// ============================================================

import type { AssessmentSection } from "./types"

interface DimScore {
  dimension: string
  score: number
  maxScore: number
  intensity: "low" | "moderate" | "high" | "critical"
}

interface PathwayStrategy {
  title: string
  description: string
  timeframe: "today" | "this-week" | "this-month"
}

interface PathwayScript {
  title: string
  context: string
  words: string
}

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

function getHighest(dims: DimScore[]): DimScore | null {
  if (dims.length === 0) return null
  return dims.reduce((a, b) => (a.score / a.maxScore > b.score / b.maxScore ? a : b))
}

function getHighDims(dims: DimScore[]): DimScore[] {
  return dims.filter((d) => d.intensity === "high" || d.intensity === "critical")
}

// ============================================================
// SYSTEMIC LOAD
// ============================================================

export function generateSystemicLoadResults(dims: DimScore[], answers: Record<string, string>): PathwayInsight {
  const highest = getHighest(dims)
  const highDims = getHighDims(dims)

  let patternTitle = ""
  let patternDescription = ""
  let primaryChallenge = ""

  if (highest?.dimension === "mental-load") {
    patternTitle = "The Invisible Weight"
    patternDescription = "You're carrying the entire cognitive infrastructure of your family — every appointment, every preference, every upcoming deadline, every emotional need. No one sees this work. No one shares it. And the weight of tracking everything for everyone is crushing you slowly, invisibly, from the inside."
    primaryChallenge = "You hold the mental load alone — the remembering, anticipating, and planning that no one else does"
  } else if (highest?.dimension === "division-of-labor") {
    patternTitle = "The Unequal Partnership"
    patternDescription = "The division of labor in your home isn't working. You're doing more — physically, logistically, emotionally — and the imbalance is breeding resentment. This isn't about keeping score. It's about sustainability. What you're carrying isn't designed for one person."
    primaryChallenge = "The labor split is unsustainable — you're doing the work of two people"
  } else if (highest?.dimension === "support-systems") {
    patternTitle = "Alone in This"
    patternDescription = "You don't have the support network that makes motherhood survivable. Whether it's geographic isolation, relationship breakdown, or simply never having built the village — you're doing this without backup. That's not a personal failing. Humans weren't designed to parent in isolation. The system failed you."
    primaryChallenge = "You lack meaningful support — there's no one to catch you when you fall"
  } else if (highest?.dimension === "structural-barriers") {
    patternTitle = "The System Wasn't Built for You"
    patternDescription = "School schedules assume a stay-at-home parent. Healthcare assumes flexibility. Workplaces assume childcare is handled. The structures around you weren't designed for your reality — and you're exhausting yourself trying to fit into a shape that doesn't accommodate your life."
    primaryChallenge = "Structural barriers — the systems around you actively make your life harder"
  } else {
    patternTitle = "Holding Steady"
    patternDescription = "Your support systems and structures are functional. You have people, you have some balance, and the systems around you aren't actively fighting you. That's not nothing — protect it."
    primaryChallenge = "Maintaining the support and structure you have"
  }

  const secondaryChallenges = highDims
    .filter((d) => d.dimension !== highest?.dimension)
    .map((d) => {
      switch (d.dimension) {
        case "mental-load": return "You hold the entire family's cognitive load alone"
        case "division-of-labor": return "Physical and logistical labor is heavily skewed toward you"
        case "support-systems": return "You lack people who genuinely help"
        case "structural-barriers": return "External systems create constant friction"
        default: return ""
      }
    }).filter(Boolean)

  let strategies: PathwayStrategy[] = []

  if (highest?.dimension === "mental-load") {
    strategies = [
      { title: "Make the Invisible Visible", description: "This week, write down EVERYTHING you track mentally for your family. Every appointment, meal plan, birthday, permission slip, emotional need. Don't organize it — just dump it. Then show it to your partner or support person. They cannot share what they cannot see. This list is your evidence.", timeframe: "this-week" },
      { title: "Transfer Ownership, Not Tasks", description: "Don't ask for 'help' — that keeps you as manager. Transfer OWNERSHIP of entire domains: 'You now own bedtime. That means teeth, stories, lights out. I will not remind you or check.' The key word is OWN. Not 'help with.' Own.", timeframe: "this-week" },
      { title: "Drop One Thing Entirely", description: "Choose one thing you're going to STOP doing. Not delegate — stop. Maybe it's ironing. Maybe it's homemade lunches every day. Maybe it's volunteering at school. Something has to give, and you get to choose what. The world will not end.", timeframe: "today" },
    ]
  } else if (highest?.dimension === "division-of-labor") {
    strategies = [
      { title: "The Fair Play Conversation", description: "Sit down with your partner when you're both calm (not mid-resentment). Say: 'I need us to look at who does what in this house — not to blame, but because the current split isn't sustainable for me. I'm burning out and I need this to change.' Be specific about what you need to shift.", timeframe: "this-week" },
      { title: "Accept Imperfect Execution", description: "When your partner does something differently than you would — let it stand. Done imperfectly by someone else is better than done perfectly by you while you're drowning. Resist the urge to redo, correct, or manage. Let go of the standard.", timeframe: "today" },
      { title: "Stop Being the Default", description: "Change the school's emergency contact to your partner for one child. Let them handle the next sick day. Stop intercepting — let the natural consequences of shared responsibility land on both of you, not just you.", timeframe: "this-month" },
    ]
  } else if (highest?.dimension === "support-systems") {
    strategies = [
      { title: "One Honest Text", description: "Today, text one person — a friend, a neighbor, a family member — and say something real: 'I'm having a hard time and I could use some support.' Not a performance of being fine. One honest sentence. Most people want to help but don't know you need it.", timeframe: "today" },
      { title: "Build Mutual Aid", description: "Find one other parent and propose a swap: 'I'll take your kids Tuesday afternoon if you take mine Thursday.' This isn't asking for charity — it's building infrastructure. Start with one family. Expand from there.", timeframe: "this-week" },
      { title: "Lower the Bar for Connection", description: "You don't need a best friend who understands everything. You need one person who can pick up your kid in an emergency. One person you can text at 10pm. One person who doesn't judge your messy house. Start there. Deep friendship can come later.", timeframe: "this-month" },
    ]
  } else {
    strategies = [
      { title: "Stop Blaming Yourself for Structural Problems", description: "If the school schedule doesn't work for your family, that's not your failure as a mother. If you can't afford childcare, that's not laziness. Name the structural barrier clearly: 'This system wasn't designed for families like mine.' That's not an excuse — it's accurate.", timeframe: "today" },
      { title: "Find the Workaround", description: "You can't change the system overnight. But you can find the cracks: the neighbor who does school pickup, the employer who allows flexibility, the community resource you haven't tapped. One workaround this week that reduces friction.", timeframe: "this-week" },
      { title: "Advocate Where You Can", description: "If you have any capacity: email the school about their communication method. Ask your employer about flexibility. Join a parent group pushing for change. You don't have to fix the system alone — but naming the problem out loud is the first step.", timeframe: "this-month" },
    ]
  }

  const script: PathwayScript = highest?.dimension === "mental-load" || highest?.dimension === "division-of-labor"
    ? { title: "The Load Conversation Script", context: "When you need to talk to your partner about the imbalance:", words: "I need to show you something. I wrote down everything I'm tracking for our family this week. I'm not saying you don't contribute — I'm saying the REMEMBERING part is crushing me. Can we look at this together and figure out what you can fully own? Not help with. Own." }
    : { title: "The Asking-for-Help Script", context: "When you need to reach out to someone:", words: "Hey, I'm going to be honest — I'm struggling more than I've been letting on. I don't need you to fix anything. But I could really use [specific thing: someone to pick up the kids Tuesday / someone to talk to / someone to just sit with me]. Would that be possible?" }

  let connectionToSnapshot: string | null = null
  try {
    const mapData = localStorage.getItem("mindful-mama-pattern-map")
    if (mapData) {
      const map = JSON.parse(mapData)
      const identity = map.dimensions?.find((d: any) => d.dimension === "identity-erosion")
      const system = map.dimensions?.find((d: any) => d.dimension === "system-friction")
      if (identity?.intensity === "high" || identity?.intensity === "critical") {
        connectionToSnapshot = "Your check-in showed significant identity erosion — you're losing yourself in the role. This pathway reveals why: when the system demands everything from you and gives nothing back, there's no space left for the person underneath 'mom.' Changing the structure isn't selfish — it's how you survive."
      } else if (system?.intensity === "high" || system?.intensity === "critical") {
        connectionToSnapshot = "Your check-in flagged high system friction — daily life fighting you. This pathway shows the root: it's not that you can't keep up. It's that the support structure around you has gaps that no amount of personal effort can fill. The fix is structural, not personal."
      }
    }
  } catch {}

  const nextPathwaySuggestion = highest?.dimension === "support-systems"
    ? { slug: "trauma-nervous-system", title: "Trauma & Nervous System", reason: "Difficulty asking for help or accepting support often has roots in early experiences. If reaching out feels dangerous rather than just uncomfortable, this pathway explores why." }
    : { slug: "depletion-burnout", title: "Depletion & Burnout", reason: "Carrying an unsustainable load leads directly to burnout. Understanding how depleted you actually are helps you make the case — to yourself and others — that something must change." }

  return { patternTitle, patternDescription, primaryChallenge, secondaryChallenges, strategies, script, connectionToSnapshot, nextPathwaySuggestion }
}

// ============================================================
// HORMONAL PATTERNS
// ============================================================

export function generateHormonalResults(dims: DimScore[], answers: Record<string, string>): PathwayInsight {
  const highest = getHighest(dims)
  const highDims = getHighDims(dims)

  let patternTitle = ""
  let patternDescription = ""
  let primaryChallenge = ""

  if (highest?.dimension === "hormonal-impact") {
    patternTitle = "Your Hormones Are Running the Show"
    patternDescription = "The shifts in your mood, energy, and cognitive function aren't random — they're hormonally driven. Estrogen directly affects dopamine production, which means your executive function, emotional regulation, and motivation literally change with your cycle. You're not inconsistent. You're cyclical."
    primaryChallenge = "Hormonal shifts dramatically alter your capacity — you're a different person at different phases"
  } else if (highest?.dimension === "cycle-awareness") {
    patternTitle = "The Pattern You Haven't Named"
    patternDescription = "You've noticed that some weeks are inexplicably harder than others. Good weeks where you feel capable, followed by weeks where everything falls apart. This isn't random. It's likely tied to your hormonal cycle — and naming that pattern is the first step to working with it instead of being blindsided by it."
    primaryChallenge = "You experience dramatic capacity shifts but haven't connected them to your cycle"
  } else if (highest?.dimension === "life-stage") {
    patternTitle = "A Hormonal Transition Is Reshaping You"
    patternDescription = "Whether it's postpartum, perimenopause, or another hormonal shift — your brain chemistry has changed. The person you were before this transition had different neurochemistry. You're not failing to be who you used to be. You're adapting to a brain that's running on different fuel."
    primaryChallenge = "A life-stage hormonal shift has changed how your brain and body function"
  } else if (highest?.dimension === "planning-around-cycle") {
    patternTitle = "Fighting Your Cycle Instead of Flowing With It"
    patternDescription = "You're pushing through at the same pace regardless of where you are hormonally — and crashing when your body can't keep up. The fix isn't more willpower during hard phases. It's restructuring your expectations to match your actual capacity at each phase."
    primaryChallenge = "You're not adapting your life to your cyclical capacity — and paying for it"
  } else {
    patternTitle = "Hormonally Stable"
    patternDescription = "Your hormonal patterns aren't a primary driver of your struggles right now. Your capacity is relatively consistent across your cycle, which means other factors are more likely driving your overwhelm."
    primaryChallenge = "Hormones aren't your primary challenge — look to other pathways"
  }

  const secondaryChallenges = highDims
    .filter((d) => d.dimension !== highest?.dimension)
    .map((d) => {
      switch (d.dimension) {
        case "hormonal-impact": return "Mood, energy, and cognition shift dramatically with hormones"
        case "cycle-awareness": return "Capacity fluctuates in patterns you haven't fully mapped"
        case "life-stage": return "A hormonal life transition is affecting your functioning"
        case "planning-around-cycle": return "You're not adapting expectations to cyclical changes"
        default: return ""
      }
    }).filter(Boolean)

  let strategies: PathwayStrategy[] = []

  if (highest?.dimension === "hormonal-impact" || highest?.dimension === "cycle-awareness") {
    strategies = [
      { title: "Track for One Month — Just Notice", description: "For the next 30 days, rate your energy, mood, and cognitive function 1-10 each morning. Note your cycle day. Don't try to change anything — just observe. After one month, you'll see the pattern clearly. That pattern is your roadmap.", timeframe: "today" },
      { title: "Name Your Phases", description: "Most women have 2-4 distinct phases of capacity. Give yours names that mean something to you: 'Power Week,' 'Coasting Week,' 'Gentle Week,' 'Survival Week.' When you can name the phase, you can plan for it instead of being ambushed.", timeframe: "this-month" },
      { title: "Front-Load Your Power Phase", description: "Once you know your high-capacity days, schedule demanding tasks there: appointments, meal prep, big conversations, admin batches. Protect your low-capacity days with lighter expectations. You're not doing less overall — you're doing the right things at the right time.", timeframe: "this-month" },
    ]
  } else if (highest?.dimension === "life-stage") {
    strategies = [
      { title: "Grieve Who You Were", description: "If your brain changed after a baby, during perimenopause, or through another transition — you're allowed to grieve the person you were before. That grief is valid. AND you can build a new relationship with who you are now. Both things are true.", timeframe: "today" },
      { title: "Talk to Your Doctor — With Specifics", description: "Say exactly this: 'My cognitive function and emotional regulation have changed significantly since [event]. I want to explore whether hormonal factors are contributing and what my options are.' Don't let them dismiss you with 'that's normal.' Bring your tracking data.", timeframe: "this-week" },
      { title: "Adjust Your Baseline", description: "Stop measuring yourself against pre-transition you. Your capacity has changed — temporarily or permanently. Build your systems, expectations, and self-talk around your CURRENT capacity, not the one you remember having.", timeframe: "today" },
    ]
  } else {
    strategies = [
      { title: "Build a Cyclical Schedule", description: "Instead of the same expectations every week, create 2-3 versions of your week: a full-capacity version, a reduced version, and a bare-minimum version. Check in with your body each Monday and choose which version you're running this week.", timeframe: "this-week" },
      { title: "Communicate Your Cycle to Your Partner", description: "Say: 'I've noticed my capacity drops significantly around [time]. During those days, I need you to expect less from me and step up more. This isn't optional — it's how my body works.' Give them advance notice so they can plan too.", timeframe: "this-week" },
      { title: "Pre-Build for Hard Phases", description: "During your high-capacity phase, prep for your low phase: batch cook, pre-write responses to school emails, lay out clothes for the week. Your future depleted self will thank your current capable self.", timeframe: "this-month" },
    ]
  }

  const script: PathwayScript = highest?.dimension === "life-stage"
    ? { title: "The Doctor Advocacy Script", context: "When you need to be taken seriously about hormonal changes:", words: "I need you to hear me. My cognitive function has changed significantly since [event]. I'm not stressed — I'm impaired in ways I wasn't before. I want to explore hormonal factors, not be told this is normal motherhood. What testing or treatment options are available?" }
    : { title: "The Self-Compassion Script", context: "When you're in a low-capacity phase and the shame hits:", words: "This is my body doing what it does. I'm not lazy. I'm not broken. I'm in a low phase and it will pass. I'm going to lower my expectations for the next few days and stop punishing myself for being cyclical. That's biology, not failure." }

  let connectionToSnapshot: string | null = null
  try {
    const mapData = localStorage.getItem("mindful-mama-pattern-map")
    if (mapData) {
      const map = JSON.parse(mapData)
      const physical = map.dimensions?.find((d: any) => d.dimension === "physical-depletion")
      const emotional = map.dimensions?.find((d: any) => d.dimension === "emotional-bandwidth")
      if (physical?.intensity === "high" || emotional?.intensity === "high") {
        connectionToSnapshot = "Your check-in showed significant physical depletion and/or emotional strain. This pathway suggests a hormonal component — meaning some of that depletion isn't constant, it's cyclical. If you can identify WHEN you crash, you can build protection around those windows instead of white-knuckling through them."
      }
    }
  } catch {}

  const nextPathwaySuggestion = { slug: "sleep-recovery", title: "Sleep & Recovery", reason: "Hormonal shifts directly affect sleep quality. If your worst phases also coincide with terrible sleep, addressing the sleep component may reduce the severity of hormonal crashes." }

  return { patternTitle, patternDescription, primaryChallenge, secondaryChallenges, strategies, script, connectionToSnapshot, nextPathwaySuggestion }
}

// ============================================================
// SLEEP & RECOVERY
// ============================================================

export function generateSleepResults(dims: DimScore[], answers: Record<string, string>): PathwayInsight {
  const highest = getHighest(dims)
  const highDims = getHighDims(dims)

  let patternTitle = ""
  let patternDescription = ""
  let primaryChallenge = ""

  if (highest?.dimension === "sleep-disruption") {
    patternTitle = "You Haven't Slept Through in Years"
    patternDescription = "Your sleep is being interrupted by forces outside your control — children waking, being the default nighttime parent, a body that can't resettle after disruption. This isn't a habit problem. It's a circumstance problem. And the cumulative effect of years of fragmented sleep is devastating to every other system in your body and brain."
    primaryChallenge = "External sleep disruption — you're woken repeatedly and can't recover"
  } else if (highest?.dimension === "sleep-quality") {
    patternTitle = "Your Brain Won't Let You Sleep"
    patternDescription = "Even when the house is quiet and the kids are down, your mind races. To-do lists, worry spirals, replaying the day, planning tomorrow. Your body is exhausted but your brain won't power down. This is your nervous system stuck in 'on' mode — it doesn't feel safe enough to let go."
    primaryChallenge = "Internal sleep disruption — racing thoughts, anxiety, inability to settle"
  } else if (highest?.dimension === "daytime-impact") {
    patternTitle = "Sleep Deprivation Is Driving Everything"
    patternDescription = "Here's what most people don't realize: chronic sleep deprivation mimics ADHD. It impairs working memory, emotional regulation, impulse control, and task initiation. Some of what you're attributing to 'being broken' may actually be your brain running on insufficient rest. This is potentially your highest-leverage intervention."
    primaryChallenge = "Sleep deprivation is impairing your cognitive and emotional function daily"
  } else if (highest?.dimension === "sleep-habits") {
    patternTitle = "Revenge Bedtime Procrastination"
    patternDescription = "You stay up too late — not because you're not tired, but because nighttime is the only time that's YOURS. After a day of being needed by everyone, those quiet hours after bedtime feel like the only space where you exist as a person. You're trading sleep for identity. That's not laziness — it's a symptom of having no daytime autonomy."
    primaryChallenge = "You sacrifice sleep for the only alone time you get"
  } else {
    patternTitle = "Sleep Is Holding"
    patternDescription = "Your sleep isn't perfect, but it's not your primary driver of overwhelm. You're getting enough rest to function, which means your other challenges are coming from somewhere else. That's useful information."
    primaryChallenge = "Sleep isn't your main issue — other factors are driving your overwhelm"
  }

  const secondaryChallenges = highDims
    .filter((d) => d.dimension !== highest?.dimension)
    .map((d) => {
      switch (d.dimension) {
        case "sleep-quality": return "Your mind races when you try to sleep"
        case "sleep-disruption": return "You're woken frequently by children or circumstances"
        case "sleep-habits": return "You stay up too late reclaiming alone time"
        case "daytime-impact": return "Sleep deprivation is visibly impairing your daily function"
        default: return ""
      }
    }).filter(Boolean)

  let strategies: PathwayStrategy[] = []

  if (highest?.dimension === "sleep-disruption") {
    strategies = [
      { title: "Split the Night", description: "If you have a partner: divide the night in half. One person is 'on' from 8pm-2am, the other from 2am-7am. During your off shift, you sleep in a separate room with earplugs. You will feel guilty. Do it anyway. One parent sleeping means one parent functioning tomorrow.", timeframe: "this-week" },
      { title: "Lower the Response Bar", description: "Not every child wake-up requires full intervention. A toddler fussing for 2 minutes may resettle. A child calling out once may fall back asleep. Give it 60 seconds before you respond. You're not neglecting them — you're giving them a chance to self-settle.", timeframe: "today" },
      { title: "Protect One Unbroken Stretch", description: "Even if you can't get a full night, fight for one 4-hour unbroken stretch. That's one full sleep cycle. Your brain needs at least one complete cycle to do its repair work. Four unbroken hours is worth more than eight fragmented ones.", timeframe: "this-week" },
    ]
  } else if (highest?.dimension === "sleep-quality") {
    strategies = [
      { title: "The Brain Dump Before Bed", description: "Keep a notebook by your bed. Before lights out, spend 3 minutes writing down everything your brain is trying to hold: tomorrow's tasks, worries, things you forgot today. Get it OUT of your head and onto paper. Your brain can let go of what's been captured externally.", timeframe: "today" },
      { title: "The 'Worry Window'", description: "Give yourself 10 minutes earlier in the evening — not at bedtime — to worry intentionally. Set a timer. Worry hard. When the timer goes off, say: 'I've done my worrying for today. Anything else can wait until tomorrow's window.' This sounds absurd. It works.", timeframe: "today" },
      { title: "Cool, Dark, Boring", description: "Make your bedroom a sleep cave: cool temperature, blackout curtains, no screens for 30 minutes before bed. Your nervous system needs environmental cues that it's safe to power down. Bright screens and warm rooms tell your brain to stay alert.", timeframe: "this-week" },
    ]
  } else if (highest?.dimension === "sleep-habits") {
    strategies = [
      { title: "Name What You're Actually Doing", description: "You're not 'staying up too late.' You're reclaiming the only time that belongs to you. That's valid. AND it's costing you. Both things are true. The fix isn't 'just go to bed earlier' — it's finding daytime moments that are yours so nighttime doesn't have to carry all of it.", timeframe: "today" },
      { title: "The 10:30 Rule", description: "Set an alarm for 10:30pm (or whatever gives you 7-8 hours before wake-up). When it goes off, you have 15 minutes to wrap up. Not negotiable. Not 'one more episode.' Your future morning self is begging your current nighttime self for this boundary.", timeframe: "today" },
      { title: "Claim 20 Minutes During the Day", description: "Find 20 minutes during daylight hours that are YOURS. Not productive time — identity time. Read, walk, sit in silence, draw, listen to music. If nighttime is the only time you exist as a person, you'll keep sacrificing sleep for it. Give yourself daytime existence.", timeframe: "this-week" },
    ]
  } else {
    strategies = [
      { title: "Protect What's Working", description: "Your sleep is functional — don't take it for granted. When life gets harder, sleep is usually the first thing sacrificed. Guard it like the foundation it is.", timeframe: "today" },
      { title: "Notice Sleep-Mood Connections", description: "Track for one week: rate your sleep quality and your next-day mood/function. See the correlation clearly. This data helps you prioritize sleep when other things compete for the time.", timeframe: "this-week" },
      { title: "Build a Wind-Down Signal", description: "Create a consistent 15-minute pre-sleep routine that tells your body it's time. Same sequence every night: dim lights, wash face, 5 minutes of reading. Consistency builds the neural pathway that makes falling asleep easier over time.", timeframe: "this-week" },
    ]
  }

  const script: PathwayScript = highest?.dimension === "sleep-habits"
    ? { title: "The Self-Negotiation Script", context: "When it's 11pm and you don't want to go to bed:", words: "I hear you. This time feels like yours and you don't want to give it up. But tomorrow-me is going to pay for this. I'm going to give myself 10 more minutes, then I'm going to bed — because being a functional human tomorrow is worth more than this episode of TV tonight." }
    : highest?.dimension === "sleep-disruption"
    ? { title: "The Partner Night-Shift Script", context: "When you need to ask your partner to take nights:", words: "I need to talk about nights. I haven't slept through in [time period] and it's affecting my ability to function and parent safely during the day. I need us to split the night so I can get one unbroken stretch. This isn't optional anymore — it's a health issue." }
    : { title: "The Racing-Mind Script", context: "When your brain won't stop at bedtime:", words: "I notice my mind is racing. That's my brain trying to solve tomorrow's problems tonight. I'm going to write these thoughts down so they're captured, and then I'm going to let them go until morning. They'll still be there tomorrow. I don't have to solve them now." }

  let connectionToSnapshot: string | null = null
  try {
    const mapData = localStorage.getItem("mindful-mama-pattern-map")
    if (mapData) {
      const map = JSON.parse(mapData)
      const cogLoad = map.dimensions?.find((d: any) => d.dimension === "cognitive-load")
      const physical = map.dimensions?.find((d: any) => d.dimension === "physical-depletion")
      if (cogLoad?.intensity === "high" || cogLoad?.intensity === "critical") {
        connectionToSnapshot = "Your check-in showed high cognitive load — forgetfulness, mental fog, inability to plan. This pathway reveals a likely amplifier: sleep deprivation directly impairs working memory and executive function. Some of your 'brain problems' may actually be sleep problems wearing a cognitive mask."
      } else if (physical?.intensity === "critical") {
        connectionToSnapshot = "Your check-in flagged critical physical depletion. This pathway confirms the mechanism: your body isn't getting the rest it needs to repair. Until sleep improves, no amount of strategies for other areas will fully land — your brain literally can't implement them on this little rest."
      }
    }
  } catch {}

  const nextPathwaySuggestion = highest?.dimension === "sleep-quality"
    ? { slug: "trauma-nervous-system", title: "Trauma & Nervous System", reason: "A brain that won't power down often has a nervous system stuck in vigilance mode. If your body doesn't feel safe enough to sleep, this pathway explores why." }
    : { slug: "executive-function", title: "Executive Function & Daily Life", reason: "Sleep deprivation mimics ADHD. Once you understand your sleep pattern, exploring executive function will help you see which cognitive challenges are sleep-driven and which are structural." }

  return { patternTitle, patternDescription, primaryChallenge, secondaryChallenges, strategies, script, connectionToSnapshot, nextPathwaySuggestion }
}

// ============================================================
// TRAUMA & NERVOUS SYSTEM
// ============================================================

export function generateTraumaResults(dims: DimScore[], answers: Record<string, string>): PathwayInsight {
  const highest = getHighest(dims)
  const highDims = getHighDims(dims)

  let patternTitle = ""
  let patternDescription = ""
  let primaryChallenge = ""

  if (highest?.dimension === "nervous-system-state") {
    patternTitle = "Your Body Is Still Protecting You"
    patternDescription = "Your nervous system is stuck in a protective state — hypervigilant, braced, scanning for danger even when you're safe. This isn't anxiety about a specific thing. It's a baseline state your body learned when safety wasn't guaranteed. It served you then. It's exhausting you now. And it's not something you can think your way out of — it lives in your body, not your mind."
    primaryChallenge = "Your nervous system is stuck in survival mode — always alert, never at rest"
  } else if (highest?.dimension === "childhood-patterns") {
    patternTitle = "The Patterns You Inherited"
    patternDescription = "You're hearing your parent's voice come out of your mouth. You're repeating dynamics you swore you'd never repeat. This isn't because you're a bad mother — it's because under stress, your brain defaults to the templates it was given in childhood. You're parenting from a blueprint you never chose. Rewriting it is possible, but it requires more than willpower."
    primaryChallenge = "Childhood patterns are showing up in your parenting — especially under stress"
  } else if (highest?.dimension === "protective-patterns") {
    patternTitle = "Survival Strategies Still Running"
    patternDescription = "You learned early that safety comes from being useful, being perfect, being invisible, or never needing anything. Those strategies kept you alive then. Now they're driving you to over-function, people-please, refuse help, and burn out — because your nervous system still believes that stopping is dangerous. These aren't personality traits. They're adaptations."
    primaryChallenge = "Over-functioning, people-pleasing, or inability to rest — survival patterns running on autopilot"
  } else if (highest?.dimension === "healing-readiness") {
    patternTitle = "Seeing It for the First Time"
    patternDescription = "You're beginning to connect your current struggles to your past. That's not a small thing — it's the beginning of a different relationship with yourself. You don't have to do anything with this awareness right now. Just letting it land, without rushing to fix it, is enough for today."
    primaryChallenge = "You're newly aware of these connections and may not have support to process them"
  } else {
    patternTitle = "A Regulated Foundation"
    patternDescription = "Your nervous system feels relatively safe. You're not operating from survival mode, which means you have access to your full capacity for presence, patience, and connection with your children. That's a genuine strength — one that many mothers are fighting to access."
    primaryChallenge = "Your nervous system is stable — other factors are driving your challenges"
  }

  const secondaryChallenges = highDims
    .filter((d) => d.dimension !== highest?.dimension)
    .map((d) => {
      switch (d.dimension) {
        case "nervous-system-state": return "Your body is stuck in hypervigilance or survival mode"
        case "childhood-patterns": return "You're repeating patterns from your own upbringing"
        case "protective-patterns": return "Over-functioning and inability to rest are running on autopilot"
        case "healing-readiness": return "You're newly seeing these connections without support"
        default: return ""
      }
    }).filter(Boolean)

  let strategies: PathwayStrategy[] = []

  if (highest?.dimension === "nervous-system-state") {
    strategies = [
      { title: "Orienting — Right Now", description: "When your body feels activated (tight chest, racing heart, scanning for danger), try this: Look around the room. Name 5 things you can see. Touch something with texture. Feel your feet on the floor. This tells your nervous system: 'I am HERE. I am NOW. I am safe in this moment.' It sounds too simple. It works because it speaks your body's language.", timeframe: "today" },
      { title: "The 'Safe Enough' Practice", description: "Your nervous system doesn't need to feel perfectly safe — just safe ENOUGH. Each day, find one moment where you can say: 'Right now, in this exact moment, nothing bad is happening.' Not forever. Just right now. Train your body to recognize moments of safety. It's forgotten how.", timeframe: "today" },
      { title: "Consider Somatic Support", description: "A nervous system stuck in survival mode often can't be talked out of it — it needs body-based work. Look into: somatic experiencing therapy, EMDR, or a trauma-informed yoga class. Your body holds what your mind has processed. It needs its own kind of support.", timeframe: "this-month" },
    ]
  } else if (highest?.dimension === "childhood-patterns") {
    strategies = [
      { title: "The Pause Between Trigger and Response", description: "When you feel yourself about to react from the old pattern — yelling, withdrawing, shaming — try to insert a 3-second pause. Just 3 seconds. In that pause, ask: 'Is this ME responding, or is this my mother/father responding through me?' You won't always catch it. But each time you do, you're building a new neural pathway.", timeframe: "today" },
      { title: "Repair Is the Antidote", description: "You will repeat patterns sometimes. That's not failure — it's human. What breaks the cycle isn't perfection. It's repair. When you catch yourself in the old pattern, go back to your child and say: 'I didn't handle that well. That wasn't about you. I'm working on doing better.' Your parents never did that. You can.", timeframe: "today" },
      { title: "Name the Voice", description: "When your inner critic sounds like your parent — 'You're just like your mother' or 'You're ruining your kids' — name it. 'That's my mother's voice, not mine. That's the old story, not the truth.' Externalizing the inherited voice creates distance between you and the pattern.", timeframe: "today" },
    ]
  } else if (highest?.dimension === "protective-patterns") {
    strategies = [
      { title: "One Tiny Boundary This Week", description: "Your survival strategy says: 'If I stop being useful, I won't be loved.' Test that belief with the smallest possible boundary. Say no to one small thing. Let one ball drop intentionally. See what actually happens. Usually: nothing catastrophic. Your nervous system needs evidence that stopping isn't dangerous.", timeframe: "this-week" },
      { title: "Practice Receiving", description: "The next time someone offers help — even small help — say yes. Don't deflect. Don't say 'I'm fine.' Just: 'Yes, thank you.' Notice what happens in your body. If receiving feels uncomfortable or wrong, that's the survival pattern talking. It's not truth — it's programming.", timeframe: "today" },
      { title: "Rest as Rebellion", description: "If your nervous system believes rest is dangerous, then resting IS the healing work. Sit down for 5 minutes with nothing to do. Notice the urge to get up, to be productive, to earn your existence. Don't obey it. Just notice it. You're retraining your body that you're allowed to exist without performing.", timeframe: "today" },
    ]
  } else {
    strategies = [
      { title: "Honor What You've Seen", description: "You've just connected dots between your past and your present. That's significant. Don't rush to 'fix' it. Let the awareness settle. Journal about it if that helps. Talk to someone safe. The understanding itself is the first step.", timeframe: "today" },
      { title: "Find Trauma-Informed Support", description: "Look for a therapist who specializes in: developmental trauma, attachment, EMDR, IFS (Internal Family Systems), or somatic experiencing. General therapists who say 'just set boundaries' won't reach this. You need someone who understands that your body holds the story.", timeframe: "this-month" },
      { title: "Be Gentle With Yourself", description: "You've been surviving with these patterns for decades. They kept you alive. You don't have to be angry at them or ashamed of them. You can thank them for their service AND choose to build new ones. Both things are true.", timeframe: "today" },
    ]
  }

  const script: PathwayScript = highest?.dimension === "childhood-patterns"
    ? { title: "The Repair Script (After Repeating a Pattern)", context: "When you've just reacted from the old blueprint and need to reconnect with your child:", words: "Hey, I want to talk about what just happened. I reacted in a way that wasn't fair to you. That was my old stuff — not about you. You didn't deserve that. I'm working on it, and I'm sorry. Can we start this moment over?" }
    : highest?.dimension === "protective-patterns"
    ? { title: "The Permission Script", context: "When your body is screaming at you to keep going, keep giving, keep performing:", words: "I am allowed to stop. I am allowed to need things. I am allowed to take up space without earning it. My worth is not measured by my usefulness. I can rest and still be loved. I can say no and still be good." }
    : { title: "The Grounding Script", context: "When your nervous system is activated and you need to come back to the present:", words: "I am safe right now. My body is remembering something old, but I am here, now, in this room. I can feel my feet on the floor. I can hear [sound]. Nothing bad is happening in this exact moment. I can breathe." }

  let connectionToSnapshot: string | null = null
  try {
    const mapData = localStorage.getItem("mindful-mama-pattern-map")
    if (mapData) {
      const map = JSON.parse(mapData)
      const emotional = map.dimensions?.find((d: any) => d.dimension === "emotional-bandwidth")
      const identity = map.dimensions?.find((d: any) => d.dimension === "identity-erosion")
      if (emotional?.intensity === "critical") {
        connectionToSnapshot = "Your check-in showed critical emotional depletion. This pathway reveals a deeper layer: your nervous system may be burning through emotional resources just maintaining baseline safety. You're not 'too emotional' — you're running a survival program that was never meant to run this long."
      } else if (identity?.intensity === "high" || identity?.intensity === "critical") {
        connectionToSnapshot = "Your check-in showed significant identity erosion. This pathway suggests why: if your survival strategy is to be useful, needed, or invisible — there's no room for YOU in that equation. The identity loss isn't just from motherhood. It may be a pattern that started long before your children arrived."
      }
    }
  } catch {}

  const nextPathwaySuggestion = highest?.dimension === "nervous-system-state"
    ? { slug: "sensory-overwhelm", title: "Sensory & Overwhelm", reason: "A hypervigilant nervous system processes sensory input differently — everything feels louder, closer, more threatening. Understanding your sensory patterns alongside your nervous system state gives you the full picture." }
    : { slug: "depletion-burnout", title: "Depletion & Burnout", reason: "Running survival patterns is exhausting. If you're also depleted, the two feed each other — less energy means less capacity to override old patterns, which means more shame, which means more depletion." }

  return { patternTitle, patternDescription, primaryChallenge, secondaryChallenges, strategies, script, connectionToSnapshot, nextPathwaySuggestion }
}
