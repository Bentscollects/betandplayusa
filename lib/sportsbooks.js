// Sportsbook data with state availability and CPA amounts
export const sportsbooks = [
  {
    id: 'fanduel',
    name: 'FanDuel',
    logo: 'FD',
    logoColors: { bg: '#1059a4', text: '#ffffff' },
    offer: 'Bet $5, get up to $3,000 in bonus bets',
    promoCode: null,
    requiresPromo: false,
    cpa: 250,
    affiliateLink: 'AFFILIATE_LINK_FANDUEL',
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
    logoColors: { bg: '#1a1a2e', text: '#00d4aa' },
    offer: 'Bet $5, get $200 in bonus bets instantly',
    promoCode: null,
    requiresPromo: false,
    cpa: 200,
    affiliateLink: 'AFFILIATE_LINK_DRAFTKINGS',
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
    logoColors: { bg: '#003087', text: '#FFD700' },
    offer: 'Bet $1, get 10x 100% Profit Boost Tokens',
    promoCode: 'PROMO_CAESARS',
    requiresPromo: true,
    cpa: 200,
    affiliateLink: 'AFFILIATE_LINK_CAESARS',
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
    logoColors: { bg: '#cc0000', text: '#ffffff' },
    offer: 'Bet $5, get $200 in FanCash immediately',
    promoCode: 'PROMO_FANATICS',
    requiresPromo: true,
    cpa: 200,
    affiliateLink: 'AFFILIATE_LINK_FANATICS',
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
    logoColors: { bg: '#c9a84c', text: '#1a1a1a' },
    offer: 'First bet offer up to $1,500 in bonus bets',
    promoCode: 'PROMO_BETMGM',
    requiresPromo: true,
    cpa: 150,
    affiliateLink: 'AFFILIATE_LINK_BETMGM',
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
