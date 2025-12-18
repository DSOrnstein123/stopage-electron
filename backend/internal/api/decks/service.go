package decks

import (
	"context"
	"database/sql"
	"errors"
	databasegen "main/internal/generated/database"
	"main/internal/utils"

	"github.com/google/uuid"
)

type DeckService struct {
	Repo DeckRepositoryInterface
}

func NewDeckService(repo DeckRepositoryInterface) *DeckService {
	return &DeckService{Repo: repo}
}

func (service *DeckService) GetById(ctx context.Context, id uuid.UUID) (*Deck, error) {
	deck, err := service.Repo.GetById(ctx, id)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, utils.WrapError(utils.ErrCodeNotFound, "Deck not found", err)
		}
		return nil, utils.WrapError(utils.ErrCodeInternal, "Failed to fetch deck", err)
	}

	res := DeckRepoToDomain(deck)

	return res, nil
}

func (service *DeckService) GetPaginated(ctx context.Context, params *DeckPaginatedParams) (*DeckPaginatedResult, error) {
	originalSearch := params.Search
	dbSearch := "%" + params.Search + "%"

	page := params.Page
	if page <= 0 {
		page = 1
	}

	limit := params.Limit
	if limit <= 0 {
		limit = 10
	}

	counts, err := service.Repo.Count(ctx, dbSearch)
	if err != nil {
		return nil, utils.WrapError(utils.ErrCodeInternal, "Failed to count decks", err)
	}

	if counts == 0 {
		return &DeckPaginatedResult{
			Decks: []*Deck{},
			DeckPaginatedParams: DeckPaginatedParams{
				Search: originalSearch,
				Page:   page,
				Limit:  limit,
			},
			TotalCounts: 0,
			TotalPages:  0,
		}, nil
	}

	totalPages := (counts + limit - 1) / limit

	offset := (page - 1) * limit
	input := databasegen.GetDecksPaginatedParams{
		Name:   dbSearch,
		Limit:  limit,
		Offset: offset,
	}

	decks, err := service.Repo.GetAll(ctx, input)
	if err != nil {
		return nil, utils.WrapError(utils.ErrCodeInternal, "Failed to fetch decks", err)
	}

	domainDecks := DecksRepoToDomain(decks)

	res := &DeckPaginatedResult{
		Decks: domainDecks,
		DeckPaginatedParams: DeckPaginatedParams{
			Search: originalSearch,
			Page:   page,
			Limit:  limit,
		},
		TotalCounts: counts,
		TotalPages:  totalPages,
	}

	return res, nil
}

func (service *DeckService) Create(ctx context.Context, body *DeckReqBody) (*Deck, error) {
	if body.Name == "" {
		return nil, utils.WrapError(utils.ErrCodeBadRequest, "Deck name cannot be empty", nil)
	}

	id := utils.GenerateUUID()

	var parentId uuid.NullUUID
	if body.ParentId != nil {
		parentId = uuid.NullUUID{
			UUID:  *body.ParentId,
			Valid: true,
		}
	}

	deck, err := service.Repo.CreateDeck(ctx, databasegen.InsertDeckParams{
		ID:       id,
		Name:     body.Name,
		ParentID: parentId,
	})
	if err != nil {
		return nil, utils.WrapError(utils.ErrCodeInternal, "Failed to create deck", err)
	}

	domainDeck := DeckRepoToDomain(deck)

	return domainDeck, nil
}

func (service *DeckService) Delete(ctx context.Context, id uuid.UUID) error {
	err := service.Repo.Delete(ctx, id)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return utils.WrapError(utils.ErrCodeNotFound, "Deck not found", err)
		}
		return utils.WrapError(utils.ErrCodeInternal, "Failed to delete deck", err)
	}

	return nil
}
