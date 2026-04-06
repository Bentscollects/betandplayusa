'use client';
const NAVY = '#1B3A6B';
const RED = '#D91E27';
export default function CookiesPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#f4f6fa', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: NAVY, padding: '40px 24px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: RED }} />
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ display: 'inline-block', background: 'rgba(217,30,39,0.2)', border: '1px solid rgba(217,30,39,0.4)', borderRadius: 20, padding: '5px 14px', marginBottom: 16 }}>
            <span style={{ color: '#fff', fontSize: 12, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase' }}>Legal</span>
          </div>
          <h1 style={{ fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 900, color: '#fff', margin: '0 0 8px', textTransform: 'uppercase' }}>Cookie Policy</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', margin: 0, fontSize: 14 }}>Last updated: April 2026</p>
        </div>
      </div>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 24px 80px' }}>
        {[
          { title: '1. What Are Cookies', content: 'Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences and improve your experience.' },
          { title: '2. Cookies We Use', content: 'We use essential cookies only. These include cookies to remember your consent preferences and to maintain your session while using the site. We do not use advertising, tracking, or third-party analytics cookies.' },
          { title: '3. Managing Cookies', content: 'You can control cookies through your browser settings. Disabling essential cookies may affect the functionality of the site. Most browsers allow you to view, delete, and block cookies from specific websites.' },
          { title: '4. Third Party Cookies', content: "Our affiliate sportsbook partners may set their own cookies when you click through to their sites. We have no control over these cookies. Please refer to each sportsbook's cookie policy for more information." },
          { title: '5. Contact', content: 'For any questions about our use of cookies, contact us at privacy@betandplayusa.com.' },
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
