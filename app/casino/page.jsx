'use client';
const NAVY = '#1B3A6B';
const RED = '#D91E27';
const WHITE = '#FFFFFF';
const LIGHT = '#F4F6FA';

const LEGAL_STATES = ['NJ', 'PA', 'MI', 'WV', 'CT', 'DE'];

const CASINOS = [
  {
    id: 'betmgm-casino',
    name: 'BetMGM Casino',
    initials: 'BM',
    bg: '#c9a84c',
    text: '#1a1a1a',
    offer: 'Up to $1,000 deposit match + $25 on the house',
    details: 'One of the largest online casino libraries in the US. 500+ slots, live dealer, and table games.',
    rating: 4.8,
    bestFor: 'Slots & live dealer',
    affiliateLink: 'AFFILIATE_LINK_BETMGM_CASINO',
    states: ['NJ', 'PA', 'MI', 'WV'],
    tag: 'Top Pick',
  },
  {
    id: 'draftkings-casino',
    name: 'DraftKings Casino',
    initials: 'DK',
    bg: '#1a1a2e',
    text: '#00d4aa',
    offer: 'Get up to $2,000 deposit bonus',
    details: 'Seamlessly integrated with the DraftKings sportsbook app. Huge game selection.',
    rating: 4.7,
    bestFor: 'Sports & casino combo',
    affiliateLink: 'AFFILIATE_LINK_DRAFTKINGS_CASINO',
    states: ['NJ', 'PA', 'MI', 'WV', 'CT'],
    tag: null,
  },
  {
    id: 'fanduel-casino',
    name: 'FanDuel Casino',
    initials: 'FD',
    bg: '#1059a4',
    text: '#ffffff',
    offer: 'Up to $1,000 back if you lose on day one',
    details: 'Play with confidence — FanDuel refunds your first day losses up to $1,000.',
    rating: 4.7,
    bestFor: 'New players',
    affiliateLink: 'AFFILIATE_LINK_FANDUEL_CASINO',
    states: ['NJ', 'PA', 'MI', 'WV', 'CT'],
    tag: null,
  },
  {
    id: 'caesars-casino',
    name: 'Caesars Palace Online',
    initials: 'CS',
    bg: '#003087',
    text: '#FFD700',
    offer: '100% deposit match up to $2,500',
    details: 'The iconic Caesars Palace brand online. Premium live dealer and exclusive slots.',
    rating: 4.6,
    bestFor: 'Premium experience',
    affiliateLink: 'AFFILIATE_LINK_CAESARS_CASINO',
    states: ['NJ', 'PA', 'MI', 'WV'],
    tag: null,
  },
  {
    id: 'golden-nugget',
    name: 'Golden Nugget Casino',
    initials: 'GN',
    bg: '#b45309',
    text: '#ffffff',
    offer: 'Get $25 free + up to $1,000 deposit match',
    details: 'One of the most trusted casino brands in the US. Huge slot selection.',
    rating: 4.5,
    bestFor: 'Slots enthusiasts',
    affiliateLink: 'AFFILIATE_LINK_GOLDENNUGGET',
    states: ['NJ', 'MI', 'WV'],
    tag: null,
  },
];

export default function CasinoPage() {
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
            <span style={{ color: WHITE, fontSize: 12, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase' }}>Licensed & Regulated</span>
          </div>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 900, color: WHITE, margin: '0 0 14px', textTransform: 'uppercase', letterSpacing: -0.5 }}>Online Casinos</h1>
          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 15, margin: '0 0 24px', lineHeight: 1.6 }}>Top licensed online casinos available in legal US states. All sites are fully regulated and licensed.</p>
          <div style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 12, padding: '12px 20px', display: 'inline-block' }}>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 600 }}>Available in: </span>
            {LEGAL_STATES.map(function(s) {
              return <span key={s} style={{ background: RED, color: WHITE, fontSize: 11, fontWeight: 800, padding: '2px 8px', borderRadius: 4, marginLeft: 6 }}>{s}</span>;
            })}
          </div>
        </div>
      </div>

      <div style={{ background: '#111827', padding: '14px 24px', textAlign: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, margin: 0 }}>Online casino gambling is currently legal in NJ, PA, MI, WV, CT and DE. More states coming soon.</p>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '32px 16px 60px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {CASINOS.map(function(casino, idx) {
            return (
              <div key={casino.id} style={{ background: WHITE, borderRadius: 16, border: idx === 0 ? '2px solid ' + RED : '1px solid #e5e7eb', overflow: 'hidden', boxShadow: idx === 0 ? '0 4px 20px rgba(217,30,39,0.1)' : '0 2px 8px rgba(0,0,0,0.04)' }}>
                {casino.tag && (
                  <div style={{ background: RED, color: WHITE, fontSize: 10, fontWeight: 800, padding: '4px 12px', textTransform: 'uppercase', letterSpacing: 1, display: 'inline-block' }}>{casino.tag}</div>
                )}
                <div style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                  <div style={{ width: 64, height: 64, borderRadius: 12, background: casino.bg, color: casino.text, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 18, flexShrink: 0 }}>{casino.initials}</div>
                  <div style={{ flex: 1, minWidth: 180 }}>
                    <div style={{ fontWeight: 900, fontSize: 18, color: NAVY, marginBottom: 4 }}>{casino.name}</div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: '#111827', marginBottom: 4 }}>{casino.offer}</div>
                    <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 8 }}>{casino.details}</div>
                    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <span style={{ color: '#f59e0b', fontSize: 13, fontWeight: 800 }}>{'★'.repeat(Math.floor(casino.rating))}</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: '#374151' }}>{casino.rating}</span>
                      </div>
                      <div style={{ fontSize: 12, color: '#6b7280' }}><span style={{ fontWeight: 700, color: NAVY }}>Best for:</span> {casino.bestFor}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 8 }}>
                      {casino.states.map(function(s) {
                        return <span key={s} style={{ background: '#f0f4ff', color: NAVY, fontSize: 11, fontWeight: 700, padding: '2px 7px', borderRadius: 4 }}>{s}</span>;
                      })}
                    </div>
                    <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 6 }}>T&Cs apply. New customers only. 21+. State restrictions apply.</div>
                  </div>
                  <div style={{ flexShrink: 0, textAlign: 'center' }}>
                    <button onClick={function() { handleClaim(casino); }} style={{ background: RED, color: WHITE, border: 'none', borderRadius: 10, padding: '14px 28px', fontSize: 15, fontWeight: 800, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: 0.5, boxShadow: '0 4px 12px rgba(217,30,39,0.3)', display: 'block', whiteSpace: 'nowrap' }}>
                      Claim Offer
                    </button>
                    <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 6 }}>New customers only</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 16, background: WHITE, borderRadius: 14, border: '1px solid #e5e7eb', padding: '20px 24px' }}>
          <p style={{ fontSize: 12, color: '#9ca3af', margin: 0, lineHeight: 1.7 }}>
            <strong style={{ color: '#6b7280' }}>Affiliate disclosure:</strong> BetAndPlayUSA earns a commission when you sign up through our links. This does not affect the bonus you receive. All casinos are licensed and regulated. Must be 21+ and physically located in an eligible state. Gambling problem? Call 1-800-GAMBLER.
          </p>
        </div>
      </div>
    </div>
  );
}
