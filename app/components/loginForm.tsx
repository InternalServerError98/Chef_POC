"use client";

import { User } from "@supabase/supabase-js";
import { useState, useEffect, use } from "react";
import { getSupabaseBrowserClient } from "../lib/supabase/browser-client";
import PreferenceForm  from "./preferenceSelector";
import Loader from "./loader";
import { useUserStore } from "../lib/stores/userStore";


type Mode = "signup" | "signin";

export default function LoginForm() {

  const user = useUserStore((s) => s.user);
  const [mode, setMode] = useState("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const supabase = getSupabaseBrowserClient();
  const [currentUser, setCurrentUser] = useState<User | null>(user);

  useEffect(() => {
    setCurrentUser(user);
    setStatus("");
  }, [user]);

    
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (mode == "signup") {
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/welcome`,
        }
      });
      if (error) {
        setStatus(error.message);
      } else {
        setStatus("Check your inbox to confirm the new account.");
      }
    } else {
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setStatus(error.message);
      } else {
        setStatus("Signed in successfully");
      }
    }
  }

   useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setCurrentUser(session?.user ?? null);
      }
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [supabase])

  return (
    <>
    {!currentUser && (
        <div className="text-sm text-slate-400">
          <form
            className="relative overflow-hidden rounded-[32px] border border-white-500/30 bg-gradient-to-br from-[#05130d] via-[#04100c] to-[#0c2a21] p-8 text-slate-100 shadow-[0_35px_90px_rgba(2,6,23,0.65)]"
            onSubmit={handleSubmit}
          >
            <div
              className="pointer-events-none absolute -left-4 -top-4 -z-10 h-20 w-28 rounded-full bg-[radial-gradient(circle,_rgba(16,185,129,0.25),_transparent)] blur-lg"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-10 right-2 -z-10 h-28 w-40 rounded-full bg-[linear-gradient(140deg,_rgba(45,212,191,0.32),_rgba(59,130,246,0.12))] blur-xl"
              aria-hidden="true"
            />
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-amber-200/70">
                  Credentials
                </p>
                <h3 className="text-xl font-semibold text-white">
                  {mode === "signup" ? "Create account" : "Welcome back"}
                </h3>
              </div>
              <div className="flex rounded-full border border-white/10 bg-white/[0.07] p-1 text-xs font-semibold text-slate-300">
                {(["signup", "signin"] as Mode[]).map((option) => (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={mode === option}
                    onClick={() => setMode(option)}
                    className={`rounded-full px-4 py-1 transition ${mode === option
                      ? "bg-amber-500/30 text-white shadow shadow-amber-500/20"
                      : "text-slate-400"
                      }`}
                  >
                    {option === "signup" ? "Sign up" : "Sign in"}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <label className="block text-sm font-medium text-slate-200">
                Email
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0b1b18] px-3 py-2.5 text-base text-white placeholder-slate-500 shadow-inner shadow-black/30 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30"
                  placeholder="you@email.com"
                />
              </label>
              <label className="block text-sm font-medium text-slate-200">
                Password
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  minLength={6}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0b1b18] px-3 py-2.5 text-base text-white placeholder-slate-500 shadow-inner shadow-black/30 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30"
                  placeholder="At least 6 characters"
                />
              </label>
            </div>
            <button
              type="submit"
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-amber-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-amber-900/30 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:bg-amber-600/40"
            >
              {mode === "signup" ? "Create account" : "Sign in"}
            </button>
            {status && (
              <p className="mt-4 text-sm text-slate-300" role="status" aria-live="polite">
                {status}
              </p>
            )}
          </form>
        </div>
      )}

    {currentUser && (

       <PreferenceForm/>
    )}
    </>
  );

    






}