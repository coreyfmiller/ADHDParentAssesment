"use client"

import { useState, useCallback, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ArrowRight, Brain, Battery, Volume2, Users, Moon, CloudMoon, Shield, Heart, Zap, Fingerprint } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProgressBar } from "@/components/assessment/progress-bar"
import { QuestionCard } from "@/components/assessment/question-card"
import { UpgradeGate } from "@/components/upgrade-gate"
import { canAccessPathway } from "@/lib/access-control"
import { EXECUTIVE_FUNCTION_SECTIONS, EXECUTIVE_FUNCTION_META } from "@/lib/assessments/pathways/executive-function"
import { DEPLETION_BURNOUT_SECTIONS, DEPLETION_BURNOUT_META } from "@/lib/assessments/pathways/depletion-burnout"
import { SENSORY_OVERWHELM_SECTIONS, SENSORY_OVERWHELM_META } from "@/lib/assessments/pathways/sensory-overwhelm"
import { SYSTEMIC_LOAD_SECTIONS, SYSTEMIC_LOAD_META } from "@/lib/assessments/pathways/systemic-load"
import { HORMONAL_PATTERNS_SECTIONS, HORMONAL_PATTERNS_META } from "@/lib/assessments/pathways/hormonal-patterns"
import { SLEEP_RECOVERY_SECTIONS, SLEEP_RECOVERY_META } from "@/lib/assessments/pathways/sleep-recovery"
import { TRAUMA_NERVOUS_SYSTEM_SECTIONS, TRAUMA_NERVOUS_SYSTEM_META } from "@/lib/assessments/pathways/trauma-nervous-system"
import { ATTACHMENT_RELATIONSHIPS_SECTIONS } from "@/lib/assessments/pathways/attachment-relationships"
import { SELF_WORTH_INNER_CRITIC_SECTIONS } from "@/lib/assessments/pathways/self-worth-inner-critic"
import { RAGE_EMOTIONAL_DYSREGULATION_SECTIONS } from "@/lib/assessments/pathways/rage-emotional-dysregulation"
import { MATRESCENCE_IDENTITY_SECTIONS } from "@/lib/assessments/pathways/matrescence-identity"
import { SOCIAL_CONNECTION_ISOLATION_SECTIONS } from "@/lib/assessments/pathways/social-connection-isolation"
import type { AssessmentSection } from "@/lib/assessments/types"
import { generatePathwayResults, type PathwayInsight } from "@/lib/assessments/pathway-results-generator"
import { getTransitionCopy, getSectionOpener } from "@/lib/assessments/micro-validations"

type PathwayStep = "intro" | "questions" | "complete" | "locked"

// Registry of available pathways
const PATHWAY_REGISTRY: Record<string, { sections: AssessmentSection[]; meta: typeof EXECUTIVE_FUNCTION_META }> = {
  "executive-function": { sections: EXECUTIVE_FUNCTION_SECTIONS, meta: EXECUTIVE_FUNCTION_META },
  "depletion-burnout": { sections: DEPLETION_BURNOUT_SECTIONS, meta: DEPLETION_BURNOUT_META },
  "sensory-overwhelm": { sections: SENSORY_OVERWHELM_SECTIONS, meta: SENSORY_OVERWHELM_META },
  "systemic-load": { sections: SYSTEMIC_LOAD_SECTIONS, meta: SYSTEMIC_LOAD_META },
  "hormonal-patterns": { sections: HORMONAL_PATTERNS_SECTIONS, meta: HORMONAL_PATTERNS_META },
  "sleep-recovery": { sections: SLEEP_RECOVERY_SECTIONS, meta: SLEEP_RECOVERY_META },
  "trauma-nervous-system": { sections: TRAUMA_NERVOUS_SYSTEM_SECTIONS, meta: TRAUMA_NERVOUS_SYSTEM_META },
  "attachment-relationships": { sections: ATTACHMENT_RELATIONSHIPS_SECTIONS, meta: { id: "attachment-relationships", title: "Attachment & Relationships", subtitle: "How you connect — and disconnect — under pressure", description: "Explore your patterns in partnership, vulnerability, trust, and how secure the bonds in your life actually feel from the inside.", estimatedMinutes: 6, questionCount: 10, icon: "Heart", color: "bg-pink-500/10 text-pink-600" } },
  "self-worth-inner-critic": { sections: SELF_WORTH_INNER_CRITIC_SECTIONS, meta: { id: "self-worth-inner-critic", title: "Self-Worth & Inner Critic", subtitle: "The voice in your head that says you're not enough", description: "Map your relationship with perfectionism, shame, self-compassion, and the running commentary that shapes how you feel about everything you do.", estimatedMinutes: 6, questionCount: 11, icon: "Shield", color: "bg-violet-500/10 text-violet-600" } },
  "rage-emotional-dysregulation": { sections: RAGE_EMOTIONAL_DYSREGULATION_SECTIONS, meta: { id: "rage-emotional-dysregulation", title: "Rage & Emotional Dysregulation", subtitle: "The explosion you can't always stop", description: "Name the rage pattern without shame. Understand its triggers, its aftermath, and what it's actually trying to tell you about your life.", estimatedMinutes: 5, questionCount: 9, icon: "Zap", color: "bg-red-500/10 text-red-600" } },
  "matrescence-identity": { sections: MATRESCENCE_IDENTITY_SECTIONS, meta: { id: "matrescence-identity", title: "Matrescence & Identity", subtitle: "The earthquake of becoming a mother", description: "Explore the grief of your old self, the taboo feelings nobody talks about, and the slow work of rebuilding identity within — not despite — motherhood.", estimatedMinutes: 5, questionCount: 9, icon: "Fingerprint", color: "bg-indigo-500/10 text-indigo-600" } },
  "social-connection-isolation": { sections: SOCIAL_CONNECTION_ISOLATION_SECTIONS, meta: { id: "social-connection-isolation", title: "Social Connection & Isolation", subtitle: "Needed by everyone, known by no one", description: "Map your loneliness, your friendships, and the energy it costs to appear okay in a world that doesn't ask how you really are.", estimatedMinutes: 5, questionCount: 9, icon: "Users", color: "bg-cyan-500/10 text-cyan-600" } },
}

const iconMap: Record<string, React.ElementType> = {
  Brain,
  Battery,
  Volume2,
  Users,
  Moon,
  CloudMoon,
  Shield,
  Heart,
  Zap,
  Fingerprint,
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
  const [transitionReady, setTransitionReady] = useState(false)
  const [hasRestoredProgress, setHasRestoredProgress] = useState(false)
  const [insight, setInsight] = useState<PathwayInsight | null>(null)
  const [showRetakeConfirm, setShowRetakeConfirm] = useState(false)

  const STORAGE_KEY = `mindful-mama-pathway-${slug}`
  const RESULT_KEY = `mindful-mama-pathway-result-${slug}`

  if (!pathway) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-medium text-foreground">Pathway not found</h1>
          <p className="text-muted-foreground">This pathway isn&apos;t available yet.</p>
          <Link href="/assess">
            <Button className="rounded-xl">Back to Reflections</Button>
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
        const parsed = JSON.parse(resultData)
        const generatedInsight = generatePathwayResults(meta.id, parsed.answers || {})
        if (generatedInsight) setInsight(generatedInsight)
        setAssessmentStep("complete")
        return
      }
    } catch {}

    // Check access control
    if (!canAccessPathway(slug)) {
      setAssessmentStep("locked")
      return
    }

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
  }, [STORAGE_KEY, RESULT_KEY, slug])

  // Save progress
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (assessmentStep === "questions" && Object.keys(answers).length > 0) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ step: currentStep, answers, timestamp: Date.now() }))
      } catch {}
    }
  }, [currentStep, answers, assessmentStep, STORAGE_KEY])

  // Prevent browser back button from losing progress during quiz
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (assessmentStep !== "questions") return

    const handlePopState = () => {
      if (currentStep > 1) {
        window.history.pushState(null, "", window.location.href)
        setIsTransitioning(true)
        setTimeout(() => {
          setCurrentStep((prev) => prev - 1)
          setIsTransitioning(false)
        }, 200)
      } else {
        window.history.pushState(null, "", window.location.href)
        setAssessmentStep("intro")
      }
    }

    window.history.pushState(null, "", window.location.href)
    window.addEventListener("popstate", handlePopState)

    return () => {
      window.removeEventListener("popstate", handlePopState)
    }
  }, [assessmentStep, currentStep])

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
        // Generate insight
        const generatedInsight = generatePathwayResults(meta.id, finalAnswers)
        if (generatedInsight) setInsight(generatedInsight)
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
        setTransitionReady(false)
        setShowSectionTransition(true)
        setTimeout(() => setTransitionReady(true), 800)
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

  const startAssessment = () => {
    if (!canAccessPathway(slug)) {
      setAssessmentStep("locked")
      return
    }
    setAssessmentStep("questions")
  }
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
          <div className="fixed inset-0 z-40 bg-background/90 backdrop-blur-sm flex items-center justify-center px-6">
            <div className="text-center max-w-md animate-in fade-in zoom-in-95 duration-300">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <span className="text-primary text-lg">✓</span>
              </div>
              <p className="text-foreground/70 text-sm leading-relaxed mb-4">
                {getTransitionCopy(
                  sections[currentSectionIndex]?.id || "",
                  sections[currentSectionIndex + 1]?.id || ""
                ).acknowledgment}
              </p>
              <p className="text-foreground font-medium mb-6">
                {getTransitionCopy(
                  sections[currentSectionIndex]?.id || "",
                  sections[currentSectionIndex + 1]?.id || ""
                ).bridge}
              </p>
              {transitionReady && (
                <Button
                  onClick={() => {
                    setShowSectionTransition(false)
                    setIsTransitioning(true)
                    setTimeout(() => {
                      setCurrentStep((prev) => prev + 1)
                      setIsTransitioning(false)
                    }, 200)
                  }}
                  className="rounded-xl"
                >
                  Continue
                </Button>
              )}
              {!transitionReady && (
                <div className="h-10" />
              )}
            </div>
          </div>
        )}

        {/* Questions */}
        {assessmentStep === "questions" && !showSectionTransition && (
          <>
            <div className="text-center mb-6">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium tracking-wide uppercase mb-2">
                {sections[currentSectionIndex].title}
              </span>
              {/* Section opener — only show on first question of each section */}
              {(() => {
                const sectionStart = sections.slice(0, currentSectionIndex).reduce((sum, s) => sum + s.questions.length, 0)
                const isFirstInSection = currentStep - 1 === sectionStart
                const opener = getSectionOpener(sections[currentSectionIndex].id)
                if (isFirstInSection && opener) {
                  return <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">{opener}</p>
                }
                return null
              })()}
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
              <button
                onClick={() => {
                  if (currentStep === totalSteps) {
                    // Skip last question — complete without it
                    try {
                      localStorage.setItem(RESULT_KEY, JSON.stringify({
                        pathwayId: meta.id,
                        completedAt: Date.now(),
                        answers,
                      }))
                      localStorage.removeItem(STORAGE_KEY)
                    } catch {}
                    const generatedInsight = generatePathwayResults(meta.id, answers)
                    if (generatedInsight) setInsight(generatedInsight)
                    setAssessmentStep("complete")
                  } else {
                    setIsTransitioning(true)
                    setTimeout(() => {
                      setCurrentStep((prev) => prev + 1)
                      setIsTransitioning(false)
                    }, 300)
                  }
                }}
                className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors"
              >
                Skip this question
              </button>
            </div>
          </>
        )}

        {/* Completion — Rich Results */}
        {assessmentStep === "complete" && (
          <div className="space-y-6">
            {/* Pattern Header */}
            <div className="bg-card rounded-3xl p-8 md:p-10 shadow-sm border border-border">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <span className="text-primary text-2xl">✓</span>
              </div>
              {insight ? (
                <>
                  <h1 className="text-2xl md:text-3xl font-medium text-foreground mb-3 text-center text-balance">
                    {insight.patternTitle}
                  </h1>
                  <p className="text-muted-foreground leading-relaxed text-center max-w-lg mx-auto mb-6">
                    {insight.patternDescription}
                  </p>
                  <div className="bg-secondary/30 rounded-2xl p-5">
                    <p className="text-sm font-medium text-foreground mb-2">Your primary challenge:</p>
                    <p className="text-sm text-foreground/80">{insight.primaryChallenge}</p>
                    {insight.secondaryChallenges.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-border/50">
                        <p className="text-sm text-muted-foreground mb-2">Also showing up:</p>
                        <ul className="space-y-1.5">
                          {insight.secondaryChallenges.map((c, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                              <span className="text-primary">·</span> {c}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <h1 className="text-2xl font-medium text-foreground mb-3">Reflection Complete</h1>
                  <p className="text-muted-foreground">Your responses have been saved.</p>
                </div>
              )}
            </div>

            {/* Connection to Snapshot */}
            {insight?.connectionToSnapshot && (
              <div className="bg-primary/5 rounded-2xl p-5 border border-primary/10">
                <p className="text-sm font-medium text-primary uppercase tracking-wide mb-2">How this connects</p>
                <p className="text-sm text-foreground/80 leading-relaxed">{insight.connectionToSnapshot}</p>
              </div>
            )}

            {/* Strategies */}
            {insight && insight.strategies.length > 0 && (
              <div className="bg-card rounded-3xl p-8 shadow-sm border border-border">
                <h2 className="text-lg font-medium text-foreground mb-1">What to do with this</h2>
                <p className="text-sm text-muted-foreground mb-5">Matched to your specific pattern. Start with &quot;today&quot; — don&apos;t try all three at once.</p>
                <div className="space-y-3">
                  {insight.strategies.map((strategy, idx) => (
                    <div key={idx} className="bg-secondary/20 rounded-2xl p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-sm font-medium text-foreground">{strategy.title}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          strategy.timeframe === "today" ? "bg-primary/10 text-primary" :
                          strategy.timeframe === "this-week" ? "bg-amber-500/10 text-amber-600" :
                          "bg-secondary text-muted-foreground"
                        }`}>
                          {strategy.timeframe}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{strategy.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Script */}
            {insight?.script && (
              <div className="bg-card rounded-3xl p-8 shadow-sm border border-border">
                <h2 className="text-lg font-medium text-foreground mb-1">A script you can use today</h2>
                <p className="text-sm text-muted-foreground mb-4 italic">{insight.script.context}</p>
                <div className="bg-primary/5 rounded-2xl p-5 border border-primary/10">
                  <p className="text-foreground/90 leading-relaxed italic">&quot;{insight.script.words}&quot;</p>
                </div>
              </div>
            )}

            {/* Next Pathway Suggestion — only show if not already completed */}
            {insight?.nextPathwaySuggestion && (() => {
              try {
                const alreadyDone = localStorage.getItem(`mindful-mama-pathway-result-${insight.nextPathwaySuggestion.slug}`)
                if (alreadyDone) return null
              } catch {}
              return (
                <div className="bg-secondary/30 rounded-2xl p-5 border border-border/50">
                  <p className="text-sm font-medium text-primary uppercase tracking-wide mb-2">Explore next</p>
                  <h3 className="text-base font-medium text-foreground mb-1">{insight.nextPathwaySuggestion!.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{insight.nextPathwaySuggestion!.reason}</p>
                  <Link
                    href={`/assess/pathway/${insight.nextPathwaySuggestion!.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    Begin this reflection
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )
            })()}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/assess" className="flex-1">
                <Button className="w-full rounded-xl">
                  Back to Reflections
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/dashboard/coach" className="flex-1">
                <Button variant="outline" className="w-full rounded-xl">
                  Talk to Coach
                </Button>
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowRetakeConfirm(true)}
                className="flex-1 text-sm text-muted-foreground hover:text-foreground py-2 transition-colors text-center"
              >
                Retake this reflection
              </button>
            </div>

            {/* Retake confirmation */}
            {showRetakeConfirm && (
              <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setShowRetakeConfirm(false)}>
                <div className="bg-card rounded-2xl p-6 max-w-sm w-full shadow-xl border border-border animate-in slide-in-from-bottom-4 duration-300" onClick={(e) => e.stopPropagation()}>
                  <h3 className="text-base font-medium text-foreground mb-2">Retake this reflection?</h3>
                  <p className="text-sm text-muted-foreground mb-5">
                    Your previous answers will be replaced with new ones. This can&apos;t be undone. Your current results will be lost.
                  </p>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setShowRetakeConfirm(false)}
                      className="flex-1 rounded-xl"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => {
                        try {
                          localStorage.removeItem(RESULT_KEY)
                          localStorage.removeItem(STORAGE_KEY)
                        } catch {}
                        setAnswers({})
                        setCurrentStep(1)
                        setInsight(null)
                        setShowRetakeConfirm(false)
                        setAssessmentStep("intro")
                      }}
                      className="flex-1 rounded-xl"
                    >
                      Yes, retake
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Locked — Paywall */}
        {assessmentStep === "locked" && (
          <UpgradeGate context="pathway" />
        )}
      </div>
    </main>
  )
}
