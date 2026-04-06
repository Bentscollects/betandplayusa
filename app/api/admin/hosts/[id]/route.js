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
    const body = await request.json();
    const { active } = body;
    const { data, error } = await supabase
      .from("host_codes")
      .update({ active })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json({ host: data });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
