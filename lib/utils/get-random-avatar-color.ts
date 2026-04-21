const palette: { bg: string; text: string }[] = [
  { bg: "#d7e2ff", text: "#003d9b" },
  { bg: "#0052cc", text: "#d7e2ff" },
  { bg: "#003d9b", text: "#f1f3ff" },
  { bg: "#f1f3ff", text: "#003d9b" },
  { bg: "#82f9be", text: "#041b3c" },
  { bg: "#041b3c", text: "#d7e2ff" },
  { bg: "#4f5f7b", text: "#d7e2ff" },
  { bg: "#c3c6d6", text: "#041b3c" },
  { bg: "#e8edff", text: "#003d9b" },
  { bg: "#434654", text: "#d7e2ff" },
  { bg: "#ffb300", text: "#041b3c" },
];

export function getAvatarColors(seed: string): { bg: string; text: string } {
  const hash = [...seed].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return palette[hash % palette.length];
}
