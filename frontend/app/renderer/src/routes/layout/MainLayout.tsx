import LeftSidebar from "@/components/mycomponents/custom/sidebar/Leftsidebar";
import TabContainer from "@/components/mycomponents/custom/tab-container";
import { cn } from "@/lib/utils";
// import { Outlet } from "react-router-dom";

const MainLayout = () => {
  // const tool = useFlowStore((state) => state.tool);
  // const setTool = useFlowStore((state) => state.setTool);

  // useEffect(() => {
  //   const handleKeyDown = (e: KeyboardEvent) => {
  //     if (e.key === "v") setTool("select");
  //     if (e.key === "h") setTool("pan");
  //   };

  //   window.addEventListener("keydown", handleKeyDown);
  //   return () => window.removeEventListener("keydown", handleKeyDown);
  // }, [setTool]);

  return (
    <div className="flex h-screen">
      <LeftSidebar />

      <main
        id="canvas"
        className={cn(
          "relative flex h-screen flex-1 flex-col items-center justify-center overflow-hidden",
          // tool === "select" ? "cursor-default" : "cursor-grab",
        )}
      >
        <TabContainer />
      </main>
    </div>
  );
};

export default MainLayout;
