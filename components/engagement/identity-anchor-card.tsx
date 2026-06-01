"use client"

import { useState, useEffect } from "react"
import { Heart, Bookmark, BookmarkCheck } from "lucide-react"
import { getTodaysAnchor, saveAnchorAsFavorite, unsaveAnchor, getSavedFavorites } from "@/lib/engagement/identity-anchors"
import type { IdentityAnchor } from "@/lib/engagement/types"
import type { PatternMap } from "@/lib/assessments/types"

interface IdentityAnchorCardProps {
  patternMap: PatternMap | null
}

export function IdentityAnchorCard({ patternMap }: IdentityAnchorCardProps) {
  const [anchor, setAnchor] = useState<IdentityAnchor | null>(null)
  const [isSaved, setIsSaved] = useState(false)
  const [showFavorites, setShowFavorites] = useState(false)
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    const todaysAnchor = getTodaysAnchor(patternMap)
    setAnchor(todaysAnchor)
    setIsSaved(todaysAnchor.saved)
    setFavorites(getSavedFavorites())
  }, [patternMap])

  const handleSave = () => {
    if (!anchor) return
    if (isSaved) {
      unsaveAnchor(anchor.date)
      setIsSaved(false)
    } else {
      saveAnchorAsFavorite(anchor.date)
      setIsSaved(true)
    }
    setFavorites(getSavedFavorites())
  }

  if (!anchor) return null

  return (
    <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl border border-primary/15 overflow-hidden">
      {/* Main anchor */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-primary uppercase tracking-wide">
              Today&apos;s anchor
            </span>
          </div>
          <button
            onClick={handleSave}
            className="p-1.5 rounded-lg hover:bg-primary/10 transition-colors"
            aria-label={isSaved ? "Remove from favorites" : "Save to favorites"}
          >
            {isSaved ? (
              <BookmarkCheck className="w-4 h-4 text-primary" />
            ) : (
              <Bookmark className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
        </div>

        <p className="text-lg font-medium text-foreground leading-relaxed">
          {anchor.statement}
        </p>
      </div>

      {/* Saved favorites toggle */}
      {favorites.length > 0 && (
        <div className="border-t border-primary/10">
          <button
            onClick={() => setShowFavorites(!showFavorites)}
            className="w-full px-6 py-2.5 text-xs text-primary/70 hover:text-primary hover:bg-primary/5 transition-colors text-left"
          >
            {showFavorites ? "Hide" : "View"} saved anchors ({favorites.length})
          </button>

          {showFavorites && (
            <div className="px-6 pb-4 space-y-2 max-h-40 overflow-y-auto">
              {favorites.map((fav, i) => (
                <p key={i} className="text-sm text-foreground/70 italic pl-3 border-l-2 border-primary/20">
                  {fav}
                </p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
