import { Button } from "@/components/shadcn/button";
import useDocumentsMutation from "@/features/documents/hooks/useDocumentsMutation";
import { useTabStore } from "@/store/tabStore";
import { Calendar } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const ActionBar = () => {
  const { addTab } = useTabStore((state) => state.actions);
  const { mutateAsync: createDocument } = useDocumentsMutation();
  const navigate = useNavigate();

  return (
    <aside className="bg-primary/20 flex h-full w-10 flex-col items-center gap-y-[1px] py-1">
      <Button
        variant="ghost"
        className="relative size-8 p-0"
        onClick={async () => {
          const data = await createDocument();
          addTab(`/documents/${data.id}`, "New document");
          navigate(`/documents/${data.id}`);
        }}
      >
        <img src="/icon/new_note.svg" className="h-5 w-5" />
      </Button>

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

      <Link to="/planner">
        <Button variant="ghost" className="relative size-8">
          <Calendar />
        </Button>
      </Link>
    </aside>
  );
};

export default ActionBar;
