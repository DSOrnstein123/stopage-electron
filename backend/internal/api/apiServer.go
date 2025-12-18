package api

import (
	"main/internal/api/decks"
	"main/internal/api/documents"
	databasegen "main/internal/generated/database"
	"main/internal/generated/openapi"
)

type ApiServer struct {
	Decks     *decks.DeckHandler
	Documents *documents.DocumentHandler
}

func NewApiServer(DB *databasegen.Queries) *ApiServer {
	return &ApiServer{
		Decks:     &decks.DeckHandler{DB: DB, Service: *decks.NewDeckService(decks.NewDeckRepository(DB))},
		Documents: &documents.DocumentHandler{DB: DB},
	}
}

var _ openapi.ServerInterface = (*ApiServer)(nil)
