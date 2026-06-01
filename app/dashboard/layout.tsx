"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Brain, Zap, BookOpen, Menu, X, Sparkles, User } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/dashboard", label: "Home", icon: Brain },
  { href: "/dashboard/coach", label: "Coach", icon: Sparkles },
  { href: "/dashboard/toolkit", label: "Toolkit", icon: Zap },
  { href: "/dashboard/library", label: "Library", icon: BookOpen },
  { href: "/dashboard/me", label: "Me", icon: User },
]

const libraryPaths = ["/dashboard/library", "/dashboard/micro-guides", "/dashboard/scripts", "/dashboard/rhythms", "/dashboard/printables", "/dashboard/guides"]
const mePaths = ["/dashboard/me", "/dashboard/archetype", "/dashboard/share"]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  function isNavActive(href: string): boolean {
    if (href === "/dashboard") return pathname === "/dashboard"
    if (href === "/dashboard/library") return libraryPaths.some(p => pathname.startsWith(p))
    if (href === "/dashboard/me") return mePaths.some(p => pathname.startsWith(p))
    return pathname.startsWith(href)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top nav bar */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Image src="/logo2.png" alt="Mindful Mama" width={120} height={32} className="h-8 w-auto" />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = isNavActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
        {/* Mobile nav */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-border/50 bg-background px-4 py-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = isNavActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        )}
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {children}
      </main>
    </div>
  )
}
