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
