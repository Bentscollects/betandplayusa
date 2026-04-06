'use client';
import { useState, useRef } from 'react';

const NAVY = '#1B3A6B';
const RED = '#D91E27';
const WHITE = '#FFFFFF';
const LIGHT = '#F4F6FA';
const CHARCOAL = '#111827';

const SPORTSBOOKS = [
  { id: 'fanduel', name: 'FanDuel', bg: '#1059a4', text: '#fff', offer: 'Bet $5, Get up to $300 Back Each Day for 10 Days', logo: '/fanduel.png' },
  { id: 'draftkings', name: 'DraftKings', bg: '#1a1a2e', text: '#00d4aa', offer: 'Bet $5, Get $200 in Bonus Bets Instantly', logo: '/draftkings.png' },
  { id: 'bet365', name: 'bet365', bg: '#027b5b', text: '#ffffff', offer: 'Bet $5, Get $365 in Bonus Bets Win or Lose', logo: '/bet365.png' },
  { id: 'caesars', name: 'Caesars', bg: '#003087', text: '#FFD700', offer: 'Bet $1, Double Your Winnings on Next 10 Wagers', logo: '/caesars.png' },
  { id: 'fanatics', name: 'Fanatics', bg: '#cc0000', text: '#fff', offer: 'Bet $5, Get $200 in FanCash Immediately', logo: '/fanatics.png' },
  { id: 'betmgm', name: 'BetMGM', bg: '#c9a84c', text: '#1a1a1a', offer: 'Get up to $1,500 Back in Bonus Bets if First Bet Loses', logo: '/betmgm.png' },
];

const CONSENTS = [
  { key: 'age', label: 'I confirm I am 21 years of age or older' },
  { key: 'data', label: 'I agree to my data being held securely for verification purposes for 90 days' },
  { key: 'affiliate', label: 'I understand BetAndPlayUSA earns an affiliate commission from my signup' },
  { key: 'telegram', label: 'I agree to be added to the BetAndPlayUSA Telegram group' },
];

const STEPS = [1, 2, 3];
const STEP_LABELS = ['Pick Book', 'Your Details', 'Upload Proof'];

function StepBar({ step }) {
  return (
    <div style={{ background: WHITE, borderBottom: '1px solid #e5e7eb', padding: '16px 24px' }}>
      <div style={{ maxWidth: 560, margin: '0 auto', display: 'flex', alignItems: 'center' }}>
        {STEPS.map(function(s, i) {
          return (
            <div key={s} style={{ display: 'flex', alignItems: 'center', flex: i < 2 ? 1 : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, flexShrink: 0, background: step > s ? RED : step === s ? NAVY : '#e5e7eb', color: step > s ? WHITE : step === s ? WHITE : '#9ca3af' }}>
                  {step > s ? '✓' : s}
                </div>
                <span style={{ fontSize: 12, fontWeight: step === s ? 700 : 500, color: step >= s ? NAVY : '#9ca3af', whiteSpace: 'nowrap' }}>{STEP_LABELS[s-1]}</span>
              </div>
              {i < 2 && <div style={{ flex: 1, height: 2, background: step > s ? RED : '#e5e7eb', margin: '0 10px' }} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function JoinPage() {
  const [step, setStep] = useState(1);
  const [selectedBook, setSelectedBook] = useState(null);
  const [files, setFiles] = useState([]);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', telegram: '' });
  const [consents, setConsents] = useState({ age: false, data: false, affiliate: false, telegram: false });
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef(null);

  function handleFileChange(e) {
    const newFiles = Array.from(e.target.files);
    setFiles(function(prev) { return [...prev, ...newFiles].slice(0, 5); });
  }

  function removeFile(idx) {
    setFiles(function(prev) { return prev.filter(function(_, i) { return i !== idx; }); });
  }

  async function handleSubmit() {
    setError('');
    if (!form.firstName || !form.lastName || !form.email) { setError('Please fill in all required fields.'); return; }
    if (!form.telegram) { setError('Please enter your Telegram username.'); return; }
    if (files.length < 1) { setError('Please upload at least 1 proof screenshot.'); return; }
    if (!consents.age || !consents.data || !consents.affiliate || !consents.telegram) { setError('Please accept all required consents.'); return; }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('type', 'social');
      formData.append('firstName', form.firstName);
      formData.append('lastName', form.lastName);
      formData.append('email', form.email);
      formData.append('telegram', form.telegram);
      formData.append('sportsbook', selectedBook.id);
      files.forEach(function(f) { formData.append('files', f); });
      formData.append('consentAge', consents.age);
      formData.append('consentData', consents.data);
      formData.append('consentAffiliate', consents.affiliate);
      formData.append('consentTelegram', consents.telegram);
      const res = await fetch('/api/submit', { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Submission failed');
      setSubmitted(true);
    } catch (e) {
      setError('Something went wrong. Please try again.');
    } finally {
      setUploading(false);
    }
  }

  if (submitted) {
    return (
      <div style={{ minHeight: '100vh', background: LIGHT, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div style={{ background: WHITE, borderRadius: 20, padding: '48px 32px', maxWidth: 480, width: '100%', textAlign: 'center', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
          <div style={{ width: 80, height: 80, background: '#dcfce7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: 40, color: '#166534' }}>\u2713</div>
          <h2 style={{ fontSize: 26, fontWeight: 900, color: NAVY, marginBottom: 12, marginTop: 0, textTransform: 'uppercase' }}>You Are In!</h2>
          <p style={{ color: '#6b7280', marginBottom: 24, lineHeight: 1.7, fontSize: 15 }}>We have received your proof. You will get Telegram access within 24 hours of approval.</p>
          <div style={{ background: NAVY, borderRadius: 14, padding: '16px 20px', marginBottom: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>Watch for invite on</div>
            <div style={{ fontSize: 18, fontWeight: 900, color: WHITE }}>@{form.telegram}</div>
          </div>
          <p style={{ fontSize: 13, color: '#9ca3af', margin: 0 }}>Confirmation email sent to {form.email}</p>
          <div style={{ marginTop: 24, background: '#f4f6fa', borderRadius: 14, padding: '20px 24px', textAlign: 'left' }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#1B3A6B', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.3 }}>Share with friends</div>
            <p style={{ fontSize: 13, color: '#6b7280', margin: '0 0 12px', lineHeight: 1.6 }}>Know someone who would want free betting tips? Share BetAndPlayUSA with them.</p>
            <button onClick={function() {
              if (navigator.share) {
                navigator.share({ title: 'BetAndPlayUSA', text: 'Get free betting tips by signing up with a sportsbook through BetAndPlayUSA', url: 'https://betandplayusa.com/join' });
              } else {
                navigator.clipboard.writeText('https://betandplayusa.com/join');
                alert('Link copied to clipboard!');
              }
            }} style={{ background: '#1B3A6B', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 20px', fontSize: 13, fontWeight: 800, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Share Link
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: LIGHT, fontFamily: 'system-ui, -apple-system, sans-serif' }}>

      <div style={{ background: NAVY, position: 'relative', overflow: 'hidden', padding: '40px 24px 48px' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 12px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: RED }} />
        <div style={{ position: 'relative', maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', background: 'rgba(217,30,39,0.2)', border: '1px solid rgba(217,30,39,0.4)', borderRadius: 20, padding: '5px 14px', marginBottom: 16 }}>
            <span style={{ color: WHITE, fontSize: 12, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase' }}>Exclusive Telegram Access</span>
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(217,30,39,0.2)', border: '1px solid rgba(217,30,39,0.5)', borderRadius: 20, padding: '5px 14px', marginBottom: 14 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#D91E27', display: 'inline-block', animation: 'pulse 2s infinite' }} />
            <span style={{ color: '#fff', fontSize: 12, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase' }}>Limited spots available</span>
          </div>
          <h1 style={{ fontSize: 'clamp(26px, 5vw, 38px)', fontWeight: 900, color: WHITE, margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: -0.5, lineHeight: 1.1 }}>
            Sign Up. Bet. <span style={{ color: RED }}>Get Tips.</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 15, margin: '0 0 24px', lineHeight: 1.6 }}>
            Join a sportsbook through us, upload your proof, and unlock our premium Telegram betting tips group free.
          </p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            {['Expert daily picks', 'Instant access', '100% free'].map(function(v) {
              return (
                <div key={v} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 20, padding: '6px 14px', fontSize: 13, color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>{v}</div>
              );
            })}
          </div>
          <div style={{ marginTop: 24, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 12, padding: '12px 20px', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            <div style={{ display: 'flex', gap: -4 }}>
              {['J', 'M', 'S', 'R', 'T'].map(function(initial, i) {
                return <div key={i} style={{ width: 28, height: 28, borderRadius: '50%', background: '#D91E27', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, marginLeft: i === 0 ? 0 : -6, border: '2px solid #1B3A6B' }}>{initial}</div>;
              })}
            </div>
            <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: 13, fontWeight: 600 }}>2,400+ members already in the group</span>
          </div>
        </div>
      </div>

      <StepBar step={step} />

      <div style={{ maxWidth: 560, margin: '0 auto', padding: '32px 16px 60px' }}>

        {step === 1 && (
          <div style={{ background: WHITE, borderRadius: 16, border: '1px solid #e5e7eb', padding: '28px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: NAVY, margin: '0 0 6px', textTransform: 'uppercase' }}>Choose Your Sportsbook</h2>
            <p style={{ color: '#6b7280', fontSize: 14, margin: '0 0 20px' }}>New customers only. Pick the book you will sign up with.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {SPORTSBOOKS.map(function(book) {
                const selected = selectedBook && selectedBook.id === book.id;
                return (
                  <button key={book.id} type="button" autoComplete="off" onClick={function() { setSelectedBook(book); }} style={{ background: selected ? '#f0f4ff' : '#fff', border: selected ? '2px solid ' + NAVY : '2px solid #e5e7eb', borderRadius: 12, padding: '14px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left', width: '100%' }}>
                    <div style={{ width: 46, height: 46, borderRadius: 10, background: book.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden', padding: 4, boxSizing: 'border-box' }}>
                      <img src={book.logo} alt={book.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 800, color: NAVY, fontSize: 15 }}>{book.name}</div>
                      <div style={{ color: '#6b7280', fontSize: 13, marginTop: 2 }}>{book.offer}</div>
                    </div>
                    {selected && <div style={{ width: 24, height: 24, borderRadius: '50%', background: NAVY, color: WHITE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, flexShrink: 0, fontWeight: 900 }}>✓</div>}
                  </button>
                );
              })}
            </div>
            <button onClick={function() { if (selectedBook) setStep(2); }} disabled={!selectedBook} style={{ width: '100%', marginTop: 20, padding: 14, borderRadius: 10, border: 'none', background: selectedBook ? RED : '#e5e7eb', color: selectedBook ? WHITE : '#9ca3af', fontSize: 15, fontWeight: 800, cursor: selectedBook ? 'pointer' : 'not-allowed', textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Continue
            </button>
          </div>
        )}

        {step === 2 && (
          <div style={{ background: WHITE, borderRadius: 16, border: '1px solid #e5e7eb', padding: '28px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <button onClick={function() { setStep(1); }} style={{ background: 'none', border: 'none', color: '#6b7280', fontSize: 14, cursor: 'pointer', marginBottom: 20, padding: 0, fontWeight: 600 }}>\u2190 Back</button>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: NAVY, margin: '0 0 6px', textTransform: 'uppercase' }}>Your Details</h2>
            <p style={{ color: '#6b7280', fontSize: 14, margin: '0 0 20px' }}>We will send your Telegram invite and confirmation here.</p>
            {selectedBook && (
              <div style={{ background: '#f0f4ff', borderRadius: 10, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <div style={{ width: 32, height: 32, borderRadius: 7, background: selectedBook.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden', padding: 3, boxSizing: 'border-box' }}>
                  <img src={selectedBook.logo} alt={selectedBook.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: NAVY }}>{selectedBook.name}</div>
                  <div style={{ fontSize: 12, color: '#6b7280' }}>{selectedBook.offer}</div>
                </div>
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: CHARCOAL, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.3 }}>First name</label>
                  <input value={form.firstName} onChange={function(e) { var v = e.target.value; setForm(function(p) { return Object.assign({}, p, { firstName: v }); }); }} placeholder="John" style={{ width: '100%', padding: 12, border: '2px solid #e5e7eb', borderRadius: 8, fontSize: 15, boxSizing: 'border-box', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: CHARCOAL, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.3 }}>Last name</label>
                  <input value={form.lastName} onChange={function(e) { var v = e.target.value; setForm(function(p) { return Object.assign({}, p, { lastName: v }); }); }} placeholder="Smith" style={{ width: '100%', padding: 12, border: '2px solid #e5e7eb', borderRadius: 8, fontSize: 15, boxSizing: 'border-box', outline: 'none' }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: CHARCOAL, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.3 }}>Email address</label>
                <input type="email" value={form.email} onChange={function(e) { var v = e.target.value; setForm(function(p) { return Object.assign({}, p, { email: v }); }); }} placeholder="john@example.com" style={{ width: '100%', padding: 12, border: '2px solid #e5e7eb', borderRadius: 8, fontSize: 15, boxSizing: 'border-box', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: CHARCOAL, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.3 }}>Telegram username</label>
                <div style={{ display: 'flex', alignItems: 'center', border: '2px solid #e5e7eb', borderRadius: 8, overflow: 'hidden' }}>
                  <span style={{ background: '#f9fafb', padding: '12px 12px', fontSize: 15, color: '#6b7280', borderRight: '2px solid #e5e7eb', fontWeight: 700 }}>@</span>
                  <input value={form.telegram} onChange={function(e) { var v = e.target.value; setForm(function(p) { return Object.assign({}, p, { telegram: v }); }); }} placeholder="username" style={{ flex: 1, padding: 12, border: 'none', fontSize: 15, outline: 'none' }} />
                </div>
              </div>
            </div>
            {error && <p style={{ color: RED, fontSize: 14, marginTop: 12, textAlign: 'center', fontWeight: 600 }}>{error}</p>}
            <button onClick={function() { if (form.firstName && form.lastName && form.email && form.telegram) { setError(''); setStep(3); } else { setError('Please fill in all fields.'); } }} style={{ width: '100%', marginTop: 20, padding: 14, borderRadius: 10, border: 'none', background: RED, color: WHITE, fontSize: 15, fontWeight: 800, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Continue
            </button>
          </div>
        )}

        {step === 3 && (
          <div>
            <button onClick={function() { setStep(2); }} style={{ background: 'none', border: 'none', color: '#6b7280', fontSize: 14, cursor: 'pointer', marginBottom: 20, padding: 0, fontWeight: 600 }}>\u2190 Back</button>
            <div style={{ background: WHITE, borderRadius: 16, border: '1px solid #e5e7eb', padding: '28px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', marginBottom: 16 }}>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: NAVY, margin: '0 0 6px', textTransform: 'uppercase' }}>Upload Proof</h2>
              <p style={{ color: '#6b7280', fontSize: 14, margin: '0 0 20px' }}>Upload a screenshot showing your sportsbook account and first deposit or bet.</p>
              <div onClick={function() { fileInputRef.current && fileInputRef.current.click(); }} style={{ border: '2px dashed #d1d5db', borderRadius: 12, padding: '28px 20px', textAlign: 'center', cursor: 'pointer', background: '#f9fafb', marginBottom: 14 }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>+</div>
                <div style={{ fontWeight: 700, color: NAVY, marginBottom: 4 }}>Tap to upload screenshots</div>
                <div style={{ fontSize: 13, color: '#9ca3af' }}>JPG, PNG or MP4 \u2014 Max 5 files</div>
                <input ref={fileInputRef} type="file" multiple accept="image/*,video/mp4" onChange={handleFileChange} style={{ display: 'none' }} />
              </div>              <div style={{ background: '#f0f4ff', borderRadius: 10, padding: '14px 16px', marginBottom: 14 }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#1B3A6B', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.3 }}>What to include in your screenshot</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {['Your full name visible on the account', 'Account balance or deposit confirmation', 'Your first bet placed (amount and selection)', 'Date visible on the screenshot'].map(function(tip, i) {
                    return (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#D91E27', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, flexShrink: 0 }}>{i+1}</div>
                        <span style={{ fontSize: 13, color: '#4b5563' }}>{tip}</span>
                      </div>
                    );
                  })}
                </div>
              </div>              {files.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {files.map(function(f, i) {
                    return (
                      <div key={i} style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 8, padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: NAVY }}>{f.name}</div>
                          <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>{(f.size / 1024 / 1024).toFixed(1)} MB</div>
                        </div>
                        <button onClick={function() { removeFile(i); }} style={{ background: '#fee2e2', color: '#991b1b', border: 'none', borderRadius: 6, padding: '4px 10px', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>Remove</button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div style={{ background: WHITE, borderRadius: 16, border: '1px solid #e5e7eb', padding: '24px 28px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', marginBottom: 16 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {CONSENTS.map(function(c) {
                  return (
                    <label key={c.key} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer' }}>
                      <input type="checkbox" checked={consents[c.key]} onChange={function(e) { var val = e.target.checked; setConsents(function(p) { var next = Object.assign({}, p); next[c.key] = val; return next; }); }} style={{ marginTop: 2, width: 16, height: 16, flexShrink: 0, accentColor: NAVY }} />
                      <span style={{ fontSize: 13, color: '#4b5563', lineHeight: 1.5 }}>{c.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>
            {error && <p style={{ color: RED, fontSize: 14, marginBottom: 12, textAlign: 'center', fontWeight: 600 }}>{error}</p>}
            <button onClick={handleSubmit} disabled={uploading} style={{ width: '100%', padding: 16, borderRadius: 12, border: 'none', background: uploading ? '#9ca3af' : RED, color: WHITE, fontSize: 16, fontWeight: 800, cursor: uploading ? 'not-allowed' : 'pointer', textTransform: 'uppercase', letterSpacing: 0.5 }}>
              {uploading ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <span style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid #fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.8s linear infinite' }} />
                  Submitting...
                </span>
              ) : 'Submit Proof'}
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </button>
            <p style={{ fontSize: 12, color: '#9ca3af', textAlign: 'center', marginTop: 16, lineHeight: 1.6 }}>By submitting you agree to our Terms and Privacy Policy. Must be 21+. Gambling problem? Call 1-800-GAMBLER.</p>
          </div>
        )}

      </div>
    </div>
  );
}
