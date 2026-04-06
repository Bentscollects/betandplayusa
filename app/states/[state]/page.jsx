import { notFound } from 'next/navigation';

const NAVY = '#1B3A6B';
const RED = '#D91E27';
const WHITE = '#FFFFFF';
const LIGHT = '#F4F6FA';

const STATE_NAMES = {
  ny: 'New York', pa: 'Pennsylvania', nj: 'New Jersey', mi: 'Michigan',
  il: 'Illinois', oh: 'Ohio', co: 'Colorado', tn: 'Tennessee',
  va: 'Virginia', az: 'Arizona', ma: 'Massachusetts', md: 'Maryland',
  la: 'Louisiana', in: 'Indiana', ia: 'Iowa', ks: 'Kansas',
  wv: 'West Virginia', wy: 'Wyoming', ct: 'Connecticut',
};

const STATE_BOOKS = {
  ny: ['FanDuel', 'DraftKings', 'bet365', 'Caesars', 'BetMGM'],
  pa: ['FanDuel', 'DraftKings', 'bet365', 'Caesars', 'BetMGM', 'Fanatics'],
  nj: ['FanDuel', 'DraftKings', 'bet365', 'Caesars', 'BetMGM', 'Fanatics'],
  mi: ['FanDuel', 'DraftKings', 'bet365', 'Caesars', 'BetMGM', 'Fanatics'],
  il: ['FanDuel', 'DraftKings', 'bet365', 'Caesars', 'BetMGM', 'Fanatics'],
  oh: ['FanDuel', 'DraftKings', 'bet365', 'Caesars', 'BetMGM', 'Fanatics'],
  co: ['FanDuel', 'DraftKings', 'bet365', 'Caesars', 'BetMGM', 'Fanatics'],
  tn: ['FanDuel', 'DraftKings', 'bet365', 'Caesars', 'BetMGM', 'Fanatics'],
  va: ['FanDuel', 'DraftKings', 'bet365', 'Caesars', 'BetMGM', 'Fanatics'],
  az: ['FanDuel', 'DraftKings', 'bet365', 'Caesars', 'BetMGM', 'Fanatics'],
  ma: ['FanDuel', 'DraftKings', 'bet365', 'Caesars', 'BetMGM'],
  md: ['FanDuel', 'DraftKings', 'bet365', 'Caesars', 'BetMGM'],
  la: ['FanDuel', 'DraftKings', 'Caesars', 'BetMGM', 'Fanatics'],
  in: ['FanDuel', 'DraftKings', 'Caesars', 'BetMGM', 'Fanatics'],
  ia: ['FanDuel', 'DraftKings', 'Caesars', 'BetMGM'],
  ks: ['FanDuel', 'DraftKings', 'Caesars', 'Fanatics'],
  wv: ['FanDuel', 'DraftKings', 'bet365', 'Caesars', 'BetMGM'],
  wy: ['FanDuel', 'DraftKings', 'BetMGM'],
  ct: ['FanDuel', 'DraftKings', 'bet365'],
};

const BOOK_DETAILS = {
  FanDuel: { offer: 'Bet $5, Get up to $300 Back Each Day for 10 Days', affiliateLink: 'https://wlfanduelus.adsrv.eacdn.com/C.ashx?btag=a_44859b_16c_&affid=21038&siteid=44859&adid=16&c=', bg: '#1059a4', initials: 'FD', logo: '/fanduel.png' },
  DraftKings: { offer: 'Bet $5, Get $200 in Bonus Bets Instantly', affiliateLink: 'https://dksb.sng.link/As9kz/uc22', bg: '#1a1a2e', initials: 'DK', logo: '/draftkings.png' },
  bet365: { offer: 'Bet $5, Get $365 in Bonus Bets Win or Lose', affiliateLink: '/sportsbooks', bg: '#027b5b', initials: 'B3', logo: '/bet365.png' },
  Caesars: { offer: 'Bet $1, Double Your Winnings on Next 10 Wagers', affiliateLink: 'https://wlwilliamhillus.adsrv.eacdn.com/C.ashx?btag=a_26199b_2588c_&affid=465&siteid=26199&adid=2588&c=', bg: '#003087', initials: 'CS', logo: '/caesars.png' },
  BetMGM: { offer: 'Get up to $1,500 Back in Bonus Bets if First Bet Loses', affiliateLink: 'https://mediaserver.betmgmpartners.com/renderBanner.do?zoneId=1727083', bg: '#c9a84c', initials: 'BM', logo: '/betmgm.png' },
  Fanatics: { offer: 'Bet $5, Get $200 in FanCash Immediately', affiliateLink: 'https://track.fanaticsbettingpartners.com/track/e3da5749-405e-4283-a8de-cb773323f82c?type=seo&s1=Confido52', bg: '#cc0000', initials: 'FA', logo: '/fanatics.png' },
};

export function generateStaticParams() {
  return Object.keys(STATE_NAMES).map(function(state) {
    return { state: state };
  });
}

export async function generateMetadata(props) {
  try {
    const params = await props.params;
    const state = params && params.state ? String(params.state).toLowerCase() : '';
    const stateName = STATE_NAMES[state] || state.toUpperCase() || 'US';
    return {
      title: 'Best ' + stateName + ' Sportsbook Offers 2026 | BetAndPlayUSA',
      description: 'Compare the best legal sportsbook welcome offers available in ' + stateName + '. New customers only. Must be 21+.',
    };
  } catch (e) {
    return {
      title: 'Best Sportsbook Offers 2026 | BetAndPlayUSA',
      description: 'Compare the best legal sportsbook welcome offers. New customers only. Must be 21+.',
    };
  }
}

export default async function StatePage(props) {
  const params = await props.params;
  const state = params && params.state ? String(params.state).toLowerCase() : '';
  const stateName = STATE_NAMES[state];
  if (!stateName) notFound();
  const books = STATE_BOOKS[state] || [];

  return (
    <div style={{ minHeight: '100vh', background: LIGHT, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: NAVY, padding: '48px 24px 56px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 12px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: RED }} />
        <div style={{ position: 'relative', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'inline-block', background: 'rgba(217,30,39,0.2)', border: '1px solid rgba(217,30,39,0.4)', borderRadius: 20, padding: '5px 14px', marginBottom: 16 }}>
            <span style={{ color: WHITE, fontSize: 12, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase' }}>Legal Sports Betting</span>
          </div>
          <h1 style={{ fontSize: 'clamp(26px, 5vw, 42px)', fontWeight: 900, color: WHITE, margin: '0 0 14px', textTransform: 'uppercase', letterSpacing: -0.5 }}>{stateName} Sportsbooks</h1>
          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 15, margin: '0 0 24px', lineHeight: 1.6 }}>The best legal sportsbook offers available in {stateName} right now. New customers only. Must be 21+.</p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10, padding: '8px 16px' }}>
            <span style={{ color: WHITE, fontSize: 13, fontWeight: 700 }}>{books.length} sportsbooks available in {stateName}</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '32px 16px 60px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
          {books.map(function(bookName, idx) {
            const book = BOOK_DETAILS[bookName];
            if (!book) return null;
            return (
              <div key={bookName} style={{ background: WHITE, borderRadius: 16, border: idx === 0 ? '2px solid ' + RED : '1px solid #e5e7eb', overflow: 'hidden', boxShadow: idx === 0 ? '0 4px 20px rgba(217,30,39,0.1)' : '0 2px 8px rgba(0,0,0,0.04)' }}>
                {idx === 0 && <div style={{ background: RED, color: WHITE, fontSize: 10, fontWeight: 800, padding: '4px 12px', textTransform: 'uppercase', letterSpacing: 1, display: 'inline-block' }}>Top Pick in {stateName}</div>}
                <div style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                  <div style={{ width: 64, height: 64, borderRadius: 12, background: book.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden', padding: 6, boxSizing: 'border-box' }}>
                    <img src={book.logo} alt={bookName} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 180 }}>
                    <div style={{ fontWeight: 900, fontSize: 18, color: NAVY, marginBottom: 4 }}>{bookName}</div>
                    <div style={{ display: 'inline-block', background: '#dcfce7', color: '#166534', fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 4, textTransform: 'uppercase', letterSpacing: 0.3, marginBottom: 6 }}>✓ Licensed & Regulated</div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: '#111827', marginBottom: 8 }}>{book.offer}</div>
                    <div style={{ fontSize: 11, color: '#9ca3af' }}>T&Cs apply. New customers only. 21+. Must be in {stateName}.</div>
                  </div>
                  <div style={{ flexShrink: 0, textAlign: 'center' }}>
                    <a href={book.affiliateLink} target="_blank" rel="noopener noreferrer" style={{ display: 'block', background: RED, color: WHITE, textAlign: 'center', padding: '14px 28px', borderRadius: 10, fontWeight: 800, fontSize: 15, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: 0.5, boxShadow: '0 4px 12px rgba(217,30,39,0.3)', whiteSpace: 'nowrap' }}>
                      Claim Offer
                    </a>
                    <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 6 }}>New customers only</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ background: WHITE, borderRadius: 14, border: '1px solid #e5e7eb', padding: '24px 28px', marginBottom: 16 }}>
          <h2 style={{ fontSize: 18, fontWeight: 900, color: NAVY, margin: '0 0 16px', textTransform: 'uppercase' }}>Sports Betting in {stateName}</h2>
          <p style={{ fontSize: 14, color: '#4b5563', lineHeight: 1.8, margin: '0 0 12px' }}>Sports betting is legal in {stateName}. You must be 21 years of age or older and physically located within {stateName} state lines to place bets. Online and mobile sports betting is available via all the sportsbook apps listed above.</p>
          <p style={{ fontSize: 14, color: '#4b5563', lineHeight: 1.8, margin: 0 }}>All sportsbooks listed on this page are fully licensed and regulated in {stateName}. BetAndPlayUSA earns an affiliate commission when you sign up through our links. This does not affect the welcome bonus you receive.</p>
        </div>

        <div style={{ background: WHITE, borderRadius: 14, border: '1px solid #e5e7eb', padding: '20px 24px' }}>
          <p style={{ fontSize: 12, color: '#9ca3af', margin: 0, lineHeight: 1.7 }}>
            <strong style={{ color: '#6b7280' }}>Affiliate disclosure:</strong> BetAndPlayUSA earns a commission when you sign up through our links. Must be 21+ and physically located in {stateName}. Gambling problem? Call 1-800-GAMBLER.
          </p>
        </div>
      </div>
    </div>
  );
}
