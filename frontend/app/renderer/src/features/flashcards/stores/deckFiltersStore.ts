import { create } from "zustand";

interface DeckFiltersState {
  searchQuery: string;
  page: number;
  limit: number;

  setSearchQuery: (query: string) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
}

const useDeckFiltersStore = create<DeckFiltersState>((set) => ({
  searchQuery: "%",
  page: 1,
  limit: 5, 

  setSearchQuery: (query) => {
    set({ searchQuery: query })
  },
  setPage: (page) => {
    set({ page: page })
  },
  setLimit: (limit) => {
    set({ limit: limit, page: 1 })
  }
}))

export default useDeckFiltersStore