'use client'

import { useState, useEffect } from 'react'
import { sportsbooks, getSportsBooksByState, getAllAvailableStates } from '@/lib/sportsbooks'
import { detectUserState, getStateNameFromCode } from '@/lib/utils'
import SportsbookCard from '@/components/SportsbookCard'

export default function SportsbooksPage() {
  const [selectedState, setSelectedState] = useState(null)
  const [filteredBooks, setFilteredBooks] = useState(sportsbooks)
  const [detectedState, setDetectedState] = useState(null)

  useEffect(() => {
    async function getState() {
      const state = await detectUserState()
      setDetectedState(state)
      setSelectedState(state)
      if (state) {
        filterBooks(state)
      }
    }
    getState()
  }, [])

  const filterBooks = (state) => {
    const books = getSportsBooksByState(state)
    setFilteredBooks(books)
    setSelectedState(state)
  }

  const allStates = getAllAvailableStates()

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="bg-brand-navy text-white py-12 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">All Sportsbooks</h1>
        <p className="text-lg text-gray-200">
          Find the best offers available in your state
        </p>
      </section>

      {/* State Filter */}
      <section className="max-w-6xl mx-auto py-8 px-6">
        <h2 className="text-lg font-semibold mb-4">Filter by state</h2>
        <div className="flex flex-wrap gap-2 mb-8">
          {allStates.map(state => (
            <button
              key={state}
              onClick={() => filterBooks(state)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                selectedState === state
                  ? 'bg-brand-navy text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {state}
            </button>
          ))}
        </div>

        {selectedState && (
          <p className="text-gray-600 mb-8">
            Showing {filteredBooks.length} sportsbook{filteredBooks.length !== 1 ? 's' : ''} available in <span className="font-semibold">{getStateNameFromCode(selectedState)}</span>
          </p>
        )}
      </section>

      {/* Sportsbooks Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {filteredBooks.length > 0 ? (
            filteredBooks.map(book => (
              <SportsbookCard key={book.id} sportsbook={book} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">No sportsbooks available in this state yet.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
