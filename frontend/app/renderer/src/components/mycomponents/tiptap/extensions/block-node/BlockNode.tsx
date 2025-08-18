import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";

const BlockNode = () => {
  return (
    <NodeViewWrapper>
      <NodeViewContent className="text-black" />
    </NodeViewWrapper>
  );
};

export default BlockNode;
