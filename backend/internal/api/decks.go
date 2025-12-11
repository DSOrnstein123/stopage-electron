package api

import (
	"main/internal/generated/openapi"

	"github.com/gin-gonic/gin"
)

func (apiServer *ApiServer) GetDecks(ctx *gin.Context, params openapi.GetDecksParams) {
	apiServer.Decks.GetDecks(ctx, params)
}

func (apiServer *ApiServer) GetDeckById(ctx *gin.Context, id string) {
	apiServer.Decks.GetDeckById(ctx, id)
}

func (apiServer *ApiServer) PostDeck(ctx *gin.Context) {
	apiServer.Decks.PostDeck(ctx)
}
