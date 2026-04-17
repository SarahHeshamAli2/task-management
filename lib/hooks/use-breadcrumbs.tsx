import { usePathname } from "next/navigation";

function getLabel(segment: string): string {
  const labels: Record<string, string> = {
    project: "Projects",
    add: "add new project",
  };
  return labels[segment] ?? segment.charAt(0).toUpperCase() + segment.slice(1);
}

export function useBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return segments.map((segment, index) => ({
    label: getLabel(segment),
    href: "/" + segments.slice(0, index + 1).join("/"),
    isLast: index === segments.length - 1,
  }));
}
