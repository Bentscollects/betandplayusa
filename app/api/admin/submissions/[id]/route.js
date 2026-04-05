import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://pnloiztluwwzznotbejg.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBubG9penRsdXd3enpub3RiZWpnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTI5OTM3NywiZXhwIjoyMDkwODc1Mzc3fQ.PufBrjpwsNosGHWSK1CK9m-vSOB757vzAsdfy5JUONc"
);

export async function PATCH(request, context) {
  try {
    const params = await context.params;
    const id = params.id;
    console.log("PATCH id:", id);

    const body = await request.json();
    const { status } = body;

    const validStatuses = ["pending", "approved", "flagged", "rejected", "host_verified"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("submissions")
      .update({ status })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Send Telegram approval email if approved and type is social
    if (status === 'approved' && data.type === 'social' && data.email) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer re_Uovusepx_Gq9ZXbg9X7yz9joCDeRnqvsa' },
        body: JSON.stringify({
          from: 'onboarding@resend.dev',
          to: data.email,
          subject: 'You have been approved - here is your Telegram invite',
          html: '<p>Hi ' + data.first_name + ',</p><p>Great news! Your proof has been verified and you have been approved to join our premium Telegram betting tips group.</p><p>Click the link below to join:</p><p><a href="TELEGRAM_INVITE_LINK">Join the Telegram Group</a></p><p>Welcome to the group!</p><p>- BetAndPlayUSA Team</p>',
        }),
      }).catch(function(e) { console.error('Approval email error:', e); });
    }
    return NextResponse.json({ submission: data });
  } catch (e) {
    console.error("Route error:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
