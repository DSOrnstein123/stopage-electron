import TabBar from "./TabBar";
import { Outlet } from "react-router-dom";

const TabContainer = () => {
  return (
    <>
      <TabBar />

      <div className="h-[calc(100vh-80px)] w-full overflow-y-auto">
        <Outlet />
      </div>
    </>
  );
};

export default TabContainer;
