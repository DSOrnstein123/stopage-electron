package api

import (
	"database/sql"
	"main/database/gen"
	"main/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

func PostDocument(ctx *gin.Context, queries *gen.Queries) {
	var body struct {
		Title *string `json:"title"`
	}

	err := ctx.BindJSON(&body)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON"})
		return
	}

	note := gen.InsertDocumentParams{
		ID: utils.GenerateUUID(),
	}

	if body.Title != nil {
		note.Title = sql.NullString{String: *body.Title, Valid: true}
	} else {
		note.Title = sql.NullString{Valid: false}
	}

	err = queries.InsertDocument(ctx, note)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, note)
}

func UpdateDocument(ctx *gin.Context, queries *gen.Queries) {
	id := ctx.Param("id")

	var body struct {
		Title   *string `json:"title"`
		Content *string `json:"content"`
	}

	err := ctx.BindJSON(&body)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON"})
		return
	}

	document := gen.UpdateDocumentParams{
		ID: id,
	}

	if body.Title != nil {
		document.Title = sql.NullString{String: *body.Title, Valid: true}
	} else {
		document.Title = sql.NullString{Valid: false}
	}

	if body.Content != nil {
		document.Content = sql.NullString{String: *body.Content, Valid: true}
	} else {
		document.Content = sql.NullString{Valid: false}
	}

	err = queries.UpdateDocument(ctx, document)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, "Success")
}
