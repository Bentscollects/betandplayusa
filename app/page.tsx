'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { sportsbooks, getSportsBooksByState, getAllAvailableStates } from '@/lib/sportsbooks'
import { detectUserState, getStateNameFromCode } from '@/lib/utils'

const brandNavy = '#0B2545'
const brandRed = '#E63946'
const brandDark = '#07182e'
const brandMid = '#0a1e38'
const white = '#ffffff'
const lightGray = '#f7f8fb'
const grayText = '#4b5563'
const darkText = '#111827'

const styles = {
  page: {
    width: '100%',
    backgroundColor: lightGray,
    color: darkText,
  },
  hero: {
    backgroundColor: brandNavy,
    color: white,
    padding: '80px 24px',
    textAlign: 'center' as const,
  },
  heroContainer: {
    maxWidth: 960,
    margin: '0 auto',
  },
  heroTitle: {
    fontSize: 48,
    fontWeight: 800,
    lineHeight: 1.05,
    marginBottom: 20,
  },
  heroCopy: {
    fontSize: 20,
    color: '#dbe4f0',
    marginBottom: 30,
    maxWidth: 700,
    marginLeft: 'auto',
    marginRight: 'auto',
    lineHeight: 1.6,
  },
  heroButtons: {
    display: 'inline-flex',
    flexWrap: 'wrap' as const,
    justifyContent: 'center',
    gap: 16,
  },
  buttonPrimary: {
    display: 'inline-block',
    backgroundColor: brandRed,
    color: white,
    padding: '14px 28px',
    borderRadius: 12,
    fontWeight: 700,
    textDecoration: 'none',
    boxShadow: '0 18px 30px rgba(230,57,70,0.18)',
  },
  buttonSecondary: {
    display: 'inline-block',
    color: white,
    border: '2px solid rgba(255,255,255,0.9)',
    padding: '14px 28px',
    borderRadius: 12,
    fontWeight: 700,
    textDecoration: 'none',
  },
  statesBar: {
    backgroundColor: brandDark,
    color: white,
    padding: '18px 24px',
  },
  statesInner: {
    maxWidth: 1200,
    margin: '0 auto',
    display: 'flex',
    flexWrap: 'wrap' as const,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  statePill: {
    backgroundColor: brandNavy,
    padding: '8px 14px',
    borderRadius: 9999,
    fontSize: 12,
    fontWeight: 700,
    color: white,
    cursor: 'default' as const,
  },
  section: {
    padding: '72px 24px',
    maxWidth: 1200,
    margin: '0 auto',
  },
  sectionHeader: {
    fontSize: 36,
    fontWeight: 800,
    marginBottom: 32,
    color: brandNavy,
    textAlign: 'center' as const,
  },
  grid4: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: 24,
  },
  stepCard: {
    backgroundColor: white,
    borderRadius: 24,
    padding: 28,
    boxShadow: '0 18px 50px rgba(15,23,42,0.08)',
    textAlign: 'center' as const,
  },
  stepBadge: {
    width: 64,
    height: 64,
    borderRadius: '50%',
    backgroundColor: brandRed,
    color: white,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 22,
    fontWeight: 800,
    marginBottom: 18,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: brandNavy,
    marginBottom: 10,
  },
  stepText: {
    fontSize: 15,
    lineHeight: 1.7,
    color: grayText,
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: 20,
  },
  card: {
    backgroundColor: white,
    borderRadius: 24,
    border: '1px solid #e5e7eb',
    padding: 24,
    boxShadow: '0 20px 45px rgba(15,23,42,0.08)',
    display: 'flex',
    flexDirection: 'column' as const,
    minHeight: 260,
  },
  cardLogo: {
    width: 56,
    height: 56,
    borderRadius: 18,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: white,
    fontWeight: 800,
    fontSize: 20,
    marginBottom: 18,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 800,
    marginBottom: 12,
    color: brandNavy,
  },
  cardOffer: {
    fontSize: 15,
    lineHeight: 1.75,
    color: grayText,
    marginBottom: 18,
    flex: 1,
  },
  cardBadge: {
    display: 'inline-block',
    backgroundColor: '#d1fae5',
    color: '#065f46',
    borderRadius: 9999,
    padding: '6px 12px',
    fontWeight: 700,
    fontSize: 13,
    marginBottom: 14,
  },
  cardCpa: {
    fontSize: 30,
    fontWeight: 800,
    color: brandRed,
    marginBottom: 20,
  },
  cardButton: {
    backgroundColor: brandRed,
    color: white,
    border: 'none',
    borderRadius: 14,
    padding: '14px 20px',
    fontWeight: 700,
    textDecoration: 'none',
    textAlign: 'center' as const,
  },
  statsSection: {
    backgroundColor: brandMid,
    color: white,
    padding: '72px 24px',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: 24,
    textAlign: 'center' as const,
  },
  statsValue: {
    fontSize: 48,
    fontWeight: 800,
    marginBottom: 10,
  },
  statsLabel: {
    fontSize: 16,
    color: '#d1d5db',
  },
  infoBanner: {
    backgroundColor: brandDark,
    color: white,
    padding: '56px 24px',
    textAlign: 'center' as const,
  },
  infoTitle: {
    fontSize: 24,
    fontWeight: 800,
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    color: '#dbe4f0',
    lineHeight: 1.8,
    maxWidth: 700,
    margin: '0 auto',
  },
}

export default function HomePage() {
  const [detectedState, setDetectedState] = useState<string | null>(null)
  const [availableSportsbooks, setAvailableSportsbooks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const allStates = getAllAvailableStates()

  useEffect(() => {
    async function getState() {
      const state = await detectUserState()
      setDetectedState(state)

      const normalizedState = state?.toUpperCase() || ''
      const books = getAllAvailableStates().includes(normalizedState)
        ? getSportsBooksByState(normalizedState)
        : sportsbooks

      setAvailableSportsbooks(books)
      setLoading(false)
    }
    getState()
  }, [])

  return (
    <div style={styles.page}>
      <section style={styles.hero}>
        <div style={styles.heroContainer}>
          <h1 style={styles.heroTitle}>Bet smarter. Get rewarded.</h1>
          <p style={styles.heroCopy}>
            Find the best sportsbook available in your state and earn cash rewards for signing up.
          </p>
          <div style={styles.heroButtons}>
            <a href="#sportsbooks" style={styles.buttonPrimary}>Find my sportsbook</a>
            <a href="#how-it-works" style={styles.buttonSecondary}>How it works</a>
          </div>
        </div>
      </section>

      <section style={styles.statesBar}>
        <div style={styles.statesInner}>
          <span style={{ color: '#dbe4f0', fontWeight: 600, whiteSpace: 'nowrap' }}>📍 Legal in:</span>
          {allStates.map((state) => (
            <span key={state} style={styles.statePill}>{state}</span>
          ))}
        </div>
      </section>

      <section id="how-it-works" style={{ ...styles.section, backgroundColor: white }}>
        <h2 style={styles.sectionHeader}>How it works</h2>
        <div style={styles.grid4}>
          {[
            { num: 1, title: 'Scan code', desc: 'Find our QR code at a participating venue' },
            { num: 2, title: 'Pick sportsbook', desc: 'Choose from top US sportsbooks' },
            { num: 3, title: 'Sign up & bet', desc: 'Create account and place your first wager' },
            { num: 4, title: 'Collect reward', desc: 'Submit your proof and claim cash back' },
          ].map((step) => (
            <div key={step.num} style={styles.stepCard}>
              <div style={styles.stepBadge}>{step.num}</div>
              <div style={styles.stepTitle}>{step.title}</div>
              <p style={styles.stepText}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="sportsbooks" style={styles.section}>
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <h2 style={styles.sectionHeader}>Available sportsbooks</h2>
          {detectedState ? (
            allStates.includes(detectedState.toUpperCase()) ? (
              <p style={{ fontSize: 17, color: grayText, textAlign: 'center', marginBottom: 36 }}>
                Showing sportsbooks available in <span style={{ fontWeight: 700, color: brandNavy }}>{getStateNameFromCode(detectedState)}</span>
              </p>
            ) : (
              <p style={{ fontSize: 17, color: grayText, textAlign: 'center', marginBottom: 36 }}>
                Showing all available sportsbooks
              </p>
            )
          ) : (
            <p style={{ fontSize: 17, color: grayText, textAlign: 'center', marginBottom: 36 }}>Loading available sportsbooks for your state…</p>
          )}

          {loading ? (
            <div style={{ textAlign: 'center', padding: 60 }}>
              <p style={{ color: grayText }}>Loading sportsbooks...</p>
            </div>
          ) : (
            <div style={styles.cardGrid}>
              {availableSportsbooks.map((book) => (
                <div key={book.id} style={styles.card}>
                  <div style={{ ...styles.cardLogo, backgroundColor: book.logoColors.bg, color: book.logoColors.text }}>
                    {book.logo}
                  </div>
                  <div style={styles.cardTitle}>{book.name}</div>
                  <div style={styles.cardOffer}>{book.offer}</div>
                  <a href={book.affiliateLink || '#'} style={styles.cardButton} target="_blank" rel="noreferrer">
                    Claim offer
                  </a>
                </div>
              ))}
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <Link href="/sportsbooks" style={{ color: brandRed, fontWeight: 700, textDecoration: 'none', fontSize: 17 }}>
              View all sportsbooks →
            </Link>
          </div>
        </div>
      </section>

      <section style={styles.statsSection}>
        <div style={styles.statsGrid}>
          {[
            { value: '30+', label: 'Legal States' },
            { value: '5', label: 'Top Sportsbooks' },
            { value: '$500+', label: 'Max Rewards' },
            { value: '21+', label: 'Age Required' },
          ].map((item) => (
            <div key={item.label}>
              <div style={styles.statsValue}>{item.value}</div>
              <div style={styles.statsLabel}>{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={styles.infoBanner}>
        <h2 style={styles.infoTitle}>Only show betting options available where you are</h2>
        <p style={styles.infoText}>
          We detect your state to display eligible sportsbook offers, rewards, and legal options. This ensures the experience is accurate and compliant for your area.
        </p>
      </section>
    </div>
  )
}
