import { useState } from "react";
import { cn } from "@/lib/utils";

interface FileProps {
  name: string;
}

const File = ({ name }: FileProps) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const handleOnClick = () => {
    setIsSelected(true);
  };

  return (
    <div
      onClick={handleOnClick}
      className={cn(
        "rounded-md px-2 py-1 text-sm hover:bg-[#e3e3e3]/50",
        isSelected ? "bg-[#e3e3e3] font-medium" : "",
      )}
    >
      <div>{name}</div>
    </div>
  );
};

export default File;
