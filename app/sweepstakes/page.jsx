'use client';
const NAVY = '#1B3A6B';
const RED = '#D91E27';
const WHITE = '#FFFFFF';
const LIGHT = '#F4F6FA';

const SWEEPSTAKES = [
  {
    id: 'stakeus',
    name: 'Stake.us',
    initials: 'ST',
    bg: '#1a1a2e',
    text: '#00d4aa',
    offer: 'Get 25 Free Sweeps Coins + 250,000 Gold Coins on signup',
    details: 'No purchase necessary. Available in all 50 states.',
    affiliateLink: 'AFFILIATE_LINK_STAKEUS',
    tag: 'Most Popular',
  },
  {
    id: 'pulsz',
    name: 'Pulsz',
    initials: 'PZ',
    bg: '#7c3aed',
    text: '#ffffff',
    offer: 'Get 5,000 Gold Coins + 2.3 Free Sweeps Coins on signup',
    details: 'No purchase necessary. Available in all 50 states.',
    affiliateLink: 'AFFILIATE_LINK_PULSZ',
    tag: null,
  },
  {
    id: 'mcluck',
    name: 'McLuck',
    initials: 'ML',
    bg: '#15803d',
    text: '#ffffff',
    offer: 'Get 7,500 Gold Coins + 2.5 Free Sweeps Coins on signup',
    details: 'No purchase necessary. Available in all 50 states.',
    affiliateLink: 'AFFILIATE_LINK_MCLUCK',
    tag: null,
  },
  {
    id: 'wowvegas',
    name: 'WOW Vegas',
    initials: 'WV',
    bg: '#b45309',
    text: '#ffffff',
    offer: 'Get 1.5 Free Sweeps Coins + 100 WOW Coins on signup',
    details: 'No purchase necessary. Available in all 50 states.',
    affiliateLink: 'AFFILIATE_LINK_WOWVEGAS',
    tag: null,
  },
  {
    id: 'chanced',
    name: 'Chanced',
    initials: 'CH',
    bg: '#0e7490',
    text: '#ffffff',
    offer: 'Get 5 Free Sweeps Coins on signup — no deposit needed',
    details: 'No purchase necessary. Available in all 50 states.',
    affiliateLink: 'AFFILIATE_LINK_CHANCED',
    tag: null,
  },
];

export default function SweepstakesPage() {
  function handleClaim(casino) {
    if (casino.affiliateLink.startsWith('AFFILIATE_LINK_')) {
      alert('Affiliate link coming soon for ' + casino.name);
      return;
    }
    window.open(casino.affiliateLink, '_blank');
  }

  return (
    <div style={{ minHeight: '100vh', background: LIGHT, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: NAVY, padding: '48px 24px 56px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 12px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: RED }} />
        <div style={{ position: 'relative', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'inline-block', background: 'rgba(217,30,39,0.2)', border: '1px solid rgba(217,30,39,0.4)', borderRadius: 20, padding: '5px 14px', marginBottom: 16 }}>
            <span style={{ color: WHITE, fontSize: 12, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase' }}>Legal in All 50 States</span>
          </div>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 900, color: WHITE, margin: '0 0 14px', textTransform: 'uppercase', letterSpacing: -0.5 }}>Sweepstakes Casinos</h1>
          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 15, margin: '0 0 24px', lineHeight: 1.6 }}>Play for free and win real prizes. Sweepstakes casinos are legal in all 50 states — no sports betting license required.</p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            {['Free to play', 'Win real prizes', 'All 50 states', 'No deposit needed'].map(function(v) {
              return <div key={v} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 20, padding: '6px 14px', fontSize: 13, color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>{v}</div>;
            })}
          </div>
        </div>
      </div>

      <div style={{ background: '#111827', padding: '14px 24px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, margin: 0, lineHeight: 1.6 }}>
            Sweepstakes casinos use a dual-currency model (Gold Coins + Sweeps Coins). Gold Coins are for fun only. Sweeps Coins can be redeemed for real prizes. No purchase is ever necessary.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '32px 16px 60px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {SWEEPSTAKES.map(function(casino, idx) {
            return (
              <div key={casino.id} style={{ background: WHITE, borderRadius: 16, border: idx === 0 ? '2px solid ' + RED : '1px solid #e5e7eb', overflow: 'hidden', boxShadow: idx === 0 ? '0 4px 20px rgba(217,30,39,0.1)' : '0 2px 8px rgba(0,0,0,0.04)', position: 'relative' }}>
                {casino.tag && (
                  <div style={{ background: RED, color: WHITE, fontSize: 10, fontWeight: 800, padding: '4px 12px', textTransform: 'uppercase', letterSpacing: 1, display: 'inline-block' }}>{casino.tag}</div>
                )}
                <div style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                  <div style={{ width: 64, height: 64, borderRadius: 12, background: casino.bg, color: casino.text, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 18, flexShrink: 0 }}>{casino.initials}</div>
                  <div style={{ flex: 1, minWidth: 180 }}>
                    <div style={{ fontWeight: 900, fontSize: 18, color: NAVY, marginBottom: 4 }}>{casino.name}</div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: '#111827', marginBottom: 4 }}>{casino.offer}</div>
                    <div style={{ fontSize: 13, color: '#6b7280' }}>{casino.details}</div>
                    <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 4 }}>T&Cs apply. No purchase necessary. Must be 18+. Void where prohibited.</div>
                  </div>
                  <div style={{ flexShrink: 0, textAlign: 'center' }}>
                    <button onClick={function() { handleClaim(casino); }} style={{ background: RED, color: WHITE, border: 'none', borderRadius: 10, padding: '14px 28px', fontSize: 15, fontWeight: 800, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: 0.5, boxShadow: '0 4px 12px rgba(217,30,39,0.3)', display: 'block', whiteSpace: 'nowrap' }}>
                      Play Free
                    </button>
                    <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 6 }}>No deposit needed</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 40, background: NAVY, borderRadius: 16, padding: '28px 32px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 12px)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative' }}>
            <h3 style={{ fontSize: 18, fontWeight: 900, color: WHITE, margin: '0 0 12px', textTransform: 'uppercase' }}>How Sweepstakes Casinos Work</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
              {[
                { step: '01', title: 'Sign Up Free', desc: 'Create your account at no cost. No credit card required.' },
                { step: '02', title: 'Get Free Coins', desc: 'Receive free Gold Coins and Sweeps Coins just for signing up.' },
                { step: '03', title: 'Play Games', desc: 'Use your coins to play slots, table games and more.' },
                { step: '04', title: 'Redeem Prizes', desc: 'Redeem Sweeps Coins for real cash prizes or gift cards.' },
              ].map(function(item) {
                return (
                  <div key={item.step}>
                    <div style={{ fontSize: 36, fontWeight: 900, color: 'rgba(255,255,255,0.1)', lineHeight: 1, marginBottom: 6 }}>{item.step}</div>
                    <div style={{ width: 3, height: 24, background: RED, marginBottom: 8 }} />
                    <h4 style={{ fontSize: 14, fontWeight: 800, color: WHITE, margin: '0 0 6px', textTransform: 'uppercase' }}>{item.title}</h4>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', margin: 0, lineHeight: 1.6 }}>{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 16, background: WHITE, borderRadius: 14, border: '1px solid #e5e7eb', padding: '20px 24px' }}>
          <p style={{ fontSize: 12, color: '#9ca3af', margin: 0, lineHeight: 1.7 }}>
            <strong style={{ color: '#6b7280' }}>Disclaimer:</strong> Sweepstakes casinos operate under US sweepstakes law and are legal in most US states. No purchase is necessary to play or win. Gold Coins have no cash value. Sweeps Coins can be redeemed for prizes subject to eligibility. Must be 18+ to participate. Not available in Washington state or Quebec. BetAndPlayUSA earns a commission when you sign up through our links.
          </p>
        </div>
      </div>
    </div>
  );
}
