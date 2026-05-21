"use client"

import { useState, useCallback, useEffect } from "react"
import { track } from "@vercel/analytics"
import { ProgressBar } from "@/components/assessment/progress-bar"
import { QuestionCard } from "@/components/assessment/question-card"
import { Paywall } from "@/components/assessment/paywall"
import { ResultsReport } from "@/components/assessment/results-report"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

type AssessmentStep = "intro" | "questions" | "paywall" | "results"

const questions = [
  // Section 1: The Morning Rush Audit (5 questions)
  {
    id: 1,
    section: "The Morning Rush Audit",
    question: "What does a typical school morning look like in your house?",
    description: "Be honest — there's no wrong answer here. We're mapping where the friction lives.",
    options: [
      { id: "smooth", label: "Mostly smooth — we have a rhythm that works for us", score: 1 },
      { id: "minor-chaos", label: "A few hiccups — someone can't find shoes or forgets their bag", score: 2 },
      { id: "daily-battle", label: "It's a daily battle — yelling, rushing, and leaving things behind", score: 3 },
      { id: "survival", label: "Pure survival mode — I often feel defeated before 8am", score: 4 },
    ],
  },
  {
    id: 2,
    section: "The Morning Rush Audit",
    question: "When you need to get your child out the door, what's the hardest part?",
    description: "Think about where you lose the most time or energy.",
    options: [
      { id: "transitions", label: "Transitions — getting them to stop one thing and start another", score: 3 },
      { id: "remembering", label: "Remembering everything — lunches, forms, water bottles, the mental checklist", score: 4 },
      { id: "my-readiness", label: "Getting myself ready while also managing them", score: 3 },
      { id: "emotional", label: "Emotional meltdowns — theirs or mine — that derail the timeline", score: 4 },
    ],
  },
  {
    id: 3,
    section: "The Morning Rush Audit",
    question: "How accurate is your sense of how long things take in the morning?",
    description: "Time blindness is one of the most misunderstood aspects of ADHD. This isn't laziness — it's neurology.",
    options: [
      { id: "accurate", label: "Pretty accurate — I can estimate and plan realistically", score: 1 },
      { id: "slightly-off", label: "Slightly off — I underestimate by 5-10 minutes regularly", score: 2 },
      { id: "way-off", label: "Way off — I genuinely believe I can do 45 minutes of tasks in 15 minutes", score: 3 },
      { id: "no-sense", label: "I have almost no internal sense of time passing — it shocks me every morning", score: 4 },
    ],
  },
  {
    id: 4,
    section: "The Morning Rush Audit",
    question: "What happens when an unexpected disruption hits your morning routine?",
    description: "A spilled breakfast, a missing permission slip, a child who suddenly 'feels sick.'",
    options: [
      { id: "adapt", label: "I adapt — it's annoying but I can pivot without losing the whole morning", score: 1 },
      { id: "rattled", label: "I get rattled but push through — we're late but we make it", score: 2 },
      { id: "cascade", label: "It cascades — one disruption collapses the entire plan", score: 3 },
      { id: "freeze", label: "I freeze or shut down — my brain can't recalculate in real time", score: 4 },
    ],
  },
  {
    id: 5,
    section: "The Morning Rush Audit",
    question: "How often are you the reason your family is running late?",
    description: "Not because you don't care. Because getting yourself ready while managing others is a massive executive function demand.",
    options: [
      { id: "rarely", label: "Rarely — I'm usually ready before the kids", score: 1 },
      { id: "sometimes", label: "Sometimes — I lose track of time in the shower or getting dressed", score: 2 },
      { id: "often", label: "Often — I can't seem to get myself together AND manage them simultaneously", score: 3 },
      { id: "almost-always", label: "Almost always — I'm the bottleneck and I hate it", score: 4 },
    ],
  },

  // Section 2: The Invisible Mental Load (5 questions)
  {
    id: 6,
    section: "The Invisible Mental Load",
    question: "How often do you lie awake thinking about things you forgot to do?",
    description: "The permission slips, the birthday party RSVPs, the dentist appointment you meant to book three weeks ago.",
    options: [
      { id: "rarely", label: "Rarely — I have systems that catch most things", score: 1 },
      { id: "weekly", label: "A few times a week — things slip through but I recover", score: 2 },
      { id: "most-nights", label: "Most nights — my brain won't stop running the to-do list", score: 3 },
      { id: "constant", label: "It's constant — I feel like I'm always dropping balls", score: 4 },
    ],
  },
  {
    id: 7,
    section: "The Invisible Mental Load",
    question: "When something isn't physically visible to you (a calendar event, a chore, a task), what happens?",
    description: "This is about how your brain handles 'out of sight' information.",
    options: [
      { id: "remember", label: "I usually remember — it stays in my mental queue", score: 1 },
      { id: "sometimes-forget", label: "I sometimes forget but catch it eventually", score: 2 },
      { id: "often-gone", label: "If it's not in front of me, it basically doesn't exist", score: 3 },
      { id: "completely-gone", label: "I've missed important things because they weren't visible — repeatedly", score: 4 },
    ],
  },
  {
    id: 8,
    section: "The Invisible Mental Load",
    question: "How do you handle the 'admin' of parenting — forms, emails from school, scheduling appointments?",
    description: "The invisible labor that no one sees but everyone expects you to manage.",
    options: [
      { id: "on-top", label: "I stay on top of it — I process these as they come in", score: 1 },
      { id: "batches", label: "I let them pile up and handle them in panicked batches", score: 2 },
      { id: "avoidance", label: "I avoid them until there are consequences — late fees, missed deadlines", score: 3 },
      { id: "drowning", label: "I'm drowning in it — the pile feels so big I don't know where to start", score: 4 },
    ],
  },
  {
    id: 9,
    section: "The Invisible Mental Load",
    question: "Does your partner or co-parent understand the mental load you carry?",
    description: "This isn't about blame. It's about whether the invisible work is seen.",
    options: [
      { id: "yes-shared", label: "Yes — we share the mental load fairly equally", score: 1 },
      { id: "tries", label: "They try, but I still carry most of the 'remembering' work", score: 2 },
      { id: "no-idea", label: "They have no idea how much I'm tracking — and it's exhausting", score: 3 },
      { id: "solo", label: "I'm doing this alone — there's no one to share it with", score: 4 },
    ],
  },
  {
    id: 10,
    section: "The Invisible Mental Load",
    question: "How often do you forget something important for your child — a costume day, a field trip form, a pickup time change?",
    description: "This isn't a measure of how much you love them. It's a measure of working memory capacity.",
    options: [
      { id: "very-rarely", label: "Very rarely — maybe once or twice a year", score: 1 },
      { id: "occasionally", label: "Occasionally — a few times a term", score: 2 },
      { id: "regularly", label: "Regularly — it happens multiple times a month", score: 3 },
      { id: "constantly", label: "Constantly — and the shame each time is crushing", score: 4 },
    ],
  },

  // Section 3: Sensory Overload Profile (5 questions)
  {
    id: 11,
    section: "Your Sensory Overload Profile",
    question: "When your kids are loud, touching you, and asking questions all at once — what happens in your body?",
    description: "There's no judgment here. This is about understanding your nervous system, not your character.",
    options: [
      { id: "manage", label: "I can manage it — I feel stimulated but stay regulated", score: 1 },
      { id: "tense", label: "I get tense and need to take a breath, but I hold it together", score: 2 },
      { id: "snap", label: "I snap or raise my voice, then feel terrible about it", score: 3 },
      { id: "shutdown", label: "I shut down completely or have to physically leave the room", score: 4 },
    ],
  },
  {
    id: 12,
    section: "Your Sensory Overload Profile",
    question: "How do you feel about being physically touched by your children at the end of a long day?",
    description: "Being 'touched out' is a real neurological state, not a sign of being cold or unloving.",
    options: [
      { id: "welcome", label: "I welcome it — physical affection recharges me", score: 1 },
      { id: "neutral", label: "It's fine — I don't mind but don't seek it out", score: 2 },
      { id: "uncomfortable", label: "I feel uncomfortable but push through because of guilt", score: 3 },
      { id: "cant-bear", label: "I physically cannot bear it — my skin crawls and I need to escape", score: 4 },
    ],
  },
  {
    id: 13,
    section: "Your Sensory Overload Profile",
    question: "What's your relationship with background noise — TV, kids playing, multiple conversations?",
    description: "ADHD brains often struggle to filter sensory input. What feels normal to others can feel like an assault.",
    options: [
      { id: "fine", label: "It's fine — I can tune things out when I need to", score: 1 },
      { id: "distracting", label: "It's distracting but manageable — I just can't think clearly", score: 2 },
      { id: "agitating", label: "It builds up until I'm agitated and snappy without knowing why", score: 3 },
      { id: "unbearable", label: "It becomes physically unbearable — I need silence or I'll explode", score: 4 },
    ],
  },
  {
    id: 14,
    section: "Your Sensory Overload Profile",
    question: "After a long day of parenting, what does your evening look like?",
    description: "Think about what you need versus what you actually get.",
    options: [
      { id: "recharge", label: "I have time to recharge and feel ready for the next day", score: 1 },
      { id: "tired-ok", label: "I'm tired but can still handle bedtime routines", score: 2 },
      { id: "depleted", label: "I'm so depleted I can barely function — screens become the babysitter", score: 3 },
      { id: "guilt-spiral", label: "I'm exhausted AND spiraling in guilt about how the day went", score: 4 },
    ],
  },
  {
    id: 15,
    section: "Your Sensory Overload Profile",
    question: "How do you handle environments like grocery stores, birthday parties, or school events with your kids?",
    description: "Places with noise, crowds, fluorescent lights, and the pressure to perform as a 'together' parent.",
    options: [
      { id: "enjoy", label: "I mostly enjoy them — they're tiring but fun", score: 1 },
      { id: "tolerate", label: "I tolerate them but need recovery time after", score: 2 },
      { id: "dread", label: "I dread them — I often feel overwhelmed or dissociated during", score: 3 },
      { id: "avoid", label: "I avoid them whenever possible — the sensory cost is too high", score: 4 },
    ],
  },

  // Section 4: The Shame & Repair Cycle (5 questions)
  {
    id: 16,
    section: "The Shame & Repair Cycle",
    question: "How often do you feel like you're failing as a parent — even when you're trying your hardest?",
    description: "This feeling is incredibly common among neurodivergent mothers. You're not alone in this.",
    options: [
      { id: "rarely", label: "Rarely — I know I'm doing my best and that's enough", score: 1 },
      { id: "sometimes", label: "Sometimes — bad days trigger it but I can bounce back", score: 2 },
      { id: "often", label: "Often — I compare myself to other moms and always fall short", score: 3 },
      { id: "daily", label: "Almost daily — the shame feels like a constant companion", score: 4 },
    ],
  },
  {
    id: 17,
    section: "The Shame & Repair Cycle",
    question: "When you lose your patience with your child, what happens next?",
    description: "The repair matters more than the rupture. Let's understand your pattern.",
    options: [
      { id: "repair-quickly", label: "I apologize and reconnect — we move on together", score: 1 },
      { id: "repair-delayed", label: "I feel bad for a while, then eventually repair", score: 2 },
      { id: "guilt-spiral", label: "I spiral into guilt and overcompensate — treats, extra screen time", score: 3 },
      { id: "avoid", label: "I shut down and avoid the conversation — the guilt is too heavy", score: 4 },
    ],
  },
  {
    id: 18,
    section: "The Shame & Repair Cycle",
    question: "How do you talk to yourself after a hard parenting moment?",
    description: "The voice in your head matters. What does yours sound like?",
    options: [
      { id: "compassionate", label: "I'm gentle with myself — 'That was hard, but I'll try again tomorrow'", score: 1 },
      { id: "mixed", label: "Mixed — I know I should be kind to myself but the criticism creeps in", score: 2 },
      { id: "harsh", label: "Harsh — 'You're a terrible mother. Your kids deserve better.'", score: 3 },
      { id: "devastating", label: "Devastating — I spiral for hours or days, replaying what I did wrong", score: 4 },
    ],
  },
  {
    id: 19,
    section: "The Shame & Repair Cycle",
    question: "Do you hide your struggles from other parents?",
    description: "The performance of 'having it together' is exhausting on top of everything else.",
    options: [
      { id: "open", label: "No — I'm open about my challenges and have supportive people around me", score: 1 },
      { id: "selective", label: "I share with a few trusted people but mask around most", score: 2 },
      { id: "hide-most", label: "I hide most of it — I'm terrified of being judged", score: 3 },
      { id: "total-mask", label: "I mask completely — no one knows how much I'm struggling", score: 4 },
    ],
  },
  {
    id: 20,
    section: "The Shame & Repair Cycle",
    question: "When you see other moms who seem to 'have it together,' what do you feel?",
    description: "Comparison is the thief of joy — but it's also an ADHD trap because we can't see their internal experience.",
    options: [
      { id: "neutral", label: "Neutral — I know everyone has their own struggles", score: 1 },
      { id: "mild-envy", label: "A twinge of envy, but I can redirect my thinking", score: 2 },
      { id: "inadequate", label: "Deep inadequacy — what's wrong with me that I can't do what they do?", score: 3 },
      { id: "broken", label: "Like I'm fundamentally broken — like I'm missing something everyone else has", score: 4 },
    ],
  },

  // Section 5: Your Organization Style (5 questions)
  {
    id: 21,
    section: "Your Organization Style",
    question: "Which statement best describes your relationship with organization systems?",
    description: "Planners, apps, routines — how do they work for you?",
    options: [
      { id: "works", label: "I have a system that works — it took time but I found my groove", score: 1 },
      { id: "start-strong", label: "I start strong with new systems but abandon them within weeks", score: 3 },
      { id: "nt-systems", label: "I've tried everything 'normal' moms use and none of it sticks", score: 4 },
      { id: "no-system", label: "I've given up on systems — I just react to whatever's in front of me", score: 4 },
    ],
  },
  {
    id: 22,
    section: "Your Organization Style",
    question: "When you think about meal planning, household chores, and keeping the house running — how does it feel?",
    description: "Not what you think you should feel. What you actually feel.",
    options: [
      { id: "manageable", label: "Manageable — I have routines that carry me through", score: 1 },
      { id: "overwhelming", label: "Overwhelming — the sheer number of decisions exhausts me", score: 3 },
      { id: "paralyzed", label: "Paralyzing — I know what needs doing but can't start", score: 4 },
      { id: "invisible", label: "Invisible — I don't notice things need doing until it's a crisis", score: 3 },
    ],
  },
  {
    id: 23,
    section: "Your Organization Style",
    question: "How do you handle tasks that are boring but necessary — laundry, dishes, tidying up?",
    description: "ADHD brains need stimulation to activate. Boring tasks are neurologically harder for you, not morally harder.",
    options: [
      { id: "just-do", label: "I just do them — they're not fun but I get through them", score: 1 },
      { id: "need-tricks", label: "I need tricks — music, podcasts, or a reward to get started", score: 2 },
      { id: "avoid-until-crisis", label: "I avoid them until the mess becomes a crisis, then panic-clean", score: 3 },
      { id: "cant-start", label: "I physically cannot make myself start — even when I'm staring at the mess", score: 4 },
    ],
  },
  {
    id: 24,
    section: "Your Organization Style",
    question: "What does the inside of your home look like right now — honestly?",
    description: "No shame. We're understanding your environment, not grading it.",
    options: [
      { id: "tidy", label: "Reasonably tidy — there's a place for most things", score: 1 },
      { id: "lived-in", label: "Lived-in — some clutter but functional", score: 2 },
      { id: "piles", label: "Piles everywhere — I know where things are in the chaos but others wouldn't", score: 3 },
      { id: "overwhelming", label: "Overwhelming — the clutter stresses me out but I can't seem to tackle it", score: 4 },
    ],
  },
  {
    id: 25,
    section: "Your Organization Style",
    question: "How do you feel about asking for help with household management?",
    description: "Delegating is a skill — and for many ADHD moms, it comes with complicated feelings.",
    options: [
      { id: "comfortable", label: "Comfortable — I delegate and accept help without guilt", score: 1 },
      { id: "working-on-it", label: "I'm working on it — I know I need help but it's hard to ask", score: 2 },
      { id: "guilty", label: "Guilty — I feel like I should be able to handle this myself", score: 3 },
      { id: "impossible", label: "Impossible — asking for help feels like admitting I'm failing", score: 4 },
    ],
  },
]

// Get unique sections in order
const sections = [...new Set(questions.map(q => q.section))]

const STORAGE_KEY = "adhd-parent-assessment"

function saveProgress(step: number, answers: Record<number, string>, assessmentStep: AssessmentStep) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ step, answers, assessmentStep, timestamp: Date.now() }))
  } catch {}
}

function loadProgress(): { step: number; answers: Record<number, string>; assessmentStep: AssessmentStep } | null {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) return null
    const parsed = JSON.parse(data)
    // Expire after 24 hours
    if (Date.now() - parsed.timestamp > 24 * 60 * 60 * 1000) {
      localStorage.removeItem(STORAGE_KEY)
      return null
    }
    return parsed
  } catch {
    return null
  }
}

function clearProgress() {
  try { localStorage.removeItem(STORAGE_KEY) } catch {}
}

export default function AssessmentPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [assessmentStep, setAssessmentStep] = useState<AssessmentStep>("intro")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [showSectionTransition, setShowSectionTransition] = useState(false)
  const [nextSectionName, setNextSectionName] = useState("")
  const [email, setEmail] = useState("")
  const [hasRestoredProgress, setHasRestoredProgress] = useState(false)

  // Restore progress from localStorage
  useEffect(() => {
    const saved = loadProgress()
    if (saved && saved.assessmentStep === "questions" && Object.keys(saved.answers).length > 0) {
      setCurrentStep(saved.step)
      setAnswers(saved.answers)
      setAssessmentStep(saved.assessmentStep)
      setHasRestoredProgress(true)
    }
  }, [])

  // Save progress on changes
  useEffect(() => {
    if (assessmentStep === "questions") {
      saveProgress(currentStep, answers, assessmentStep)
    }
  }, [currentStep, answers, assessmentStep])

  const currentQuestion = questions[currentStep - 1]
  const totalSteps = questions.length
  const isFirstQuestion = currentStep === 1
  const isLastQuestion = currentStep === totalSteps
  const hasAnsweredCurrent = currentQuestion ? answers[currentQuestion.id] !== undefined : false

  // Current section info
  const currentSectionIndex = sections.indexOf(currentQuestion?.section)
  const completedSections = currentSectionIndex

  const handleSelect = useCallback((optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId,
    }))

    // Track the answer
    track("question_answered", {
      question_id: currentQuestion.id,
      question_number: currentStep,
      section: currentQuestion.section,
    })

    // Auto-advance after selection with a brief delay
    setTimeout(() => {
      if (currentStep === totalSteps) {
        track("assessment_completed")
        track("paywall_viewed")
        setAssessmentStep("paywall")
        clearProgress()
        return
      }

      const nextQuestion = questions[currentStep]
      if (nextQuestion && nextQuestion.section !== currentQuestion.section) {
        // Section transition
        track("section_completed", { section: currentQuestion.section })
        setNextSectionName(nextQuestion.section)
        setShowSectionTransition(true)
        setTimeout(() => {
          setShowSectionTransition(false)
          setIsTransitioning(true)
          setTimeout(() => {
            setCurrentStep((prev) => prev + 1)
            setIsTransitioning(false)
          }, 200)
        }, 1500)
      } else {
        setIsTransitioning(true)
        setTimeout(() => {
          setCurrentStep((prev) => prev + 1)
          setIsTransitioning(false)
        }, 400)
      }
    }, 600)
  }, [currentQuestion?.id, currentQuestion?.section, currentStep, totalSteps])

  const goToPreviousQuestion = useCallback(() => {
    if (isFirstQuestion) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentStep((prev) => prev - 1)
      setIsTransitioning(false)
    }, 200)
  }, [isFirstQuestion])

  const handleUnlock = useCallback(() => {
    track("payment_initiated")
    setIsProcessingPayment(true)
    setTimeout(() => {
      setIsProcessingPayment(false)
      track("results_unlocked")
      setAssessmentStep("results")
      clearProgress()
    }, 1500)
  }, [])

  const startAssessment = useCallback(() => {
    track("assessment_started")
    setAssessmentStep("questions")
  }, [])

  const startFresh = useCallback(() => {
    track("assessment_restarted")
    clearProgress()
    setAnswers({})
    setCurrentStep(1)
    setHasRestoredProgress(false)
    setAssessmentStep("questions")
  }, [])

  return (
    <main className="min-h-screen bg-background">
      {/* Persistent Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo2.png" alt="Mindful Mama" className="h-8 w-auto" />
          </div>
          {assessmentStep === "questions" && (
            <div className="flex items-center gap-3">
              {/* Section dots */}
              <div className="flex items-center gap-1.5">
                {sections.map((section, idx) => (
                  <div
                    key={section}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      idx < completedSections
                        ? "bg-primary"
                        : idx === completedSections
                        ? "bg-primary/50 scale-125"
                        : "bg-border"
                    }`}
                    title={section}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                {currentStep}/{totalSteps}
              </span>
            </div>
          )}
          {assessmentStep === "results" && (
            <a
              href="/dashboard"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              My Toolkit
            </a>
          )}
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8 md:py-12">

        {/* Intro View */}
        {assessmentStep === "intro" && (
          <div className="bg-card rounded-3xl p-8 md:p-10 shadow-sm border border-border text-center">
            <div className="mb-6">
              <Image
                src="/logo.png"
                alt="ADHD Parenting Profile"
                width={360}
                height={360}
                className="mx-auto mb-4"
                priority
              />
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                8 minutes · 25 questions · zero judgment
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-medium text-foreground mb-4 text-balance leading-tight">
              Discover Your ADHD Parenting Profile
            </h1>
            <p className="text-lg text-muted-foreground mb-6 max-w-lg mx-auto">
              This isn&apos;t about diagnosing you. It&apos;s about understanding how your brain works as a parent — so you can stop fighting against it and start working with it.
            </p>

            {/* What mothers are saying */}
            <div className="bg-primary/5 rounded-2xl p-4 mb-6 border border-primary/10">
              <p className="text-sm text-foreground/80 italic">
                &quot;This assessment helped me see my parenting challenges through a completely different lens.&quot;
              </p>
              <p className="text-xs text-muted-foreground mt-1">— Illustrative example of user experience</p>
            </div>

            <div className="text-left bg-secondary/50 rounded-2xl p-6 mb-8 space-y-3">
              <p className="text-foreground font-medium">This assessment will help you understand:</p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✦</span>
                  Where your morning chaos actually comes from
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✦</span>
                  Your sensory overload triggers and patterns
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✦</span>
                  Why &quot;normal&quot; organization systems don&apos;t work for your brain
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✦</span>
                  How to break the shame spiral with concrete repair tools
                </li>
              </ul>
            </div>

            {hasRestoredProgress ? (
              <div className="space-y-3">
                <Button
                  onClick={startAssessment}
                  size="lg"
                  className="w-full px-8 py-6 text-lg rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                >
                  Continue Where I Left Off
                </Button>
                <Button
                  onClick={startFresh}
                  variant="ghost"
                  className="w-full text-muted-foreground"
                >
                  Start Over
                </Button>
              </div>
            ) : (
              <Button
                onClick={startAssessment}
                size="lg"
                className="px-8 py-6 text-lg rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
              >
                Start My Assessment
              </Button>
            )}

            <p className="text-sm text-muted-foreground mt-4">
              Informed by research on neurodivergent parenting and executive function
            </p>
          </div>
        )}

        {/* Section Transition Overlay */}
        {showSectionTransition && (
          <div className="fixed inset-0 z-40 bg-background/90 backdrop-blur-sm flex items-center justify-center">
            <div className="text-center animate-in fade-in zoom-in-95 duration-300">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-primary text-lg">✓</span>
              </div>
              <p className="text-muted-foreground text-sm mb-1">Section complete</p>
              <h2 className="text-2xl font-medium text-foreground">
                Next: {nextSectionName}
              </h2>
            </div>
          </div>
        )}

        {/* Questions View */}
        {assessmentStep === "questions" && !showSectionTransition && (
          <>
            {/* Section Label */}
            <div className="text-center mb-6">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium tracking-wide uppercase">
                {currentQuestion.section}
              </span>
            </div>

            <div className="mb-8">
              <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
            </div>

            <QuestionCard
              question={currentQuestion.question}
              description={currentQuestion.description}
              options={currentQuestion.options}
              selectedOption={answers[currentQuestion.id]}
              onSelect={handleSelect}
              isTransitioning={isTransitioning}
            />

            <div className="flex justify-between items-center mt-8">
              <Button
                variant="ghost"
                onClick={goToPreviousQuestion}
                disabled={isFirstQuestion}
                className="rounded-xl text-muted-foreground hover:text-foreground"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
              </Button>

              <span className="text-xs text-muted-foreground">
                {hasAnsweredCurrent ? "Tap an answer to continue" : ""}
              </span>
            </div>
          </>
        )}

        {/* Paywall View */}
        {assessmentStep === "paywall" && (
          <Paywall onUnlock={handleUnlock} isLoading={isProcessingPayment} />
        )}

        {/* Results View */}
        {assessmentStep === "results" && (
          <ResultsReport answers={answers} questions={questions} />
        )}
      </div>
    </main>
  )
}
