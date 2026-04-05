'use client'

export default function SportsbookCard({ sportsbook }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 flex flex-col h-full hover:border-gray-300">
      {/* Logo */}
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-sm mb-4 shadow-md"
        style={{
          backgroundColor: sportsbook.logoColors.bg,
          color: sportsbook.logoColors.text
        }}
      >
        {sportsbook.logo}
      </div>

      {/* Name */}
      <h3 className="font-bold text-lg mb-2 text-gray-900">{sportsbook.name}</h3>

      {/* Offer */}
      <p className="text-sm text-gray-600 mb-4 flex-grow leading-relaxed">{sportsbook.offer}</p>

      {/* CPA Badge */}
      <div className="mb-4">
        <span className="inline-block bg-green-100 text-green-800 text-xs font-bold px-3 py-1.5 rounded-full">
          Up to ${sportsbook.cpa}
        </span>
      </div>

      {/* Promo code if needed */}
      {sportsbook.requiresPromo && (
        <div className="mb-4 p-3 bg-orange-50 rounded-lg text-xs text-gray-700 border border-orange-200">
          <span className="font-semibold text-orange-900">Promo Code:</span>
          <div className="font-mono text-orange-800 font-bold mt-1">{sportsbook.promoCode}</div>
        </div>
      )}

      {/* States available */}
      <p className="text-xs text-gray-500 mb-4">
        Available in {sportsbook.states.length} states
      </p>

      {/* CTA Button */}
      <a
        href={sportsbook.affiliateLink}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-brand-red text-white px-4 py-3 rounded-lg font-semibold text-sm hover:bg-red-700 transition-colors duration-200 text-center shadow-md hover:shadow-lg w-full mt-auto"
      >
        Claim offer
      </a>
    </div>
  )
}
