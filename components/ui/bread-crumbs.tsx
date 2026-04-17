"use client";

import { useBreadcrumb } from "@/lib/hooks/use-breadcrumbs";
import Link from "next/link";

export default function Breadcrumb() {
  const crumbs = useBreadcrumb();

  return (
    <nav
      aria-label="breadcrumb"
      className="flex items-center gap-1 text-xs font-bold uppercase"
    >
      {crumbs.map((crumb, index) => (
        <span key={crumb.href} className="flex items-center gap-1">
          {index > 0 && <span className="text-[#43465499]">{">"}</span>}
          {crumb.isLast ? (
            <span className=" text-primary uppercase">{crumb.label}</span>
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
