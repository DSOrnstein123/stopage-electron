import { Button } from "@/components/shadcn/button";
import TabHeader from "./TabHeader";
import { MyBreadCrumb as Breadcrumb } from "@/components/mycomponents/MyBreadcrumb";
import { Separator } from "@/components/shadcn/separator";
import { Plus } from "lucide-react";

import { useTabStore } from "@/store/tabStore";

const TabBar = () => {
  const tabs = useTabStore((state) => state.tabs);
  const activeTabId = useTabStore((state) => state.activeTabId);

  const { addTab } = useTabStore((state) => state.actions);

  return (
    //TODO: relearn fixed and sticky
    <div className="sticky top-0 left-0 z-10 w-full">
      <div className="flex h-10 bg-zinc-300 pt-1">
        {tabs.map((tab) => (
          <TabHeader
            data={tab}
            key={tab.id}
            isActive={activeTabId === tab.id}
          />
        ))}

        <Button variant="ghost" onClick={() => addTab("/")}>
          <Plus />
        </Button>
      </div>

      <div className="flex h-10 items-center bg-white pl-2">
        <Breadcrumb />
      </div>

      <Separator />
    </div>
  );
};

export default TabBar;
