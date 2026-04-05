'use client'

import { useState } from 'react'

export default function HostCodeStep({ onSubmit, loading, error }) {
  const [code, setCode] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (code.trim()) {
      onSubmit(code.trim().toUpperCase())
    }
  }

  return (
    <div className="bg-white rounded-2xl p-8 border-2 border-brand-navy shadow-lg">
      <h2 className="text-3xl font-bold text-brand-navy mb-2">Step 1 — Enter your host code</h2>
      <p className="text-gray-600 mb-6 text-lg">
        Your host will provide a unique code. Enter it below to unlock your reward.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-brand-navy mb-2">
            Host code
          </label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="e.g., BAR-042"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-brand-red outline-none text-lg font-semibold"
            disabled={loading}
          />
        </div>

        {error && (
          <div className="bg-red-50 border-2 border-red-300 text-red-800 px-4 py-3 rounded-lg text-sm font-medium">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !code.trim()}
          className="w-full bg-brand-red text-white py-3 rounded-lg font-bold text-lg hover:bg-red-700 disabled:bg-gray-300 transition shadow-lg"
        >
          {loading ? 'Checking...' : 'Unlock'}
        </button>
      </form>

      <p className="text-xs text-gray-500 text-center mt-6">
        🔒 Your code is validated securely against our database
      </p>
    </div>
  )
}
