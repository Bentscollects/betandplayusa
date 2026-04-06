'use client';
import { useState } from 'react';

const NAVY = '#1B3A6B';
const RED = '#D91E27';
const WHITE = '#FFFFFF';
const LIGHT = '#F4F6FA';

const SPORTSBOOKS = [
  {
    id: 'fanduel',
    name: 'FanDuel',
    logo: '/fanduel.png',
    bg: '#1059a4',
    initials: 'FD',
    text: '#fff',
    offer: 'Bet $5, Get up to $300 Back Each Day for 10 Days',
    details: 'No promo code needed \u2014 bonus auto applied at signup.',
    affiliateLink: 'https://wlfanduelus.adsrv.eacdn.com/C.ashx?btag=a_44859b_16c_&affid=21038&siteid=44859&adid=16&c=',
    states: ['AZ', 'CO', 'CT', 'IL', 'IN', 'IA', 'KS', 'LA', 'MD', 'MA', 'MI', 'NJ', 'NY', 'OH', 'PA', 'TN', 'VA', 'WV', 'WY'],
    tag: 'Top Pick',
    rating: 4.9,
    bestFor: 'NFL & NBA',
    payoutSpeed: 'Same day',
    limitedTime: true,
  },
  {
    id: 'draftkings',
    name: 'DraftKings',
    logo: '/draftkings.png',
    bg: '#1a1a2e',
    initials: 'DK',
    text: '#00d4aa',
    offer: 'Bet $5, Get $200 in Bonus Bets Instantly',
    details: 'No promo code needed \u2014 bonus auto applied at signup.',
    affiliateLink: 'https://dksb.sng.link/As9kz/uc22?_dl=https%3A%2F%2Fsportsbook.draftkings.com%2Fgateway%3Fs%3D103658189&pcid=422642&psn=3064&pcn=OSB_Bet5NUO&pscn=oddschecker_101GreatGoals&pcrn=WebReview&pscid=xx&pcrid=xx&wpcid=422642&wpsrc=3064&wpcn=OSB_Bet5NUO&wpscn=oddschecker_101GreatGoals&wpcrn=WebReview&wpscid=xx&wpcrid=xx&_forward_params=1',
    states: ['AZ', 'CO', 'CT', 'IL', 'IN', 'IA', 'KS', 'LA', 'MD', 'MA', 'MI', 'NJ', 'NY', 'OH', 'PA', 'TN', 'VA', 'WV', 'WY'],
    tag: null,
    rating: 4.8,
    bestFor: 'All sports',
    payoutSpeed: 'Same day',
  },
  {
    id: 'bet365',
    name: 'bet365',
    logo: '/bet365.png',
    bg: '#027b5b',
    initials: 'B3',
    text: '#fff',
    offer: 'Bet $5, Get $365 in Bonus Bets Win or Lose',
    details: 'Use promo code FOX365 at signup.',
    rating: 4.7,
    bestFor: 'In-play betting',
    payoutSpeed: 'Same day',
    affiliateLink: 'AFFILIATE_LINK_BET365',
    states: ['AZ', 'CO', 'IL', 'IN', 'IA', 'KS', 'LA', 'MD', 'MA', 'MI', 'NJ', 'NY', 'OH', 'PA', 'TN', 'VA', 'WV'],
    tag: null,
    limitedTime: false,
  },
  {
    id: 'caesars',
    name: 'Caesars',
    logo: '/caesars.png',
    bg: '#003087',
    initials: 'CS',
    text: '#FFD700',
    offer: 'Bet $1, Double Your Winnings on Next 10 Wagers',
    details: 'Promo code auto applied via our link.',
    affiliateLink: 'https://wlwilliamhillus.adsrv.eacdn.com/C.ashx?btag=a_26199b_2588c_&affid=465&siteid=26199&adid=2588&c=',
    states: ['AZ', 'CO', 'IL', 'IN', 'IA', 'LA', 'MD', 'MI', 'NJ', 'NY', 'OH', 'PA', 'TN', 'VA', 'WV'],
    tag: null,
    rating: 4.6,
    bestFor: 'Promos & boosts',
    payoutSpeed: '1-2 days',
  },
  {
    id: 'fanatics',
    name: 'Fanatics',
    logo: '/fanatics.png',
    bg: '#cc0000',
    initials: 'FA',
    text: '#fff',
    offer: 'Bet $5, Get $200 in FanCash Immediately',
    details: 'Promo code auto applied via our link.',
    affiliateLink: 'https://track.fanaticsbettingpartners.com/track/e3da5749-405e-4283-a8de-cb773323f82c?type=seo&s1=Confido52',
    states: ['AZ', 'CO', 'IL', 'IN', 'KS', 'LA', 'MD', 'MA', 'MI', 'NJ', 'OH', 'PA', 'TN', 'VA'],
    tag: null,
    rating: 4.5,
    bestFor: 'Parlays',
    payoutSpeed: '1-2 days',
  },
  {
    id: 'betmgm',
    name: 'BetMGM',
    logo: '/betmgm.png',
    bg: '#c9a84c',
    initials: 'BM',
    text: '#1a1a1a',
    offer: 'Get up to $1,500 Back in Bonus Bets if First Bet Loses',
    details: 'Promo code auto applied via our link.',
    affiliateLink: 'https://mediaserver.betmgmpartners.com/renderBanner.do?zoneId=1727083',
    states: ['AZ', 'CO', 'IL', 'IN', 'IA', 'LA', 'MD', 'MA', 'MI', 'NJ', 'NY', 'OH', 'PA', 'TN', 'VA', 'WV', 'WY'],
    tag: null,
    rating: 4.7,
    bestFor: 'Casino & sports',
    payoutSpeed: '24 hours',
  },
];

const ALL_STATES = ['AZ', 'CO', 'CT', 'IL', 'IN', 'IA', 'KS', 'LA', 'MD', 'MA', 'MI', 'NJ', 'NY', 'OH', 'PA', 'TN', 'VA', 'WV', 'WY'];

export default function SportsbooksPage() {
  const [selectedState, setSelectedState] = useState('');

  const filtered = selectedState
    ? SPORTSBOOKS.filter(function(b) { return b.states.includes(selectedState); })
    : SPORTSBOOKS;

  function handleClaim(book) {
    window.open(book.affiliateLink, '_blank');
  }

  return (
    <div style={{ minHeight: '100vh', background: LIGHT, fontFamily: 'system-ui, sans-serif' }}>

      <div style={{ background: NAVY, padding: '48px 24px 56px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 12px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: RED }} />
        <div style={{ position: 'relative', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'inline-block', background: 'rgba(217,30,39,0.2)', border: '1px solid rgba(217,30,39,0.4)', borderRadius: 20, padding: '5px 14px', marginBottom: 16 }}>
            <span style={{ color: WHITE, fontSize: 12, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase' }}>Compare &amp; Claim</span>
          </div>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 900, color: WHITE, margin: '0 0 14px', textTransform: 'uppercase', letterSpacing: -0.5 }}>Top US Sportsbooks</h1>
          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 15, margin: '0 0 28px', lineHeight: 1.6 }}>Compare the best offers available right now. New customers only. Must be 21+.</p>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, marginTop: 8 }}>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, margin: 0 }}>Showing offers for your state — update below if needed</p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: 'rgba(255,255,255,0.12)', border: '2px solid rgba(255,255,255,0.25)', borderRadius: 12, padding: '12px 20px' }}>
              <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, fontWeight: 700, whiteSpace: 'nowrap' }}>Your state:</span>
              <select value={selectedState} onChange={function(e) { setSelectedState(e.target.value); }} style={{ background: 'transparent', color: WHITE, border: 'none', fontSize: 16, fontWeight: 800, outline: 'none', cursor: 'pointer', minWidth: 120 }}>
                <option value="" style={{ color: '#000' }}>All states</option>
                {ALL_STATES.map(function(s) { return <option key={s} value={s} style={{ color: '#000' }}>{s}</option>; })}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '32px 16px 60px' }}>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 24px', background: WHITE, borderRadius: 16, border: '1px solid #e5e7eb' }}>
            <div style={{ fontSize: 40, marginBottom: 16, color: RED, fontWeight: 900 }}>?</div>
            <h3 style={{ color: NAVY, marginBottom: 8, fontWeight: 800, textTransform: 'uppercase' }}>No sportsbooks in {selectedState}</h3>
            <p style={{ color: '#6b7280' }}>Try selecting a different state or view all books.</p>
            <button onClick={function() { setSelectedState(''); }} style={{ marginTop: 16, background: RED, color: WHITE, border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 800, fontSize: 14, cursor: 'pointer', textTransform: 'uppercase' }}>View All</button>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {filtered.map(function(book, idx) {
            return (
              <div key={book.id} style={{ background: WHITE, borderRadius: 16, border: idx === 0 ? '2px solid ' + RED : '1px solid #e5e7eb', overflow: 'hidden', boxShadow: idx === 0 ? '0 4px 20px rgba(217,30,39,0.1)' : '0 2px 8px rgba(0,0,0,0.04)', position: 'relative' }}>
                {book.tag && (
                  <div style={{ background: RED, color: WHITE, fontSize: 10, fontWeight: 800, padding: '4px 12px', textTransform: 'uppercase', letterSpacing: 1, display: 'inline-block' }}>{book.tag}</div>
                )}
                {book.limitedTime && !book.tag && (
                  <div style={{ background: '#f59e0b', color: '#fff', fontSize: 10, fontWeight: 800, padding: '4px 12px', textTransform: 'uppercase', letterSpacing: 1, display: 'inline-block' }}>Limited Time</div>
                )}
                <div style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                  <a href={'/reviews/' + book.id} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: 16, flex: 1, flexWrap: 'wrap', cursor: 'pointer' }}>
                  <div style={{ width: 64, height: 64, borderRadius: 12, background: book.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden', padding: 8, boxSizing: 'border-box' }}>
                    <img src={book.logo} alt={book.name} style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 180 }}>
                    <div style={{ fontWeight: 900, fontSize: 18, color: NAVY, marginBottom: 4 }}>{book.name}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2, marginBottom: 4 }}>
                      <span style={{ background: '#dcfce7', color: '#166534', fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 4, textTransform: 'uppercase', letterSpacing: 0.3 }}>&#10003; Licensed &amp; Regulated</span>
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: '#111827', marginBottom: 4 }}>{book.offer}</div>
                    <div style={{ fontSize: 13, color: '#6b7280' }}>{book.details}</div>
                    <div style={{ display: 'flex', gap: 16, marginTop: 8, flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <span style={{ color: '#f59e0b', fontSize: 13, fontWeight: 800 }}>{'★'.repeat(Math.floor(book.rating))}</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: '#374151' }}>{book.rating}</span>
                      </div>
                      <div style={{ fontSize: 12, color: '#6b7280', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <span style={{ fontWeight: 700, color: '#1B3A6B' }}>Best for:</span> {book.bestFor}
                      </div>
                      <div style={{ fontSize: 12, color: '#6b7280', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <span style={{ fontWeight: 700, color: '#1B3A6B' }}>Payout:</span> {book.payoutSpeed}
                      </div>
                    </div>
                    <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 6 }}>T&Cs apply. New customers only. 21+. Min deposit required. State restrictions apply.</div>
                  </div>
                  </a>
                  <div style={{ flexShrink: 0, textAlign: 'center' }}>
                    <button onClick={function() { handleClaim(book); }} style={{ background: RED, color: WHITE, border: 'none', borderRadius: 10, padding: '14px 28px', fontSize: 15, fontWeight: 800, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: 0.5, boxShadow: '0 4px 12px rgba(217,30,39,0.3)', display: 'block', whiteSpace: 'nowrap' }}>
                      Claim Offer
                    </button>
                    <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 6 }}>New customers only</div>
                  </div>
                </div>
                <div style={{ background: '#f9fafb', borderTop: '1px solid #f1f5f9', padding: '10px 24px', display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.3 }}>Available in:</span>
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    {book.states.slice(0, 8).map(function(s) {
                      return <span key={s} style={{ background: selectedState === s ? RED : '#e5e7eb', color: selectedState === s ? WHITE : '#475569', fontSize: 11, fontWeight: 700, padding: '2px 7px', borderRadius: 4 }}>{s}</span>;
                    })}
                    {book.states.length > 8 && <span style={{ background: '#e5e7eb', color: '#475569', fontSize: 11, fontWeight: 700, padding: '2px 7px', borderRadius: 4 }}>+{book.states.length - 8} more</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 32, background: WHITE, borderRadius: 14, border: '1px solid #e5e7eb', padding: '20px 24px' }}>
          <p style={{ fontSize: 12, color: '#9ca3af', margin: 0, lineHeight: 1.7 }}>
            <strong style={{ color: '#6b7280' }}>Affiliate disclosure:</strong> BetAndPlayUSA earns a commission when you sign up through our links. This does not affect the bonus you receive. All offers subject to sportsbook terms. Must be 21+ and in an eligible state. Gambling problem? Call 1-800-GAMBLER.
          </p>
        </div>
      </div>
    </div>
  );
}
