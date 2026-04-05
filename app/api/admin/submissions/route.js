import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://pnloiztluwwzznotbejg.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBubG9penRsdXd3enpub3RiZWpnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTI5OTM3NywiZXhwIjoyMDkwODc1Mzc3fQ.PufBrjpwsNosGHWSK1CK9m-vSOB757vzAsdfy5JUONc"
);

export async function GET() {
  const { data, error } = await supabase
    .from("submissions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message, submissions: [] }, { status: 500 });
  }

  return NextResponse.json({ submissions: data, firstRowKeys: data && data[0] ? Object.keys(data[0]) : [] });
}
