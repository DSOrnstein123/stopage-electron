import { NodeViewWrapper } from "@tiptap/react";

const cols = [
  {
    title: "Not started",
  },
  {
    title: "WIP",
  },
  {
    title: "Done",
  },
];

const Kanban = () => {
  return (
    <NodeViewWrapper>
      <div className="flex overflow-y-auto">
        {cols.map((col) => (
          <div className="w-40">{col.title}</div>
        ))}
      </div>
    </NodeViewWrapper>
  );
};

export default Kanban;
