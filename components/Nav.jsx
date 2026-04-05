'use client'

import Link from 'next/link'

export default function Nav() {
  return (
    <nav className="bg-brand-navy h-16 flex items-center justify-between px-6 sticky top-0 z-40 shadow-lg">
      {/* Logo with Star Icon */}
      <Link href="/" className="flex items-center gap-2 font-bold text-lg hover:opacity-90 transition">
        <span className="text-xl">⭐</span>
        <div>
          <span className="text-white">Bet</span>
          <span className="text-brand-red">&</span>
          <span className="text-white">PlayUSA</span>
        </div>
      </Link>

      {/* Navigation Links - Hidden on mobile, visible on desktop */}
      <div className="hidden md:flex items-center gap-8">
        <Link href="/sportsbooks" className="text-white text-sm hover:text-gray-200 transition font-medium">
          Sportsbooks
        </Link>
        <a href="/#how-it-works" className="text-white text-sm hover:text-gray-200 transition font-medium">
          How it works
        </a>
        <Link href="/sportsbooks" className="text-white text-sm hover:text-gray-200 transition font-medium">
          By State
        </Link>
        <a href="/#sportsbooks" className="text-white text-sm hover:text-gray-200 transition font-medium">
          Offers
        </a>
      </div>

      {/* CTA Button */}
      <Link 
        href="/activate" 
        className="bg-brand-red text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-red-700 transition shadow-md hover:shadow-lg"
      >
        Claim offer
      </Link>
    </nav>
  )
}
