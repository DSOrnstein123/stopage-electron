package documents

import (
	"database/sql"
	"log"
	databasegen "main/internal/generated/database"
	api "main/internal/generated/openapi"
	"main/internal/utils"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

type DocumentHandler struct {
	DB *databasegen.Queries
}

type CreateDocumentRequest struct {
	Title *string `json:"title" binding:"omitempty,max=255"`
}

func (handler *DocumentHandler) PostApiDocuments(ctx *gin.Context) {
	var req api.PostApiDocumentsJSONRequestBody
	err := ctx.ShouldBindJSON(&req)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	title := ""
	if req.Title != nil {
		title = strings.TrimSpace(*req.Title)
	}

	id := utils.GenerateUUID()
	doc := databasegen.InsertDocumentParams{
		ID:    id,
		Title: title,
	}

	err = handler.DB.InsertDocument(ctx, doc)
	if err != nil {
		log.Printf("Failed to insert document: %v", err)
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to create document",
		})
		return
	}

	resp, err := handler.DB.GetDocumentById(ctx, id)
	if err != nil {
		log.Printf("Failed to fetch created document: %v", err)
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": "Document created but failed to retrieve",
		})
		return
	}

	ctx.JSON(http.StatusCreated, resp)
}

func UpdateDocument(ctx *gin.Context, queries *databasegen.Queries) {
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

	document := databasegen.UpdateDocumentParams{
		ID: id,
	}

	// if body.Title != nil {
	// 	document.Title = sql.NullString{String: *body.Title, Valid: true}
	// } else {
	// 	document.Title = sql.NullString{Valid: false}
	// }

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

func GetDocumentsList(ctx *gin.Context, queries *databasegen.Queries) {
	documentsList, err := queries.GetDocumentsList(ctx)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err})
		return
	}

	ctx.JSON(http.StatusOK, documentsList)
}
