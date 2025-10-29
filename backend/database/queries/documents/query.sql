-- name: InsertDocument :exec
INSERT INTO documents (id, title) VALUES (?, ?);

-- name: UpdateDocument :exec
UPDATE documents SET title = ?, content = ? WHERE id = ?;

-- name: GetDocumentsList :many
SELECT id, title, created_at FROM documents;

-- name: GetDocumentById :one
SELECT id, title, created_at, updated_at FROM documents WHERE id = ?;