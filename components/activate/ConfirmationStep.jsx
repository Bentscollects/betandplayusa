'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ConfirmationStep({
  firstName,
  hostCode,
  sportsbook,
  fileCount,
  email
}) {
  const [showTelegramForm, setShowTelegramForm] = useState(true)
  const [telegramEmail, setTelegramEmail] = useState(email)
  const [telegramUsername, setTelegramUsername] = useState('')
  const [telegramSubmitted, setTelegramSubmitted] = useState(false)

  const handleTelegramSubmit = async (e) => {
    e.preventDefault()
    // This would save telegram interest in a real app
    setTelegramSubmitted(true)
  }

  return (
    <div className="space-y-8">
      {/* Main confirmation card */}
      <div className="bg-white rounded-2xl p-8 border-2 border-brand-navy shadow-lg text-center">
        <div className="text-6xl mb-4">✓</div>
        <h2 className="text-4xl font-bold text-brand-navy mb-2">
          Proof submitted, {firstName}!
        </h2>
        <p className="text-gray-600 mb-8 text-lg">
          Show this screen to your host to collect your cash reward
        </p>

        {/* Activation code */}
        <div className="bg-red-50 rounded-lg p-6 mb-8 border-2 border-brand-red">
          <p className="text-sm text-gray-600 mb-2 font-medium">Activation code</p>
          <div className="text-4xl font-mono font-bold text-brand-red">
            {hostCode.code}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-brand-mid-navy text-white rounded-lg p-6 space-y-3 text-left mb-8">
          <div className="flex justify-between">
            <span className="text-gray-200">Sportsbook</span>
            <span className="font-bold">{sportsbook.name}</span>
          </div>
          <div className="flex justify-between border-t border-brand-navy pt-3">
            <span className="text-gray-200">Venue</span>
            <span className="font-bold">{hostCode.venue_name}</span>
          </div>
          <div className="flex justify-between border-t border-brand-navy pt-3">
            <span className="text-gray-200">Files submitted</span>
            <span className="font-bold">{fileCount}</span>
          </div>
          <div className="flex justify-between border-t border-brand-navy pt-3">
            <span className="text-gray-200">Status</span>
            <span className="inline-block bg-yellow-400 text-brand-navy px-3 py-1 rounded-full text-sm font-bold">
              Under review
            </span>
          </div>
        </div>

        <div className="bg-blue-50 border-2 border-blue-300 p-4 rounded-lg mb-8">
          <p className="text-sm text-blue-900 font-medium">
            📧 Confirmation email sent to <span className="font-bold">{email}</span>
          </p>
          <p className="text-xs text-blue-800 mt-2">
            Your data is held securely for 90 days for verification purposes.
          </p>
        </div>

        {/* Call to action */}
        <div className="space-y-3">
          <div className="inline-block bg-brand-red text-white px-6 py-3 rounded-lg font-bold text-lg shadow-lg">
            💰 Collect your cash reward now
          </div>
          <p className="text-sm text-gray-600">
            Ask your host to verify your code for immediate payment
          </p>
        </div>
      </div>

      {/* Telegram upsell (optional) */}
      {showTelegramForm && !telegramSubmitted && (
        <div className="bg-blue-50 border-2 border-blue-300 rounded-2xl p-8 shadow-lg">
          <div className="flex items-start gap-4 mb-4">
            <div className="text-4xl">💬</div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-brand-navy mb-1">Want free expert picks too?</h3>
              <p className="text-gray-700">
                Join our private Telegram betting group — daily tips, live alerts, members-only odds. Free with your signup.
              </p>
            </div>
          </div>

          {!telegramSubmitted ? (
            <form onSubmit={handleTelegramSubmit} className="space-y-3">
              <div>
                <input
                  type="email"
                  value={telegramEmail}
                  onChange={(e) => setTelegramEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <input
                  type="text"
                  value={telegramUsername}
                  onChange={(e) => setTelegramUsername(e.target.value)}
                  placeholder="@yourtelegramhandle"
                  className="w-full px-4 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition shadow-lg"
                >
                  Join the betting group
                </button>
                <button
                  type="button"
                  onClick={() => setShowTelegramForm(false)}
                  className="flex-1 border-2 border-blue-400 bg-white text-blue-600 py-3 rounded-lg font-bold text-lg hover:bg-blue-50 transition"
                >
                  No thanks
                </button>
              </div>
            </form>
          ) : (
            <div className="bg-white rounded-lg p-4 text-center border-2 border-green-300">
              <p className="text-green-700 font-bold text-lg">
                ✓ Thanks for joining! Check your Telegram DMs soon.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Footer links */}
      <div className="text-center space-y-2 text-xs text-gray-600">
        <p>
          <Link href="/privacy" className="hover:text-brand-navy font-medium">Privacy Policy</Link> • 
          <Link href="/terms" className="hover:text-brand-navy font-medium"> Terms of Service</Link> • 
          <Link href="/responsible-gambling" className="hover:text-brand-navy font-medium"> Responsible Gambling</Link>
        </p>
        <p className="font-medium">Must be 21+. New customers only. Min $20 deposit required.</p>
        <p>Need help? Contact support@betandplayusa.com or call 1-800-GAMBLER</p>
      </div>
    </div>
  )
}
