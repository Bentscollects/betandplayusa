'use client';
const NAVY = '#1B3A6B';
const RED = '#D91E27';
export default function TermsPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#f4f6fa', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: NAVY, padding: '40px 24px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: RED }} />
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ display: 'inline-block', background: 'rgba(217,30,39,0.2)', border: '1px solid rgba(217,30,39,0.4)', borderRadius: 20, padding: '5px 14px', marginBottom: 16 }}>
            <span style={{ color: '#fff', fontSize: 12, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase' }}>Legal</span>
          </div>
          <h1 style={{ fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 900, color: '#fff', margin: '0 0 8px', textTransform: 'uppercase' }}>Terms & Conditions</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', margin: 0, fontSize: 14 }}>Last updated: April 2026</p>
        </div>
      </div>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 24px 80px' }}>
        {[
          { title: '1. Eligibility', content: 'You must be 21 years of age or older and physically located in an eligible US state to participate. You must be a new customer to the chosen sportsbook — existing customers do not qualify.' },
          { title: '2. How to Claim', content: 'To claim a cash reward, scan a QR code at a participating venue, enter the host code, sign up with a qualifying sportsbook, place a minimum $20 deposit and bet, and upload proof via the activation form.' },
          { title: '3. Cash Rewards', content: 'Cash rewards are paid in person by the host only after proof verification. Rewards are subject to change. BetAndPlayUSA reserves the right to adjust reward amounts at any time.' },
          { title: '4. Telegram Access', content: 'For social signups, Telegram group access is granted within 24 hours of proof approval. Access may be revoked if abuse or fraud is detected.' },
          { title: '5. Affiliate Disclosure', content: 'BetAndPlayUSA earns an affiliate commission from sportsbooks when you sign up through our links. This commission does not affect the bonuses or rewards you receive.' },
          { title: '6. One Claim Per Person', content: 'One claim per person per sportsbook. Duplicate claims will be rejected. Fraudulent submissions will result in permanent disqualification.' },
          { title: '7. Responsible Gambling', content: 'BetAndPlayUSA promotes responsible gambling. If you or someone you know has a gambling problem, call 1-800-GAMBLER or visit ncpgambling.org.' },
        ].map(function(section) {
          return (
            <div key={section.title} style={{ background: '#fff', borderRadius: 14, border: '1px solid #e5e7eb', padding: '24px 28px', marginBottom: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: NAVY, margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: 0.3 }}>{section.title}</h2>
              <p style={{ color: '#4b5563', lineHeight: 1.8, margin: 0, fontSize: 15 }}>{section.content}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
