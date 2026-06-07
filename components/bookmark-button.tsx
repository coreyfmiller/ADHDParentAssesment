"use client"

import { useState, useEffect } from "react"
import { Bookmark, BookmarkCheck } from "lucide-react"
import { addBookmark, removeBookmark, isBookmarked, getBookmarks } from "@/lib/bookmarks"
import type { Bookmark as BookmarkType } from "@/lib/bookmarks"

interface BookmarkButtonProps {
  type: BookmarkType["type"]
  title: string
  content: string
  source?: string
  href?: string
  size?: "sm" | "md"
}

export function BookmarkButton({ type, title, content, source, href, size = "sm" }: BookmarkButtonProps) {
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setSaved(isBookmarked(content))
  }, [content])

  const handleToggle = () => {
    if (saved) {
      const all = getBookmarks()
      const existing = all.find((b) => b.content === content)
      if (existing) removeBookmark(existing.id)
      setSaved(false)
    } else {
      addBookmark({ type, title, content, source, href })
      setSaved(true)
    }
  }

  const iconSize = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4"
  const padding = size === "sm" ? "p-1.5" : "p-2"

  return (
    <button
      onClick={handleToggle}
      className={`${padding} rounded-lg transition-all ${
        saved
          ? "text-primary bg-primary/10 hover:bg-primary/20"
          : "text-muted-foreground/40 hover:text-primary hover:bg-primary/5"
      }`}
      aria-label={saved ? "Remove bookmark" : "Save this"}
      title={saved ? "Saved" : "Save for later"}
    >
      {saved ? <BookmarkCheck className={iconSize} /> : <Bookmark className={iconSize} />}
    </button>
  )
}
