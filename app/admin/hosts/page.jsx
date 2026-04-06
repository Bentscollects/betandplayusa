'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const NAVY = '#1B3A6B';
const RED = '#D91E27';
const WHITE = '#FFFFFF';

export default function AdminHosts() {
  const router = useRouter();
  const [hosts, setHosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ code: '', venue_name: '', host_name: '', city: '', state: '' });

  useEffect(function() {
    const session = localStorage.getItem('admin_session');
    if (!session) { router.push('/admin'); return; }
    fetchHosts();
  }, []);

  async function fetchHosts() {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/hosts');
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      setHosts(data.hosts || []);
    } catch (e) {
      setError('Could not load host codes.');
    } finally {
      setLoading(false);
    }
  }

  async function createHost() {
    if (!form.code || !form.venue_name) { showToast('Code and venue name are required.', 'error'); return; }
    setSaving(true);
    try {
      const res = await fetch('/api/admin/hosts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed');
      showToast('Host code created!', 'success');
      setForm({ code: '', venue_name: '', host_name: '', city: '', state: '' });
      setShowForm(false);
      fetchHosts();
    } catch (e) {
      showToast('Failed to create host code.', 'error');
    } finally {
      setSaving(false);
    }
  }

  async function toggleActive(id, currentActive) {
    try {
      const res = await fetch('/api/admin/hosts/' + id, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !currentActive }),
      });
      if (!res.ok) throw new Error('Failed');
      setHosts(function(prev) {
        return prev.map(function(h) { return h.id === id ? Object.assign({}, h, { active: !currentActive }) : h; });
      });
      showToast(currentActive ? 'Host code deactivated' : 'Host code activated', 'success');
    } catch (e) {
      showToast('Update failed.', 'error');
    }
  }

  function showToast(msg, type) {
    setToast({ msg, type });
    setTimeout(function() { setToast(null); }, 3000);
  }

  function logout() {
    localStorage.removeItem('admin_session');
    router.push('/admin');
  }

  const activeHosts = hosts.filter(function(h) { return h.active; });
  const inactiveHosts = hosts.filter(function(h) { return !h.active; });

  return (
    <div style={{ minHeight: '100vh', background: '#f4f6fa', fontFamily: 'system-ui, sans-serif' }}>
      {toast && (
        <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 9999, background: toast.type === 'success' ? '#22c55e' : RED, color: WHITE, padding: '12px 20px', borderRadius: 10, fontWeight: 700, fontSize: 14, boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}>
          {toast.msg}
        </div>
      )}

      <div style={{ background: NAVY, padding: '0 32px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ color: WHITE, fontWeight: 700, fontSize: 16 }}>BetAndPlayUSA Admin</span>
        <div style={{ display: 'flex', gap: 4 }}>
          {[['Overview', '/admin/overview'], ['Hosts', '/admin/hosts']].map(function(item) {
            return (
              <a key={item[0]} href={item[1]} style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 13, fontWeight: 600, padding: '6px 12px', borderRadius: 6, background: item[1] === '/admin/hosts' ? 'rgba(255,255,255,0.1)' : 'none' }}>{item[0]}</a>
            );
          })}
        </div>
        <button onClick={logout} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: WHITE, padding: '6px 14px', borderRadius: 8, cursor: 'pointer', fontSize: 13 }}>Log out</button>
      </div>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 900, color: NAVY, margin: '0 0 4px', textTransform: 'uppercase' }}>Host Codes</h1>
            <p style={{ fontSize: 14, color: '#6b7280', margin: 0 }}>{activeHosts.length} active \u00b7 {inactiveHosts.length} inactive</p>
          </div>
          <button onClick={function() { setShowForm(!showForm); }} style={{ background: RED, color: WHITE, border: 'none', borderRadius: 8, padding: '10px 20px', fontSize: 14, fontWeight: 800, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: 0.5 }}>
            {showForm ? 'Cancel' : '+ New Host Code'}
          </button>
        </div>

        {showForm && (
          <div style={{ background: WHITE, borderRadius: 14, border: '1px solid #e5e7eb', padding: '24px 28px', marginBottom: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <h2 style={{ fontSize: 16, fontWeight: 800, color: NAVY, margin: '0 0 20px', textTransform: 'uppercase' }}>Create New Host Code</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 20 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.3 }}>Host Code *</label>
                <input value={form.code} onChange={function(e) { var v = e.target.value.toUpperCase(); setForm(function(p) { return Object.assign({}, p, { code: v }); }); }} placeholder="e.g. BAR-004" style={{ width: '100%', padding: '10px 12px', border: '2px solid #e5e7eb', borderRadius: 8, fontSize: 14, boxSizing: 'border-box', outline: 'none', fontWeight: 700, letterSpacing: 1 }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.3 }}>Venue Name *</label>
                <input value={form.venue_name} onChange={function(e) { var v = e.target.value; setForm(function(p) { return Object.assign({}, p, { venue_name: v }); }); }} placeholder="e.g. McGee's Bar &amp; Grill" style={{ width: '100%', padding: '10px 12px', border: '2px solid #e5e7eb', borderRadius: 8, fontSize: 14, boxSizing: 'border-box', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.3 }}>Host Name</label>
                <input value={form.host_name} onChange={function(e) { var v = e.target.value; setForm(function(p) { return Object.assign({}, p, { host_name: v }); }); }} placeholder="e.g. Mike D." style={{ width: '100%', padding: '10px 12px', border: '2px solid #e5e7eb', borderRadius: 8, fontSize: 14, boxSizing: 'border-box', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.3 }}>City</label>
                <input value={form.city} onChange={function(e) { var v = e.target.value; setForm(function(p) { return Object.assign({}, p, { city: v }); }); }} placeholder="e.g. New York" style={{ width: '100%', padding: '10px 12px', border: '2px solid #e5e7eb', borderRadius: 8, fontSize: 14, boxSizing: 'border-box', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.3 }}>State</label>
                <input value={form.state} onChange={function(e) { var v = e.target.value.toUpperCase().slice(0,2); setForm(function(p) { return Object.assign({}, p, { state: v }); }); }} placeholder="e.g. NY" maxLength={2} style={{ width: '100%', padding: '10px 12px', border: '2px solid #e5e7eb', borderRadius: 8, fontSize: 14, boxSizing: 'border-box', outline: 'none', fontWeight: 700 }} />
              </div>
            </div>
            <button onClick={createHost} disabled={saving} style={{ background: saving ? '#9ca3af' : NAVY, color: WHITE, border: 'none', borderRadius: 8, padding: '10px 24px', fontSize: 14, fontWeight: 800, cursor: saving ? 'not-allowed' : 'pointer', textTransform: 'uppercase', letterSpacing: 0.5 }}>
              {saving ? 'Creating...' : 'Create Host Code'}
            </button>
          </div>
        )}

        {loading && <div style={{ padding: 60, textAlign: 'center', color: '#9ca3af' }}>Loading...</div>}
        {!loading && error && <div style={{ padding: 40, textAlign: 'center', color: RED, fontWeight: 600 }}>{error}</div>}
        {!loading && !error && (
          <div style={{ background: WHITE, borderRadius: 14, border: '1px solid #e5e7eb', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            {hosts.length === 0 ? (
              <div style={{ padding: 60, textAlign: 'center', color: '#9ca3af' }}>No host codes yet. Create one above.</div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                  <thead style={{ background: '#f9fafb' }}>
                    <tr>
                      {['Code', 'Venue', 'Host', 'City', 'State', 'Status', 'Created', 'Actions'].map(function(h) {
                        return <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#6b7280', borderBottom: '2px solid #e5e7eb', whiteSpace: 'nowrap', textTransform: 'uppercase', letterSpacing: 0.5 }}>{h}</th>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {hosts.map(function(host) {
                      return (
                        <tr key={host.id} style={{ background: host.active ? WHITE : '#fafafa' }}>
                          <td style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9' }}>
                            <span style={{ fontWeight: 800, color: NAVY, fontSize: 13, letterSpacing: 1, background: '#f0f4ff', padding: '3px 8px', borderRadius: 6 }}>{host.code}</span>
                          </td>
                          <td style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9', fontWeight: 600, color: '#111827' }}>{host.venue_name}</td>
                          <td style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9', color: '#6b7280' }}>{host.host_name || '\u2014'}</td>
                          <td style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9', color: '#6b7280' }}>{host.city || '\u2014'}</td>
                          <td style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9', color: '#6b7280', fontWeight: 700 }}>{host.state || '\u2014'}</td>
                          <td style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9' }}>
                            <span style={{ background: host.active ? '#dcfce7' : '#f1f5f9', color: host.active ? '#166534' : '#6b7280', fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 20 }}>
                              {host.active ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9', fontSize: 12, color: '#9ca3af', whiteSpace: 'nowrap' }}>
                            {new Date(host.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </td>
                          <td style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9' }}>
                            <button onClick={function() { toggleActive(host.id, host.active); }} style={{ background: host.active ? '#fee2e2' : '#dcfce7', color: host.active ? '#991b1b' : '#166534', border: 'none', borderRadius: 7, padding: '6px 12px', cursor: 'pointer', fontSize: 12, fontWeight: 700 }}>
                              {host.active ? 'Deactivate' : 'Activate'}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
