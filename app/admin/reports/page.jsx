'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const NAVY = '#1B3A6B';
const RED = '#D91E27';
const WHITE = '#FFFFFF';

const CPA_RATES = { fanduel: 250, draftkings: 200, caesars: 200, fanatics: 200, betmgm: 150 };

export default function AdminReports() {
  const router = useRouter();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  useEffect(function() {
    const session = localStorage.getItem('admin_session');
    if (!session) { router.push('/admin'); return; }
    fetchSubmissions();
  }, []);

  async function fetchSubmissions() {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/submissions');
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      setSubmissions(data.submissions || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem('admin_session');
    router.push('/admin');
  }

  const filtered = submissions.filter(function(s) {
    if (s.status === 'rejected') return false;
    if (dateFrom && new Date(s.created_at) < new Date(dateFrom)) return false;
    if (dateTo && new Date(s.created_at) > new Date(dateTo + 'T23:59:59')) return false;
    return true;
  });

  const approved = filtered.filter(function(s) { return s.status === 'approved'; });

  const totalCPA = approved.reduce(function(sum, s) {
    return sum + (CPA_RATES[s.sportsbook] || 0);
  }, 0);

  const byVenue = {};
  filtered.forEach(function(s) {
    const key = s.venue_name || s.host_code || 'Social';
    if (!byVenue[key]) byVenue[key] = { name: key, total: 0, approved: 0, cpa: 0, books: {} };
    byVenue[key].total++;
    if (s.status === 'approved') {
      byVenue[key].approved++;
      byVenue[key].cpa += CPA_RATES[s.sportsbook] || 0;
    }
    byVenue[key].books[s.sportsbook] = (byVenue[key].books[s.sportsbook] || 0) + 1;
  });

  const byBook = {};
  filtered.forEach(function(s) {
    if (!byBook[s.sportsbook]) byBook[s.sportsbook] = { total: 0, approved: 0, cpa: 0 };
    byBook[s.sportsbook].total++;
    if (s.status === 'approved') {
      byBook[s.sportsbook].approved++;
      byBook[s.sportsbook].cpa += CPA_RATES[s.sportsbook] || 0;
    }
  });

  function exportCSV() {
    const headers = ['Date', 'Name', 'Email', 'Sportsbook', 'Type', 'Venue', 'Host Code', 'Status', 'CPA Value'];
    const rows = filtered.map(function(s) {
      return [
        new Date(s.created_at).toLocaleDateString('en-US'),
        s.first_name + ' ' + s.last_name,
        s.email,
        s.sportsbook,
        s.type,
        s.venue_name || '',
        s.host_code || '',
        s.status,
        s.status === 'approved' ? (CPA_RATES[s.sportsbook] || 0) : 0,
      ].join(',');
    });
    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'betandplayusa-report-' + new Date().toISOString().split('T')[0] + '.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f4f6fa', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: NAVY, padding: '0 32px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <span style={{ color: WHITE, fontWeight: 700, fontSize: 16 }}>BetAndPlayUSA Admin</span>
          <div style={{ display: 'flex', gap: 4 }}>
            {[['Overview', '/admin/overview'], ['Hosts', '/admin/hosts'], ['Reports', '/admin/reports']].map(function(item) {
              return (
                <a key={item[0]} href={item[1]} style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 13, fontWeight: 600, padding: '6px 12px', borderRadius: 6, background: item[1] === '/admin/reports' ? 'rgba(255,255,255,0.1)' : 'none' }}>{item[0]}</a>
              );
            })}
          </div>
        </div>
        <button onClick={logout} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: WHITE, padding: '6px 14px', borderRadius: 8, cursor: 'pointer', fontSize: 13 }}>Log out</button>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 900, color: NAVY, margin: '0 0 4px', textTransform: 'uppercase' }}>Reports</h1>
            <p style={{ fontSize: 14, color: '#6b7280', margin: 0 }}>Submission data, CPA tracking and CSV export</p>
          </div>
          <button onClick={exportCSV} style={{ background: NAVY, color: WHITE, border: 'none', borderRadius: 8, padding: '10px 20px', fontSize: 14, fontWeight: 800, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: 0.5 }}>
            Export CSV
          </button>
        </div>

        <div style={{ background: WHITE, borderRadius: 14, border: '1px solid #e5e7eb', padding: '20px 24px', marginBottom: 24, display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.3 }}>From</label>
            <input type="date" value={dateFrom} onChange={function(e) { setDateFrom(e.target.value); }} style={{ padding: '8px 12px', border: '2px solid #e5e7eb', borderRadius: 8, fontSize: 14, outline: 'none' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.3 }}>To</label>
            <input type="date" value={dateTo} onChange={function(e) { setDateTo(e.target.value); }} style={{ padding: '8px 12px', border: '2px solid #e5e7eb', borderRadius: 8, fontSize: 14, outline: 'none' }} />
          </div>
          <button onClick={function() { setDateFrom(''); setDateTo(''); }} style={{ background: '#f1f5f9', color: '#6b7280', border: 'none', borderRadius: 8, padding: '10px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Clear</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 28 }}>
          {[
            { label: 'Total Submissions', value: filtered.length, color: NAVY },
            { label: 'Approved', value: approved.length, color: '#166534' },
            { label: 'Pending', value: filtered.filter(function(s) { return s.status === 'pending'; }).length, color: '#854d0e' },
            { label: 'Est. CPA Earned', value: '$' + totalCPA.toLocaleString(), color: RED },
          ].map(function(card) {
            return (
              <div key={card.label} style={{ background: WHITE, borderRadius: 12, padding: '20px', border: '1px solid #e5e7eb' }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: card.color, lineHeight: 1 }}>{card.value}</div>
                <div style={{ fontSize: 12, color: '#6b7280', marginTop: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.3 }}>{card.label}</div>
              </div>
            );
          })}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 20, marginBottom: 28 }}>
          <div style={{ background: WHITE, borderRadius: 14, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '2px solid #e5e7eb', background: '#f9fafb' }}>
              <h3 style={{ margin: 0, fontSize: 13, fontWeight: 800, color: NAVY, textTransform: 'uppercase', letterSpacing: 0.5 }}>By Venue / Host</h3>
            </div>
            {Object.values(byVenue).length === 0 ? (
              <div style={{ padding: 32, textAlign: 'center', color: '#9ca3af' }}>No data</div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: '#f9fafb' }}>
                    {['Venue', 'Total', 'Approved', 'Est. CPA'].map(function(h) {
                      return <th key={h} style={{ padding: '8px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#6b7280', borderBottom: '1px solid #e5e7eb', textTransform: 'uppercase' }}>{h}</th>;
                    })}
                  </tr>
                </thead>
                <tbody>
                  {Object.values(byVenue).sort(function(a, b) { return b.total - a.total; }).map(function(v) {
                    return (
                      <tr key={v.name}>
                        <td style={{ padding: '10px 16px', borderBottom: '1px solid #f1f5f9', fontWeight: 600, color: NAVY, maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v.name}</td>
                        <td style={{ padding: '10px 16px', borderBottom: '1px solid #f1f5f9', color: '#374151' }}>{v.total}</td>
                        <td style={{ padding: '10px 16px', borderBottom: '1px solid #f1f5f9', color: '#166534', fontWeight: 700 }}>{v.approved}</td>
                        <td style={{ padding: '10px 16px', borderBottom: '1px solid #f1f5f9', color: RED, fontWeight: 700 }}>${v.cpa}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>

          <div style={{ background: WHITE, borderRadius: 14, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '2px solid #e5e7eb', background: '#f9fafb' }}>
              <h3 style={{ margin: 0, fontSize: 13, fontWeight: 800, color: NAVY, textTransform: 'uppercase', letterSpacing: 0.5 }}>By Sportsbook</h3>
            </div>
            {Object.keys(byBook).length === 0 ? (
              <div style={{ padding: 32, textAlign: 'center', color: '#9ca3af' }}>No data</div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: '#f9fafb' }}>
                    {['Sportsbook', 'Total', 'Approved', 'Est. CPA'].map(function(h) {
                      return <th key={h} style={{ padding: '8px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#6b7280', borderBottom: '1px solid #e5e7eb', textTransform: 'uppercase' }}>{h}</th>;
                    })}
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(byBook).sort(function(a, b) { return b[1].total - a[1].total; }).map(function(entry) {
                    return (
                      <tr key={entry[0]}>
                        <td style={{ padding: '10px 16px', borderBottom: '1px solid #f1f5f9', fontWeight: 700, color: NAVY, textTransform: 'capitalize' }}>{entry[0]}</td>
                        <td style={{ padding: '10px 16px', borderBottom: '1px solid #f1f5f9', color: '#374151' }}>{entry[1].total}</td>
                        <td style={{ padding: '10px 16px', borderBottom: '1px solid #f1f5f9', color: '#166534', fontWeight: 700 }}>{entry[1].approved}</td>
                        <td style={{ padding: '10px 16px', borderBottom: '1px solid #f1f5f9', color: RED, fontWeight: 700 }}>${entry[1].cpa}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {loading ? (
          <div style={{ padding: 60, textAlign: 'center', color: '#9ca3af' }}>Loading...</div>
        ) : (
          <div style={{ background: WHITE, borderRadius: 14, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '2px solid #e5e7eb', background: '#f9fafb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: 13, fontWeight: 800, color: NAVY, textTransform: 'uppercase', letterSpacing: 0.5 }}>All Submissions ({filtered.length})</h3>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead style={{ background: '#f9fafb' }}>
                  <tr>
                    {['Date', 'Name', 'Sportsbook', 'Type', 'Venue', 'Status', 'Est. CPA', 'Paid Out'].map(function(h) {
                      return <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#6b7280', borderBottom: '2px solid #e5e7eb', whiteSpace: 'nowrap', textTransform: 'uppercase' }}>{h}</th>;
                    })}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(function(s) {
                    return (
                      <tr key={s.id}>
                        <td style={{ padding: '10px 16px', borderBottom: '1px solid #f1f5f9', fontSize: 12, color: '#9ca3af', whiteSpace: 'nowrap' }}>{new Date(s.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
                        <td style={{ padding: '10px 16px', borderBottom: '1px solid #f1f5f9', fontWeight: 600, color: NAVY }}>{s.first_name} {s.last_name}</td>
                        <td style={{ padding: '10px 16px', borderBottom: '1px solid #f1f5f9', textTransform: 'capitalize', color: '#374151' }}>{s.sportsbook}</td>
                        <td style={{ padding: '10px 16px', borderBottom: '1px solid #f1f5f9' }}>
                          <span style={{ background: s.type === 'inperson' ? '#eff6ff' : '#fdf4ff', color: s.type === 'inperson' ? '#1d4ed8' : '#7e22ce', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 6 }}>{s.type === 'inperson' ? 'In-Person' : 'Social'}</span>
                        </td>
                        <td style={{ padding: '10px 16px', borderBottom: '1px solid #f1f5f9', color: '#6b7280', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.venue_name || '\u2014'}</td>
                        <td style={{ padding: '10px 16px', borderBottom: '1px solid #f1f5f9' }}>
                          <span style={{ background: s.status === 'approved' ? '#dcfce7' : s.status === 'pending' ? '#fef9c3' : s.status === 'flagged' ? '#fee2e2' : '#f1f5f9', color: s.status === 'approved' ? '#166534' : s.status === 'pending' ? '#854d0e' : s.status === 'flagged' ? '#991b1b' : '#475569', fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 20 }}>{s.status}</span>
                        </td>
                        <td style={{ padding: '10px 16px', borderBottom: '1px solid #f1f5f9', fontWeight: 700, color: s.status === 'approved' ? RED : '#9ca3af' }}>
                          {s.status === 'approved' ? '$' + (CPA_RATES[s.sportsbook] || 0) : '\u2014'}
                        </td>
                        <td style={{ padding: '10px 16px', borderBottom: '1px solid #f1f5f9' }}>
                          {s.status === 'approved' ? (
                            <button style={{ background: s.paid_out ? '#dcfce7' : '#f1f5f9', color: s.paid_out ? '#166534' : '#6b7280', border: 'none', borderRadius: 6, padding: '4px 10px', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
                              {s.paid_out ? 'Paid' : 'Mark Paid'}
                            </button>
                          ) : <span style={{ color: '#e5e7eb' }}>—</span>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
