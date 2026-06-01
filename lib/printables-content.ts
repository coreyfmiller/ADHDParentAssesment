// ============================================================
// Printables Content — Clinically-informed, actionable tools
// Designed for executive function challenges
//
// Principles:
// 1. Visual > text-heavy (ADHD brains process visually)
// 2. Externalize what the brain can't hold
// 3. Reduce decisions (pre-made choices)
// 4. Forgiving structure (not rigid perfection)
// 5. Placed where they'll be SEEN (fridge, mirror, door)
// ============================================================

export interface PrintableContent {
  title: string
  description: string
  category: string
  content: string // HTML content for the printable
}

export const PRINTABLES: PrintableContent[] = [
  {
    title: "Morning Routine Checklist (Mom)",
    description: "A visual step-by-step for YOUR morning. Laminate it. Stick it on the bathroom mirror.",
    category: "Routines",
    content: `
<html><head><title>Morning Routine — Mom</title>
<style>
  body { font-family: system-ui, -apple-system, sans-serif; padding: 2rem; max-width: 550px; margin: 0 auto; }
  h1 { font-size: 1.4rem; margin-bottom: 0.25rem; }
  .subtitle { color: #888; font-size: 0.85rem; margin-bottom: 1.5rem; }
  .checklist { list-style: none; padding: 0; }
  .checklist li { padding: 0.6rem 0; border-bottom: 1px solid #eee; display: flex; align-items: flex-start; gap: 0.75rem; font-size: 0.95rem; }
  .checkbox { width: 20px; height: 20px; border: 2px solid #ccc; border-radius: 4px; flex-shrink: 0; margin-top: 2px; }
  .note { font-size: 0.75rem; color: #999; margin-top: 0.25rem; }
  .section-label { font-weight: 600; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: #b07070; margin-top: 1.25rem; margin-bottom: 0.5rem; }
  .footer { margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #eee; font-size: 0.7rem; color: #aaa; text-align: center; }
</style></head><body>
<h1>My Morning Routine</h1>
<p class="subtitle">Do these in order. Don't think. Just follow the list.</p>

<p class="section-label">Before anything else (before phone, before kids)</p>
<ul class="checklist">
  <li><div class="checkbox"></div><div>Feet on floor. Stand up.<div class="note">Movement signals your brain to wake up. Don't negotiate with the bed.</div></div></li>
  <li><div class="checkbox"></div><div>Drink water (glass by the bed, prepared last night)<div class="note">Dehydration impairs cognition by 15-20%. This is brain fuel, not wellness culture.</div></div></li>
  <li><div class="checkbox"></div><div>Bathroom. Face wash or splash of cold water.<div class="note">Cold water activates the sympathetic nervous system. Instant alertness.</div></div></li>
  <li><div class="checkbox"></div><div>Get dressed. Actual clothes. Not pajamas with a bra.<div class="note">Enclothed cognition: what you wear affects how your brain performs. Dressed = activated.</div></div></li>
</ul>

<p class="section-label">Fuel (before you give anything to anyone)</p>
<ul class="checklist">
  <li><div class="checkbox"></div><div>Eat something with protein<div class="note">Protein → amino acids → dopamine precursors. Your ADHD brain needs this more than coffee.</div></div></li>
  <li><div class="checkbox"></div><div>Medication (if applicable)<div class="note">Same time every day. Pair it with the eating step so it becomes automatic.</div></div></li>
  <li><div class="checkbox"></div><div>Coffee/tea (after food, not instead of it)</div></li>
</ul>

<p class="section-label">Orientation (60 seconds — what does today need?)</p>
<ul class="checklist">
  <li><div class="checkbox"></div><div>Check calendar — what's non-negotiable today?<div class="note">Only look at TODAY. Not the week. Not the month. Just today.</div></div></li>
  <li><div class="checkbox"></div><div>Name your top 3 (write them on a sticky note)<div class="note">If you can't pick 3, pick 1. One thing is enough.</div></div></li>
  <li><div class="checkbox"></div><div>Check the door checklist (bags, lunches, forms)</div></li>
</ul>

<p class="section-label">Then — and only then — engage with the world</p>
<ul class="checklist">
  <li><div class="checkbox"></div><div>Phone/messages/email<div class="note">Checking your phone before your routine is like opening 30 browser tabs before your brain boots up.</div></div></li>
  <li><div class="checkbox"></div><div>Kids' needs (they can wait 15 minutes if safe)<div class="note">You cannot pour from empty. These 15 minutes are not selfish — they're structural.</div></div></li>
</ul>

<div class="footer">Mindful Mama — mindfulmama.ai<br/>This is not medical advice. It's a structure for brains that struggle with structure.</div>
</body></html>`,
  },
  {
    title: "Morning Routine Checklist (Kids)",
    description: "Picture-based checklist for children. They check their own items — reducing YOUR cognitive load.",
    category: "Routines",
    content: `<html><head><title>Morning Routine — Kids</title>
<style>
  body { font-family: system-ui, -apple-system, sans-serif; padding: 2rem; max-width: 500px; margin: 0 auto; }
  h1 { font-size: 1.5rem; margin-bottom: 0.25rem; }
  .subtitle { color: #888; font-size: 0.85rem; margin-bottom: 1.5rem; }
  .checklist { list-style: none; padding: 0; }
  .checklist li { padding: 0.75rem 0.5rem; border-bottom: 1px solid #f0f0f0; display: flex; align-items: center; gap: 1rem; font-size: 1.1rem; }
  .checkbox { width: 28px; height: 28px; border: 2.5px solid #ddd; border-radius: 6px; flex-shrink: 0; }
  .emoji { font-size: 1.4rem; }
  .footer { margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #eee; font-size: 0.7rem; color: #aaa; text-align: center; }
  .parent-note { background: #f9f5f5; border-radius: 8px; padding: 0.75rem; margin-top: 1.5rem; font-size: 0.75rem; color: #888; }
</style></head><body>
<h1>My Morning Jobs ⭐</h1>
<p class="subtitle">Do these in order. Check each one when it's done!</p>

<ul class="checklist">
  <li><div class="checkbox"></div><span class="emoji">🛏️</span> Make my bed (pull the covers up — doesn't have to be perfect)</li>
  <li><div class="checkbox"></div><span class="emoji">🚽</span> Use the bathroom</li>
  <li><div class="checkbox"></div><span class="emoji">👕</span> Get dressed (clothes are laid out from last night)</li>
  <li><div class="checkbox"></div><span class="emoji">🪥</span> Brush teeth (2 minutes — use the timer)</li>
  <li><div class="checkbox"></div><span class="emoji">🍳</span> Eat breakfast (sit down, not walking around)</li>
  <li><div class="checkbox"></div><span class="emoji">🎒</span> Check my bag (lunchbox, water bottle, folder)</li>
  <li><div class="checkbox"></div><span class="emoji">👟</span> Shoes on, by the door</li>
  <li><div class="checkbox"></div><span class="emoji">🧥</span> Coat/jacket if needed</li>
</ul>

<div class="parent-note">
  <strong>Parent note:</strong> This checklist works best when: (1) clothes are laid out the night before, (2) the bag is packed the night before, (3) breakfast options are limited to 2-3 choices. The goal is to reduce decisions, not add them. Laminate this and use a dry-erase marker so they can check it daily.
</div>

<div class="footer">Mindful Mama — mindfulmama.ai</div>
</body></html>`,
  },
  {
    title: "Before We Leave the House",
    description: "Door-level checklist: bag, lunch, water, keys, phone, forms. Run your hand down it every time.",
    category: "Routines",
    content: `<html><head><title>Before We Leave the House</title>
<style>
  body { font-family: system-ui, -apple-system, sans-serif; padding: 2rem; max-width: 450px; margin: 0 auto; }
  h1 { font-size: 1.4rem; margin-bottom: 0.25rem; text-align: center; }
  .subtitle { color: #888; font-size: 0.8rem; margin-bottom: 1.5rem; text-align: center; }
  .section { margin-bottom: 1.25rem; }
  .section-title { font-weight: 600; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: #b07070; margin-bottom: 0.5rem; }
  .checklist { list-style: none; padding: 0; }
  .checklist li { padding: 0.5rem 0; border-bottom: 1px solid #f5f0f0; display: flex; align-items: center; gap: 0.6rem; font-size: 0.95rem; }
  .checkbox { width: 18px; height: 18px; border: 2px solid #ddd; border-radius: 3px; flex-shrink: 0; }
  .footer { margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid #eee; font-size: 0.7rem; color: #aaa; text-align: center; }
  .instruction { background: #faf5f5; border-radius: 8px; padding: 0.75rem; font-size: 0.8rem; color: #666; text-align: center; margin-bottom: 1.5rem; }
</style></head><body>
<h1>🚪 Before We Leave</h1>
<p class="subtitle">Tape this to the inside of your front door. Touch each item.</p>
<div class="instruction">Run your hand down this list. Don't trust your memory — trust the list.</div>

<div class="section">
  <div class="section-title">Me</div>
  <ul class="checklist">
    <li><div class="checkbox"></div>Keys</li>
    <li><div class="checkbox"></div>Phone</li>
    <li><div class="checkbox"></div>Wallet</li>
    <li><div class="checkbox"></div>Water bottle</li>
    <li><div class="checkbox"></div>Sunglasses (if needed)</li>
  </ul>
</div>

<div class="section">
  <div class="section-title">Kids</div>
  <ul class="checklist">
    <li><div class="checkbox"></div>Backpack(s)</li>
    <li><div class="checkbox"></div>Lunch box(es)</li>
    <li><div class="checkbox"></div>Water bottle(s)</li>
    <li><div class="checkbox"></div>Any forms/notes to return</li>
    <li><div class="checkbox"></div>Show-and-tell / special items</li>
  </ul>
</div>

<div class="section">
  <div class="section-title">The house</div>
  <ul class="checklist">
    <li><div class="checkbox"></div>Stove/oven off</li>
    <li><div class="checkbox"></div>Lights off</li>
    <li><div class="checkbox"></div>Door locked</li>
  </ul>
</div>

<div class="footer">Mindful Mama — mindfulmama.ai<br/>"If it's not visible, it doesn't exist" — this is your external memory.</div>
</body></html>`,
  },
  {
    title: "Evening Reset Checklist",
    description: "10-minute evening routine: lay out clothes, pack bags, check calendar, set alarms. Timer-based.",
    category: "Routines",
    content: `<html><head><title>Evening Reset — 10 Minutes</title>
<style>
  body { font-family: system-ui, -apple-system, sans-serif; padding: 2rem; max-width: 500px; margin: 0 auto; }
  h1 { font-size: 1.4rem; margin-bottom: 0.25rem; }
  .subtitle { color: #888; font-size: 0.85rem; margin-bottom: 1.5rem; }
  .checklist { list-style: none; padding: 0; }
  .checklist li { padding: 0.6rem 0; border-bottom: 1px solid #f0f0f0; display: flex; align-items: flex-start; gap: 0.75rem; font-size: 0.95rem; }
  .checkbox { width: 20px; height: 20px; border: 2px solid #ccc; border-radius: 4px; flex-shrink: 0; margin-top: 2px; }
  .time { font-size: 0.7rem; color: #b07070; font-weight: 600; }
  .note { font-size: 0.75rem; color: #999; margin-top: 0.2rem; }
  .footer { margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #eee; font-size: 0.7rem; color: #aaa; text-align: center; }
  .why { background: #faf5f5; border-radius: 8px; padding: 0.75rem; font-size: 0.8rem; color: #666; margin-bottom: 1.5rem; }
</style></head><body>
<h1>Evening Reset</h1>
<p class="subtitle">10 minutes. Set a timer. Do it at the same time every night.</p>
<div class="why"><strong>Why this works:</strong> Every decision you make tonight is one fewer decision tomorrow morning. Morning-you is operating on less sleep and more chaos. Evening-you is doing her a favor.</div>

<ul class="checklist">
  <li><div class="checkbox"></div><div><span class="time">2 min</span> — Lay out clothes for tomorrow (yours + kids')<div class="note">Eliminate the morning "what do I wear" decision entirely.</div></div></li>
  <li><div class="checkbox"></div><div><span class="time">2 min</span> — Pack bags/lunches (or prep what you can)<div class="note">Bags by the door. Lunches in the fridge. Nothing left to assemble in the morning rush.</div></div></li>
  <li><div class="checkbox"></div><div><span class="time">1 min</span> — Check tomorrow's calendar<div class="note">Any surprises? Forms due? Early start? Know BEFORE you wake up.</div></div></li>
  <li><div class="checkbox"></div><div><span class="time">1 min</span> — Set alarms (wake-up + any time-sensitive reminders)<div class="note">Don't trust morning-brain to remember. Tell your phone now.</div></div></li>
  <li><div class="checkbox"></div><div><span class="time">2 min</span> — Quick kitchen reset (clear counters, start dishwasher)<div class="note">A clear kitchen in the morning reduces cortisol. It signals "things are handled."</div></div></li>
  <li><div class="checkbox"></div><div><span class="time">1 min</span> — Water glass by bed + phone on charger<div class="note">Tomorrow's first two needs: hydration and a charged phone. Handle them now.</div></div></li>
  <li><div class="checkbox"></div><div><span class="time">1 min</span> — Brain dump: write down anything still in your head<div class="note">If it's in your head, it's keeping you awake. Put it on paper. It'll be there tomorrow.</div></div></li>
</ul>

<div class="footer">Mindful Mama — mindfulmama.ai<br/>Total: 10 minutes. The ROI on tomorrow morning: immeasurable.</div>
</body></html>`,
  },
  {
    title: "Weekly Meal Rotation Card",
    description: "Fridge-magnet sized card with your 5-day meal rotation. No more 'what's for dinner?' paralysis.",
    category: "Meals",
    content: `<html><head><title>Weekly Meal Rotation</title>
<style>
  body { font-family: system-ui, -apple-system, sans-serif; padding: 2rem; max-width: 500px; margin: 0 auto; }
  h1 { font-size: 1.4rem; margin-bottom: 0.25rem; }
  .subtitle { color: #888; font-size: 0.85rem; margin-bottom: 1.5rem; }
  table { width: 100%; border-collapse: collapse; margin-bottom: 1.5rem; }
  th { text-align: left; padding: 0.5rem; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: #b07070; border-bottom: 2px solid #f0e8e8; }
  td { padding: 0.6rem 0.5rem; border-bottom: 1px solid #f5f0f0; font-size: 0.9rem; }
  .blank { border-bottom: 1px dashed #ddd; min-width: 150px; display: inline-block; }
  .note { font-size: 0.75rem; color: #999; margin-top: 0.25rem; }
  .why { background: #faf5f5; border-radius: 8px; padding: 0.75rem; font-size: 0.8rem; color: #666; margin-bottom: 1.5rem; }
  .tips { background: #f5f5f5; border-radius: 8px; padding: 0.75rem; font-size: 0.8rem; color: #555; }
  .tips h3 { font-size: 0.85rem; margin-bottom: 0.5rem; }
  .tips ul { padding-left: 1.25rem; margin: 0; }
  .tips li { margin-bottom: 0.3rem; }
  .footer { margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #eee; font-size: 0.7rem; color: #aaa; text-align: center; }
</style></head><body>
<h1>My Meal Rotation</h1>
<p class="subtitle">Same 5 meals every week. No decisions. Just rotate.</p>
<div class="why"><strong>Why rotation works:</strong> Decision fatigue is real. "What's for dinner?" uses the same executive function resources as work decisions. A rotation eliminates the question entirely. You're not boring — you're strategic.</div>

<table>
  <tr><th>Day</th><th>Meal</th><th>Protein</th><th>Notes</th></tr>
  <tr><td>Monday</td><td><span class="blank"></span></td><td><span class="blank"></span></td><td><span class="blank"></span></td></tr>
  <tr><td>Tuesday</td><td><span class="blank"></span></td><td><span class="blank"></span></td><td><span class="blank"></span></td></tr>
  <tr><td>Wednesday</td><td><span class="blank"></span></td><td><span class="blank"></span></td><td><span class="blank"></span></td></tr>
  <tr><td>Thursday</td><td><span class="blank"></span></td><td><span class="blank"></span></td><td><span class="blank"></span></td></tr>
  <tr><td>Friday</td><td><span class="blank"></span></td><td><span class="blank"></span></td><td><span class="blank"></span></td></tr>
  <tr><td>Sat/Sun</td><td colspan="3"><em>Flexible: leftovers, takeout, or something fun. No guilt.</em></td></tr>
</table>

<div class="tips">
  <h3>Filling this in:</h3>
  <ul>
    <li>Pick meals your family actually eats (not aspirational Pinterest meals)</li>
    <li>At least 2 should be under 20 minutes (for low-spoon days)</li>
    <li>At least 1 can be prepped ahead (Sunday cook = Wednesday ease)</li>
    <li>Cereal night is a valid rotation entry</li>
    <li>Repeat this exact rotation for 4 weeks before changing anything</li>
  </ul>
</div>

<div class="footer">Mindful Mama — mindfulmama.ai<br/>The goal isn't gourmet. The goal is fed humans with minimal cognitive cost.</div>
</body></html>`,
  },
  {
    title: "Grocery Staples List",
    description: "Pre-filled checkable list organized by store section. Same items every week. Just check and go.",
    category: "Meals",
    content: `<html><head><title>Grocery Staples</title>
<style>
  body { font-family: system-ui, -apple-system, sans-serif; padding: 1.5rem; max-width: 550px; margin: 0 auto; font-size: 0.85rem; }
  h1 { font-size: 1.3rem; margin-bottom: 0.25rem; }
  .subtitle { color: #888; font-size: 0.8rem; margin-bottom: 1.25rem; }
  .section { margin-bottom: 1rem; }
  .section-title { font-weight: 600; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: #b07070; margin-bottom: 0.4rem; padding-bottom: 0.25rem; border-bottom: 1px solid #f0e8e8; }
  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.2rem 1rem; }
  .item { display: flex; align-items: center; gap: 0.4rem; padding: 0.25rem 0; }
  .checkbox { width: 14px; height: 14px; border: 1.5px solid #ccc; border-radius: 2px; flex-shrink: 0; }
  .blank-line { border-bottom: 1px dashed #ddd; flex: 1; margin-left: 0.25rem; min-width: 60px; }
  .footer { margin-top: 1.5rem; padding-top: 0.75rem; border-top: 1px solid #eee; font-size: 0.65rem; color: #aaa; text-align: center; }
  .tip { background: #faf5f5; border-radius: 6px; padding: 0.6rem; font-size: 0.75rem; color: #666; margin-bottom: 1rem; }
</style></head><body>
<h1>Weekly Grocery Staples</h1>
<p class="subtitle">Same list every week. Check what you need. Don't browse — execute.</p>
<div class="tip"><strong>How to use:</strong> Laminate this. Use a dry-erase marker each week. Only buy what's checked. In and out in 30 minutes.</div>

<div class="section">
  <div class="section-title">Produce</div>
  <div class="grid">
    <div class="item"><div class="checkbox"></div> Bananas</div>
    <div class="item"><div class="checkbox"></div> Apples</div>
    <div class="item"><div class="checkbox"></div> Berries</div>
    <div class="item"><div class="checkbox"></div> Carrots</div>
    <div class="item"><div class="checkbox"></div> Broccoli</div>
    <div class="item"><div class="checkbox"></div> Avocados</div>
    <div class="item"><div class="checkbox"></div> Salad mix</div>
    <div class="item"><div class="checkbox"></div><span class="blank-line"></span></div>
  </div>
</div>

<div class="section">
  <div class="section-title">Protein</div>
  <div class="grid">
    <div class="item"><div class="checkbox"></div> Chicken</div>
    <div class="item"><div class="checkbox"></div> Ground meat</div>
    <div class="item"><div class="checkbox"></div> Eggs</div>
    <div class="item"><div class="checkbox"></div> Cheese (sliced)</div>
    <div class="item"><div class="checkbox"></div> Cheese (shredded)</div>
    <div class="item"><div class="checkbox"></div> Yogurt</div>
    <div class="item"><div class="checkbox"></div> Deli meat</div>
    <div class="item"><div class="checkbox"></div><span class="blank-line"></span></div>
  </div>
</div>

<div class="section">
  <div class="section-title">Pantry / Carbs</div>
  <div class="grid">
    <div class="item"><div class="checkbox"></div> Bread</div>
    <div class="item"><div class="checkbox"></div> Pasta</div>
    <div class="item"><div class="checkbox"></div> Rice</div>
    <div class="item"><div class="checkbox"></div> Cereal</div>
    <div class="item"><div class="checkbox"></div> Crackers</div>
    <div class="item"><div class="checkbox"></div> Tortillas</div>
    <div class="item"><div class="checkbox"></div> Oats</div>
    <div class="item"><div class="checkbox"></div><span class="blank-line"></span></div>
  </div>
</div>

<div class="section">
  <div class="section-title">Dairy / Fridge</div>
  <div class="grid">
    <div class="item"><div class="checkbox"></div> Milk</div>
    <div class="item"><div class="checkbox"></div> Butter</div>
    <div class="item"><div class="checkbox"></div> Cream cheese</div>
    <div class="item"><div class="checkbox"></div> Juice boxes</div>
    <div class="item"><div class="checkbox"></div><span class="blank-line"></span></div>
    <div class="item"><div class="checkbox"></div><span class="blank-line"></span></div>
  </div>
</div>

<div class="section">
  <div class="section-title">Snacks / Kids</div>
  <div class="grid">
    <div class="item"><div class="checkbox"></div> Granola bars</div>
    <div class="item"><div class="checkbox"></div> Goldfish/crackers</div>
    <div class="item"><div class="checkbox"></div> Applesauce pouches</div>
    <div class="item"><div class="checkbox"></div> String cheese</div>
    <div class="item"><div class="checkbox"></div><span class="blank-line"></span></div>
    <div class="item"><div class="checkbox"></div><span class="blank-line"></span></div>
  </div>
</div>

<div class="section">
  <div class="section-title">Household</div>
  <div class="grid">
    <div class="item"><div class="checkbox"></div> Paper towels</div>
    <div class="item"><div class="checkbox"></div> Toilet paper</div>
    <div class="item"><div class="checkbox"></div> Dish soap</div>
    <div class="item"><div class="checkbox"></div> Trash bags</div>
    <div class="item"><div class="checkbox"></div><span class="blank-line"></span></div>
    <div class="item"><div class="checkbox"></div><span class="blank-line"></span></div>
  </div>
</div>

<div class="footer">Mindful Mama — mindfulmama.ai<br/>Same list. Every week. No decisions. Just execution.</div>
</body></html>`,
  },
  {
    title: "Energy Tracking Sheet",
    description: "Simple daily tracker: high/medium/low energy. After 2 weeks, you'll see your patterns clearly.",
    category: "Self-Awareness",
    content: `<html><head><title>Energy Tracking Sheet</title>
<style>
  body { font-family: system-ui, -apple-system, sans-serif; padding: 1.5rem; max-width: 600px; margin: 0 auto; }
  h1 { font-size: 1.3rem; margin-bottom: 0.25rem; }
  .subtitle { color: #888; font-size: 0.8rem; margin-bottom: 1rem; }
  .why { background: #faf5f5; border-radius: 8px; padding: 0.75rem; font-size: 0.8rem; color: #666; margin-bottom: 1.25rem; }
  table { width: 100%; border-collapse: collapse; font-size: 0.8rem; }
  th { padding: 0.4rem; text-align: center; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.03em; color: #b07070; border-bottom: 2px solid #f0e8e8; }
  td { padding: 0.5rem 0.3rem; border-bottom: 1px solid #f5f0f0; text-align: center; height: 2rem; }
  td:first-child { text-align: left; font-weight: 500; width: 60px; }
  .legend { display: flex; gap: 1.5rem; margin-top: 1rem; font-size: 0.75rem; color: #666; }
  .legend-item { display: flex; align-items: center; gap: 0.3rem; }
  .dot { width: 10px; height: 10px; border-radius: 50%; }
  .dot-high { background: #4ade80; }
  .dot-med { background: #fbbf24; }
  .dot-low { background: #f87171; }
  .questions { margin-top: 1.5rem; padding: 0.75rem; background: #f9f9f9; border-radius: 8px; font-size: 0.8rem; color: #555; }
  .questions h3 { font-size: 0.85rem; margin-bottom: 0.5rem; }
  .footer { margin-top: 1.5rem; padding-top: 0.75rem; border-top: 1px solid #eee; font-size: 0.65rem; color: #aaa; text-align: center; }
</style></head><body>
<h1>Energy Tracking — 2 Week Sheet</h1>
<p class="subtitle">Circle H (high), M (medium), or L (low) for each time of day. After 14 days, look for patterns.</p>
<div class="why"><strong>Why track energy:</strong> You can't manage what you can't see. After 2 weeks you'll know: which days are hardest, what time of day you crash, whether your cycle affects your capacity, and what helps vs. what drains.</div>

<table>
  <tr><th>Day</th><th>Morning</th><th>Midday</th><th>Afternoon</th><th>Evening</th><th>Sleep (hrs)</th><th>Notes</th></tr>
  <tr><td>Day 1</td><td>H M L</td><td>H M L</td><td>H M L</td><td>H M L</td><td></td><td></td></tr>
  <tr><td>Day 2</td><td>H M L</td><td>H M L</td><td>H M L</td><td>H M L</td><td></td><td></td></tr>
  <tr><td>Day 3</td><td>H M L</td><td>H M L</td><td>H M L</td><td>H M L</td><td></td><td></td></tr>
  <tr><td>Day 4</td><td>H M L</td><td>H M L</td><td>H M L</td><td>H M L</td><td></td><td></td></tr>
  <tr><td>Day 5</td><td>H M L</td><td>H M L</td><td>H M L</td><td>H M L</td><td></td><td></td></tr>
  <tr><td>Day 6</td><td>H M L</td><td>H M L</td><td>H M L</td><td>H M L</td><td></td><td></td></tr>
  <tr><td>Day 7</td><td>H M L</td><td>H M L</td><td>H M L</td><td>H M L</td><td></td><td></td></tr>
  <tr><td>Day 8</td><td>H M L</td><td>H M L</td><td>H M L</td><td>H M L</td><td></td><td></td></tr>
  <tr><td>Day 9</td><td>H M L</td><td>H M L</td><td>H M L</td><td>H M L</td><td></td><td></td></tr>
  <tr><td>Day 10</td><td>H M L</td><td>H M L</td><td>H M L</td><td>H M L</td><td></td><td></td></tr>
  <tr><td>Day 11</td><td>H M L</td><td>H M L</td><td>H M L</td><td>H M L</td><td></td><td></td></tr>
  <tr><td>Day 12</td><td>H M L</td><td>H M L</td><td>H M L</td><td>H M L</td><td></td><td></td></tr>
  <tr><td>Day 13</td><td>H M L</td><td>H M L</td><td>H M L</td><td>H M L</td><td></td><td></td></tr>
  <tr><td>Day 14</td><td>H M L</td><td>H M L</td><td>H M L</td><td>H M L</td><td></td><td></td></tr>
</table>

<div class="legend">
  <div class="legend-item"><div class="dot dot-high"></div> High — I have capacity</div>
  <div class="legend-item"><div class="dot dot-med"></div> Medium — functioning but tired</div>
  <div class="legend-item"><div class="dot dot-low"></div> Low — survival mode</div>
</div>

<div class="questions">
  <h3>After 14 days, ask yourself:</h3>
  <ul>
    <li>Which day of the week is consistently lowest?</li>
    <li>What time of day do I crash most often?</li>
    <li>Do I see a pattern with sleep hours?</li>
    <li>Is there a cycle (monthly pattern)?</li>
    <li>What happened on my best days that was different?</li>
  </ul>
</div>

<div class="footer">Mindful Mama — mindfulmama.ai<br/>This is self-awareness data, not a diagnostic tool.</div>
</body></html>`,
  },
  {
    title: "The Repair Script Card",
    description: "Wallet-sized card with your repair script. For when you need the words and can't think.",
    category: "Scripts",
    content: `<html><head><title>Repair Script Card</title>
<style>
  body { font-family: system-ui, -apple-system, sans-serif; padding: 2rem; max-width: 500px; margin: 0 auto; }
  h1 { font-size: 1.3rem; margin-bottom: 0.25rem; }
  .subtitle { color: #888; font-size: 0.8rem; margin-bottom: 1.5rem; }
  .card { border: 2px solid #e8e0e0; border-radius: 12px; padding: 1.25rem; margin-bottom: 1.5rem; }
  .card-title { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: #b07070; margin-bottom: 0.75rem; font-weight: 600; }
  .script { font-size: 0.95rem; line-height: 1.6; color: #333; }
  .script em { color: #888; font-style: italic; }
  .divider { border: none; border-top: 1px dashed #ddd; margin: 1rem 0; }
  .note { font-size: 0.75rem; color: #888; margin-top: 0.75rem; padding-top: 0.5rem; border-top: 1px solid #f0f0f0; }
  .why { background: #faf5f5; border-radius: 8px; padding: 0.75rem; font-size: 0.8rem; color: #666; margin-bottom: 1.5rem; }
  .footer { margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #eee; font-size: 0.7rem; color: #aaa; text-align: center; }
</style></head><body>
<h1>Repair Script Cards</h1>
<p class="subtitle">Cut these out. Keep one in your pocket. Use it when you can't find the words.</p>
<div class="why"><strong>Why repair matters more than prevention:</strong> Rupture is inevitable. You will lose your temper. You will yell. What determines the long-term impact on your child isn't the rupture — it's whether repair happens. Repair teaches: "Relationships can survive conflict. Adults take responsibility. You are safe even when things go wrong."</div>

<div class="card">
  <div class="card-title">After yelling — Toddler/Preschool (2-5)</div>
  <div class="script">
    "I'm sorry I used my big voice. That was too loud. You didn't do anything wrong. Mommy's body got too full of feelings and they came out too big. I love you. Can I have a hug?"
  </div>
  <div class="note">Get on their level physically. Touch if they'll allow it. Keep it short — they don't need an explanation, they need reassurance.</div>
</div>

<div class="card">
  <div class="card-title">After yelling — School Age (6-10)</div>
  <div class="script">
    "Hey. I need to talk to you about earlier. I yelled, and that wasn't okay. You didn't deserve that. I was feeling <em>[overwhelmed/frustrated/exhausted]</em> and I handled it badly. That's my responsibility, not yours. I'm sorry. What do you need from me right now?"
  </div>
  <div class="note">Name YOUR emotion. Take clear responsibility. Ask what they need (they might say "nothing" — that's okay). Don't over-explain or make it about you.</div>
</div>

<div class="card">
  <div class="card-title">After yelling — Tween/Teen (11+)</div>
  <div class="script">
    "I owe you an apology. I lost my temper and I said things in a way that wasn't respectful. You deserve better than that from me. I was <em>[stressed/overwhelmed/triggered]</em> and I took it out on you. That's not your fault. I'm working on it. I'm sorry."
  </div>
  <div class="note">Be direct. Don't minimize ("I barely raised my voice"). Don't justify ("but you were..."). Model accountability without groveling. They're watching how adults handle mistakes.</div>
</div>

<div class="card">
  <div class="card-title">After shutting down / withdrawing</div>
  <div class="script">
    "I went quiet earlier and I want you to know that wasn't about you. My brain needed to shut down for a bit because I was too overwhelmed to talk. I'm back now. Are you okay?"
  </div>
  <div class="note">Shutdown is a trauma/overwhelm response, not a choice. But kids interpret silence as rejection. Name what happened so they don't fill the gap with "mom doesn't love me."</div>
</div>

<div class="footer">Mindful Mama — mindfulmama.ai<br/>Repair is not weakness. It's the most powerful parenting tool that exists.</div>
</body></html>`,
  },
  {
    title: "Sensory Break Reminder",
    description: "Fridge-level reminder of your sensory break protocol. For when you're too activated to remember.",
    category: "Self-Awareness",
    content: `<html><head><title>Sensory Break Protocol</title>
<style>
  body { font-family: system-ui, -apple-system, sans-serif; padding: 2rem; max-width: 450px; margin: 0 auto; }
  h1 { font-size: 1.3rem; margin-bottom: 0.25rem; text-align: center; }
  .subtitle { color: #888; font-size: 0.8rem; margin-bottom: 1.5rem; text-align: center; }
  .level { border: 2px solid #eee; border-radius: 12px; padding: 1rem; margin-bottom: 1rem; }
  .level-header { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; }
  .level-dot { width: 12px; height: 12px; border-radius: 50%; }
  .green { background: #4ade80; border-color: #bbf7d0; }
  .yellow { background: #fbbf24; border-color: #fef08a; }
  .red { background: #f87171; border-color: #fecaca; }
  .level-name { font-weight: 600; font-size: 0.85rem; }
  .level-desc { font-size: 0.8rem; color: #666; margin-bottom: 0.5rem; }
  .actions { list-style: none; padding: 0; }
  .actions li { padding: 0.3rem 0; font-size: 0.85rem; display: flex; align-items: flex-start; gap: 0.4rem; }
  .actions li::before { content: "→"; color: #b07070; flex-shrink: 0; }
  .emergency { background: #fef2f2; border-color: #fecaca; }
  .footer { margin-top: 1.5rem; padding-top: 0.75rem; border-top: 1px solid #eee; font-size: 0.65rem; color: #aaa; text-align: center; }
  .why { background: #faf5f5; border-radius: 8px; padding: 0.75rem; font-size: 0.75rem; color: #666; margin-bottom: 1.25rem; text-align: center; }
</style></head><body>
<h1>🔇 Sensory Break Protocol</h1>
<p class="subtitle">When your nervous system is hitting capacity</p>
<div class="why">Your nervous system has a threshold. When input exceeds capacity, you dysregulate — snap, shut down, or flee. These breaks are PREVENTIVE, not indulgent. Take them BEFORE you hit the wall.</div>

<div class="level green">
  <div class="level-header"><div class="level-dot green"></div><span class="level-name">Level 1 — Building (catch it early)</span></div>
  <div class="level-desc">Noise is getting louder. Touch is irritating. You're clenching your jaw.</div>
  <ul class="actions">
    <li>Put in one earbud (even without music — it halves the input)</li>
    <li>Step into another room for 60 seconds</li>
    <li>Splash cold water on your wrists</li>
    <li>Say out loud: "I'm getting activated. I need 2 minutes."</li>
  </ul>
</div>

<div class="level yellow">
  <div class="level-header"><div class="level-dot yellow"></div><span class="level-name">Level 2 — Overwhelmed (you're at the edge)</span></div>
  <div class="level-desc">Skin crawling. Can't think. Everything is TOO MUCH. Snapping feels imminent.</div>
  <ul class="actions">
    <li>Noise-canceling headphones ON (or bathroom with door closed)</li>
    <li>Lights off or dimmed if possible</li>
    <li>Pressure: squeeze your own arms, sit on your hands, weighted blanket</li>
    <li>5 minutes minimum. Set a timer. Don't come out early.</li>
    <li>Tell kids: "Mommy needs a quiet break. I'll be back in 5 minutes."</li>
  </ul>
</div>

<div class="level emergency red">
  <div class="level-header"><div class="level-dot red"></div><span class="level-name">Level 3 — Shutdown/Explosion (you've hit the wall)</span></div>
  <div class="level-desc">You've already snapped, or you've gone completely numb. Damage control mode.</div>
  <ul class="actions">
    <li>Remove yourself physically. Bathroom. Car. Closet. Anywhere.</li>
    <li>Cold water on face (activates dive reflex — instant nervous system reset)</li>
    <li>Breathe: in for 4, hold for 4, out for 8. Repeat 5 times.</li>
    <li>Do NOT try to parent, problem-solve, or talk until your heart rate drops.</li>
    <li>When ready: repair. Use your repair script card.</li>
  </ul>
</div>

<div class="footer">Mindful Mama — mindfulmama.ai<br/>Sensory breaks are nervous system maintenance, not selfishness.</div>
</body></html>`,
  },
  {
    title: "Today I Did Enough",
    description: "Daily acknowledgment card. Three lines to fill in: what you did, what you let go, what you're proud of.",
    category: "Self-Compassion",
    content: `<html><head><title>Today I Did Enough</title>
<style>
  body { font-family: system-ui, -apple-system, sans-serif; padding: 2rem; max-width: 450px; margin: 0 auto; }
  h1 { font-size: 1.4rem; margin-bottom: 0.5rem; text-align: center; }
  .subtitle { color: #888; font-size: 0.8rem; margin-bottom: 2rem; text-align: center; }
  .prompt { margin-bottom: 1.5rem; }
  .prompt-label { font-size: 0.8rem; font-weight: 600; color: #b07070; margin-bottom: 0.5rem; }
  .prompt-desc { font-size: 0.75rem; color: #999; margin-bottom: 0.5rem; }
  .line { border: none; border-bottom: 1px solid #e0d8d8; height: 2rem; margin-bottom: 0.25rem; }
  .affirmation { text-align: center; margin-top: 2rem; padding: 1.25rem; background: #faf5f5; border-radius: 12px; }
  .affirmation p { font-size: 1rem; color: #333; font-weight: 500; line-height: 1.5; }
  .footer { margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #eee; font-size: 0.65rem; color: #aaa; text-align: center; }
</style></head><body>
<h1>Today I Did Enough</h1>
<p class="subtitle">Fill this in at the end of the day. Not to perform productivity — to witness yourself.</p>

<div class="prompt">
  <div class="prompt-label">Three things I did today (any size):</div>
  <div class="prompt-desc">Not what you should have done. What you actually did. Cereal counts. Surviving counts.</div>
  <div class="line"></div>
  <div class="line"></div>
  <div class="line"></div>
</div>

<div class="prompt">
  <div class="prompt-label">One thing I let go of today:</div>
  <div class="prompt-desc">Something you chose not to do, not to fix, not to carry. Letting go is a skill, not a failure.</div>
  <div class="line"></div>
</div>

<div class="prompt">
  <div class="prompt-label">One thing I'm proud of (even if it's small):</div>
  <div class="prompt-desc">Not proud by anyone else's standards. Proud by yours. Given what today was.</div>
  <div class="line"></div>
</div>

<div class="prompt">
  <div class="prompt-label">Tomorrow I need:</div>
  <div class="prompt-desc">One word. Sleep. Help. Quiet. Space. Food. Whatever it is — name it.</div>
  <div class="line"></div>
</div>

<div class="affirmation">
  <p>I did not have to be perfect today.<br/>I just had to be here.<br/>And I was.</p>
</div>

<div class="footer">Mindful Mama — mindfulmama.ai<br/>Print multiple copies. One per day. Stack them. Watch the evidence accumulate.</div>
</body></html>`,
  },
  {
    title: "Permission Slips",
    description: "12 printable permission slips to cut out and stick on your mirror. 'Permission to serve cereal for dinner.'",
    category: "Self-Compassion",
    content: `<html><head><title>Permission Slips</title>
<style>
  body { font-family: system-ui, -apple-system, sans-serif; padding: 1.5rem; max-width: 600px; margin: 0 auto; }
  h1 { font-size: 1.3rem; margin-bottom: 0.25rem; text-align: center; }
  .subtitle { color: #888; font-size: 0.8rem; margin-bottom: 1.5rem; text-align: center; }
  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
  .slip { border: 2px dashed #e0d8d8; border-radius: 10px; padding: 1rem; text-align: center; }
  .slip-header { font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.08em; color: #b07070; margin-bottom: 0.4rem; }
  .slip-text { font-size: 0.85rem; font-weight: 500; color: #333; line-height: 1.4; }
  .slip-footer { font-size: 0.6rem; color: #ccc; margin-top: 0.5rem; }
  .instructions { background: #faf5f5; border-radius: 8px; padding: 0.75rem; font-size: 0.75rem; color: #666; margin-bottom: 1.25rem; text-align: center; }
  .footer { margin-top: 1.5rem; padding-top: 0.75rem; border-top: 1px solid #eee; font-size: 0.65rem; color: #aaa; text-align: center; }
</style></head><body>
<h1>Permission Slips</h1>
<p class="subtitle">Cut these out. Stick them where you'll see them. Read them when the guilt comes.</p>
<div class="instructions">These are not jokes. They are cognitive reframes for the shame patterns that keep you stuck. Each one counters a specific belief that's costing you energy.</div>

<div class="grid">
  <div class="slip">
    <div class="slip-header">Permission granted</div>
    <div class="slip-text">To serve cereal for dinner without guilt or explanation.</div>
    <div class="slip-footer">Fed is fed. ✓</div>
  </div>
  <div class="slip">
    <div class="slip-header">Permission granted</div>
    <div class="slip-text">To say no to a social event because you have nothing left.</div>
    <div class="slip-footer">Boundaries are self-care. ✓</div>
  </div>
  <div class="slip">
    <div class="slip-header">Permission granted</div>
    <div class="slip-text">To let the house be messy while you rest.</div>
    <div class="slip-footer">You matter more than the dishes. ✓</div>
  </div>
  <div class="slip">
    <div class="slip-header">Permission granted</div>
    <div class="slip-text">To use screens so you can have 30 minutes of silence.</div>
    <div class="slip-footer">Regulated mom > screen-free mom. ✓</div>
  </div>
  <div class="slip">
    <div class="slip-header">Permission granted</div>
    <div class="slip-text">To not enjoy every moment of motherhood.</div>
    <div class="slip-footer">Love ≠ enjoyment. Both are real. ✓</div>
  </div>
  <div class="slip">
    <div class="slip-header">Permission granted</div>
    <div class="slip-text">To ask for help without justifying why you need it.</div>
    <div class="slip-footer">Needing help is human. ✓</div>
  </div>
  <div class="slip">
    <div class="slip-header">Permission granted</div>
    <div class="slip-text">To do the bare minimum today and call it enough.</div>
    <div class="slip-footer">Survival mode is still a mode. ✓</div>
  </div>
  <div class="slip">
    <div class="slip-header">Permission granted</div>
    <div class="slip-text">To feel angry without being a bad person.</div>
    <div class="slip-footer">Anger is information. ✓</div>
  </div>
  <div class="slip">
    <div class="slip-header">Permission granted</div>
    <div class="slip-text">To not respond to that text/email/message today.</div>
    <div class="slip-footer">Your availability is not unlimited. ✓</div>
  </div>
  <div class="slip">
    <div class="slip-header">Permission granted</div>
    <div class="slip-text">To want time alone without feeling guilty about it.</div>
    <div class="slip-footer">Solitude is a need, not a luxury. ✓</div>
  </div>
  <div class="slip">
    <div class="slip-header">Permission granted</div>
    <div class="slip-text">To cry in the car/shower/closet. Wherever you need to.</div>
    <div class="slip-footer">Tears are release, not weakness. ✓</div>
  </div>
  <div class="slip">
    <div class="slip-header">Permission granted</div>
    <div class="slip-text">To be a good mother AND a struggling person at the same time.</div>
    <div class="slip-footer">Both are true. Always. ✓</div>
  </div>
</div>

<div class="footer">Mindful Mama — mindfulmama.ai<br/>Cut along the dashed lines. These are prescriptions for self-compassion.</div>
</body></html>`,
  },
  {
    title: "The Weekly Brain Dump Template",
    description: "Structured template for your Sunday review: calendar check, school emails, upcoming events, prep tasks.",
    category: "Organization",
    content: `<html><head><title>Weekly Brain Dump</title>
<style>
  body { font-family: system-ui, -apple-system, sans-serif; padding: 1.5rem; max-width: 550px; margin: 0 auto; }
  h1 { font-size: 1.3rem; margin-bottom: 0.25rem; }
  .subtitle { color: #888; font-size: 0.8rem; margin-bottom: 1.25rem; }
  .why { background: #faf5f5; border-radius: 8px; padding: 0.75rem; font-size: 0.8rem; color: #666; margin-bottom: 1.25rem; }
  .section { margin-bottom: 1.25rem; }
  .section-title { font-weight: 600; font-size: 0.8rem; color: #b07070; margin-bottom: 0.5rem; padding-bottom: 0.25rem; border-bottom: 1px solid #f0e8e8; }
  .section-desc { font-size: 0.7rem; color: #999; margin-bottom: 0.5rem; }
  .lines { list-style: none; padding: 0; }
  .lines li { border-bottom: 1px solid #f0e8e8; height: 1.75rem; }
  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .mini-section { }
  .mini-title { font-size: 0.7rem; font-weight: 600; color: #666; margin-bottom: 0.3rem; }
  .mini-lines li { height: 1.5rem; border-bottom: 1px solid #f5f0f0; }
  .footer { margin-top: 1.5rem; padding-top: 0.75rem; border-top: 1px solid #eee; font-size: 0.65rem; color: #aaa; text-align: center; }
</style></head><body>
<h1>Weekly Brain Dump</h1>
<p class="subtitle">Sunday evening or Monday morning. 15 minutes. Get it ALL out of your head.</p>
<div class="why"><strong>Why this works:</strong> Your working memory can hold 3-4 items. You're asking it to hold 40+. This template externalizes everything so your brain can stop spinning and start executing. Do this weekly and watch your Monday anxiety drop.</div>

<div class="section">
  <div class="section-title">📅 This week's non-negotiables</div>
  <div class="section-desc">Appointments, deadlines, events that CANNOT move. Check your calendar.</div>
  <ul class="lines"><li></li><li></li><li></li><li></li><li></li></ul>
</div>

<div class="section">
  <div class="section-title">📧 Things to respond to / follow up on</div>
  <div class="section-desc">Emails, texts, school notes, forms, RSVPs — anything waiting for your action.</div>
  <ul class="lines"><li></li><li></li><li></li><li></li></ul>
</div>

<div class="section">
  <div class="section-title">🏠 Household tasks this week</div>
  <div class="section-desc">Not everything. Just what actually needs doing THIS week.</div>
  <ul class="lines"><li></li><li></li><li></li><li></li></ul>
</div>

<div class="two-col">
  <div class="mini-section">
    <div class="mini-title">🛒 Need to buy</div>
    <ul class="lines mini-lines"><li></li><li></li><li></li></ul>
  </div>
  <div class="mini-section">
    <div class="mini-title">📞 Need to call/book</div>
    <ul class="lines mini-lines"><li></li><li></li><li></li></ul>
  </div>
</div>

<div class="section">
  <div class="section-title">🧠 What's taking up mental space</div>
  <div class="section-desc">Worries, unresolved things, stuff you keep thinking about. Get it out.</div>
  <ul class="lines"><li></li><li></li><li></li></ul>
</div>

<div class="section">
  <div class="section-title">⭐ My top 3 for this week</div>
  <div class="section-desc">If you could only do 3 things this week, what would make the biggest difference?</div>
  <ul class="lines"><li></li><li></li><li></li></ul>
</div>

<div class="footer">Mindful Mama — mindfulmama.ai<br/>Do this every week. Same time. Same place. It becomes automatic.</div>
</body></html>`,
  },
]