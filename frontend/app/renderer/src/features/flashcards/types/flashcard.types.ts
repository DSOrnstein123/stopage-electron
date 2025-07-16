interface Deck {
  id: string;
  name: string;
  parentId: string | undefined;
  // description?: string;
  // cards: Card[];
  // subDecks?: Deck[];
}

interface FlashCard {
  id: string;
  front: string;
  back: string;
  // status?: "new" | "learn" | "due"
}

export type { Deck, FlashCard }