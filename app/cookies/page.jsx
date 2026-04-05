export default function CookiePage() {
  return (
    <article className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
      <div className="prose prose-sm max-w-none">
        <p className="mb-4 text-gray-600">Last updated: April 2024</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">What Are Cookies?</h2>
        <p className="mb-4">
          Cookies are small files stored on your device that help us improve your experience on BetAndPlayUSA. They are typically small text files with a unique identifier.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Cookies We Use</h2>

        <h3 className="text-lg font-semibold mt-6 mb-3">Essential Cookies</h3>
        <p className="mb-4">
          These are necessary for the site to function:
        </p>
        <ul className="list-disc list-inside mb-4 space-y-2">
          <li><strong>Detected state:</strong> Remembers your detected geographic state to show you relevant sportsbooks</li>
          <li><strong>Consent preferences:</strong> Stores your cookie and privacy consent choices</li>
          <li><strong>Session tokens:</strong> Used for admin login sessions (only for authenticated users)</li>
        </ul>

        <h3 className="text-lg font-semibold mt-6 mb-3">Analytics Cookies</h3>
        <p className="mb-4">
          We may use simple analytics to understand traffic patterns (no third-party tracking).
        </p>

        <h3 className="text-lg font-semibold mt-6 mb-3">Functional Cookies</h3>
        <p className="mb-4">
          These help us remember your preferences and improve your experience (form data, language preference, etc.).
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Third-Party Cookies</h2>
        <p className="mb-4">
          When you click an affiliate link to a sportsbook, that sportsbook may set its own cookies. Please refer to their cookie policies.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Managing Cookies</h2>
        <p className="mb-4">
          You have full control over cookies in your browser:
        </p>
        <ul className="list-disc list-inside mb-4 space-y-2">
          <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
          <li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</li>
          <li><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
          <li><strong>Edge:</strong> Settings → Privacy, search, and services → Clear browsing data</li>
        </ul>

        <p className="mb-4 mt-4">
          <strong>Note:</strong> Disabling cookies may affect site functionality. For example, we won't remember your state, so you'd see all sportsbooks rather than just those available in your location.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Cookie Consent Banner</h2>
        <p className="mb-4">
          On your first visit, you'll see our cookie consent banner. You can:
        </p>
        <ul className="list-disc list-inside mb-4 space-y-2">
          <li><strong>Accept:</strong> Allow all cookies (recommended for full functionality)</li>
          <li><strong>Decline:</strong> Disable non-essential cookies (site still works, but with reduced features)</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">Questions?</h2>
        <p className="mb-4">
          Contact us: <strong>privacy@betandplayusa.com</strong>
        </p>
      </div>
    </article>
  )
}
