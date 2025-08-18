import { getDay, getDaysInMonth, isToday } from "date-fns";

interface CalendarDate {
  id: number;
  date: number;
  isCurrentMonth: boolean;
  isToday: boolean;
}

const getCalendarDatesForMonth = (
  month: number,
  year: number,
): CalendarDate[] => {
  const datesInCurrentMonth = getDaysInMonth(new Date(year, month - 1));

  const firstDayOfCurrentMonth = getDay(new Date(year, month - 1, 1));
  const lastDayOfCurrentMonth = getDay(
    new Date(year, month - 1, datesInCurrentMonth),
  );

  const prevMonthDays = Array.from(
    { length: firstDayOfCurrentMonth },
    (_, i) => ({
      id: i,
      date:
        getDaysInMonth(new Date(year, month - 2)) -
        firstDayOfCurrentMonth +
        i +
        1,
      isCurrentMonth: false,
      isToday: false,
    }),
  );

  const currentMonthDays = Array.from(
    { length: datesInCurrentMonth },
    (_, i) => ({
      id: firstDayOfCurrentMonth + i,
      date: i + 1,
      isCurrentMonth: true,
      isToday: isToday(new Date(year, month - 1, i + 1)),
    }),
  );

  const nextMonthDays = Array.from(
    { length: 7 - lastDayOfCurrentMonth - 1 },
    (_, i) => ({
      id: firstDayOfCurrentMonth + datesInCurrentMonth + i,
      date: i + 1,
      isCurrentMonth: false,
      isToday: false,
    }),
  );

  return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
};

export default getCalendarDatesForMonth;
