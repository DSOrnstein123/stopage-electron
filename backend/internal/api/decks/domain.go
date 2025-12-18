package decks

import "github.com/google/uuid"

type Deck struct {
	Id       uuid.UUID
	Name     string
	ParentId *uuid.UUID
}

type DeckReqBody struct {
	Name     string
	ParentId *uuid.UUID
}

type DeckPaginatedParams struct {
	Search string
	Page   int64
	Limit  int64
}

type DeckPaginatedResult struct {
	Decks []*Deck
	DeckPaginatedParams
	TotalCounts int64
	TotalPages  int64
}
