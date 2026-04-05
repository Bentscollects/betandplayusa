import { Resend } from 'resend'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL

function getResendClient() {
  const key = process.env.RESEND_API_KEY
  if (!key) {
    throw new Error('Missing Resend API key')
  }
  return new Resend(key)
}

export async function POST(request) {
  try {
    const resend = getResendClient()
    const body = await request.json()
    const { type } = body

    if (type === 'admin-notification') {
      const { submission } = body
      const subject = `New ${submission.submissionType === 'inperson' ? 'In-person' : 'Social'} submission — ${submission.hostCode} · ${submission.venue}, ${submission.state}`

      await resend.emails.send({
        from: 'noreply@betandplayusa.com',
        to: ADMIN_EMAIL,
        subject,
        html: `
          <h2>New Submission</h2>
          <p><strong>Name:</strong> ${submission.name}</p>
          <p><strong>Email:</strong> ${submission.email}</p>
          <p><strong>Host Code:</strong> ${submission.hostCode}</p>
          <p><strong>Venue:</strong> ${submission.venue}</p>
          <p><strong>Sportsbook:</strong> ${submission.sportsbook}</p>
          <p><strong>Files:</strong> ${submission.fileCount}</p>
          <p><strong>Type:</strong> ${submission.submissionType}</p>
          <p><strong>State:</strong> ${submission.state}</p>
          <p>
            <a href="https://betandplayusa.com/admin/submissions">View in dashboard</a>
          </p>
        `
      })

      return Response.json({ success: true })
    }

    if (type === 'user-confirmation') {
      const { email, firstName, sportsbook, fileCount, venue } = body

      await resend.emails.send({
        from: 'noreply@betandplayusa.com',
        to: email,
        subject: `You're all set, ${firstName} — we've received your proof`,
        html: `
          <h2>Submission Received</h2>
          <p>Hi ${firstName},</p>
          <p>We've received your proof submission for <strong>${sportsbook}</strong>.</p>
          <p><strong>Files received:</strong> ${fileCount}</p>
          ${venue ? `<p><strong>Venue:</strong> ${venue}</p>` : ''}
          <p>Your data is held securely for 90 days for verification purposes only and is not shared with third parties.</p>
          <p>Questions? Contact us at privacy@betandplayusa.com</p>
          <hr />
          <p style="font-size: 12px; color: #999;">
            This email was sent because you submitted a form on BetAndPlayUSA.
          </p>
        `
      })

      return Response.json({ success: true })
    }

    if (type === 'daily-digest') {
      const { date, stats, dashboardUrl } = body

      await resend.emails.send({
        from: 'noreply@betandplayusa.com',
        to: ADMIN_EMAIL,
        subject: `Daily report · ${date} — ${stats.totalToday} new submissions`,
        html: `
          <h2>Daily Report - ${date}</h2>
          <p><strong>Total submissions today:</strong> ${stats.totalToday}</p>
          <p><strong>Pending:</strong> ${stats.pending}</p>
          <p><strong>Approved:</strong> ${stats.approved}</p>
          <p><strong>Flagged:</strong> ${stats.flagged}</p>
          <p><strong>Top host:</strong> ${stats.topHost.code} (${stats.topHost.venue}) - ${stats.topHost.count} signups</p>
          <p><strong>Top sportsbook:</strong> ${stats.topSportsbook.name} - ${stats.topSportsbook.count} signups</p>
          <p><strong>Top state:</strong> ${stats.topState} - ${stats.topStateCount} signups</p>
          <p>
            <a href="${dashboardUrl}">View full dashboard</a>
          </p>
        `
      })

      return Response.json({ success: true })
    }

    return Response.json({ error: 'Unknown email type' }, { status: 400 })
  } catch (error) {
    console.error('Email send error:', error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}
