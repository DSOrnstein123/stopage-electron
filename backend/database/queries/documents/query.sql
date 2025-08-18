-- name: InsertDocument :exec
INSERT INTO documents (id, title) VALUES (?, ?);

-- name: UpdateDocument :exec
UPDATE documents
SET title = ?, content = ?
WHERE id = ?;