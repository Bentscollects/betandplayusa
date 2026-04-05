'use client';
import { useState, useRef } from 'react';

const SPORTSBOOKS = [
  { id: 'fanduel', name: 'FanDuel', initials: 'FD', bg: '#1059a4', text: '#ffffff', offer: 'Bet $5, Get up to $3,000 in Bonus Bets', logo: '/fanduel.png' },
  { id: 'draftkings', name: 'DraftKings', initials: 'DK', bg: '#1a1a2e', text: '#00d4aa', offer: 'Bet $5, Get $200 in Bonus Bets Instantly', logo: '/draftkings.png' },
  { id: 'caesars', name: 'Caesars', initials: 'CS', bg: '#003087', text: '#FFD700', offer: 'Bet $1, Get 10x 100% Profit Boost Tokens', logo: '/caesars.png' },
  { id: 'fanatics', name: 'Fanatics', initials: 'FA', bg: '#cc0000', text: '#ffffff', offer: 'Bet $5, Get $200 in FanCash Immediately', logo: '/fanatics.png' },
  { id: 'betmgm', name: 'BetMGM', initials: 'BM', bg: '#c9a84c', text: '#1a1a1a', offer: 'First Bet Offer Up to $1,500 in Bonus Bets', logo: '/betmgm.png' },
];

const CONSENTS = [
  { key: 'age', label: 'I confirm I am 21 years of age or older' },
  { key: 'data', label: 'I agree to my data being held securely for verification purposes for 90 days' },
  { key: 'affiliate', label: 'I understand BetAndPlayUSA earns an affiliate commission from my signup' },
  { key: 'telegram', label: 'I agree to be added to the BetAndPlayUSA Telegram group' },
];

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
      <div style={{ minHeight: '100vh', background: '#f8f9fb', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div style={{ background: '#fff', borderRadius: 20, padding: '48px 32px', maxWidth: 440, width: '100%', textAlign: 'center', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
          <div style={{ width: 72, height: 72, background: '#22c55e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: 36, color: '#fff', fontWeight: 700 }}>✓</div>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0B2545', marginBottom: 12, marginTop: 0 }}>You are in!</h2>
          <p style={{ color: '#64748b', marginBottom: 24, lineHeight: 1.6 }}>We have received your proof. You will get Telegram access within 24 hours of approval.</p>
          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 12, padding: 16, marginBottom: 24 }}>
            <p style={{ fontSize: 14, color: '#166534', margin: 0 }}>Check @{form.telegram} on Telegram for your invite once approved.</p>
          </div>
          <p style={{ fontSize: 13, color: '#94a3b8', margin: 0 }}>Confirmation email sent to {form.email}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fb' }}>
      <div style={{ background: '#0B2545', padding: '52px 24px 60px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(ellipse at 70% 0%, rgba(230,57,70,0.18) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', maxWidth: 520, margin: '0 auto' }}>
          <div style={{ display: 'inline-block', background: '#E63946', color: '#fff', fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', padding: '5px 14px', borderRadius: 20, marginBottom: 20 }}>Exclusive Offer</div>
          <h1 style={{ fontSize: 'clamp(28px, 6vw, 42px)', fontWeight: 800, color: '#fff', margin: '0 0 16px', lineHeight: 1.15 }}>Sign up. Bet. Get rewarded.</h1>
          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 15, margin: '0 0 28px', lineHeight: 1.6 }}>Join a sportsbook through us, upload your proof, and unlock our premium Telegram betting tips group free.</p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            {['Expert daily picks', 'Instant Telegram access', '100% free to join'].map(function(v) {
              return <div key={v} style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 20, padding: '7px 16px', fontSize: 13, color: 'rgba(255,255,255,0.88)', fontWeight: 500 }}>{v}</div>;
            })}
          </div>
        </div>
      </div>
      <div style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '14px 24px' }}>
        <div style={{ maxWidth: 520, margin: '0 auto', display: 'flex', alignItems: 'center' }}>
          {[1, 2, 3].map(function(s, i) {
            return (
              <div key={s} style={{ display: 'flex', alignItems: 'center', flex: i < 2 ? 1 : 'none' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0, background: step > s ? '#22c55e' : step === s ? '#0B2545' : '#e2e8f0', color: step > s ? '#fff' : step === s ? '#fff' : '#94a3b8' }}>
                  {step > s ? 'v' : s}
                </div>
                <span style={{ fontSize: 12, color: step >= s ? '#0B2545' : '#94a3b8', fontWeight: step === s ? 600 : 400, marginLeft: 6, whiteSpace: 'nowrap' }}>
                  {s === 1 ? 'Pick sportsbook' : s === 2 ? 'Your details' : 'Upload proof'}
                </span>
                {i < 2 && <div style={{ flex: 1, height: 2, background: step > s ? '#22c55e' : '#e2e8f0', margin: '0 10px' }} />}
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ maxWidth: 520, margin: '0 auto', padding: '28px 16px 60px' }}>
        {step === 1 && (
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0B2545', margin: '0 0 6px' }}>Choose your sportsbook</h2>
            <p style={{ color: '#64748b', fontSize: 14, margin: '0 0 20px' }}>Pick the sportsbook you will sign up with. New customers only.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {SPORTSBOOKS.map(function(book) {
                const selected = selectedBook && selectedBook.id === book.id;
                return (
                  <button key={book.id} onClick={function() { setSelectedBook(book); }} style={{ background: '#fff', border: selected ? '2px solid #0B2545' : '2px solid #e2e8f0', borderRadius: 14, padding: '14px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left', width: '100%', boxShadow: selected ? '0 0 0 3px rgba(11,37,69,0.08)' : 'none' }}>
                    <div style={{ width: 46, height: 46, borderRadius: 10, background: book.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden', padding: 5, boxSizing: 'border-box' }}>
                      <img src={book.logo} alt={book.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, color: '#0B2545', fontSize: 15 }}>{book.name}</div>
                      <div style={{ color: '#64748b', fontSize: 13, marginTop: 2 }}>{book.offer}</div>
                    </div>
                    {selected && <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#0B2545', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, flexShrink: 0 }}>v</div>}
                  </button>
                );
              })}
            </div>
            <button onClick={function() { if (selectedBook) setStep(2); }} disabled={!selectedBook} style={{ width: '100%', marginTop: 20, padding: 16, borderRadius: 12, border: 'none', background: selectedBook ? '#E63946' : '#e2e8f0', color: selectedBook ? '#fff' : '#94a3b8', fontSize: 16, fontWeight: 700, cursor: selectedBook ? 'pointer' : 'not-allowed' }}>
              Continue
            </button>
          </div>
        )}
        {step === 2 && (
          <div>
            <button onClick={function() { setStep(1); }} style={{ background: 'none', border: 'none', color: '#64748b', fontSize: 14, cursor: 'pointer', marginBottom: 20, padding: 0 }}>Back</button>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0B2545', margin: '0 0 6px' }}>Your details</h2>
            <p style={{ color: '#64748b', fontSize: 14, margin: '0 0 20px' }}>We will send your Telegram invite and confirmation here.</p>
            {selectedBook && (
              <div style={{ background: '#f0f4ff', borderRadius: 12, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                <div style={{ width: 46, height: 46, borderRadius: 10, background: selectedBook.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden', padding: 5, boxSizing: 'border-box' }}>
                  <img src={selectedBook.logo} alt={selectedBook.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#0B2545' }}>{selectedBook.name}</div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>{selectedBook.offer}</div>
                </div>
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>First name</label>
                  <input value={form.firstName} onChange={function(e) { var v = e.target.value; setForm(function(p) { return Object.assign({}, p, { firstName: v }); }); }} placeholder="John" style={{ width: '100%', padding: 12, border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: 15, boxSizing: 'border-box', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Last name</label>
                  <input value={form.lastName} onChange={function(e) { var v = e.target.value; setForm(function(p) { return Object.assign({}, p, { lastName: v }); }); }} placeholder="Smith" style={{ width: '100%', padding: 12, border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: 15, boxSizing: 'border-box', outline: 'none' }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Email address</label>
                <input type="email" value={form.email} onChange={function(e) { var v = e.target.value; setForm(function(p) { return Object.assign({}, p, { email: v }); }); }} placeholder="john@example.com" style={{ width: '100%', padding: 12, border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: 15, boxSizing: 'border-box', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Telegram username</label>
                <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #e2e8f0', borderRadius: 10, overflow: 'hidden' }}>
                  <span style={{ background: '#f8f9fb', padding: '12px 12px', fontSize: 15, color: '#64748b', borderRight: '1.5px solid #e2e8f0', fontWeight: 600 }}>@</span>
                  <input value={form.telegram} onChange={function(e) { var v = e.target.value; setForm(function(p) { return Object.assign({}, p, { telegram: v }); }); }} placeholder="username" style={{ flex: 1, padding: 12, border: 'none', fontSize: 15, outline: 'none' }} />
                </div>
              </div>
            </div>
            {error && <p style={{ color: '#E63946', fontSize: 14, marginTop: 12, textAlign: 'center' }}>{error}</p>}
            <button onClick={function() { if (form.firstName && form.lastName && form.email && form.telegram) { setError(''); setStep(3); } else { setError('Please fill in all fields.'); } }} style={{ width: '100%', marginTop: 20, padding: 16, borderRadius: 12, border: 'none', background: '#E63946', color: '#fff', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>
              Continue
            </button>
          </div>
        )}
        {step === 3 && (
          <div>
            <button onClick={function() { setStep(2); }} style={{ background: 'none', border: 'none', color: '#64748b', fontSize: 14, cursor: 'pointer', marginBottom: 20, padding: 0 }}>Back</button>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0B2545', margin: '0 0 6px' }}>Upload your proof</h2>
            <p style={{ color: '#64748b', fontSize: 14, margin: '0 0 20px' }}>Upload a screenshot showing your sportsbook account and first deposit or bet.</p>
            <div onClick={function() { fileInputRef.current && fileInputRef.current.click(); }} style={{ border: '2px dashed #cbd5e1', borderRadius: 14, padding: '36px 20px', textAlign: 'center', cursor: 'pointer', background: '#f8f9fb', marginBottom: 16 }}>
              <div style={{ fontSize: 36, marginBottom: 10 }}>+</div>
              <div style={{ fontWeight: 700, color: '#0B2545', marginBottom: 4, fontSize: 15 }}>Tap to upload screenshots</div>
              <div style={{ fontSize: 13, color: '#94a3b8' }}>JPG, PNG or MP4 - Max 5 files - 50MB each</div>
              <input ref={fileInputRef} type="file" multiple accept="image/*,video/mp4" onChange={handleFileChange} style={{ display: 'none' }} />
            </div>
            {files.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
                {files.map(function(f, i) {
                  return (
                    <div key={i} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10, padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#0B2545' }}>{f.name}</div>
                        <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>{(f.size / 1024 / 1024).toFixed(1)} MB</div>
                      </div>
                      <button onClick={function() { removeFile(i); }} style={{ background: '#fee2e2', color: '#991b1b', border: 'none', borderRadius: 6, padding: '5px 12px', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>Remove</button>
                    </div>
                  );
                })}
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
              {CONSENTS.map(function(c) {
                return (
                  <label key={c.key} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer' }}>
                    <input type="checkbox" checked={consents[c.key]} onChange={function(e) { var val = e.target.checked; setConsents(function(p) { var next = Object.assign({}, p); next[c.key] = val; return next; }); }} style={{ marginTop: 2, width: 16, height: 16, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: '#374151', lineHeight: 1.5 }}>{c.label}</span>
                  </label>
                );
              })}
            </div>
            {error && <p style={{ color: '#E63946', fontSize: 14, marginBottom: 16, textAlign: 'center' }}>{error}</p>}
            <button onClick={handleSubmit} disabled={uploading} style={{ width: '100%', padding: 16, borderRadius: 12, border: 'none', background: uploading ? '#94a3b8' : '#E63946', color: '#fff', fontSize: 16, fontWeight: 700, cursor: uploading ? 'not-allowed' : 'pointer' }}>
              {uploading ? 'Submitting...' : 'Submit proof'}
            </button>
            <p style={{ fontSize: 12, color: '#94a3b8', textAlign: 'center', marginTop: 16, lineHeight: 1.6 }}>By submitting you agree to our Terms and Privacy Policy. Must be 21+. Gambling problem? Call 1-800-GAMBLER.</p>
          </div>
        )}
      </div>
    </div>
  );
}
