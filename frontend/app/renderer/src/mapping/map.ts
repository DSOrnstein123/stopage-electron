import { type RawDeck } from "@/features/flashcards/schemas/deckSchema";
import { type Deck } from "@/features/flashcards/types/flashcard.types";

export function mapDeck(goDeck: RawDeck): Deck {
  return {
    id: goDeck.id,
    name: goDeck.name,
    parentId: goDeck.parentId.Valid ? goDeck.parentId.String : undefined
  };
}