// import { mapDeck } from "@/mapping/map"
import { useQuery } from "@tanstack/react-query";
import useDeckFiltersStore from "../stores/deckFiltersStore";
import { type Deck } from "../types/flashcard.types";
import { ProcessedPaginatedResponseSchema } from "../schemas/deckSchema";
import z from "zod";

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
      try {
        //TODO: fix return value (don't need to return parameters)
        const rawData = await window.api.getDecksPaginated({
          name: searchQuery,
          page: String(page),
          limit: String(limit),
        });

        const processedData = ProcessedPaginatedResponseSchema.parse(rawData);

        return processedData;
      } catch (error) {
        if (error instanceof z.ZodError) {
          console.error("error", error.message);
          throw new Error("Invalid API response format");
        }
        throw error;
      }
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
