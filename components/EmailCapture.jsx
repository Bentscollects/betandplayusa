'use client';
import { useState } from 'react';

const NAVY = '#1B3A6B';
const RED = '#D91E27';
const WHITE = '#FFFFFF';

export default function EmailCapture() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!email || !email.includes('@')) return;
    setLoading(true);
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer re_Uovusepx_Gq9ZXbg9X7yz9joCDeRnqvsa' },
        body: JSON.stringify({
          from: 'onboarding@resend.dev',
          to: 'liambenton2@gmail.com',
          subject: 'New email capture: ' + email,
          html: '<p>New email captured on homepage: <strong>' + email + '</strong></p>',
        }),
      });
      setSubmitted(true);
    } catch (e) {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 12, padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 20 }}>✓</span>
        <span style={{ color: WHITE, fontSize: 14, fontWeight: 600 }}>Got it! We will send you today&#39;s best offers.</span>
      </div>
    );
  }

  return (
    <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 600, textAlign: 'center' }}>Get today&#39;s best offer sent to you</p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', maxWidth: 440, width: '100%', justifyContent: 'center' }}>
        <input
          type="email"
          value={email}
          onChange={function(e) { setEmail(e.target.value); }}
          onKeyDown={function(e) { if (e.key === 'Enter') handleSubmit(); }}
          placeholder="Enter your email address"
          style={{ flex: 1, minWidth: 200, padding: '12px 16px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', color: WHITE, fontSize: 14, outline: 'none', fontFamily: 'system-ui' }}
        />
        <button
          onClick={handleSubmit}
          disabled={loading || !email}
          style={{ background: RED, color: WHITE, border: 'none', borderRadius: 8, padding: '12px 20px', fontSize: 14, fontWeight: 800, cursor: email ? 'pointer' : 'not-allowed', textTransform: 'uppercase', letterSpacing: 0.5, whiteSpace: 'nowrap', opacity: email ? 1 : 0.6 }}
        >
          {loading ? 'Sending...' : 'Get Offers'}
        </button>
      </div>
      <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11, margin: '8px 0 0' }}>No spam. Unsubscribe anytime. Must be 21+.</p>
    </div>
  );
}
