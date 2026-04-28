"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { getPathSegments } from "@/lib/hooks/use-breadcrumbs";
import { useResolveBreadcrumbLabels } from "@/lib/hooks/use-breadcrumbs-resolver";
import { UUID_REGEX } from "@/lib/utils/uuid-checker";
import { CrumbSkeleton } from "../skeletons/bread-crumb.skeleton";

function getLabel(segment: string, index: number, segments: string[]): string {
  const prev = segments[index - 1];

  const labels: Record<string, Record<string, string> | string> = {
    project: "Projects",
    add: "Add New Project",
    edit: "Edit",
    new: {
      tasks: "New Task",
      project: "New Project",
    },
  };

  const label = labels[segment];

  if (typeof label === "object") return label[prev] ?? "New";
  return label ?? segment.charAt(0).toUpperCase() + segment.slice(1);
}
export default function Breadcrumb() {
  const pathname = usePathname();
  const segments = getPathSegments(pathname);
  const segmentsToResolve = segments.filter((seg) => seg !== "edit");
  const resolvedLabels = useResolveBreadcrumbLabels(segmentsToResolve);

  const crumbs = segments.map((segment, index) => {
    const isUUID = UUID_REGEX.test(segment);

    const defaultHref = "/" + segments.slice(0, index + 1).join("/");
    return {
      label: resolvedLabels[segment] ?? getLabel(segment, index, segments),
      href: isUUID ? `/${segments[0]}/${segment}/edit` : defaultHref,
      isLast: index === segments.length - 1,
      isClickable: true,
    };
  });
  return (
    <nav
      aria-label="breadcrumb"
      className="flex items-center gap-1 text-xs font-bold uppercase"
    >
      {crumbs.map((crumb, index) => {
        const segment = segments[index];
        const isUUID = UUID_REGEX.test(segment);
        const isLoading = isUUID && !resolvedLabels[segment];

        return (
          <span
            key={`${index}-${crumb.href}`}
            className="flex items-center gap-1"
          >
            {index > 0 && <span className="text-[#43465499]">{">"}</span>}

            {isLoading ? (
              <CrumbSkeleton />
            ) : crumb.isLast || !crumb.isClickable ? (
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
        );
      })}
    </nav>
  );
}
