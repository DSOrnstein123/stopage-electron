import { Button } from "@/components/shadcn/button";

interface Column {
  type: "text" | "select" | "checkbox";
  name: string;
  width: number;
}

const cols: Column[] = [
  {
    type: "text",
    name: "Col 1",
    width: 160,
  },
  {
    type: "text",
    name: "Col 2",
    width: 200,
  },
];

const rows = [];

const Table = () => {
  return (
    <div className="flex items-center">
      {cols.map((col) => (
        <div
          key={col.name}
          className="whitespace-nowrap"
          style={{ width: col.width }}
        >
          {col.name}
        </div>
      ))}
      <Button variant="ghost">+</Button>
    </div>
  );
};

export default Table;
