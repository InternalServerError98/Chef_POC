import { createSupabaseClient } from "../../../lib/supabase/server-client";
import { NextResponse } from "next/server";

export async function POST() {
  const supabase = await createSupabaseClient();
  await supabase.auth.signOut(); // clears server-side session cookie
  return NextResponse.json({ ok: true });
}