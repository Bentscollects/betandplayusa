// Sportsbook data with state availability and CPA amounts
export const sportsbooks = [
  {
    id: 'fanduel',
    name: 'FanDuel',
    logo: 'FD',
    logoPath: '/fanduel.png',
    logoColors: { bg: '#1059a4', text: '#ffffff' },
    offer: 'Bet $5, get up to $3,000 in bonus bets',
    promoCode: null,
    requiresPromo: false,
    cpa: 250,
    affiliateLink: 'https://wlfanduelus.adsrv.eacdn.com/C.ashx?btag=a_44859b_16c_&affid=21038&siteid=44859&adid=16&c=',
    states: [
      'AL', 'AZ', 'AR', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'IL', 'IN', 'IA',
      'KS', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV',
      'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
      'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WV', 'WI', 'WY'
    ]
  },
  {
    id: 'draftkings',
    name: 'DraftKings',
    logo: 'DK',
    logoPath: '/draftkings.png',
    logoColors: { bg: '#1a1a2e', text: '#00d4aa' },
    offer: 'Bet $5, get $200 in bonus bets instantly',
    promoCode: null,
    requiresPromo: false,
    cpa: 200,
    affiliateLink: 'https://dksb.sng.link/As9kz/uc22?_dl=https%3A%2F%2Fsportsbook.draftkings.com%2Fgateway%3Fs%3D103658189&pcid=422642&psn=3064&pcn=OSB_Bet5NUO&pscn=oddschecker_101GreatGoals&pcrn=WebReview&pscid=xx&pcrid=xx&wpcid=422642&wpsrc=3064&wpcn=OSB_Bet5NUO&wpscn=oddschecker_101GreatGoals&wpcrn=WebReview&wpscid=xx&wpcrid=xx&_forward_params=1',
    states: [
      'AL', 'AZ', 'AR', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'IL', 'IN', 'IA',
      'KS', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV',
      'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
      'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WV', 'WI', 'WY'
    ]
  },
  {
    id: 'caesars',
    name: 'Caesars',
    logo: 'CS',
    logoPath: '/caesars.png',
    logoColors: { bg: '#003087', text: '#FFD700' },
    offer: 'Bet $1, get 10x 100% Profit Boost Tokens',
    promoCode: 'PROMO_CAESARS',
    requiresPromo: true,
    cpa: 200,
    affiliateLink: 'https://wlwilliamhillus.adsrv.eacdn.com/C.ashx?btag=a_26199b_2588c_&affid=465&siteid=26199&adid=2588&c=',
    states: [
      'AL', 'AZ', 'AR', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'IL', 'IN', 'IA',
      'KS', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV',
      'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
      'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WV', 'WI', 'WY'
    ]
  },
  {
    id: 'fanatics',
    name: 'Fanatics',
    logo: 'FA',
    logoPath: '/fanatics.png',
    logoColors: { bg: '#cc0000', text: '#ffffff' },
    offer: 'Bet $5, get $200 in FanCash immediately',
    promoCode: 'PROMO_FANATICS',
    requiresPromo: true,
    cpa: 200,
    affiliateLink: 'https://track.fanaticsbettingpartners.com/track/e3da5749-405e-4283-a8de-cb773323f82c?type=seo&s1=Confido52',
    states: [
      'AL', 'AZ', 'AR', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'IL', 'IN', 'IA',
      'KS', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV',
      'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
      'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WV', 'WI', 'WY'
    ]
  },
  {
    id: 'betmgm',
    name: 'BetMGM',
    logo: 'BM',
    logoPath: '/betmgm.png',
    logoColors: { bg: '#c9a84c', text: '#1a1a1a' },
    offer: 'First bet offer up to $1,500 in bonus bets',
    promoCode: 'PROMO_BETMGM',
    requiresPromo: true,
    cpa: 150,
    affiliateLink: 'https://mediaserver.betmgmpartners.com/renderBanner.do?zoneId=1727083',
    states: [
      'AL', 'AZ', 'AR', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'IL', 'IN', 'IA',
      'KS', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV',
      'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
      'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WV', 'WI', 'WY'
    ]
  }
]

// Get sportsbooks available in a specific state
export function getSportsBooksByState(state) {
  return sportsbooks
    .filter(book => book.states.includes(state))
    .sort((a, b) => b.cpa - a.cpa) // Sort by CPA highest first
}

// Get all states where sportsbooks are available
export function getAllAvailableStates() {
  const statesSet = new Set()
  sportsbooks.forEach(book => {
    book.states.forEach(state => statesSet.add(state))
  })
  return Array.from(statesSet).sort()
}

// Get sportsbook by ID
export function getSportsbookById(id) {
  return sportsbooks.find(book => book.id === id)
}
