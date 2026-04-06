'use client';
const NAVY = '#1B3A6B';
const RED = '#D91E27';
const WHITE = '#FFFFFF';
const LIGHT = '#F4F6FA';

const DFS_SITES = [
  {
    id: 'draftkings-dfs',
    name: 'DraftKings DFS',
    initials: 'DK',
    bg: '#1a1a2e',
    text: '#00d4aa',
    offer: 'Get up to $100 in DFS deposit bonus',
    details: 'The biggest DFS platform in the US. NFL, NBA, MLB, NHL, PGA, MMA and more.',
    rating: 4.9,
    bestFor: 'All sports, biggest contests',
    affiliateLink: 'AFFILIATE_LINK_DRAFTKINGS_DFS',
    states: 'Available in most US states',
    tag: 'Most Popular',
  },
  {
    id: 'fanduel-dfs',
    name: 'FanDuel DFS',
    initials: 'FD',
    bg: '#1059a4',
    text: '#ffffff',
    offer: 'Get $5 free when you join FanDuel DFS',
    details: 'FanDuel offers daily and weekly contests across all major US sports.',
    rating: 4.8,
    bestFor: 'NFL & NBA contests',
    affiliateLink: 'AFFILIATE_LINK_FANDUEL_DFS',
    states: 'Available in most US states',
    tag: null,
  },
  {
    id: 'underdog',
    name: 'Underdog Fantasy',
    initials: 'UD',
    bg: '#7c3aed',
    text: '#ffffff',
    offer: 'Get 100% deposit match up to $100',
    details: 'Pick Em style contests — simply pick players to go over or under their stat lines.',
    rating: 4.7,
    bestFor: 'Pick Em style, beginners',
    affiliateLink: 'AFFILIATE_LINK_UNDERDOG',
    states: 'Available in most US states',
    tag: 'Fastest Growing',
  },
  {
    id: 'prizepicks',
    name: 'PrizePicks',
    initials: 'PP',
    bg: '#059669',
    text: '#ffffff',
    offer: 'Get 100% deposit match up to $100',
    details: 'Simple Pick Em format. Pick 2-6 players to go over or under their projected stats.',
    rating: 4.6,
    bestFor: 'Simple Pick Em format',
    affiliateLink: 'AFFILIATE_LINK_PRIZEPICKS',
    states: 'Available in most US states',
    tag: null,
  },
];

export default function DFSPage() {
  function handleClaim(site) {
    if (site.affiliateLink.startsWith('AFFILIATE_LINK_')) {
      alert('Affiliate link coming soon for ' + site.name);
      return;
    }
    window.open(site.affiliateLink, '_blank');
  }

  return (
    <div style={{ minHeight: '100vh', background: LIGHT, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: NAVY, padding: '48px 24px 56px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 12px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: RED }} />
        <div style={{ position: 'relative', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'inline-block', background: 'rgba(217,30,39,0.2)', border: '1px solid rgba(217,30,39,0.4)', borderRadius: 20, padding: '5px 14px', marginBottom: 16 }}>
            <span style={{ color: WHITE, fontSize: 12, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase' }}>No License Required</span>
          </div>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 900, color: WHITE, margin: '0 0 14px', textTransform: 'uppercase', letterSpacing: -0.5 }}>Daily Fantasy Sports</h1>
          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 15, margin: '0 0 24px', lineHeight: 1.6 }}>Build your lineup, beat your opponents, win real cash. DFS is available in most US states with no sports betting license required.</p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            {['Available most states', 'Win real cash', 'NFL, NBA, MLB & more', 'Free to enter contests'].map(function(v) {
              return <div key={v} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 20, padding: '6px 14px', fontSize: 13, color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>{v}</div>;
            })}
          </div>
        </div>
      </div>

      <div style={{ background: '#111827', padding: '14px 24px', textAlign: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, margin: 0 }}>Daily Fantasy Sports is a game of skill and is legal in most US states. Always check your local laws before playing.</p>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '32px 16px 60px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40 }}>
          {DFS_SITES.map(function(site, idx) {
            return (
              <div key={site.id} style={{ background: WHITE, borderRadius: 16, border: idx === 0 ? '2px solid ' + RED : '1px solid #e5e7eb', overflow: 'hidden', boxShadow: idx === 0 ? '0 4px 20px rgba(217,30,39,0.1)' : '0 2px 8px rgba(0,0,0,0.04)' }}>
                {site.tag && (
                  <div style={{ background: RED, color: WHITE, fontSize: 10, fontWeight: 800, padding: '4px 12px', textTransform: 'uppercase', letterSpacing: 1, display: 'inline-block' }}>{site.tag}</div>
                )}
                <div style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                  <div style={{ width: 64, height: 64, borderRadius: 12, background: site.bg, color: site.text, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 18, flexShrink: 0 }}>{site.initials}</div>
                  <div style={{ flex: 1, minWidth: 180 }}>
                    <div style={{ fontWeight: 900, fontSize: 18, color: NAVY, marginBottom: 4 }}>{site.name}</div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: '#111827', marginBottom: 4 }}>{site.offer}</div>
                    <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 8 }}>{site.details}</div>
                    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <span style={{ color: '#f59e0b', fontSize: 13, fontWeight: 800 }}>{'★'.repeat(Math.floor(site.rating))}</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: '#374151' }}>{site.rating}</span>
                      </div>
                      <div style={{ fontSize: 12, color: '#6b7280' }}><span style={{ fontWeight: 700, color: NAVY }}>Best for:</span> {site.bestFor}</div>
                    </div>
                    <div style={{ fontSize: 12, color: '#6b7280', marginTop: 6 }}>{site.states}</div>
                    <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 4 }}>T&Cs apply. 18+. Skill game. Void where prohibited.</div>
                  </div>
                  <div style={{ flexShrink: 0, textAlign: 'center' }}>
                    <button onClick={function() { handleClaim(site); }} style={{ background: RED, color: WHITE, border: 'none', borderRadius: 10, padding: '14px 28px', fontSize: 15, fontWeight: 800, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: 0.5, boxShadow: '0 4px 12px rgba(217,30,39,0.3)', display: 'block', whiteSpace: 'nowrap' }}>
                      Play Now
                    </button>
                    <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 6 }}>Free to join</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ background: NAVY, borderRadius: 16, padding: '28px 32px', position: 'relative', overflow: 'hidden', marginBottom: 16 }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 12px)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative' }}>
            <h3 style={{ fontSize: 18, fontWeight: 900, color: WHITE, margin: '0 0 20px', textTransform: 'uppercase' }}>DFS vs Sports Betting — What&apos;s the Difference?</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
              {[
                { title: 'Daily Fantasy Sports', points: ['Game of skill', 'Legal in most US states', 'No betting license needed', 'Compete against other players', 'Win based on player stats'] },
                { title: 'Sports Betting', points: ['Bet on game outcomes', 'Legal in 30+ US states', 'Requires state license', 'Bet against the sportsbook', 'Win based on final scores'] },
              ].map(function(col) {
                return (
                  <div key={col.title}>
                    <h4 style={{ fontSize: 14, fontWeight: 800, color: RED, margin: '0 0 12px', textTransform: 'uppercase' }}>{col.title}</h4>
                    {col.points.map(function(point) {
                      return <div key={point} style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ color: RED, fontWeight: 900 }}>+</span>{point}</div>;
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div style={{ background: WHITE, borderRadius: 14, border: '1px solid #e5e7eb', padding: '20px 24px' }}>
          <p style={{ fontSize: 12, color: '#9ca3af', margin: 0, lineHeight: 1.7 }}>
            <strong style={{ color: '#6b7280' }}>Disclaimer:</strong> Daily Fantasy Sports is considered a game of skill under federal law and is legal in most US states. It is not available in Arizona, Hawaii, Idaho, Louisiana, Montana, Nevada, or Washington. Always check your local laws. BetAndPlayUSA earns a commission when you sign up through our links. Must be 18+ to participate.
          </p>
        </div>
      </div>
    </div>
  );
}
