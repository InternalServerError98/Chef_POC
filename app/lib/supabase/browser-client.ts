"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

type SupabaseSchema = Record<string, never>;

let client: SupabaseClient<SupabaseSchema> | null = null;

export function getSupabaseBrowserClient(): SupabaseClient<SupabaseSchema> {
  if (client) {
    return client;
  }

 const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
 const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error(
      "Missing Supabase environment variables"
    );
  }

  client = createBrowserClient<SupabaseSchema>(SUPABASE_URL, SUPABASE_ANON_KEY);
  return client;
}