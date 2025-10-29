import type { RawPaginatedResponse } from "@/features/flashcards/schemas/deckSchema";
import type { FlashCard } from "@/features/flashcards/types/flashcard.types";

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

      uploadFile: () => Promise<{
        jsonData;
        processedAtlasText;
        imagePath;
        jsonPath;
        images;
      }>;
    };
  }
}

export {};
