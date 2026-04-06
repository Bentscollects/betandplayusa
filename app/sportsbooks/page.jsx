'use client';
import { useState } from 'react';

const SPORTSBOOKS = [
  {
    id: 'fanduel',
    name: 'FanDuel',
    initials: 'FD',
    logo: '/fanduel.png',
    bg: '#1059a4',
    text: '#ffffff',
    offer: 'Bet $5, Get up to $3,000 in Bonus Bets',
    cpa: 250,
    affiliateLink: 'https://wlfanduelus.adsrv.eacdn.com/C.ashx?btag=a_44859b_16c_&affid=21038&siteid=44859&adid=16&c=',
    states: ['AZ', 'CO', 'CT', 'IL', 'IN', 'IA', 'KS', 'LA', 'MD', 'MA', 'MI', 'NJ', 'NY', 'OH', 'PA', 'TN', 'VA', 'WV', 'WY'],
  },
  {
    id: 'draftkings',
    name: 'DraftKings',
    initials: 'DK',
    logo: '/draftkings.png',
    bg: '#1a1a2e',
    text: '#00d4aa',
    offer: 'Bet $5, Get $200 in Bonus Bets Instantly',
    cpa: 200,
    affiliateLink: 'https://dksb.sng.link/As9kz/uc22?_dl=https%3A%2F%2Fsportsbook.draftkings.com%2Fgateway%3Fs%3D103658189&pcid=422642&psn=3064&pcn=OSB_Bet5NUO&pscn=oddschecker_101GreatGoals&pcrn=WebReview&pscid=xx&pcrid=xx&wpcid=422642&wpsrc=3064&wpcn=OSB_Bet5NUO&wpscn=oddschecker_101GreatGoals&wpcrn=WebReview&wpscid=xx&wpcrid=xx&_forward_params=1',
    states: ['AZ', 'CO', 'CT', 'IL', 'IN', 'IA', 'KS', 'LA', 'MD', 'MA', 'MI', 'NJ', 'NY', 'OH', 'PA', 'TN', 'VA', 'WV', 'WY'],
  },
  {
    id: 'caesars',
    name: 'Caesars',
    initials: 'CS',
    logo: '/caesars.png',
    bg: '#003087',
    text: '#FFD700',
    offer: 'Bet $1, Get 10x 100% Profit Boost Tokens',
    cpa: 200,
    affiliateLink: 'https://wlwilliamhillus.adsrv.eacdn.com/C.ashx?btag=a_26199b_2588c_&affid=465&siteid=26199&adid=2588&c=',
    states: ['AZ', 'CO', 'IL', 'IN', 'IA', 'LA', 'MD', 'MI', 'NJ', 'NY', 'OH', 'PA', 'TN', 'VA', 'WV'],
  },
  {
    id: 'fanatics',
    name: 'Fanatics',
    initials: 'FA',
    logo: '/fanatics.png',
    bg: '#cc0000',
    text: '#ffffff',
    offer: 'Bet $5, Get $200 in FanCash Immediately',
    cpa: 200,
    affiliateLink: 'https://track.fanaticsbettingpartners.com/track/e3da5749-405e-4283-a8de-cb773323f82c?type=seo&s1=Confido52',
    states: ['AZ', 'CO', 'IL', 'IN', 'KS', 'LA', 'MD', 'MA', 'MI', 'NJ', 'OH', 'PA', 'TN', 'VA'],
  },
  {
    id: 'betmgm',
    name: 'BetMGM',
    initials: 'BM',
    logo: '/betmgm.png',
    bg: '#c9a84c',
    text: '#1a1a1a',
    offer: 'First Bet Offer Up to $1,500 in Bonus Bets',
    cpa: 150,
    affiliateLink: 'https://mediaserver.betmgmpartners.com/renderBanner.do?zoneId=1727083',
    states: ['AZ', 'CO', 'IL', 'IN', 'IA', 'LA', 'MD', 'MA', 'MI', 'NJ', 'NY', 'OH', 'PA', 'TN', 'VA', 'WV', 'WY'],
  },
];

const ALL_STATES = ['AZ', 'CO', 'CT', 'IL', 'IN', 'IA', 'KS', 'LA', 'MD', 'MA', 'MI', 'NJ', 'NY', 'OH', 'PA', 'TN', 'VA', 'WV', 'WY'];

export default function SportsbooksPage() {
  const [selectedState, setSelectedState] = useState('');

  const filtered = selectedState
    ? SPORTSBOOKS.filter(function(b) { return b.states.includes(selectedState); })
    : SPORTSBOOKS;

  function handleClaim(book) {
    if (book.affiliateLink.startsWith('AFFILIATE_LINK_')) {
      alert('Affiliate link coming soon for ' + book.name);
      return;
    }
    window.open(book.affiliateLink, '_blank');
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fb' }}>

      <div style={{ background: '#1B3A6B', padding: '48px 24px 56px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 12px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: '#D91E27' }} />
        <div style={{ maxWidth: 640, margin: '0 auto', position: 'relative' }}>
          <h1 style={{ fontSize: 'clamp(26px, 5vw, 40px)', fontWeight: 900, color: '#fff', margin: '0 0 14px', lineHeight: 1.15, textTransform: 'uppercase' }}>Top Sportsbooks</h1>
          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 16, margin: '0 0 28px', lineHeight: 1.6 }}>Compare the best sportsbook offers available in your state. New customers only. Must be 21+.</p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,0.1)', borderRadius: 12, padding: '10px 16px' }}>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, fontWeight: 500, whiteSpace: 'nowrap' }}>Filter by state:</span>
            <select
              value={selectedState}
              onChange={function(e) { setSelectedState(e.target.value); }}
              style={{ background: 'transparent', color: '#fff', border: 'none', fontSize: 14, fontWeight: 600, outline: 'none', cursor: 'pointer', appearance: 'none', paddingRight: 8 }}
            >
              <option value="" style={{ color: '#000' }}>All states</option>
              {ALL_STATES.map(function(s) {
                return <option key={s} value={s} style={{ color: '#000' }}>{s}</option>;
              })}
            </select>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 780, margin: '0 auto', padding: '32px 16px 60px' }}>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 24px', color: '#64748b' }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>😔</div>
            <h3 style={{ color: '#0B2545', marginBottom: 8 }}>No sportsbooks available in {selectedState}</h3>
            <p>Try selecting a different state or check back soon.</p>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {filtered.map(function(book, idx) {
            return (
              <div key={book.id} style={{ background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, flex: 1, minWidth: 200 }}>
                    <div style={{ position: 'relative', flexShrink: 0 }}>
                      <div style={{ width: 56, height: 56, borderRadius: 12, background: book.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden', padding: 6, boxSizing: 'border-box' }}>
                        <img src={book.logo} alt={book.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                      </div>
                      {idx === 0 && (
                        <div style={{ position: 'absolute', top: -6, right: -6, background: '#E63946', color: '#fff', fontSize: 9, fontWeight: 700, padding: '2px 5px', borderRadius: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>Top</div>
                      )}
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, color: '#0B2545', fontSize: 17 }}>{book.name}</div>
                      <div style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>{filtered.length < SPORTSBOOKS.length ? 'Available in ' + selectedState : book.states.length + ' states'}</div>
                    </div>
                  </div>

                  <div style={{ flex: 2, minWidth: 200 }}>
                    <div style={{ fontWeight: 700, color: '#0B2545', fontSize: 15 }}>{book.offer}</div>
                  </div>

                  <div style={{ flexShrink: 0 }}>
                    <button
                      onClick={function() { handleClaim(book); }}
                      style={{ background: '#D91E27', color: '#fff', border: 'none', borderRadius: 10, padding: '12px 24px', fontSize: 15, fontWeight: 800, cursor: 'pointer', whiteSpace: 'nowrap', textTransform: 'uppercase' }}
                    >
                      Claim offer
                    </button>
                    <div style={{ fontSize: 11, color: '#94a3b8', textAlign: 'center', marginTop: 6 }}>New customers only</div>
                  </div>

                </div>

                <div style={{ background: '#f8f9fb', borderTop: '1px solid #f1f5f9', padding: '10px 24px', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 12, color: '#94a3b8' }}>Available in:</span>
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    {book.states.slice(0, 8).map(function(s) {
                      return <span key={s} style={{ background: '#e2e8f0', color: '#475569', fontSize: 11, fontWeight: 600, padding: '2px 7px', borderRadius: 4 }}>{s}</span>;
                    })}
                    {book.states.length > 8 && (
                      <span style={{ background: '#e2e8f0', color: '#475569', fontSize: 11, fontWeight: 600, padding: '2px 7px', borderRadius: 4 }}>+{book.states.length - 8} more</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 40, background: '#fff', borderRadius: 14, border: '1px solid #e2e8f0', padding: '20px 24px' }}>
          <p style={{ fontSize: 12, color: '#94a3b8', margin: 0, lineHeight: 1.7 }}>
            <strong style={{ color: '#64748b' }}>Affiliate disclosure:</strong> BetAndPlayUSA earns a commission when you sign up through our links. This does not affect the bonus you receive. All offers are subject to the sportsbook terms and conditions. Must be 21+ and physically located in an eligible state to participate. Gambling problem? Call 1-800-GAMBLER.
          </p>
        </div>

      </div>
    </div>
  );
}
