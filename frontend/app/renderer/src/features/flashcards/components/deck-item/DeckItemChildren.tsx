// import { Deck } from "@/types/deck.types";
// import DeckItem from "./DeckItem";

import { motion } from "motion/react";

const DeckItemChildren = () => {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{
        height: "auto",
        opacity: 1,
      }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }}
    >
      <div className="space-y-2 overflow-hidden py-2 pr-2 pl-5.5">
        {/* {data.subDecks?.map((subDeck) => (
          <DeckItem data={subDeck} key={data.id} />
        ))} */}
      </div>
    </motion.div>
  );
};

export default DeckItemChildren;
