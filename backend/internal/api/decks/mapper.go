package decks

import (
	databasegen "main/internal/generated/database"
	"main/internal/generated/openapi/models"

	"github.com/google/uuid"
)

func DeckRepoToDomain(deck databasegen.Deck) *Deck {
	var parentId *uuid.UUID
	if deck.ParentID.Valid {
		parentId = &deck.ParentID.UUID
	}

	res := &Deck{
		Id:       deck.ID,
		Name:     deck.Name,
		ParentId: parentId,
	}

	return res
}

func DecksRepoToDomain(decks []databasegen.Deck) []*Deck {
	res := make([]*Deck, 0, len(decks))

	for _, deck := range decks {
		res = append(res, DeckRepoToDomain(deck))
	}

	return res
}

func DeckDomainToApi(deck *Deck) *models.Deck {
	res := &models.Deck{
		Id:       deck.Id,
		Name:     deck.Name,
		ParentId: deck.ParentId,
	}

	return res
}

func DecksDomainToApi(decks []*Deck) []models.Deck {
	res := make([]models.Deck, 0, len(decks))

	for _, deck := range decks {
		res = append(res, *DeckDomainToApi(deck))
	}

	return res
}
