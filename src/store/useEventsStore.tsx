import { create } from "zustand";

type EventsStore = {
  refreshMyEvents: () => void;
  lastUpdated: number;
};

export const useEventsStore = create<EventsStore>((set) => ({
  lastUpdated: Date.now(),
  refreshMyEvents: () => set({ lastUpdated: Date.now() }),
}));
