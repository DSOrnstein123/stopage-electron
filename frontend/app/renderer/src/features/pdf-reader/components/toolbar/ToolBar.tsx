import { Separator } from "@/components/shadcn/separator";
import ColorPallete from "./ColorPallete";

const ToolBar = ({
  className = "",
  totalPages = 0,
}: {
  className?: string;
  totalPages: number;
}) => {
  return (
    <>
      <div className={`flex h-8 w-full ${className}`}>
        {totalPages}
        <ColorPallete />
      </div>

      <Separator />
    </>
  );
};

export default ToolBar;
