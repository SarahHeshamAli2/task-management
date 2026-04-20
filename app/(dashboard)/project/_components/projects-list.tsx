"use client";
import ProjectCard from "./project-card";
import EmptyState from "./empty-state";
import Header from "./header";
import PlusIcon from "@/components/icons/plus-icon";
import Link from "next/link";
import Pagination from "./pagination";
import UseGetProjects from "../hooks/use-get-projects";
import ProjectsListSkeleton from "@/components/skeletons/project-card.skeleton";
import { useIsMobile } from "@/lib/hooks/use-mobile";
import { useRef, useCallback, useState } from "react";

type Props = {
  searchParams: { page?: string };
};

export default function ProjectsList({ searchParams }: Props) {
  const limit = 4;
  const isMobile = useIsMobile();

  const [currentPage, setCurrentPage] = useState(
    () => Number(searchParams?.page) || 1
  );

  const offset = (currentPage - 1) * limit;

  const { projects, total, isLoading, isInitialLoad, hasMore } = UseGetProjects(
    { limit, offset, append: isMobile }
  );

  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (!isMobile) return;
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setCurrentPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, isMobile]
  );

  // Show skeleton only on the very first load, not on every paginated fetch
  if (isInitialLoad && isLoading) {
    return <ProjectsListSkeleton />;
  }

  if (!isLoading && !isInitialLoad && projects.length === 0) {
    return <EmptyState />;
  }

  const totalPages = Math.ceil(total / limit);
  const hasNextPage = currentPage < totalPages;
  const projectsPerPage = projects.length;
  const shownUpTo = Math.min(currentPage * limit, total);

  return (
    <>
      <Header
        title="Projects"
        subtitle="Manage and curate your projects"
        buttonText="Create new project"
        linkHref="/project/add"
        leftIcon="+"
        buttonClassName="hidden md:block"
      />

      <div className="grid md:grid-cols-3 gap-6">
        {projects?.map((project, index) => {
          const isLast = projects.length === index + 1;
          return (
            <ProjectCard
              // Only attach the scroll observer ref on mobile
              ref={isLast && isMobile ? lastElementRef : undefined}
              key={project.id}
              title={project.name}
              createdAt={project.created_at}
              desc={project.description}
            />
          );
        })}

        {/* Loading indicator for inifite scroll */}
        {isMobile && isLoading && (
          <div className="col-span-full flex justify-center py-4">
            <span className="text-secondary text-sm">Loading more...</span>
          </div>
        )}

        {!isMobile && (
          <div className="bg-white flex flex-col gap-3.5 p-6 rounded-lg min-h-55 border-dashed border-slate-light/20 border-2 justify-center items-center">
            <Link
              className="min-h-12 min-w-12 bg-surface-low flex items-center justify-center rounded-xl"
              href="/project/add"
            >
              <PlusIcon fill="black" />
            </Link>
            <span className="uppercase text-secondary text-sm font-bold">
              add project
            </span>
          </div>
        )}
      </div>
      {!hasMore && isMobile && (
        <p className=" my-3 text-end font-bold text-sm text-secondary capitalize">
          no more projects
        </p>
      )}
      {isMobile && (
        <Link
          className="w-14 h-14 sm:hidden rounded-xl ms-auto bg-primary flex items-center justify-center mb-15"
          href="/project/add"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M6 8H0V6H6V0H8V6H14V8H8V14H6V8Z" fill="white" />
          </svg>
        </Link>
      )}

      {!isMobile && (
        <Pagination
          projectsPerPage={shownUpTo}
          projectsCount={total}
          currentPage={currentPage}
          totalPages={totalPages}
          hasNextPage={hasNextPage}
        />
      )}
    </>
  );
}
