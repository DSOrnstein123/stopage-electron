package decks

import (
	"context"
	databasegen "main/internal/generated/database"
)

type DeckRepository struct {
	Db *databasegen.Queries
}

func NewDeckRepository(db *databasegen.Queries) *DeckRepository {
	return &DeckRepository{Db: db}
}

func (repo *DeckRepository) GetAll(ctx context.Context, input databasegen.GetDecksPaginatedParams) ([]databasegen.Deck, error) {
	return repo.Db.GetDecksPaginated(ctx, input)
}

func (repo *DeckRepository) GetById(ctx context.Context, id string) (databasegen.Deck, error) {
	return repo.Db.GetDeckById(ctx, id)
}
