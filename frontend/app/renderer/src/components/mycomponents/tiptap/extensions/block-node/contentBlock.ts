import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import ContentBlockView from "./ContentBlockView.tsx";

const ContentBlock = Node.create({
  name: "content-block",
  group: "block",
  content: "inline*",
  draggable: true,

  parseHTML() {
    return [
      {
        tag: 'div[data-type="content-block"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { "data-type": "content-block" }),
      0,
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ContentBlockView);
  },
});

export default ContentBlock;
