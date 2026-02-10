"use client";

import Navigation from "../components/navigation";
import { useEventStore } from '../lib/stores/userEventStore';
import Loader from '../components/loader';
import { useEffect, useState } from "react";
import { EventsTable } from "../components/eventsTable";

export default function FetchTablesPage() { 

  type MealTime = "breakfast" | "lunch" | "dinner";

  const date = useEventStore((s) => s.date);
  const setDate = useEventStore((s) => s.setDate);
  const eventType = useEventStore((s) => s.eventType);
  const setEventType = useEventStore((s) => s.setEventType);
  const [loading, setLoading] = useState(true);
  const [data,setData] = useState<any>(null);

  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  const todayStr = today.toISOString().split("T")[0];


  useEffect(() => {
    setLoading(true);
    fetch(`/api/events?date=${date}&eventType=${eventType}`)
      .then(async (res) => {
        const data = await res.json();
        setData(data);
        setLoading(false);
      });
  }, [eventType, date]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-8 py-12 bg-white dark:bg-black">
        <Navigation />
        <div className="min-h-screen flex-col justify-between">
           <>
            <div className="my-12">
                <p className="text-xs uppercase tracking-[0.2em] text-amber-200/70">Filters</p>
                <div className="mt-3 flex flex-wrap items-center gap-4">
                {/* Date input */}
                <label className="flex items-center gap-3">
                     <div className="relative mt-2 mr-4">
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

                {/* Event type selector (horizontal pills) */}
                <div className="relative mt-2">
                    <div className="flex gap-2 rounded-full border border-white/10 bg-white/[0.03] p-1">
                    {(
                        [
                        ['breakfast', 'Breakfast'],
                        ['lunch', 'Lunch'],
                        ['dinner', 'Dinner'],
                        ] as [MealTime, string][]
                    ).map(([value, label]) => (
                        <button
                        key={value}
                        type="button"
                        aria-pressed={eventType === value}
                        onClick={() => setEventType(value)}
                        className={`flex-1 rounded-full px-4 py-2 text-xs font-semibold transition ${
                            eventType === value
                            ? 'bg-amber-500/30 text-white shadow shadow-amber-500/20'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                        >
                        {label}
                        </button>
                    ))}
                    </div>
                </div>
                </div>
            </div>
            {loading ? (<Loader/>) : 
              (
              <div>
                <EventsTable events={data} />
              </div>
              )
            }
           </>
        </div>
       
      </main>
    </div>
  );
}



