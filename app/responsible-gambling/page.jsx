export default function ResponsibleGamblingPage() {
  return (
    <article className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-8">Responsible Gambling</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Gambling Should Be Fun</h2>
        <p className="mb-4 text-gray-600">
          Sports betting is entertainment. Only bet money you can afford to lose. If betting stops being fun, we're here to help.
        </p>
      </section>

      <section className="mb-12 bg-red-50 border border-red-200 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-red-900">⚠️ Get Help Now</h2>
        <p className="mb-4 font-semibold">If you or someone you know is struggling with problem gambling:</p>
        <div className="space-y-3">
          <p className="flex items-center gap-4">
            <span className="text-2xl">📞</span>
            <strong>1-800-GAMBLER</strong> (1-800-522-4700)
            <br/>
            <span className="text-sm text-red-900">Available 24/7, confidential, free</span>
          </p>
          <p className="flex items-center gap-4">
            <span className="text-2xl">🌐</span>
            <a href="https://www.ncpgambling.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">
              National Council on Problem Gambling
            </a>
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Tips for Responsible Gaming</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="font-bold mb-3 text-lg">💰 Set Limits</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Set a budget before betting</li>
              <li>• Never bet more than you can afford to lose</li>
              <li>• Use deposit limits at sportsbooks</li>
              <li>• Track your spending</li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="font-bold mb-3 text-lg">⏰ Time Management</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Set time limits for betting sessions</li>
              <li>• Don't chase losses</li>
              <li>• Take regular breaks</li>
              <li>• Balance betting with other activities</li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="font-bold mb-3 text-lg">🚫 Red Flags</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Thinking about betting constantly</li>
              <li>• Betting to escape problems</li>
              <li>• Borrowing money to gamble</li>
              <li>• Not telling friends/family how much you bet</li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="font-bold mb-3 text-lg">🛡️ Protection Tools</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Self-exclusion at sportsbooks</li>
              <li>• Loss limits (max daily/weekly loss)</li>
              <li>• Deposit limits</li>
              <li>• Reality check notifications</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">State Resources</h2>
        <p className="text-gray-600 mb-4">
          Each state may have additional resources and support services. Contact your state gaming commission or mental health department for more information.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">What is Problem Gambling?</h2>
        <p className="text-gray-600 mb-4">
          Problem gambling is when betting starts to negatively impact your life. Signs include:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>Unable to control or limit betting</li>
          <li>Increasing bets to get the same excitement</li>
          <li>Hiding or lying about gambling</li>
          <li>Borrowing money to gamble or pay losses</li>
          <li>Neglecting work, school, or relationships</li>
          <li>Feeling anxious or depressed without betting</li>
          <li>Repeatedly trying and failing to quit</li>
        </ul>
      </section>

      <section className="mb-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Gamblers Anonymous</h2>
        <p className="text-gray-700 mb-4">
          A free, peer-support fellowship for anyone affected by problem gambling. Meetings are held in-person and online across the US.
        </p>
        <p>
          <strong>Learn more:</strong> <a href="https://www.gamblersanonymous.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">gamblersanonymous.org</a>
        </p>
      </section>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <p className="text-sm text-gray-600">
          <strong>BetAndPlayUSA Commitment:</strong> We support responsible gambling. If you ever feel unsafe using our service or have concerns about your betting, please reach out to us at support@betandplayusa.com. We're here to help.
        </p>
      </div>
    </article>
  )
}
