export function formatDate(
  dateString: string | null | undefined,
  showYear = true,
  defaultFormat = "en-us"
) {
  if (!dateString) return "No deadline";

  const date = new Date(dateString);
  return date.toLocaleDateString(defaultFormat, {
    day: "2-digit",
    month: "short",
    ...(showYear && { year: "numeric" }),
  });
}
export function formatCalendarDay(dateString: string) {
  const date = new Date(dateString + "T00:00:00"); // prevent UTC offset shift

  const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
  const day = date.getDate();
  const month = date.toLocaleDateString("en-US", { month: "long" });

  return { weekday, day, month };
}

export function isToday(dateString: string) {
  const today = new Date();
  const date = new Date(dateString + "T00:00:00");
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}
export function getSunday(d: Date) {
  const day = d.getDay();
  const r = new Date(d);
  r.setDate(d.getDate() - day);
  r.setHours(0, 0, 0, 0);
  return r;
}

export function addDays(d: Date, n: number) {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}
export const toDateString = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};
