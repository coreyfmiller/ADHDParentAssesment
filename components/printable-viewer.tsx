"use client"

import { useState, useEffect } from "react"
import { Check, Printer, ChevronLeft, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { PrintableData } from "@/lib/printables-data"
import { PRINTABLES } from "@/lib/printables-content"

interface PrintableViewerProps {
  printable: PrintableData
  onBack: () => void
}

const CHECKED_KEY_PREFIX = "mindful-mama-printable-"

export function PrintableViewer({ printable, onBack }: PrintableViewerProps) {
  const [checked, setChecked] = useState<Set<string>>(new Set())
  const storageKey = `${CHECKED_KEY_PREFIX}${printable.id}`

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved) setChecked(new Set(JSON.parse(saved)))
    } catch {}
  }, [storageKey])

  const toggleItem = (id: string) => {
    const next = new Set(checked)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setChecked(next)
    try {
      localStorage.setItem(storageKey, JSON.stringify([...next]))
    } catch {}
  }

  const resetAll = () => {
    setChecked(new Set())
    try { localStorage.removeItem(storageKey) } catch {}
  }

  const handlePrint = () => {
    // Find the HTML content from the old printables-content file
    const htmlPrintable = PRINTABLES.find(p => p.title === printable.title)
    if (htmlPrintable) {
      const printWindow = window.open("", "_blank")
      if (printWindow) {
        printWindow.document.write(htmlPrintable.content)
        printWindow.document.close()
        setTimeout(() => printWindow.print(), 250)
      }
    } else {
      window.print()
    }
  }

  const totalItems = printable.sections?.reduce((sum, s) => sum + s.items.length, 0) || 0
  const checkedCount = checked.size
  const progress = totalItems > 0 ? Math.round((checkedCount / totalItems) * 100) : 0

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          onClick={onBack}
          variant="outline"
          size="sm"
          className="rounded-xl"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          All Checklists
        </Button>
        <div className="flex items-center gap-2">
          {totalItems > 0 && checked.size > 0 && (
            <button
              onClick={resetAll}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-lg hover:bg-secondary/50"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          )}
          <Button
            onClick={handlePrint}
            variant="outline"
            size="sm"
            className="rounded-xl"
          >
            <Printer className="w-3 h-3 mr-1.5" />
            Print
          </Button>
        </div>
      </div>

      {/* Title */}
      <div>
        <h1 className="text-2xl font-medium text-foreground mb-1">{printable.title}</h1>
        <p className="text-sm text-muted-foreground">{printable.subtitle}</p>
      </div>

      {/* Progress bar (for checklists) */}
      {totalItems > 0 && printable.type === "checklist" && (
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{checkedCount}/{totalItems} done</span>
            {progress === 100 && <span className="text-green-600 font-medium">Complete ✓</span>}
          </div>
          <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Checklist sections */}
      {printable.sections?.map((section, sIdx) => (
        <div key={sIdx} className="bg-card rounded-2xl border border-border overflow-hidden">
          <div className="px-5 pt-4 pb-2">
            <h2 className="text-sm font-medium text-primary uppercase tracking-wide">{section.title}</h2>
            {section.description && (
              <p className="text-xs text-muted-foreground mt-0.5">{section.description}</p>
            )}
          </div>
          <div className="px-3 pb-3">
            {section.items.map((item) => {
              const isChecked = checked.has(item.id)
              return (
                <button
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={`w-full text-left flex items-start gap-3 px-3 py-3 rounded-xl transition-all ${
                    isChecked ? "bg-green-500/5" : "hover:bg-secondary/30"
                  }`}
                >
                  <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                    isChecked
                      ? "bg-green-500 border-green-500"
                      : "border-border"
                  }`}>
                    {isChecked && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm leading-relaxed ${isChecked ? "line-through text-muted-foreground" : "text-foreground"}`}>
                      {item.text}
                    </p>
                    {item.note && (
                      <p className="text-xs text-muted-foreground/70 mt-1 leading-relaxed">
                        {item.note}
                      </p>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      ))}

      {/* Fill-in sections */}
      {printable.fillIns?.map((fillIn) => (
        <div key={fillIn.id} className="bg-card rounded-2xl border border-border p-5">
          <label className="text-sm font-medium text-foreground block mb-1">{fillIn.label}</label>
          {fillIn.description && (
            <p className="text-xs text-muted-foreground mb-2">{fillIn.description}</p>
          )}
          {Array.from({ length: fillIn.lines }).map((_, i) => (
            <div key={i} className="border-b border-border/50 h-10" />
          ))}
        </div>
      ))}

      {/* Cards */}
      {printable.cards?.map((card, idx) => (
        <div key={idx} className="bg-card rounded-2xl border border-border p-5">
          <h3 className="text-sm font-medium text-foreground mb-2">{card.title}</h3>
          <p className="text-sm text-foreground/80 leading-relaxed italic mb-2">
            {card.content}
          </p>
          {card.note && (
            <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">
              {card.note}
            </p>
          )}
        </div>
      ))}

      {/* Tip */}
      {printable.tip && (
        <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10">
          <p className="text-sm text-foreground/80">{printable.tip}</p>
        </div>
      )}
    </div>
  )
}
