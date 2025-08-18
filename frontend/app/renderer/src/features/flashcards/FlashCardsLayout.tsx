import { Outlet } from "react-router-dom";

const FlashCardsLayout = () => {
  return ( 
    <div className="w-full overflow-y-auto h-[calc(100vh-80px)]">
      <div className="mx-auto w-full max-w-[1200px] flex-1 overflow-x-hidden px-10">
        <Outlet />
      </div>
    </div>
  );
}
 
export default FlashCardsLayout;