"use client"

import { Brain, Clock, Volume2, Heart, Layout, Lightbulb, Users, Calendar, MessageCircle, BookOpen, Zap, Shield, Star, FileText, Coffee } from "lucide-react"

interface QuestionOption {
  id: string
  label: string
  score: number
}

interface Question {
  id: number
  section: string
  question: string
  description: string
  options: QuestionOption[]
}

interface ResultsReportProps {
  answers: Record<number, string>
  questions: Question[]
}

// Sub-profile detection based on answer patterns
function detectSubProfiles(answers: Record<number, string>) {
  const profiles: Record<string, { subtype: string; title: string; description: string }> = {}

  // Morning Rush subtypes (questions 1-5)
  const morningAnswers = [answers[1], answers[2], answers[3], answers[4], answers[5]]
  if (answers[3] === "way-off" || answers[3] === "no-sense") {
    profiles["The Morning Rush Audit"] = {
      subtype: "time-blind",
      title: "The Time-Blind Rusher",
      description: "Your core morning challenge is time perception. You genuinely cannot feel time passing accurately, which means you consistently underestimate how long things take. This isn't poor planning — it's a neurological difference in how your brain processes temporal information.",
    }
  } else if (answers[2] === "emotional" || answers[4] === "cascade" || answers[4] === "freeze") {
    profiles["The Morning Rush Audit"] = {
      subtype: "emotional-cascader",
      title: "The Emotional Cascader",
      description: "Your mornings derail not because of logistics, but because of emotional dysregulation — yours or your children's. One disruption triggers a cascade that overwhelms your ability to recover and adapt in real time. Your nervous system needs a different kind of support than a checklist can provide.",
    }
  } else if (answers[2] === "remembering" || answers[5] === "often" || answers[5] === "almost-always") {
    profiles["The Morning Rush Audit"] = {
      subtype: "memory-overloader",
      title: "The Memory Overloader",
      description: "You're trying to hold too many moving pieces in working memory simultaneously — your readiness, their readiness, the checklist, the timeline. Your brain's RAM is maxed out before you even get to the door. The fix isn't remembering more — it's offloading everything to external systems.",
    }
  } else {
    profiles["The Morning Rush Audit"] = {
      subtype: "adapting",
      title: "The Morning Adapter",
      description: "You've found ways to navigate mornings that mostly work. Your systems aren't perfect, but they're functional. The strategies below will help you protect what's working and shore up the weak spots.",
    }
  }

  // Mental Load subtypes (questions 6-10)
  if (answers[9] === "solo" || answers[9] === "no-idea") {
    profiles["The Invisible Mental Load"] = {
      subtype: "solo-carrier",
      title: "The Solo Carrier",
      description: "You're carrying the entire cognitive weight of your family alone — or functionally alone. The mental load isn't just heavy; it's invisible to the people around you. This isolation compounds the difficulty exponentially because there's no one to catch what you drop.",
    }
  } else if (answers[7] === "often-gone" || answers[7] === "completely-gone" || answers[10] === "constantly") {
    profiles["The Invisible Mental Load"] = {
      subtype: "object-permanence",
      title: "The Object Permanence Struggler",
      description: "Your brain has a specific challenge with maintaining awareness of things that aren't directly in front of you. Tasks, appointments, and responsibilities literally cease to exist in your consciousness when they're not visible. This is one of the most misunderstood aspects of ADHD — it's not carelessness, it's how your prefrontal cortex processes information.",
    }
  } else if (answers[8] === "avoidance" || answers[8] === "drowning") {
    profiles["The Invisible Mental Load"] = {
      subtype: "admin-drowning",
      title: "The Admin Avoider",
      description: "The sheer volume of parenting administration — forms, emails, scheduling, planning — has become so overwhelming that avoidance has become your default. The pile grows, the shame grows with it, and starting feels more impossible each day. This is task paralysis, not laziness.",
    }
  } else {
    profiles["The Invisible Mental Load"] = {
      subtype: "managing",
      title: "The System Builder",
      description: "You've developed external systems that catch most of what your working memory can't hold. Your challenge now is maintaining these systems during high-stress periods and building redundancy so nothing critical falls through.",
    }
  }

  // Sensory Overload subtypes (questions 11-15)
  if (answers[12] === "uncomfortable" || answers[12] === "cant-bear") {
    profiles["Your Sensory Overload Profile"] = {
      subtype: "touched-out",
      title: "The Touched-Out Mom",
      description: "Physical contact — which should feel nurturing — has become a source of sensory overwhelm. By the end of the day, your skin crawls at the thought of another small body climbing on you. This is your nervous system hitting capacity, not a failure of maternal love. Your body is communicating a boundary that deserves respect.",
    }
  } else if (answers[13] === "agitating" || answers[13] === "unbearable") {
    profiles["Your Sensory Overload Profile"] = {
      subtype: "noise-sensitive",
      title: "The Noise-Sensitive Mom",
      description: "Sound is your primary sensory trigger. Your brain struggles to filter auditory input, which means every noise competes for attention at equal volume — the TV, the sibling argument, the question being asked, the dog barking. It builds until your nervous system hits a wall. This is auditory processing sensitivity, and it's incredibly common in ADHD.",
    }
  } else if (answers[14] === "depleted" || answers[14] === "guilt-spiral" || answers[15] === "avoid") {
    profiles["Your Sensory Overload Profile"] = {
      subtype: "total-depletion",
      title: "The Depleted Mom",
      description: "Your sensory battery drains faster than it can recharge. By evening, you have nothing left — and the guilt about that emptiness creates a secondary drain. You're not just tired; you're neurologically spent. Your brain has been processing at maximum capacity all day with no recovery windows.",
    }
  } else {
    profiles["Your Sensory Overload Profile"] = {
      subtype: "regulated",
      title: "The Sensory Manager",
      description: "You've developed awareness of your sensory limits and can mostly manage input before it overwhelms you. Your strategies below will help you maintain this regulation during particularly demanding periods.",
    }
  }

  // Shame & Repair subtypes (questions 16-20)
  if (answers[19] === "hide-most" || answers[19] === "total-mask") {
    profiles["The Shame & Repair Cycle"] = {
      subtype: "silent-masker",
      title: "The Silent Masker",
      description: "You're performing 'together' for the outside world while falling apart internally. The energy required to maintain this mask is enormous — and it means you have no one to turn to when things get hard. Isolation amplifies shame. Shame reinforces isolation. Breaking this cycle starts with one safe person.",
    }
  } else if (answers[20] === "inadequate" || answers[20] === "broken") {
    profiles["The Shame & Repair Cycle"] = {
      subtype: "comparison-spiraler",
      title: "The Comparison Spiraler",
      description: "You measure yourself against an impossible standard — the 'together' moms at school drop-off, the organized Pinterest parents, the ones who seem to do it all effortlessly. What you can't see is their internal experience. What you can feel is the devastating gap between their exterior and yours. This comparison is a cognitive distortion amplified by ADHD's tendency toward negative self-evaluation.",
    }
  } else if (answers[18] === "harsh" || answers[18] === "devastating") {
    profiles["The Shame & Repair Cycle"] = {
      subtype: "self-critic",
      title: "The Inner Critic Mom",
      description: "Your internal voice is brutal. It doesn't just note mistakes — it weaponizes them into evidence of fundamental unworthiness. This inner critic has likely been building since childhood, reinforced by years of being told you're 'not trying hard enough.' It's not the truth. It's a pattern that can be interrupted.",
    }
  } else {
    profiles["The Shame & Repair Cycle"] = {
      subtype: "repairer",
      title: "The Active Repairer",
      description: "You've developed the ability to move through guilt toward repair. This is genuinely one of the most important parenting skills — and it's harder than it looks. Your children are learning from you that mistakes are survivable and relationships can heal.",
    }
  }

  // Organization subtypes (questions 21-25)
  if (answers[21] === "start-strong") {
    profiles["Your Organization Style"] = {
      subtype: "starter-abandoner",
      title: "The Starter-Abandoner",
      description: "You get a dopamine hit from new systems — the fresh planner, the color-coded calendar, the new app. It works brilliantly for 2-3 weeks. Then the novelty wears off, the dopamine dries up, and the system joins the graveyard of abandoned attempts. This isn't a willpower failure — it's how ADHD brains relate to novelty and routine.",
    }
  } else if (answers[22] === "paralyzed" || answers[23] === "cant-start") {
    profiles["Your Organization Style"] = {
      subtype: "paralysis-mom",
      title: "The Paralysis Mom",
      description: "You can see what needs doing. You want to do it. You might even be staring directly at it. But the signal from your brain to your body to START simply doesn't fire. This is task initiation failure — one of the hallmark executive function deficits in ADHD. It's not about motivation. It's about activation.",
    }
  } else if (answers[23] === "avoid-until-crisis" || answers[24] === "overwhelming") {
    profiles["Your Organization Style"] = {
      subtype: "crisis-cleaner",
      title: "The Crisis Cleaner",
      description: "You operate in cycles: avoidance builds until the environment becomes unbearable, then you panic-clean in a burst of adrenaline-fueled productivity. The crash afterward reinforces the shame. Your brain needs urgency or crisis to activate — and that's exhausting to live inside.",
    }
  } else {
    profiles["Your Organization Style"] = {
      subtype: "adapted",
      title: "The Adapted Organizer",
      description: "You've found organizational approaches that work with your brain rather than against it. They might not look like what 'organized' means to neurotypical people, but they're functional and sustainable. The strategies below will help you refine and protect these systems.",
    }
  }

  return profiles
}

// Comprehensive strategy database
interface Strategy {
  title: string
  description: string
  timeframe: "this-week" | "this-month" | "ongoing"
}

interface SectionContent {
  icon: React.ReactNode
  strategies: Record<string, Strategy[]>
  scripts: { title: string; context: string; script: string }[]
  science: string
  reframes: string[]
}

const sectionContent: Record<string, SectionContent> = {
  "The Morning Rush Audit": {
    icon: <Clock className="w-5 h-5" />,
    strategies: {
      "time-blind": [
        { title: "Visual Timers Everywhere", description: "Get a Time Timer (the one with the red disappearing disk) and put it where everyone can see it. ADHD brains can't feel time, but they can SEE it disappearing. Set it for each transition: 'When the red is gone, we put on shoes.'", timeframe: "this-week" },
        { title: "Backward Time Blocking", description: "Write your departure time on a sticky note. Work backward: shoes at -5 min, coats at -7 min, bags at -10 min. Post this sequence on the wall. You're externalizing the timeline your brain can't hold internally.", timeframe: "this-week" },
        { title: "The 'Fake' Departure Time", description: "Set your internal deadline 15 minutes before you actually need to leave. Yes, you're tricking yourself. Yes, it works. Build the buffer into the system so time blindness has room to breathe.", timeframe: "this-week" },
        { title: "Alarm Chains", description: "Set a chain of phone alarms: 30 min before departure, 15 min, 10 min, 5 min. Label each one with what should be happening ('SHOES NOW'). Your phone becomes your external prefrontal cortex.", timeframe: "this-week" },
        { title: "Time Audit Your Morning", description: "For one week, actually time each morning task with a stopwatch. Write down how long you THINK it takes vs. how long it ACTUALLY takes. The gap will shock you — and that awareness is the first step to realistic planning.", timeframe: "this-month" },
        { title: "Prep the Night Before — With a Timer", description: "Set a 10-minute timer after kids are in bed. In those 10 minutes: lay out clothes, pack bags, sign anything that needs signing. When the timer goes off, you're done. No perfectionism. Just 10 minutes.", timeframe: "this-week" },
      ],
      "emotional-cascader": [
        { title: "The Emotional Fire Drill", description: "Practice your 'disruption response' when you're calm. Literally rehearse: 'Something went wrong. I'm taking one breath. What's the ONE thing that matters right now?' Rehearsal builds neural pathways you can access under stress.", timeframe: "this-week" },
        { title: "Lower the Stakes", description: "Ask yourself: 'Will being 5 minutes late actually matter?' Usually, no. Give yourself permission to arrive imperfectly rather than melting down trying to be on time. A calm late arrival beats a traumatic on-time one.", timeframe: "this-week" },
        { title: "The Transition Warning System", description: "Give your kids (and yourself) 10-minute, 5-minute, and 2-minute warnings before any transition. Abrupt transitions trigger emotional dysregulation in ADHD brains — both yours and potentially theirs.", timeframe: "this-week" },
        { title: "Morning Calm Anchor", description: "Before the chaos starts, take 60 seconds for yourself. Coffee in silence. Three deep breaths. A moment of stillness. This isn't luxury — it's nervous system regulation that sets your baseline for the morning.", timeframe: "this-month" },
        { title: "The 'Good Enough' Morning", description: "Define what a 'good enough' morning looks like: everyone alive, fed something, at school with most of their stuff. That's the bar. Everything above it is bonus. Stop measuring against perfection.", timeframe: "this-week" },
        { title: "Repair on the Drive", description: "If the morning went badly, use the car ride to repair: 'That was a hard morning. I'm sorry I raised my voice. I love you and tomorrow we'll try again.' Don't let it fester until evening.", timeframe: "ongoing" },
      ],
      "memory-overloader": [
        { title: "The Launch Pad", description: "Create ONE physical station by the door. Hooks for bags, a bin for shoes, a tray for keys/forms/water bottles. Everything needed to leave the house lives in this one spot. If it's not at the launch pad, it doesn't go.", timeframe: "this-week" },
        { title: "The Visual Checklist", description: "Make a laminated checklist with pictures (yes, even for you) and stick it on the door: Bag? Lunch? Water? Keys? Phone? Forms? Run your hand down it every single morning. Externalize the mental checklist into a physical one.", timeframe: "this-week" },
        { title: "Reduce Your Variables", description: "Uniforms for yourself (3 go-to outfits). Same breakfast rotation. Same lunch options. Every decision you eliminate is cognitive load you reclaim for the things that actually need your brain.", timeframe: "this-month" },
        { title: "The 'Pack It When You Think of It' Rule", description: "The moment you think 'I need to remember X for tomorrow' — stop and go put it in the bag RIGHT NOW. Not later. Not 'I'll remember.' Now. Your future self will not remember. Trust this.", timeframe: "this-week" },
        { title: "Delegate the Checklist", description: "If your kids are old enough (5+), give THEM their own visual checklist. They check their own bag. They find their own shoes. You're not abdicating — you're teaching independence AND reducing your cognitive load.", timeframe: "this-month" },
        { title: "The Sunday Bag Pack", description: "Every Sunday, pack the week's bags as much as possible. Library books for Tuesday. PE kit for Wednesday. Get it done when your brain has capacity, not at 7:45am when it doesn't.", timeframe: "this-month" },
      ],
      "adapting": [
        { title: "Protect Your Rhythm", description: "You've found something that works — now protect it fiercely. When life disrupts your routine (holidays, illness, schedule changes), have a 'restart protocol' to get back on track within 2 days rather than letting it dissolve.", timeframe: "ongoing" },
        { title: "Build Redundancy", description: "What happens when your system fails? Have a backup: a spare set of essentials in the car, a 'grab and go' emergency bag, a neighbor who can help in a pinch. Systems need safety nets.", timeframe: "this-month" },
        { title: "Seasonal Adjustments", description: "Your morning routine needs to shift with seasons (darker mornings, weather changes, school schedule shifts). Build in a 'routine review' at the start of each term/season.", timeframe: "ongoing" },
      ],
    },
    scripts: [
      { title: "The Transition Script", context: "When your child won't stop what they're doing to get ready:", script: "I can see you're really into that. It's hard to stop something fun. We need to leave in 5 minutes — would you like to finish one more thing, or save it for after school?" },
      { title: "The Running Late Script", context: "When you're already late and the stress is building:", script: "We're running behind today and that's okay. Let's focus on the three things we absolutely need: shoes, bag, and getting in the car. Everything else can wait." },
      { title: "The Morning Repair Script", context: "When the morning went badly and you need to reconnect:", script: "Hey, I want to say sorry about this morning. I got stressed and I didn't handle it well. That wasn't your fault. I love you, and tomorrow we'll try again. Can I have a hug?" },
    ],
    science: "Time blindness is caused by differences in the prefrontal cortex and basal ganglia — the brain regions responsible for temporal processing. Research shows ADHD brains underestimate time intervals by 25-40% on average. This isn't a character flaw; it's measurable neurology. Your brain literally processes the passage of time differently than neurotypical brains. External time cues (visual timers, alarms, schedules) bypass this deficit by making time visible rather than requiring you to feel it internally.",
    reframes: [
      "Being late doesn't mean you don't care. It means your brain processes time differently.",
      "A chaotic morning doesn't set the tone for your child's entire day. Kids are resilient — and they remember the repair more than the rupture.",
      "You don't need a Pinterest-perfect morning routine. You need one that gets everyone out the door with their dignity intact.",
      "Every morning is a fresh start. Yesterday's chaos has no power over today.",
    ],
  },
  "The Invisible Mental Load": {
    icon: <Brain className="w-5 h-5" />,
    strategies: {
      "solo-carrier": [
        { title: "The Visible Load Exercise", description: "Write down EVERYTHING you track mentally for one week. Every appointment, every meal plan, every 'remember to buy more milk.' Then show it to your partner or support person. Making the invisible visible is the first step to sharing it.", timeframe: "this-week" },
        { title: "Delegate with Specifics", description: "Don't say 'Can you help more?' Say: 'I need you to own bedtime routine completely — that means teeth, stories, and lights out. I will not remind you or check.' Transfer OWNERSHIP, not just tasks.", timeframe: "this-month" },
        { title: "The Shared System", description: "If you have a partner, create ONE shared system you both use — a shared calendar, a family app like Cozi, a whiteboard in the kitchen. If it only lives in your head, it's not shared.", timeframe: "this-month" },
        { title: "Accept Imperfect Help", description: "When someone else does a task differently than you would, resist the urge to redo it. Done imperfectly by someone else is better than done perfectly by you alone while you're drowning.", timeframe: "ongoing" },
        { title: "Build Your Village", description: "Identify 2-3 other parents you can create mutual support with. Carpool swaps, emergency pickups, 'can you grab milk?' texts. You weren't meant to do this in isolation.", timeframe: "this-month" },
        { title: "The Non-Negotiable Drop", description: "Choose 3 things you're going to STOP doing. Not delegate — stop entirely. Maybe it's ironing. Maybe it's homemade lunches every day. Maybe it's volunteering at school. Something has to give, and you get to choose what.", timeframe: "this-week" },
      ],
      "object-permanence": [
        { title: "The Giant Wall Calendar", description: "Not a phone app — a physical, impossible-to-ignore wall calendar in your most-trafficked room. Color-code by family member. If you can't see it, it doesn't exist. Make it exist in your visual field every single day.", timeframe: "this-week" },
        { title: "The Capture Notebook", description: "Carry ONE small notebook everywhere. Every thought, task, reminder goes in immediately — don't organize, just capture. Process it once daily during a set 'brain dump' time. Your notebook is your external working memory.", timeframe: "this-week" },
        { title: "Reminders for EVERYTHING", description: "Set phone reminders for things neurotypical people 'just remember': check the backpack, RSVP to the party, buy the birthday present, eat lunch. There is zero shame in this. It's assistive technology for your brain.", timeframe: "this-week" },
        { title: "Visual Cues in Your Environment", description: "Put the permission slip ON your keys. Put the library books BY the door. Put the birthday card ON the steering wheel. Use physical placement as memory triggers — your environment becomes your reminder system.", timeframe: "this-week" },
        { title: "The Weekly Brain Dump", description: "Every Sunday: sit with your calendar, school emails, and notebook. Transfer everything to the wall calendar. Set the week's reminders. 15 minutes of structured review prevents a week of forgotten chaos.", timeframe: "ongoing" },
        { title: "Redundant Reminders", description: "Important things get THREE reminders: one the week before, one the day before, one the morning of. Overkill? Maybe. But you'll never miss picture day again.", timeframe: "this-week" },
      ],
      "admin-drowning": [
        { title: "The 15-Minute Admin Block", description: "Set a timer for 15 minutes. Open the pile. Handle what you can. When the timer goes off, STOP. You don't have to clear the pile — you just have to touch it regularly so it never becomes insurmountable.", timeframe: "this-week" },
        { title: "The 'Do It Now' 2-Minute Rule", description: "If something takes less than 2 minutes (signing a form, replying to an email, writing a check), do it the MOMENT it enters your hands. Don't put it down. Don't say 'later.' Two minutes, done, gone.", timeframe: "this-week" },
        { title: "Body Double Your Admin", description: "Can't face the pile alone? Call a friend, get on FaceTime, and do your admin together. Or join a virtual co-working session. ADHD brains activate better with parallel presence.", timeframe: "this-week" },
        { title: "Automate Everything Possible", description: "Auto-pay every bill. Auto-schedule recurring appointments. Set up auto-replies for school emails acknowledging receipt. Every task you automate is one less thing in the pile.", timeframe: "this-month" },
        { title: "The 'Good Enough' Response", description: "Not every email needs a thoughtful reply. 'Got it, thanks!' is a complete response. 'Yes, that works' is a complete RSVP. Lower the bar on communication perfectionism.", timeframe: "this-week" },
        { title: "Create a Landing Zone", description: "All incoming paper goes in ONE tray. Not scattered across the counter. One tray, processed during your 15-minute admin block. Containment reduces overwhelm.", timeframe: "this-week" },
      ],
      "managing": [
        { title: "Stress-Test Your Systems", description: "Your systems work now — but what happens during illness, holidays, or schedule changes? Build a 'restart protocol' for getting back on track after disruptions.", timeframe: "this-month" },
        { title: "Teach Your Systems to Others", description: "If something happens to you, could someone else step in? Document your key systems so they're not single-point-of-failure dependent on your brain.", timeframe: "this-month" },
        { title: "Regular System Reviews", description: "Once a month, ask: 'What's working? What's slipping? What needs adjusting?' Systems need maintenance, not just creation.", timeframe: "ongoing" },
      ],
    },
    scripts: [
      { title: "The Partner Conversation", context: "When you need to explain the mental load to your partner:", script: "I need to show you something. I wrote down everything I'm tracking in my head for our family this week. I'm not saying you don't help — I'm saying the REMEMBERING part is crushing me. Can we look at this together and figure out what you can fully own?" },
      { title: "The 'I Forgot' Self-Compassion Script", context: "When you've forgotten something important and the shame hits:", script: "I forgot. That happened because my working memory has limits, not because I don't care. What can I do right now to fix it? And what system can I put in place so this specific thing doesn't fall through again?" },
      { title: "The School Communication", context: "When you need to let school know about your challenges:", script: "I want to be upfront that I sometimes miss communications that come home in backpacks. Could important notices also be emailed? I want to be responsive — I just need information in a format my brain can catch." },
    ],
    science: "Working memory — the ability to hold and manipulate information in your mind temporarily — is significantly impaired in ADHD. Research shows the average ADHD adult can hold 2-3 items in working memory compared to 5-7 for neurotypical adults. Parenting requires tracking dozens of simultaneous threads. The solution isn't expanding your working memory (you can't) — it's externalizing it entirely. Every task that lives in your head instead of on paper or in a system is using precious cognitive resources that could go toward being present with your children.",
    reframes: [
      "Forgetting doesn't mean you don't care. It means your brain has a smaller 'desktop' — and parenting demands an enormous amount of RAM.",
      "Using reminders, lists, and calendars isn't a crutch. It's assistive technology. You wouldn't shame someone for wearing glasses.",
      "The mental load is invisible to others because it happens inside your head. Making it visible isn't complaining — it's communicating.",
      "You're not 'scattered.' You're managing more cognitive threads than your working memory was designed to hold.",
    ],
  },
  "Your Sensory Overload Profile": {
    icon: <Volume2 className="w-5 h-5" />,
    strategies: {
      "touched-out": [
        { title: "The 'Touched Out' Script", description: "Practice saying: 'I love you AND my body needs space right now. Can we do side-by-side time instead?' Offer alternatives: sitting next to each other, a hand on their back, or 'Let's hold hands instead of a hug right now.'", timeframe: "this-week" },
        { title: "Proactive Touch Boundaries", description: "Before you hit capacity, build in 'no touch' windows. After school pickup, say: 'I'm going to sit quietly for 5 minutes, then I'm all yours for hugs.' Setting boundaries BEFORE overwhelm prevents the snap.", timeframe: "this-week" },
        { title: "Sensory-Friendly Affection Alternatives", description: "Not all connection requires physical touch. Try: making eye contact and smiling, verbal affirmations ('I love watching you play'), parallel activities (coloring together), or 'air hugs' from across the room.", timeframe: "this-week" },
        { title: "The Recovery Window", description: "After high-touch periods (nursing, carrying toddlers, bedtime cuddles), give yourself 10 minutes of zero physical contact. Lock the bathroom door. Sit in the car. Your nervous system needs reset time.", timeframe: "this-week" },
        { title: "Explain It Age-Appropriately", description: "Even young children can understand: 'Mama's body feels too full of touches right now. It's not about you — I love your hugs. My body just needs a little rest. I'll be ready for more hugs after dinner.'", timeframe: "this-week" },
        { title: "Clothing and Texture Awareness", description: "If you're already sensory-loaded, tight clothing, scratchy fabrics, or a bra that's bothering you will push you over faster. Wear soft, comfortable clothes on high-demand days. Remove irritants before they compound.", timeframe: "ongoing" },
      ],
      "noise-sensitive": [
        { title: "Loop Earbuds — Today", description: "Order Loop Quiet or Loop Experience earbuds. They reduce decibel levels by 18-27dB without blocking voices entirely. You can still hear your kids — it just removes the sharp, overwhelming edge. Many ADHD moms describe these as life-changing.", timeframe: "this-week" },
        { title: "The Noise Budget", description: "You have a daily noise budget. TV counts. Music counts. Sibling arguments count. When you notice the budget getting low, proactively reduce input: turn off background TV, move to a quieter room, or put in one earbud.", timeframe: "this-week" },
        { title: "Quiet Zones in Your Home", description: "Designate one room or corner as a 'quiet zone' — for you AND the kids. When anyone (including you) needs sensory relief, they can go there. Normalize needing quiet as a family value, not a punishment.", timeframe: "this-month" },
        { title: "The Volume Negotiation", description: "Teach your kids about volume levels: 1 is whisper, 3 is indoor voice, 5 is outdoor voice. When noise is building, say: 'We're at a 4 right now. Can we bring it to a 2 for the next 10 minutes? Then you can be loud outside.'", timeframe: "this-week" },
        { title: "White Noise as a Buffer", description: "A white noise machine or fan in your workspace creates a consistent sound floor that makes sudden noises less jarring. It's not adding noise — it's smoothing the auditory landscape.", timeframe: "this-week" },
        { title: "The Pre-Emptive Break", description: "Don't wait until you're about to explode. When you notice the first signs of noise overwhelm (jaw clenching, shoulders rising, irritability), take your break THEN. Early intervention is 10x easier than crisis management.", timeframe: "ongoing" },
      ],
      "total-depletion": [
        { title: "Energy Accounting", description: "Track your energy like a bank account. High-sensory activities (grocery store with kids, birthday parties, school events) are big withdrawals. Build in deposits: 10 minutes alone in the car, noise-canceling headphones during chores, an early bedtime for yourself.", timeframe: "this-week" },
        { title: "The Low-Spoon Evening Protocol", description: "On depleted evenings, the goal is: kids safe, kids fed, kids in bed. That's it. Screens are fine. Cereal for dinner is fine. Reading the same book twice is fine. Survival mode has a protocol — use it without guilt.", timeframe: "this-week" },
        { title: "Sensory Recovery Before Bedtime Routine", description: "Take 10 minutes between dinner and bedtime to sit in a dim, quiet space. Even if kids are watching a show. This micro-recovery can be the difference between managing bedtime and melting down during it.", timeframe: "this-week" },
        { title: "The 'Enough' Boundary", description: "Give yourself permission to say: 'I've done enough today.' Not when everything is done — because it never will be. But when YOUR capacity is spent. The house will still be there tomorrow. You need to be there tomorrow too.", timeframe: "ongoing" },
        { title: "Strategic Screen Time", description: "Using screens so you can recover is not lazy parenting. It's resource management. 30 minutes of a show while you decompress means you can be present for bedtime. That's a trade worth making.", timeframe: "this-week" },
        { title: "Morning Energy Preservation", description: "If evenings are your crash point, front-load your energy expenditure. Do the hardest parenting tasks in the morning when your battery is fullest. Protect evening energy by simplifying everything after 5pm.", timeframe: "this-month" },
      ],
      "regulated": [
        { title: "Maintain Your Boundaries", description: "You've learned your limits — keep honoring them even when life gets busy. The moment you start overriding your sensory boundaries 'just this once,' the depletion cycle restarts.", timeframe: "ongoing" },
        { title: "Seasonal Awareness", description: "Your sensory capacity fluctuates with hormonal cycles, seasons, sleep quality, and life stress. Build in extra buffer during known high-demand periods.", timeframe: "ongoing" },
        { title: "Teach Your Kids About Sensory Needs", description: "Model sensory self-care openly: 'I'm going to take a quiet break because my brain needs it.' You're teaching them emotional intelligence and self-regulation.", timeframe: "ongoing" },
      ],
    },
    scripts: [
      { title: "The Sensory Break Script", context: "When you need to step away before you snap:", script: "Mama needs 2 minutes of quiet. I'm not angry at you — my brain just needs a tiny rest. I'll be right back and then we can [specific activity together]." },
      { title: "The 'Too Loud' Script", context: "When noise levels are overwhelming:", script: "Hey loves, the noise level is really high right now and my brain is struggling. Can we use indoor voices for the next 10 minutes? Then you can be loud outside/in the playroom." },
      { title: "The Partner Script", context: "When you need your partner to take over:", script: "I've hit my sensory wall. I need you to take over for the next 20 minutes. I'm not being dramatic — my nervous system is maxed out and if I don't step away, I'm going to snap at everyone. I'll be back." },
      { title: "The Touched-Out Script", context: "When physical contact has become unbearable:", script: "I love you so much, and right now my body needs a break from being touched. It's not about you at all — my skin just feels too full. Can we sit next to each other and I'll hold your hand instead?" },
    ],
    science: "Sensory processing differences are extremely common in ADHD. Research shows that ADHD brains have reduced ability to filter and gate sensory input — meaning stimuli that neurotypical brains automatically suppress (background noise, light touch, visual clutter) all compete for attention simultaneously. This creates a cumulative 'sensory load' that depletes faster than it can recover. The irritability you feel isn't a personality flaw — it's your nervous system signaling that it has exceeded processing capacity. Think of it like a computer with too many tabs open: eventually, it freezes or crashes.",
    reframes: [
      "Needing quiet doesn't make you a cold mother. It makes you a mother who knows her limits.",
      "Stepping away to regulate is not abandonment. It's modeling healthy coping for your children.",
      "Being 'touched out' is a neurological state, not an emotional rejection of your child.",
      "Your sensitivity is also your superpower — it's why you notice when your child is struggling before anyone else does.",
      "Using earplugs, taking breaks, and setting boundaries isn't selfish. It's how you stay present instead of checked out.",
    ],
  },
  "The Shame & Repair Cycle": {
    icon: <Heart className="w-5 h-5" />,
    strategies: {
      "silent-masker": [
        { title: "Find One Safe Person", description: "You don't need to unmask to the world. Start with ONE person — a friend, a therapist, an online community. Say: 'I'm struggling more than I show.' That single act of honesty can crack the isolation open.", timeframe: "this-month" },
        { title: "The Micro-Vulnerability", description: "You don't have to share everything at once. Start small: 'Mornings are really hard for us right now.' See how it lands. Most of the time, the response is 'Oh my god, me too.' The mask assumes judgment that rarely comes.", timeframe: "this-week" },
        { title: "Online Communities First", description: "If in-person vulnerability feels too risky, start online. ADHD parenting groups on Reddit, Facebook, or Discord let you share anonymously. Read other people's stories first. See yourself reflected. Then share yours.", timeframe: "this-week" },
        { title: "The Energy Cost of Masking", description: "Notice how exhausted you are after social situations where you've been performing 'together.' That exhaustion is the cost of masking. Every bit of energy spent on the performance is energy stolen from your actual life.", timeframe: "ongoing" },
        { title: "Permission to Be Imperfect Publicly", description: "Next time someone asks 'How are you?', try: 'Honestly? It's been a hard week.' You don't owe anyone your full story — but you also don't owe them a performance of being fine.", timeframe: "this-week" },
        { title: "Curate Your Social Circle", description: "Spend less time with people who make you feel you need to perform, and more time with people who make you feel safe being messy. You get to choose who earns access to your real life.", timeframe: "this-month" },
      ],
      "comparison-spiraler": [
        { title: "The 'Behind the Scenes' Reminder", description: "Every 'together' mom you see is showing you her highlight reel. You're comparing your behind-the-scenes to her front-of-house. You have no idea what her mornings look like, what she cries about at night, or what she's hiding.", timeframe: "this-week" },
        { title: "The Social Media Audit", description: "Unfollow or mute every account that makes you feel inadequate. Follow ADHD moms, messy-house accounts, 'good enough' parenting voices. Curate your feed to reflect reality, not aspiration.", timeframe: "this-week" },
        { title: "The Comparison Interrupt", description: "When you catch yourself comparing, say internally: 'I'm doing it again. Her life is not my life. Her brain is not my brain. What do I need right now?' Redirect from comparison to self-compassion.", timeframe: "ongoing" },
        { title: "Your Strengths Inventory", description: "Write down 5 things you DO well as a parent. Maybe it's creativity, or humor, or how you handle big emotions, or how you always repair. ADHD parents have genuine strengths that organized parents often lack.", timeframe: "this-week" },
        { title: "The 'Different, Not Less' Reframe", description: "Your parenting looks different. Different is not less. Your kids have a mom who's creative, spontaneous, deeply empathetic, and who models resilience every single day. That has enormous value.", timeframe: "ongoing" },
        { title: "Limit School Gate Time", description: "If school drop-off/pickup is a comparison trigger, minimize your exposure. Drop and go. Pick up and leave. You don't need to linger in an environment that activates your shame.", timeframe: "this-week" },
      ],
      "self-critic": [
        { title: "Name the Voice", description: "Give your inner critic a name — something slightly ridiculous. 'Oh, there's Karen again, telling me I'm terrible.' Externalizing the voice creates distance between you and the thought. You are not the voice. The voice is a pattern.", timeframe: "this-week" },
        { title: "The Evidence Challenge", description: "When the critic says 'You're a terrible mother,' ask: 'What's the actual evidence?' Then ask: 'What's the evidence AGAINST that?' You read to them. You worry about them. You're here, trying. That's evidence of love.", timeframe: "this-week" },
        { title: "The Friend Test", description: "Would you say what you're saying to yourself to a friend in the same situation? If not, you don't get to say it to yourself either. Speak to yourself with the same compassion you'd offer someone you love.", timeframe: "ongoing" },
        { title: "The 'What Would I Tell My Daughter?' Test", description: "If your daughter grew up and was struggling as a parent, would you tell her she's terrible? Or would you hold her and say 'You're doing your best and that's enough'? Give yourself what you'd give her.", timeframe: "ongoing" },
        { title: "Therapy for the Inner Critic", description: "If your inner critic is relentless, consider working with a therapist who specializes in ADHD and shame. This voice often has roots in childhood — being told you're lazy, careless, not trying hard enough. It can be rewired, but it takes support.", timeframe: "this-month" },
        { title: "The Daily Acknowledgment", description: "Every night, before the critic starts its review, say three things you did today that were enough: 'I fed them. I hugged them. I showed up.' That's not nothing. That's everything.", timeframe: "this-week" },
      ],
      "repairer": [
        { title: "Deepen Your Repair Practice", description: "You already repair — now make it even more specific. Instead of 'I'm sorry I yelled,' try: 'I'm sorry I yelled about the shoes. You didn't deserve that. I was frustrated about being late, and I took it out on you.'", timeframe: "ongoing" },
        { title: "Model Imperfection", description: "Your children are learning from your repairs that adults make mistakes AND take responsibility. This is one of the most valuable things you can teach them. You're building their emotional intelligence.", timeframe: "ongoing" },
        { title: "Celebrate Your Growth", description: "Notice how far you've come. The fact that you repair quickly and authentically is a skill many parents never develop. Acknowledge that progress.", timeframe: "ongoing" },
      ],
    },
    scripts: [
      { title: "The Full Repair Script (Ages 3-6)", context: "After losing your temper with a young child:", script: "Come here, sweetheart. I'm sorry I used my big voice. That was scary, wasn't it? You didn't do anything wrong. Mama's brain got too full and I made a mistake. I'm working on it. I love you always, even when I'm grumpy. Can we have a cuddle?" },
      { title: "The Full Repair Script (Ages 7-12)", context: "After losing your temper with a school-age child:", script: "Hey, I want to talk about what happened earlier. I yelled, and that wasn't okay. You didn't deserve that. I was feeling overwhelmed and I handled it badly. That's my stuff to work on, not yours. I'm sorry. What do you need from me right now?" },
      { title: "The Full Repair Script (Teens)", context: "After a conflict with a teenager:", script: "I owe you an apology. I lost my cool and I said things I didn't mean. You're allowed to be frustrated with me about that. I'm working on managing my reactions better. Can we talk about what happened, or do you need space first?" },
      { title: "The Self-Compassion Script", context: "When the shame spiral hits after a hard moment:", script: "I'm having a hard time right now. I made a mistake. That doesn't make me a bad mother — it makes me a human one. I can repair this. I will repair this. And tomorrow I'll try again." },
      { title: "The Partner Vulnerability Script", context: "When you need to let your partner in:", script: "I need to tell you something. I'm really struggling right now and I've been hiding it. I feel like I'm failing as a mom most days. I don't need you to fix it — I just need you to know, and to not judge me for it." },
    ],
    science: "Rejection Sensitive Dysphoria (RSD) — an intense emotional response to perceived criticism or failure — affects up to 99% of adults with ADHD according to Dr. William Dodson's research. The shame you feel isn't proportional to the 'offense' because your brain amplifies negative self-evaluation. Additionally, ADHD brains have lower baseline dopamine, which means the 'reward' of doing things right registers less, while the 'punishment' of mistakes registers more intensely. This creates a negativity bias that makes you remember every failure and dismiss every success. It's not accurate — it's neurochemistry.",
    reframes: [
      "Bad mothers don't lie awake worrying about whether they're bad mothers. The worry itself is proof of your love.",
      "Your children don't need a perfect mother. They need a mother who repairs. And you do.",
      "Shame says 'I am bad.' Guilt says 'I did something bad.' One is an identity. The other is a behavior you can change.",
      "The fact that you're here, reading this, trying to understand yourself better — that IS the love your children need.",
      "You are not your worst parenting moment. You are the sum of every bedtime story, every packed lunch, every 'I love you,' every time you showed up even when it was hard.",
    ],
  },
  "Your Organization Style": {
    icon: <Layout className="w-5 h-5" />,
    strategies: {
      "starter-abandoner": [
        { title: "Expect the Novelty Drop-Off", description: "You WILL lose interest in any new system around week 3. This isn't failure — it's predictable ADHD neurology. Plan for it: set a calendar reminder at week 3 that says 'The novelty is wearing off. This is normal. Keep going for one more week.'", timeframe: "this-week" },
        { title: "Boring Systems That Work", description: "Stop looking for the perfect system. The best system is the boring one you'll actually use. A plain notebook beats a beautiful planner you abandon. A basic phone reminder beats an elaborate app you forget to open.", timeframe: "this-week" },
        { title: "The 'Good Enough' System", description: "Your system doesn't need to capture everything perfectly. It needs to catch the critical 80%. If your wall calendar catches most appointments and your phone catches the rest, that's a SYSTEM. It doesn't need to be elegant.", timeframe: "ongoing" },
        { title: "Rotate, Don't Abandon", description: "Instead of abandoning systems entirely, rotate between 2-3 that work. Use the planner until it gets stale, switch to the app, switch to the whiteboard, then back to the planner. Rotation satisfies novelty-seeking without losing function.", timeframe: "this-month" },
        { title: "Anchor to Existing Habits", description: "Attach new organizational habits to things you already do reliably. Check the calendar while drinking morning coffee. Process the inbox while waiting for school pickup. Piggyback on existing neural pathways.", timeframe: "this-week" },
        { title: "Accountability Partner", description: "Find someone (friend, coach, online buddy) who checks in weekly: 'Did you do your brain dump? Did you check the calendar?' External accountability replaces the internal motivation that ADHD brains struggle to generate.", timeframe: "this-month" },
      ],
      "paralysis-mom": [
        { title: "The 'One Thing' Rule", description: "When everything feels impossible, ask: 'What is the ONE thing that will make the next hour easier?' Not the whole list. Not the whole house. One thing. Do that. Then ask again. Micro-progress breaks paralysis.", timeframe: "this-week" },
        { title: "Body Doubling", description: "Can't start? Get someone on the phone, on FaceTime, or in a virtual co-working room. Their presence activates your brain. It sounds strange — it works. ADHD brains often need parallel presence to initiate tasks.", timeframe: "this-week" },
        { title: "The 5-Minute Contract", description: "Tell yourself: 'I will do this for 5 minutes only. Then I can stop.' Usually, starting is the hardest part — once you're moving, momentum carries you. But if 5 minutes is all you do? That's still 5 minutes more than zero.", timeframe: "this-week" },
        { title: "Change Your Environment", description: "Can't start in the kitchen? Move to a different room and come back. Put on shoes. Change your clothes. Play energetic music. Sometimes your brain needs a 'scene change' to shift out of freeze mode.", timeframe: "this-week" },
        { title: "Pair Boring with Stimulating", description: "Dishes + podcast. Laundry + phone call. Tidying + loud music. Your brain needs stimulation to activate on boring tasks. Give it the stimulation it craves WHILE doing the task, not instead of it.", timeframe: "this-week" },
        { title: "Forgive the Freeze", description: "When paralysis hits, the worst thing you can do is add shame on top. 'I can't start AND I'm terrible for not starting' doubles the weight. Instead: 'My brain is frozen right now. That's okay. What's the smallest possible next step?'", timeframe: "ongoing" },
      ],
      "crisis-cleaner": [
        { title: "The Daily Minimum", description: "Instead of waiting for crisis, set a tiny daily minimum: one load of laundry, one sink of dishes, one 10-minute tidy. It won't be perfect — but it prevents the avalanche that triggers panic-cleaning.", timeframe: "this-week" },
        { title: "The 'Reset' Not 'Deep Clean'", description: "Reframe cleaning as 'resetting' not 'cleaning.' A reset takes 15 minutes: clear surfaces, dishes in sink, stuff off floor. It's not clean — it's functional. Do resets, not deep cleans, on regular days.", timeframe: "this-week" },
        { title: "Harness the Urgency (Strategically)", description: "Your brain activates under pressure? Use it intentionally. Invite someone over in 2 hours. Set a timer for 20 minutes and race it. Create artificial urgency that triggers your activation without the shame of actual crisis.", timeframe: "this-week" },
        { title: "Lower Your Standards (Seriously)", description: "A 'clean enough' house has: walkable floors, usable surfaces, and no health hazards. That's it. Everything else is preference, not necessity. Give yourself permission to live at 'clean enough' instead of 'company ready.'", timeframe: "ongoing" },
        { title: "The Post-Crisis Debrief", description: "After a panic-clean, don't just collapse. Ask: 'What triggered the crisis? What's ONE thing I could do daily to prevent it next time?' Build one tiny habit from each crisis. Over time, the cycles get less extreme.", timeframe: "ongoing" },
        { title: "Hire Help If Possible", description: "If you can afford even a monthly cleaner for the big stuff, it's not indulgence — it's accommodation. You wouldn't feel guilty about a wheelchair ramp. A cleaner is an executive function accommodation.", timeframe: "this-month" },
      ],
      "adapted": [
        { title: "Document What Works", description: "Write down your current systems so you can rebuild them after disruptions. What works for you is valuable knowledge — protect it.", timeframe: "this-month" },
        { title: "Share Your Strategies", description: "Other ADHD moms need to hear what works for you. Consider sharing in communities — your adapted solutions might be exactly what someone else needs.", timeframe: "ongoing" },
        { title: "Prepare for Life Changes", description: "New baby, new school, new job — any transition can disrupt working systems. Plan ahead for how you'll adapt your organization to new circumstances.", timeframe: "ongoing" },
      ],
    },
    scripts: [
      { title: "The 'Help Me Start' Script", context: "When you need someone to help you break paralysis:", script: "I'm stuck. I can see what needs doing but my brain won't let me start. Can you just sit with me while I do it? Or tell me the first tiny step? I don't need you to do it for me — I just need help getting unstuck." },
      { title: "The Self-Permission Script", context: "When guilt about the state of your home is overwhelming:", script: "My house is not a reflection of my worth as a mother. My children are loved, safe, and fed. The laundry pile is not an emergency. I will do what I can today, and that is enough." },
      { title: "The Partner Expectations Script", context: "When you need to reset household expectations:", script: "I need us to talk about what 'clean enough' means for our family. My brain makes daily maintenance genuinely harder than it is for most people. I'm not making excuses — I'm asking us to find a standard we can both live with that doesn't destroy me." },
    ],
    science: "Task initiation — the ability to begin a task without external pressure — is one of the core executive function deficits in ADHD. The prefrontal cortex, which is responsible for 'go' signals, requires adequate dopamine to fire. In ADHD, baseline dopamine is lower, meaning the brain needs either high interest, urgency, novelty, or challenge to generate enough activation to start. This is why you can spend 3 hours on something fascinating but can't start 10 minutes of dishes. It's not about the task's difficulty — it's about your brain's activation threshold. Crisis-cleaning works because adrenaline temporarily floods the system with enough neurochemicals to override the initiation deficit.",
    reframes: [
      "You haven't failed at organization. Organization systems have failed YOU. They were designed for different brains.",
      "A messy house with happy kids is better than a clean house with a burned-out mother.",
      "Needing body doubling, timers, or artificial urgency to start tasks isn't weakness. It's understanding your activation needs.",
      "The 'perfect system' doesn't exist. The system you'll actually use — however imperfect — is the right one.",
      "Paralysis is not laziness. It's a neurological state where the signal from intention to action is blocked. You can see the task. You want to do the task. The bridge between wanting and doing is broken — and that's not your fault.",
    ],
  },
}

// Daily rhythm templates
const dailyRhythms = {
  highSpoon: {
    title: "High-Spoon Day",
    subtitle: "You woke up with energy. Use it wisely — don't burn it all by noon.",
    items: [
      "Morning: Tackle ONE admin task you've been avoiding (the form, the email, the appointment)",
      "Mid-morning: Do the hardest household task while energy is high (meal prep, deep clean one room)",
      "Afternoon: Batch errands if possible (grocery + pharmacy + returns in one trip)",
      "Evening: Prep for tomorrow (lay out clothes, pack bags, check calendar)",
      "Before bed: Acknowledge what you accomplished. Write it down. You did that.",
    ],
  },
  lowSpoon: {
    title: "Low-Spoon Day",
    subtitle: "Today is about survival, not productivity. Lower every bar.",
    items: [
      "Morning: Get everyone fed (cereal counts) and out the door (or not — screen time is fine)",
      "Mid-morning: Do the ONE thing that prevents tomorrow from being harder (one load of laundry, one dish cycle)",
      "Afternoon: Rest when possible. Screens for kids. Couch for you. No guilt.",
      "Evening: Simplest possible dinner (frozen food, takeout, sandwiches — all valid)",
      "Before bed: You survived. That's enough. Tomorrow might be different.",
    ],
  },
  crisisDay: {
    title: "Crisis Day",
    subtitle: "Everything has gone wrong. Here's your bare minimum.",
    items: [
      "Are the children safe? Yes? You're doing your job.",
      "Has everyone eaten something today? Anything counts.",
      "Can you get through the next hour? Focus only on that.",
      "Call in help if you have it. Text someone. You don't have to do this alone today.",
      "Tomorrow is a new day. Today just needs to end. Let it end.",
    ],
  },
}

export function ResultsReport({ answers, questions }: ResultsReportProps) {
  // Calculate scores by section
  const sectionScores: Record<string, { total: number; max: number; average: number }> = {}
  
  questions.forEach((q) => {
    if (!sectionScores[q.section]) {
      sectionScores[q.section] = { total: 0, max: 0, average: 0 }
    }
    const answer = answers[q.id]
    if (answer) {
      const option = q.options.find((o) => o.id === answer)
      if (option) {
        sectionScores[q.section].total += option.score
        sectionScores[q.section].max += 4
      }
    }
  })

  Object.keys(sectionScores).forEach((section) => {
    const s = sectionScores[section]
    s.average = s.max > 0 ? s.total / (s.max / 4) : 0
  })

  const totalScore = Object.values(sectionScores).reduce((sum, s) => sum + s.total, 0)
  const maxPossible = Object.values(sectionScores).reduce((sum, s) => sum + s.max, 0)
  const overallIntensity = maxPossible > 0 ? (totalScore / maxPossible) * 100 : 0

  const getProfileType = () => {
    if (overallIntensity <= 35) return { name: "The Adapting Navigator", description: "You've developed coping strategies that work much of the time. Your challenges are real but manageable, and you have moments of genuine flow in your parenting. The strategies below will help you strengthen what's working and shore up the areas that still feel hard." }
    if (overallIntensity <= 60) return { name: "The Overwhelmed Warrior", description: "You're fighting hard every day, and it shows in both your exhaustion and your dedication. You don't need more effort — you need better tools, more support, and permission to lower the bar on things that don't actually matter. You're not failing. You're under-resourced." }
    return { name: "The Burnout Survivor", description: "You're running on fumes and the guilt is compounding the exhaustion. You deserve support that meets you where you actually are — not where you think you should be. The strategies below are designed for your current capacity, not some imagined 'better' version of you. Start with the 'This Week' items only." }
  }

  const profile = getProfileType()
  const subProfiles = detectSubProfiles(answers)

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="bg-card rounded-3xl p-8 md:p-10 shadow-sm border border-border">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium text-primary uppercase tracking-wide">Your ADHD Parenting Profile</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-medium text-foreground mb-3 text-balance">
          {profile.name}
        </h1>
        <p className="text-lg text-muted-foreground mb-6">
          {profile.description}
        </p>
        <div className="bg-primary/5 rounded-2xl p-5 border border-primary/10">
          <p className="text-foreground/90 leading-relaxed">
            <strong>How to use this report:</strong> Start with the &quot;This Week&quot; strategies only. Don&apos;t try to implement everything at once — that&apos;s a recipe for overwhelm. Pick ONE thing from each section that resonates, try it for a week, then come back for more.
          </p>
        </div>
      </div>

      {/* Section-by-Section Results */}
      {Object.entries(sectionContent).map(([sectionName, section]) => {
        const subProfile = subProfiles[sectionName]
        const score = sectionScores[sectionName]
        const strategies = section.strategies[subProfile?.subtype || "adapting"] || section.strategies[Object.keys(section.strategies)[0]]

        return (
          <div key={sectionName} className="bg-card rounded-3xl p-8 md:p-10 shadow-sm border border-border">
            {/* Section Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                {section.icon}
              </div>
              <h2 className="text-2xl font-medium text-foreground">{sectionName}</h2>
            </div>

            {/* Score Bar */}
            {score && (
              <div className="mb-6">
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-teal-start to-teal-end rounded-full transition-all duration-500"
                    style={{ width: `${(score.total / score.max) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* Sub-Profile */}
            {subProfile && (
              <div className="mb-6 bg-secondary/30 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary uppercase tracking-wide">Your Pattern</span>
                </div>
                <h3 className="text-xl font-medium text-foreground mb-2">{subProfile.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{subProfile.description}</p>
              </div>
            )}

            {/* Strategies by Timeframe */}
            {strategies && strategies.length > 0 && (
              <div className="space-y-6 mb-6">
                {/* This Week */}
                {strategies.filter(s => s.timeframe === "this-week").length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Zap className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-primary uppercase tracking-wide">Start This Week</span>
                    </div>
                    <div className="space-y-3">
                      {strategies.filter(s => s.timeframe === "this-week").map((strategy, idx) => (
                        <div key={idx} className="bg-secondary/20 rounded-2xl p-4">
                          <h4 className="font-medium text-foreground mb-1">{strategy.title}</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">{strategy.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* This Month */}
                {strategies.filter(s => s.timeframe === "this-month").length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-primary uppercase tracking-wide">Build This Month</span>
                    </div>
                    <div className="space-y-3">
                      {strategies.filter(s => s.timeframe === "this-month").map((strategy, idx) => (
                        <div key={idx} className="bg-secondary/20 rounded-2xl p-4">
                          <h4 className="font-medium text-foreground mb-1">{strategy.title}</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">{strategy.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Ongoing */}
                {strategies.filter(s => s.timeframe === "ongoing").length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Lightbulb className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-primary uppercase tracking-wide">Ongoing Mindset Shifts</span>
                    </div>
                    <div className="space-y-3">
                      {strategies.filter(s => s.timeframe === "ongoing").map((strategy, idx) => (
                        <div key={idx} className="bg-secondary/20 rounded-2xl p-4">
                          <h4 className="font-medium text-foreground mb-1">{strategy.title}</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">{strategy.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Scripts */}
            {section.scripts.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <MessageCircle className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary uppercase tracking-wide">Scripts You Can Use</span>
                </div>
                <div className="space-y-3">
                  {section.scripts.map((script, idx) => (
                    <div key={idx} className="bg-primary/5 rounded-2xl p-5 border border-primary/10">
                      <h4 className="font-medium text-foreground mb-1">{script.title}</h4>
                      <p className="text-xs text-muted-foreground mb-3 italic">{script.context}</p>
                      <p className="text-foreground/90 leading-relaxed bg-card rounded-xl p-4 border border-border">
                        &quot;{script.script}&quot;
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* The Science */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary uppercase tracking-wide">The Science Behind This</span>
              </div>
              <div className="bg-secondary/20 rounded-2xl p-5">
                <p className="text-sm text-muted-foreground leading-relaxed">{section.science}</p>
              </div>
            </div>

            {/* Reframes */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Heart className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary uppercase tracking-wide">Reframe Your Thinking</span>
              </div>
              <div className="space-y-2">
                {section.reframes.map((reframe, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3">
                    <span className="text-primary mt-0.5 flex-shrink-0">✦</span>
                    <p className="text-foreground/80 text-sm leading-relaxed italic">{reframe}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      })}

      {/* Daily Rhythm Templates */}
      <div className="bg-card rounded-3xl p-8 md:p-10 shadow-sm border border-border">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Coffee className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-medium text-foreground">Your Daily Rhythm Templates</h2>
        </div>
        <p className="text-muted-foreground mb-6">
          Not every day is the same. Your energy fluctuates — and your expectations need to flex with it. Here are three templates for three different kinds of days.
        </p>

        {Object.values(dailyRhythms).map((rhythm, idx) => (
          <div key={idx} className="mb-6 last:mb-0">
            <div className="bg-secondary/30 rounded-2xl p-5">
              <h3 className="text-lg font-medium text-foreground mb-1">{rhythm.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 italic">{rhythm.subtitle}</p>
              <ul className="space-y-2">
                {rhythm.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                    <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Partner & Family Communication */}
      <div className="bg-card rounded-3xl p-8 md:p-10 shadow-sm border border-border">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Users className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-medium text-foreground">Communicating with Your Family</h2>
        </div>

        <div className="space-y-4">
          <div className="bg-primary/5 rounded-2xl p-5 border border-primary/10">
            <h3 className="font-medium text-foreground mb-2">How to Explain Your Brain to Your Partner</h3>
            <p className="text-sm text-muted-foreground mb-3">Use this as a starting point for the conversation:</p>
            <div className="bg-card rounded-xl p-4 border border-border text-sm text-foreground/90 leading-relaxed">
              &quot;I want to explain something about how my brain works, because I think it will help us both. When I forget things, or can&apos;t start tasks, or get overwhelmed by noise — it&apos;s not because I don&apos;t care or I&apos;m not trying. My brain has a genuine difference in how it processes information, manages time, and handles sensory input. I&apos;m not asking you to fix it. I&apos;m asking you to understand it, so we can build systems together instead of me feeling like I&apos;m constantly failing at something everyone else finds easy.&quot;
            </div>
          </div>

          <div className="bg-primary/5 rounded-2xl p-5 border border-primary/10">
            <h3 className="font-medium text-foreground mb-2">What Your Kids Need to Know (Age-Appropriate)</h3>
            <div className="space-y-3 mt-3">
              <div className="bg-card rounded-xl p-4 border border-border">
                <p className="text-xs text-muted-foreground mb-1 font-medium">Ages 3-6:</p>
                <p className="text-sm text-foreground/90">&quot;Mama&apos;s brain works a little differently. Sometimes I need quiet time so my brain can rest. It&apos;s not because of you — I always love you. My brain just gets tired sometimes.&quot;</p>
              </div>
              <div className="bg-card rounded-xl p-4 border border-border">
                <p className="text-xs text-muted-foreground mb-1 font-medium">Ages 7-12:</p>
                <p className="text-sm text-foreground/90">&quot;You know how some people need glasses to see clearly? My brain needs extra help to remember things and stay organized. That&apos;s why we use the calendar and the checklists. It&apos;s not a bad thing — it&apos;s just how my brain is wired. And sometimes when I get overwhelmed, I need a few minutes to reset. It&apos;s never about you.&quot;</p>
              </div>
              <div className="bg-card rounded-xl p-4 border border-border">
                <p className="text-xs text-muted-foreground mb-1 font-medium">Teens:</p>
                <p className="text-sm text-foreground/90">&quot;I have ADHD, which means my executive function — the part of the brain that manages time, organization, and emotional regulation — works differently. Sometimes I&apos;ll forget things or react more strongly than the situation warrants. I&apos;m working on it, and I want you to know it&apos;s okay to call me on it. I&apos;d rather you tell me honestly than hold it in.&quot;</p>
              </div>
            </div>
          </div>

          <div className="bg-primary/5 rounded-2xl p-5 border border-primary/10">
            <h3 className="font-medium text-foreground mb-2">Boundary Scripts for Unsolicited Advice</h3>
            <div className="space-y-2 mt-3">
              <div className="bg-card rounded-xl p-3 border border-border">
                <p className="text-sm text-foreground/90">&quot;I appreciate you trying to help. I&apos;ve actually found that what works for most people doesn&apos;t work for my brain. I&apos;m figuring out my own approach.&quot;</p>
              </div>
              <div className="bg-card rounded-xl p-3 border border-border">
                <p className="text-sm text-foreground/90">&quot;I know it looks like I&apos;m not trying. I promise you I am — it just looks different from the outside than it feels on the inside.&quot;</p>
              </div>
              <div className="bg-card rounded-xl p-3 border border-border">
                <p className="text-sm text-foreground/90">&quot;I don&apos;t need advice right now. I need you to trust that I&apos;m doing my best with the brain I have.&quot;</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Signs You're Already Doing Better Than You Think */}
      <div className="bg-card rounded-3xl p-8 md:p-10 shadow-sm border border-border">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Star className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-medium text-foreground">Signs You&apos;re Already Doing Better Than You Think</h2>
        </div>
        <p className="text-muted-foreground mb-6">
          Your brain focuses on what&apos;s going wrong. Here&apos;s what&apos;s actually going right — even if you can&apos;t see it yet:
        </p>
        <div className="space-y-3">
          {[
            "You took this assessment. That means you're actively trying to understand yourself and be better for your kids.",
            "Your children are alive, fed, and loved. On the hardest days, that IS enough.",
            "You repair after ruptures. Many parents never learn to do this. Your kids are learning that relationships can heal.",
            "You're aware of your patterns. Awareness is the first step to change — and you're already there.",
            "You haven't given up. Despite the exhaustion, the shame, and the feeling of falling short — you're still here, still trying.",
            "Your kids have a parent who models imperfection and resilience. That's more valuable than a parent who models impossible standards.",
            "You're seeking tools instead of just blaming yourself. That's a fundamental mindset shift that many people never make.",
          ].map((sign, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 bg-secondary/20 rounded-xl">
              <span className="text-primary mt-0.5 flex-shrink-0">✓</span>
              <p className="text-sm text-foreground/80 leading-relaxed">{sign}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Permission Slips */}
      <div className="bg-card rounded-3xl p-8 md:p-10 shadow-sm border border-border">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <FileText className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-medium text-foreground">Your Permission Slips</h2>
        </div>
        <p className="text-muted-foreground mb-6">
          Things you are officially allowed to let go of. Cut these out mentally and tape them to your mirror:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            "Permission to serve cereal for dinner",
            "Permission to say no to volunteering",
            "Permission to let the laundry pile exist",
            "Permission to use screens as a tool",
            "Permission to arrive late without spiraling",
            "Permission to ask for help without shame",
            "Permission to have a messy house",
            "Permission to not enjoy every moment",
            "Permission to need time alone",
            "Permission to be a 'good enough' parent",
            "Permission to cry in the car",
            "Permission to lower the bar on hard days",
          ].map((permission, idx) => (
            <div key={idx} className="bg-primary/5 rounded-xl p-3 border border-primary/10 text-center">
              <p className="text-sm text-foreground/90 font-medium">{permission}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Resources & Next Steps */}
      <div className="bg-card rounded-3xl p-8 md:p-10 shadow-sm border border-border">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Shield className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-medium text-foreground">Your Next Steps</h2>
        </div>
        <div className="space-y-4">
          <div className="bg-secondary/30 rounded-2xl p-5">
            <h3 className="font-medium text-foreground mb-2 flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              Body Doubling Communities
            </h3>
            <p className="text-sm text-muted-foreground">Join virtual co-working sessions designed for neurodivergent parents. Fold laundry together on camera. Do admin together on FaceTime. It sounds strange — it works because your brain activates with parallel presence.</p>
          </div>
          <div className="bg-secondary/30 rounded-2xl p-5">
            <h3 className="font-medium text-foreground mb-2 flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-primary" />
              ADHD Parent Support Groups
            </h3>
            <p className="text-sm text-muted-foreground">Connect with other mothers who understand the specific exhaustion of parenting with executive function challenges. Look for groups specifically for ADHD parents — general parenting groups can sometimes increase comparison and shame.</p>
          </div>
          <div className="bg-secondary/30 rounded-2xl p-5">
            <h3 className="font-medium text-foreground mb-2 flex items-center gap-2">
              <Brain className="w-4 h-4 text-primary" />
              ADHD-Informed Professional Support
            </h3>
            <p className="text-sm text-muted-foreground">If these patterns feel overwhelming, consider an ADHD-informed therapist or coach. Look for someone who specializes in adult ADHD AND understands the parenting context. General therapists who say &quot;just make a list&quot; will not help. You need someone who gets it.</p>
          </div>
          <div className="bg-secondary/30 rounded-2xl p-5">
            <h3 className="font-medium text-foreground mb-2 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" />
              If You Haven&apos;t Been Formally Assessed
            </h3>
            <p className="text-sm text-muted-foreground">If you resonated deeply with this assessment but don&apos;t have a formal ADHD diagnosis, consider pursuing one. Late diagnosis (especially in women) is incredibly common — the average age of diagnosis for women is 36-39. A diagnosis opens doors to medication, accommodations, and self-understanding that can be transformative.</p>
          </div>
        </div>
      </div>

      {/* Closing Affirmation */}
      <div className="bg-primary/5 rounded-3xl p-8 md:p-10 border border-primary/10 text-center">
        <Heart className="w-8 h-8 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-medium text-foreground mb-4">
          One Last Thing
        </h2>
        <p className="text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed mb-4">
          The fact that you took this assessment — that you&apos;re looking for answers, that you&apos;re trying to understand yourself better as a parent — that IS the love. Your kids don&apos;t need a perfect mom. They need a mom who keeps showing up. And you&apos;re here.
        </p>
        <p className="text-foreground/70 text-sm max-w-md mx-auto">
          Come back to this report whenever you need it. On the hard days especially. It&apos;ll still be here.
        </p>
      </div>

      {/* Disclaimer */}
      <footer className="text-center py-8 px-4">
        <p className="text-sm text-muted-foreground/70 max-w-2xl mx-auto leading-relaxed">
          This assessment is for self-reflection and educational purposes only. It is not a diagnostic tool and does not replace professional evaluation for ADHD or any other condition. If you suspect you have ADHD, please consult with a qualified healthcare provider. Strategies provided are informed by current research on executive function and neurodivergent parenting but individual results may vary.
        </p>
      </footer>
    </div>
  )
}
