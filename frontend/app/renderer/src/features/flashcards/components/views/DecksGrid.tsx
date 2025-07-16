import DeckItem from "../deck-item/DeckItem";
import { useDecksFetch } from "../../hooks/useDecksFetch";
// import useDeckFiltersStore from "../../stores/deckFiltersStore";

const DecksGrid = () => {
  const { data, isLoading, isError } = useDecksFetch();

  if (isLoading) {
    return <div>Đang tải danh sách deck...</div>;
  }

  if (isError) {
    return <div>Có lỗi xảy ra khi tải dữ liệu.</div>;
  }

  const { decksFlat = [] } = data || {};
  // const page = useDeckFiltersStore((state) => state.page);
  // const setPage = useDeckFiltersStore((state) => state.setPage);

  return (
    <div className="grid grid-cols-2 gap-4">
      {decksFlat.map((deck) => (
        <DeckItem data={deck} key={deck.id} />
      ))}
    </div>
  );
};

export default DecksGrid;
