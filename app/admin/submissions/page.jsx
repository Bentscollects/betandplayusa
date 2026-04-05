'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminSubmissionsPage() {
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    status: 'all',
    type: 'all',
    search: ''
  })

  useEffect(() => {
    const fetchSubmissions = async () => {
      let query = supabase.from('submissions').select('*')

      if (filters.status !== 'all') {
        query = query.eq('status', filters.status)
      }
      if (filters.type !== 'all') {
        query = query.eq('type', filters.type)
      }

      const { data } = await query.order('created_at', { ascending: false })
      setSubmissions(data || [])
      setLoading(false)
    }

    fetchSubmissions()
  }, [filters])

  const updateStatus = async (id, status) => {
    await supabase.from('submissions').update({ status }).eq('id', id)
    setSubmissions(submissions.map(s => s.id === id ? { ...s, status } : s))
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Submissions</h1>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6 space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="flagged">Flagged</option>
            <option value="rejected">Rejected</option>
          </select>

          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="all">All Types</option>
            <option value="inperson">In-Person</option>
            <option value="social">Social</option>
          </select>

          <input
            type="text"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            placeholder="Search by name/email..."
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">Loading...</div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Sportsbook</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map(submission => (
                <tr key={submission.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm">{submission.first_name} {submission.last_name}</td>
                  <td className="px-6 py-4 text-sm">{submission.email}</td>
                  <td className="px-6 py-4 text-sm">{submission.sportsbook}</td>
                  <td className="px-6 py-4 text-sm">{submission.type}</td>
                  <td className="px-6 py-4 text-sm">
                    <select
                      value={submission.status}
                      onChange={(e) => updateStatus(submission.id, e.target.value)}
                      className="px-2 py-1 border border-gray-300 rounded"
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="flagged">Flagged</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button className="text-brand-red hover:underline">View Files</button>
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
