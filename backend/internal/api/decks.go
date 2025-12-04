package api

import (
	"github.com/gin-gonic/gin"
)

func (apiServer *ApiServer) GetApiDecks(ctx *gin.Context) {
	apiServer.Decks.GetApiDecks(ctx)
}
