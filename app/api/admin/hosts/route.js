import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://pnloiztluwwzznotbejg.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBubG9penRsdXd3enpub3RiZWpnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTI5OTM3NywiZXhwIjoyMDkwODc1Mzc3fQ.PufBrjpwsNosGHWSK1CK9m-vSOB757vzAsdfy5JUONc"
);

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("host_codes")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return NextResponse.json({ hosts: data });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { code, venue_name, host_name, city, state } = body;
    if (!code || !venue_name) {
      return NextResponse.json({ error: "Code and venue name are required" }, { status: 400 });
    }
    const { data, error } = await supabase
      .from("host_codes")
      .insert({ code, venue_name, host_name, city, state, active: true })
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json({ host: data });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
