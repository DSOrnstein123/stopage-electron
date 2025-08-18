import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";

interface ResizerProps {
  sidebarRef: React.RefObject<HTMLDivElement | null>;
  position?: "right" | "left";
  isPrimarySidebar?: boolean;
}

const Resizer = ({
  sidebarRef,
  position = "right",
  isPrimarySidebar = false,
}: ResizerProps) => {
  const isResizing = useRef<boolean>(false);
  const actionBarWidth = useRef<number>(0);

  useEffect(() => {
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    isResizing.current = true;

    if (isPrimarySidebar) {
      actionBarWidth.current =
        sidebarRef.current?.getBoundingClientRect().left ?? 0;
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseUp = () => {
    isResizing.current = false;

    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing.current || !sidebarRef.current) return;

    let newWidth: number = 0;

    if (position == "right") {
      newWidth = isPrimarySidebar
        ? e.clientX - actionBarWidth.current
        : e.clientX;
    }

    if (position == "left") {
      newWidth = window.innerWidth - e.clientX;
    }

    if (newWidth < 160) newWidth = 160;
    if (newWidth > 1000) newWidth = 1000;

    sidebarRef.current.style.width = `${newWidth}px`;
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      className={cn(
        "bg-[#ebebeb] absolute top-0 h-full w-1 cursor-ew-resize opacity-0 hover:opacity-100",
        position == "right" && "right-[-2px]",
        position == "left" && "left-[-2px]"
      )}
    />
  );
};

export default Resizer;
