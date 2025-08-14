import { useCallback, useRef, useState } from "react";
import getCalendarDatesForMonth from "../../utils/getCalendarDatesForMonth";
import {
  useFloating,
  useClick,
  useInteractions,
  flip,
  offset,
  arrow,
  autoUpdate,
} from "@floating-ui/react";
import DateCell from "./DateCell";
import Popover from "./Popover";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar = () => {
  const dates = getCalendarDatesForMonth(8, 2025);

  const arrowRef = useRef(null);
  const [popoverOpenIndex, setPopoverOpenIndex] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    placement: "top",
    open: open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      flip(),
      offset(),
      arrow({
        element: arrowRef,
      }),
    ],
  });

  const click = useClick(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([click]);

  const handleOnClick = useCallback(
    (e: React.MouseEvent<Element, MouseEvent>, id: number) => {
      refs.setReference(e.currentTarget);
      setPopoverOpenIndex(id);
      setOpen(true);
    },
    [refs],
  );

  return (
    <div className="h-[calc(100vh-80px)] w-full overflow-y-auto">
      <div className="sticky top-0 left-0 z-10 grid h-6 grid-cols-7 bg-white">
        {days.map((day) => (
          <div className="border-r-1 border-b-1 pl-1 text-sm leading-6 font-[500]">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {dates.map((date) => (
          <DateCell
            key={date.id}
            id={date.id}
            date={date.date}
            handleOnClick={handleOnClick}
            getReferenceProps={
              date.id === popoverOpenIndex ? getReferenceProps : undefined
            }
          />
        ))}
      </div>

      {open && (
        <Popover
          ref={refs.setFloating}
          arrowRef={arrowRef}
          floatingStyles={floatingStyles}
          getFloatingProps={getFloatingProps}
          context={context}
        />
      )}
    </div>
  );
};

export default Calendar;
