"use client"

import { useState, useCallback } from "react"
import { ProgressBar } from "@/components/assessment/progress-bar"
import { QuestionCard } from "@/components/assessment/question-card"
import { Paywall } from "@/components/assessment/paywall"
import { ResultsReport } from "@/components/assessment/results-report"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

type AssessmentStep = "intro" | "questions" | "paywall" | "results"

const questions = [
  // Section 1: The Morning Rush Audit
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
  // Section 2: The Invisible Mental Load
  {
    id: 3,
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
    id: 4,
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
  // Section 3: Sensory Overload Profile
  {
    id: 5,
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
    id: 6,
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
  // Section 4: The Shame & Repair Cycle
  {
    id: 7,
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
    id: 8,
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
  // Section 5: Your Organization Style
  {
    id: 9,
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
    id: 10,
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
]

export default function AssessmentPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [assessmentStep, setAssessmentStep] = useState<AssessmentStep>("intro")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)

  const currentQuestion = questions[currentStep - 1]
  const totalSteps = questions.length
  const isFirstQuestion = currentStep === 1
  const isLastQuestion = currentStep === totalSteps
  const hasAnsweredCurrent = currentQuestion ? answers[currentQuestion.id] !== undefined : false

  const handleSelect = useCallback((optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId,
    }))
  }, [currentQuestion?.id])

  const goToNextQuestion = useCallback(() => {
    if (isLastQuestion) {
      setAssessmentStep("paywall")
      return
    }

    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentStep((prev) => prev + 1)
      setIsTransitioning(false)
    }, 200)
  }, [isLastQuestion])

  const goToPreviousQuestion = useCallback(() => {
    if (isFirstQuestion) return

    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentStep((prev) => prev - 1)
      setIsTransitioning(false)
    }, 200)
  }, [isFirstQuestion])

  const handleUnlock = useCallback(() => {
    setIsProcessingPayment(true)
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessingPayment(false)
      setAssessmentStep("results")
    }, 1500)
  }, [])

  const startAssessment = useCallback(() => {
    setAssessmentStep("questions")
  }, [])

  // Calculate scores by section for results
  const calculateScores = () => {
    const sections: Record<string, { total: number; count: number }> = {}
    questions.forEach((q) => {
      if (!sections[q.section]) sections[q.section] = { total: 0, count: 0 }
      const answer = answers[q.id]
      if (answer) {
        const option = q.options.find((o) => o.id === answer)
        if (option) {
          sections[q.section].total += option.score
          sections[q.section].count += 1
        }
      }
    })
    return sections
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-8 md:py-12">
        {/* Intro View */}
        {assessmentStep === "intro" && (
          <div className="bg-card rounded-3xl p-8 md:p-10 shadow-sm border border-border text-center">
            <div className="mb-6">
              <Image
                src="/logo.png"
                alt="ADHD Parenting Profile"
                width={120}
                height={120}
                className="mx-auto mb-4"
                priority
              />
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                5 minutes · 10 questions · zero judgment
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-medium text-foreground mb-4 text-balance leading-tight">
              Discover Your ADHD Parenting Profile
            </h1>
            <p className="text-lg text-muted-foreground mb-6 max-w-lg mx-auto">
              This isn&apos;t about diagnosing you. It&apos;s about understanding how your brain works as a parent — so you can stop fighting against it and start working with it.
            </p>
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
            <Button
              onClick={startAssessment}
              size="lg"
              className="px-8 py-6 text-lg rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
            >
              Start My Assessment
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Designed by psychologists who specialize in neurodivergent parenting
            </p>
          </div>
        )}

        {/* Questions View */}
        {assessmentStep === "questions" && (
          <>
            {/* Section Label */}
            <header className="text-center mb-6">
              <Image
                src="/logo2.png"
                alt="ADHD Parenting"
                width={40}
                height={40}
                className="mx-auto mb-3"
              />
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium tracking-wide uppercase">
                {currentQuestion.section}
              </span>
            </header>

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

              <Button
                onClick={goToNextQuestion}
                disabled={!hasAnsweredCurrent}
                className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground px-6"
              >
                {isLastQuestion ? "See My Results" : "Continue"}
                {!isLastQuestion && <ChevronRight className="w-4 h-4 ml-1" />}
              </Button>
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
