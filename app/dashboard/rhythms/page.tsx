"use client"

import { useState, useEffect } from "react"
import { Coffee, Sun, Moon, AlertTriangle, UtensilsCrossed, Pencil, Check, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

const rhythms = [
  {
    id: "high-spoon",
    icon: <Sun className="w-5 h-5" />,
    title: "High-Spoon Day",
    subtitle: "You woke up with energy. Use it wisely — don't burn it all by noon.",
    color: "bg-amber-500/10 text-amber-600",
    items: [
      { time: "Morning", task: "Tackle ONE admin task you've been avoiding (the form, the email, the appointment)" },
      { time: "Mid-morning", task: "Do the hardest household task while energy is high (meal prep, deep clean one room)" },
      { time: "Afternoon", task: "Batch errands if possible (grocery + pharmacy + returns in one trip)" },
      { time: "Evening", task: "Prep for tomorrow (lay out clothes, pack bags, check calendar)" },
      { time: "Before bed", task: "Acknowledge what you accomplished. Write it down. You did that." },
    ],
  },
  {
    id: "low-spoon",
    icon: <Moon className="w-5 h-5" />,
    title: "Low-Spoon Day",
    subtitle: "Today is about survival, not productivity. Lower every bar.",
    color: "bg-blue-500/10 text-blue-600",
    items: [
      { time: "Morning", task: "Get everyone fed (cereal counts) and out the door (or not — screen time is fine)" },
      { time: "Mid-morning", task: "Do the ONE thing that prevents tomorrow from being harder (one load of laundry, one dish cycle)" },
      { time: "Afternoon", task: "Rest when possible. Screens for kids. Couch for you. No guilt." },
      { time: "Evening", task: "Simplest possible dinner (frozen food, takeout, sandwiches — all valid)" },
      { time: "Before bed", task: "You survived. That's enough. Tomorrow might be different." },
    ],
  },
  {
    id: "crisis",
    icon: <AlertTriangle className="w-5 h-5" />,
    title: "Crisis Day",
    subtitle: "Everything has gone wrong. Here's your bare minimum.",
    color: "bg-red-500/10 text-red-600",
    items: [
      { time: "Priority 1", task: "Are the children safe? Yes? You're doing your job." },
      { time: "Priority 2", task: "Has everyone eaten something today? Anything counts." },
      { time: "Priority 3", task: "Can you get through the next hour? Focus only on that." },
      { time: "Priority 4", task: "Call in help if you have it. Text someone. You don't have to do this alone today." },
      { time: "Priority 5", task: "Tomorrow is a new day. Today just needs to end. Let it end." },
    ],
  },
]

const defaultMealRotation = [
  { day: "Monday", meal: "Pasta night (jar sauce + noodles + whatever protein is in the fridge)" },
  { day: "Tuesday", meal: "Sheet pan dinner (protein + vegetables + seasoning, one pan, done)" },
  { day: "Wednesday", meal: "Slow cooker / instant pot (dump it in the morning, eat at night)" },
  { day: "Thursday", meal: "Breakfast for dinner (eggs, toast, fruit — kids love it, zero effort)" },
  { day: "Friday", meal: "Takeout or frozen pizza (this is PLANNED, not failure)" },
  { day: "Saturday", meal: "Leftovers, eating out, or whatever feels right" },
  { day: "Sunday", meal: "Leftovers, eating out, or whatever feels right" },
]

const mealSystem = {
  tiers: [
    { level: "No energy", options: "Cereal. Toast. Frozen meals. Sandwiches. Fruit and cheese plate. Ordering delivery." },
    { level: "10 minutes", options: "Quesadillas. Scrambled eggs. Instant ramen with an egg cracked in. Peanut butter wraps." },
    { level: "20 minutes", options: "Pasta with jar sauce. Stir-fry with frozen veg. Tacos with pre-seasoned meat. Soup from a can + grilled cheese." },
    { level: "Some energy", options: "Sheet pan meal. One-pot recipe. Slow cooker dump. Homemade mac and cheese." },
  ],
  pantryStaples: [
    "Pasta + jar sauce",
    "Rice (instant or microwave pouches)",
    "Canned beans",
    "Frozen vegetables",
    "Eggs",
    "Bread / tortillas",
    "Peanut butter",
    "Cheese (shredded bags)",
    "Frozen chicken tenders / fish sticks",
    "Canned soup",
    "Butter",
    "Basic seasonings (salt, pepper, garlic powder)",
  ],
}

export default function RhythmsPage() {
  const [mealRotation, setMealRotation] = useState(defaultMealRotation)
  const [editingDay, setEditingDay] = useState<string | null>(null)
  const [editValue, setEditValue] = useState("")

  useEffect(() => {
    try {
      const stored = localStorage.getItem("mindful-mama-meal-rotation")
      if (stored) {
        setMealRotation(JSON.parse(stored))
      }
    } catch {}
  }, [])

  const saveMealRotation = (updated: typeof defaultMealRotation) => {
    setMealRotation(updated)
    localStorage.setItem("mindful-mama-meal-rotation", JSON.stringify(updated))
  }

  const startEditing = (day: string, currentMeal: string) => {
    setEditingDay(day)
    setEditValue(currentMeal)
  }

  const saveEdit = (day: string) => {
    if (editValue.trim()) {
      const updated = mealRotation.map((item) =>
        item.day === day ? { ...item, meal: editValue.trim() } : item
      )
      saveMealRotation(updated)
    }
    setEditingDay(null)
    setEditValue("")
  }

  const resetToDefaults = () => {
    saveMealRotation(defaultMealRotation)
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
            <Coffee className="w-5 h-5 text-amber-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-medium text-foreground">Daily Rhythms</h1>
        </div>
        <p className="text-muted-foreground">
          Not every day is the same. Your energy fluctuates — and your expectations need to flex with it.
        </p>
      </div>

      {/* Rhythm templates */}
      <div className="space-y-6">
        {rhythms.map((rhythm) => (
          <div key={rhythm.id} className="bg-card rounded-2xl p-6 md:p-8 border border-border">
            <div className="flex items-center gap-3 mb-2">
              <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center", rhythm.color)}>
                {rhythm.icon}
              </div>
              <h2 className="text-xl font-medium text-foreground">{rhythm.title}</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-5 italic">{rhythm.subtitle}</p>
            <div className="space-y-3">
              {rhythm.items.map((item, idx) => (
                <div key={idx} className="flex gap-3">
                  <span className="text-xs font-medium text-primary uppercase tracking-wide w-24 flex-shrink-0 pt-0.5">
                    {item.time}
                  </span>
                  <p className="text-sm text-foreground/80">{item.task}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Meal System */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
            <UtensilsCrossed className="w-5 h-5 text-green-600" />
          </div>
          <h2 className="text-2xl font-medium text-foreground">The No-Decision Meal System</h2>
        </div>
        <p className="text-muted-foreground mb-6">
          Stop deciding what&apos;s for dinner every night. Decide once, repeat forever. Swap meals around when you want novelty — but the default is set.
        </p>

        {/* Weekly rotation */}
        <div className="bg-card rounded-2xl p-6 md:p-8 border border-border mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-foreground">Your Weekly Rotation</h3>
            <button
              onClick={resetToDefaults}
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              title="Reset to defaults"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          </div>
          <p className="text-xs text-muted-foreground mb-4">
            Tap any meal to customize it. Make this YOUR rotation — these are just suggestions to start.
          </p>
          <div className="space-y-3">
            {mealRotation.map((item) => (
              <div key={item.day} className="flex gap-3 items-start">
                <span className="text-sm font-medium text-primary w-24 flex-shrink-0 pt-1">{item.day}</span>
                {editingDay === item.day ? (
                  <div className="flex-1 flex gap-2">
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") saveEdit(item.day)
                        if (e.key === "Escape") setEditingDay(null)
                      }}
                      autoFocus
                      className="flex-1 text-sm bg-secondary/50 border border-primary/30 rounded-lg px-3 py-1.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                    <button
                      onClick={() => saveEdit(item.day)}
                      className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                    >
                      <Check className="w-4 h-4 text-primary" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => startEditing(item.day, item.meal)}
                    className="flex-1 text-left group flex items-start gap-2"
                  >
                    <p className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">{item.meal}</p>
                    <Pencil className="w-3 h-3 text-muted-foreground/0 group-hover:text-muted-foreground mt-1 flex-shrink-0 transition-colors" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Energy tiers */}
        <div className="bg-card rounded-2xl p-6 md:p-8 border border-border mb-6">
          <h3 className="font-medium text-foreground mb-4">The Energy Tier System</h3>
          <p className="text-sm text-muted-foreground mb-4">Match your dinner to your actual energy, not your aspirations.</p>
          <div className="space-y-4">
            {mealSystem.tiers.map((tier, idx) => (
              <div key={idx} className="bg-secondary/30 rounded-xl p-4">
                <span className="text-xs font-medium text-primary uppercase tracking-wide">{tier.level}</span>
                <p className="text-sm text-foreground/80 mt-1">{tier.options}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pantry staples */}
        <div className="bg-card rounded-2xl p-6 md:p-8 border border-border">
          <h3 className="font-medium text-foreground mb-4">The Always-Have-These Pantry List</h3>
          <p className="text-sm text-muted-foreground mb-4">
            If these 12 things are in your house, you can always assemble a meal without planning.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {mealSystem.pantryStaples.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm text-foreground/80">
                <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
