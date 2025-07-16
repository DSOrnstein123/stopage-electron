import React, { useRef } from "react";

interface ResizerProps {
  primarySidebarRef: React.RefObject<HTMLDivElement | null>;
}

const Resizer = ({ primarySidebarRef }: ResizerProps) => {
  const isResizing = useRef<boolean>(false);
  const actionBarWidth = useRef<number>(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    isResizing.current = true;
    actionBarWidth.current =
      primarySidebarRef.current?.getBoundingClientRect().left ?? 0;

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseUp = () => {
    isResizing.current = false;

    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing.current || !primarySidebarRef.current) return;

    let newWidth = e.clientX - actionBarWidth.current;

    if (newWidth < 160) newWidth = 160;
    if (newWidth > 1000) newWidth = 1000;

    primarySidebarRef.current.style.width = `${newWidth}px`;
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      className="bg-primary/10 absolute top-0 right-[-2px] h-full w-1 cursor-ew-resize opacity-0 hover:opacity-100"
    />
  );
};

export default Resizer;
