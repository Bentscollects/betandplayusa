'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { generateHostCode } from '@/lib/utils'

export default function AdminHostsPage() {
  const [hosts, setHosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    venueName: '',
    city: '',
    state: '',
    hostName: ''
  })
  const [generating, setGenerating] = useState(false)

  useEffect(() => {
    const fetchHosts = async () => {
      const { data } = await supabase.from('host_codes').select('*').order('created_at', { ascending: false })
      setHosts(data || [])
      setLoading(false)
    }
    fetchHosts()
  }, [])

  const handleGenerateCode = async (e) => {
    e.preventDefault()
    setGenerating(true)

    try {
      const code = generateHostCode()
      const { data } = await supabase
        .from('host_codes')
        .insert({
          code,
          venue_name: formData.venueName,
          city: formData.city,
          state: formData.state,
          host_name: formData.hostName,
          active: true
        })
        .select()

      setHosts([data[0], ...hosts])
      setFormData({ venueName: '', city: '', state: '', hostName: '' })
      setShowForm(false)
    } catch (error) {
      console.error('Error generating code:', error)
    }

    setGenerating(false)
  }

  const toggleActive = async (id, currentActive) => {
    await supabase.from('host_codes').update({ active: !currentActive }).eq('id', id)
    setHosts(hosts.map(h => h.id === id ? { ...h, active: !currentActive } : h))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Host Codes</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-brand-red text-white px-6 py-2 rounded-lg hover:bg-red-700"
        >
          {showForm ? 'Cancel' : '+ New Host Code'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleGenerateCode} className="bg-white rounded-lg border border-gray-200 p-6 mb-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              value={formData.venueName}
              onChange={(e) => setFormData({ ...formData, venueName: e.target.value })}
              placeholder="Venue name"
              className="px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="text"
              value={formData.hostName}
              onChange={(e) => setFormData({ ...formData, hostName: e.target.value })}
              placeholder="Host name"
              className="px-4 py-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              placeholder="City"
              className="px-4 py-2 border border-gray-300 rounded-lg"
            />
            <select
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg"
              required
            >
              <option value="">Select state</option>
              {['CA', 'TX', 'FL', 'NY', 'PA', 'IL', 'CO', 'NJ', 'MI', 'VA'].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            disabled={generating}
            className="width-full bg-brand-red text-white px-6 py-2 rounded-lg hover:bg-red-700 disabled:bg-gray-400"
          >
            {generating ? 'Generating...' : 'Generate Code'}
          </button>
        </form>
      )}

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">Loading...</div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Venue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Host</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {hosts.map(host => (
                <tr key={host.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm">
                    <span className={`w-3 h-3 rounded-full inline-block ${host.active ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                  </td>
                  <td className="px-6 py-4 text-sm font-mono font-bold">{host.code}</td>
                  <td className="px-6 py-4 text-sm">{host.venue_name}</td>
                  <td className="px-6 py-4 text-sm">{host.host_name || '—'}</td>
                  <td className="px-6 py-4 text-sm">{host.city}, {host.state}</td>
                  <td className="px-6 py-4 text-sm space-x-2">
                    <button
                      onClick={() => navigator.clipboard.writeText(host.code)}
                      className="text-blue-600 hover:underline"
                    >
                      Copy
                    </button>
                    <button
                      onClick={() => toggleActive(host.id, host.active)}
                      className={host.active ? 'text-orange-600 hover:underline' : 'text-green-600 hover:underline'}
                    >
                      {host.active ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
