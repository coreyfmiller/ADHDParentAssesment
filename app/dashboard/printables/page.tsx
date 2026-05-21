"use client"

import { FileText, Printer } from "lucide-react"

const printables = [
  {
    title: "Morning Routine Checklist (Mom)",
    description: "A visual step-by-step for YOUR morning. Laminate it. Stick it on the bathroom mirror.",
    category: "Routines",
  },
  {
    title: "Morning Routine Checklist (Kids)",
    description: "Picture-based checklist for children. They check their own items — reducing YOUR cognitive load.",
    category: "Routines",
  },
  {
    title: "Before We Leave the House",
    description: "Door-level checklist: bag, lunch, water, keys, phone, forms. Run your hand down it every time.",
    category: "Routines",
  },
  {
    title: "Evening Reset Checklist",
    description: "10-minute evening routine: lay out clothes, pack bags, check calendar, set alarms. Timer-based.",
    category: "Routines",
  },
  {
    title: "Weekly Meal Rotation Card",
    description: "Fridge-magnet sized card with your 5-day meal rotation. No more 'what's for dinner?' paralysis.",
    category: "Meals",
  },
  {
    title: "Grocery Staples List",
    description: "Pre-filled checkable list organized by store section. Same items every week. Just check and go.",
    category: "Meals",
  },
  {
    title: "Energy Tracking Sheet",
    description: "Simple daily tracker: high/medium/low energy. After 2 weeks, you'll see your patterns clearly.",
    category: "Self-Awareness",
  },
  {
    title: "The Repair Script Card",
    description: "Wallet-sized card with your repair script. For when you need the words and can't think.",
    category: "Scripts",
  },
  {
    title: "Sensory Break Reminder",
    description: "Fridge-level reminder of your sensory break protocol. For when you're too activated to remember.",
    category: "Self-Awareness",
  },
  {
    title: "Today I Did Enough",
    description: "Daily acknowledgment card. Three lines to fill in: what you did, what you let go, what you're proud of.",
    category: "Self-Compassion",
  },
  {
    title: "Permission Slips",
    description: "12 printable permission slips to cut out and stick on your mirror. 'Permission to serve cereal for dinner.'",
    category: "Self-Compassion",
  },
  {
    title: "The Weekly Brain Dump Template",
    description: "Structured template for your Sunday review: calendar check, school emails, upcoming events, prep tasks.",
    category: "Organization",
  },
]

const categories = [...new Set(printables.map((p) => p.category))]

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
            {printables
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
                        printWindow.document.write(`
                          <html><head><title>${printable.title}</title>
                          <style>body{font-family:system-ui,sans-serif;padding:2rem;max-width:600px;margin:0 auto}h1{font-size:1.5rem;margin-bottom:0.5rem}p{color:#666;font-size:0.9rem}</style>
                          </head><body>
                          <h1>${printable.title}</h1>
                          <p>${printable.description}</p>
                          <hr style="margin:1.5rem 0"/>
                          <p style="color:#999;font-size:0.75rem">Mindful Mama — mindfulmama.co</p>
                          </body></html>
                        `)
                        printWindow.document.close()
                        printWindow.print()
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
