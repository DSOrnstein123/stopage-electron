import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RightSidebarState {
  width: number;
  toggle: boolean;

  setWidth: (width: number) => void;
}

const useRightSidebarStore = create<
  RightSidebarState,
  [["zustand/persist", RightSidebarState]]
>(
  persist(
    (set) => ({
      width: 100,
      toggle: false,

      setWidth: (newWidth) => set({ width: newWidth }),
    }),
    { name: "right-sidebar-storage" },
  ),
);

export default useRightSidebarStore;
