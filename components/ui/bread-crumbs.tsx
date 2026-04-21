"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { getPathSegments } from "@/lib/hooks/use-breadcrumbs";
import { useResolveBreadcrumbLabels } from "@/lib/hooks/use-breadcrumbs-resolver";
import { UUID_REGEX } from "@/lib/utils/uuid-checker";

function getLabel(segment: string): string {
  const labels: Record<string, string> = {
    project: "Projects",
    add: "Add New Project",
    edit: "Edit",
  };
  return labels[segment] ?? segment.charAt(0).toUpperCase() + segment.slice(1);
}

export default function Breadcrumb() {
  const pathname = usePathname();
  const segments = getPathSegments(pathname);
  const segmentsToResolve = segments.filter((seg) => seg !== "edit");
  const resolvedLabels = useResolveBreadcrumbLabels(segmentsToResolve);

  const crumbs = segments.map((segment, index) => ({
    label: resolvedLabels[segment] ?? getLabel(segment),
    href: "/" + segments.slice(0, index + 1).join("/"),
    isLast: index === segments.length - 1,
    isClickable: !UUID_REGEX.test(segment),
  }));

  return (
    <nav
      aria-label="breadcrumb"
      className="flex items-center gap-1 text-xs font-bold uppercase"
    >
      {crumbs.map((crumb, index) => (
        <span key={crumb.href} className="flex items-center gap-1">
          {index > 0 && <span className="text-[#43465499]">{">"}</span>}
          {crumb.isLast || !crumb.isClickable ? (
            <span
              className={
                crumb.isLast ? "text-primary uppercase" : "text-secondary/60"
              }
            >
              {crumb.label}
            </span>
          ) : (
            <Link
              href={crumb.href}
              className="text-secondary/60 hover:text-secondary/80"
            >
              {crumb.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
