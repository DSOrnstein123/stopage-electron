import { useState } from "react";
import { cn } from "@/lib/utils";

interface FileProps {
  title: string;
}

const File = ({ title }: FileProps) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const handleOnClick = () => {
    setIsSelected(true);
  };

  return (
    <div
      onClick={handleOnClick}
      className={cn(
        "h-7 rounded-md px-2 py-1 text-sm hover:bg-[#e3e3e3]/50",
        isSelected ? "bg-[#e3e3e3] font-medium" : "",
      )}
    >
      <div>{title ? title : "New document"}</div>
    </div>
  );
};

export default File;
