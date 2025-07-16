import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useFlowStore } from "@/store/flowStore";
import { useReactFlow } from "@xyflow/react";
import { Hand, MousePointer, StickyNote } from "lucide-react";

const Controller = () => {
  const tool = useFlowStore((state) => state.tool);
  const setNodes = useFlowStore((state) => state.setNodes);
  const { screenToFlowPosition } = useReactFlow();

  const handleOnClick = () => {
    const canvas = document.getElementById("canvas");
    const canvasPosition = canvas?.getBoundingClientRect();
    if (canvasPosition) {
      const { width, height, x, y } = canvasPosition;

      const position = screenToFlowPosition({
        x: x + width / 2,
        y: y + height / 2,
      });

      setNodes((nodes) => [
        ...nodes,
        {
          id: (nodes.length + 1).toString(),
          type: "notenode",
          position: { x: position.x - 120, y: position.y - 32 - 50 },
          data: { text: "", isEditing: false },
          style: {
            height: 64,
            width: 240,
          },
        },
      ]);
    }
  };

  return (
    <Card className="absolute top-1/2 left-2.5 z-20 flex w-[46px] -translate-y-1/2 flex-col gap-y-1 rounded-lg p-1">
      <Button variant="ghost" size="icon" className="rounded-sm">
        {tool === "select" ? (
          <MousePointer
            strokeWidth="2.5"
            className="h-4 w-4 scale-130 rotate-13"
            fill="#000"
          />
        ) : (
          <Hand className="h-4 w-4 scale-130" />
        )}
      </Button>

      <Button
        onClick={handleOnClick}
        variant="ghost"
        size="icon"
        className="rounded-sm"
      >
        <StickyNote className="h-4 w-4 scale-150" />
      </Button>

      <Button variant="ghost" size="icon" className="rounded-sm">
        <MousePointer
          strokeWidth="2.5"
          className="h-4 w-4 scale-130 rotate-13"
          fill="#000"
        />
      </Button>
    </Card>
  );
};

export default Controller;
