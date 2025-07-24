// import { mapDeck } from "@/mapping/map"
import { useQuery } from "@tanstack/react-query";
import useDeckFiltersStore from "../stores/deckFiltersStore";
import { type Deck } from "../types/flashcard.types";
import { mapDeck } from "@/mapping/map";
import type { RawPaginatedResponse } from "../schemas/deckSchema";

export interface DecksData {
  decksFlat: Deck[];
  decks: Deck[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}

const useDecksFetch = () => {
  const searchQuery = useDeckFiltersStore((state) => state.searchQuery);
  const page = useDeckFiltersStore((state) => state.page);
  const limit = useDeckFiltersStore((state) => state.limit);

  return useQuery({
    queryKey: ["decks", searchQuery, limit, page],
    queryFn: async () => {
      const data = await window.api.getDecksPaginated({
        name: searchQuery,
        page: String(page),
        limit: String(limit),
      });
      const decks = data.map(mapDeck);

      return {
        decksFlat: decks,
        decks: decks,
        totalCount: 10,
        totalPages: 10,
        currentPage: 1,
        limit: 10,
      };
    },
    staleTime: 5 * 60 * 1000,
  });
};

// const useDeckFetchById = (deckId: string, initialData?: Deck | undefined ) => {
//   return useQuery({
//     queryKey: ["decks", deckId],
//     queryFn: async () => {
//       const data = await GetDeckById(deckId)
//       return data
//     },
//     staleTime: 5 * 60 * 1000,
//     enabled: !!deckId,
//     initialData: initialData
//   })
// }

export { useDecksFetch };
