"use client";

import { useEffect } from "react";
import { useUserStore } from "../lib/stores/userStore";
import { getSupabaseBrowserClient } from "../lib/supabase/browser-client";
import type { User } from "@supabase/supabase-js";

export default function AuthListener({ serverUser }: { serverUser?: User | null }) {
  const setUser = useUserStore((s) => s.setUser);

  useEffect(() => {
    if (serverUser) setUser(serverUser);

    const supabase = getSupabaseBrowserClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user ?? null));

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => sub?.subscription?.unsubscribe?.();
  }, [serverUser, setUser]);

  return null;
}