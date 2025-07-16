import { Deck } from "@/features/flashcards/types/flashcard.types";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const DeckItemHeader = ({
  data,
  hasSubDecks,
  expanded,
  onToggle,
}: {
  data: Deck;
  hasSubDecks: boolean;
  expanded: boolean;
  onToggle: () => void;
}) => {
  return (
    <div className="flex w-full items-center gap-x-1.5 px-10 py-2.5 pl-2.5 font-semibold">
      {hasSubDecks ? (
        <Button
          className="flex cursor-pointer items-center overflow-hidden rounded-sm select-none"
          style={{
            padding: "0px 6px 0px",
            height: "32px",
          }}
          onClick={onToggle}
          variant="ghost"
        >
          <ChevronRight
            className={cn(
              "lead size-5 transition-transform duration-400",
              expanded && "rotate-90",
            )}
          />
        </Button>
      ) : (
        <div className="h-8 w-8" />
      )}

      <div className="flex items-center">
        <img className="mr-1 size-5" />
        <Link to={`${data.id}`}>
          <span className="text-[17px]">{data.name}</span>
        </Link>
      </div>
    </div>
  );
};

export default DeckItemHeader;
