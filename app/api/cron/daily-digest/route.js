import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://pnloiztluwwzznotbejg.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBubG9penRsdXd3enpub3RiZWpnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTI5OTM3NywiZXhwIjoyMDkwODc1Mzc3fQ.PufBrjpwsNosGHWSK1CK9m-vSOB757vzAsdfy5JUONc"
);

const RESEND_KEY = "re_Uovusepx_Gq9ZXbg9X7yz9joCDeRnqvsa";
const ADMIN = "liambenton2@gmail.com";
const CPA_RATES = { fanduel: 250, draftkings: 200, caesars: 200, fanatics: 200, betmgm: 150 };

export async function GET(request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== 'Bearer ' + process.env.CRON_SECRET && process.env.CRON_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const { data: allSubmissions } = await supabase.from('submissions').select('*').order('created_at', { ascending: false });
    const { data: newSubmissions } = await supabase.from('submissions').select('*').gte('created_at', yesterday.toISOString()).lt('created_at', today.toISOString());

    const total = allSubmissions ? allSubmissions.length : 0;
    const newToday = newSubmissions ? newSubmissions.length : 0;
    const pending = allSubmissions ? allSubmissions.filter(function(s) { return s.status === 'pending'; }).length : 0;
    const approved = allSubmissions ? allSubmissions.filter(function(s) { return s.status === 'approved'; }).length : 0;
    const flagged = allSubmissions ? allSubmissions.filter(function(s) { return s.status === 'flagged'; }).length : 0;

    const totalCPA = allSubmissions ? allSubmissions.filter(function(s) { return s.status === 'approved'; }).reduce(function(sum, s) { return sum + (CPA_RATES[s.sportsbook] || 0); }, 0) : 0;

    const venueMap = {};
    if (newSubmissions) {
      newSubmissions.forEach(function(s) {
        const key = s.venue_name || s.host_code || 'Social';
        venueMap[key] = (venueMap[key] || 0) + 1;
      });
    }
    const topVenue = Object.entries(venueMap).sort(function(a, b) { return b[1] - a[1]; })[0];

    const bookMap = {};
    if (newSubmissions) {
      newSubmissions.forEach(function(s) { bookMap[s.sportsbook] = (bookMap[s.sportsbook] || 0) + 1; });
    }
    const topBook = Object.entries(bookMap).sort(function(a, b) { return b[1] - a[1]; })[0];

    const dateStr = yesterday.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

    const html = '<div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;background:#f4f6fa;padding:24px">' +
      '<div style="background:#1B3A6B;padding:24px;border-radius:12px 12px 0 0;border-top:4px solid #D91E27">' +
      '<h1 style="color:#fff;margin:0;font-size:20px;font-weight:900;text-transform:uppercase">Daily Report</h1>' +
      '<p style="color:rgba(255,255,255,0.6);margin:4px 0 0;font-size:14px">' + dateStr + '</p></div>' +
      '<div style="background:#fff;padding:24px;border-radius:0 0 12px 12px">' +
      '<h2 style="font-size:14px;font-weight:800;color:#1B3A6B;text-transform:uppercase;letter-spacing:0.5px;margin:0 0 16px">New submissions yesterday: <span style="color:#D91E27;font-size:24px">' + newToday + '</span></h2>' +
      '<table style="width:100%;border-collapse:collapse;margin-bottom:24px">' +
      '<tr><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;color:#6b7280;font-size:14px">Total all time</td><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;font-weight:700;color:#111827;text-align:right">' + total + '</td></tr>' +
      '<tr><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;color:#6b7280;font-size:14px">Pending</td><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;font-weight:700;color:#854d0e;text-align:right">' + pending + '</td></tr>' +
      '<tr><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;color:#6b7280;font-size:14px">Approved</td><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;font-weight:700;color:#166534;text-align:right">' + approved + '</td></tr>' +
      '<tr><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;color:#6b7280;font-size:14px">Flagged</td><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;font-weight:700;color:#991b1b;text-align:right">' + flagged + '</td></tr>' +
      '<tr><td style="padding:8px 0;color:#6b7280;font-size:14px">Est. total CPA earned</td><td style="padding:8px 0;font-weight:900;color:#D91E27;text-align:right;font-size:18px">$' + totalCPA.toLocaleString() + '</td></tr>' +
      '</table>' +
      (topVenue ? '<p style="font-size:13px;color:#6b7280">Top venue yesterday: <strong style="color:#1B3A6B">' + topVenue[0] + ' (' + topVenue[1] + ' signups)</strong></p>' : '') +
      (topBook ? '<p style="font-size:13px;color:#6b7280">Top sportsbook yesterday: <strong style="color:#1B3A6B;text-transform:capitalize">' + topBook[0] + ' (' + topBook[1] + ' signups)</strong></p>' : '') +
      '<a href="https://betandplayusa.vercel.app/admin/overview" style="display:block;background:#D91E27;color:#fff;text-align:center;padding:14px;border-radius:8px;text-decoration:none;font-weight:800;font-size:14px;text-transform:uppercase;margin-top:20px">View Admin Dashboard</a>' +
      '</div></div>';

    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + RESEND_KEY },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: ADMIN,
        subject: 'Daily Report - ' + dateStr + ' - ' + newToday + ' new submissions',
        html: html,
      }),
    });

    return NextResponse.json({ success: true, newSubmissions: newToday, total, approved, pending, totalCPA });
  } catch (e) {
    console.error('Cron error:', e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
