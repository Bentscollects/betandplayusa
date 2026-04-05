'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white py-16 mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 font-bold text-lg mb-3">
              <span className="text-xl">⭐</span>
              <span>BetAndPlayUSA</span>
            </div>
            <p className="text-gray-300 text-sm">Find your sportsbook. Claim your reward.</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-white">Company</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/" className="hover:text-white transition">Home</Link></li>
              <li><Link href="/sportsbooks" className="hover:text-white transition">Sportsbooks</Link></li>
              <li><Link href="/admin" className="hover:text-white transition">Admin</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-white">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition">Terms & Conditions</Link></li>
              <li><Link href="/cookies" className="hover:text-white transition">Cookie Policy</Link></li>
            </ul>
          </div>

          {/* Responsible Gambling */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-white">Responsible Play</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/responsible-gambling" className="hover:text-white transition">Gambling Info</Link></li>
              <li><a href="https://www.ncpgambling.org" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">NCPG</a></li>
              <li>
                <a href="tel:1-800-522-4700" className="hover:text-white transition">1-800-GAMBLER</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-brand-mid-navy pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-300">&copy; 2024 BetAndPlayUSA. All rights reserved.</p>
            <div className="flex gap-2">
              <span className="text-xs text-gray-400">⚠️ Affiliate Disclosure: We earn commissions from sportsbook signups</span>
            </div>
          </div>

          {/* Gambling disclaimer */}
          <div className="mt-6 pt-6 border-t border-brand-mid-navy">
            <p className="text-xs text-gray-400 leading-relaxed">
              Must be 21+ to participate. New customers only. For responsible gambling resources, call 1-800-GAMBLER (1-800-522-4700) or visit www.ncpgambling.org. 
              Sports betting is not available in all states.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
