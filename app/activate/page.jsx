'use client'

import { useState } from 'react'
import { sportsbooks } from '@/lib/sportsbooks'

const navy = '#0B2545'
const red = '#E63946'
const lightGray = '#f7f8fb'
const white = '#FFFFFF'
const grayText = '#475569'

export default function ActivatePage() {
  const [step, setStep] = useState(1)
  const [hostCode, setHostCode] = useState('')
  const [hostInfo, setHostInfo] = useState(null)
  const [selectedBook, setSelectedBook] = useState(null)
  const [files, setFiles] = useState([])
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [consents, setConsents] = useState({
    age: false,
    data: false,
    affiliate: false
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleValidateCode = async () => {
    if (!hostCode.trim()) {
      setError('Please enter a host code')
      return
    }
    setLoading(true)
    setError('')
    try {
      const response = await fetch('/api/validate-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: hostCode })
      })
      const result = await response.json()
      if (!response.ok || !result.valid) {
        setError('Code not recognised. Please check with your host.')
        setLoading(false)
        return
      }
      setHostInfo(result.venue)
      setStep(2)
    } catch (err) {
      setError('Error validating code')
    }
    setLoading(false)
  }

  const handleSelectBook = (book) => {
    setSelectedBook(book)
  }

  const handleNextToStep3 = () => {
    setStep(3)
  }

  const handleFileUpload = (e) => {
    const newFiles = Array.from(e.target.files || [])
    setFiles(prev => [...prev, ...newFiles])
    setError('')
  }

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleConsentChange = (key) => {
    setConsents(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const handleSubmitForm = async (e) => {
    e.preventDefault()
    setError('')

    if (!firstName.trim() || !lastName.trim()) {
      setError('Please enter your full name')
      return
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email')
      return
    }
    if (files.length < 2) {
      setError('Please upload at least 2 proof files')
      return
    }
    if (!consents.age || !consents.data || !consents.affiliate) {
      setError('Please accept all consent terms')
      return
    }

    setLoading(true)
    try {
      // Create FormData with all form data and files
      const formData = new FormData()
      formData.append('firstName', firstName)
      formData.append('lastName', lastName)
      formData.append('email', email)
      formData.append('hostCode', hostInfo.code)
      formData.append('sportsbook', selectedBook.name)
      formData.append('hostInfo', JSON.stringify(hostInfo))
      formData.append('consents', JSON.stringify(consents))

      // Add all files to FormData
      files.forEach((file, index) => {
        formData.append('files', file)
      })

      const submitResponse = await fetch('/api/submit-activation', {
        method: 'POST',
        body: formData
      })

      const responseData = await submitResponse.json()

      if (!submitResponse.ok) {
        const errorMsg = responseData.error || responseData.details?.join(', ') || 'Submission failed'
        throw new Error(errorMsg)
      }

      if (!responseData.success) {
        throw new Error(responseData.error || 'Submission failed')
      }

      setStep(4)
    } catch (err) {
      console.error('Submission error:', err)
      setError(err.message || 'Error submitting form')
    }
    setLoading(false)
  }

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: lightGray,
      color: '#0F172A'
    }}>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: navy,
        color: white,
        padding: '12px 24px',
        textAlign: 'center',
        fontSize: 14,
        zIndex: 1000
      }}>
        Must be 21+ to participate. Gambling problem? Call 1-800-GAMBLER
      </div>

      <div style={{
        backgroundColor: navy,
        color: white,
        padding: '60px 24px',
        textAlign: 'center',
        marginTop: '56px'
      }}>
        <h1 style={{ fontSize: 36, fontWeight: 800, margin: 0, marginBottom: 12 }}>
          Your cash reward is waiting
        </h1>
        <p style={{ fontSize: 18, color: '#CBD5E1', margin: 0 }}>
          Enter the code from your host to get started
        </p>
      </div>

      <div style={{
        maxWidth: 520,
        margin: '0 auto',
        padding: '40px 24px'
      }}>
        {/* Step 1: Host Code */}
        {step === 1 && (
          <div style={{
            backgroundColor: white,
            borderRadius: 24,
            border: '1px solid #CBD5E1',
            padding: 32,
            boxShadow: '0 24px 60px rgba(15, 23, 42, 0.08)'
          }}>
            <h2 style={{ fontSize: 28, lineHeight: 1.1, marginBottom: 12, color: navy, margin: 0 }}>
              Step 1 — Enter your host code
            </h2>
            <p style={{ marginBottom: 28, color: grayText, fontSize: 16, lineHeight: 1.75, margin: '12px 0 28px' }}>
              Your host will provide a unique code. Enter it below to unlock your reward.
            </p>
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: 'block', marginBottom: 10, fontWeight: 700, color: navy, fontSize: 14 }}>
                Host code
              </label>
              <input
                type="text"
                value={hostCode}
                onChange={(e) => setHostCode(e.target.value)}
                placeholder="e.g., BAR-042"
                style={{
                  width: '100%',
                  padding: '16px 18px',
                  borderRadius: 16,
                  border: '1px solid #CBD5E1',
                  outline: 'none',
                  fontSize: 16,
                  fontWeight: 600,
                  color: '#0F172A',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            {error && (
              <div style={{
                marginBottom: 18,
                backgroundColor: '#FEE2E2',
                border: '1px solid #FECACA',
                borderRadius: 14,
                color: '#991B1B',
                padding: '14px 16px',
                fontSize: 14,
                lineHeight: 1.6
              }}>
                {error}
              </div>
            )}
            <button
              onClick={handleValidateCode}
              disabled={loading || !hostCode.trim()}
              style={{
                width: '100%',
                padding: '16px 20px',
                borderRadius: 16,
                border: 'none',
                backgroundColor: red,
                color: white,
                fontWeight: 700,
                fontSize: 16,
                cursor: loading || !hostCode.trim() ? 'not-allowed' : 'pointer',
                opacity: loading || !hostCode.trim() ? 0.6 : 1,
                boxShadow: '0 18px 35px rgba(230, 57, 70, 0.2)'
              }}
            >
              {loading ? 'Checking…' : 'Unlock'}
            </button>
            <p style={{ marginTop: 20, fontSize: 13, color: '#64748B', textAlign: 'center', margin: '20px 0 0' }}>
              🔒 Your code is validated securely from our database
            </p>
          </div>
        )}

        {step === 2 && hostInfo && (
          <div style={{
            backgroundColor: white,
            borderRadius: 24,
            border: '1px solid #CBD5E1',
            padding: 32,
            boxShadow: '0 24px 60px rgba(15, 23, 42, 0.08)'
          }}>
            <h2 style={{ fontSize: 28, lineHeight: 1.1, marginBottom: 12, color: navy, margin: 0 }}>
              Step 2 — Pick your sportsbook
            </h2>
            <div style={{ marginBottom: 28, marginTop: 12 }}>
              <div style={{
                display: 'inline-block',
                backgroundColor: '#DCFCE7',
                color: '#166534',
                borderRadius: 999,
                padding: '10px 14px',
                fontSize: 13,
                fontWeight: 700,
                marginBottom: 16
              }}>
                ✓ {hostInfo.venue_name} verified
              </div>
              <p style={{ margin: 0, color: grayText, fontSize: 16, lineHeight: 1.7, marginTop: 12 }}>
                Showing {sportsbooks.length} sportsbooks available
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 18, marginBottom: 28 }}>
              {sportsbooks.map(book => {
                const isSelected = selectedBook?.id === book.id
                return (
                  <div
                    key={book.id}
                    onClick={() => handleSelectBook(book)}
                    style={{
                      padding: 24,
                      borderRadius: 22,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 18,
                      border: `2px solid ${isSelected ? navy : '#E2E8F0'}`,
                      backgroundColor: isSelected ? '#F0F9FF' : white,
                      boxShadow: isSelected ? '0 20px 60px rgba(11, 37, 69, 0.12)' : '0 20px 40px rgba(15, 23, 42, 0.05)'
                    }}
                  >
                    <div style={{
                      width: 52,
                      height: 52,
                      borderRadius: 16,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: 16,
                      color: book.logoColors.text,
                      backgroundColor: book.logoColors.bg,
                      flexShrink: 0
                    }}>
                      {book.logo}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ margin: 0, color: navy, fontSize: 20, fontWeight: 700 }}>
                        {book.name}
                      </h3>
                      <p style={{ margin: '10px 0 0', color: grayText, fontSize: 15, lineHeight: 1.7 }}>
                        {book.offer}
                      </p>
                    </div>
                    <span style={{ fontWeight: 800, color: red, fontSize: 24 }}>
                      ${book.cpa}
                    </span>
                  </div>
                )
              })}
            </div>
            {selectedBook && (
              <button
                onClick={handleNextToStep3}
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  borderRadius: 16,
                  border: 'none',
                  backgroundColor: red,
                  color: white,
                  fontWeight: 700,
                  fontSize: 16,
                  cursor: 'pointer',
                  boxShadow: '0 18px 35px rgba(230, 57, 70, 0.2)'
                }}
              >
                I've signed up — next step
              </button>
            )}
            <p style={{ marginTop: 18, color: '#64748B', fontSize: 14, textAlign: 'center', margin: '18px 0 0' }}>
              You'll be taken to the sportsbook in a new tab. Come back here to submit your proof.
            </p>
          </div>
        )}

        {step === 3 && hostInfo && selectedBook && (
          <form onSubmit={handleSubmitForm} style={{
            backgroundColor: white,
            borderRadius: 24,
            border: '1px solid #CBD5E1',
            padding: 32,
            boxShadow: '0 24px 60px rgba(15, 23, 42, 0.08)'
          }}>
            <h2 style={{ fontSize: 28, lineHeight: 1.1, marginBottom: 12, color: navy, margin: 0 }}>
              Step 3 — Your details & proof
            </h2>
            <div style={{
              backgroundColor: '#DBEAFE',
              border: '1px solid #BFDBFE',
              borderRadius: 18,
              padding: 22,
              marginBottom: 28,
              color: '#1E3A8A'
            }}>
              <p style={{ margin: 0, fontWeight: 700, fontSize: 15, marginBottom: 12 }}>📋 Proof requirements:</p>
              <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, lineHeight: 1.8 }}>
                <li>A) Screenshot of new account confirmation from {selectedBook.name}</li>
                <li>B) Bet slip showing minimum $20 deposit and bet</li>
              </ul>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 22 }}>
              <div>
                <label style={{ display: 'block', marginBottom: 10, fontWeight: 700, color: navy, fontSize: 14 }}>
                  First name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="John"
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: 16,
                    border: '1px solid #CBD5E1',
                    outline: 'none',
                    fontSize: 15,
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 10, fontWeight: 700, color: navy, fontSize: 14 }}>
                  Last name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Doe"
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: 16,
                    border: '1px solid #CBD5E1',
                    outline: 'none',
                    fontSize: 15,
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>
            <div style={{ marginBottom: 22 }}>
              <label style={{ display: 'block', marginBottom: 10, fontWeight: 700, color: navy, fontSize: 14 }}>
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  borderRadius: 16,
                  border: '1px solid #CBD5E1',
                  outline: 'none',
                  fontSize: 15,
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <div style={{
              backgroundColor: '#F8FAFC',
              borderRadius: 20,
              border: '1px solid #E2E8F0',
              padding: 20,
              marginBottom: 22
            }}>
              <label style={{ display: 'block', marginBottom: 10, fontWeight: 700, color: navy, fontSize: 14 }}>
                Upload proof (minimum 2 files required)
              </label>
              <div style={{
                border: '2px dashed #CBD5E1',
                borderRadius: 20,
                padding: 28,
                backgroundColor: '#F8FAFC',
                textAlign: 'center',
                cursor: 'pointer'
              }}>
                <input
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/webp,video/mp4,video/quicktime"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                  id="file-upload"
                />
                <label htmlFor="file-upload" style={{ display: 'block', cursor: 'pointer' }}>
                  <div style={{ fontSize: 36, marginBottom: 14 }}>📁</div>
                  <div style={{ fontWeight: 700, color: navy, marginBottom: 6 }}>Drag files here or click to select</div>
                  <div style={{ fontSize: 13, color: '#64748B' }}>JPG, PNG, WebP, MP4, MOV • Max 50MB each</div>
                </label>
              </div>
              {files.length > 0 && (
                <div style={{ marginTop: 18, display: 'grid', gap: 10 }}>
                  {files.map((file, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      backgroundColor: '#DCFCE7',
                      padding: 14,
                      borderRadius: 16,
                      border: '1px solid #D1FAE5'
                    }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: '#166534' }}>✓ {file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile(idx)}
                        style={{
                          border: 'none',
                          background: 'transparent',
                          color: '#BE123C',
                          fontSize: 14,
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div style={{
              display: 'grid',
              gap: 14,
              paddingTop: 18,
              borderTop: '1px solid #E2E8F0',
              marginBottom: 22
            }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={consents.age}
                  onChange={() => handleConsentChange('age')}
                  style={{ width: 20, height: 20, accentColor: red, marginTop: 2 }}
                />
                <span style={{ color: grayText, fontSize: 14, lineHeight: 1.8 }}>
                  I confirm I am 21 or over and physically located in the US in an eligible state
                </span>
              </label>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={consents.data}
                  onChange={() => handleConsentChange('data')}
                  style={{ width: 20, height: 20, accentColor: red, marginTop: 2 }}
                />
                <span style={{ color: grayText, fontSize: 14, lineHeight: 1.8 }}>
                  I agree to my data being collected and processed for verification. Data is held for 90 days.
                </span>
              </label>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={consents.affiliate}
                  onChange={() => handleConsentChange('affiliate')}
                  style={{ width: 20, height: 20, accentColor: red, marginTop: 2 }}
                />
                <span style={{ color: grayText, fontSize: 14, lineHeight: 1.8 }}>
                  I confirm this is a genuine new account. BetAndPlayUSA earns affiliate commission on my signup.
                </span>
              </label>
            </div>
            {error && (
              <div style={{
                backgroundColor: '#FEE2E2',
                border: '1px solid #FECACA',
                borderRadius: 18,
                color: '#991B1B',
                padding: 18,
                fontSize: 14,
                marginBottom: 22
              }}>
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={loading || !firstName.trim() || !lastName.trim() || !email.includes('@') || files.length < 2 || !consents.age || !consents.data || !consents.affiliate}
              style={{
                width: '100%',
                padding: '16px 20px',
                borderRadius: 16,
                border: 'none',
                backgroundColor: red,
                color: white,
                fontWeight: 700,
                fontSize: 16,
                cursor: 'pointer',
                opacity: loading || !firstName.trim() || !lastName.trim() || !email.includes('@') || files.length < 2 || !consents.age || !consents.data || !consents.affiliate ? 0.6 : 1
              }}
            >
              {loading ? 'Submitting…' : 'Submit for review'}
            </button>
            <p style={{ margin: '16px 0 0', color: '#64748B', fontSize: 13, textAlign: 'center' }}>
              We'll review your proof and send your Telegram invite within 24 hours.
            </p>
          </form>
        )}

        {step === 4 && hostInfo && selectedBook && firstName && (
          <div>
            <div style={{
              backgroundColor: white,
              borderRadius: 24,
              border: '1px solid #CBD5E1',
              padding: 32,
              boxShadow: '0 24px 60px rgba(15, 23, 42, 0.08)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: 52, marginBottom: 18 }}>✓</div>
              <h2 style={{ fontSize: 34, margin: 0, color: navy, marginBottom: 14 }}>
                Submission received, {firstName}!
              </h2>
              <p style={{ margin: '0 0 26px', color: grayText, fontSize: 16, lineHeight: 1.8 }}>
                Your proof is being reviewed. You'll receive a confirmation email once approved.
              </p>
              <div style={{
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: 18,
                padding: 22,
                marginBottom: 28,
                color: '#374151'
              }}>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6 }}>
                  Show this screen to your host — they can confirm your submission on the spot, or you'll receive an email confirmation within 24 hours once reviewed.
                </p>
              </div>
              <div style={{
                backgroundColor: navy,
                color: white,
                borderRadius: 18,
                padding: 22,
                marginBottom: 28,
                textAlign: 'left'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                  <span style={{ color: '#CBD5E1' }}>Sportsbook</span>
                  <span style={{ fontWeight: 700 }}>{selectedBook.name}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  <span style={{ color: '#CBD5E1' }}>Status</span>
                  <span style={{ backgroundColor: '#FBBF24', color: navy, borderRadius: 999, padding: '4px 12px', fontWeight: 700, fontSize: 13 }}>
                    Under review
                  </span>
                </div>
              </div>
            </div>

            <div style={{
              backgroundColor: '#DBEAFE',
              border: '1px solid #BFDBFE',
              borderRadius: 24,
              padding: 28,
              boxShadow: '0 20px 45px rgba(59, 130, 246, 0.11)',
              marginTop: 24
            }}>
              <div style={{ display: 'flex', gap: 16, marginBottom: 20, alignItems: 'flex-start' }}>
                <div style={{ fontSize: 38 }}>💬</div>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <h3 style={{ margin: 0, fontSize: 25, color: navy, marginBottom: 8 }}>
                    Want free expert picks too?
                  </h3>
                  <p style={{ margin: 0, color: grayText, lineHeight: 1.75 }}>
                    Join our private Telegram betting group — daily tips, live alerts, members-only odds. Free with your signup.
                  </p>
                </div>
              </div>
              <div style={{ display: 'grid', gap: 14 }}>
                <input
                  type="email"
                  value={email}
                  disabled
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: 16,
                    border: '1px solid #BFDBFE',
                    outline: 'none',
                    fontSize: 15,
                    backgroundColor: '#F0F9FF',
                    boxSizing: 'border-box'
                  }}
                />
                <button
                  onClick={() => window.location.href = 'https://t.me/betandplayusa'}
                  style={{
                    width: '100%',
                    padding: '14px 18px',
                    borderRadius: 16,
                    border: 'none',
                    backgroundColor: '#2563EB',
                    color: white,
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Already on Telegram? Join now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
