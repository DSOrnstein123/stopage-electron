import { Button } from "@/components/shadcn/button";
import {
  FloatingArrow,
  type FloatingContext,
  type UseFloatingReturn,
} from "@floating-ui/react";
import { useEffect, useRef, type ReactNode } from "react";

interface PopoverProps {
  children?: ReactNode;
  ref: UseFloatingReturn["refs"]["setFloating"];
  floatingStyles: React.CSSProperties;
  getFloatingProps: (
    userProps?: React.HTMLProps<HTMLElement> | undefined,
  ) => Record<string, unknown>;
  context: FloatingContext;
  arrowRef: React.RefObject<null>;
}

const Popover = ({
  ref,
  floatingStyles,
  getFloatingProps,
  context,
  arrowRef,
}: PopoverProps) => {
  const focusRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    focusRef.current?.focus();
  });

  return (
    <div ref={ref} style={floatingStyles} {...getFloatingProps()}>
      <div className="rounded-md border-1 border-black bg-gray-200 p-2">
        <input
          ref={focusRef}
          placeholder="Name your task"
          className="mb-2 w-full"
        />

        <Button className="w-full">Create</Button>
      </div>

      <FloatingArrow
        ref={arrowRef}
        context={context}
        fill="#e5e7eb"
        stroke="black"
        strokeWidth={0.8}
        style={{
          top: "calc(100% - 0.8px)",
        }}
      />
    </div>
  );
};

export default Popover;
