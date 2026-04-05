import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://pnloiztluwwzznotbejg.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBubG9penRsdXd3enpub3RiZWpnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTI5OTM3NywiZXhwIjoyMDkwODc1Mzc3fQ.PufBrjpwsNosGHWSK1CK9m-vSOB757vzAsdfy5JUONc"
);

const RESEND_KEY = "re_Uovusepx_Gq9ZXbg9X7yz9joCDeRnqvsa";
const ADMIN = "liambenton2@gmail.com";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const type = formData.get("type");
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const telegram = formData.get("telegram");
    const sportsbook = formData.get("sportsbook");
    const hostCode = formData.get("hostCode") || null;
    const venueName = formData.get("venueName") || null;
    const consentAge = formData.get("consentAge") === "true";
    const consentData = formData.get("consentData") === "true";
    const consentAffiliate = formData.get("consentAffiliate") === "true";
    const files = formData.getAll("files");
    const fileUrls = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file || !file.name) continue;
      const buffer = await file.arrayBuffer();
      const uint8 = new Uint8Array(buffer);
      const folder = hostCode ? hostCode : "social";
      const fileName = Date.now() + "-" + i + "-" + file.name.replace(/\s+/g, "_");
      const filePath = "submissions/" + folder + "/" + fileName;
      const { error: uploadError } = await supabase.storage.from("proof-uploads").upload(filePath, uint8, { contentType: file.type, upsert: false });
      if (uploadError) { console.error("Upload error:", uploadError); continue; }
      const { data: urlData } = supabase.storage.from("proof-uploads").getPublicUrl(filePath);
      fileUrls.push(urlData.publicUrl);
    }
    const { data: submission, error: dbError } = await supabase.from("submissions").insert({
      type, first_name: firstName, last_name: lastName, email, telegram_username: telegram,
      sportsbook, host_code: hostCode, venue_name: venueName, file_urls: fileUrls,
      status: "pending", consent_age: consentAge, consent_data: consentData, consent_affiliate: consentAffiliate,
    }).select().single();
    if (dbError) { console.error("DB error:", dbError); return NextResponse.json({ error: dbError.message }, { status: 500 }); }
    await fetch("https://api.resend.com/emails", { method: "POST", headers: { "Content-Type": "application/json", Authorization: "Bearer " + RESEND_KEY }, body: JSON.stringify({ from: "onboarding@resend.dev", to: ADMIN, subject: "New " + type + " submission - " + sportsbook, html: "<p>Name: " + firstName + " " + lastName + "</p><p>Email: " + email + "</p><p>Sportsbook: " + sportsbook + "</p><p>Files: " + fileUrls.length + "</p>" }) }).catch(function(e) { console.error(e); });
    await fetch("https://api.resend.com/emails", { method: "POST", headers: { "Content-Type": "application/json", Authorization: "Bearer " + RESEND_KEY }, body: JSON.stringify({ from: "onboarding@resend.dev", to: email, subject: "We received your proof " + firstName, html: "<p>Hi " + firstName + ",</p><p>Proof received for " + sportsbook + ". We will be in touch within 24 hours.</p>" }) }).catch(function(e) { console.error(e); });
    return NextResponse.json({ success: true, submission });
  } catch (e) {
    console.error("Submit route error:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}