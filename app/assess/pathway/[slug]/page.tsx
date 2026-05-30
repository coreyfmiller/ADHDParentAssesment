"use client"

import { useState, useCallback, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ArrowRight, Brain, Battery, Volume2, Users, Moon, CloudMoon, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProgressBar } from "@/components/assessment/progress-bar"
import { QuestionCard } from "@/components/assessment/question-card"
import { EXECUTIVE_FUNCTION_SECTIONS, EXECUTIVE_FUNCTION_META } from "@/lib/assessments/pathways/executive-function"
import { DEPLETION_BURNOUT_SECTIONS, DEPLETION_BURNOUT_META } from "@/lib/assessments/pathways/depletion-burnout"
import { SENSORY_OVERWHELM_SECTIONS, SENSORY_OVERWHELM_META } from "@/lib/assessments/pathways/sensory-overwhelm"
import { SYSTEMIC_LOAD_SECTIONS, SYSTEMIC_LOAD_META } from "@/lib/assessments/pathways/systemic-load"
import { HORMONAL_PATTERNS_SECTIONS, HORMONAL_PATTERNS_META } from "@/lib/assessments/pathways/hormonal-patterns"
import { SLEEP_RECOVERY_SECTIONS, SLEEP_RECOVERY_META } from "@/lib/assessments/pathways/sleep-recovery"
import { TRAUMA_NERVOUS_SYSTEM_SECTIONS, TRAUMA_NERVOUS_SYSTEM_META } from "@/lib/assessments/pathways/trauma-nervous-system"
import type { AssessmentSection } from "@/lib/assessments/types"

type PathwayStep = "intro" | "questions" | "complete"

// Registry of available pathways
const PATHWAY_REGISTRY: Record<string, { sections: AssessmentSection[]; meta: typeof EXECUTIVE_FUNCTION_META }> = {
  "executive-function": { sections: EXECUTIVE_FUNCTION_SECTIONS, meta: EXECUTIVE_FUNCTION_META },
  "depletion-burnout": { sections: DEPLETION_BURNOUT_SECTIONS, meta: DEPLETION_BURNOUT_META },
  "sensory-overwhelm": { sections: SENSORY_OVERWHELM_SECTIONS, meta: SENSORY_OVERWHELM_META },
  "systemic-load": { sections: SYSTEMIC_LOAD_SECTIONS, meta: SYSTEMIC_LOAD_META },
  "hormonal-patterns": { sections: HORMONAL_PATTERNS_SECTIONS, meta: HORMONAL_PATTERNS_META },
  "sleep-recovery": { sections: SLEEP_RECOVERY_SECTIONS, meta: SLEEP_RECOVERY_META },
  "trauma-nervous-system": { sections: TRAUMA_NERVOUS_SYSTEM_SECTIONS, meta: TRAUMA_NERVOUS_SYSTEM_META },
}

const iconMap: Record<string, React.ElementType> = {
  Brain,
  Battery,
  Volume2,
  Users,
  Moon,
  CloudMoon,
  Shield,
}

export default function PathwayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const router = useRouter()
  const pathway = PATHWAY_REGISTRY[slug]

  const [currentStep, setCurrentStep] = useState(1)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [assessmentStep, setAssessmentStep] = useState<PathwayStep>("intro")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showSectionTransition, setShowSectionTransition] = useState(false)
  const [nextSectionName, setNextSectionName] = useState("")
  const [hasRestoredProgress, setHasRestoredProgress] = useState(false)

  const STORAGE_KEY = `mindful-mama-pathway-${slug}`
  const RESULT_KEY = `mindful-mama-pathway-result-${slug}`

  if (!pathway) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-medium text-foreground">Pathway not found</h1>
          <p className="text-muted-foreground">This pathway isn&apos;t available yet.</p>
          <Link href="/assess">
            <Button className="rounded-xl">Back to Assessments</Button>
          </Link>
        </div>
      </main>
    )
  }

  const { sections, meta } = pathway
  const allQuestions = sections.flatMap((s) => s.questions)
  const totalSteps = allQuestions.length
  const currentQuestion = allQuestions[currentStep - 1]
  const isFirstQuestion = currentStep === 1
  const hasAnsweredCurrent = currentQuestion ? answers[currentQuestion.id] !== undefined : false

  // Figure out current section
  let questionIndex = 0
  let currentSectionIndex = 0
  for (let i = 0; i < sections.length; i++) {
    const sectionQuestionCount = sections[i].questions.length
    if (currentStep - 1 < questionIndex + sectionQuestionCount) {
      currentSectionIndex = i
      break
    }
    questionIndex += sectionQuestionCount
  }

  // Restore progress
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    // First check if we already have completed results
    try {
      const resultData = localStorage.getItem(RESULT_KEY)
      if (resultData) {
        setAssessmentStep("complete")
        return
      }
    } catch {}

    // Otherwise check for in-progress answers
    try {
      const data = localStorage.getItem(STORAGE_KEY)
      if (!data) return
      const parsed = JSON.parse(data)
      if (Date.now() - parsed.timestamp > 24 * 60 * 60 * 1000) {
        localStorage.removeItem(STORAGE_KEY)
        return
      }
      if (Object.keys(parsed.answers).length > 0) {
        setCurrentStep(parsed.step)
        setAnswers(parsed.answers)
        setAssessmentStep("questions")
        setHasRestoredProgress(true)
      }
    } catch {}
  }, [STORAGE_KEY, RESULT_KEY])

  // Save progress
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (assessmentStep === "questions" && Object.keys(answers).length > 0) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ step: currentStep, answers, timestamp: Date.now() }))
      } catch {}
    }
  }, [currentStep, answers, assessmentStep, STORAGE_KEY])

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const handleSelect = useCallback((optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId,
    }))

    setTimeout(() => {
      if (currentStep === totalSteps) {
        // Save results
        const finalAnswers = { ...answers, [currentQuestion.id]: optionId }
        try {
          localStorage.setItem(RESULT_KEY, JSON.stringify({
            pathwayId: meta.id,
            completedAt: Date.now(),
            answers: finalAnswers,
          }))
          localStorage.removeItem(STORAGE_KEY)
        } catch {}
        setAssessmentStep("complete")
        return
      }

      // Check for section transition
      const nextQuestion = allQuestions[currentStep]
      const nextSectionIdx = sections.findIndex((s) =>
        s.questions.some((q) => q.id === nextQuestion.id)
      )
      const currentSectionIdx = sections.findIndex((s) =>
        s.questions.some((q) => q.id === currentQuestion.id)
      )

      if (nextSectionIdx !== currentSectionIdx) {
        setNextSectionName(sections[nextSectionIdx].title)
        setShowSectionTransition(true)
        setTimeout(() => {
          setShowSectionTransition(false)
          setIsTransitioning(true)
          setTimeout(() => {
            setCurrentStep((prev) => prev + 1)
            setIsTransitioning(false)
          }, 200)
        }, 1200)
      } else {
        setIsTransitioning(true)
        setTimeout(() => {
          setCurrentStep((prev) => prev + 1)
          setIsTransitioning(false)
        }, 400)
      }
    }, 600)
  }, [currentQuestion, currentStep, totalSteps, answers, allQuestions, sections, meta.id, RESULT_KEY, STORAGE_KEY])

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const goToPreviousQuestion = useCallback(() => {
    if (isFirstQuestion) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentStep((prev) => prev - 1)
      setIsTransitioning(false)
    }, 200)
  }, [isFirstQuestion])

  const startAssessment = () => setAssessmentStep("questions")
  const startFresh = () => {
    try { localStorage.removeItem(STORAGE_KEY) } catch {}
    setAnswers({})
    setCurrentStep(1)
    setHasRestoredProgress(false)
    setAssessmentStep("questions")
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/assess" className="flex items-center gap-2">
            <Image src="/logo2.png" alt="Mindful Mama" width={120} height={32} className="h-8 w-auto" priority />
          </Link>
          {assessmentStep === "questions" && (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                {sections.map((section, idx) => (
                  <div
                    key={section.id}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      idx < currentSectionIndex
                        ? "bg-primary"
                        : idx === currentSectionIndex
                        ? "bg-primary/50 scale-125"
                        : "bg-border"
                    }`}
                    title={section.title}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                {currentStep}/{totalSteps}
              </span>
            </div>
          )}
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8 md:py-12">
        {/* Intro */}
        {assessmentStep === "intro" && (
          <div className="bg-card rounded-3xl p-8 md:p-10 shadow-sm border border-border text-center">
            <div className="mb-6">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                {meta.estimatedMinutes} minutes · {meta.questionCount} questions · zero judgment
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-medium text-foreground mb-3 text-balance leading-tight">
              {meta.title}
            </h1>
            <p className="text-sm text-muted-foreground mb-4">{meta.subtitle}</p>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto">
              {meta.description}
            </p>

            <div className="text-left bg-secondary/50 rounded-2xl p-6 mb-8">
              <p className="text-foreground font-medium mb-3">This reflection explores:</p>
              <ul className="space-y-2 text-muted-foreground">
                {sections.map((section) => (
                  <li key={section.id} className="flex items-start gap-2">
                    <span className="text-primary mt-1">✦</span>
                    <span><strong className="text-foreground">{section.title}</strong> — {section.description}</span>
                  </li>
                ))}
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
                Begin Reflection
              </Button>
            )}

            <p className="text-sm text-muted-foreground mt-4">
              For self-reflection purposes only. Not a diagnostic tool.
            </p>
          </div>
        )}

        {/* Section Transition */}
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

        {/* Questions */}
        {assessmentStep === "questions" && !showSectionTransition && (
          <>
            <div className="text-center mb-6">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium tracking-wide uppercase">
                {sections[currentSectionIndex].title}
              </span>
            </div>

            <div className="mb-8">
              <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
            </div>

            <QuestionCard
              question={currentQuestion.question}
              description={currentQuestion.description}
              options={currentQuestion.options.map((o) => ({ id: o.id, label: o.label }))}
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

        {/* Completion */}
        {assessmentStep === "complete" && (
          <div className="space-y-6">
            <div className="bg-card rounded-3xl p-8 md:p-10 shadow-sm border border-border text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <span className="text-primary text-2xl">✓</span>
              </div>
              <h1 className="text-3xl font-medium text-foreground mb-3">
                Reflection Complete
              </h1>
              <p className="text-lg text-muted-foreground mb-6 max-w-lg mx-auto">
                You&apos;ve completed the {meta.title} reflection. Your responses have been saved and will inform your personalized strategies and AI coach conversations.
              </p>

              {/* Dimension Summary */}
              <div className="text-left bg-secondary/30 rounded-2xl p-6 mb-6">
                <h3 className="text-sm font-medium text-foreground mb-3">What you explored:</h3>
                <ul className="space-y-2">
                  {sections.map((section) => (
                    <li key={section.id} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="text-primary">✓</span>
                      {section.title}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-primary/5 rounded-2xl p-5 border border-primary/10 mb-6">
                <p className="text-sm text-foreground/80">
                  Your AI Coach now has context about your {meta.title.toLowerCase()} patterns. When you chat with the coach, it will tailor its support to what you&apos;ve shared here.
                </p>
              </div>
            </div>

            {/* Next Steps */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/assess" className="flex-1">
                <Button variant="outline" className="w-full rounded-xl">
                  Explore More Pathways
                </Button>
              </Link>
              <Link href="/dashboard/coach" className="flex-1">
                <Button className="w-full rounded-xl">
                  Talk to AI Coach
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            <Link href="/dashboard" className="block">
              <Button variant="ghost" className="w-full rounded-xl text-muted-foreground">
                Go to My Toolkit
              </Button>
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}
