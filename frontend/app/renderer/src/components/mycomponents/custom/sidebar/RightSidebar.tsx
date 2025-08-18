import { useRef } from "react";
import Resizer from "./Resizer";

const RightSidebar = () => {
  const rightSidebarRef = useRef<HTMLDivElement | null>(null);

  return (
    <aside
      ref={rightSidebarRef}
      className="group/sidebar bg-primary/5 relative z-[20] h-full w-56 flex-col space-y-[2px] p-2"
    >
      <Resizer sidebarRef={rightSidebarRef} position="left" />
    </aside>
  );
};

export default RightSidebar;
