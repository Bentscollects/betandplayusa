'use client'

import { getStateNameFromCode } from '@/lib/utils'
import { sportsbooks } from '@/lib/sportsbooks'

const navy = '#0B2545'
const red = '#E63946'
const lightGray = '#f7f8fb'
const borderGray = '#e5e7eb'

export default function SportsbookStep({
  hostCode,
  availableSportsbooks,
  detectedState,
  selectedSportsbook,
  onSelect,
  onNext
}) {
  // Show all 5 sportsbooks for selection
  const allSportsbooks = sportsbooks

  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      borderRadius: 24,
      border: '1px solid #CBD5E1',
      padding: 32,
      boxShadow: '0 24px 60px rgba(15, 23, 42, 0.08)'
    }}>
      <h2 style={{
        fontSize: 28,
        lineHeight: 1.1,
        marginBottom: 12,
        color: navy
      }}>
        Step 2 — Pick your sportsbook
      </h2>

      <div style={{ marginBottom: 28 }}>
        <div style={{
          display: 'inline-block',
          backgroundColor: '#DCFCE7',
          color: '#166534',
          borderRadius: 999,
          padding: '10px 14px',
          fontSize: 13,
          fontWeight: 700
        }}>
          ✓ {hostCode.venue_name} verified
        </div>
        <p style={{
          marginTop: 16,
          color: '#475569',
          fontSize: 16,
          lineHeight: 1.7
        }}>
          Showing {allSportsbooks.length} sportsbook{allSportsbooks.length !== 1 ? 's' : ''} available in {getStateNameFromCode(detectedState)}
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
        gap: 18,
        marginBottom: 28
      }}>
        {allSportsbooks.map((book) => {
          const isSelected = selectedSportsbook?.id === book.id
          return (
            <div
              key={book.id}
              onClick={() => onSelect(book)}
              style={{
                padding: 24,
                borderRadius: 22,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                border: `2px solid ${isSelected ? navy : borderGray}`,
                backgroundColor: isSelected ? '#F0F9FF' : '#FFFFFF',
                boxShadow: isSelected ? '0 20px 60px rgba(11, 37, 69, 0.12)' : '0 20px 40px rgba(15, 23, 42, 0.05)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
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
                  backgroundColor: book.logoColors.bg
                }}>
                  {book.logo}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    margin: 0,
                    color: navy,
                    fontSize: 20,
                    fontWeight: 700
                  }}>
                    {book.name}
                  </h3>
                  <p style={{
                    margin: '10px 0 0',
                    color: '#475569',
                    fontSize: 15,
                    lineHeight: 1.7
                  }}>
                    {book.offer}
                  </p>
                  {book.requiresPromo && (
                    <p style={{
                      marginTop: 10,
                      color: '#C2410C',
                      fontSize: 13,
                      fontWeight: 700
                    }}>
                      Promo: {book.promoCode}
                    </p>
                  )}
                </div>
                <span style={{
                  fontWeight: 800,
                  color: red,
                  fontSize: 24
                }}>
                  ${book.cpa}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {selectedSportsbook && (
        <button
          onClick={onNext}
          style={{
            width: '100%',
            padding: '16px 20px',
            borderRadius: 16,
            border: 'none',
            backgroundColor: red,
            color: '#FFFFFF',
            fontWeight: 700,
            fontSize: 16,
            cursor: 'pointer',
            boxShadow: '0 18px 35px rgba(230, 57, 70, 0.2)'
          }}
        >
          I've signed up — next step
        </button>
      )}

      <p style={{
        marginTop: 18,
        color: '#64748B',
        fontSize: 14,
        textAlign: 'center'
      }}>
        You'll be taken to the sportsbook in a new tab. Come back here to submit your proof.
      </p>
    </div>
  )
}
