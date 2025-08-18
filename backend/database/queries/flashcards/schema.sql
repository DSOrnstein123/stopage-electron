CREATE TABLE IF NOT EXISTS decks (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL UNIQUE CHECK (length(name) > 0),
    parent_id TEXT REFERENCES decks (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS flashcards (
    id TEXT PRIMARY KEY,
    front TEXT NOT NULL,
    back TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS decks_flashcards (
    deck_id TEXT NOT NULL,
    flashcard_id TEXT NOT NULL,
    PRIMARY KEY (deck_id, flashcard_id),
    FOREIGN KEY (deck_id) REFERENCES decks (id) ON DELETE CASCADE,
    FOREIGN KEY (flashcard_id) REFERENCES flashcards (id) ON DELETE CASCADE
);