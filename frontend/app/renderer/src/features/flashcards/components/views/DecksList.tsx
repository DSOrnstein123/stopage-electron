import DeckItem from "../deck-item/DeckItem";
import { useDecksFetch } from "../../hooks/useDecksFetch";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/shadcn/pagination";
import useDeckFiltersStore from "../../stores/deckFiltersStore";

const DecksList = () => {
  const { data } = useDecksFetch();
  const page = useDeckFiltersStore((state) => state.page);
  const setPage = useDeckFiltersStore((state) => state.setPage);

  const { totalPages, decks = [] } = data ?? {};

  return (
    <>
      <div className="flex flex-col gap-y-2">
        {decks.map((deck) => (
          <DeckItem data={deck} key={deck.id} />
        ))}
      </div>

      {/* TODO: fix pagination */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                if (page - 1 < 1) {
                  setPage(1);
                } else setPage(page - 1);
              }}
              aria-disabled={page <= 1}
            />
          </PaginationItem>

          {Array(totalPages)
            .fill(0)
            .map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  onClick={() => setPage(index + 1)}
                  isActive={index + 1 == page}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              onClick={() => {
                if (page + 1 > totalPages!) {
                  setPage(totalPages!);
                } else setPage(page + 1);
              }}
              aria-disabled={page >= totalPages!}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default DecksList;
