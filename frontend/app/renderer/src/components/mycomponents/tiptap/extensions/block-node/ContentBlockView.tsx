import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import {
  NodeViewContent,
  NodeViewWrapper,
  type ReactNodeViewProps,
} from "@tiptap/react";
import { GripVertical } from "lucide-react";
import { useEffect, useRef } from "react";

interface BlockDragData extends Record<string, unknown> {
  pos: number;
  nodeSize: number;
}

interface BlockDropData extends Record<string | symbol, unknown> {
  pos: number;
}

const ContentBlockView = ({
  editor,
  getPos,
  node,
}: ReactNodeViewProps<HTMLDivElement>) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const dragHandleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    const dragHandleElement = dragHandleRef.current;

    if (!element || !dragHandleElement) return;

    return combine(
      draggable({
        element: element,
        dragHandle: dragHandleElement,

        getInitialData: (): BlockDragData => ({
          pos: getPos() || 0,
          nodeSize: node.nodeSize,
        }),
      }),

      dropTargetForElements({
        element: element,

        getData: (): BlockDropData => ({ pos: getPos() || 0 }),

        onDrop: ({ source, self }) => {
          editor.commands.command(({ tr, dispatch }) => {
            if (!dispatch) return false;

            const sourceData = source.data as BlockDragData;
            const targetData = self.data as BlockDropData;

            const { pos: sourcePos, nodeSize: sourceSize } = sourceData;
            const { pos: targetPos } = targetData;

            const sourceNode = tr.doc.nodeAt(sourcePos);

            tr.delete(sourcePos, sourcePos + sourceSize);
            tr.insert(targetPos, sourceNode!);

            dispatch(tr);

            return true;
          });
        },
      }),
    );
  });

  return (
    <NodeViewWrapper ref={elementRef} className="relative bg-yellow-300">
      <div ref={dragHandleRef}>
        <GripVertical className="absolute -left-6" />
      </div>

      <NodeViewContent />
    </NodeViewWrapper>
  );
};

export default ContentBlockView;
