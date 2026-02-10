"use client";

import { useState } from "react";
import { useEventStore } from "../lib/stores/userEventStore";
import { useRouter } from "next/navigation";


type MealTime = "breakfast" | "lunch" | "dinner";

export default function PreferenceForm() {

  const setDate = useEventStore((s) => s.setDate);
  const date = useEventStore((s) => s.date);
  const mealTime = useEventStore((s) => s.eventType);
  const setMealTime = useEventStore((s) => s.setEventType);
  const [status, setStatus] = useState<string | null>(null);

  const router = useRouter();
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  const todayStr = today.toISOString().split("T")[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!date || !mealTime) {
      setStatus("Please select a date and a time.");
      return;
    }

    router.push(`/fetchTables`);

 
  };

  return (
    <div className="text-sm text-slate-400">
      <form
        onSubmit={handleSubmit}
        className="relative overflow-hidden rounded-[32px] border border-white-500/30 bg-gradient-to-br from-[#05130d] via-[#04100c] to-[#0c2a21] p-8 text-slate-100 shadow-[0_35px_90px_rgba(2,6,23,0.65)]"
      >
        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute -left-4 -top-4 -z-10 h-20 w-28 rounded-full bg-[radial-gradient(circle,_rgba(16,185,129,0.25),_transparent)] blur-lg"
        />
        <div
          className="pointer-events-none absolute -bottom-10 right-2 -z-10 h-28 w-40 rounded-full bg-[linear-gradient(140deg,_rgba(45,212,191,0.32),_rgba(59,130,246,0.12))] blur-xl"
        />

        {/* Header */}
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.2em] text-amber-200/70">
            Schedule
          </p>
          <h3 className="text-xl font-semibold text-white">
            Pick a date & time
          </h3>
        </div>

        {/* Calendar picker */}
        <label className="block text-sm font-medium text-slate-200">
         <div className="relative mt-2">
            <input
            type="date"
            min={todayStr}
            value={date || todayStr}
            onChange={(e) => setDate(e.target.value)}
            required
            className="
                w-full appearance-none rounded-2xl
                border border-white/10
                bg-[#0b1b18]
                px-4 py-3
                text-base text-white
                shadow-inner shadow-black/30
                focus:border-amber-400
                focus:outline-none
                focus:ring-2 focus:ring-amber-400/30
                transition
            "
            />

            {/* Subtle right-side affordance */}
            <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-400">
            📅
            </div>
         </div>
        </label>

        {/* Enumerated time selection */}
        <div className="mt-6">
          <p className="mb-2 text-sm font-medium text-slate-200">
            Preferred time
          </p>
          <div className="flex gap-2 rounded-full border border-white/10 bg-white/[0.07] p-1">
            {(
              [
                ["breakfast", "Breakfast"],
                ["lunch", "Lunch"],
                ["dinner", "Dinner"],
              ] as [MealTime, string][]
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                aria-pressed={mealTime === value}
                onClick={() => setMealTime(value)}
                className={`flex-1 rounded-full px-4 py-2 text-xs font-semibold transition ${
                  mealTime === value
                    ? "bg-amber-500/30 text-white shadow shadow-amber-500/20"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-amber-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-amber-900/30 transition hover:bg-amber-400"
        >
          Find a Table
        </button>

        {status && (
          <p className="mt-4 text-sm text-slate-300" role="status">
            {status}
          </p>
        )}
      </form>
    </div>
  );
}
