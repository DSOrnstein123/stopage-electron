package main

import (
	"database/sql"
	"log"
	"main/database/gen"
	"main/utils"

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

func main() {
	db, err := sql.Open("sqlite", "F:/Code/stopage-wails/stopage/data/dev.db")
	if err != nil {
		log.Fatal(err)
	}

	queries := gen.New(db)

	router := gin.Default()
	router.Use(cors.Default())

	router.GET("api/decks", func(c *gin.Context) {
		deckId := c.Query("deckId")
		if deckId == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "deckId is required"})
			return
		}

		flashcard, err := queries.GetFlashcardByID(c, deckId)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, flashcard)
	})

	router.POST("api/decks", func(c *gin.Context) {
		var body struct {
			Name     string `json:"name"`
			ParentID string `json:"parent_id"`
		}

		if err := c.BindJSON(&body); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON"})
			return
		}

		id := utils.GenerateUUID()

		err := queries.InsertDeck(c, gen.InsertDeckParams{
			ID:   id,
			Name: body.Name,
			ParentID: sql.NullString{
				String: body.ParentID,
				Valid:  true,
			},
		})

		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"success": true,
			"id":      id,
		})
	})

	router.Run(":5000")
}
