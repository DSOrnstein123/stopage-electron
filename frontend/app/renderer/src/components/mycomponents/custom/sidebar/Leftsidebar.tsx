import ActionBar from "./ActionBar";
import PrimarySidebar from "./PrimarySidebar";

const LeftSidebar = () => {
  return (
    <div className="flex">
      <ActionBar />
      <PrimarySidebar />
    </div>
  );
};

export default LeftSidebar;
