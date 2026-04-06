import { notFound } from 'next/navigation';
import Link from 'next/link';

const NAVY = '#1B3A6B';
const RED = '#D91E27';
const WHITE = '#FFFFFF';
const LIGHT = '#F4F6FA';

const REVIEWS = {
  fanduel: {
    name: 'FanDuel',
    logo: '/fanduel.png',
    bg: '#1059a4',
    initials: 'FD',
    text: '#fff',
    affiliateLink: 'https://wlfanduelus.adsrv.eacdn.com/C.ashx?btag=a_44859b_16c_&affid=21038&siteid=44859&adid=16&c=',
    offer: 'Bet $5, Get up to $300 Back Each Day for 10 Days',
    offerDetail: 'No promo code needed. Sign up, deposit at least $5, opt into the offer under Promos, and place your first bet. If it loses you receive a Bet Reset token worth up to $300.',
    rating: 4.9,
    ratingBreakdown: { offers: 5.0, appExperience: 4.9, payoutSpeed: 4.8, marketDepth: 4.9, customerService: 4.7 },
    established: 2012,
    headquarters: 'New York, NY',
    license: 'Licensed and regulated in 20+ US states by each state gaming commission',
    payoutSpeed: 'Same day via PayPal, Venmo, online banking (Trustly), debit card',
    minDeposit: '$10',
    depositMethods: ['Debit card (Visa/Mastercard)', 'PayPal', 'Venmo', 'Online banking via Trustly', 'Apple Pay', 'PayNearMe'],
    withdrawalMethods: ['PayPal', 'Venmo', 'Online banking', 'Debit card', 'Check by mail'],
    appRating: '4.8/5 (2M+ App Store reviews)',
    bestFor: 'NFL, NBA, Same Game Parlays',
    minAge: 21,
    promoCode: 'No code needed — bonus auto-applied via our link',
    signupSteps: [
      'Click our Claim Offer button above — this activates the welcome bonus automatically',
      'Enter your full legal name, date of birth, email address and home address',
      'Verify your identity — FanDuel may ask for the last 4 digits of your SSN',
      'Make your first deposit of at least $5 using any of the accepted payment methods',
      'Go to the Promos tab and opt into the welcome offer',
      'Place your first bet of at least $5 on any sport',
      'If your bet loses, your Bet Reset token will be credited within 72 hours',
    ],
    pros: ['Largest same-game parlay catalog in the US', 'Fastest payouts — same day via PayPal and Venmo', 'Best mobile app in the industry with 2M+ 5-star reviews', 'Strong ongoing promotions for existing users', 'Live streaming on select events', 'Excellent customer service via live chat'],
    cons: ['Odds can be slightly worse than competitors on some markets', 'Welcome offer requires opting in under Promos tab — easy to miss', 'Customer service wait times can be long during major events like Super Bowl'],
    verdict: 'FanDuel is the gold standard for US sports betting. The app is best in class, the same-game parlay builder is unmatched, and payouts are genuinely fast. The welcome offer is solid and the ongoing promotions keep existing users engaged. If you are only signing up with one sportsbook, make it FanDuel.',
    states: ['AZ', 'CO', 'CT', 'IL', 'IN', 'IA', 'KS', 'LA', 'MD', 'MA', 'MI', 'NJ', 'NY', 'OH', 'PA', 'TN', 'VA', 'WV', 'WY'],
    faq: [
      { q: 'Do I need a promo code for FanDuel?', a: 'No. When you sign up through our link the welcome offer is automatically applied. You do not need to enter any promo code.' },
      { q: 'How long does FanDuel take to pay out?', a: 'FanDuel is one of the fastest paying sportsbooks in the US. PayPal and Venmo withdrawals are typically processed the same day. Online banking takes 1-3 business days.' },
      { q: 'Is FanDuel legal in my state?', a: 'FanDuel is available in 20+ US states. Check the Available States section above to see if your state is included. You must be physically located in an eligible state to place bets.' },
      { q: 'What is the minimum age for FanDuel?', a: 'You must be 21 years of age or older to open a FanDuel account and place bets.' },
      { q: 'Can I use FanDuel on my phone?', a: 'Yes. FanDuel has one of the highest rated sports betting apps in the US with 4.8/5 on the App Store with over 2 million reviews. It is available on both iOS and Android.' },
    ],
    category: 'sportsbook',
  },
  draftkings: {
    name: 'DraftKings',
    logo: '/draftkings.png',
    bg: '#1a1a2e',
    initials: 'DK',
    text: '#00d4aa',
    affiliateLink: 'https://dksb.sng.link/As9kz/uc22?_dl=https%3A%2F%2Fsportsbook.draftkings.com%2Fgateway%3Fs%3D103658189&pcid=422642&psn=3064&pcn=OSB_Bet5NUO&pscn=oddschecker_101GreatGoals&pcrn=WebReview&pscid=xx&pcrid=xx&wpcid=422642&wpsrc=3064&wpcn=OSB_Bet5NUO&wpscn=oddschecker_101GreatGoals&wpcrn=WebReview&wpscid=xx&wpcrid=xx&_forward_params=1',
    offer: 'Bet $5, Get $200 in Bonus Bets Instantly',
    offerDetail: 'No promo code needed. Sign up through our link, deposit at least $5 and place a $5 bet. You will receive $200 in bonus bets instantly regardless of whether your bet wins or loses.',
    rating: 4.8,
    ratingBreakdown: { offers: 4.9, appExperience: 4.8, payoutSpeed: 4.8, marketDepth: 4.9, customerService: 4.6 },
    established: 2012,
    headquarters: 'Boston, MA',
    license: 'Licensed and regulated in 20+ US states',
    payoutSpeed: 'Same day via PayPal, online banking',
    minDeposit: '$5',
    depositMethods: ['Debit card (Visa/Mastercard)', 'PayPal', 'Online banking via Trustly', 'Apple Pay', 'Cash at casino cage', 'PayNearMe'],
    withdrawalMethods: ['PayPal', 'Online banking', 'Debit card', 'Cash at casino cage', 'Check by mail'],
    appRating: '4.8/5 (984k App Store reviews)',
    bestFor: 'All sports, daily odds boosts, DFS integration',
    minAge: 21,
    promoCode: 'No code needed — bonus auto-applied via our link',
    signupSteps: [
      'Click our Claim Offer button above to activate the bonus automatically',
      'Enter your full legal name, date of birth, email address and home address',
      'Verify your identity — DraftKings may ask for the last 4 digits of your SSN',
      'Make your first deposit of at least $5 — the lowest minimum deposit of any major US sportsbook',
      'Place a bet of at least $5 on any sport or market',
      'Your $200 in bonus bets will be credited to your account instantly',
      'Bonus bets expire after 7 days so use them quickly',
    ],
    pros: ['Huge range of betting markets including niche sports and esports', 'Daily odds boosts and promos for existing users', 'Seamless DFS and sportsbook in one app', 'Lowest minimum deposit of just $5', 'Excellent live in-play betting interface', '$200 in bonus bets credited instantly'],
    cons: ['Interface can feel busy with too many options on the home screen', 'Bonus bets expire after just 7 days', 'Withdrawal times slightly slower than FanDuel on some methods'],
    verdict: 'DraftKings is the closest rival to FanDuel and wins on market depth, daily promotions and the lowest minimum deposit in the industry. The DFS integration is a huge plus for fantasy sports fans and the $200 instant bonus makes it one of the best value welcome offers available.',
    states: ['AZ', 'CO', 'CT', 'IL', 'IN', 'IA', 'KS', 'LA', 'MD', 'MA', 'MI', 'NJ', 'NY', 'OH', 'PA', 'TN', 'VA', 'WV', 'WY'],
    faq: [
      { q: 'Do I need a promo code for DraftKings?', a: 'No. When you sign up through our link the $200 bonus is automatically applied. No promo code is required.' },
      { q: 'When do I get my $200 in bonus bets?', a: 'The $200 in bonus bets is credited instantly after you place your first $5 bet. You do not need to wait for the result.' },
      { q: 'What is the minimum deposit at DraftKings?', a: 'Just $5 — the lowest minimum deposit of any major US sportsbook. You can start betting immediately with a very small deposit.' },
      { q: 'Can I use DraftKings DFS and Sportsbook in the same app?', a: 'Yes. DraftKings is one of the few platforms that fully integrates daily fantasy sports and sports betting in a single app.' },
      { q: 'How long do DraftKings bonus bets last?', a: 'Bonus bets expire after 7 days so make sure to use them within a week of receiving them.' },
    ],
    category: 'sportsbook',
  },
  caesars: {
    name: 'Caesars Sportsbook',
    logo: '/caesars.png',
    bg: '#003087',
    initials: 'CS',
    text: '#FFD700',
    affiliateLink: 'https://wlwilliamhillus.adsrv.eacdn.com/C.ashx?btag=a_26199b_2588c_&affid=465&siteid=26199&adid=2588&c=',
    offer: 'Bet $1, Double Your Winnings on Next 10 Wagers',
    offerDetail: 'Place a first bet of just $1 or more and unlock profit boost tokens that double your winnings on your next 10 wagers. This is one of the most unique welcome offers in US sports betting.',
    rating: 4.6,
    ratingBreakdown: { offers: 4.8, appExperience: 4.5, payoutSpeed: 4.5, marketDepth: 4.6, customerService: 4.6 },
    established: 2021,
    headquarters: 'Las Vegas, NV',
    license: 'Licensed and regulated in 15+ US states',
    payoutSpeed: '1-2 business days via most methods',
    minDeposit: '$10',
    depositMethods: ['Debit card (Visa/Mastercard)', 'PayPal', 'Online banking', 'Apple Pay', 'Caesars Rewards card', 'PayNearMe', 'Check'],
    withdrawalMethods: ['PayPal', 'Online banking', 'Debit card', 'Check by mail', 'Caesars Rewards card'],
    appRating: '4.8/5 (254k App Store reviews)',
    bestFor: 'Profit boosts, Caesars Rewards loyalty, existing casino customers',
    minAge: 21,
    promoCode: 'Promo code auto-applied via our link',
    signupSteps: [
      'Click our Claim Offer button above — the promo code is automatically applied',
      'Enter your full legal name, date of birth, email address and home address',
      'Verify your identity with the last 4 digits of your SSN',
      'Make your first deposit of at least $10',
      'Place your first bet of just $1 or more on any market',
      'You will receive profit boost tokens that double your winnings on your next 10 wagers',
      'Use your profit boosts on any bets up to the maximum stake limit',
    ],
    pros: ['Unique profit boost offer — double your winnings on 10 bets', 'Caesars Rewards integration — earn hotel stays and casino perks', 'Strong odds on major US sports markets', 'Excellent customer service', 'Lowest qualifying bet of any major sportsbook — just $1'],
    cons: ['Available in fewer states than FanDuel and DraftKings', 'App not quite as polished as top competitors', 'Payouts slightly slower at 1-2 business days', 'Interface can feel outdated compared to rivals'],
    verdict: 'Caesars stands out for its unique profit boost welcome offer and Rewards loyalty programme. If you already use Caesars for hotels or casino gaming the sportsbook is a natural extension — your betting activity earns you real-world perks. The $1 minimum qualifying bet is also the lowest of any major sportsbook.',
    states: ['AZ', 'CO', 'IL', 'IN', 'IA', 'LA', 'MD', 'MI', 'NJ', 'NY', 'OH', 'PA', 'TN', 'VA', 'WV'],
    faq: [
      { q: 'Do I need a promo code for Caesars?', a: 'The promo code is automatically applied when you sign up through our link. You do not need to enter anything manually.' },
      { q: 'What is a profit boost token?', a: 'A profit boost token multiplies your winnings on a bet. With a 100% profit boost, if your bet would normally win $50, you instead win $100. Caesars gives you 10 of these tokens as a welcome offer.' },
      { q: 'Can I earn Caesars Rewards from sports betting?', a: 'Yes. Every dollar you bet on Caesars Sportsbook earns Reward Credits that can be redeemed for free hotel nights, dining credits and casino chips at Caesars properties.' },
      { q: 'What is the minimum bet to unlock the Caesars welcome offer?', a: 'Just $1 — the lowest qualifying bet of any major US sportsbook. You can unlock the full welcome offer with a very small first bet.' },
      { q: 'How long do Caesars profit boost tokens last?', a: 'Profit boost tokens typically expire within 30 days. Always check the terms and conditions of the specific offer.' },
    ],
    category: 'sportsbook',
  },
  betmgm: {
    name: 'BetMGM',
    logo: '/betmgm.png',
    bg: '#c9a84c',
    initials: 'BM',
    text: '#1a1a1a',
    affiliateLink: 'https://mediaserver.betmgmpartners.com/renderBanner.do?zoneId=1727083',
    offer: 'Get up to $1,500 Back in Bonus Bets if First Bet Loses',
    offerDetail: 'Place your first bet of up to $1,500. If it loses, BetMGM will refund the full amount in bonus bets. This is one of the largest first bet safety nets available in US sports betting.',
    rating: 4.7,
    ratingBreakdown: { offers: 4.8, appExperience: 4.6, payoutSpeed: 4.7, marketDepth: 4.8, customerService: 4.6 },
    established: 2018,
    headquarters: 'Jersey City, NJ',
    license: 'Licensed and regulated in 20+ US states',
    payoutSpeed: 'Same day via PayPal, Apple Pay, Venmo, Visa debit',
    minDeposit: '$10',
    depositMethods: ['Debit card (Visa/Mastercard)', 'PayPal', 'Apple Pay', 'Venmo', 'Online banking', 'PayNearMe', 'Wire transfer'],
    withdrawalMethods: ['PayPal', 'Venmo', 'Apple Pay', 'Visa debit', 'Online banking', 'Check by mail', 'Wire transfer'],
    appRating: '4.8/5 (254k App Store reviews)',
    bestFor: 'Player props, large first bets, casino and sports combo',
    minAge: 21,
    promoCode: 'Use code BETANDPLAY at signup for the full offer',
    signupSteps: [
      'Click our Claim Offer button above to go to BetMGM with our promo code pre-loaded',
      'Enter your full legal name, date of birth, email address and home address',
      'Verify your identity — BetMGM will ask for the last 4 digits of your SSN',
      'Make your first deposit of at least $10',
      'Place your first bet on any sport or market — up to $1,500',
      'If your first bet loses, BetMGM refunds the full amount in bonus bets within 24 hours',
      'Bonus bets are paid as 5 separate tokens each worth 20% of your original bet',
      'Bonus bets expire after 7 days',
    ],
    pros: ['Largest player prop market in the US — bet on virtually any stat', 'Up to $1,500 first bet safety net — biggest protection offer available', 'MGM Rewards integration for hotel and casino perks', 'Excellent same-game parlay builder', 'Casino app fully integrated alongside sportsbook', 'Fast payouts via PayPal, Apple Pay and Venmo'],
    cons: ['App can feel slightly cluttered compared to FanDuel', 'Bonus bets split into 5 tokens — less flexible than a single token', 'Odds sometimes slightly worse on major markets', 'Bonus bets expire after just 7 days'],
    verdict: 'BetMGM earns its King of Sportsbooks reputation with the deepest player prop markets in the US and one of the most generous first bet safety nets available. The $1,500 protection is ideal for confident bettors who want to make a larger first bet. The MGM Rewards integration adds genuine real-world value.',
    states: ['AZ', 'CO', 'IL', 'IN', 'IA', 'LA', 'MD', 'MA', 'MI', 'NJ', 'NY', 'OH', 'PA', 'TN', 'VA', 'WV', 'WY'],
    faq: [
      { q: 'Do I need a promo code for BetMGM?', a: 'Yes. Enter code BETANDPLAY at signup to unlock the full first bet safety net of up to $1,500.' },
      { q: 'How does the BetMGM first bet safety net work?', a: 'Place your first bet on anything. If it wins you keep all the winnings in cash. If it loses, BetMGM refunds the full amount as bonus bets up to $1,500. The bonus bets are issued as 5 tokens each worth 20% of your original stake.' },
      { q: 'Can I bet on player props at BetMGM?', a: 'Yes. BetMGM has the widest player prop market in the US. You can bet on individual player statistics across NFL, NBA, MLB, NHL and more — including very specific stat lines that other books do not offer.' },
      { q: 'Does BetMGM have an online casino?', a: 'Yes. In states where online casino gaming is legal, BetMGM has a fully integrated casino app alongside the sportsbook. Available in NJ, PA, MI, WV and other states.' },
      { q: 'What is the maximum first bet safety net at BetMGM?', a: 'The maximum first bet safety net is $1,500. This means if you place a first bet of $1,500 and it loses, you receive $1,500 back in bonus bets.' },
    ],
    category: 'sportsbook',
  },
  fanatics: {
    name: 'Fanatics Sportsbook',
    logo: '/fanatics.png',
    bg: '#cc0000',
    initials: 'FA',
    text: '#fff',
    affiliateLink: 'https://track.fanaticsbettingpartners.com/track/e3da5749-405e-4283-a8de-cb773323f82c?type=seo&s1=Confido52',
    offer: 'Bet $5, Get $200 in FanCash Immediately',
    offerDetail: 'Place your first bet of just $5 and receive $200 in FanCash immediately. FanCash can be used for bonus bets on the sportsbook or spent on merchandise at Fanatics.com.',
    rating: 4.5,
    ratingBreakdown: { offers: 4.7, appExperience: 4.4, payoutSpeed: 4.4, marketDepth: 4.4, customerService: 4.5 },
    established: 2023,
    headquarters: 'Jacksonville, FL',
    license: 'Licensed and regulated in 14+ US states',
    payoutSpeed: '1-2 business days via most methods',
    minDeposit: '$10',
    depositMethods: ['Debit card (Visa/Mastercard)', 'PayPal', 'Online banking', 'Apple Pay', 'PayNearMe'],
    withdrawalMethods: ['PayPal', 'Online banking', 'Debit card', 'Check by mail'],
    appRating: '4.7/5 (2.09M App Store reviews)',
    bestFor: 'Sports merchandise fans, FanCash rewards, new bettors',
    minAge: 21,
    promoCode: 'Promo code auto-applied via our link',
    signupSteps: [
      'Click our Claim Offer button above — the promo code is automatically applied',
      'Enter your full legal name, date of birth, email address and home address',
      'Verify your identity with the last 4 digits of your SSN',
      'Make your first deposit of at least $10',
      'Place your first bet of at least $5 on any sport',
      'Your $200 in FanCash will be credited to your account immediately',
      'Use FanCash for bonus bets or spend it on Fanatics merchandise',
    ],
    pros: ['$200 in FanCash credited immediately after first $5 bet', 'FanCash usable on Fanatics merchandise — unique reward system', 'Clean modern app that is easy for new bettors to navigate', 'Good ongoing promotions for existing users', 'Strong integration with Fanatics shopping app'],
    cons: ['Newer platform — fewer betting markets than FanDuel or DraftKings', 'FanCash less flexible than direct cash withdrawals', 'Available in fewer US states than established rivals', 'In-play betting interface less developed than competitors'],
    verdict: 'Fanatics is the freshest face in US sports betting and growing fast. The FanCash reward system is genuinely unique — perfect for sports fans who regularly buy merchandise. The $200 instant reward is excellent value and the clean app makes it ideal for new bettors. A great second or third sportsbook choice.',
    states: ['AZ', 'CO', 'IL', 'IN', 'KS', 'LA', 'MD', 'MA', 'MI', 'NJ', 'OH', 'PA', 'TN', 'VA'],
    faq: [
      { q: 'What is FanCash?', a: 'FanCash is Fanatics own reward currency. You can use it as bonus bets on the Fanatics Sportsbook or spend it on merchandise at Fanatics.com — jerseys, kit, accessories and more from all major US sports teams.' },
      { q: 'Do I need a promo code for Fanatics?', a: 'No. The welcome offer is automatically applied when you sign up through our link.' },
      { q: 'When do I receive my $200 in FanCash?', a: 'Your $200 in FanCash is credited immediately after you place your first $5 bet — you do not need to wait for the result.' },
      { q: 'Is Fanatics a trustworthy sportsbook?', a: 'Yes. Fanatics is backed by one of the largest sports merchandise companies in the world and is fully licensed and regulated in every state it operates in.' },
      { q: 'Can I withdraw FanCash as cash?', a: 'FanCash used as bonus bets can generate real cash winnings that are fully withdrawable. The FanCash itself is not directly withdrawable as cash.' },
    ],
    category: 'sportsbook',
  },
  bet365: {
    name: 'bet365',
    logo: '/bet365.png',
    bg: '#027b5b',
    initials: 'B3',
    text: '#fff',
    affiliateLink: '/sportsbooks',
    offer: 'Bet $5, Get $365 in Bonus Bets Win or Lose',
    offerDetail: 'Use promo code FOX365 at signup. Place a first bet of $5 or more and receive $365 in bonus bets win or lose. One of the most generous welcome offers in the US market.',
    rating: 4.7,
    ratingBreakdown: { offers: 4.9, appExperience: 4.7, payoutSpeed: 4.7, marketDepth: 4.8, customerService: 4.5 },
    established: 2000,
    headquarters: 'Stoke-on-Trent, UK',
    license: 'Licensed and regulated in 10+ US states',
    payoutSpeed: 'Same day via online banking',
    minDeposit: '$10',
    depositMethods: ['Debit card (Visa/Mastercard)', 'PayPal', 'Online banking', 'Apple Pay', 'Prepaid card'],
    withdrawalMethods: ['PayPal', 'Online banking', 'Debit card', 'Check by mail'],
    appRating: '4.7/5',
    bestFor: 'In-play betting, soccer, international sports, live streaming',
    minAge: 21,
    promoCode: 'Use code FOX365 at signup',
    signupSteps: [
      'Click our Claim Offer button above',
      'Enter promo code FOX365 during registration to unlock the full welcome offer',
      'Enter your full legal name, date of birth, email address and home address',
      'Verify your identity with the last 4 digits of your SSN',
      'Make your first deposit of at least $10',
      'Place your first bet of at least $5 on any sport or market',
      'You will receive $365 in bonus bets win or lose within 24 hours',
    ],
    pros: ['Most generous welcome offer — $365 in bonus bets win or lose', 'World class in-play betting interface — best live betting in the US', 'Live streaming of thousands of events per year', 'Huge range of international sports including soccer, cricket, rugby', 'Trusted global brand with 25+ years of experience', 'Cash out available on most markets'],
    cons: ['Available in fewer US states than FanDuel and DraftKings', 'Interface can feel complex for complete beginners', 'Customer service not as responsive as US-focused rivals', 'Fewer US-specific promotions for existing users'],
    verdict: 'bet365 brings truly world-class sports betting to the US market. The in-play betting and live streaming experience is unmatched by any US competitor. The $365 win-or-lose welcome offer is one of the most generous available. Essential for soccer fans and anyone wanting markets beyond the big four US sports.',
    states: ['AZ', 'CO', 'IL', 'IN', 'IA', 'KS', 'LA', 'MD', 'MA', 'MI', 'NJ', 'NY', 'OH', 'PA', 'TN', 'VA', 'WV'],
    faq: [
      { q: 'What promo code do I need for bet365?', a: 'Use promo code FOX365 at signup to unlock the $365 in bonus bets welcome offer.' },
      { q: 'Do I get the $365 bonus if my bet wins?', a: 'Yes. The bet365 welcome offer pays out $365 in bonus bets win or lose. You receive the bonus regardless of the result of your first bet.' },
      { q: 'Does bet365 have live streaming?', a: 'Yes. bet365 offers live streaming of thousands of sporting events per year including soccer, tennis, basketball and more. You need a funded account or a bet placed in the last 24 hours to watch.' },
      { q: 'Is bet365 available in my state?', a: 'bet365 is available in AZ, CO, IL, IN, IA, KS, LA, MD, MA, MI, NJ, NY, OH, PA, TN, VA and WV. You must be physically located in one of these states to place bets.' },
      { q: 'Is bet365 a trusted sportsbook?', a: 'Yes. bet365 was founded in 2000 and is one of the most trusted sports betting brands in the world with millions of customers across 20+ countries.' },
    ],
    category: 'sportsbook',
  },
};

export function generateStaticParams() {
  return Object.keys(REVIEWS).map(function(brand) {
    return { brand: brand };
  });
}

export async function generateMetadata(props) {
  try {
    const params = await props.params;
    const brand = params && params.brand ? String(params.brand).toLowerCase() : '';
    const review = REVIEWS[brand];
    if (!review) return { title: 'Review | BetAndPlayUSA' };
    return {
      title: review.name + ' Review 2026 — Bonus, Odds & Full Guide | BetAndPlayUSA',
      description: 'Full ' + review.name + ' review for 2026. Current offer: ' + review.offer + '. Step by step signup guide, deposit methods, pros, cons and our expert verdict.',
    };
  } catch (e) {
    return { title: 'Review | BetAndPlayUSA' };
  }
}

function StarRating({ rating }) {
  return (
    <span>
      {[1,2,3,4,5].map(function(i) {
        return <span key={i} style={{ color: i <= Math.round(rating) ? '#f59e0b' : '#e5e7eb', fontSize: 20 }}>★</span>;
      })}
    </span>
  );
}

export default async function ReviewPage(props) {
  const params = await props.params;
  const brand = params && params.brand ? String(params.brand).toLowerCase() : '';
  const review = REVIEWS[brand];
  if (!review) notFound();

  const otherReviews = Object.entries(REVIEWS).filter(function(entry) { return entry[0] !== brand; }).slice(0, 3);

  return (
    <div style={{ minHeight: '100vh', background: LIGHT, fontFamily: 'system-ui, sans-serif' }}>

      <div style={{ background: NAVY, padding: '48px 24px 56px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 12px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: RED }} />
        <div style={{ position: 'relative', maxWidth: 960, margin: '0 auto' }}>
          <Link href="/sportsbooks" style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 20 }}>← Back to all sportsbooks</Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
            <div style={{ width: 90, height: 90, borderRadius: 18, background: review.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden', padding: 10, boxSizing: 'border-box' }}>
              <img src={review.logo} alt={review.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <div>
              <div style={{ display: 'inline-block', background: 'rgba(217,30,39,0.2)', border: '1px solid rgba(217,30,39,0.4)', borderRadius: 20, padding: '4px 12px', marginBottom: 10 }}>
                <span style={{ color: WHITE, fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase' }}>Expert Review — Updated April 2026</span>
              </div>
              <h1 style={{ fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 900, color: WHITE, margin: '0 0 10px', textTransform: 'uppercase' }}>{review.name} Review 2026</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                <StarRating rating={review.rating} />
                <span style={{ color: WHITE, fontWeight: 900, fontSize: 20 }}>{review.rating}/5</span>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>BetAndPlayUSA Expert Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ background: RED, padding: '20px 24px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>Current Welcome Offer</div>
            <div style={{ color: WHITE, fontWeight: 900, fontSize: 18 }}>{review.offer}</div>
            <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, marginTop: 4 }}>{review.promoCode}</div>
          </div>
          <a href={review.affiliateLink} target="_blank" rel="noopener noreferrer" style={{ background: WHITE, color: RED, padding: '14px 32px', borderRadius: 10, fontWeight: 900, fontSize: 16, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: 0.5, whiteSpace: 'nowrap', flexShrink: 0, boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }}>
            Claim Offer Now
          </a>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '32px 16px 60px' }}>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 24 }}>
          <div style={{ background: WHITE, borderRadius: 14, border: '1px solid #e5e7eb', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <h2 style={{ fontSize: 15, fontWeight: 800, color: NAVY, margin: '0 0 20px', textTransform: 'uppercase', letterSpacing: 0.5 }}>Our Rating Breakdown</h2>
            {[
              { label: 'Welcome Offer', value: review.ratingBreakdown.offers },
              { label: 'App Experience', value: review.ratingBreakdown.appExperience },
              { label: 'Payout Speed', value: review.ratingBreakdown.payoutSpeed },
              { label: 'Market Depth', value: review.ratingBreakdown.marketDepth },
              { label: 'Customer Service', value: review.ratingBreakdown.customerService },
            ].map(function(item) {
              return (
                <div key={item.label} style={{ marginBottom: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 13, color: '#374151', fontWeight: 600 }}>{item.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 900, color: NAVY }}>{item.value}/5</span>
                  </div>
                  <div style={{ background: '#f1f5f9', borderRadius: 99, height: 8, overflow: 'hidden' }}>
                    <div style={{ background: item.value >= 4.8 ? '#22c55e' : item.value >= 4.5 ? RED : '#f59e0b', height: '100%', width: (item.value / 5 * 100) + '%', borderRadius: 99 }} />
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ background: WHITE, borderRadius: 14, border: '1px solid #e5e7eb', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <h2 style={{ fontSize: 15, fontWeight: 800, color: NAVY, margin: '0 0 20px', textTransform: 'uppercase', letterSpacing: 0.5 }}>Key Facts</h2>
            {[
              { label: 'Established', value: review.established },
              { label: 'Headquarters', value: review.headquarters },
              { label: 'License', value: review.license },
              { label: 'Min Deposit', value: review.minDeposit },
              { label: 'Payout Speed', value: review.payoutSpeed },
              { label: 'App Rating', value: review.appRating },
              { label: 'Best For', value: review.bestFor },
              { label: 'Min Age', value: review.minAge + ' years old' },
            ].map(function(item) {
              return (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9', gap: 12 }}>
                  <span style={{ fontSize: 13, color: '#6b7280', fontWeight: 600, flexShrink: 0 }}>{item.label}</span>
                  <span style={{ fontSize: 13, color: '#111827', fontWeight: 700, textAlign: 'right' }}>{item.value}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ background: WHITE, borderRadius: 14, border: '1px solid #e5e7eb', padding: '28px', marginBottom: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <h2 style={{ fontSize: 18, fontWeight: 900, color: NAVY, margin: '0 0 8px', textTransform: 'uppercase' }}>Current Offer — {review.offer}</h2>
          <p style={{ fontSize: 15, color: '#4b5563', lineHeight: 1.8, margin: '0 0 20px' }}>{review.offerDetail}</p>
          <div style={{ background: '#f0f4ff', borderRadius: 10, padding: '14px 18px', display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <span style={{ color: RED, fontWeight: 900, fontSize: 18, flexShrink: 0 }}>!</span>
            <p style={{ fontSize: 13, color: '#374151', margin: 0, lineHeight: 1.6 }}><strong>Promo code:</strong> {review.promoCode}. T&Cs apply. New customers only. Must be 21+. State restrictions apply.</p>
          </div>
        </div>

        <div style={{ background: WHITE, borderRadius: 14, border: '1px solid #e5e7eb', padding: '28px', marginBottom: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <h2 style={{ fontSize: 18, fontWeight: 900, color: NAVY, margin: '0 0 20px', textTransform: 'uppercase' }}>How to Sign Up — Step by Step</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {review.signupSteps.map(function(step, i) {
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: i === 0 ? RED : NAVY, color: WHITE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, flexShrink: 0 }}>{i + 1}</div>
                  <div style={{ paddingTop: 6 }}>
                    <p style={{ fontSize: 14, color: '#374151', margin: 0, lineHeight: 1.6 }}>{step}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <a href={review.affiliateLink} target="_blank" rel="noopener noreferrer" style={{ display: 'block', background: RED, color: WHITE, textAlign: 'center', padding: '16px', borderRadius: 10, fontWeight: 900, fontSize: 16, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 24, boxShadow: '0 4px 12px rgba(217,30,39,0.3)' }}>
            Start Step 1 — Sign Up to {review.name}
          </a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 20 }}>
          <div style={{ background: WHITE, borderRadius: 14, border: '1px solid #e5e7eb', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <h2 style={{ fontSize: 15, fontWeight: 800, color: NAVY, margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: 0.5 }}>Deposit Methods</h2>
            {review.depositMethods.map(function(method) {
              return (
                <div key={method} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                  <span style={{ color: '#22c55e', fontWeight: 900, fontSize: 14 }}>✓</span>
                  <span style={{ fontSize: 14, color: '#374151' }}>{method}</span>
                </div>
              );
            })}
          </div>

          <div style={{ background: WHITE, borderRadius: 14, border: '1px solid #e5e7eb', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <h2 style={{ fontSize: 15, fontWeight: 800, color: NAVY, margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: 0.5 }}>Withdrawal Methods</h2>
            {review.withdrawalMethods.map(function(method) {
              return (
                <div key={method} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                  <span style={{ color: '#22c55e', fontWeight: 900, fontSize: 14 }}>✓</span>
                  <span style={{ fontSize: 14, color: '#374151' }}>{method}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 20 }}>
          <div style={{ background: '#f0fdf4', borderRadius: 14, border: '1px solid #bbf7d0', padding: '24px' }}>
            <h2 style={{ fontSize: 15, fontWeight: 800, color: '#166534', margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: 0.5 }}>Pros</h2>
            {review.pros.map(function(pro) {
              return (
                <div key={pro} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12 }}>
                  <span style={{ color: '#22c55e', fontWeight: 900, fontSize: 16, flexShrink: 0, marginTop: 1 }}>✓</span>
                  <span style={{ fontSize: 14, color: '#166534', lineHeight: 1.5 }}>{pro}</span>
                </div>
              );
            })}
          </div>

          <div style={{ background: '#fef2f2', borderRadius: 14, border: '1px solid #fecaca', padding: '24px' }}>
            <h2 style={{ fontSize: 15, fontWeight: 800, color: '#991b1b', margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: 0.5 }}>Cons</h2>
            {review.cons.map(function(con) {
              return (
                <div key={con} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12 }}>
                  <span style={{ color: RED, fontWeight: 900, fontSize: 16, flexShrink: 0, marginTop: 1 }}>✗</span>
                  <span style={{ fontSize: 14, color: '#991b1b', lineHeight: 1.5 }}>{con}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ background: NAVY, borderRadius: 14, padding: '28px', marginBottom: 20, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 12px)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative' }}>
            <h2 style={{ fontSize: 15, fontWeight: 800, color: 'rgba(255,255,255,0.6)', margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: 0.5 }}>Our Verdict</h2>
            <p style={{ fontSize: 16, color: WHITE, lineHeight: 1.8, margin: '0 0 24px', fontWeight: 500 }}>{review.verdict}</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href={review.affiliateLink} target="_blank" rel="noopener noreferrer" style={{ background: RED, color: WHITE, padding: '14px 32px', borderRadius: 10, fontWeight: 900, fontSize: 15, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: 0.5, boxShadow: '0 4px 12px rgba(217,30,39,0.4)' }}>
                Claim {review.name} Offer
              </a>
              <Link href="/sportsbooks" style={{ background: 'rgba(255,255,255,0.1)', color: WHITE, padding: '14px 24px', borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: 0.5, border: '1px solid rgba(255,255,255,0.2)' }}>
                Compare All Books
              </Link>
            </div>
          </div>
        </div>

        <div style={{ background: WHITE, borderRadius: 14, border: '1px solid #e5e7eb', padding: '28px', marginBottom: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <h2 style={{ fontSize: 18, fontWeight: 900, color: NAVY, margin: '0 0 20px', textTransform: 'uppercase' }}>Frequently Asked Questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {review.faq.map(function(item, i) {
              return (
                <div key={i} style={{ padding: '16px 0', borderBottom: i < review.faq.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                  <h3 style={{ fontSize: 15, fontWeight: 800, color: NAVY, margin: '0 0 8px' }}>{item.q}</h3>
                  <p style={{ fontSize: 14, color: '#4b5563', margin: 0, lineHeight: 1.7 }}>{item.a}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ background: WHITE, borderRadius: 14, border: '1px solid #e5e7eb', padding: '24px', marginBottom: 20 }}>
          <h2 style={{ fontSize: 15, fontWeight: 800, color: NAVY, margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: 0.5 }}>Available in These States</h2>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {review.states.map(function(s) {
              return <span key={s} style={{ background: '#f0f4ff', color: NAVY, fontSize: 12, fontWeight: 700, padding: '5px 12px', borderRadius: 6 }}>{s}</span>;
            })}
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: 18, fontWeight: 900, color: NAVY, margin: '0 0 16px', textTransform: 'uppercase' }}>Compare Other Sportsbooks</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
            {otherReviews.map(function(entry) {
              const b = entry[1];
              return (
                <Link key={entry[0]} href={'/reviews/' + entry[0]} style={{ background: WHITE, borderRadius: 12, border: '1px solid #e5e7eb', padding: '16px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 10, background: b.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden', padding: 5, boxSizing: 'border-box' }}>
                    <img src={b.logo} alt={b.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, color: NAVY, fontSize: 15 }}>{b.name}</div>
                    <div style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>{b.rating}/5 — Read review</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div style={{ background: WHITE, borderRadius: 14, border: '1px solid #e5e7eb', padding: '20px 24px' }}>
          <p style={{ fontSize: 12, color: '#9ca3af', margin: 0, lineHeight: 1.7 }}>
            <strong style={{ color: '#6b7280' }}>Affiliate disclosure:</strong> BetAndPlayUSA earns a commission when you sign up through our links. This does not affect the bonus you receive. All ratings are based on our independent assessment. Offers correct as of April 2026 and subject to change. Must be 21+ and physically located in an eligible state. Gambling problem? Call 1-800-GAMBLER.
          </p>
        </div>
      </div>
    </div>
  );
}
