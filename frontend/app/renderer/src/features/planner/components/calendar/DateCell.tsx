import { Button } from "@/components/shadcn/button";
import type { UseInteractionsReturn } from "@floating-ui/react";
import { memo } from "react";

interface DateCellProps {
  id: number;
  date: number;
  handleOnClick: (e: React.MouseEvent<Element, MouseEvent>, id: number) => void;
  getReferenceProps: UseInteractionsReturn["getReferenceProps"] | undefined;
}

const DateCell = memo(
  ({ id, date, handleOnClick, getReferenceProps }: DateCellProps) => {
    return (
      <div className="flex h-44 justify-between border-r-1 border-b-1 p-1">
        <span>{date}</span>

        <Button
          variant="ghost"
          className="size-6 p-0 opacity-0 hover:opacity-100"
          onClick={(e) => handleOnClick(e, id)}
          {...getReferenceProps?.()}
        >
          +
        </Button>
      </div>
    );
  },
);

export default DateCell;
