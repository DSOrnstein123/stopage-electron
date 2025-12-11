package decks

import (
	"database/sql"
	databasegen "main/internal/generated/database"
	"main/internal/generated/openapi"
	"main/internal/generated/openapi/models"
	"main/internal/utils"
	"main/internal/utils/mapping"
	"math"
	"net/http"
	"sync"

	"github.com/gin-gonic/gin"
)

type DeckHandler struct {
	DB      *databasegen.Queries
	Service DeckService
}

func (handler *DeckHandler) GetDecks(ctx *gin.Context, params openapi.GetDecksParams) {
	query := "%"
	if params.Search != nil && *params.Search != "" {
		query = "%" + *params.Search + "%"
	}

	page := 1
	if params.Page != nil && *params.Page > 0 {
		page = *params.Page
	}

	limit := 10
	if params.Limit != nil && *params.Limit > 0 {
		limit = *params.Limit
	}

	offset := (page - 1) * limit

	var wg sync.WaitGroup

	var (
		apiDecks    []models.Deck
		totalCounts int
		decksErr    error
		countErr    error
	)

	wg.Add(2)

	go func() {
		defer wg.Done()

		decks, err := handler.DB.GetDecksPaginated(ctx, databasegen.GetDecksPaginatedParams{
			Name:   query,
			Limit:  int64(limit),
			Offset: int64(offset),
		})
		if err != nil {
			decksErr = err
			return
		}

		apiDecks = mapping.MapDecksFromDb(decks)
	}()

	go func() {
		defer wg.Done()

		totalDecks, err := handler.DB.CountDecksBySearch(ctx, query)
		if err != nil {
			countErr = err
			return
		}

		totalCounts = int(totalDecks)
	}()

	wg.Wait()

	if err := utils.FirstNonNill(decksErr, countErr); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	totalPages := int(math.Ceil(float64(totalCounts) / float64(limit)))

	ctx.JSON(http.StatusOK, &models.DeckPaginationResult{
		Decks:       apiDecks,
		TotalCounts: totalCounts,
		TotalPages:  totalPages,
		CurrentPage: page,
		Limit:       limit,
	})
}

func (handler *DeckHandler) PostDeck(ctx *gin.Context) {
	var err error

	var body models.CreateDeckRequest
	err = ctx.BindJSON(&body)
	if err != nil {
		ctx.JSON(400, gin.H{"error": "Invalid JSON"})
		return
	}

	id := utils.GenerateUUID()

	var parentId sql.NullString
	if body.ParentId != nil {
		parentId = sql.NullString{
			String: *body.ParentId,
			Valid:  true,
		}
	}

	err = handler.DB.InsertDeck(ctx, databasegen.InsertDeckParams{
		ID:       id,
		Name:     body.Name,
		ParentID: parentId,
	})
	if err != nil {
		ctx.JSON(500, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(201, models.Deck{
		Id:       id,
		Name:     body.Name,
		ParentId: body.ParentId,
	})
}

func MapDeckFromDomain(deck *Deck) models.Deck {
	res := models.Deck{
		Id:       deck.Id,
		Name:     deck.Name,
		ParentId: deck.ParentId,
	}

	return res
}

func (handler *DeckHandler) GetDeckById(ctx *gin.Context, id string) {
	deck, err := handler.Service.GetDeckById(ctx, id)
	if err != nil {
		ctx.JSON(500, gin.H{"error": err.Error()})
		return
	}

	apiDeck := MapDeckFromDomain(deck)

	ctx.JSON(http.StatusOK, apiDeck)
}
