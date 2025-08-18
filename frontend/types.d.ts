import type { RawPaginatedResponse } from "@/features/flashcards/schemas/deckSchema";
import type { FlashCard } from "@/features/flashcards/types/flashcard.types";

export {};

declare global {
  interface Window {
    api: {
      getDeckById: () => Promise<FlashCard>;
      getDecksPaginated: (params: {
        page?: string;
        limit?: string;
        name?: string;
      }) => Promise<RawPaginatedResponse[]>;
      insertDeck: (title: string, parentId: string) => Promise<unknown>;

      importImage: () => void;

      insertDocument: (
        title = null,
      ) => Promise<{ id: string; title: string | null }>;

      updateDocument: (
        id,
        title: string | null = null,
        content: string | null = null,
      ) => void;
    };
  }
}
