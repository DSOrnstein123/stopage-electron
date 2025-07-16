// import { mapDeck } from "@/mapping/map"
import { useQuery } from "@tanstack/react-query"
import { GetDeckById, GetDecksPaginated } from "@wails/main/App"
import useDeckFiltersStore from "../stores/deckFiltersStore"
import { database } from "@wails/models";
import { type Deck } from "../types/flashcard.types";

export interface DecksData {
  decksFlat: Deck[];
  decks: database.Deck[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  limit: number;
} 

const useDecksFetch = () => {
  const searchQuery = useDeckFiltersStore((state) => state.searchQuery)
  const page = useDeckFiltersStore((state) => state.page)
  const limit = useDeckFiltersStore((state) => state.limit)

  return useQuery({
    queryKey: ["decks", searchQuery, limit, page],
    queryFn: async (): Promise<DecksData> => {
      const data = await GetDecksPaginated(searchQuery, limit, page)
      const decksFlat = data.decks
      return {
        ...data,
        decksFlat
      }
    },
    staleTime: 5 * 60 * 1000,
  })
}

const useDeckFetchById = (deckId: string, initialData?: Deck | undefined ) => {
  return useQuery({
    queryKey: ["decks", deckId],
    queryFn: async () => {
      const data = await GetDeckById(deckId)
      return data
    },
    staleTime: 5 * 60 * 1000,
    enabled: !!deckId,
    initialData: initialData
  })
}

export { useDecksFetch, useDeckFetchById }