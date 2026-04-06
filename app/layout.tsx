
import './globals.css'
import type { ReactNode } from 'react'
import SiteChrome from '../components/SiteChrome'

export const metadata = {
  title: 'BetAndPlayUSA - Premium Sportsbook Rewards',
  description: 'Find the best sportsbook for your state and earn cash rewards. FanDuel, DraftKings, Caesars, and more.',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

interface RootLayoutProps {
  children: ReactNode
}

const brandNavy = '#0B2545'
const brandRed = '#E63946'
const white = '#ffffff'
const lightGray = '#f7f8fb'

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" style={{ scrollBehavior: 'smooth' }}>
      <head>
        <style>{`
          @media (min-width: 768px) { .mobile-nav-hamburger { display: none !important; } }
          @media (max-width: 767px) { .desktop-nav { display: none !important; } }
        `}</style>
      </head>
      <body style={{ margin: 0, fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: lightGray, color: '#111827' }}>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  )
}
