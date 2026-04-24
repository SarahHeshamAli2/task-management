export function formatDate(dateString: string) {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-us", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
