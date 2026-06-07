"use client"

import { Phone, MessageCircle, X, Heart } from "lucide-react"
import type { CrisisDetectionResult } from "@/lib/crisis-detection"

interface CrisisAlertProps {
  result: CrisisDetectionResult
  onDismiss?: () => void
}

export function CrisisAlert({ result, onDismiss }: CrisisAlertProps) {
  if (!result.isCrisis) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-card rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl border border-border animate-in slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center">
              <Heart className="w-5 h-5 text-rose-500" />
            </div>
            <h2 className="text-lg font-medium text-foreground">
              {result.severity === "severe" ? "You matter." : "This sounds really hard."}
            </h2>
          </div>
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="p-1.5 text-muted-foreground/50 hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Message */}
        <p className="text-sm text-foreground/80 leading-relaxed mb-6">
          {result.message}
        </p>

        {/* Resources */}
        <div className="space-y-3 mb-6">
          {result.resources.map((resource, i) => (
            <div
              key={i}
              className="bg-secondary/30 rounded-xl p-4 border border-border/50"
            >
              <div className="flex items-center gap-2 mb-1">
                {resource.contact.toLowerCase().includes("text") ? (
                  <MessageCircle className="w-4 h-4 text-primary flex-shrink-0" />
                ) : (
                  <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                )}
                <p className="text-sm font-medium text-foreground">{resource.name}</p>
              </div>
              <p className="text-base font-medium text-primary mb-0.5">{resource.contact}</p>
              <p className="text-xs text-muted-foreground">{resource.description}</p>
            </div>
          ))}
        </div>

        {/* Dismiss */}
        <div className="space-y-2">
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="w-full text-sm text-muted-foreground hover:text-foreground py-2 transition-colors"
            >
              I&apos;m okay — I want to continue
            </button>
          )}
          <p className="text-[10px] text-muted-foreground/60 text-center leading-relaxed">
            This app is not a crisis service. If you are in immediate danger, call 911.
          </p>
        </div>
      </div>
    </div>
  )
}
