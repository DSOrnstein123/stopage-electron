package decks

import (
	"context"
	databasegen "main/internal/generated/database"

	"github.com/google/uuid"
)

type DeckRepositoryInterface interface {
	GetAll(ctx context.Context, input databasegen.GetDecksPaginatedParams) ([]databasegen.Deck, error)
	GetById(ctx context.Context, id uuid.UUID) (databasegen.Deck, error)
	CreateDeck(ctx context.Context, params databasegen.InsertDeckParams) (databasegen.Deck, error)
	Count(ctx context.Context, search string) (int64, error)
	Delete(ctx context.Context, id uuid.UUID) error
}

type DeckRepository struct {
	Queries *databasegen.Queries
}

func NewDeckRepository(db *databasegen.Queries) *DeckRepository {
	return &DeckRepository{Queries: db}
}

func (repo *DeckRepository) GetAll(ctx context.Context, input databasegen.GetDecksPaginatedParams) ([]databasegen.Deck, error) {
	return repo.Queries.GetDecksPaginated(ctx, input)
}

func (repo *DeckRepository) GetById(ctx context.Context, id uuid.UUID) (databasegen.Deck, error) {
	return repo.Queries.GetDeckById(ctx, id)
}

func (repo *DeckRepository) CreateDeck(ctx context.Context, params databasegen.InsertDeckParams) (databasegen.Deck, error) {
	return repo.Queries.InsertDeck(ctx, params)
}

func (repo *DeckRepository) Count(ctx context.Context, search string) (int64, error) {
	return repo.Queries.CountDecksBySearch(ctx, search)
}

func (repo *DeckRepository) Delete(ctx context.Context, id uuid.UUID) error {
	return repo.Queries.DeleteDeck(ctx, id)
}
