"use client"

import { FileText, Printer } from "lucide-react"
import { PRINTABLES } from "@/lib/printables-content"

const categories = [...new Set(PRINTABLES.map((p) => p.category))]

export default function PrintablesPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
            <FileText className="w-5 h-5 text-green-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-medium text-foreground">Printables</h1>
        </div>
        <p className="text-muted-foreground">
          Visual tools designed for ADHD brains. Print them, laminate them, stick them where you&apos;ll see them. If it&apos;s not visible, it doesn&apos;t exist.
        </p>
      </div>

      {categories.map((category) => (
        <div key={category}>
          <h2 className="text-lg font-medium text-foreground mb-3">{category}</h2>
          <div className="space-y-3">
            {PRINTABLES
              .filter((p) => p.category === category)
              .map((printable, idx) => (
                <div
                  key={idx}
                  className="bg-card rounded-2xl p-5 border border-border flex items-start justify-between gap-4"
                >
                  <div>
                    <h3 className="font-medium text-foreground mb-0.5">{printable.title}</h3>
                    <p className="text-sm text-muted-foreground">{printable.description}</p>
                  </div>
                  <button
                    onClick={() => {
                      const printWindow = window.open("", "_blank")
                      if (printWindow) {
                        printWindow.document.write(printable.content)
                        printWindow.document.close()
                        setTimeout(() => printWindow.print(), 250)
                      }
                    }}
                    className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"
                    title={`Print ${printable.title}`}
                    aria-label={`Print ${printable.title}`}
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                </div>
              ))}
          </div>
        </div>
      ))}

      <div className="bg-primary/5 rounded-2xl p-5 border border-primary/10 text-center">
        <p className="text-sm text-foreground/80">
          <strong>Pro tip:</strong> Laminate your most-used printables so they survive the chaos of family life. Dollar store laminating sheets work perfectly.
        </p>
      </div>
    </div>
  )
}
