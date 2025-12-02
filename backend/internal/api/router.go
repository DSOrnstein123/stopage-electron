package api

import (
	"main/internal/api/decks"
	"main/internal/api/documents"
	databasegen "main/internal/generated/database"
	api "main/internal/generated/openapi"

	"github.com/gin-gonic/gin"
)

type ApiServer struct {
	*decks.DeckHandler
	*documents.DocumentHandler
}

func NewApiServer() *ApiServer {
	return &ApiServer{
		DeckHandler:     &decks.DeckHandler{},
		DocumentHandler: &documents.DocumentHandler{},
	}
}

func DecksRoute(router *gin.RouterGroup, queries *databasegen.Queries) {
	deckRoute := router.Group("/decks")

	deckRoute.GET("/", func(ctx *gin.Context) {
		api.GetDecksPaginated(ctx, queries)
	})
	deckRoute.POST("/", func(ctx *gin.Context) {
		api.PostDeck(ctx, queries)
	})

	deckRoute.GET("/:id", func(ctx *gin.Context) {
		api.GetDeck(ctx, queries)
	})
}

func DocumentsRoute(router *gin.RouterGroup, queries *databasegen.Queries) {
	documentsRoute := router.Group("/documents")

	documentsRoute.GET("/", func(ctx *gin.Context) {
		api.GetDocumentsList(ctx, queries)
	})

	documentsRoute.POST("/", func(ctx *gin.Context) {
		api.PostDocument(ctx, queries)
	})

	documentsRoute.POST("/:id", func(ctx *gin.Context) {
		api.UpdateDocument(ctx, queries)
	})
}
