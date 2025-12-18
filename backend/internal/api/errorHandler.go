package api

import (
	"main/internal/generated/openapi/models"
	"main/internal/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

func ErrorHandler(ctx *gin.Context, err error, statusCode int) {
	var msg string
	if statusCode == http.StatusBadRequest {
		msg = "Invalid request body"
	}

	ctx.JSON(statusCode, &models.ErrorResponse{
		Code:    string(utils.ErrorCodeFromHTTPStatus(statusCode)),
		Message: msg,
	})
}
