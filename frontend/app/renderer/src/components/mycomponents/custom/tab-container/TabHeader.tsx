import { type Tab } from "@/types/tab.types";
import { cn } from "@/lib/utils";
import { useTabStore } from "@/store/tabStore";
import { useNavigate } from "react-router-dom";

const TabHeader = ({ data, isActive }: { data: Tab; isActive: boolean }) => {
  const navigate = useNavigate();

  const setActiveTab = useTabStore((state) => state.setActiveTab);

  return (
    <button
      className={cn(
        "h-full w-32 rounded-t-sm border-x-1 bg-white",
        !isActive && "bg-zinc-200"
      )}
      onClick={() => {
        setActiveTab(data.id);
        navigate(data.route);
      }}
    >
      {data.title}
    </button>
  );
};

export default TabHeader;
