import { type Deck } from "@/features/flashcards/types/flashcard.types";
import {
  Card,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
  CardContent,
} from "@/components/shadcn/card";
import { Button } from "@/components/shadcn/button";
import { Link } from "react-router-dom";

const DeckItem = ({ data }: { data: Deck }) => {
  return (
    <Card className="overflow-hidden rounded-lg border border-zinc-200 shadow-sm">
      <CardHeader>
        <Link to={`${data.id}`}>
          <CardTitle className="text-xl">{data.name}</CardTitle>
        </Link>
        <CardDescription>{data.parentId}</CardDescription>
      </CardHeader>

      <CardContent></CardContent>

      <CardFooter className="flex gap-x-2">
        <Button className="flex-3/4" asChild>
          <Link to={`${data.id}`}>Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DeckItem;
