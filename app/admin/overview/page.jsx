/*
  EXACT USER-PROVIDED CODE BELOW
*/
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const SPORTSBOOK_STYLES = {
  fanduel:    { bg: '#1059a4', text: '#fff', initials: 'FD', logo: '/fanduel.png' },
  draftkings: { bg: '#1a1a2e', text: '#00d4aa', initials: 'DK', logo: '/draftkings.png' },
  caesars:    { bg: '#003087', text: '#FFD700', initials: 'CS', logo: '/caesars.png' },
  betmgm:     { bg: '#c9a84c', text: '#1a1a1a', initials: 'BM', logo: '/betmgm.png' },
  fanatics:   { bg: '#cc0000', text: '#fff', initials: 'FA', logo: '/fanatics.png' },
};

const STATUS_STYLES = {
  pending:       { bg: '#fef9c3', text: '#854d0e', label: 'Pending' },
  approved:      { bg: '#dcfce7', text: '#166534', label: 'Approved' },
  host_verified: { bg: '#dbeafe', text: '#1e40af', label: 'Host Verified' },
  flagged:       { bg: '#fee2e2', text: '#991b1b', label: 'Flagged' },
  rejected:      { bg: '#f1f5f9', text: '#475569', label: 'Rejected' },
};

const FILTERS = ['all', 'pending', 'host_verified', 'approved', 'flagged', 'rejected'];

function BookAvatar({ sportsbook }) {
  const s = SPORTSBOOK_STYLES[sportsbook] || { bg: '#e2e8f0', text: '#374151', initials: '?', logo: null };
  if (s.logo) {
    return <img src={s.logo} alt={sportsbook} style={{ width: 30, height: 30, borderRadius: 6, objectFit: 'contain', background: s.bg, padding: 2, flexShrink: 0 }} />;
  }
  return (
    <div style={{ width: 30, height: 30, borderRadius: 6, background: s.bg, color: s.text, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, flexShrink: 0 }}>
      {s.initials}
    </div>
  );
}

function StatusPill({ status }) {
  const s = STATUS_STYLES[status] || STATUS_STYLES.pending;
  return (
    <span style={{ background: s.bg, color: s.text, fontSize: 12, fontWeight: 600, padding: '4px 10px', borderRadius: 20, whiteSpace: 'nowrap' }}>
      {s.label}
    </span>
  );
}

function Toast({ msg, type, onClose }) {
  useEffect(function() {
    const t = setTimeout(onClose, 3000);
    return function() { clearTimeout(t); };
  }, []);
  const bg = type === 'approved' ? '#22c55e' : type === 'flagged' ? '#f59e0b' : type === 'rejected' ? '#64748b' : '#ef4444';
  return (
    <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 9999, background: bg, color: '#fff', padding: '12px 20px', borderRadius: 10, fontWeight: 600, fontSize: 14, boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}>
      {msg}
    </div>
  );
}

export default function AdminOverview() {
  const router = useRouter();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(null);
  const [filter, setFilter] = useState('all');
  const [toast, setToast] = useState(null);

  useEffect(function() {
    const session = localStorage.getItem('admin_session');
    if (!session) { router.push('/admin'); return; }
    fetchSubmissions();
  }, []);

  async function fetchSubmissions() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/submissions');
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      setSubmissions(data.submissions || []);
    } catch (e) {
      setError('Could not load submissions.');
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id, status) {
    setUpdating(id);
    try {
      console.log("Updating submission id:", id, "status:", status);
      const res = await fetch('/api/admin/submissions/' + id, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const responseText = await res.text();
      console.log("PATCH status:", res.status, "body:", responseText);
      if (!res.ok) throw new Error('Failed: ' + responseText);
      const data = JSON.parse(responseText);
      setSubmissions(function(prev) {
        return prev.map(function(s) { return s.id === id ? Object.assign({}, s, { status: status }) : s; });
      });
      setToast({ msg: 'Updated to ' + status, type: status });
    } catch (e) {
      console.error("Update error:", e);
      setToast({ msg: e.message, type: 'error' });
    } finally {
      setUpdating(null);
    }
  }

  function logout() {
    localStorage.removeItem('admin_session');
    router.push('/admin');
  }

  const filtered = filter === 'all' ? submissions : submissions.filter(function(s) { return s.status === filter; });

  const counts = {
    all:           submissions.length,
    pending:       submissions.filter(function(s) { return s.status === 'pending'; }).length,
    host_verified: submissions.filter(function(s) { return s.status === 'host_verified'; }).length,
    approved:      submissions.filter(function(s) { return s.status === 'approved'; }).length,
    flagged:       submissions.filter(function(s) { return s.status === 'flagged'; }).length,
    rejected:      submissions.filter(function(s) { return s.status === 'rejected'; }).length,
  };

  const statCards = [
    { label: 'Total', value: counts.all, color: '#0B2545' },
    { label: 'Pending', value: counts.pending, color: '#854d0e' },
    { label: 'Host Verified', value: counts.host_verified, color: '#1e40af' },
    { label: 'Approved', value: counts.approved, color: '#166534' },
    { label: 'Flagged', value: counts.flagged, color: '#991b1b' },
    { label: 'Rejected', value: counts.rejected, color: '#475569' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fb', fontFamily: 'system-ui, sans-serif' }}>
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={function() { setToast(null); }} />}

      <div style={{ background: '#1B3A6B', padding: '0 32px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ color: '#fff', fontWeight: 700, fontSize: 16 }}>BetAndPlayUSA Admin</span>
        <div style={{ display: 'flex', gap: 4 }}>
          {[['Overview', '/admin/overview'], ['Hosts', '/admin/hosts'], ['Reports', '/admin/reports']].map(function(item) {
            return (
              <a key={item[0]} href={item[1]} style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 13, fontWeight: 600, padding: '6px 12px', borderRadius: 6, background: item[1] === '/admin/overview' ? 'rgba(255,255,255,0.1)' : 'none' }}>{item[0]}</a>
            );
          })}
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>liambenton2@gmail.com</span>
          <button onClick={logout} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '6px 14px', borderRadius: 8, cursor: 'pointer', fontSize: 13 }}>Log out</button>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px' }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#0B2545', margin: '0 0 4px' }}>Dashboard</h1>
        <p style={{ fontSize: 14, color: '#64748b', margin: '0 0 28px' }}>All submissions — live from Supabase</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16, marginBottom: 28 }}>
          {statCards.map(function(card) {
            return (
              <div key={card.label} style={{ background: '#fff', borderRadius: 12, padding: 20, border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: card.color, lineHeight: 1 }}>{card.value}</div>
                <div style={{ fontSize: 13, color: '#64748b', marginTop: 6 }}>{card.label}</div>
              </div>
            );
          })}
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
          {FILTERS.map(function(f) {
            const label = f === 'host_verified' ? 'Host Verified' : f.charAt(0).toUpperCase() + f.slice(1);
            return (
              <button key={f} onClick={function() { setFilter(f); }} style={{ padding: '7px 16px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, background: filter === f ? '#0B2545' : '#e2e8f0', color: filter === f ? '#fff' : '#475569' }}>
                {label} ({counts[f]})
              </button>
            );
          })}
          <button onClick={fetchSubmissions} style={{ marginLeft: 'auto', padding: '7px 16px', borderRadius: 20, border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer', fontSize: 13, color: '#64748b' }}>Refresh</button>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
          {loading && <div style={{ padding: 60, textAlign: 'center', color: '#94a3b8' }}>Loading...</div>}
          {!loading && error && <div style={{ padding: 40, textAlign: 'center', color: '#ef4444', fontWeight: 600 }}>{error}</div>}
          {!loading && !error && filtered.length === 0 && <div style={{ padding: 60, textAlign: 'center', color: '#94a3b8' }}>No submissions found.</div>}
          {!loading && !error && filtered.length > 0 && (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead style={{ background: '#f8f9fb' }}>
                  <tr>
                    {['Person', 'Sportsbook', 'Type', 'Host / Venue', 'Files', 'Status', 'Date', 'Actions'].map(function(h) {
                      return <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: '#64748b', borderBottom: '2px solid #e2e8f0', whiteSpace: 'nowrap' }}>{h}</th>;
                    })}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(function(sub) {
                    console.log("Rendering row, sub.id:", sub.id, "keys:", Object.keys(sub));
                    const dateStr = new Date(sub.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
                    const isUpdating = updating === sub.id;
                    return (
                      <tr key={sub.id} style={{ background: isUpdating ? '#f8f9fb' : '#fff' }}>
                        <td style={{ padding: '12px 14px', borderBottom: '1px solid #f1f5f9' }}>
                          <div style={{ fontWeight: 600, color: '#0B2545' }}>{sub.first_name} {sub.last_name}</div>
                          <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>{sub.email}</div>
                        </td>
                        <td style={{ padding: '12px 14px', borderBottom: '1px solid #f1f5f9' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <BookAvatar sportsbook={sub.sportsbook} />
                            <span style={{ fontWeight: 500, color: '#374151', textTransform: 'capitalize' }}>{sub.sportsbook}</span>
                          </div>
                        </td>
                        <td style={{ padding: '12px 14px', borderBottom: '1px solid #f1f5f9' }}>
                          <span style={{ background: sub.type === 'inperson' ? '#eff6ff' : '#fdf4ff', color: sub.type === 'inperson' ? '#1d4ed8' : '#7e22ce', fontSize: 12, fontWeight: 600, padding: '3px 8px', borderRadius: 6 }}>
                            {sub.type === 'inperson' ? 'In-person' : 'Social'}
                          </span>
                        </td>
                        <td style={{ padding: '12px 14px', borderBottom: '1px solid #f1f5f9' }}>
                          {sub.host_code ? (
                            <div>
                              <div style={{ fontWeight: 500, color: '#374151', fontSize: 13 }}>{sub.venue_name || '—'}</div>
                              <div style={{ fontSize: 12, color: '#94a3b8' }}>{sub.host_code}</div>
                            </div>
                          ) : <span style={{ color: '#94a3b8', fontSize: 13 }}>—</span>}
                        </td>
                        <td style={{ padding: '12px 14px', borderBottom: '1px solid #f1f5f9' }}>
                          {sub.file_urls && sub.file_urls.length > 0 ? (
                            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                              {sub.file_urls.map(function(url, i) {
                                return (
                                  <a key={i} href={url} target="_blank" rel="noopener noreferrer" style={{ background: '#eff6ff', color: '#1d4ed8', fontSize: 12, fontWeight: 600, padding: '3px 8px', borderRadius: 6, textDecoration: 'none' }}>
                                    File {i + 1}
                                  </a>
                                );
                              })}
                            </div>
                          ) : <span style={{ color: '#94a3b8', fontSize: 13 }}>—</span>}
                        </td>
                        <td style={{ padding: '12px 14px', borderBottom: '1px solid #f1f5f9' }}>
                          <StatusPill status={sub.status} />
                        </td>
                        <td style={{ padding: '12px 14px', borderBottom: '1px solid #f1f5f9', fontSize: 12, color: '#94a3b8', whiteSpace: 'nowrap' }}>{dateStr}</td>
                        <td style={{ padding: '12px 14px', borderBottom: '1px solid #f1f5f9' }}>
                          {isUpdating ? (
                            <span style={{ fontSize: 13, color: '#94a3b8' }}>Saving...</span>
                          ) : (
                            <div style={{ display: 'flex', gap: 6 }}>
                              {sub.status !== 'approved' && (
                                <button onClick={function() { console.log("Full sub:", JSON.stringify(sub)); updateStatus(sub.id, 'approved'); }} style={{ background: '#dcfce7', color: '#166534', border: 'none', borderRadius: 7, padding: '6px 10px', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>Approve</button>
                              )}
                              {sub.status !== 'flagged' && (
                                <button onClick={function() { updateStatus(sub.id, 'flagged'); }} style={{ background: '#fef9c3', color: '#854d0e', border: 'none', borderRadius: 7, padding: '6px 10px', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>Flag</button>
                              )}
                              {sub.status !== 'rejected' && (
                                <button onClick={function() { updateStatus(sub.id, 'rejected'); }} style={{ background: '#fee2e2', color: '#991b1b', border: 'none', borderRadius: 7, padding: '6px 10px', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>Reject</button>
                              )}
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
