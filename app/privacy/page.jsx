'use client';
const NAVY = '#1B3A6B';
const RED = '#D91E27';
export default function PrivacyPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#f4f6fa', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: NAVY, padding: '40px 24px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: RED }} />
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ display: 'inline-block', background: 'rgba(217,30,39,0.2)', border: '1px solid rgba(217,30,39,0.4)', borderRadius: 20, padding: '5px 14px', marginBottom: 16 }}>
            <span style={{ color: '#fff', fontSize: 12, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase' }}>Legal</span>
          </div>
          <h1 style={{ fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 900, color: '#fff', margin: '0 0 8px', textTransform: 'uppercase' }}>Privacy Policy</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', margin: 0, fontSize: 14 }}>Last updated: April 2026</p>
        </div>
      </div>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 24px 80px' }}>
        {[
          { title: '1. Information We Collect', content: 'BetAndPlayUSA collects the following personal information: full name, email address, Telegram username (optional), IP address and geolocation data, and screenshots or videos of account signup and betting proof.' },
          { title: '2. Why We Collect It', content: 'We collect this information for affiliate verification to confirm genuine new sportsbook signups, reward processing to issue cash rewards to verified users, fraud prevention to detect duplicate signups and abuse, and state verification to ensure users are in eligible jurisdictions.' },
          { title: '3. Data Retention', content: 'Submission data is held for 90 days after submission for verification purposes only. Anonymised usage analytics are retained indefinitely. After 90 days, personal data is permanently deleted from our systems.' },
          { title: '4. Who Has Access', content: 'Your data is accessed by BetAndPlayUSA administrators for verification purposes, and affiliated sportsbooks to track CPA commissions (name and email only). We do not share data with third parties beyond our affiliate partners.' },
          { title: '5. Your Rights', content: 'Under GDPR and CCPA you have the right to access your data, request deletion of your data, request a copy of your data, and withdraw consent at any time. To exercise these rights, contact us at privacy@betandplayusa.com.' },
          { title: '6. Cookies', content: 'We use essential cookies to remember your consent preferences. We do not use tracking or advertising cookies. See our Cookie Policy for full details.' },
          { title: '7. Contact', content: 'For any privacy-related questions or requests, contact us at privacy@betandplayusa.com.' },
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
