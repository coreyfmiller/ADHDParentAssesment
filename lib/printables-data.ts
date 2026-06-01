// ============================================================
// Printables Data — Structured content for interactive checklists
// Each printable is viewable on phone, checkable, AND printable
// ============================================================

export interface ChecklistItem {
  id: string
  text: string
  note?: string // psychology/rationale note
}

export interface ChecklistSection {
  title: string
  description?: string
  items: ChecklistItem[]
}

export interface FillInItem {
  id: string
  label: string
  description?: string
  lines: number // how many blank lines
}

export interface PrintableData {
  id: string
  title: string
  subtitle: string
  description: string
  category: string
  type: "checklist" | "fill-in" | "mixed" | "cards"
  resetBehavior: "daily" | "manual" // daily = clears each morning, manual = only clears when user clicks reset
  editable?: boolean // if true, fill-in fields are saveable/editable
  sections?: ChecklistSection[]
  fillIns?: FillInItem[]
  cards?: { title: string; content: string; note?: string }[]
  tip?: string
}

export const PRINTABLES_DATA: PrintableData[] = [
  {
    id: "morning-routine-mom",
    title: "Morning Routine (Mom)",
    subtitle: "Do these in order. Don't think. Just follow the list.",
    description: "A visual step-by-step for YOUR morning. Stick it on the bathroom mirror.",
    category: "Routines",
    type: "checklist",
    sections: [
      {
        title: "Before anything else",
        description: "Before phone, before kids, before the world gets a piece of you.",
        items: [
          { id: "mm-1", text: "Feet on floor. Stand up.", note: "Movement signals your brain to wake up. Don't negotiate with the bed." },
          { id: "mm-2", text: "Drink water (glass by the bed, prepared last night)", note: "Dehydration impairs cognition by 15-20%. This is brain fuel." },
          { id: "mm-3", text: "Bathroom. Face wash or splash of cold water.", note: "Cold water activates the sympathetic nervous system. Instant alertness." },
          { id: "mm-4", text: "Get dressed. Actual clothes.", note: "Enclothed cognition: what you wear affects how your brain performs." },
        ],
      },
      {
        title: "Fuel (even a little helps)",
        description: "Perfect isn't the goal. Something is better than nothing.",
        items: [
          { id: "mm-5", text: "Eat something — anything with protein if you can", note: "A cheese stick, a handful of nuts, last night's leftovers. Your brain runs better with fuel. But anything counts." },
          { id: "mm-6", text: "Medication (if applicable)", note: "Pair it with eating if you can. If you forgot yesterday, just take it today. No spiral needed." },
          { id: "mm-7", text: "Coffee/tea — no judgment on the order", note: "Ideally after food, but honestly? Coffee first is fine. You're surviving. Hydrate when you can." },
        ],
      },
      {
        title: "Orientation (60 seconds)",
        description: "What does today need from you?",
        items: [
          { id: "mm-8", text: "Check calendar — what's non-negotiable today?", note: "Only look at TODAY. Not the week." },
          { id: "mm-9", text: "Name your top 3 (write them on a sticky note)", note: "If you can't pick 3, pick 1. One thing is enough." },
          { id: "mm-10", text: "Check the door checklist (bags, lunches, forms)" },
        ],
      },
      {
        title: "Then engage with the world",
        items: [
          { id: "mm-11", text: "Phone/messages/email", note: "Checking your phone before your routine is like opening 30 browser tabs before your brain boots up." },
          { id: "mm-12", text: "Kids' needs", note: "You cannot pour from empty. These 15 minutes are structural, not selfish." },
        ],
      },
    ],
    tip: "This routine takes 15-20 minutes. Set your alarm 20 minutes earlier. The ROI is a completely different morning.",
  },
  {
    id: "morning-routine-kids",
    title: "Morning Routine (Kids)",
    subtitle: "Do these in order. Check each one when it's done!",
    description: "Picture-based checklist for children. They check their own items — reducing YOUR cognitive load.",
    category: "Routines",
    type: "checklist",
    sections: [
      {
        title: "My Morning Jobs ⭐",
        items: [
          { id: "mk-1", text: "🛏️ Make my bed (pull the covers up — doesn't have to be perfect)" },
          { id: "mk-2", text: "🚽 Use the bathroom" },
          { id: "mk-3", text: "👕 Get dressed (clothes are laid out from last night)" },
          { id: "mk-4", text: "🪥 Brush teeth (2 minutes — use the timer)" },
          { id: "mk-5", text: "🍳 Eat breakfast (sit down, not walking around)" },
          { id: "mk-6", text: "🎒 Check my bag (lunchbox, water bottle, folder)" },
          { id: "mk-7", text: "👟 Shoes on, by the door" },
          { id: "mk-8", text: "🧥 Coat/jacket if needed" },
        ],
      },
    ],
    tip: "Works best when: clothes laid out night before, bag packed night before, breakfast limited to 2-3 choices. Laminate and use dry-erase marker daily.",
  },
  {
    id: "before-leaving",
    title: "Before We Leave the House",
    subtitle: "Run your hand down this list. Don't trust your memory — trust the list.",
    description: "Door-level checklist. Tape it to the inside of your front door.",
    category: "Routines",
    type: "checklist",
    sections: [
      {
        title: "Me",
        items: [
          { id: "bl-1", text: "Keys" },
          { id: "bl-2", text: "Phone" },
          { id: "bl-3", text: "Wallet" },
          { id: "bl-4", text: "Water bottle" },
          { id: "bl-5", text: "Sunglasses (if needed)" },
        ],
      },
      {
        title: "Kids",
        items: [
          { id: "bl-6", text: "Backpack(s)" },
          { id: "bl-7", text: "Lunch box(es)" },
          { id: "bl-8", text: "Water bottle(s)" },
          { id: "bl-9", text: "Any forms/notes to return" },
          { id: "bl-10", text: "Show-and-tell / special items" },
        ],
      },
      {
        title: "The house",
        items: [
          { id: "bl-11", text: "Stove/oven off" },
          { id: "bl-12", text: "Lights off" },
          { id: "bl-13", text: "Door locked" },
        ],
      },
    ],
    tip: "\"If it's not visible, it doesn't exist\" — this is your external memory at the exit point.",
  },
  {
    id: "evening-reset",
    title: "Evening Reset (10 min)",
    subtitle: "Set a timer. Do it at the same time every night.",
    description: "Every decision you make tonight is one fewer decision tomorrow morning.",
    category: "Routines",
    type: "checklist",
    sections: [
      {
        title: "The 10-Minute Reset",
        description: "Morning-you is operating on less sleep and more chaos. Evening-you is doing her a favor.",
        items: [
          { id: "er-1", text: "Lay out clothes for tomorrow (yours + kids')", note: "Eliminate the morning 'what do I wear' decision entirely. ~2 min" },
          { id: "er-2", text: "Pack bags/lunches (or prep what you can)", note: "Bags by the door. Lunches in the fridge. Nothing to assemble in the rush. ~2 min" },
          { id: "er-3", text: "Check tomorrow's calendar", note: "Any surprises? Forms due? Early start? Know BEFORE you wake up. ~1 min" },
          { id: "er-4", text: "Set alarms + time-sensitive reminders", note: "Don't trust morning-brain to remember. Tell your phone now. ~1 min" },
          { id: "er-5", text: "Quick kitchen reset (clear counters, start dishwasher)", note: "A clear kitchen in the morning reduces cortisol. It signals 'things are handled.' ~2 min" },
          { id: "er-6", text: "Water glass by bed + phone on charger", note: "Tomorrow's first two needs: hydration and a charged phone. ~1 min" },
          { id: "er-7", text: "Brain dump: write down anything still in your head", note: "If it's in your head, it's keeping you awake. Put it on paper. ~1 min" },
        ],
      },
    ],
    tip: "Total: 10 minutes. The ROI on tomorrow morning: immeasurable. Do this at the same time every night until it's automatic.",
  },
  {
    id: "meal-rotation",
    title: "Weekly Meal Rotation",
    subtitle: "Same 5 meals every week. No decisions. Just rotate.",
    description: "Decision fatigue is real. A rotation eliminates 'what's for dinner?' entirely.",
    category: "Meals",
    type: "fill-in",
    fillIns: [
      { id: "meal-mon", label: "Monday", description: "Quick meal (under 20 min)", lines: 1 },
      { id: "meal-tue", label: "Tuesday", lines: 1 },
      { id: "meal-wed", label: "Wednesday", description: "Prep-ahead meal (cook Sunday, eat Wednesday)", lines: 1 },
      { id: "meal-thu", label: "Thursday", description: "Quick meal (under 20 min)", lines: 1 },
      { id: "meal-fri", label: "Friday", description: "Easy/fun (pizza, takeout, breakfast-for-dinner)", lines: 1 },
      { id: "meal-wknd", label: "Sat/Sun", description: "Flexible: leftovers, takeout, or something fun. No guilt.", lines: 1 },
    ],
    tip: "Rules: At least 2 under 20 min. At least 1 prep-ahead. Cereal night is valid. Repeat this exact rotation for 4 weeks before changing anything. You're not boring — you're strategic.",
  },
  {
    id: "grocery-staples",
    title: "Grocery Staples",
    subtitle: "Same list every week. Check what you need. Don't browse — execute.",
    description: "Pre-filled checkable list organized by store section. In and out in 30 minutes.",
    category: "Meals",
    type: "checklist",
    sections: [
      {
        title: "Produce",
        items: [
          { id: "gs-1", text: "Bananas" }, { id: "gs-2", text: "Apples" }, { id: "gs-3", text: "Berries" },
          { id: "gs-4", text: "Carrots" }, { id: "gs-5", text: "Broccoli" }, { id: "gs-6", text: "Avocados" },
          { id: "gs-7", text: "Salad mix" },
        ],
      },
      {
        title: "Protein",
        items: [
          { id: "gs-8", text: "Chicken" }, { id: "gs-9", text: "Ground meat" }, { id: "gs-10", text: "Eggs" },
          { id: "gs-11", text: "Cheese (sliced)" }, { id: "gs-12", text: "Cheese (shredded)" },
          { id: "gs-13", text: "Yogurt" }, { id: "gs-14", text: "Deli meat" },
        ],
      },
      {
        title: "Pantry / Carbs",
        items: [
          { id: "gs-15", text: "Bread" }, { id: "gs-16", text: "Pasta" }, { id: "gs-17", text: "Rice" },
          { id: "gs-18", text: "Cereal" }, { id: "gs-19", text: "Crackers" }, { id: "gs-20", text: "Tortillas" },
          { id: "gs-21", text: "Oats" },
        ],
      },
      {
        title: "Dairy / Fridge",
        items: [
          { id: "gs-22", text: "Milk" }, { id: "gs-23", text: "Butter" },
          { id: "gs-24", text: "Cream cheese" }, { id: "gs-25", text: "Juice boxes" },
        ],
      },
      {
        title: "Snacks / Kids",
        items: [
          { id: "gs-26", text: "Granola bars" }, { id: "gs-27", text: "Goldfish/crackers" },
          { id: "gs-28", text: "Applesauce pouches" }, { id: "gs-29", text: "String cheese" },
        ],
      },
      {
        title: "Household",
        items: [
          { id: "gs-30", text: "Paper towels" }, { id: "gs-31", text: "Toilet paper" },
          { id: "gs-32", text: "Dish soap" }, { id: "gs-33", text: "Trash bags" },
        ],
      },
    ],
    tip: "Laminate this. Use a dry-erase marker each week. Only buy what's checked. Same list, every week, no decisions.",
  },
  {
    id: "sensory-break",
    title: "Sensory Break Protocol",
    subtitle: "When your nervous system is hitting capacity",
    description: "3-level system for when you're too activated to remember what to do.",
    category: "Self-Awareness",
    type: "cards",
    cards: [
      {
        title: "🟢 Level 1 — Building (catch it early)",
        content: "Noise getting louder. Touch irritating. Jaw clenching.",
        note: "→ Put in one earbud (halves the input)\n→ Step into another room for 60 seconds\n→ Splash cold water on wrists\n→ Say: \"I'm getting activated. I need 2 minutes.\"",
      },
      {
        title: "🟡 Level 2 — Overwhelmed (at the edge)",
        content: "Skin crawling. Can't think. Everything TOO MUCH. Snapping imminent.",
        note: "→ Noise-canceling headphones ON (or bathroom, door closed)\n→ Lights off or dimmed\n→ Pressure: squeeze arms, sit on hands, weighted blanket\n→ 5 minutes minimum. Set a timer.\n→ Tell kids: \"Mommy needs a quiet break. Back in 5 minutes.\"",
      },
      {
        title: "🔴 Level 3 — Shutdown/Explosion",
        content: "Already snapped, or gone completely numb. Damage control.",
        note: "→ Remove yourself physically. Bathroom. Car. Closet.\n→ Cold water on face (activates dive reflex — instant reset)\n→ Breathe: in 4, hold 4, out 8. Repeat 5x.\n→ Do NOT parent or problem-solve until heart rate drops.\n→ When ready: use your repair script.",
      },
    ],
    tip: "Sensory breaks are PREVENTIVE, not indulgent. Take them BEFORE you hit the wall. Your nervous system has a threshold — respect it.",
  },
  {
    id: "repair-scripts",
    title: "Repair Script Cards",
    subtitle: "For when you need the words and can't think.",
    description: "Age-specific scripts for after you've yelled, snapped, or shut down.",
    category: "Scripts",
    type: "cards",
    cards: [
      {
        title: "After yelling — Toddler/Preschool (2-5)",
        content: "\"I'm sorry I used my big voice. That was too loud. You didn't do anything wrong. Mommy's body got too full of feelings and they came out too big. I love you. Can I have a hug?\"",
        note: "Get on their level physically. Touch if they'll allow it. Keep it short — they need reassurance, not explanation.",
      },
      {
        title: "After yelling — School Age (6-10)",
        content: "\"Hey. I need to talk to you about earlier. I yelled, and that wasn't okay. You didn't deserve that. I was feeling [overwhelmed/frustrated/exhausted] and I handled it badly. That's my responsibility, not yours. I'm sorry. What do you need from me right now?\"",
        note: "Name YOUR emotion. Take clear responsibility. Ask what they need. Don't over-explain or make it about you.",
      },
      {
        title: "After yelling — Tween/Teen (11+)",
        content: "\"I owe you an apology. I lost my temper and I said things in a way that wasn't respectful. You deserve better than that from me. I was [stressed/overwhelmed/triggered] and I took it out on you. That's not your fault. I'm working on it. I'm sorry.\"",
        note: "Be direct. Don't minimize. Don't justify. Model accountability without groveling. They're watching how adults handle mistakes.",
      },
      {
        title: "After shutting down / withdrawing",
        content: "\"I went quiet earlier and I want you to know that wasn't about you. My brain needed to shut down for a bit because I was too overwhelmed to talk. I'm back now. Are you okay?\"",
        note: "Kids interpret silence as rejection. Name what happened so they don't fill the gap with 'mom doesn't love me.'",
      },
    ],
    tip: "Repair is not weakness. It's the most powerful parenting tool that exists. Rupture is inevitable — repair is what determines the long-term impact.",
  },
  {
    id: "today-enough",
    title: "Today I Did Enough",
    subtitle: "Fill this in at the end of the day. Not to perform — to witness yourself.",
    description: "Daily acknowledgment: what you did, what you let go, what you're proud of.",
    category: "Self-Compassion",
    type: "fill-in",
    fillIns: [
      { id: "te-1", label: "Three things I did today (any size)", description: "Not what you should have done. What you actually did. Cereal counts.", lines: 3 },
      { id: "te-2", label: "One thing I let go of today", description: "Something you chose not to do, not to fix, not to carry. Letting go is a skill.", lines: 1 },
      { id: "te-3", label: "One thing I'm proud of (even if it's small)", description: "Not proud by anyone else's standards. Proud by yours.", lines: 1 },
      { id: "te-4", label: "Tomorrow I need", description: "One word. Sleep. Help. Quiet. Space. Food. Whatever it is.", lines: 1 },
    ],
    tip: "I did not have to be perfect today. I just had to be here. And I was.",
  },
  {
    id: "permission-slips",
    title: "Permission Slips",
    subtitle: "Read them when the guilt comes.",
    description: "12 cognitive reframes for the shame patterns that keep you stuck.",
    category: "Self-Compassion",
    type: "cards",
    cards: [
      { title: "Permission granted", content: "To serve cereal for dinner without guilt or explanation.", note: "Fed is fed. ✓" },
      { title: "Permission granted", content: "To say no to a social event because you have nothing left.", note: "Boundaries are self-care. ✓" },
      { title: "Permission granted", content: "To let the house be messy while you rest.", note: "You matter more than the dishes. ✓" },
      { title: "Permission granted", content: "To use screens so you can have 30 minutes of silence.", note: "Regulated mom > screen-free mom. ✓" },
      { title: "Permission granted", content: "To not enjoy every moment of motherhood.", note: "Love ≠ enjoyment. Both are real. ✓" },
      { title: "Permission granted", content: "To ask for help without justifying why you need it.", note: "Needing help is human. ✓" },
      { title: "Permission granted", content: "To do the bare minimum today and call it enough.", note: "Survival mode is still a mode. ✓" },
      { title: "Permission granted", content: "To feel angry without being a bad person.", note: "Anger is information. ✓" },
      { title: "Permission granted", content: "To not respond to that text/email/message today.", note: "Your availability is not unlimited. ✓" },
      { title: "Permission granted", content: "To want time alone without feeling guilty about it.", note: "Solitude is a need, not a luxury. ✓" },
      { title: "Permission granted", content: "To cry in the car/shower/closet. Wherever you need to.", note: "Tears are release, not weakness. ✓" },
      { title: "Permission granted", content: "To be a good mother AND a struggling person at the same time.", note: "Both are true. Always. ✓" },
    ],
    tip: "These are not jokes. They are prescriptions for self-compassion. Each one counters a specific belief that's costing you energy.",
  },
  {
    id: "weekly-brain-dump",
    title: "Weekly Brain Dump",
    subtitle: "15 minutes. Get it ALL out of your head.",
    description: "Structured template for your Sunday review. Your working memory can hold 3-4 items — you're asking it to hold 40+.",
    category: "Organization",
    type: "fill-in",
    fillIns: [
      { id: "bd-1", label: "📅 This week's non-negotiables", description: "Appointments, deadlines, events that CANNOT move. Check your calendar.", lines: 5 },
      { id: "bd-2", label: "📧 Things to respond to / follow up on", description: "Emails, texts, school notes, forms, RSVPs — anything waiting for your action.", lines: 4 },
      { id: "bd-3", label: "🏠 Household tasks this week", description: "Not everything. Just what actually needs doing THIS week.", lines: 4 },
      { id: "bd-4", label: "🛒 Need to buy", lines: 3 },
      { id: "bd-5", label: "📞 Need to call/book", lines: 3 },
      { id: "bd-6", label: "🧠 What's taking up mental space", description: "Worries, unresolved things, stuff you keep thinking about. Get it out.", lines: 3 },
      { id: "bd-7", label: "⭐ My top 3 for this week", description: "If you could only do 3 things, what would make the biggest difference?", lines: 3 },
    ],
    tip: "Do this every week. Same time. Same place. It becomes automatic. Watch your Monday anxiety drop.",
  },
  {
    id: "energy-tracker",
    title: "Energy Tracking (2 Weeks)",
    subtitle: "Circle H/M/L for each time of day. After 14 days, look for patterns.",
    description: "You can't manage what you can't see. After 2 weeks you'll know your patterns.",
    category: "Self-Awareness",
    type: "mixed",
    sections: [
      {
        title: "Daily Energy Log",
        description: "H = High (I have capacity) · M = Medium (functioning but tired) · L = Low (survival mode)",
        items: [
          { id: "et-1", text: "Day 1: Morning __ | Midday __ | Afternoon __ | Evening __ | Sleep hrs: __" },
          { id: "et-2", text: "Day 2: Morning __ | Midday __ | Afternoon __ | Evening __ | Sleep hrs: __" },
          { id: "et-3", text: "Day 3: Morning __ | Midday __ | Afternoon __ | Evening __ | Sleep hrs: __" },
          { id: "et-4", text: "Day 4: Morning __ | Midday __ | Afternoon __ | Evening __ | Sleep hrs: __" },
          { id: "et-5", text: "Day 5: Morning __ | Midday __ | Afternoon __ | Evening __ | Sleep hrs: __" },
          { id: "et-6", text: "Day 6: Morning __ | Midday __ | Afternoon __ | Evening __ | Sleep hrs: __" },
          { id: "et-7", text: "Day 7: Morning __ | Midday __ | Afternoon __ | Evening __ | Sleep hrs: __" },
          { id: "et-8", text: "Day 8: Morning __ | Midday __ | Afternoon __ | Evening __ | Sleep hrs: __" },
          { id: "et-9", text: "Day 9: Morning __ | Midday __ | Afternoon __ | Evening __ | Sleep hrs: __" },
          { id: "et-10", text: "Day 10: Morning __ | Midday __ | Afternoon __ | Evening __ | Sleep hrs: __" },
          { id: "et-11", text: "Day 11: Morning __ | Midday __ | Afternoon __ | Evening __ | Sleep hrs: __" },
          { id: "et-12", text: "Day 12: Morning __ | Midday __ | Afternoon __ | Evening __ | Sleep hrs: __" },
          { id: "et-13", text: "Day 13: Morning __ | Midday __ | Afternoon __ | Evening __ | Sleep hrs: __" },
          { id: "et-14", text: "Day 14: Morning __ | Midday __ | Afternoon __ | Evening __ | Sleep hrs: __" },
        ],
      },
    ],
    fillIns: [
      { id: "et-q1", label: "Which day of the week is consistently lowest?", lines: 1 },
      { id: "et-q2", label: "What time of day do I crash most often?", lines: 1 },
      { id: "et-q3", label: "Do I see a pattern with sleep hours?", lines: 1 },
      { id: "et-q4", label: "What happened on my best days that was different?", lines: 1 },
    ],
    tip: "This is self-awareness data, not a diagnostic tool. After 14 days, bring this to your coach chat — it'll help personalize your strategies.",
  },
]