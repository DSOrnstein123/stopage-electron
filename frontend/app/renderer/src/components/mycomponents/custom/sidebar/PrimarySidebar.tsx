import { useRef } from "react";
import Resizer from "./Resizer";
import Folder from "./items/Folder";
import File from "./items/File";

const PrimarySidebar = () => {
  const primarySidebarRef = useRef<HTMLDivElement | null>(null);

  return (
    <aside
      ref={primarySidebarRef}
      className="group/sidebar bg-primary/5 relative z-[20] h-full w-56 flex-col space-y-[2px] p-2"
    >
      <Resizer sidebarRef={primarySidebarRef} isPrimarySidebar={true} />

      <Folder />
      <File name="File 3" />
    </aside>
  );
};

export default PrimarySidebar;
