"use client"

import { Check, Brain, Clock, Volume2, Heart, Layout, Lightbulb, Users, Calendar, MessageCircle } from "lucide-react"

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

// Strategy data organized by section
const sectionStrategies: Record<string, {
  icon: React.ReactNode
  lowTitle: string
  lowDescription: string
  highTitle: string
  highDescription: string
  strategies: { title: string; description: string; type: "low" | "high" | "both" }[]
}> = {
  "The Morning Rush Audit": {
    icon: <Clock className="w-5 h-5" />,
    lowTitle: "Your mornings have a rhythm",
    lowDescription: "You've found some structure that works. Here are ways to protect and strengthen it.",
    highTitle: "Your mornings are in survival mode",
    highDescription: "The chaos isn't because you're not trying hard enough. Your executive function is being asked to do too many things simultaneously. Here's how to externalize the load.",
    strategies: [
      {
        title: "The Launch Pad",
        description: "Create a physical station by the door with hooks, a bin for bags, and a visual checklist. Everything needed to leave the house lives in ONE place. When it's visible, it exists in your brain.",
        type: "high",
      },
      {
        title: "Backward Time Blocking",
        description: "Set your departure time, then work backward in 5-minute blocks. Put each block on a visual timer your kids can see too. This externalizes time — which ADHD brains notoriously struggle to feel.",
        type: "high",
      },
      {
        title: "The Night-Before Reset",
        description: "Spend 10 minutes each evening (with a timer — not 'when you remember') setting out clothes, packing bags, and signing forms. Morning-you will thank evening-you.",
        type: "both",
      },
      {
        title: "Reduce Decision Points",
        description: "Monday is always pasta. Shoes live on the mat. Backpacks get packed right after homework. Every decision you eliminate is cognitive load you reclaim.",
        type: "high",
      },
    ],
  },
  "The Invisible Mental Load": {
    icon: <Brain className="w-5 h-5" />,
    lowTitle: "You've found ways to externalize your memory",
    lowDescription: "Your systems are catching most things. Here's how to make them even more resilient.",
    highTitle: "Your working memory is overloaded",
    highDescription: "You're not forgetful because you don't care. Your working memory has a smaller 'desktop' than neurotypical brains — and parenting demands an enormous amount of RAM. The solution isn't 'try harder to remember.' It's to stop relying on memory entirely.",
    strategies: [
      {
        title: "The Giant Wall Calendar",
        description: "Not a phone app — a physical, impossible-to-ignore wall calendar in your most-trafficked room. Color-code by family member. If you can't see it, it doesn't exist. Make it exist.",
        type: "high",
      },
      {
        title: "The Capture Tool",
        description: "Keep ONE place (a notes app, a small notebook in your pocket) where every thought, task, and reminder goes immediately. Don't organize it — just capture it. Process it once a day during a set 'brain dump' time.",
        type: "high",
      },
      {
        title: "Phone Reminders for Everything",
        description: "Not just appointments. Remind yourself to check the backpack. Remind yourself it's picture day. Remind yourself to eat lunch. There is no shame in needing external prompts — it's a tool, not a crutch.",
        type: "both",
      },
      {
        title: "The Weekly Reset Ritual",
        description: "Pick one time each week (Sunday evening, Monday morning) to review the upcoming week. 15 minutes with a cup of tea. Look at the calendar, check school emails, prep what you can. Body doubling with a friend on FaceTime makes this easier.",
        type: "both",
      },
    ],
  },
  "Your Sensory Overload Profile": {
    icon: <Volume2 className="w-5 h-5" />,
    lowTitle: "Your nervous system has good regulation",
    lowDescription: "You're managing sensory input well. Here are tools to maintain that during high-stress periods.",
    highTitle: "Your nervous system is running on empty",
    highDescription: "When you snap at your kids, it's not a character flaw — it's a dysregulated nervous system that has hit capacity. The noise, the touching, the constant questions — they're not just annoying, they're physically overwhelming for your brain. You need permission to protect your sensory boundaries.",
    strategies: [
      {
        title: "The Sensory Break",
        description: "When you feel the snap coming, say: 'Mama needs 2 minutes of quiet.' Go to the bathroom. Run cold water on your wrists. Take 5 deep breaths. This isn't abandonment — it's modeling self-regulation for your children.",
        type: "high",
      },
      {
        title: "Noise-Reducing Earbuds",
        description: "Loop or Calmer earbuds reduce decibel levels without blocking your kids' voices entirely. You can still hear them — it just takes the sharp edge off. Many ADHD moms call these life-changing.",
        type: "high",
      },
      {
        title: "The 'Touched Out' Protocol",
        description: "When you're touched out, it's okay to say: 'I love you AND my body needs space right now. Can we do side-by-side time instead?' Offer alternatives: sitting next to each other, a hand on their back instead of a full hug.",
        type: "high",
      },
      {
        title: "Energy Accounting",
        description: "Track your energy like a bank account. High-sensory activities (grocery store with kids, birthday parties) are big withdrawals. Build in deposits: 10 minutes alone in the car before going inside, noise-canceling headphones during chores.",
        type: "both",
      },
    ],
  },
  "The Shame & Repair Cycle": {
    icon: <Heart className="w-5 h-5" />,
    lowTitle: "You've built a healthy repair practice",
    lowDescription: "Your ability to reconnect after ruptures is a strength. Here's how to deepen that.",
    highTitle: "The guilt is eating you alive",
    highDescription: "Here's what the research actually says: it's not the rupture that damages the relationship — it's the lack of repair. And the fact that you feel guilty? That means you care deeply. Now let's turn that guilt into something productive.",
    strategies: [
      {
        title: "The Repair Script",
        description: "After you lose your cool, come back and say: 'I'm sorry I yelled. That wasn't okay. You didn't deserve that. I was feeling overwhelmed and I handled it badly. I'm working on it, and I love you.' That's it. Simple, honest, no excuses.",
        type: "high",
      },
      {
        title: "The 'Good Enough' Reframe",
        description: "You don't need to be a perfect parent. Research shows children need a 'good enough' parent — one who repairs, who shows up imperfectly, who models that mistakes are human. You are already doing this.",
        type: "both",
      },
      {
        title: "The Guilt Journal",
        description: "When shame spirals hit, write down: What happened → What I was feeling → What I needed → What I'll try next time. This moves you from 'I'm terrible' to 'I'm learning.' It's not a failure log — it's a growth map.",
        type: "high",
      },
      {
        title: "Separate Behavior from Identity",
        description: "You yelled. That's a behavior. It doesn't make you a bad mother. Bad mothers don't lie awake worrying about whether they're bad mothers. The worry itself is proof of your love.",
        type: "both",
      },
    ],
  },
  "Your Organization Style": {
    icon: <Layout className="w-5 h-5" />,
    lowTitle: "You've found systems that fit your brain",
    lowDescription: "You've adapted organization to work for you. Here's how to make it sustainable long-term.",
    highTitle: "Neurotypical systems are failing you",
    highDescription: "You haven't failed at organization. Organization systems have failed YOU. They were designed for brains that work differently than yours. The answer isn't more discipline — it's different architecture.",
    strategies: [
      {
        title: "Visual Everything",
        description: "Clear bins instead of drawers. Open shelving instead of closed cabinets. Labels with pictures for kids' stuff. If you can see it, you can manage it. Hidden = forgotten.",
        type: "high",
      },
      {
        title: "The 'Good Enough' Clean",
        description: "On low-energy days, the goal is: dishes in the sink (not washed), clothes in the hamper (not folded), kids fed (not gourmet). Lower the bar on hard days. Raise it on good days. This is energy management, not laziness.",
        type: "high",
      },
      {
        title: "Body Doubling for Chores",
        description: "Can't start the dishes? Call a friend and put them on speaker. Join a virtual body doubling session. Put on a podcast. ADHD brains often need parallel stimulation to activate on boring tasks. Use it.",
        type: "high",
      },
      {
        title: "The 'One Thing' Rule",
        description: "When everything feels impossible, ask: 'What is the ONE thing that will make tomorrow easier?' Do that one thing. Not the whole list. Just one. Tomorrow, pick one again. Progress is not linear and that's okay.",
        type: "both",
      },
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

  // Calculate averages
  Object.keys(sectionScores).forEach((section) => {
    const s = sectionScores[section]
    s.average = s.max > 0 ? s.total / (s.max / 4) : 0
  })

  // Overall score (inverted — higher struggle = lower "wellness" score, but we frame it differently)
  const totalScore = Object.values(sectionScores).reduce((sum, s) => sum + s.total, 0)
  const maxPossible = Object.values(sectionScores).reduce((sum, s) => sum + s.max, 0)
  const overallIntensity = maxPossible > 0 ? (totalScore / maxPossible) * 100 : 0

  const getProfileType = () => {
    if (overallIntensity <= 35) return { name: "The Adapting Navigator", description: "You've developed coping strategies that work much of the time. Your challenges are real but manageable, and you have moments of genuine flow in your parenting." }
    if (overallIntensity <= 60) return { name: "The Overwhelmed Warrior", description: "You're fighting hard every day, and it shows in both your exhaustion and your dedication. You need better tools — not more effort." }
    return { name: "The Burnout Survivor", description: "You're running on fumes and the guilt is compounding the exhaustion. You deserve support that meets you where you actually are — not where you think you should be." }
  }

  const profile = getProfileType()

  const getSectionLevel = (section: string): "low" | "high" => {
    const score = sectionScores[section]
    if (!score) return "high"
    return score.average > 2.5 ? "high" : "low"
  }

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
            <strong>Remember:</strong> This profile isn&apos;t a judgment — it&apos;s a map. It shows you where your brain needs the most support right now, so you can stop white-knuckling through parenthood and start building systems that actually work for you.
          </p>
        </div>
      </div>

      {/* Section-by-Section Results */}
      {Object.entries(sectionStrategies).map(([sectionName, section]) => {
        const level = getSectionLevel(sectionName)
        const score = sectionScores[sectionName]
        const relevantStrategies = section.strategies.filter(
          (s) => s.type === "both" || s.type === level
        )

        return (
          <div key={sectionName} className="bg-card rounded-3xl p-8 md:p-10 shadow-sm border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                {section.icon}
              </div>
              <h2 className="text-2xl font-medium text-foreground">{sectionName}</h2>
            </div>

            {/* Score indicator */}
            {score && (
              <div className="mb-4">
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-teal-start to-teal-end rounded-full transition-all duration-500"
                    style={{ width: `${(score.total / score.max) * 100}%` }}
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {level === "high" ? "High support needed" : "Managing well"}
                </p>
              </div>
            )}

            {/* Section interpretation */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-foreground mb-2">
                {level === "high" ? section.highTitle : section.lowTitle}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {level === "high" ? section.highDescription : section.lowDescription}
              </p>
            </div>

            {/* Strategies */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary uppercase tracking-wide">
                  Your Strategies
                </span>
              </div>
              {relevantStrategies.map((strategy, idx) => (
                <div key={idx} className="bg-secondary/30 rounded-2xl p-5">
                  <h4 className="text-lg font-medium text-foreground mb-2">{strategy.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">{strategy.description}</p>
                </div>
              ))}
            </div>
          </div>
        )
      })}

      {/* Additional Resources */}
      <div className="bg-card rounded-3xl p-8 md:p-10 shadow-sm border border-border">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Users className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-medium text-foreground">You Don&apos;t Have to Do This Alone</h2>
        </div>
        <div className="space-y-4">
          <ResourceItem
            icon={<Users className="w-4 h-4" />}
            title="Body Doubling Communities"
            description="Join virtual co-working sessions designed for neurodivergent parents. Fold laundry together on camera. It sounds strange — it works."
          />
          <ResourceItem
            icon={<MessageCircle className="w-4 h-4" />}
            title="ADHD Parent Support Groups"
            description="Connect with other mothers who understand the specific exhaustion of parenting with executive function challenges. No advice-giving — just understanding."
          />
          <ResourceItem
            icon={<Calendar className="w-4 h-4" />}
            title="Consider Professional Support"
            description="If these patterns feel overwhelming, an ADHD-informed therapist or coach can help you build personalized systems. You deserve support that understands your brain."
          />
        </div>
      </div>

      {/* Closing Affirmation */}
      <div className="bg-primary/5 rounded-3xl p-8 md:p-10 border border-primary/10 text-center">
        <Heart className="w-8 h-8 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-medium text-foreground mb-4">
          One Last Thing
        </h2>
        <p className="text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
          The fact that you took this assessment — that you&apos;re looking for answers, that you&apos;re trying to understand yourself better as a parent — that IS the love. Your kids don&apos;t need a perfect mom. They need a mom who keeps showing up. And you&apos;re here.
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

interface ResourceItemProps {
  icon: React.ReactNode
  title: string
  description: string
}

function ResourceItem({ icon, title, description }: ResourceItemProps) {
  return (
    <div className="flex items-start gap-4 p-5 bg-secondary/30 rounded-2xl">
      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 text-primary">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-medium text-foreground mb-1">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
