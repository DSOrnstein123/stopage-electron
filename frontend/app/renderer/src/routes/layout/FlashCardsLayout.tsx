import { Separator } from "@/components/shadcn/separator";
// import CreateDeckModal from "@/features/flashcards/components/modals/CreateDeckModal";
import { Button } from "@/components/shadcn/button";
import { LayoutGrid, List } from "lucide-react";
import DecksList from "@/features/flashcards/components/views/DecksList";
import DecksGrid from "@/features/flashcards/components/views/DecksGrid";

import { useState } from "react";
import SearchDecksBar from "@/features/flashcards/components/SearchDecksBar";

type Mode = "list" | "grid";

const FlashCardsLayout = () => {
  const [mode, setMode] = useState<Mode>("list");

  // useEffect(() => {
  //   const build = async () => {
  //     try {
  //       const res = await BuildTree();
  //       console.log(res);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  //   build();
  // });

  const renderView = () => {
    switch (mode) {
      case "list":
        return <DecksList />;
      case "grid":
        return <DecksGrid />;
      default:
        return null;
    }
  };

  return (
    <div className="py-2">
      <h1 className="mb-2 text-4xl font-bold">Flashcards</h1>

      <div className="mb-2 flex w-full justify-between">
        <h2 className="text-2xl font-bold">Deck</h2>

        {/* fix */}
        {/* <CreateDeckModal /> */}
      </div>

      <Separator />

      <div className="relative my-2 flex gap-x-1">
        <SearchDecksBar />
      </div>

      <div>
        <Button onClick={() => setMode("list")}>
          <List />
        </Button>

        <Button onClick={() => setMode("grid")}>
          <LayoutGrid />
        </Button>
      </div>

      <div className="mt-2 flex flex-col gap-y-2">{renderView()}</div>
    </div>
  );
};

export default FlashCardsLayout;
