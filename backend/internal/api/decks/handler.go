package decks

import (
	"main/internal/generated/openapi"
	"main/internal/generated/openapi/models"
	"main/internal/utils"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type DeckHandler struct {
	Service DeckService
}

func (handler *DeckHandler) GetDecks(ctx *gin.Context, params openapi.GetDecksParams) {
	search := ""
	if params.Search != nil {
		search = *params.Search
	}

	var page int64 = 0
	if params.Page != nil {
		page = int64(*params.Page)
	}

	var limit int64 = 0
	if params.Limit != nil {
		limit = int64(*params.Limit)
	}

	domainParams := &DeckPaginatedParams{
		Search: search,
		Page:   page,
		Limit:  limit,
	}

	domainRes, err := handler.Service.GetPaginated(ctx.Request.Context(), domainParams)
	if err != nil {
		utils.ResponseError(ctx, err)
		return
	}

	apiDecks := DecksDomainToApi(domainRes.Decks)

	ctx.JSON(http.StatusOK, &models.DeckPaginationResult{
		Decks:       apiDecks,
		Search:      domainRes.Search,
		Page:        int(domainRes.Page),
		Limit:       int(domainRes.Limit),
		TotalCounts: int(domainRes.TotalCounts),
		TotalPages:  int(domainRes.TotalPages),
	})
}

func (handler *DeckHandler) GetDeck(ctx *gin.Context, id uuid.UUID) {
	reqCtx := ctx.Request.Context()
	deck, err := handler.Service.GetById(reqCtx, id)
	if err != nil {
		utils.ResponseError(ctx, err)
		return
	}

	apiDeck := DeckDomainToApi(deck)

	ctx.JSON(http.StatusOK, apiDeck)
}

func (handler *DeckHandler) PostDeck(ctx *gin.Context) {
	body := models.CreateDeckRequest{}
	err := ctx.BindJSON(&body)
	if err != nil {
		utils.ResponseInvalidRequest(ctx, err)
		return
	}

	deck := &DeckReqBody{
		Name:     body.Name,
		ParentId: body.ParentId,
	}

	created, err := handler.Service.Create(ctx.Request.Context(), deck)
	if err != nil {
		utils.ResponseError(ctx, err)
		return
	}

	apiDeck := DeckDomainToApi(created)

	ctx.JSON(201, apiDeck)
}

func (handler *DeckHandler) DeleteDeck(ctx *gin.Context, id uuid.UUID) {
	err := handler.Service.Delete(ctx.Request.Context(), id)
	if err != nil {
		utils.ResponseError(ctx, err)
		return
	}

	ctx.Status(http.StatusNoContent)
}
