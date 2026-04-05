'use client';
import { useState, useRef } from 'react';

const SPORTSBOOKS = [
  { id: 'fanduel', name: 'FanDuel', initials: 'FD', bg: '#1059a4', text: '#ffffff', offer: 'Bet $5, Get up to $3,000 in Bonus Bets' },
  { id: 'draftkings', name: 'DraftKings', initials: 'DK', bg: '#1a1a2e', text: '#00d4aa', offer: 'Bet $5, Get $200 in Bonus Bets Instantly' },
  { id: 'caesars', name: 'Caesars', initials: 'CS', bg: '#003087', text: '#FFD700', offer: 'Bet $1, Get 10x 100% Profit Boost Tokens' },
  { id: 'fanatics', name: 'Fanatics', initials: 'FA', bg: '#cc0000', text: '#ffffff', offer: 'Bet $5, Get $200 in FanCash Immediately' },
  { id: 'betmgm', name: 'BetMGM', initials: 'BM', bg: '#c9a84c', text: '#1a1a1a', offer: 'First Bet Offer Up to $1,500 in Bonus Bets' },
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
      <div style={{ padding: 40, textAlign: 'center' }}>
        <h2 style={{ color: '#22c55e' }}>You are in!</h2>
        <p>We have received your proof. You will get Telegram access within 24 hours.</p>
        <p style={{ color: '#94a3b8' }}>Confirmation sent to {form.email}</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: 24 }}>
      <h1 style={{ color: '#0B2545' }}>Join via Telegram</h1>

      {step === 1 && (
        <div>
          <h2>Step 1: Choose your sportsbook</h2>
          {SPORTSBOOKS.map(function(book) {
            const selected = selectedBook && selectedBook.id === book.id;
            return (
              <button key={book.id} onClick={function() { setSelectedBook(book); }} style={{ display: 'block', width: '100%', margin: '8px 0', padding: 12, background: selected ? '#0B2545' : '#fff', color: selected ? '#fff' : '#0B2545', border: '2px solid #0B2545', borderRadius: 8, cursor: 'pointer', textAlign: 'left' }}>
                {book.name} - {book.offer}
              </button>
            );
          })}
          <button onClick={function() { if (selectedBook) setStep(2); }} disabled={!selectedBook} style={{ marginTop: 16, padding: '12px 24px', background: '#E63946', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 16 }}>
            Continue
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2>Step 2: Your details</h2>
          <div style={{ marginBottom: 12 }}>
            <label>First name</label><br />
            <input value={form.firstName} onChange={function(e) { var v = e.target.value; setForm(function(p) { return Object.assign({}, p, { firstName: v }); }); }} style={{ width: '100%', padding: 10, marginTop: 4, border: '1px solid #ccc', borderRadius: 6 }} />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label>Last name</label><br />
            <input value={form.lastName} onChange={function(e) { var v = e.target.value; setForm(function(p) { return Object.assign({}, p, { lastName: v }); }); }} style={{ width: '100%', padding: 10, marginTop: 4, border: '1px solid #ccc', borderRadius: 6 }} />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label>Email</label><br />
            <input type="email" value={form.email} onChange={function(e) { var v = e.target.value; setForm(function(p) { return Object.assign({}, p, { email: v }); }); }} style={{ width: '100%', padding: 10, marginTop: 4, border: '1px solid #ccc', borderRadius: 6 }} />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label>Telegram username</label><br />
            <input value={form.telegram} onChange={function(e) { var v = e.target.value; setForm(function(p) { return Object.assign({}, p, { telegram: v }); }); }} placeholder="@username" style={{ width: '100%', padding: 10, marginTop: 4, border: '1px solid #ccc', borderRadius: 6 }} />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button onClick={function() { setStep(1); }} style={{ marginRight: 12, padding: '10px 20px', background: '#fff', border: '1px solid #ccc', borderRadius: 6, cursor: 'pointer' }}>Back</button>
          <button onClick={function() { if (form.firstName && form.lastName && form.email && form.telegram) { setError(''); setStep(3); } else { setError('Please fill in all fields.'); } }} style={{ padding: '10px 20px', background: '#E63946', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>Continue</button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2>Step 3: Upload proof</h2>
          <p>Upload a screenshot of your sportsbook signup and deposit.</p>
          <input type="file" multiple accept="image/*,video/mp4" onChange={handleFileChange} style={{ marginBottom: 12 }} />
          {files.map(function(f, i) {
            return (
              <div key={i} style={{ marginBottom: 8 }}>
                {f.name} <button onClick={function() { removeFile(i); }} style={{ marginLeft: 8, color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>Remove</button>
              </div>
            );
          })}
          <div style={{ marginTop: 16 }}>
            <label><input type="checkbox" checked={consents.age} onChange={function(e) { var v = e.target.checked; setConsents(function(p) { return Object.assign({}, p, { age: v }); }); }} /> I am 21 or older</label><br />
            <label><input type="checkbox" checked={consents.data} onChange={function(e) { var v = e.target.checked; setConsents(function(p) { return Object.assign({}, p, { data: v }); }); }} /> I agree to data processing for 90 days</label><br />
            <label><input type="checkbox" checked={consents.affiliate} onChange={function(e) { var v = e.target.checked; setConsents(function(p) { return Object.assign({}, p, { affiliate: v }); }); }} /> I understand BetAndPlayUSA earns affiliate commission</label><br />
            <label><input type="checkbox" checked={consents.telegram} onChange={function(e) { var v = e.target.checked; setConsents(function(p) { return Object.assign({}, p, { telegram: v }); }); }} /> I agree to join the Telegram group</label>
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div style={{ marginTop: 16 }}>
            <button onClick={function() { setStep(2); }} style={{ marginRight: 12, padding: '10px 20px', background: '#fff', border: '1px solid #ccc', borderRadius: 6, cursor: 'pointer' }}>Back</button>
            <button onClick={handleSubmit} disabled={uploading} style={{ padding: '10px 20px', background: '#E63946', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
              {uploading ? 'Submitting...' : 'Submit proof'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
