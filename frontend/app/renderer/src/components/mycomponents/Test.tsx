import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

const Test = () => {
  const [isShown, setIsShown] = useState(true);

  return (
    <>
      <motion.button
        onClick={() => setIsShown((prev) => !prev)}
        className="mb-4 h-10 bg-blue-500 px-4"
      >
        Show/Hide
      </motion.button>

      <AnimatePresence>
        {isShown && (
          <motion.div
            className="size-96 bg-amber-400"
            initial={{ rotate: "0deg" }}
            animate={{ rotate: "180deg" }}
            exit={{ rotate: "0deg" }}
            transition={{ duration: 1 }}
          >
            Test
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Test;
