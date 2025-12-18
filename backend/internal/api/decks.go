package api

import (
	"main/internal/generated/openapi"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func (apiServer *ApiServer) GetDecks(ctx *gin.Context, params openapi.GetDecksParams) {
	apiServer.Decks.GetDecks(ctx, params)
}

func (apiServer *ApiServer) GetDeckById(ctx *gin.Context, id uuid.UUID) {
	apiServer.Decks.GetDeck(ctx, id)
}

func (apiServer *ApiServer) PostDeck(ctx *gin.Context) {
	apiServer.Decks.PostDeck(ctx)
}

func (apiServer *ApiServer) DeleteDeck(ctx *gin.Context, id uuid.UUID) {
	apiServer.Decks.DeleteDeck(ctx, id)
}
