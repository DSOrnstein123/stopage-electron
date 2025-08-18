import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import BlockNode from "./BlockNode.tsx";

const Block = Node.create({
  name: "block",

  group: "block",

  content: "inline*",

  parseHTML() {
    return [
      {
        tag: 'div[data-type="block"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { "data-type": "block" }),
      0,
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(BlockNode);
  },
});

export default Block;
