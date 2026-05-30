"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Brain, Zap, Coffee, MessageCircle, BookOpen, FileText, Menu, X, Sparkles, Gift, Compass } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/dashboard", label: "My Profile", icon: Brain },
  { href: "/assess", label: "Reflections", icon: Compass },
  { href: "/dashboard/coach", label: "AI Coach", icon: Sparkles },
  { href: "/dashboard/toolkit", label: "Emergency Toolkit", icon: Zap },
  { href: "/dashboard/rhythms", label: "Daily Rhythms", icon: Coffee },
  { href: "/dashboard/scripts", label: "Script Library", icon: MessageCircle },
  { href: "/dashboard/guides", label: "Guides", icon: BookOpen },
  { href: "/dashboard/printables", label: "Printables", icon: FileText },
  { href: "/dashboard/refer", label: "Refer a Friend", icon: Gift },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
              const isActive = pathname === item.href
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
              const isActive = pathname === item.href
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

      {/* Disclaimer footer */}
      <footer className="border-t border-border/50 mt-auto">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center">
          <p className="text-xs text-muted-foreground/70 leading-relaxed">
            This product is for educational and self-reflection purposes only. It is not a medical device, diagnostic tool, or substitute for professional mental health care. If you are in crisis, contact <a href="tel:988" className="underline">988</a> (Suicide &amp; Crisis Lifeline) or your local emergency services.
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground/60 mt-2">
            <a href="/terms" className="hover:text-foreground transition-colors">Terms</a>
            <span>·</span>
            <a href="/privacy" className="hover:text-foreground transition-colors">Privacy</a>
            <span>·</span>
            <a href="mailto:hello@mindfulmama.co" className="hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
