CREATE TABLE IF NOT EXISTS decks (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL UNIQUE CHECK (length(name) > 0),
    parent_id TEXT REFERENCES decks (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS flashcards (
    id TEXT PRIMARY KEY,
    front TEXT NOT NULL,
    back TEXT NOT NULL

    repetition INTERGER NOT NULL DEFAULT 0
    interval INTERGER NOT NULL DEFAULT 0
    ease_factor REAL NOT NULL DEFAULT 2.5

    created_at TEXT NOT NULL DEFAULT(datetime('now')),
    updated_at TEXT NOT NULL DEFAULT(datetime('now'))
);

CREATE TABLE IF NOT EXISTS decks_flashcards (
    deck_id TEXT NOT NULL,
    flashcard_id TEXT NOT NULL,
    PRIMARY KEY (deck_id, flashcard_id),
    FOREIGN KEY (deck_id) REFERENCES decks (id) ON DELETE CASCADE,
    FOREIGN KEY (flashcard_id) REFERENCES flashcards (id) ON DELETE CASCADE
);