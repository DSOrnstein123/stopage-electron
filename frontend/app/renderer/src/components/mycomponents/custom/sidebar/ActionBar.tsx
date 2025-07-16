import { Button } from "@/components/shadcn/button";
import { Link } from "react-router-dom";

const ActionBar = () => {
  return (
    <aside className="bg-primary/20 flex h-full w-10 flex-col items-center py-1">
      <Link to="/flashcards">
        <Button variant="ghost" className="relative size-8">
          <svg
            width="40"
            height="40"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="50"
              y="10"
              width="50"
              height="70"
              rx="6"
              ry="6"
              transform="rotate(15 30 10)"
              stroke="black"
              stroke-width="5"
              fill="white"
            />

            <rect
              x="10"
              y="20"
              width="50"
              height="70"
              rx="6"
              ry="6"
              transform="rotate(-10 10 20)"
              stroke="black"
              stroke-width="5"
              fill="white"
            />
          </svg>
        </Button>
      </Link>
    </aside>
  );
};

export default ActionBar;
