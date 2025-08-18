import { useEffect } from "react";
import Column from "./Column";

const cols = [
  {
    title: "Not started",
    documents: ["Task 1", "Task 2", "Task 3"],
  },
  {
    title: "WIP",
  },
  {
    title: "Done",
  },
];

const Kanban = () => {
  useEffect(() => {});

  return (
    // replace by view wrapper later
    <div>
      <div className="flex justify-between">
        <span>Name</span>

        {/* setting */}
      </div>

      <div className="flex overflow-y-auto">
        {cols.map((col) => (
          <Column key={col.title} col={col} />
        ))}
      </div>
    </div>
  );
};

export default Kanban;
