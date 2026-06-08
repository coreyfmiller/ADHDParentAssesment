"use client"

import { useState, useEffect } from "react"
import { Zap, ArrowLeft, Wind, Heart, Play, Brain, Hand } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type ToolkitCard = {
  id: string
  title: string
  subtitle: string
  icon: React.ReactNode
  color: string
  steps: { title: string; description: string }[]
  reminder: string
}

const toolkitCards: ToolkitCard[] = [
  {
    id: "about-to-snap",
    title: "I'm About to Snap",
    subtitle: "Your nervous system is at capacity. Here's your 60-second reset.",
    icon: <Wind className="w-6 h-6" />,
    color: "bg-red-500/10 text-red-600 border-red-200",
    steps: [
      { title: "Name it", description: "Say internally: 'I'm dysregulated. This is my nervous system, not my character.'" },
      { title: "Announce it", description: "Say out loud: 'Mama needs 2 minutes. I'll be right back.' Then walk away." },
      { title: "Cold water", description: "Run cold water on your wrists for 30 seconds. This activates your dive reflex and calms your vagus nerve." },
      { title: "5 breaths", description: "Breathe in for 4 counts, out for 6 counts. The longer exhale signals safety to your brain." },
      { title: "Return", description: "Go back. You don't need to be calm — just calmer. 'Okay, I'm back. What do we need?'" },
    ],
    reminder: "Stepping away is not abandonment. It's modeling self-regulation for your children.",
  },
  {
    id: "just-snapped",
    title: "I Just Snapped",
    subtitle: "It happened. The guilt is coming. Here's what to do in the next 5 minutes.",
    icon: <Heart className="w-6 h-6" />,
    color: "bg-orange-500/10 text-orange-600 border-orange-200",
    steps: [
      { title: "Pause the shame", description: "Say to yourself: 'I made a mistake. That's a behavior, not my identity. I can repair this.'" },
      { title: "Take 60 seconds", description: "Breathe. Splash water on your face. You cannot repair while you're still activated." },
      { title: "Go to your child", description: "Get on their level physically. Eye contact. Soft voice." },
      { title: "Say the repair", description: "'I'm sorry I yelled. That wasn't okay. You didn't deserve that. I was feeling overwhelmed and I handled it badly. I love you.'" },
      { title: "Reconnect", description: "Offer a hug, a hand hold, or simply sit near them. Let them decide what they need." },
    ],
    reminder: "Research shows it's not the rupture that damages attachment — it's the lack of repair. You're repairing. That's what matters.",
  },
  {
    id: "rage-spiral",
    title: "I'm in a Rage Spiral",
    subtitle: "Your amygdala has hijacked your prefrontal cortex. The thinking brain is offline. This is physiology, not personality.",
    icon: <Zap className="w-6 h-6" />,
    color: "bg-rose-500/10 text-rose-600 border-rose-200",
    steps: [
      { title: "Recognize the hijack", description: "Your body is flooded with adrenaline and cortisol. You're in fight mode. Nothing you say or decide right now will be wise. Name it: 'I'm in a rage spiral. My thinking brain is offline.'" },
      { title: "Change your physiology first", description: "Your nervous system cannot be reasoned out of rage — it must be physically interrupted. Hold ice cubes. Splash freezing water on your face. Press your back flat against a wall and push hard. Bite into a lemon. You need intense sensory input to break the loop." },
      { title: "Use gravity and pressure", description: "Lie flat on the floor. The proprioceptive input of your body's full weight against a hard surface sends safety signals to your brainstem. Put a heavy blanket or pillow on your chest. Deep pressure activates your parasympathetic system." },
      { title: "Discharge the energy", description: "Rage is energy trapped in the body. It needs a physical exit. Push against a wall as hard as you can for 30 seconds. Stomp your feet. Wring a towel. Do NOT punch or throw — that rehearses aggression. You want resistance, not destruction." },
      { title: "Wait for the wave to pass", description: "Adrenaline has a 20-minute half-life. You will feel different in 20 minutes. You don't need to fix anything right now. Your only job is to not cause harm while the chemistry moves through you. It WILL pass. It always does." },
    ],
    reminder: "Rage in mothers is almost never about anger. It's the final alarm of a nervous system that has been ignored for too long. The rage is a message: something is unsustainable. Listen to it — after it passes.",
  },
  {
    id: "crying-cant-stop",
    title: "I'm Crying and Can't Stop",
    subtitle: "This is emotional flooding — your brain's pressure valve releasing. It's not weakness. It's overflow.",
    icon: <Heart className="w-6 h-6" />,
    color: "bg-blue-500/10 text-blue-600 border-blue-200",
    steps: [
      { title: "Let it happen (briefly)", description: "Tears release cortisol, leucine enkephalin (a natural painkiller), and oxytocin. Your body is doing exactly what it's designed to do. You don't need to stop immediately. Give yourself 2-3 minutes of permission: 'This is my body releasing pressure.'" },
      { title: "If your children are watching", description: "You don't need to hide. Say: 'Mama is having big feelings right now. I'm okay. Sometimes grown-ups cry too. I'm going to take care of myself.' This models emotional honesty AND coping — both are gifts to your children." },
      { title: "Contain without suppressing", description: "Place both hands over your heart. Apply gentle pressure. Say internally: 'I am here. I am safe. This will pass.' You're providing yourself the containment that no one else is offering right now. The pressure on your sternum activates vagal tone." },
      { title: "Orient to the present", description: "When you're ready to shift: look around the room and name 5 things you can see. Not to distract — to gently bring your prefrontal cortex back online. You're pulling yourself out of the emotional time-travel (past guilt, future dread) and into NOW." },
      { title: "Hydrate and regulate", description: "Drink cold water slowly. The act of swallowing activates your vagus nerve. The cold temperature signals safety. Press a cold washcloth on the back of your neck. Then ask: 'What does the next 10 minutes need from me?' Just the next 10." },
    ],
    reminder: "Crying is not falling apart. It's your nervous system's attempt to recalibrate after carrying too much for too long. The tears are evidence of how hard you've been trying — not evidence that you've failed.",
  },
  {
    id: "dissociating",
    title: "I'm Zoning Out / Checked Out",
    subtitle: "This is your dorsal vagal system — the 'freeze' response. Your brain decided that the safest option is to shut down. You're not lazy. You're in a trauma-informed survival state.",
    icon: <Brain className="w-6 h-6" />,
    color: "bg-slate-500/10 text-slate-600 border-slate-200",
    steps: [
      { title: "Notice without judgment", description: "You might feel foggy, numb, far away, or like you're watching yourself from outside. Say: 'I'm in freeze right now. My nervous system is protecting me. I'm going to gently come back.' Don't force it. Forcing creates more shutdown." },
      { title: "Activate your senses (gently)", description: "Your brain needs evidence that you're safe and present. Run your hands under warm water. Hold something textured — a rough towel, a piece of ice, your keys. Smell something strong — coffee, peppermint, citrus. You're sending 'now' signals to a brain stuck in 'away.'" },
      { title: "Orient to the room", description: "Move your eyes slowly around the space. Don't just look — actually name what you see: 'Brown table. Blue cup. Window. Light.' Turn your head physically. Orienting movements tell your brainstem that you're scanning for safety and FINDING it." },
      { title: "Move from the core outward", description: "Freeze lives in stillness. Start with the smallest movement: wiggle your toes. Then your fingers. Press your feet into the floor. Stand up slowly. Stretch your arms overhead. You're waking the body up in layers, not shocking it." },
      { title: "Reconnect to one anchor", description: "When you feel slightly more present: focus on one sensory anchor for 30 seconds. The feeling of your feet on the floor. The sound of the refrigerator humming. Your child's voice in the next room. One thread of 'here' is enough to start coming back." },
    ],
    reminder: "Dissociation is your nervous system's oldest protection mechanism. It's not a choice and it's not a character flaw. It means your system learned — probably very early — that 'leaving' was safer than staying present. You can come back. Gently. At your own pace.",
  },
  {
    id: "kid-melting-down",
    title: "My Kid Is Melting Down (And So Am I)",
    subtitle: "Two dysregulated nervous systems in resonance. Their chaos is activating your chaos. You cannot regulate them until you've regulated yourself — even partially.",
    icon: <Zap className="w-6 h-6" />,
    color: "bg-violet-500/10 text-violet-600 border-violet-200",
    steps: [
      { title: "Contain yourself first (30 seconds)", description: "You feel the activation rising in your body — the chest tightening, jaw clenching, heat building. Place your hand on your own chest. Take ONE long exhale. Say internally: 'Their nervous system is not my emergency. I can be near this without being consumed by it.' You're creating a millimeter of space between their storm and your response." },
      { title: "Regulate your voice, not your child", description: "Drop your volume by half. Slow your speech by half. Lower your pitch. You're not doing this to calm them — you're doing it because calm prosody literally co-regulates a child's nervous system through mirror neurons. Your tone IS the intervention. 'I'm here. You're safe. I'm not going anywhere.'" },
      { title: "Stop trying to fix or teach", description: "A child in meltdown cannot learn, cannot hear logic, and cannot process consequences. Their prefrontal cortex is offline — just like yours when you're in rage. Don't explain. Don't negotiate. Don't lecture. Be present. Be safe. Be still. The teaching happens AFTER regulation, never during." },
      { title: "Offer connection, not correction", description: "Get low — physically below their eye level if possible. Open your body posture. Offer your hands palm-up (not reaching). Say: 'I'm right here when you're ready.' Some children need holding. Some need space. Follow THEIR cues, not your anxiety to make it stop." },
      { title: "Wait it out (this is the hardest part)", description: "Meltdowns have an arc. They rise, they peak, they fall. Your job is not to shorten the arc — it's to be a steady presence throughout it. The more you try to stop it, the longer it lasts. The more you simply contain and witness, the faster their nervous system learns that big feelings are survivable. This IS the work." },
    ],
    reminder: "You are not failing when your child melts down. You are providing what most children never get: a parent who stays present through the storm without adding to it. Their nervous system is literally being shaped by yours in these moments. Your regulation is their inheritance.",
  },
  {
    id: "cant-start",
    title: "I Can't Start",
    subtitle: "You can see what needs doing. Your body won't move. That's task initiation failure, not laziness.",
    icon: <Play className="w-6 h-6" />,
    color: "bg-amber-500/10 text-amber-600 border-amber-200",
    steps: [
      { title: "Forgive the freeze", description: "'My brain is frozen right now. That's okay. I'm not lazy — my activation threshold isn't being met.'" },
      { title: "Shrink the task", description: "Don't think about the whole thing. What's the TINIEST first step? Not 'clean the kitchen.' Just 'pick up one cup.'" },
      { title: "Add stimulation", description: "Put on music, a podcast, or call someone. Your brain needs parallel input to activate on boring tasks." },
      { title: "The 5-minute contract", description: "'I will do this for 5 minutes only. Then I can stop.' Set a timer. Usually, starting is the hardest part." },
      { title: "If nothing works", description: "That's okay too. Ask: 'What's the ONE thing that will make the next hour easier?' Do only that." },
    ],
    reminder: "Paralysis is a neurological state, not a moral failing. The signal from intention to action is blocked. Be patient with yourself.",
  },
  {
    id: "terrible-mother",
    title: "I Feel Like a Terrible Mother",
    subtitle: "This is the shame narrative — a story your brain has assembled from exhaustion, comparison, and impossible standards. It feels like truth. It is not truth.",
    icon: <Heart className="w-6 h-6" />,
    color: "bg-pink-500/10 text-pink-600 border-pink-200",
    steps: [
      { title: "Recognize the shame spiral", description: "Shame says: 'I AM bad.' Guilt says: 'I DID something bad.' If you're hearing 'I'm a terrible mother' (not 'I handled that badly'), you're in shame — and shame is never accurate. It's a cognitive distortion magnified by depletion. Name it: 'This is shame talking. Shame is not a reliable narrator.'" },
      { title: "Apply the self-compassion break", description: "Three steps, developed by Dr. Kristin Neff: (1) 'This is a moment of suffering' — acknowledge it's real. (2) 'Other mothers feel this too' — you are not uniquely broken. (3) 'May I give myself the kindness I need right now' — hand on your heart. You're offering yourself what you'd offer a friend." },
      { title: "Interrupt the evidence-gathering", description: "When you're in shame, your brain selectively recalls every failure and filters out every success. This is confirmation bias, not reality. Force a counter-example: 'Name one moment today where my child felt safe because of me.' One is enough to prove the narrative wrong." },
      { title: "Separate you from the conditions", description: "Ask: 'Would I judge another mother this harshly if she were this sleep-deprived, this unsupported, this overstimulated, and this depleted?' The answer is no. The conditions you're parenting in are not your fault. Your capacity under these conditions is not your character." },
      { title: "Ground in what's true", description: "A terrible mother doesn't worry about being a terrible mother. The worry itself is evidence of care. Your children don't need you to be perfect — research is unequivocal on this. They need you to be 'good enough' (Winnicott), which means present, imperfect, and willing to repair. You already are that." },
    ],
    reminder: "The mothers who torture themselves with 'am I good enough?' are almost always more than good enough. The worry is proof of investment. Your children are loved. They know it — even on the days you can't feel it yourself.",
  },
  {
    id: "forgot-something",
    title: "I Forgot Something Important",
    subtitle: "The shame is hitting. Here's how to handle the next 10 minutes.",
    icon: <Brain className="w-6 h-6" />,
    color: "bg-purple-500/10 text-purple-600 border-purple-200",
    steps: [
      { title: "Interrupt the shame", description: "'I forgot because my working memory has limits, not because I don't care. What can I do RIGHT NOW?'" },
      { title: "Fix what you can", description: "Is there a quick fix? Call the school. Email the teacher. Send the form late. Most things are recoverable." },
      { title: "If it can't be fixed", description: "Acknowledge it to whoever's affected: 'I'm sorry I missed this. I'm working on better systems.'" },
      { title: "Patch the system", description: "Ask: 'What ONE thing could prevent this specific thing from happening again?' A reminder? A visual cue? A checklist?" },
      { title: "Release it", description: "You handled it. It's done. Ruminating won't change it. Move forward." },
    ],
    reminder: "Forgetting doesn't mean you don't care. It means your brain has a smaller 'desktop' — and parenting demands enormous RAM.",
  },
  {
    id: "everything-loud",
    title: "Everything Is Too Loud / Too Much",
    subtitle: "Your sensory processing system has exceeded capacity. Every input — noise, light, movement, questions — is registering as threat. This is neurological overload, not intolerance.",
    icon: <Wind className="w-6 h-6" />,
    color: "bg-cyan-500/10 text-cyan-600 border-cyan-200",
    steps: [
      { title: "Acknowledge the overload", description: "Say internally: 'My sensory system is full. Every additional input right now is registering as pain. I need to reduce input IMMEDIATELY — not in 20 minutes, now.' This is not optional self-care. This is your nervous system in a state of threat." },
      { title: "Reduce input by any means available", description: "Put in earplugs or noise-canceling headphones (even one ear helps). Turn off overhead lights — lamps only. Stop the music/TV. If you can't control the environment, create a sensory barrier: hood up, sunglasses on, or go to the bathroom and close the door. You need a sensory refuge, even a tiny one." },
      { title: "Apply deep pressure", description: "Wrap your arms tightly around yourself and squeeze for 30 seconds. Put a heavy blanket around your shoulders. Press your palms hard against your eyes (with eyes closed). Deep pressure input activates your proprioceptive system, which is the fastest path to down-regulating sensory overwhelm." },
      { title: "Use a single-sense anchor", description: "Choose ONE calming input to focus on: a specific texture (soft fabric), a specific scent (lavender, mint), or a low steady sound (white noise, fan). Anchoring to one controlled input helps your brain stop trying to process ALL inputs simultaneously. You're giving it permission to narrow." },
      { title: "Protect the next 30 minutes", description: "After sensory overload, your threshold stays low. You'll be more reactive for at least 30 minutes. Keep input low. Speak minimally. Let screens babysit if needed. This isn't laziness — this is post-overload recovery. Your nervous system needs a cooldown period the same way a muscle does after cramping." },
    ],
    reminder: "Sensory overwhelm in mothers is wildly underrecognized. The constant noise, touch, questions, and visual chaos of life with children is a genuine neurological challenge — especially for sensory-sensitive brains. Your need for quiet is not a rejection of your family. It's a biological requirement for continued function.",
  },
  {
    id: "touched-out",
    title: "I'm Touched Out",
    subtitle: "Your skin is crawling. You need space. Here's how to get it without guilt.",
    icon: <Hand className="w-6 h-6" />,
    color: "bg-teal-500/10 text-teal-600 border-teal-200",
    steps: [
      { title: "Acknowledge it", description: "'My body has hit its touch capacity. This is neurological, not emotional. I still love my kids.'" },
      { title: "Use the script", description: "Say: 'I love you AND my body needs space right now. Can we do side-by-side time instead?'" },
      { title: "Offer alternatives", description: "Sit next to them. Hold hands instead of hugging. Read a book together without lap-sitting. Blow kisses." },
      { title: "Create a buffer", description: "Put on a show or audiobook. Give yourself 10 minutes of zero physical contact. Bathroom break. Car break." },
      { title: "Return with intention", description: "When you're ready: 'Okay, I'm recharged. Who wants a hug?' Let it be on YOUR terms." },
    ],
    reminder: "Being touched out is a real neurological state. It's your nervous system communicating a boundary that deserves respect.",
  },
  {
    id: "need-alone-cant-be",
    title: "I Need to Be Alone But I Can't",
    subtitle: "Your autonomic nervous system requires solitude to reset — but your life doesn't allow it. This is the fundamental tension of early parenthood. Here's how to create micro-solitude within captivity.",
    icon: <Hand className="w-6 h-6" />,
    color: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
    steps: [
      { title: "Validate the need as non-negotiable", description: "Solitude is not a luxury — it's a biological requirement for nervous system repair, especially for introverted or sensory-sensitive brains. The fact that you can't access it doesn't make the need less real. Say: 'My need for solitude is legitimate. My inability to get it is a circumstance, not a personal failing.'" },
      { title: "Create internal solitude", description: "When you cannot physically be alone, you can create psychological distance. Put in one earbud with brown noise or a familiar podcast. Wear sunglasses indoors (it reduces social signaling). Respond to your children in minimum viable words: 'Mm-hmm.' 'Yes.' 'One minute.' You're reducing your social output to preserve energy." },
      { title: "Use 'alone while together' strategies", description: "Put on a show or audiobook for your kids. Sit in the same room but with your back slightly turned, doing your own thing. You are PRESENT (safe) but not ENGAGED (depleted). Children don't need constant interaction — they need the security of your proximity. Proximity without engagement is enough." },
      { title: "Claim micro-pockets ruthlessly", description: "The bathroom break is sacred — take 5 minutes, not 30 seconds. The car after errands — sit for 3 minutes before going inside. The 2 minutes after kids are in bed before you start cleaning. These are not indulgences. They are the minimum rest intervals between demands on your nervous system." },
      { title: "Reduce the relational load where possible", description: "You may not be able to be physically alone, but you can reduce the cognitive and emotional demand: 'I'm here but I'm not answering questions right now.' Set a visual cue (a hat, a specific chair) that means 'Mama is recharging.' Children as young as 3 can learn this signal if you're consistent." },
    ],
    reminder: "The depletion you feel from constant togetherness is not a sign that you love your family less. It's a sign that your nervous system is doing its job — signaling when it needs repair. The mother who never needs solitude isn't more loving; she's more disconnected from her own signals. Trust yours.",
  },
  {
    id: "cant-decide",
    title: "I Can't Make a Decision",
    subtitle: "Decision fatigue is the progressive depletion of your prefrontal cortex's capacity to evaluate options. Every choice — from what to cook to how to respond to a tantrum — draws from the same limited reserve. You're not indecisive. You're depleted.",
    icon: <Brain className="w-6 h-6" />,
    color: "bg-yellow-500/10 text-yellow-600 border-yellow-200",
    steps: [
      { title: "Recognize the state", description: "Decision paralysis feels like: you can see the options but can't choose between them. You keep cycling. Nothing feels right. You might feel a physical sensation of pressure or blankness. Name it: 'My decision-making capacity is depleted right now. This is not a character flaw — it's a resource problem.'" },
      { title: "Apply the 'good enough' threshold", description: "Your brain is searching for the OPTIMAL choice. Stop searching. Ask instead: 'Is there a choice that is ACCEPTABLE?' Not best — acceptable. When capacity is low, satisficing (choosing the first good-enough option) is neurologically appropriate. Perfectionism in a depleted state is self-punishment." },
      { title: "Use the coin-flip test", description: "Assign the two options to heads/tails. Flip (or imagine flipping). Notice your gut reaction to the result. Disappointed? Choose the other one. Relieved? You have your answer. This works because it bypasses the executive function bottleneck and accesses your somatic wisdom — the body often knows before the mind does." },
      { title: "Default to pre-made decisions", description: "If you cannot choose: what did you do LAST TIME in this situation? Do that again. Defaults eliminate decision load entirely. 'What should we have for dinner?' — whatever's in the rotation. 'What should I wear?' — the same thing as yesterday. Conservation of cognitive resources is not laziness. It's engineering." },
      { title: "Delegate or defer (without guilt)", description: "'I can't make this decision right now' is a complete, valid response. Delegate: 'You choose. I trust your judgment.' Or defer: 'I'll decide tomorrow when I have more capacity.' A decision made while depleted is worse than a decision delayed. Protect the quality of your choices by respecting when you've run out." },
    ],
    reminder: "Research from Roy Baumeister's lab demonstrates that decision-making uses the same neural resources as self-regulation. Every choice you make — no matter how small — costs something. Mothers make an estimated 35,000+ decisions per day. Your paralysis is not indecision. It's your brain's protective response to an unsustainable cognitive load.",
  },
  {
    id: "bedtime-falling-apart",
    title: "Bedtime Is Falling Apart",
    subtitle: "You're depleted. They're wired. Here's the survival protocol.",
    icon: <Zap className="w-6 h-6" />,
    color: "bg-indigo-500/10 text-indigo-600 border-indigo-200",
    steps: [
      { title: "Lower every bar", description: "Tonight's goal: kids in bed, safe, and alive. Not bathed. Not storied. Not perfectly routined. Just in bed." },
      { title: "Simplify radically", description: "Skip the bath. One short book or no book. Teeth brushed (or not — one night won't cause cavities). PJs or sleep in clothes." },
      { title: "Use your calm voice", description: "Even if you don't feel calm. Whisper. Slow down your speech. Your regulated tone helps regulate them." },
      { title: "The 'boring parent' technique", description: "Be as boring as possible. Monotone voice. No engagement with stalling tactics. Boring = no dopamine = sleep comes faster." },
      { title: "Forgive the imperfect night", description: "Tomorrow is a new bedtime. Tonight just needed to end. And it did. You did that." },
    ],
    reminder: "A 'good enough' bedtime with a regulated parent is better than a 'perfect' routine with a parent who's falling apart.",
  },
]

export default function ToolkitPage() {
  const [activeCard, setActiveCard] = useState<string | null>(null)

  // Listen for clicks on the nav link to this page to reset state
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a[href="/dashboard/toolkit"]')
      if (link) {
        setActiveCard(null)
      }
    }
    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [])

  const selectedCard = toolkitCards.find((c) => c.id === activeCard)

  if (selectedCard) {
    return (
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => setActiveCard(null)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to toolkit
        </button>

        <div className={cn("rounded-3xl p-8 md:p-10 border", selectedCard.color.replace("text-", "border-").split(" ")[2] || "border-border")}>
          <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-4", selectedCard.color.split(" ").slice(0, 2).join(" "))}>
            {selectedCard.icon}
          </div>
          <h1 className="text-2xl md:text-3xl font-medium text-foreground mb-2">
            {selectedCard.title}
          </h1>
          <p className="text-muted-foreground mb-8">
            {selectedCard.subtitle}
          </p>

          {/* Steps */}
          <div className="space-y-4 mb-8">
            {selectedCard.steps.map((step, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                  <span className="text-sm font-medium text-foreground">{idx + 1}</span>
                </div>
                <div className="pt-1">
                  <h3 className="font-medium text-foreground mb-0.5">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Reminder */}
          <div className="bg-primary/5 rounded-2xl p-5 border border-primary/10">
            <p className="text-sm text-foreground/80 italic leading-relaxed">
              {selectedCard.reminder}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-medium text-foreground mb-1">Your Toolkit</h1>
        <p className="text-muted-foreground">
          Everything in one place. Scripts, reads, interventions — use what you need, when you need it.
        </p>
      </div>

      {/* Scripts Section */}
      <section className="space-y-3">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Scripts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a
            href="/dashboard/scripts/generate"
            className="bg-card rounded-2xl p-5 border border-border hover:border-primary/30 hover:shadow-sm transition-all group"
          >
            <div className="w-9 h-9 rounded-xl bg-violet-500/10 flex items-center justify-center mb-3">
              <Brain className="w-4 h-4 text-violet-600" />
            </div>
            <h3 className="text-base font-medium text-foreground group-hover:text-primary transition-colors">AI Script Generator</h3>
            <p className="text-xs text-muted-foreground mt-1">Describe your situation, get a personalised script</p>
          </a>
          <a
            href="/dashboard/scripts"
            className="bg-card rounded-2xl p-5 border border-border hover:border-primary/30 hover:shadow-sm transition-all group"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-3">
              <Play className="w-4 h-4 text-emerald-600" />
            </div>
            <h3 className="text-base font-medium text-foreground group-hover:text-primary transition-colors">Script Library</h3>
            <p className="text-xs text-muted-foreground mt-1">Browse ready-made scripts for common situations</p>
          </a>
        </div>
      </section>

      {/* Guides Section */}
      <section className="space-y-3">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Guides</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a
            href="/dashboard/guides"
            className="bg-card rounded-2xl p-5 border border-border hover:border-primary/30 hover:shadow-sm transition-all group"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center mb-3">
              <Hand className="w-4 h-4 text-blue-600" />
            </div>
            <h3 className="text-base font-medium text-foreground group-hover:text-primary transition-colors">Deep Dives</h3>
            <p className="text-xs text-muted-foreground mt-1">20 comprehensive guides for when you have capacity</p>
          </a>
          <a
            href="/dashboard/guides?tab=quick-reads"
            className="bg-card rounded-2xl p-5 border border-border hover:border-primary/30 hover:shadow-sm transition-all group"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center mb-3">
              <Zap className="w-4 h-4 text-amber-600" />
            </div>
            <h3 className="text-base font-medium text-foreground group-hover:text-primary transition-colors">Quick Reads</h3>
            <p className="text-xs text-muted-foreground mt-1">135 bite-size insights — 2 minutes each</p>
          </a>
        </div>
      </section>

      {/* Emergency Section */}
      <section className="space-y-3">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">In the Moment</h2>
        <p className="text-xs text-muted-foreground -mt-1">Tap the one that matches right now. Step-by-step interventions in under 2 minutes.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {toolkitCards.map((card) => (
            <button
              key={card.id}
              onClick={() => setActiveCard(card.id)}
              className={cn(
                "text-left rounded-2xl p-5 border transition-all hover:shadow-sm hover:scale-[1.01] active:scale-[0.99]",
                "bg-card border-border hover:border-primary/20"
              )}
            >
              <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center mb-2", card.color.split(" ").slice(0, 2).join(" "))}>
                {card.icon}
              </div>
              <h3 className="text-sm font-medium text-foreground mb-0.5">{card.title}</h3>
              <p className="text-xs text-muted-foreground line-clamp-2">{card.subtitle}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Footer */}
      <div className="text-center pt-2">
        <p className="text-xs text-muted-foreground">
          These tools are for self-regulation and educational purposes, not a substitute for professional care.
          If you are in crisis, contact 988 or your local emergency services.
        </p>
      </div>
    </div>
  )
}
