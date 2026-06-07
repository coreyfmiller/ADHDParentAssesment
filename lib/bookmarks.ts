// ============================================================
// Bookmarks — Save anything across the app
//
// A unified "save for later" system. She can bookmark:
// - Pathway insights
// - Toolkit cards
// - Scripts (pre-written or generated)
// - Guide sections
// - Micro-guide content
// - Identity anchors
// - Anything that resonates
//
// Bookmarks become her personal curated toolkit — the parts
// of the app that spoke to HER specifically.
// ============================================================

const BOOKMARKS_KEY = "mindful-mama-bookmarks"

export interface Bookmark {
  id: string
  type: "pathway-insight" | "toolkit" | "script" | "guide" | "micro-guide" | "anchor" | "strategy" | "other"
  title: string
  content: string
  source?: string // where it came from (e.g., "Depletion & Burnout pathway")
  href?: string // link back to the original content
  savedAt: number
}

export function getBookmarks(): Bookmark[] {
  try {
    const data = localStorage.getItem(BOOKMARKS_KEY)
    if (!data) return []
    return JSON.parse(data)
  } catch {
    return []
  }
}

export function addBookmark(bookmark: Omit<Bookmark, "id" | "savedAt">): Bookmark {
  const newBookmark: Bookmark = {
    ...bookmark,
    id: `bm-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    savedAt: Date.now(),
  }

  const all = getBookmarks()
  // Don't duplicate by content
  if (all.some((b) => b.content === newBookmark.content)) return all.find((b) => b.content === newBookmark.content)!

  all.push(newBookmark)
  try {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(all))
  } catch {}

  return newBookmark
}

export function removeBookmark(id: string): void {
  const all = getBookmarks().filter((b) => b.id !== id)
  try {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(all))
  } catch {}
}

export function isBookmarked(content: string): boolean {
  return getBookmarks().some((b) => b.content === content)
}

export function getBookmarksByType(type: Bookmark["type"]): Bookmark[] {
  return getBookmarks().filter((b) => b.type === type)
}
