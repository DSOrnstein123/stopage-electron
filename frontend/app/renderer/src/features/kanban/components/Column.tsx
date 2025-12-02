import Card from "./Card";

const Column = ({
  col,
}: {
  col: {
    title?: string;
    documents?: string[];
  };
}) => {
  // useEffect(() => {});

  return (
    <div className="mr-2 w-40 bg-gray-300 p-1" key={col.title}>
      {col.title}

      <div className="flex flex-col gap-y-2">
        {col.documents?.map((document) => (
          <Card key={document} title={document} />
        ))}
        <div className="bg-white text-center">New +</div>
      </div>
    </div>
  );
};

export default Column;
