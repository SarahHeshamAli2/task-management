export function getInitials(name: string): string {
  const parts = name?.trim().split(/\s+/).filter(Boolean);

  if (parts?.length === 0) return "";

  if (parts?.length === 1) {
    // single name => take first 2 letters
    return parts[0].slice(0, 2).toUpperCase();
  }

  // multiple names => first and last initials
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
