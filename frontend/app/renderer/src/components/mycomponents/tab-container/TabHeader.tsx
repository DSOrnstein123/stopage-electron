import { type Tab } from "@/types/tab.types";
import { cn } from "@/lib/utils";
import { useTabStore } from "@/store/tabStore";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/shadcn/button";
import { useEffect, type MouseEvent } from "react";

const TabHeader = ({ data }: { data: Tab }) => {
  const navigate = useNavigate();

  const activeTabId = useTabStore((state) => state.activeTabId);
  const setActiveTab = useTabStore((state) => state.setActiveTab);
  const removeTab = useTabStore((state) => state.removeTab);

  useEffect(() => {
    if (activeTabId === data.id) {
      navigate(data.route);
    }
    //TODO: fix deps
  }, [activeTabId, data, navigate]);

  return (
    <div
      className={cn(
        "relative h-full w-32 cursor-default overflow-hidden rounded-t-sm border-x-1 bg-zinc-200 whitespace-nowrap select-none",
        activeTabId === data.id && "bg-white",
      )}
      onClick={() => {
        if (activeTabId !== data.id) {
          setActiveTab(data.id);
          navigate(data.route);
        }
      }}
    >
      {data.title === "" ? "New tab" : data.title}

      {/* TODO: fix X position */}
      <Button
        variant="ghost"
        className="absolute top-1 right-1 size-4 rounded-full bg-white p-0"
        onClick={(e: MouseEvent) => {
          e.stopPropagation();

          removeTab(data.id);
        }}
      >
        x
      </Button>
    </div>
  );
};

export default TabHeader;
