package mapping

import (
	databasegen "main/internal/generated/database"
	"main/internal/generated/openapi/models"
)

func MapDeckFromDb(deck databasegen.Deck) models.Deck {
	var parentId *string
	if deck.ParentID.Valid {
		parentId = &deck.ParentID.String
	}

	res := models.Deck{
		Id:       deck.ID,
		Name:     deck.Name,
		ParentId: parentId,
	}

	return res
}

func MapDecksFromDb(decks []databasegen.Deck) []models.Deck {
	res := make([]models.Deck, 0, len(decks))

	for _, deck := range decks {
		res = append(res, MapDeckFromDb(deck))
	}

	return res
}
