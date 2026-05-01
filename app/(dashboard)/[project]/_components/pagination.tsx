"use client";

import LeftChevron from "@/components/icons/left-chevron";
import RightChevron from "@/components/icons/right-chevron";
import Button from "@/components/ui/button";
import { PaginationProps } from "@/lib/types/projects.type";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const navLinkClass =
  "w-8 h-8 border border-slate-light/30 flex items-center justify-center rounded-xs";

function getPageNumbers(
  currentPage: number,
  totalPages: number
): (number | "...")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | "...")[] = [];
  const showLeftDots = currentPage > 4;
  const showRightDots = currentPage < totalPages - 3;

  pages.push(1);

  if (showLeftDots) {
    pages.push("...");
  }

  // Middle pages around current
  const start = showLeftDots ? Math.max(2, currentPage - 2) : 2;
  const end = showRightDots
    ? Math.min(totalPages - 1, currentPage + 2)
    : totalPages - 1;

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (showRightDots) {
    pages.push("...");
  }

  pages.push(totalPages);

  return pages;
}

export default function Pagination({
  currentPage,
  totalPages,
  hasNextPage,
  totalCount,
  perPage,
  label = "items",
}: PaginationProps) {
  const isFirst = currentPage <= 1;
  const isLast = !hasNextPage;
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handlePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`${pathname}?${params.toString()}`);
  };

  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <div className="my-20 flex items-center justify-between">
      <p className="text-secondary text-xs font-medium">
        Showing {Math.min(currentPage * perPage, totalCount)} of {totalCount}{" "}
        {label}
      </p>
      <div className="flex gap-2">
        <Button
          disabled={isFirst}
          variant="ghost"
          rightIcon={<LeftChevron width="4.3" height="7" />}
          onClick={() => handlePage(currentPage - 1)}
          className={navLinkClass}
        ></Button>

        {pageNumbers.map((page, i) =>
          page === "..." ? (
            <span
              key={`dots-${i}`}
              className="w-8 h-8 flex items-center justify-center text-secondary text-sm"
            >
              ...
            </span>
          ) : (
            <Button
              key={page}
              className="w-8 h-8"
              variant={page === currentPage ? "primary" : "ghost"}
              onClick={() => handlePage(page)}
            >
              {page}
            </Button>
          )
        )}

        <Button
          variant="ghost"
          leftIcon={<RightChevron width="4.3" height="7" />}
          onClick={() => handlePage(currentPage + 1)}
          className={navLinkClass}
          disabled={isLast}
        ></Button>
      </div>
    </div>
  );
}
