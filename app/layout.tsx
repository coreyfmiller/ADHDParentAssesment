import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'ADHD Parenting Profile — Discover How Your Brain Parents',
  description: 'A research-informed assessment for neurodivergent mothers. Understand your parenting style, sensory triggers, and get concrete strategies that work with your brain.',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <div className="flex-1">
          {children}
        </div>
        <footer className="border-t border-border/50 bg-background">
          <div className="max-w-2xl mx-auto px-4 py-6 text-center space-y-3">
            <p className="text-xs text-muted-foreground/70 leading-relaxed">
              This product is for educational and self-reflection purposes only. It is not a medical device, diagnostic tool, or substitute for professional mental health care. No professional-client relationship is created through use of this product. If you are in crisis, contact <a href="tel:988" className="underline">988</a> (Suicide &amp; Crisis Lifeline) or your local emergency services.
            </p>
            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground/60">
              <a href="/terms" className="hover:text-foreground transition-colors">Terms of Service</a>
              <span>·</span>
              <a href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <span>·</span>
              <a href="mailto:hello@mindfulmama.co" className="hover:text-foreground transition-colors">Contact</a>
              <span>·</span>
              <span>© {new Date().getFullYear()} Mindful Mama</span>
            </div>
          </div>
        </footer>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
