import { useRef } from "react";
import Resizer from "./Resizer";
import List from "./List";

const PrimarySidebar = () => {
  const primarySidebarRef = useRef<HTMLDivElement | null>(null);

  return (
    <aside
      ref={primarySidebarRef}
      className="group/sidebar bg-primary/5 relative z-[20] h-full w-56 flex-col space-y-[2px] p-2"
    >
      <Resizer
        sidebarRef={primarySidebarRef}
        position="right"
        isPrimarySidebar={true}
      />

      <List />
    </aside>
  );
};

export default PrimarySidebar;
