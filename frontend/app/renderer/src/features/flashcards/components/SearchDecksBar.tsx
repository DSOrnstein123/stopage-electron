import { Input } from "@/components/shadcn/input";
import { Search } from "lucide-react";

import { cn } from "@/lib/utils";

import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import useDeckFiltersStore from "../stores/deckFiltersStore";

const SearchDecksBar = () => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const setSearchQuery = useDeckFiltersStore((state) => state.setSearchQuery);

  useEffect(() => {
    setSearchQuery(debouncedQuery);
  }, [debouncedQuery, setSearchQuery]);

  return (
    <>
      <Search className="absolute top-2.5 left-2.5 size-4" />
      <Input
        className={cn("pl-8")}
        placeholder="Search decks..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </>
  );
};

export default SearchDecksBar;
