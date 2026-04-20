"use client";

import LeftChevron from "@/components/icons/left-chevron";
import RightChevron from "@/components/icons/right-chevron";
import Button from "@/components/ui/button";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

type Props = {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  projectsCount: number;
  projectsPerPage: number;
};

const navLinkClass =
  "w-8 h-8 border border-slate-light/30 flex items-center justify-center rounded-xs";

export default function Pagination({
  currentPage,
  totalPages,
  hasNextPage,
  projectsCount,
  projectsPerPage,
}: Props) {
  const isFirst = currentPage <= 1;
  const isLast = !hasNextPage;
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handlePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    params.set("totalPages", String(totalPages));
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="my-20 flex items-center justify-between">
      <p className="text-secondary text-xs font-medium">
        Showing {projectsPerPage} of {projectsCount} active projects
      </p>
      <div className="flex gap-2">
        <Button
          disabled={isFirst}
          variant="ghost"
          rightIcon={<LeftChevron width="4.3" height="7" />}
          onClick={() => handlePage(currentPage - 1)}
          className={navLinkClass}
        ></Button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            className="w-8 h-8"
            variant={page === currentPage ? "primary" : "ghost"}
            onClick={() => handlePage(page)}
          >
            {page}
          </Button>
        ))}

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
