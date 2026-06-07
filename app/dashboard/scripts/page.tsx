"use client"

import { useState } from "react"
import Link from "next/link"
import { MessageCircle, Search, Sparkles, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

type Script = {
  id: string
  category: string
  title: string
  context: string
  script: string
}

const scripts: Script[] = [
  // Repair scripts
  { id: "repair-toddler", category: "Repair", title: "After yelling (ages 2-5)", context: "You lost your temper with a young child and need to reconnect.", script: "Come here, sweetheart. I'm sorry I used my big voice. That was scary, wasn't it? You didn't do anything wrong. Mama's brain got too full and I made a mistake. I'm working on it. I love you always, even when I'm grumpy. Can we have a cuddle?" },
  { id: "repair-school", category: "Repair", title: "After yelling (ages 6-12)", context: "You lost your temper with a school-age child.", script: "Hey, I want to talk about what happened earlier. I yelled, and that wasn't okay. You didn't deserve that. I was feeling overwhelmed and I handled it badly. That's my stuff to work on, not yours. I'm sorry. What do you need from me right now?" },
  { id: "repair-teen", category: "Repair", title: "After a conflict (teens)", context: "You had a blow-up with your teenager.", script: "I owe you an apology. I lost my cool and I said things I didn't mean. You're allowed to be frustrated with me about that. I'm working on managing my reactions better. Can we talk about what happened, or do you need space first?" },
  { id: "repair-overcompensate", category: "Repair", title: "When you've been overcompensating", context: "You've been guilt-buying or over-permitting after a hard moment.", script: "I want to be honest with you. I've been saying yes to everything because I felt bad about yesterday. That's not fair to either of us. I'm sorry about what happened, AND we still need our normal boundaries. Both things can be true." },

  // Sensory boundary scripts
  { id: "sensory-quiet", category: "Sensory Boundaries", title: "Needing quiet", context: "The noise level has become unbearable.", script: "Hey loves, the noise level is really high right now and my brain is struggling. Can we use indoor voices for the next 10 minutes? Then you can be loud outside." },
  { id: "sensory-touch", category: "Sensory Boundaries", title: "Being touched out", context: "Physical contact has become overwhelming.", script: "I love you so much, and right now my body needs a break from being touched. It's not about you at all — my skin just feels too full. Can we sit next to each other and I'll hold your hand instead?" },
  { id: "sensory-break", category: "Sensory Boundaries", title: "Needing to step away", context: "You need to physically leave the room before you snap.", script: "Mama needs 2 minutes of quiet. I'm not angry at you — my brain just needs a tiny rest. I'll be right back and then we can keep playing." },
  { id: "sensory-partner", category: "Sensory Boundaries", title: "Asking partner to take over", context: "You've hit your sensory wall and need a handoff.", script: "I've hit my sensory wall. I need you to take over for the next 20 minutes. I'm not being dramatic — my nervous system is maxed out and if I don't step away, I'm going to snap at everyone. I'll be back." },

  // Partner communication
  { id: "partner-explain", category: "Partner", title: "Explaining your brain", context: "Your partner doesn't understand why things are hard for you.", script: "I want to explain something about how my brain works. When I forget things, or can't start tasks, or get overwhelmed by noise — it's not because I don't care or I'm not trying. My brain has a genuine difference in how it processes information. I'm not asking you to fix it. I'm asking you to understand it, so we can build systems together." },
  { id: "partner-load", category: "Partner", title: "The mental load conversation", context: "You need to make the invisible work visible.", script: "I need to show you something. I wrote down everything I'm tracking in my head for our family this week. I'm not saying you don't help — I'm saying the REMEMBERING part is crushing me. Can we look at this together and figure out what you can fully own?" },
  { id: "partner-help", category: "Partner", title: "Asking for help tonight", context: "You're depleted and need your partner to step up.", script: "I've used all my capacity today. I need you to handle bedtime tonight — the whole thing, start to finish. I'm not going to hover or check. I trust you. I just need to not be 'on' for the next hour." },
  { id: "partner-vulnerable", category: "Partner", title: "Letting them in", context: "You've been hiding how much you're struggling.", script: "I need to tell you something. I'm really struggling right now and I've been hiding it. I feel like I'm failing as a mom most days. I don't need you to fix it — I just need you to know, and to not judge me for it." },

  // School/external communication
  { id: "school-forms", category: "School & External", title: "Requesting email communication", context: "You keep missing paper communications.", script: "I want to be upfront that I sometimes miss communications that come home in backpacks. Could important notices also be emailed? I want to be responsive — I just need information in a format that works for me." },
  { id: "school-late", category: "School & External", title: "Addressing chronic lateness", context: "You're consistently late and feeling judged.", script: "I'm aware we've been arriving late more than I'd like. I'm actively working on our morning systems. I appreciate your patience while we figure this out." },
  { id: "school-forgot", category: "School & External", title: "When you forgot something", context: "You missed a costume day, form, or event.", script: "I'm sorry we missed this. I'm putting a system in place to catch these going forward. Is there anything I can do to make up for it, or is there a way to get reminders earlier?" },

  // Self-compassion
  { id: "self-shame", category: "Self-Compassion", title: "When the shame spiral hits", context: "You're spiraling after a hard moment.", script: "I'm having a hard time right now. I made a mistake. That doesn't make me a bad mother — it makes me a human one. I can repair this. I will repair this. And tomorrow I'll try again." },
  { id: "self-compare", category: "Self-Compassion", title: "When you're comparing yourself", context: "You've seen another mom who seems to have it together.", script: "I'm doing it again — comparing my behind-the-scenes to her highlight reel. Her life is not my life. Her brain is not my brain. What do I need right now?" },
  { id: "self-enough", category: "Self-Compassion", title: "End of a hard day", context: "The day was rough and you need to let it go.", script: "Today was hard. I did what I could with the energy I had. My kids are safe, fed, and loved. That is enough. I am enough. Tomorrow is a new day." },

  // Boundary scripts
  { id: "boundary-advice", category: "Boundaries", title: "Unsolicited parenting advice", context: "Someone is telling you how to parent.", script: "I appreciate you trying to help. I've actually found that what works for most people doesn't work for my brain. I'm figuring out my own approach." },
  { id: "boundary-volunteer", category: "Boundaries", title: "Saying no to volunteering", context: "You're being asked to take on more than you can handle.", script: "I'm not able to take that on right now. I've learned that overcommitting makes me a worse parent, not a better community member. I hope you understand." },
  { id: "boundary-judgment", category: "Boundaries", title: "When you feel judged", context: "Someone has made a comment about your parenting or home.", script: "I know it looks different from the outside. I'm doing my best with the brain I have, and my kids are happy and loved. That's what matters to me." },
]

const categories = [...new Set(scripts.map((s) => s.category))]

export default function ScriptsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredScripts = scripts.filter((script) => {
    const matchesCategory = activeCategory === "all" || script.category === activeCategory
    const matchesSearch = searchQuery === "" ||
      script.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      script.context.toLowerCase().includes(searchQuery.toLowerCase()) ||
      script.script.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-2xl md:text-3xl font-medium text-foreground">Script Library</h1>
        </div>
        <p className="text-muted-foreground">
          Ready-to-use words for when your brain can&apos;t find them. Tap any script to expand it.
        </p>
      </div>

      {/* AI Script Generator CTA */}
      <Link
        href="/dashboard/scripts/generate"
        className="block bg-gradient-to-br from-primary/5 to-amber-500/5 rounded-2xl p-5 border border-primary/15 hover:border-primary/30 transition-all group"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
              Need words for YOUR specific situation?
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Describe what&apos;s happening and I&apos;ll write you a custom script.
            </p>
          </div>
          <ArrowRight className="w-4 h-4 text-primary opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
        </div>
      </Link>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search scripts..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory("all")}
          className={cn(
            "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
            activeCategory === "all"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-muted-foreground hover:text-foreground"
          )}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
              activeCategory === cat
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Scripts */}
      <div className="space-y-3">
        {filteredScripts.map((script) => (
          <ScriptCard key={script.id} script={script} />
        ))}
        {filteredScripts.length === 0 && (
          <p className="text-center text-muted-foreground py-8">No scripts match your search.</p>
        )}
      </div>
    </div>
  )
}

function ScriptCard({ script }: { script: Script }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <button
      onClick={() => setExpanded(!expanded)}
      className="w-full text-left bg-card rounded-2xl border border-border p-5 hover:border-primary/30 transition-all"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="text-xs font-medium text-primary uppercase tracking-wide">{script.category}</span>
          <h3 className="font-medium text-foreground mt-0.5">{script.title}</h3>
          <p className="text-sm text-muted-foreground mt-0.5">{script.context}</p>
        </div>
        <span className="text-muted-foreground text-lg flex-shrink-0">{expanded ? "−" : "+"}</span>
      </div>
      {expanded && (
        <div className="mt-4 bg-primary/5 rounded-xl p-4 border border-primary/10">
          <p className="text-sm text-foreground/90 leading-relaxed italic">
            &quot;{script.script}&quot;
          </p>
        </div>
      )}
    </button>
  )
}
