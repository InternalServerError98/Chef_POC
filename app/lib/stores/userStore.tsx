"use client";

import { create } from "zustand";
import type { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

type State = {
  user: User | null;
  setUser: (u: User | null) => void;
  signOut: () => Promise<void>;
};

export const useUserStore = create<State>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  signOut: async () => {
    // server clears cookies/session
    await fetch("/api/auth/logout", { method: "POST" });
    set({ user: null });
  },
}));