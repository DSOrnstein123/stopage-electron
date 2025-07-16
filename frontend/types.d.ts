import type { Flashcard } from "./app/renderer/src/features/flashcards/types/flashcard"

export {}

declare global {
  interface Window {
    api: {
      getFlashcardById: () => Promise<Flashcard>
      insertDeck: (title: string, parentId: string) => Promise<unknown>
    }
  }
}
