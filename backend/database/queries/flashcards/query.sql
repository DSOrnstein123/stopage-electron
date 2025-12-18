-- name: GetFlashcardByID :one
SELECT * FROM flashcards WHERE id = ?;

-- name: InsertFlashcard :execresult
INSERT INTO flashcards (id, front, back) VALUES (?, ?, ?);

-- name: InsertDeckFlashcardRelation :execresult
INSERT INTO decks_flashcards (deck_id, flashcard_id) VALUES (?, ?);

-- name: CountDecksBySearch :one
SELECT COUNT(*) FROM decks WHERE name LIKE ?;

-- name: SetParentId :execresult
UPDATE decks SET parent_id = ? WHERE id = ?;

-- name: GetDeckById :one
SELECT * FROM decks WHERE id = ?;

-- name: DeleteFlashcard :exec
DELETE FROM flashcards WHERE id = ?;

-- name: DeleteDeck :exec
DELETE FROM decks WHERE id = ?;

-- name: GetFlashcardsInDeck :many
SELECT f.*
FROM
    flashcards f
    JOIN decks_flashcards df ON df.flashcard_id = f.id
    JOIN decks d ON d.id = df.deck_id
WHERE
    d.id = ?;

-- name: GetDecksPaginated :many
SELECT *
FROM decks
WHERE
    name LIKE ?
ORDER BY name COLLATE NOCASE
LIMIT ?
OFFSET
    ?;

-- name: InsertDeck :one
INSERT INTO
    decks (id, name, parent_id)
VALUES (?, ?, ?) RETURNING id,
    name,
    parent_id;
;