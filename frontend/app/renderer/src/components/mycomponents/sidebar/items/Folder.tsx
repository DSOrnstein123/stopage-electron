import { useState } from "react";
import { cn } from "@/lib/utils";
import File from "./File";

interface File {
  name: string;
  type: "folder" | "file";
}

const files: File[] = [
  {
    name: "File 1",
    type: "file",
  },
  {
    name: "File 2",
    type: "file",
  },
  {
    name: "Folder 1",
    type: "folder",
  },
];

const Folder = () => {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const handleOnClick = () => {
    setIsSelected(true);
  };

  return (
    <div className="flex flex-col space-y-[2px]">
      <div
        onClick={handleOnClick}
        className={cn(
          "rounded-md px-2 py-1 text-sm hover:bg-[#e3e3e3]/50",
          isSelected ? "bg-[#e3e3e3] font-medium" : "",
        )}
      >
        Folder
      </div>

      <div className="flex flex-col space-y-[2px]">
        {files.map((file) => (
          <File name={file.name} />
        ))}
      </div>
    </div>
  );
};

export default Folder;
