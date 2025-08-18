import { type Tab } from "@/types/tab.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TabState {
  tabs: Tab[];
  activeTabId: string | null;

  actions: TabAction;
}

interface TabAction {
  setActiveTab: (id: string) => void;
  addTab: (route: string, title?: string) => void;
  removeTab: (id: string) => void;
}

export const useTabStore = create<TabState, [["zustand/persist", TabState]]>(
  persist(
    (set) => ({
      tabs: [],
      activeTabId: null,

      actions: {
        setActiveTab: (id) => set({ activeTabId: id }),
        addTab: (route, title = "New tab") => {
          const id = Date.now().toString();
          const newTab: Tab = {
            id: id,
            title: title,
            route: route,
          };

          set((state) => ({
            tabs: [...state.tabs, newTab],
            activeTabId: id,
          }));
        },
        removeTab: (id) => {
          set((state) => {
            const remainingTabs = state.tabs.filter((tab) => tab.id !== id);

            const newActiveTab =
              state.activeTabId === id
                ? remainingTabs.at(-1)?.id || null
                : state.activeTabId;

            return {
              tabs: remainingTabs,
              activeTabId: newActiveTab,
            };
          });
        },
      },
    }),
    { name: "tab-storage" },
  ),
);
