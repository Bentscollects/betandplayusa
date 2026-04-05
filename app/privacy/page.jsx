export default function PrivacyPage() {
  return (
    <article className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <div className="prose prose-sm max-w-none">
        <p className="mb-4 text-gray-600">Last updated: April 2024</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">1. Information We Collect</h2>
        <p className="mb-4">BetAndPlayUSA collects the following personal information:</p>
        <ul className="list-disc list-inside mb-4 space-y-2">
          <li>Full name (first and last)</li>
          <li>Email address</li>
          <li>Telegram username (optional)</li>
          <li>IP address and geolocation data</li>
          <li>Screenshots/videos of account signup and betting proof</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">2. Why We Collect It</h2>
        <ul className="list-disc list-inside mb-4 space-y-2">
          <li>Affiliate verification — to confirm genuine new sportsbook signups</li>
          <li>Reward processing — to issue cash rewards to verified users</li>
          <li>Fraud prevention — to detect duplicate signups and abuse</li>
          <li>State verification — to ensure users are in eligible jurisdictions</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">3. Data Retention</h2>
        <p className="mb-4">
          <strong>Submission data:</strong> Held for 90 days after submission for verification purposes
        </p>
        <p className="mb-4">
          <strong>Analytics data:</strong> Anonymised usage analytics are retained indefinitely
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">4. Who Has Access</h2>
        <p className="mb-4">Your data is accessed by:</p>
        <ul className="list-disc list-inside mb-4 space-y-2">
          <li>BetAndPlayUSA administrators (for verification)</li>
          <li>Affiliated sportsbooks (to track CPA commissions — name and email only)</li>
        </ul>
        <p className="mb-4">
          We do <strong>not</strong> share data with third parties beyond affiliate partners.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">5. Your Rights</h2>
        <p className="mb-4">Under GDPR and CCPA, you have the right to:</p>
        <ul className="list-disc list-inside mb-4 space-y-2">
          <li>Request access to your personal data</li>
          <li>Request deletion of your data</li>
          <li>Request portability of your data</li>
          <li>Opt-out of marketing communications</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">6. Cookies</h2>
        <p className="mb-4">
          We use cookies to store your detected state and remember your consent choices. You can disable cookies in your browser settings.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">7. Contact</h2>
        <p className="mb-4">
          For privacy inquiries, data access requests, or to exercise your rights: <strong>privacy@betandplayusa.com</strong>
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">8. GDPR & CCPA Compliance</h2>
        <p className="mb-4">
          BetAndPlayUSA complies with the General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA). Residents of the EU and California can request data portability and deletion as detailed above.
        </p>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-8">
          <p className="text-sm text-yellow-800">
            <strong>Important:</strong> Submission of proof screenshots may contain identifying information. We recommend editing these images to remove unnecessary personal data before uploading.
          </p>
        </div>
      </div>
    </article>
  )
}
