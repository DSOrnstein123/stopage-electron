package routes

import (
	"main/database/gen"
	"main/routes/api"

	"github.com/gin-gonic/gin"
)

func DecksRoute(router *gin.RouterGroup, queries *gen.Queries) {
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

func DocumentsRoute(router *gin.RouterGroup, queries *gen.Queries) {
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
