import { Outlet } from "react-router-dom";
import LeftSidebar from "@/components/mycomponents/sidebar/Leftsidebar";
import RightSidebar from "@/components/mycomponents/sidebar/RightSidebar";
import TabBar from "@/components/mycomponents/tab-container/TabBar";

const MainLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <LeftSidebar />

      <main
        id="canvas"
        className="relative flex h-screen flex-1 flex-col items-center justify-center overflow-hidden"
      >
        <TabBar />

        <Outlet />
      </main>

      <RightSidebar />
    </div>
  );
};

export default MainLayout;
