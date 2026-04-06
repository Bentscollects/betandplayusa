
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
              <Link href="/" style={{ textDecoration: 'none', color: '#ffffff', display: 'flex', alignItems: 'center', gap: 10, fontSize: 20, fontWeight: 700 }}>
                <span style={{ width: 34, height: 34, borderRadius: '50%', backgroundColor: '#D91E27', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>⭐</span>
                <span>Bet<span style={{ color: '#D91E27' }}>&</span>PlayUSA</span>
              </Link>
              <nav className="desktop-nav" style={{ display: 'flex', gap: 18, alignItems: 'center', flexWrap: 'wrap' }}>
                <Link href="/activate" style={{ color: white, textDecoration: 'none', fontWeight: 600 }}>Activate</Link>
                <Link href="/join" style={{ color: white, textDecoration: 'none', fontWeight: 600 }}>Join</Link>
                <Link href="/sportsbooks" style={{ color: white, textDecoration: 'none', fontWeight: 600 }}>Sportsbooks</Link>
                <Link href="/join" style={{ backgroundColor: white, color: brandNavy, padding: '10px 18px', borderRadius: 9999, textDecoration: 'none', fontWeight: 700 }}>Get Started</Link>
              </nav>
              <div className="mobile-nav-hamburger" style={{ display: 'flex', alignItems: 'center' }}>
                <MobileNav />
              </div>
            </div>
          </header>
          <main style={{ flex: 1 }}>{children}</main>
          <footer style={{ backgroundColor: '#1B3A6B', color: '#ffffff', padding: '48px 32px 24px' }}>
  <div style={{ position: 'relative' }}>
    <div style={{ position: 'absolute', top: -48, left: 0, right: 0, height: 4, background: '#D91E27' }} />
  </div>
  <div style={{ maxWidth: 1280, margin: '0 auto' }}>
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 40, marginBottom: 48 }}>
      <div style={{ minWidth: 260, maxWidth: 340 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <span style={{ width: 34, height: 34, borderRadius: '50%', backgroundColor: '#D91E27', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>⭐</span>
          <span style={{ fontWeight: 800, fontSize: 18 }}>Bet<span style={{ color: '#D91E27' }}>&amp;</span>PlayUSA</span>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, fontSize: 14, margin: '0 0 16px' }}>Premium sportsbook rewards with local host access and social acquisition offers across 30+ US states.</p>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, margin: 0 }}>Must be 21+. Please gamble responsibly.</p>
      </div>
      <div style={{ minWidth: 140 }}>
        <h4 style={{ margin: '0 0 16px', fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1, color: 'rgba(255,255,255,0.5)' }}>Quick Links</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Link href="/activate" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>Activate</Link>
          <Link href="/join" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>Join Telegram</Link>
          <Link href="/sportsbooks" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>Sportsbooks</Link>
        </div>
      </div>
      <div style={{ minWidth: 140 }}>
        <h4 style={{ margin: '0 0 16px', fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1, color: 'rgba(255,255,255,0.5)' }}>Legal</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Link href="/privacy" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>Privacy Policy</Link>
          <Link href="/terms" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>Terms</Link>
          <Link href="/cookies" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>Cookies</Link>
          <Link href="/responsible-gambling" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>Responsible Gambling</Link>
        </div>
      </div>
      <div style={{ minWidth: 180 }}>
        <h4 style={{ margin: '0 0 16px', fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1, color: 'rgba(255,255,255,0.5)' }}>Need Help?</h4>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, margin: '0 0 8px' }}>support@betandplayusa.com</p>
        <p style={{ color: '#D91E27', fontSize: 15, fontWeight: 800, margin: '0 0 16px' }}>1-800-GAMBLER</p>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, lineHeight: 1.6, margin: 0 }}>If you or someone you know has a gambling problem, call the National Problem Gambling Helpline.</p>
      </div>
    </div>
    <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 24, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12 }}>
      <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12, margin: 0 }}>© 2026 BetAndPlayUSA. All rights reserved. This site is for entertainment purposes only.</p>
      <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12, margin: 0 }}>BetAndPlayUSA is an affiliate marketing website.</p>
    </div>
  </div>
</footer>
        </div>
      </body>
    </html>
  )
}
