"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Bookmark, X, Zap, MessageSquare, BookOpen, Brain, Sparkles, Heart } from "lucide-react"
import { getBookmarks, removeBookmark } from "@/lib/bookmarks"
import type { Bookmark as BookmarkType } from "@/lib/bookmarks"

const typeIcons: Record<string, React.ElementType> = {
  "pathway-insight": Brain,
  toolkit: Zap,
  script: MessageSquare,
  guide: BookOpen,
  "micro-guide": BookOpen,
  anchor: Heart,
  strategy: Sparkles,
  other: Bookmark,
}

const typeLabels: Record<string, string> = {
  "pathway-insight": "Pathway Insight",
  toolkit: "Toolkit",
  script: "Script",
  guide: "Guide",
  "micro-guide": "Micro-Guide",
  anchor: "Identity Anchor",
  strategy: "Strategy",
  other: "Saved",
}

const typeColors: Record<string, string> = {
  "pathway-insight": "bg-violet-500/10 text-violet-600",
  toolkit: "bg-red-500/10 text-red-600",
  script: "bg-blue-500/10 text-blue-600",
  guide: "bg-purple-500/10 text-purple-600",
  "micro-guide": "bg-amber-500/10 text-amber-600",
  anchor: "bg-pink-500/10 text-pink-600",
  strategy: "bg-emerald-500/10 text-emerald-600",
  other: "bg-secondary text-muted-foreground",
}

export default function SavedPage() {
  const [bookmarks, setBookmarks] = useState<BookmarkType[]>([])
  const [filter, setFilter] = useState<string>("all")

  useEffect(() => {
    setBookmarks(getBookmarks())
  }, [])

  const handleRemove = (id: string) => {
    removeBookmark(id)
    setBookmarks(getBookmarks())
  }

  const types = [...new Set(bookmarks.map((b) => b.type))]
  const filtered = filter === "all" ? bookmarks : bookmarks.filter((b) => b.type === filter)

  if (bookmarks.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Bookmark className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-2xl md:text-3xl font-medium text-foreground">Saved</h1>
          </div>
          <p className="text-muted-foreground">
            Your personal collection of insights, strategies, and moments that resonated.
          </p>
        </div>
        <div className="bg-card rounded-2xl p-8 border border-border text-center">
          <Bookmark className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground mb-1">Nothing saved yet</p>
          <p className="text-xs text-muted-foreground/70">
            As you explore the app, tap the bookmark icon on anything that resonates. It&apos;ll show up here.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Bookmark className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-2xl md:text-3xl font-medium text-foreground">Saved</h1>
        </div>
        <p className="text-muted-foreground">
          {bookmarks.length} item{bookmarks.length !== 1 ? "s" : ""} saved — your personal collection.
        </p>
      </div>

      {/* Filter tabs */}
      {types.length > 1 && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filter === "all" ? "bg-primary/10 text-primary" : "bg-secondary/50 text-muted-foreground hover:text-foreground"
            }`}
          >
            All ({bookmarks.length})
          </button>
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filter === type ? "bg-primary/10 text-primary" : "bg-secondary/50 text-muted-foreground hover:text-foreground"
              }`}
            >
              {typeLabels[type] || type} ({bookmarks.filter((b) => b.type === type).length})
            </button>
          ))}
        </div>
      )}

      {/* Bookmarks list */}
      <div className="space-y-3">
        {filtered.sort((a, b) => b.savedAt - a.savedAt).map((bookmark) => {
          const Icon = typeIcons[bookmark.type] || Bookmark
          const color = typeColors[bookmark.type] || "bg-secondary text-muted-foreground"
          return (
            <div key={bookmark.id} className="bg-card rounded-2xl p-5 border border-border group">
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-medium text-foreground">{bookmark.title}</h3>
                    <button
                      onClick={() => handleRemove(bookmark.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-muted-foreground/50 hover:text-destructive transition-all ml-auto flex-shrink-0"
                      aria-label="Remove"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-sm text-foreground/70 leading-relaxed">{bookmark.content}</p>
                  {bookmark.source && (
                    <p className="text-[10px] text-muted-foreground mt-2">From: {bookmark.source}</p>
                  )}
                  {bookmark.href && (
                    <Link href={bookmark.href} className="text-xs text-primary hover:text-primary/80 mt-1 inline-block">
                      View original →
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
