
import './globals.css'
import type { ReactNode } from 'react'
import Link from 'next/link'
import MobileNav from '../components/MobileNav'

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
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <header style={{ backgroundColor: brandNavy, color: white, padding: '20px 32px' }}>
            <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
              <Link href="/" style={{ textDecoration: 'none', color: white, display: 'flex', alignItems: 'center', gap: 10, fontSize: 20, fontWeight: 700 }}>
                <span style={{ width: 34, height: 34, borderRadius: '50%', backgroundColor: brandRed, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>⭐</span>
                <span>Bet<span style={{ color: brandRed }}>&</span>PlayUSA</span>
              </Link>
              <nav className="desktop-nav" style={{ display: 'flex', gap: 18, alignItems: 'center', flexWrap: 'wrap' }}>
                <Link href="/activate" style={{ color: white, textDecoration: 'none', fontWeight: 600 }}>Activate</Link>
                <Link href="/join" style={{ color: white, textDecoration: 'none', fontWeight: 600 }}>Join</Link>
                <Link href="/sportsbooks" style={{ color: white, textDecoration: 'none', fontWeight: 600 }}>Sportsbooks</Link>
                <Link href="/admin" style={{ color: white, textDecoration: 'none', fontWeight: 600 }}>Admin</Link>
                <Link href="/privacy" style={{ backgroundColor: white, color: brandNavy, padding: '10px 18px', borderRadius: 9999, textDecoration: 'none', fontWeight: 700 }}>Get Started</Link>
              </nav>
              <div className="mobile-nav-hamburger" style={{ display: 'flex', alignItems: 'center' }}>
                <MobileNav />
              </div>
            </div>
          </header>
          <main style={{ flex: 1 }}>{children}</main>
          <footer style={{ backgroundColor: brandNavy, color: white, padding: '40px 32px' }}>
            <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 24 }}>
              <div style={{ minWidth: 260 }}>
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>BetAndPlayUSA</h3>
                <p style={{ marginTop: 12, maxWidth: 320, lineHeight: 1.8, color: '#d1d5db' }}>
                  Premium sportsbook rewards with local host access and social acquisition offers.
                </p>
              </div>
              <div style={{ minWidth: 180 }}>
                <h4 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Quick links</h4>
                <div style={{ marginTop: 12, display: 'grid', gap: 10, color: '#d1d5db' }}>
                  <Link href="/privacy" style={{ color: '#d1d5db', textDecoration: 'none' }}>Privacy</Link>
                  <Link href="/terms" style={{ color: '#d1d5db', textDecoration: 'none' }}>Terms</Link>
                  <Link href="/cookies" style={{ color: '#d1d5db', textDecoration: 'none' }}>Cookies</Link>
                </div>
              </div>
              <div style={{ minWidth: 220 }}>
                <h4 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Need help?</h4>
                <p style={{ marginTop: 12, color: '#d1d5db', lineHeight: 1.8 }}>
                  support@betandplayusa.com<br />1-800-GAMBLER
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
