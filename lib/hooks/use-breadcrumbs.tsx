import { usePathname } from "next/navigation";

function getLabel(segment: string): string {
  const labels: Record<string, string> = {
    project: "Projects",
    add: "add new project",
  };
  return labels[segment] ?? segment.charAt(0).toUpperCase() + segment.slice(1);
}

export function getPathSegments(pathname: string): string[] {
  return pathname.split("/").filter(Boolean);
}

export function useBreadcrumb(resolvedLabels: Record<string, string> = {}) {
  const pathname = usePathname();
  const segments = getPathSegments(pathname);

  return segments.map((segment, index) => ({
    label: resolvedLabels[segment] ?? getLabel(segment),
    href: "/" + segments.slice(0, index + 1).join("/"),
    isLast: index === segments.length - 1,
  }));
}
