import { useEffect, useRef, useState } from "react";
import invariant from "tiny-invariant";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { cn } from "@/lib/utils";

interface CardProps {
  title: string;
}

const Card = ({ title }: CardProps) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [dragging, setDragging] = useState<boolean>(false);

  useEffect(() => {
    const card = cardRef.current;
    invariant(card);

    return draggable({
      element: card,
      onDragStart: () => setDragging(true),
      onDrop: () => setDragging(false),
    });
  }, []);

  return (
    <div ref={cardRef} className={cn("bg-white", dragging && "opacity-40")}>
      {title}
    </div>
  );
};

export default Card;
