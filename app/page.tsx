'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { sportsbooks, getSportsBooksByState } from '@/lib/sportsbooks'
import { detectUserState } from '@/lib/utils'
import EmailCapture from '../components/EmailCapture'

const NAVY = '#1B3A6B'
const RED = '#D91E27'
const WHITE = '#FFFFFF'
const CHARCOAL = '#111827'
const LIGHT = '#F4F6FA'

const SPORTSBOOK_LOGOS = {
  fanduel: '/fanduel.png',
  draftkings: '/draftkings.png',
  caesars: '/caesars.png',
  fanatics: '/fanatics.png',
  betmgm: '/betmgm.png',
  bet365: '/bet365.png',
}

const SPORTSBOOK_COLORS = {
  fanduel: '#1059a4',
  draftkings: '#1a1a2e',
  caesars: '#003087',
  fanatics: '#cc0000',
  betmgm: '#c9a84c',
  bet365: '#027b5b',
}

const STATES = ['AL','AK','AZ','AR','CO','CT','DC','DE','FL','GA','IL','IN','IA','KS','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VA','VT','WA','WV','WI','WY']

const AFFILIATE_LINKS: Record<string, string> = {
  fanduel: 'https://wlfanduelus.adsrv.eacdn.com/C.ashx?btag=a_44859b_16c_&affid=21038&siteid=44859&adid=16&c=',
  draftkings: 'https://dksb.sng.link/As9kz/uc22?_dl=https%3A%2F%2Fsportsbook.draftkings.com%2Fgateway%3Fs%3D103658189&pcid=422642&psn=3064&pcn=OSB_Bet5NUO&pscn=oddschecker_101GreatGoals&pcrn=WebReview&pscid=xx&pcrid=xx&wpcid=422642&wpsrc=3064&wpcn=OSB_Bet5NUO&wpscn=oddschecker_101GreatGoals&wpcrn=WebReview&wpscid=xx&wpcrid=xx&_forward_params=1',
  caesars: 'https://wlwilliamhillus.adsrv.eacdn.com/C.ashx?btag=a_26199b_2588c_&affid=465&siteid=26199&adid=2588&c=',
  fanatics: 'https://track.fanaticsbettingpartners.com/track/e3da5749-405e-4283-a8de-cb773323f82c?type=seo&s1=Confido52',
  betmgm: 'https://mediaserver.betmgmpartners.com/renderBanner.do?zoneId=1727083',
  bet365: 'AFFILIATE_LINK_BET365',
}

export default function HomePage() {
  const [userState, setUserState] = useState(null)
  const [visibleBooks, setVisibleBooks] = useState(sportsbooks)
  const [scrolled, setScrolled] = useState(0)
  const US_STATES = ['AL','AK','AZ','AR','CO','CT','DC','DE','FL','GA','IL','IN','IA','KS','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VA','VT','WA','WV','WI','WY']
  const isUSState = userState && US_STATES.includes(userState)

  useEffect(function() {
    detectUserState().then(function(state) {
      if (state) {
        setUserState(state)
        const filtered = getSportsBooksByState(state)
        if (filtered && filtered.length > 0) setVisibleBooks(filtered)
      }
    })
    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrolled(progress);
    }
    window.addEventListener('scroll', handleScroll)
    return function() { window.removeEventListener('scroll', handleScroll) }
  }, [])

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', background: LIGHT, color: CHARCOAL }}>
      <div style={{ position: 'fixed', top: 0, left: 0, zIndex: 99998, height: 3, background: '#D91E27', transition: 'width 0.1s', width: scrolled + '%' }} />
      <style>{`
        .sb-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.1) !important; transition: all 0.2s ease; }
        .sb-card { transition: all 0.2s ease; }
        .claim-btn:hover { background: #b91c1c !important; transform: translateY(-1px); }
        .claim-btn { transition: all 0.15s ease; }
      `}</style>

      {/* TICKER */}
      <div style={{ background: '#D91E27', padding: '8px 0', overflow: 'hidden', whiteSpace: 'nowrap' }}>
        <div style={{ display: 'inline-flex', gap: 48, animation: 'ticker 30s linear infinite' }}>
          {['John from NY just claimed $250 with FanDuel', 'Mike from PA joined the Telegram tips group', 'Sarah from IL claimed $200 with DraftKings', 'Chris from OH just claimed $200 with Fanatics', 'James from NJ claimed $200 with Caesars', 'Tyler from MI joined the Telegram tips group', 'David from CO claimed $150 with BetMGM', 'Ryan from TN just claimed $250 with FanDuel'].map(function(msg, i) {
            return <span key={i} style={{ fontSize: 13, fontWeight: 600, color: '#ffffff', letterSpacing: 0.3 }}>⭐ {msg}</span>;
          })}
        </div>
      </div>
      <style>{`@keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>

      {/* HERO */}
      <div style={{ background: NAVY, position: 'relative', overflow: 'hidden', padding: '80px 24px 100px' }}>
        {/* Stripe texture */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 12px)', pointerEvents: 'none' }} />
        {/* Red accent bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 5, background: RED }} />
        {/* Glow */}
        <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(217,30,39,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(217,30,39,0.15)', border: '1px solid rgba(217,30,39,0.4)', borderRadius: 30, padding: '6px 16px', marginBottom: 28 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: RED, display: 'inline-block' }} />
            <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: 13, fontWeight: 600, letterSpacing: 0.5 }}>Available in {STATES.length}+ states</span>
          </div>

          <h1 style={{ fontSize: 'clamp(36px, 7vw, 72px)', fontWeight: 900, color: WHITE, margin: '0 0 8px', lineHeight: 1.05, letterSpacing: -1, textTransform: 'uppercase' }}>
            Bet Smarter.
          </h1>
          <h1 style={{ fontSize: 'clamp(36px, 7vw, 72px)', fontWeight: 900, color: RED, margin: '0 0 24px', lineHeight: 1.05, letterSpacing: -1, textTransform: 'uppercase' }}>
            Get Rewarded.
          </h1>
          <p style={{ fontSize: 'clamp(16px, 2.5vw, 20px)', color: 'rgba(255,255,255,0.75)', maxWidth: 560, margin: '0 auto 40px', lineHeight: 1.7 }}>
            Sign up with a top US sportsbook through us and earn cash rewards or exclusive Telegram betting tips. New customers only.
          </p>

          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/activate" style={{ background: RED, color: WHITE, padding: '18px 40px', borderRadius: 8, fontWeight: 800, fontSize: 17, textDecoration: 'none', letterSpacing: 0.5, textTransform: 'uppercase', boxShadow: '0 6px 24px rgba(217,30,39,0.5)' }}>
              Claim Cash Reward
            </Link>
            <Link href="/join" style={{ background: 'transparent', color: WHITE, padding: '18px 32px', borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: 'none', border: '2px solid rgba(255,255,255,0.4)' }}>
              Join Telegram Tips
            </Link>
          </div>

          <EmailCapture />

          {/* Trust badges */}
          <div style={{ display: 'flex', gap: 32, justifyContent: 'center', flexWrap: 'wrap', marginTop: 52 }}>
            {[['47+', 'Legal States'], ['5', 'Top Sportsbooks'], ['$500+', 'In Rewards'], ['21+', 'Age Required']].map(function(item) {
              return (
                <div key={item[0]} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 28, fontWeight: 900, color: WHITE, lineHeight: 1 }}>{item[0]}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', marginTop: 4, fontWeight: 500, letterSpacing: 0.5, textTransform: 'uppercase' }}>{item[1]}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* SOCIAL PROOF BANNER */}
      <div style={{ background: '#111827', padding: '16px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 32, flexWrap: 'wrap' }}>
          {[
            { value: '2,400+', label: 'Telegram members' },
            { value: '$485,000+', label: 'In rewards claimed' },
            { value: '4.9/5', label: 'Average rating' },
            { value: '48hrs', label: 'Avg approval time' },
          ].map(function(stat) {
            return (
              <div key={stat.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 18, fontWeight: 900, color: '#D91E27' }}>{stat.value}</span>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', fontWeight: 500 }}>{stat.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* PARTNER LOGOS */}
      <div style={{ background: '#ffffff', padding: '24px', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>Official affiliate partners</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
            {[
              { name: 'FanDuel', bg: '#1059a4', initials: 'FD', text: '#fff' },
              { name: 'DraftKings', bg: '#1a1a2e', initials: 'DK', text: '#00d4aa' },
              { name: 'Caesars', bg: '#003087', initials: 'CS', text: '#FFD700' },
              { name: 'BetMGM', bg: '#c9a84c', initials: 'BM', text: '#1a1a1a' },
              { name: 'Fanatics', bg: '#cc0000', initials: 'FA', text: '#fff' },
              { name: 'bet365', bg: '#027b5b', initials: 'B3', text: '#fff' },
            ].map(function(book) {
              return (
                <div key={book.name} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#f4f6fa', borderRadius: 10, padding: '8px 14px', border: '1px solid #e5e7eb' }}>
                  <div style={{ width: 28, height: 28, borderRadius: 6, background: book.bg, color: book.text, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 800, flexShrink: 0 }}>{book.initials}</div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#374151' }}>{book.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* WHY US */}
      <div style={{ padding: '60px 24px', background: '#ffffff' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ display: 'inline-block', background: '#D91E27', color: '#ffffff', fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', padding: '5px 16px', borderRadius: 4, marginBottom: 16 }}>Why Us</div>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 900, color: '#1B3A6B', margin: 0, textTransform: 'uppercase', letterSpacing: -0.5 }}>Why BetAndPlayUSA?</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
            {[
              { icon: '✓', title: 'No Extra Cost', desc: 'We earn from sportsbooks directly. You pay nothing extra and your bonus is never reduced.' },
              { icon: '$', title: 'Verified Offers', desc: 'Every offer is verified and updated regularly. We only feature licensed, regulated US sportsbooks.' },
              { icon: '⚡', title: 'Instant Rewards', desc: 'Cash rewards paid on the spot at venues. Telegram access granted within 24 hours of approval.' },
              { icon: '🔒', title: 'Safe & Secure', desc: 'Your data is held for 90 days for verification only. Never sold to third parties. GDPR & CCPA compliant.' },
            ].map(function(item) {
              return (
                <div key={item.title} style={{ background: '#f4f6fa', borderRadius: 14, padding: '28px 24px', border: '1px solid #e5e7eb', textAlign: 'center' }}>
                  <div style={{ width: 52, height: 52, background: '#1B3A6B', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: 22, color: '#ffffff', fontWeight: 900 }}>{item.icon}</div>
                  <h3 style={{ fontSize: 16, fontWeight: 900, color: '#1B3A6B', margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: 0.3 }}>{item.title}</h3>
                  <p style={{ fontSize: 14, color: '#4b5563', margin: 0, lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div style={{ padding: '80px 24px', background: WHITE }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ display: 'inline-block', background: RED, color: WHITE, fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', padding: '5px 16px', borderRadius: 4, marginBottom: 16 }}>How it works</div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 900, color: NAVY, margin: 0, textTransform: 'uppercase', letterSpacing: -0.5 }}>Four Simple Steps</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32 }}>
            {[
              { num: '01', title: 'Scan or Click', desc: 'Scan a QR code at a bar or click a link from our ads.', icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D91E27" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>' },
              { num: '02', title: 'Pick a Book', desc: 'Choose from our top US sportsbooks.', icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D91E27" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>' },
              { num: '03', title: 'Sign Up & Bet', desc: 'Create your account and place your first qualifying bet.', icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D91E27" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>' },
              { num: '04', title: 'Get Rewarded', desc: 'Collect your cash reward in person or unlock Telegram tips.', icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D91E27" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"></circle><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"></path></svg>' },
            ].map(function(step) {
              return (
                <div key={step.num} style={{ position: 'relative' }}>
                  <div style={{ width: 44, height: 44, background: 'rgba(217,30,39,0.1)', border: '2px solid rgba(217,30,39,0.2)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }} dangerouslySetInnerHTML={{ __html: step.icon }} />
                  <div style={{ fontSize: 48, fontWeight: 900, color: 'rgba(27,58,107,0.06)', lineHeight: 1, marginBottom: 6, marginTop: -8 }}>{step.num}</div>
                  <div style={{ width: 3, height: 28, background: RED, marginBottom: 10 }} />
                  <h3 style={{ fontSize: 17, fontWeight: 800, color: NAVY, margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: 0.5 }}>{step.title}</h3>
                  <p style={{ fontSize: 14, color: '#4b5563', margin: 0, lineHeight: 1.6 }}>{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* DECISION HELPER */}
      <div style={{ padding: '60px 24px', background: '#ffffff' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ display: 'inline-block', background: '#D91E27', color: '#ffffff', fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', padding: '5px 16px', borderRadius: 4, marginBottom: 16 }}>Choose Your Path</div>
            <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 900, color: '#1B3A6B', margin: 0, textTransform: 'uppercase' }}>Which is Right for You?</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            <div style={{ background: '#f4f6fa', borderRadius: 16, padding: '28px 24px', border: '2px solid #e5e7eb', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: '#D91E27' }} />
              <div style={{ fontSize: 36, marginBottom: 12 }}>💵</div>
              <h3 style={{ fontSize: 20, fontWeight: 900, color: '#1B3A6B', margin: '0 0 12px', textTransform: 'uppercase' }}>Cash Reward</h3>
              <p style={{ fontSize: 14, color: '#4b5563', marginBottom: 20, lineHeight: 1.7 }}>Best if you are at a bar or event right now and want cash in your hand today.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
                {['You scanned a QR code at a venue', 'You want cash paid immediately', 'You have a host code from the bar'].map(function(point) {
                  return <div key={point} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#374151' }}><span style={{ color: '#22c55e', fontWeight: 900, fontSize: 16 }}>✓</span>{point}</div>;
                })}
              </div>
              <a href="/activate" style={{ display: 'block', background: '#D91E27', color: '#fff', textAlign: 'center', padding: '13px 20px', borderRadius: 10, fontWeight: 800, fontSize: 14, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: 0.5 }}>Claim Cash Reward</a>
            </div>
            <div style={{ background: '#f4f6fa', borderRadius: 16, padding: '28px 24px', border: '2px solid #e5e7eb', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: '#1B3A6B' }} />
              <div style={{ fontSize: 36, marginBottom: 12 }}>📲</div>
              <h3 style={{ fontSize: 20, fontWeight: 900, color: '#1B3A6B', margin: '0 0 12px', textTransform: 'uppercase' }}>Telegram Tips</h3>
              <p style={{ fontSize: 14, color: '#4b5563', marginBottom: 20, lineHeight: 1.7 }}>Best if you found us online and want free expert betting tips every day.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
                {['You found us via social media or ads', 'You want free daily betting tips', 'You are happy to sign up online'].map(function(point) {
                  return <div key={point} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#374151' }}><span style={{ color: '#22c55e', fontWeight: 900, fontSize: 16 }}>✓</span>{point}</div>;
                })}
              </div>
              <a href="/join" style={{ display: 'block', background: '#1B3A6B', color: '#fff', textAlign: 'center', padding: '13px 20px', borderRadius: 10, fontWeight: 800, fontSize: 14, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: 0.5 }}>Join Tips Group</a>
            </div>
          </div>
        </div>
      </div>

      {/* SPORTSBOOKS */}
      <div style={{ padding: '80px 24px', background: LIGHT }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ display: 'inline-block', background: RED, color: WHITE, fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', padding: '5px 16px', borderRadius: 4, marginBottom: 16 }}>Top Sportsbooks</div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 900, color: NAVY, margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: -0.5 }}>
              {isUSState ? 'Top Books in ' + userState : 'Featured Books'}
            </h2>
            {isUSState && <p style={{ color: '#6b7280', fontSize: 15, margin: '0 0 8px' }}>Showing sportsbooks available in your state.</p>}
            <p style={{ color: '#6b7280', fontSize: 15, margin: 0 }}>New customers only. Must be 21+ and in an eligible state.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {visibleBooks.map(function(book, idx) {
              const logoSrc = SPORTSBOOK_LOGOS[book.id as keyof typeof SPORTSBOOK_LOGOS]
              const bgColor = SPORTSBOOK_COLORS[book.id as keyof typeof SPORTSBOOK_COLORS] || NAVY
              return (
                <div key={book.id} className="sb-card" style={{ background: WHITE, borderRadius: 12, border: '1px solid #e5e7eb', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', position: 'relative' }}>
                  {idx === 0 && (
                    <span style={{ position: 'absolute', top: 12, left: 12, background: RED, color: WHITE, fontSize: 9, fontWeight: 800, padding: '2px 6px', borderRadius: 4, textTransform: 'uppercase', letterSpacing: 0.5, zIndex: 1 }}>Top Pick</span>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '20px 24px', flexWrap: 'wrap' }}>
                    <div style={{ width: 56, height: 56, borderRadius: 10, background: bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden', padding: 5, boxSizing: 'border-box' }}>
                      {logoSrc ? <img src={logoSrc} alt={book.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} /> : <span style={{ color: '#fff', fontWeight: 800, fontSize: 14 }}>{book.id.slice(0,2).toUpperCase()}</span>}
                    </div>
                    <div style={{ flex: 1, minWidth: 180 }}>
                      <Link href={'/reviews/' + book.id} style={{ fontWeight: 800, fontSize: 17, color: NAVY, textDecoration: 'none', display: 'block' }}>{book.name}</Link>
                      <div style={{ fontSize: 14, color: '#374151', marginTop: 3, fontWeight: 600 }}>{book.offer}</div>
                    </div>
                    <button onClick={function() { window.open(AFFILIATE_LINKS[book.id] || '/activate', '_blank') }} className="claim-btn" style={{ background: RED, color: WHITE, padding: '12px 24px', borderRadius: 8, fontWeight: 800, fontSize: 14, border: 'none', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: 0.5, flexShrink: 0, whiteSpace: 'nowrap' }}>
                      Claim Offer
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <Link href="/sportsbooks" style={{ color: NAVY, fontWeight: 700, fontSize: 14, textDecoration: 'none', borderBottom: '2px solid ' + RED, paddingBottom: 2 }}>
              View all sportsbooks →
            </Link>
          </div>
        </div>
      </div>

      {/* SWEEPSTAKES TEASER */}
      <div style={{ padding: '60px 24px', background: '#111827', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 12px)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 860, margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
            <div style={{ maxWidth: 480 }}>
              <div style={{ display: 'inline-block', background: 'rgba(217,30,39,0.2)', border: '1px solid rgba(217,30,39,0.4)', borderRadius: 20, padding: '5px 14px', marginBottom: 16 }}>
                <span style={{ color: '#ffffff', fontSize: 12, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase' }}>Legal in All 50 States</span>
              </div>
              <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 900, color: '#ffffff', margin: '0 0 12px', textTransform: 'uppercase', lineHeight: 1.1 }}>Try Sweepstakes <span style={{ color: '#D91E27' }}>Casinos</span></h2>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 15, margin: '0 0 24px', lineHeight: 1.7 }}>Play free casino games and win real prizes. Sweepstakes casinos are legal everywhere — no sports betting laws apply. Perfect for states where sportsbooks are restricted.</p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}>
                {['Free to play', 'Win real cash', 'All 50 states'].map(function(v) {
                  return <div key={v} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 20, padding: '6px 14px', fontSize: 13, color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>{v}</div>;
                })}
              </div>
              <a href="/sweepstakes" style={{ display: 'inline-block', background: '#D91E27', color: '#ffffff', padding: '14px 28px', borderRadius: 8, fontWeight: 800, fontSize: 14, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: 0.5 }}>View Sweepstakes Casinos</a>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {['Stake.us', 'Pulsz', 'McLuck', 'WOW Vegas', 'Chanced'].map(function(name) {
                return (
                  <div key={name} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '10px 16px', fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.8)' }}>{name}</div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* CASINO TEASER */}
      <div style={{ padding: '60px 24px', background: '#1a0a2e', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 12px)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 860, margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
            <div style={{ maxWidth: 480 }}>
              <div style={{ display: 'inline-block', background: 'rgba(217,30,39,0.2)', border: '1px solid rgba(217,30,39,0.4)', borderRadius: 20, padding: '5px 14px', marginBottom: 16 }}>
                <span style={{ color: '#ffffff', fontSize: 12, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase' }}>NJ, PA, MI, WV, CT, DE</span>
              </div>
              <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 900, color: '#ffffff', margin: '0 0 12px', textTransform: 'uppercase', lineHeight: 1.1 }}>Online <span style={{ color: '#D91E27' }}>Casino</span></h2>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 15, margin: '0 0 24px', lineHeight: 1.7 }}>Slots, live dealer, table games and more from the biggest names in US online casino. Licensed and regulated in 6 states.</p>
              <a href="/casino" style={{ display: 'inline-block', background: '#D91E27', color: '#ffffff', padding: '14px 28px', borderRadius: 8, fontWeight: 800, fontSize: 14, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: 0.5 }}>View Casino Offers</a>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {['BetMGM Casino', 'DraftKings Casino', 'FanDuel Casino', 'Caesars Palace', 'Golden Nugget'].map(function(name) {
                return (
                  <div key={name} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '10px 16px', fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.8)' }}>{name}</div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* DFS TEASER */}
      <div style={{ padding: '60px 24px', background: '#0f172a', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 12px)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 860, margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
            <div style={{ maxWidth: 480 }}>
              <div style={{ display: 'inline-block', background: 'rgba(217,30,39,0.2)', border: '1px solid rgba(217,30,39,0.4)', borderRadius: 20, padding: '5px 14px', marginBottom: 16 }}>
                <span style={{ color: '#ffffff', fontSize: 12, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase' }}>Legal in Most US States</span>
              </div>
              <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 900, color: '#ffffff', margin: '0 0 12px', textTransform: 'uppercase', lineHeight: 1.1 }}>Daily Fantasy <span style={{ color: '#D91E27' }}>Sports</span></h2>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 15, margin: '0 0 24px', lineHeight: 1.7 }}>Build your lineup, beat your opponents, win real cash. DFS is available in most US states — even where sports betting is restricted.</p>
              <a href="/dfs" style={{ display: 'inline-block', background: '#D91E27', color: '#ffffff', padding: '14px 28px', borderRadius: 8, fontWeight: 800, fontSize: 14, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: 0.5 }}>View DFS Sites</a>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {['DraftKings DFS', 'FanDuel DFS', 'Underdog Fantasy', 'PrizePicks'].map(function(name) {
                return (
                  <div key={name} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '10px 16px', fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.8)' }}>{name}</div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* TWO PATHS */}      <div style={{ padding: '80px 24px', background: NAVY, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 12px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: RED }} />
        <div style={{ maxWidth: 860, margin: '0 auto', position: 'relative' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ display: 'inline-block', background: RED, color: WHITE, fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', padding: '5px 16px', borderRadius: 4, marginBottom: 16 }}>Two Ways to Win</div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 900, color: WHITE, margin: 0, textTransform: 'uppercase', letterSpacing: -0.5 }}>Choose Your Reward</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 16, padding: 32 }}>
              <div style={{ width: 56, height: 56, background: 'rgba(217,30,39,0.15)', border: '2px solid rgba(217,30,39,0.3)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, flexShrink: 0 }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D91E27" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 900, color: WHITE, margin: '0 0 12px', textTransform: 'uppercase' }}>Cash Reward</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, margin: '0 0 24px', fontSize: 15 }}>Scan a QR code at a participating bar or event, sign up with a sportsbook, and collect your cash reward in person from the host.</p>
              <Link href="/activate" style={{ display: 'inline-block', background: RED, color: WHITE, padding: '12px 24px', borderRadius: 8, fontWeight: 800, fontSize: 14, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Get Cash
              </Link>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 16, padding: 32 }}>
              <div style={{ width: 56, height: 56, background: 'rgba(217,30,39,0.15)', border: '2px solid rgba(217,30,39,0.3)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, flexShrink: 0 }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D91E27" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.44 2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"></path>
                </svg>
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 900, color: WHITE, margin: '0 0 12px', textTransform: 'uppercase' }}>Telegram Tips</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, margin: '0 0 24px', fontSize: 15 }}>Sign up through our link, upload your proof, and get instant access to our premium Telegram betting tips group — completely free.</p>
              <Link href="/join" style={{ display: 'inline-block', background: 'rgba(255,255,255,0.15)', color: WHITE, padding: '12px 24px', borderRadius: 8, fontWeight: 800, fontSize: 14, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: 0.5, border: '1px solid rgba(255,255,255,0.25)' }}>
                Join Tips Group
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div style={{ padding: '80px 24px', background: '#ffffff' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ display: 'inline-block', background: '#D91E27', color: '#ffffff', fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', padding: '5px 16px', borderRadius: 4, marginBottom: 16 }}>FAQ</div>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 900, color: '#1B3A6B', margin: 0, textTransform: 'uppercase', letterSpacing: -0.5 }}>Common Questions</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { q: 'Is this legitimate?', a: 'Yes. BetAndPlayUSA is an affiliate marketing website. We earn a commission from sportsbooks when you sign up through our links. This is standard practice across the industry and does not affect the bonus you receive.' },
              { q: 'How do I collect my cash reward?', a: 'For in-person activations, after your submission is verified you simply show the confirmation screen to your host at the bar or event and they pay you cash on the spot.' },
              { q: 'When do I get access to the Telegram group?', a: 'For social signups via our Join page, your proof is reviewed within 24 hours. Once approved you will receive a Telegram invite link directly to your username.' },
              { q: 'Do I need to be a new customer?', a: 'Yes. All offers are for new customers only — people who have never had an account with that sportsbook before. One claim per person per sportsbook.' },
              { q: 'Which states are eligible?', a: 'Sports betting is legal in 47+ US states. Availability varies by sportsbook. Use the filter on our Sportsbooks page to see which books are available in your state.' },
              { q: 'How much do I need to deposit?', a: 'Most offers require a minimum $5 bet to unlock the bonus. Caesars requires just a $1 bet. Always check the individual sportsbook terms before signing up.' },
              { q: 'Will this affect my sportsbook bonus?', a: 'No. BetAndPlayUSA earns an affiliate commission from the sportsbook. This comes from the sportsbook marketing budget and does not reduce or affect the welcome bonus you receive.' },
            ].map(function(item, i) {
              return (
                <div key={i} style={{ background: '#f4f6fa', borderRadius: 12, padding: '20px 24px', border: '1px solid #e5e7eb' }}>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: '#1B3A6B', margin: '0 0 8px' }}>{item.q}</h3>
                  <p style={{ fontSize: 14, color: '#4b5563', margin: 0, lineHeight: 1.7 }}>{item.a}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* FOOTER DISCLAIMER */}
      <div style={{ background: '#0a1a38', padding: '24px', textAlign: 'center' }}>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', margin: 0, maxWidth: 700, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.7 }}>
          BetAndPlayUSA is an affiliate marketing website. We earn commissions when you sign up through our links. This does not affect the bonuses you receive. Must be 21+ and physically located in an eligible US state. Gambling problem? Call 1-800-GAMBLER.
        </p>
      </div>

      <div style={{ height: 80 }} className="mobile-bottom-spacer" />
      <style>{`.mobile-bottom-spacer { display: none; } @media (max-width: 767px) { .mobile-bottom-spacer { display: block; } }`}</style>

      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 999, background: '#0f2147', borderTop: '2px solid #D91E27', padding: '12px 16px', display: 'flex', gap: 10 }}>
        <style>{`@media (min-width: 768px) { .mobile-sticky-cta { display: none !important; } }`}</style>
        <div className="mobile-sticky-cta" style={{ display: 'flex', gap: 10, width: '100%' }}>
          <a href="/activate" style={{ flex: 1, background: '#D91E27', color: '#fff', textAlign: 'center', padding: '13px 8px', borderRadius: 8, fontWeight: 800, fontSize: 13, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: 0.3 }}>Claim Cash</a>
          <a href="/join" style={{ flex: 1, background: 'rgba(255,255,255,0.1)', color: '#fff', textAlign: 'center', padding: '13px 8px', borderRadius: 8, fontWeight: 800, fontSize: 13, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: 0.3, border: '1px solid rgba(255,255,255,0.2)' }}>Join Telegram</a>
        </div>
      </div>

    </div>
  )
}
