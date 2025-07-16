import { Outlet } from "react-router-dom";

const Flashcards = () => {
  return (
    <div className="mx-auto w-full max-w-[1200px] flex-1 overflow-x-hidden px-10">
      <Outlet />
    </div>
  );
};

export default Flashcards;
