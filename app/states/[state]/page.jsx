import { getSportsBooksByState } from '@/lib/sportsbooks'
import { getStateNameFromCode } from '@/lib/utils'
import SportsbookCard from '@/components/SportsbookCard'
import Link from 'next/link'

export default function StatePage({ params }) {
  const state = params?.state?.toUpperCase() || ''
  const books = getSportsBooksByState(state)
  const stateName = getStateNameFromCode(state)

  if (!stateName) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-6 text-center">
        <h1 className="text-3xl font-bold mb-4">State not found</h1>
        <p className="text-gray-600 mb-8">This state code doesn't exist.</p>
        <Link href="/sportsbooks" className="text-brand-red hover:underline">
          View all states →
        </Link>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="bg-brand-navy text-white py-12 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Sportsbooks in {stateName}
        </h1>
        <p className="text-lg text-gray-200">
          Find the best offers available for {stateName} residents
        </p>
      </section>

      {/* Content */}
      <section className="max-w-6xl mx-auto py-12 px-6">
        <div className="mb-8">
          <Link
            href="/sportsbooks"
            className="text-brand-red hover:text-red-700 font-medium"
          >
            ← Back to all states
          </Link>
        </div>

        {books.length > 0 ? (
          <>
            <p className="text-gray-600 mb-8">
              {books.length} sportsbook{books.length !== 1 ? 's' : ''} available in {stateName}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {books.map(book => (
                <SportsbookCard key={book.id} sportsbook={book} />
              ))}
            </div>
          </>
        ) : (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
            <p className="text-gray-700">
              Sports betting is not yet available in {stateName}.
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Check back soon for updates.
            </p>
          </div>
        )}
      </section>

      {/* SEO Info */}
      <section className="max-w-6xl mx-auto px-6 py-12 bg-gray-50">
        <h2 className="text-2xl font-bold mb-4">About {stateName} Sports Betting</h2>
        <p className="text-gray-600 mb-4">
          {stateName} has legalized online sports betting through multiple sportsbooks. BetAndPlayUSA brings you the top options in the state with the best current offers and fastest signup bonuses.
        </p>
        <p className="text-gray-600">
          Sign up with any of the sportsbooks above, deposit $20, place your first bet, and upload proof to claim your reward.
        </p>
      </section>
    </div>
  )
}

export async function generateStaticParams() {
  // User will need to update this based on their states
  const states = ['CA', 'TX', 'FL', 'NY', 'PA', 'NJ', 'CO', 'IL', 'MI', 'VA']
  return states.map(state => ({
    state: state.toLowerCase()
  }))
}
