import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import Kanban from "./Kanban.tsx";

const KanbanNode = Node.create({
  name: "kanban",

  group: "block",

  parseHTML() {
    return [
      {
        tag: "div[data-type='kanban']",
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
    return ReactNodeViewRenderer(Kanban);
  },
});

export default KanbanNode;
