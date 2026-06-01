"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { FileText, ArrowRight } from "lucide-react"
import { PRINTABLES_DATA } from "@/lib/printables-data"
import { PrintableViewer } from "@/components/printable-viewer"
import type { PrintableData } from "@/lib/printables-data"

const categories = [...new Set(PRINTABLES_DATA.map((p) => p.category))]

export default function PrintablesPage() {
  const [activePrintable, setActivePrintable] = useState<PrintableData | null>(null)

  if (activePrintable) {
    return (
      <PrintableViewer
        printable={activePrintable}
        onBack={() => setActivePrintable(null)}
      />
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
            <FileText className="w-5 h-5 text-green-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-medium text-foreground">Checklists</h1>
        </div>
        <p className="text-muted-foreground">
          Interactive tools designed for ADHD brains. Use them on your phone daily, or print them out for the fridge. If it&apos;s not visible, it doesn&apos;t exist.
        </p>
      </div>

      {categories.map((category) => (
        <div key={category}>
          <h2 className="text-lg font-medium text-foreground mb-3">{category}</h2>
          <div className="space-y-3">
            {PRINTABLES_DATA
              .filter((p) => p.category === category)
              .map((printable) => (
                <button
                  key={printable.id}
                  onClick={() => setActivePrintable(printable)}
                  className="w-full bg-card rounded-2xl p-5 border border-border text-left hover:border-primary/30 hover:shadow-sm transition-all group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-medium text-foreground mb-0.5 group-hover:text-primary transition-colors">
                        {printable.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{printable.description}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary flex-shrink-0 mt-1 transition-colors" />
                  </div>
                </button>
              ))}
          </div>
        </div>
      ))}

      <div className="bg-primary/5 rounded-2xl p-5 border border-primary/10 text-center">
        <p className="text-sm text-foreground/80">
          <strong>Pro tip:</strong> Use these on your phone daily, or print and laminate your favorites for the fridge/door/mirror.
        </p>
      </div>
    </div>
  )
}
