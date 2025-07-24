package main

import (
	"database/sql"
	"log"
	"main/database/gen"
	"main/utils"
	"math"
	"strconv"
	"sync"

	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	_ "modernc.org/sqlite"
)

func ConnectDB() *sql.DB {
	db, err := sql.Open("sqlite", "F:/Code/stopage-wails/stopage/data/dev.db")
	if err != nil {
		log.Fatal(err)
	}

	return db
}

type DeckPaginationResult struct {
	Decks       []gen.Deck `json:"decks"`
	TotalCount  int64      `json:"totalCount"`
	TotalPages  int64      `json:"totalPages"`
	CurrentPage int        `json:"currentPage"`
	Limit       int        `json:"limit"`
}

func main() {
	db, err := sql.Open("sqlite", "F:/Code/stopage-wails/stopage/data/dev.db")
	if err != nil {
		log.Fatal(err)
	}

	queries := gen.New(db)

	router := gin.Default()
	router.Use(cors.Default())

	router.GET("/api/decks", func(ctx *gin.Context) {
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

		var decks []gen.Deck
		var totalDecks int64
		var decksErr, countErr error

		wg.Add(2)

		go func() {
			defer wg.Done()

			decks, decksErr = queries.GetDecksPaginated(ctx, gen.GetDecksPaginatedParams{
				Name:   query,
				Limit:  int64(limit),
				Offset: int64(offset),
			})
		}()

		go func() {
			defer wg.Done()

			totalDecks, countErr = queries.CountDecksBySearch(ctx, query)
		}()

		wg.Wait()

		if err := utils.FirstNonNill(decksErr, countErr); err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": decksErr.Error()})
			return
		}

		totalPages := int64(math.Ceil(float64(totalDecks) / float64(limit)))

		ctx.JSON(http.StatusOK, &DeckPaginationResult{
			Decks:       decks,
			TotalCount:  totalDecks,
			TotalPages:  totalPages,
			CurrentPage: page,
			Limit:       limit,
		})
	})

	router.GET("/api/decks/:id", func(ctx *gin.Context) {
		deckId := ctx.Param("id")
		if deckId == "" {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "deckId is required"})
			return
		}

		deck, err := queries.GetDeckById(ctx, deckId)
		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		ctx.JSON(http.StatusOK, deck)
	})

	router.POST("api/decks", func(ctx *gin.Context) {
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

		err = queries.InsertDeck(ctx, gen.InsertDeckParams{
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
	})

	router.Run(":5000")
}
