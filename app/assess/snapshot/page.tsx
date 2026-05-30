"use client"

import { useState, useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProgressBar } from "@/components/assessment/progress-bar"
import { QuestionCard } from "@/components/assessment/question-card"
import { SNAPSHOT_SECTIONS, SNAPSHOT_META } from "@/lib/assessments/overwhelm-snapshot"
import { calculatePatternMap } from "@/lib/assessments/routing"
import type { PatternMap } from "@/lib/assessments/types"
import { PATHWAYS } from "@/lib/assessments/types"

type SnapshotStep = "intro" | "questions" | "results"

const allQuestions = SNAPSHOT_SECTIONS.flatMap((s) => s.questions)
const sectionNames = SNAPSHOT_SECTIONS.map((s) => s.title)

const STORAGE_KEY = "mindful-mama-snapshot-progress"
const RESULT_KEY = "mindful-mama-pattern-map"

function saveProgress(step: number, answers: Record<string, string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ step, answers, timestamp: Date.now() }))
  } catch {}
}

function loadProgress(): { step: number; answers: Record<string, string> } | null {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) return null
    const parsed = JSON.parse(data)
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

export default function SnapshotPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [assessmentStep, setAssessmentStep] = useState<SnapshotStep>("intro")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [patternMap, setPatternMap] = useState<PatternMap | null>(null)
  const [showSectionTransition, setShowSectionTransition] = useState(false)
  const [nextSectionName, setNextSectionName] = useState("")
  const [hasRestoredProgress, setHasRestoredProgress] = useState(false)

  const totalSteps = allQuestions.length
  const currentQuestion = allQuestions[currentStep - 1]
  const isFirstQuestion = currentStep === 1
  const hasAnsweredCurrent = currentQuestion ? answers[currentQuestion.id] !== undefined : false

  // Figure out which section we're in
  let questionIndex = 0
  let currentSectionIndex = 0
  for (let i = 0; i < SNAPSHOT_SECTIONS.length; i++) {
    const sectionQuestionCount = SNAPSHOT_SECTIONS[i].questions.length
    if (currentStep - 1 < questionIndex + sectionQuestionCount) {
      currentSectionIndex = i
      break
    }
    questionIndex += sectionQuestionCount
  }

  // Restore progress
  useEffect(() => {
    const saved = loadProgress()
    if (saved && Object.keys(saved.answers).length > 0) {
      setCurrentStep(saved.step)
      setAnswers(saved.answers)
      setAssessmentStep("questions")
      setHasRestoredProgress(true)
    }
  }, [])

  // Save progress on changes
  useEffect(() => {
    if (assessmentStep === "questions" && Object.keys(answers).length > 0) {
      saveProgress(currentStep, answers)
    }
  }, [currentStep, answers, assessmentStep])

  const handleSelect = useCallback((optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId,
    }))

    setTimeout(() => {
      if (currentStep === totalSteps) {
        // Assessment complete — calculate pattern map
        const updatedAnswers = { ...answers, [currentQuestion.id]: optionId }
        const map = calculatePatternMap(updatedAnswers)
        setPatternMap(map)

        // Save to localStorage
        try {
          localStorage.setItem(RESULT_KEY, JSON.stringify(map))
        } catch {}

        clearProgress()
        setAssessmentStep("results")
        return
      }

      // Check for section transition
      const nextQuestion = allQuestions[currentStep]
      const nextSectionIdx = SNAPSHOT_SECTIONS.findIndex((s) =>
        s.questions.some((q) => q.id === nextQuestion.id)
      )
      const currentSectionIdx = SNAPSHOT_SECTIONS.findIndex((s) =>
        s.questions.some((q) => q.id === currentQuestion.id)
      )

      if (nextSectionIdx !== currentSectionIdx) {
        setNextSectionName(SNAPSHOT_SECTIONS[nextSectionIdx].title)
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
  }, [currentQuestion, currentStep, totalSteps, answers])

  const goToPreviousQuestion = useCallback(() => {
    if (isFirstQuestion) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentStep((prev) => prev - 1)
      setIsTransitioning(false)
    }, 200)
  }, [isFirstQuestion])

  const startAssessment = useCallback(() => {
    setAssessmentStep("questions")
  }, [])

  const startFresh = useCallback(() => {
    clearProgress()
    setAnswers({})
    setCurrentStep(1)
    setHasRestoredProgress(false)
    setAssessmentStep("questions")
  }, [])

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
                {SNAPSHOT_SECTIONS.map((section, idx) => (
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
                {SNAPSHOT_META.estimatedMinutes} minutes · {SNAPSHOT_META.questionCount} questions · zero judgment
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-medium text-foreground mb-4 text-balance leading-tight">
              {SNAPSHOT_META.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-6 max-w-lg mx-auto">
              {SNAPSHOT_META.description}
            </p>

            <div className="text-left bg-secondary/50 rounded-2xl p-6 mb-8 space-y-3">
              <p className="text-foreground font-medium">This snapshot maps five dimensions:</p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✦</span>
                  <span><strong className="text-foreground">Cognitive Load</strong> — how much your brain is juggling</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✦</span>
                  <span><strong className="text-foreground">Emotional Bandwidth</strong> — how much capacity you have for feelings</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✦</span>
                  <span><strong className="text-foreground">Physical Depletion</strong> — what your body is telling you</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✦</span>
                  <span><strong className="text-foreground">System Friction</strong> — whether your daily life supports or fights you</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✦</span>
                  <span><strong className="text-foreground">Identity & Self</strong> — whether you still feel like a person underneath &quot;mom&quot;</span>
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
                Begin My Snapshot
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
                {SNAPSHOT_SECTIONS[currentSectionIndex].title}
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

        {/* Results — Pattern Map */}
        {assessmentStep === "results" && patternMap && (
          <div className="space-y-6">
            <div className="bg-card rounded-3xl p-8 md:p-10 shadow-sm border border-border">
              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-medium text-foreground mb-3 text-balance">
                  Your Pattern Map
                </h1>
                <p className="text-lg text-muted-foreground max-w-lg mx-auto">
                  Here&apos;s where your energy is going. This isn&apos;t a score — it&apos;s a map of what&apos;s stacking up for you right now.
                </p>
              </div>

              {/* Dimension Bars */}
              <div className="space-y-5 mb-8">
                {patternMap.dimensions.map((dim) => (
                  <div key={dim.dimension} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">{dim.label}</span>
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                        dim.intensity === "critical" ? "bg-red-500/10 text-red-600" :
                        dim.intensity === "high" ? "bg-amber-500/10 text-amber-600" :
                        dim.intensity === "moderate" ? "bg-yellow-500/10 text-yellow-700" :
                        "bg-green-500/10 text-green-600"
                      }`}>
                        {dim.intensity}
                      </span>
                    </div>
                    <div className="h-2.5 w-full bg-secondary rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ease-out ${
                          dim.intensity === "critical" ? "bg-red-500" :
                          dim.intensity === "high" ? "bg-amber-500" :
                          dim.intensity === "moderate" ? "bg-yellow-500" :
                          "bg-green-500"
                        }`}
                        style={{ width: `${(dim.score / dim.maxScore) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">{dim.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Pathways */}
            {patternMap.recommendedPathways.length > 0 && (
              <div className="bg-card rounded-3xl p-8 shadow-sm border border-border">
                <h2 className="text-xl font-medium text-foreground mb-2">
                  Your Recommended Pathways
                </h2>
                <p className="text-muted-foreground text-sm mb-6">
                  Based on your pattern map, these deeper reflections will be most useful for you right now. Start with the highest priority one.
                </p>
                <div className="space-y-4">
                  {patternMap.recommendedPathways.map((rec) => {
                    const pathway = PATHWAYS.find((p) => p.id === rec.pathwayId)
                    return (
                      <div
                        key={rec.pathwayId}
                        className="bg-secondary/30 rounded-2xl p-5 border border-border/50"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-base font-medium text-foreground">{rec.title}</h3>
                          {rec.priority === "high" && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/10 text-red-600 font-medium">
                              Start here
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{rec.reason}</p>
                        {pathway?.available ? (
                          <Link
                            href={`/assess/pathway/${rec.slug}`}
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                          >
                            Begin this reflection
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        ) : (
                          <span className="text-xs text-muted-foreground">Coming soon</span>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/assess" className="flex-1">
                <Button variant="outline" className="w-full rounded-xl">
                  View All Pathways
                </Button>
              </Link>
              <Link href="/dashboard" className="flex-1">
                <Button className="w-full rounded-xl">
                  Go to My Toolkit
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            {/* Note */}
            <div className="bg-primary/5 rounded-2xl p-5 border border-primary/10 text-center">
              <p className="text-sm text-foreground/80">
                Your pattern map is saved locally. You can retake the snapshot anytime — your patterns shift with seasons, hormones, and life stages.
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
