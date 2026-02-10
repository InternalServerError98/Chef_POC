'use client';
import {create} from 'zustand';
import { persist } from 'zustand/middleware';


type State = {
  date: string | null;
  eventType: string | null;
  setDate: (d: string | null) => void;
  setEventType: (t: string | null) => void;
  reset: () => void;
};

export const useEventStore = create<State>()(
  persist(
    (set) => ({
      date: null,
      eventType: null,
      setDate: (date) => set({ date }),
      setEventType: (eventType) => set({ eventType }),
      reset: () => set({ date: null, eventType: null }),
    }),
    {
      name: 'event-store', // localStorage key
      partialize: (state) => ({
      date: state.date,
      eventType: state.eventType,
    }),
    }
  )
)

// export const useEventStore = create<State>(
//   (set) => ({
//   date: null,
//   eventType: null,
//   setDate: (date) => set({ date }),
//   setEventType: (eventType) => set({ eventType }),
//   reset: () => set({ date: null, eventType: null }),
// }));
