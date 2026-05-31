"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface Option {
  id: string
  label: string
  score?: number
}

interface QuestionCardProps {
  question: string
  description?: string
  options: Option[]
  selectedOption?: string
  onSelect: (optionId: string) => void
  onSkip?: () => void
  isTransitioning?: boolean
}

export function QuestionCard({
  question,
  description,
  options,
  selectedOption,
  onSelect,
  onSkip,
  isTransitioning = false,
}: QuestionCardProps) {
  return (
    <div
      className={cn(
        "bg-card rounded-3xl p-8 md:p-10 shadow-sm border border-border transition-all duration-300",
        isTransitioning && "opacity-0 translate-x-4",
        !isTransitioning && "opacity-100 translate-x-0"
      )}
    >
      <h2 className="text-2xl md:text-3xl font-medium text-foreground mb-3 text-balance leading-tight">
        {question}
      </h2>
      {description && (
        <p className="text-muted-foreground mb-8 text-lg">{description}</p>
      )}
      <div className="space-y-4">
        {options.map((option) => (
          <RadioOption
            key={option.id}
            label={option.label}
            isSelected={selectedOption === option.id}
            onSelect={() => onSelect(option.id)}
          />
        ))}
      </div>
      {onSkip && (
        <button
          onClick={onSkip}
          className="w-full mt-4 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          This doesn&apos;t apply to me — skip
        </button>
      )}
    </div>
  )
}

interface RadioOptionProps {
  label: string
  isSelected: boolean
  onSelect: () => void
}

function RadioOption({ label, isSelected, onSelect }: RadioOptionProps) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all duration-200 text-left",
        "hover:border-primary/50 hover:bg-primary/5",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
        isSelected
          ? "border-primary bg-primary/10"
          : "border-border bg-card"
      )}
    >
      <div
        className={cn(
          "w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200",
          isSelected
            ? "border-primary bg-primary"
            : "border-muted-foreground/50"
        )}
      >
        {isSelected && (
          <div className="w-2.5 h-2.5 rounded-full bg-primary-foreground" />
        )}
      </div>
      <span className={cn(
        "text-lg",
        isSelected ? "text-foreground font-medium" : "text-foreground/80"
      )}>
        {label}
      </span>
    </button>
  )
}
