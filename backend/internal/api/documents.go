package api

import (
	"github.com/gin-gonic/gin"
)

func (apiServer *ApiServer) PostApiDocuments(ctx *gin.Context) {
	apiServer.Documents.PostApiDocuments(ctx)
}
