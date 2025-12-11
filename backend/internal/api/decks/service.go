package decks

import (
	"context"
	databasegen "main/internal/generated/database"
)

type DeckService struct {
	Repo DeckRepository
}

func NewDeckService(repo DeckRepository) *DeckService {
	return &DeckService{Repo: repo}
}

type Deck struct {
	Id       string
	Name     string
	ParentId *string
}

func MapDeckFromRepo(deck databasegen.Deck) *Deck {
	var parentId *string
	if deck.ParentID.Valid {
		parentId = &deck.ParentID.String
	}

	res := &Deck{
		Id:       deck.ID,
		Name:     deck.Name,
		ParentId: parentId,
	}

	return res
}

func (service *DeckService) GetDeckById(ctx context.Context, id string) (*Deck, error) {
	deck, err := service.Repo.GetById(ctx, id)
	if err != nil {
		return nil, err
	}

	res := MapDeckFromRepo(deck)

	return res, nil
}
