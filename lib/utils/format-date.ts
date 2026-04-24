export function formatDate(dateString: string | null | undefined) {
  if (!dateString) return "No deadline";

  const date = new Date(dateString);
  return date.toLocaleDateString("en-us", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
