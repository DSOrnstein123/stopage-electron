import DeckItem from "../deck-item/DeckItem";
import { useDecksFetch } from "../../hooks/useDecksFetch";
// import useDeckFiltersStore from "../../stores/deckFiltersStore";

const DecksGrid = () => {
  const { data } = useDecksFetch();

  const { decks = [] } = data || {};
  // const page = useDeckFiltersStore((state) => state.page);
  // const setPage = useDeckFiltersStore((state) => state.setPage);

  return (
    <div className="grid grid-cols-2 gap-4">
      {decks.map((deck) => (
        <DeckItem data={deck} key={deck.id} />
      ))}
    </div>
  );
};

export default DecksGrid;
