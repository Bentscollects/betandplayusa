import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const { code } = await request.json()

  console.log('SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
  console.log('SERVICE_KEY exists:', !!process.env.SUPABASE_SERVICE_ROLE_KEY)

  // Temporary hardcoded values for testing
  const supabase = createClient(
    'https://pnloiztluwwzznotbejg.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBubG9penRsdXd3enpub3RiZWpnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTI5OTM3NywiZXhwIjoyMDkwODc1Mzc3fQ.PufBrjpwsNosGHWSK1CK9m-vSOB757vzAsdfy5JUONc'
  )

  const { data, error } = await supabase
    .from('host_codes')
    .select('*')
    .eq('code', code.toUpperCase())
    .eq('active', true)
    .single()

  if (error || !data) {
    console.log('Validation failed for code:', code.toUpperCase())
    console.log('Supabase error:', error)
    return NextResponse.json({ valid: false }, { status: 404 })
  }

  return NextResponse.json({ valid: true, venue: data })
}