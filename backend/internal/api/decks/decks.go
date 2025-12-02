package decks

import (
	"database/sql"
	databasegen "main/internal/generated/database"
	"main/internal/utils"
	"math"
	"net/http"
	"strconv"
	"sync"

	"github.com/gin-gonic/gin"
)

type DeckHandler struct {
	DB *databasegen.Queries
}

type DeckPaginationResult struct {
	Decks       []databasegen.Deck `json:"decks"`
	TotalCounts int64              `json:"totalCounts"`
	TotalPages  int64              `json:"totalPages"`
	CurrentPage int                `json:"currentPage"`
	Limit       int                `json:"limit"`
}

func GetDecksPaginated(ctx *gin.Context, dc *databasegen.Queries) {
	query := ctx.DefaultQuery("query", "")
	pageStr := ctx.DefaultQuery("page", "1")
	limitStr := ctx.DefaultQuery("limit", "10")

	page, err1 := strconv.Atoi(pageStr)
	limit, err2 := strconv.Atoi(limitStr)
	if err1 != nil || err2 != nil || page < 1 || limit < 1 {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid pagination parameters"})
		return
	}

	if query == "" {
		query = "%"
	} else {
		query = "%" + query + "%"
	}

	offset := (page - 1) * limit

	var wg sync.WaitGroup

	var decks []databasegen.Deck
	var totalDecks int64
	var decksErr, countErr error

	wg.Add(2)

	go func() {
		defer wg.Done()

		decks, decksErr = dc.GetDecksPaginated(ctx, databasegen.GetDecksPaginatedParams{
			Name:   query,
			Limit:  int64(limit),
			Offset: int64(offset),
		})
	}()

	go func() {
		defer wg.Done()

		totalDecks, countErr = dc.CountDecksBySearch(ctx, query)
	}()

	wg.Wait()

	if err := utils.FirstNonNill(decksErr, countErr); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": decksErr.Error()})
		return
	}

	totalPages := int64(math.Ceil(float64(totalDecks) / float64(limit)))

	ctx.JSON(http.StatusOK, &DeckPaginationResult{
		Decks:       decks,
		TotalCounts: totalDecks,
		TotalPages:  totalPages,
		CurrentPage: page,
		Limit:       limit,
	})
}

func PostDeck(ctx *gin.Context, dc *databasegen.Queries) {
	var body struct {
		Name     string `json:"name"`
		ParentID string `json:"parent_id"`
	}

	err := ctx.BindJSON(&body)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON"})
		return
	}

	id := utils.GenerateUUID()

	err = dc.InsertDeck(ctx, databasegen.InsertDeckParams{
		ID:   id,
		Name: body.Name,
		ParentID: sql.NullString{
			String: body.ParentID,
			Valid:  true,
		},
	})
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx.String(http.StatusOK, "Success")
}

func (handler *DeckHandler) GetApiDecks(ctx *gin.Context) {
	deckId := ctx.Param("id")
	if deckId == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "deckId is required"})
		return
	}

	deck, err := handler.DB.GetDeckById(ctx, deckId)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, deck)
}
