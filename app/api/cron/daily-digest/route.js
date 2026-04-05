import { supabase } from '@/lib/supabase'

export async function GET(request) {
  // Verify this is a Vercel cron request
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 })
  }

  try {
    // Get today's submissions
    const today = new Date().toISOString().split('T')[0]
    const { data: todaysSubmissions } = await supabase
      .from('submissions')
      .select('*')
      .gte('created_at', today)

    // Get all submissions for counts
    const { data: allSubmissions } = await supabase
      .from('submissions')
      .select('*')

    // Calculate stats
    const stats = {
      totalToday: todaysSubmissions?.length || 0,
      pending: allSubmissions?.filter(s => s.status === 'pending').length || 0,
      approved: allSubmissions?.filter(s => s.status === 'approved').length || 0,
      flagged: allSubmissions?.filter(s => s.status === 'flagged').length || 0,
      topHost: { code: 'N/A', venue: 'N/A', count: 0 },
      topSportsbook: { name: 'N/A', count: 0 },
      topState: 'N/A',
      topStateCount: 0
    }

    // Find top sportsbook
    const sportsbookCounts = {}
    allSubmissions?.forEach(s => {
      sportsbookCounts[s.sportsbook] = (sportsbookCounts[s.sportsbook] || 0) + 1
    })
    const topSB = Object.entries(sportsbookCounts).sort((a, b) => b[1] - a[1])[0]
    if (topSB) {
      stats.topSportsbook = { name: topSB[0], count: topSB[1] }
    }

    // Find top state
    const stateCounts = {}
    allSubmissions?.forEach(s => {
      if (s.state && s.state !== 'social-acquisition') {
        stateCounts[s.state] = (stateCounts[s.state] || 0) + 1
      }
    })
    const topState = Object.entries(stateCounts).sort((a, b) => b[1] - a[1])[0]
    if (topState) {
      stats.topState = topState[0]
      stats.topStateCount = topState[1]
    }

    // Send via email
    await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/send-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'daily-digest',
        date: new Date().toLocaleDateString(),
        stats,
        dashboardUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/admin/overview`
      })
    })

    return Response.json({ success: true, stats })
  } catch (error) {
    console.error('Cron error:', error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}
