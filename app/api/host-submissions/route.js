import { createClient } from '@supabase/supabase-js'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const hostCode = searchParams.get('hostCode')

    if (!hostCode) {
      return Response.json({ error: 'Missing host code' }, { status: 400 })
    }

    console.log(`[host-submissions] Fetching submissions for host code: ${hostCode}`)

    // Create Supabase admin client - exact same as validate-code
    const supabase = createClient(
      'https://pnloiztluwwzznotbejg.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBubG9penRsdXd3enpub3RiZWpnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTI5OTM3NywiZXhwIjoyMDkwODc1Mzc3fQ.PufBrjpwsNosGHWSK1CK9m-vSOB757vzAsdfy5JUONc'
    )

    // Calculate date 7 days ago
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    const sevenDaysAgoISO = sevenDaysAgo.toISOString()

    const searchHostCode = hostCode.toUpperCase()
    console.log(`[host-submissions] Query params - hostCode: "${searchHostCode}", sevenDaysAgo: "${sevenDaysAgoISO}"`)

    // Fetch submissions from last 7 days for this host code
    const { data, error } = await supabase
      .from('submissions')
      .select('*')
      .eq('host_code', searchHostCode)
      .gte('created_at', sevenDaysAgoISO)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('[host-submissions] Database error:', error)
      return Response.json({ error: 'Failed to fetch submissions' }, { status: 500 })
    }

    console.log(`[host-submissions] Found ${data?.length || 0} submissions`)
    if (data && data.length > 0) {
      console.log('[host-submissions] Sample submission:', JSON.stringify(data[0], null, 2))
    } else {
      console.log('[host-submissions] Query returned no results. Full data:', JSON.stringify(data, null, 2))
      // Also try fetching without date filter to see if host_code matches anything
      const { data: allData } = await supabase
        .from('submissions')
        .select('id, host_code, created_at, first_name, last_name')
        .eq('host_code', searchHostCode)
      console.log(`[host-submissions] Submissions with host_code "${searchHostCode}" (no date filter):`, JSON.stringify(allData, null, 2))
    }

    return Response.json({
      submissions: data || []
    })
  } catch (err) {
    console.error('[host-submissions] Error:', err)
    return Response.json({ error: err.message }, { status: 500 })
  }
}
