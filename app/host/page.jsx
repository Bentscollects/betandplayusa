'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const navy = '#0B2545'
const red = '#E63946'
const lightGray = '#F8FAFC'
const green = '#10B981'

// Create Supabase client for signed URLs
const supabase = createClient(
  'https://pnloiztluwwzznotbejg.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBubG9penRsdXd3enpub3RiZWpnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTI5OTM3NywiZXhwIjoyMDkwODc1Mzc3fQ.PufBrjpwsNosGHWSK1CK9m-vSOB757vzAsdfy5JUONc'
)

export default function HostPortal() {
  const [hostCode, setHostCode] = useState('')
  const [hostInfo, setHostInfo] = useState(null)
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [verifyModal, setVerifyModal] = useState(null)
  const [verifyNotes, setVerifyNotes] = useState('')

  // Function to generate signed URLs for files
  const generateSignedUrls = async (fileUrls) => {
    if (!fileUrls || !Array.isArray(fileUrls)) return []

    const signedUrls = []
    for (const url of fileUrls) {
      try {
        // Extract file path from full URL (everything after 'proof-uploads/')
        let filePath = ''
        if (url.startsWith('http')) {
          const urlParts = url.split('/proof-uploads/')
          if (urlParts.length > 1) {
            filePath = urlParts[1]
          }
        } else {
          // If it's just a filename, assume it's in the submissions folder
          filePath = `submissions/${url}`
        }

        if (filePath) {
          const { data, error } = await supabase.storage
            .from('proof-uploads')
            .createSignedUrl(filePath, 3600) // 1 hour expiry

          if (error) {
            console.error('Error generating signed URL for', filePath, error)
            signedUrls.push(null) // Keep null for failed URLs
          } else {
            signedUrls.push(data.signedUrl)
          }
        } else {
          signedUrls.push(null)
        }
      } catch (err) {
        console.error('Error processing file URL:', url, err)
        signedUrls.push(null)
      }
    }
    return signedUrls
  }

  const handleCodeSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Validate host code
      const validateRes = await fetch('/api/validate-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: hostCode })
      })

      const validateData = await validateRes.json()

      if (!validateData.valid) {
        setError('Invalid host code')
        setLoading(false)
        return
      }

      setHostInfo(validateData.venue)

      // Fetch submissions from last 7 days
      const submissionsRes = await fetch(`/api/host-submissions?hostCode=${encodeURIComponent(hostCode)}`)
      const submissionsData = await submissionsRes.json()

      if (submissionsData.error) {
        setError(submissionsData.error)
      } else {
        // Generate signed URLs for all files in submissions
        const submissionsWithSignedUrls = await Promise.all(
          (submissionsData.submissions || []).map(async (sub) => {
            if (sub.file_urls && Array.isArray(sub.file_urls)) {
              const signedUrls = await generateSignedUrls(sub.file_urls)
              return { ...sub, signedFileUrls: signedUrls }
            }
            return sub
          })
        )
        setSubmissions(submissionsWithSignedUrls)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleMarkVerifiedClick = (submission) => {
    setVerifyModal(submission)
    setVerifyNotes('')
  }

  const handleConfirmVerify = async () => {
    if (!verifyModal) return

    try {
      const res = await fetch(`/api/verify-submission`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionId: verifyModal.id,
          notes: verifyNotes
        })
      })

      const data = await res.json()

      if (data.error) {
        alert(`Error: ${data.error}`)
        return
      }

      // Update local submission
      setSubmissions(submissions.map(sub =>
        sub.id === verifyModal.id ? { ...sub, status: 'host_verified' } : sub
      ))
      setVerifyModal(null)
      setVerifyNotes('')
    } catch (err) {
      alert(`Error: ${err.message}`)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const getStats = () => {
    return {
      total: submissions.length,
      pending: submissions.filter(s => s.status === 'pending').length,
      verified: submissions.filter(s => s.status === 'host_verified').length
    }
  }

  if (!hostInfo) {
    return (
      <div style={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: lightGray,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '60px 40px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          maxWidth: '400px',
          width: '100%'
        }}>
          <h1 style={{
            fontSize: 28,
            fontWeight: 700,
            color: navy,
            margin: '0 0 30px 0',
            textAlign: 'center'
          }}>
            Host Portal
          </h1>

          <form onSubmit={handleCodeSubmit} style={{ width: '100%' }}>
            <label style={{
              display: 'block',
              fontSize: 14,
              fontWeight: 600,
              color: navy,
              marginBottom: 8
            }}>
              Host Code
            </label>
            <input
              type="text"
              value={hostCode}
              onChange={(e) => setHostCode(e.target.value.toUpperCase())}
              placeholder="Enter your host code"
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: 16,
                border: '2px solid #E2E8F0',
                borderRadius: 8,
                marginBottom: 20,
                boxSizing: 'border-box',
                fontFamily: 'inherit'
              }}
            />

            {error && (
              <div style={{
                backgroundColor: '#FEE2E2',
                color: red,
                padding: '12px 16px',
                borderRadius: 8,
                marginBottom: 20,
                fontSize: 14
              }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px 20px',
                backgroundColor: loading ? '#CBD5E1' : navy,
                color: 'white',
                border: 'none',
                borderRadius: 8,
                fontSize: 16,
                fontWeight: 600,
                cursor: loading ? 'default' : 'pointer',
                opacity: loading ? 0.6 : 1,
                transition: 'opacity 0.2s'
              }}
            >
              {loading ? 'Loading...' : 'Enter Portal'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  const stats = getStats()

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: lightGray,
      padding: '40px 20px'
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          backgroundColor: navy,
          color: 'white',
          padding: '30px',
          borderRadius: '12px 12px 0 0',
          marginBottom: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h1 style={{
              fontSize: 28,
              fontWeight: 700,
              margin: '0 0 8px 0'
            }}>
              {hostInfo.venue_name}
            </h1>
            <p style={{
              fontSize: 14,
              color: '#CBD5E1',
              margin: 0
            }}>
              Code: {hostCode}
            </p>
          </div>
          <button
            onClick={() => {
              setHostInfo(null)
              setHostCode('')
              setSubmissions([])
              setError('')
            }}
            style={{
              padding: '10px 20px',
              backgroundColor: 'rgba(255,255,255,0.2)',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: 6,
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 600
            }}
          >
            Sign Out
          </button>
        </div>

        {/* Summary Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
          }}>
            <div style={{
              fontSize: 12,
              fontWeight: 600,
              color: '#64748B',
              marginBottom: 8,
              textTransform: 'uppercase',
              letterSpacing: 0.5
            }}>
              Total Submissions
            </div>
            <div style={{
              fontSize: 32,
              fontWeight: 700,
              color: navy
            }}>
              {stats.total}
            </div>
            <div style={{
              fontSize: 12,
              color: '#94A3B8',
              marginTop: 8
            }}>
              Last 7 days
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            borderLeft: `4px solid #FCD34D`
          }}>
            <div style={{
              fontSize: 12,
              fontWeight: 600,
              color: '#64748B',
              marginBottom: 8,
              textTransform: 'uppercase',
              letterSpacing: 0.5
            }}>
              Pending Review
            </div>
            <div style={{
              fontSize: 32,
              fontWeight: 700,
              color: '#92400E'
            }}>
              {stats.pending}
            </div>
            <div style={{
              fontSize: 12,
              color: '#94A3B8',
              marginTop: 8
            }}>
              Awaiting verification
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            borderLeft: `4px solid ${green}`
          }}>
            <div style={{
              fontSize: 12,
              fontWeight: 600,
              color: '#64748B',
              marginBottom: 8,
              textTransform: 'uppercase',
              letterSpacing: 0.5
            }}>
              Verified
            </div>
            <div style={{
              fontSize: 32,
              fontWeight: 700,
              color: '#065F46'
            }}>
              {stats.verified}
            </div>
            <div style={{
              fontSize: 12,
              color: '#94A3B8',
              marginTop: 8
            }}>
              Host verified
            </div>
          </div>
        </div>

        {/* Submissions List */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          {submissions.length === 0 ? (
            <div style={{
              padding: '60px 40px',
              textAlign: 'center',
              color: '#64748B'
            }}>
              <p style={{ fontSize: 16, margin: 0 }}>
                No submissions in the last 7 days
              </p>
            </div>
          ) : (
            <div style={{
              overflowX: 'auto'
            }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: 14
              }}>
                <thead>
                  <tr style={{
                    backgroundColor: '#F1F5F9',
                    borderBottom: '2px solid #E2E8F0'
                  }}>
                    <th style={{
                      padding: '16px 20px',
                      textAlign: 'left',
                      fontWeight: 600,
                      color: navy
                    }}>
                      Name
                    </th>
                    <th style={{
                      padding: '16px 20px',
                      textAlign: 'left',
                      fontWeight: 600,
                      color: navy
                    }}>
                      Email
                    </th>
                    <th style={{
                      padding: '16px 20px',
                      textAlign: 'left',
                      fontWeight: 600,
                      color: navy
                    }}>
                      Sportsbook
                    </th>
                    <th style={{
                      padding: '16px 20px',
                      textAlign: 'left',
                      fontWeight: 600,
                      color: navy
                    }}>
                      Submitted
                    </th>
                    <th style={{
                      padding: '16px 20px',
                      textAlign: 'left',
                      fontWeight: 600,
                      color: navy
                    }}>
                      Files
                    </th>
                    <th style={{
                      padding: '16px 20px',
                      textAlign: 'left',
                      fontWeight: 600,
                      color: navy
                    }}>
                      Status
                    </th>
                    <th style={{
                      padding: '16px 20px',
                      textAlign: 'center',
                      fontWeight: 600,
                      color: navy
                    }}>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((sub, idx) => (
                    <tr
                      key={sub.id}
                      style={{
                        borderBottom: '1px solid #E2E8F0',
                        backgroundColor: idx % 2 === 0 ? 'white' : '#F9FAFB'
                      }}
                    >
                      <td style={{
                        padding: '16px 20px',
                        color: navy,
                        fontWeight: 500
                      }}>
                        {sub.first_name} {sub.last_name}
                      </td>
                      <td style={{
                        padding: '16px 20px',
                        color: '#475569',
                        fontSize: 13
                      }}>
                        <a href={`mailto:${sub.email}`} style={{
                          color: navy,
                          textDecoration: 'none',
                          borderBottom: '1px solid #CBD5E1'
                        }}>
                          {sub.email}
                        </a>
                      </td>
                      <td style={{
                        padding: '16px 20px',
                        color: '#475569'
                      }}>
                        {sub.sportsbook}
                      </td>
                      <td style={{
                        padding: '16px 20px',
                        color: '#64748B',
                        fontSize: 13
                      }}>
                        {formatDate(sub.created_at)}
                      </td>
                      <td style={{
                        padding: '16px 20px',
                        color: '#475569'
                      }}>
                        {sub.file_urls && Array.isArray(sub.file_urls) && sub.file_urls.length > 0 ? (
                          <div>
                            {sub.file_urls.map((url, i) => {
                              const signedUrl = sub.signedFileUrls?.[i]
                              return (
                                <div key={i} style={{ marginBottom: i < sub.file_urls.length - 1 ? 6 : 0 }}>
                                  {signedUrl ? (
                                    <a
                                      href={signedUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      style={{
                                        color: navy,
                                        textDecoration: 'underline',
                                        fontSize: 13,
                                        cursor: 'pointer'
                                      }}
                                    >
                                      View file {i + 1}
                                    </a>
                                  ) : (
                                    <span style={{ fontSize: 13, color: '#94A3B8' }}>
                                      File {i + 1} (loading...)
                                    </span>
                                  )}
                                </div>
                              )
                            })}
                          </div>
                        ) : (
                          <span style={{ color: '#94A3B8' }}>No files</span>
                        )}
                      </td>
                      <td style={{
                        padding: '16px 20px'
                      }}>
                        <span style={{
                          display: 'inline-block',
                          padding: '4px 12px',
                          borderRadius: 4,
                          fontSize: 12,
                          fontWeight: 600,
                          backgroundColor: sub.status === 'host_verified' ? '#DCF8E3' : '#FEF3C7',
                          color: sub.status === 'host_verified' ? '#065F46' : '#92400E'
                        }}>
                          {sub.status === 'host_verified' ? 'Verified' : 'Pending'}
                        </span>
                      </td>
                      <td style={{
                        padding: '16px 20px',
                        textAlign: 'center'
                      }}>
                        {sub.status === 'pending' ? (
                          <button
                            onClick={() => handleMarkVerifiedClick(sub)}
                            style={{
                              padding: '8px 16px',
                              backgroundColor: red,
                              color: 'white',
                              border: 'none',
                              borderRadius: 6,
                              fontSize: 12,
                              fontWeight: 600,
                              cursor: 'pointer',
                              whiteSpace: 'nowrap',
                              transition: 'opacity 0.2s'
                            }}
                            onMouseEnter={(e) => e.target.style.opacity = 0.9}
                            onMouseLeave={(e) => e.target.style.opacity = 1}
                          >
                            Verify
                          </button>
                        ) : (
                          <span style={{
                            color: '#64748B',
                            fontSize: 12
                          }}>
                            —
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Verification Modal */}
      {verifyModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '40px',
            maxWidth: '500px',
            width: '100%',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }}>
            <h2 style={{
              fontSize: 20,
              fontWeight: 700,
              color: navy,
              margin: '0 0 20px 0'
            }}>
              Verify In-Person Signup
            </h2>

            <div style={{
              backgroundColor: '#F1F5F9',
              padding: '16px',
              borderRadius: '8px',
              marginBottom: '20px'
            }}>
              <p style={{
                fontSize: 14,
                color: '#475569',
                margin: 0,
                lineHeight: 1.5
              }}>
                <strong>{verifyModal.first_name} {verifyModal.last_name}</strong> from <strong>{verifyModal.sportsbook}</strong>
              </p>
            </div>

            <label style={{
              display: 'block',
              fontSize: 14,
              fontWeight: 600,
              color: navy,
              marginBottom: 8
            }}>
              Optional Notes
            </label>
            <textarea
              value={verifyNotes}
              onChange={(e) => setVerifyNotes(e.target.value)}
              placeholder="Add verification notes (optional)"
              style={{
                width: '100%',
                padding: '12px',
                fontSize: 14,
                border: '2px solid #E2E8F0',
                borderRadius: 8,
                marginBottom: 24,
                boxSizing: 'border-box',
                fontFamily: 'inherit',
                resize: 'vertical',
                minHeight: '100px'
              }}
            />

            <div style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'flex-end'
            }}>
              <button
                onClick={() => setVerifyModal(null)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#F1F5F9',
                  color: navy,
                  border: '1px solid #E2E8F0',
                  borderRadius: 6,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmVerify}
                style={{
                  padding: '10px 20px',
                  backgroundColor: red,
                  color: 'white',
                  border: 'none',
                  borderRadius: 6,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Confirm Verification
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

