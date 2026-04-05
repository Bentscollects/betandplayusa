import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(request) {
  try {
    const { submissionId, notes } = await request.json()

    if (!submissionId) {
      return NextResponse.json({ error: 'Missing submission ID' }, { status: 400 })
    }

    const supabase = createClient(
      'https://pnloiztluwwzznotbejg.supabase.co',
      process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBubG9penRsdXd3enpub3RiZWpnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTI5OTM3NywiZXhwIjoyMDkwODc1Mzc3fQ.PufBrjpwsNosGHWSK1CK9m-vSOB757vzAsdfy5JUONc'
    )

    // 1. Fetch the full submission record
    const { data: submission, error: fetchError } = await supabase
      .from('submissions')
      .select('*')
      .eq('id', submissionId)
      .single()

    if (fetchError || !submission) {
      console.error('Fetch submission error:', fetchError)
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 })
    }

    // 2. Send emails using Resend
    const resend = new Resend('re_Uovusepx_Gq9ZXbg9X7yz9joCDeRnqvsa')

    // Prepare user email
    const userEmail = submission.email
    const firstName = submission.first_name || submission.firstName || ''
    const venueName = submission.venue_name || submission.venue || ''
    const sportsbook = submission.sportsbook || ''
    const hostCode = submission.host_code || submission.hostCode || ''

    const userSubject = 'Great news — your reward has been verified!'
    const userBody = `Hi ${firstName}, your submission has been verified by your host at ${venueName}. Your cash reward is confirmed — if you haven't collected it yet, show this email to your host. Signed up with: ${sportsbook}. Reference code: ${hostCode}. The BetAndPlayUSA team.`

    // Prepare admin email
    const adminEmail = 'liambenton2@gmail.com'
    const adminSubject = `Host verification — ${hostCode} · ${venueName}`
    const adminBody = `Name: ${firstName} ${submission.last_name || submission.lastName || ''}\nEmail: ${userEmail}\nSportsbook: ${sportsbook}\nHost code: ${hostCode}\nVenue: ${venueName}\nNotes: ${notes || submission.host_verification_notes || ''}\nTimestamp: ${new Date().toISOString()}`

    // Send user email
    try {
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: userEmail,
        subject: userSubject,
        text: userBody
      })
    } catch (e) {
      console.error('Failed to send user email:', e)
    }

    // Send admin email
    try {
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: adminEmail,
        subject: adminSubject,
        text: adminBody
      })
    } catch (e) {
      console.error('Failed to send admin email:', e)
    }

    // 3. Update submission status and notes
    const updateData = {
      status: 'host_verified',
      host_verified_at: new Date().toISOString()
    }

    if (notes && notes.trim()) {
      updateData.host_verification_notes = notes.trim()
    }

    const { error } = await supabase
      .from('submissions')
      .update(updateData)
      .eq('id', submissionId)

    if (error) {
      console.error('Update error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })

  } catch (err) {
    console.error('Error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
