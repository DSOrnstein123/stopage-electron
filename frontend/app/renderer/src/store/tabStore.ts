import { type Tab } from "@/types/tab.types";
import { create } from "zustand";

interface TabState {
  tabs: Tab[];
  activeTabId: string | null;
  setActiveTab: (id: string) => void;
  addTab: () => void;
}

export const useTabStore = create<TabState>((set) => ({
  tabs: [
    {
      id: "1",
      title: "Tab 1",
      route: "/flashcards",
    },
    {
      id: "2",
      title: "Tab 2",
      route: "/flashcards/c409a68b-2818-427f-b68a-e9df687f761c",
    },
    {
      id: "3",
      title: "Tab 3",
      route: "/flashcards/43afb2e9-ce19-4c36-bba4-5da37b3444bc/study",
    },
    {
      id: "4",
      title: "Tab 4",
      route: "/gallery",
    },
  ],
  activeTabId: null,

  setActiveTab: (id) => set({ activeTabId: id }),
  addTab: () => {
    const id = Date.now().toString();
    const newTab: Tab = {
      id: id,
      title: "New tab",
      route: "/flashcards",
    };

    set((state) => ({
      tabs: [...state.tabs, newTab],
      activeTabId: id,
    }));
  },
}));
