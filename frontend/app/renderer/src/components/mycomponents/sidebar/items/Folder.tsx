import File from "./File";

interface File {
  name: string;
  type: "folder" | "file";
}

export interface Document {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

const Folder = ({ files }: { files: Document[] }) => {
  // const [isSelected, setIsSelected] = useState<boolean>(false);

  // const handleOnClick = () => {
  //   setIsSelected(true);
  // };

  return (
    <>
      {/* <div
        onClick={handleOnClick}
        className={cn(
          "rounded-md px-2 py-1 text-sm hover:bg-[#e3e3e3]/50",
          isSelected ? "bg-[#e3e3e3] font-medium" : "",
        )}
      >
        Folder
      </div> */}
    </>
  );
};

export default Folder;
