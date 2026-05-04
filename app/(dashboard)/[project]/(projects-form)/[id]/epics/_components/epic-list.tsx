"use client";
import PlusIcon from "@/components/icons/plus-icon";
import Link from "next/link";
import { useIsMobile } from "@/lib/hooks/use-mobile";
import { useCallback } from "react";
import Header from "@/app/(dashboard)/[project]/_components/header";
import Pagination from "@/app/(dashboard)/[project]/_components/pagination";
import { useParams } from "next/navigation";
import useGetEpics from "../hooks/use-get-epics";
import EpicCard from "./epic-card";
import { useInfiniteScroll } from "@/lib/hooks/use-infinite-scroll";
import EmptyState from "@/components/shared/empty-state";
import { EpicGridDecoration } from "@/components/ui/epic-grid-decoration";
import EpicCardListSkeleton from "@/components/skeletons/epic-card.skeleton";
import { ROUTES } from "@/lib/constants/routes.constants";
import { useSearchParam } from "@/lib/hooks/use-search-param";

type Props = {
  searchParams: { page?: string; search?: string };
};

export default function EpicList({ searchParams }: Props) {
  const limit = 6;
  const isMobile = useIsMobile();
  const params = useParams();

  const id = params.id as string;

  const {
    searchInput,
    setSearchInput,
    debouncedSearch,
    mobilePage,
    setMobilePage,
  } = useSearchParam(searchParams?.search);
  const currentPage = Number(searchParams?.page) || 1;

  const offset = searchInput
    ? 0
    : isMobile
      ? (mobilePage - 1) * limit
      : (currentPage - 1) * limit;

  const { epics, total, isLoading, isInitialLoad, hasMore, updateEpic } =
    useGetEpics({
      limit,
      offset,
      append: isMobile,
      id,
      search: debouncedSearch,
    });

  const handleLoadMore = useCallback(() => {
    setMobilePage((prev) => prev + 1);
  }, []);

  const { lastElementRef } = useInfiniteScroll({
    isLoading,
    hasMore,
    onLoadMore: handleLoadMore,
    enabled: isMobile,
  });

  const addEpicHref = ROUTES.epics.add(id);

  const header = (
    <Header
      showSearch
      title="Project Epics"
      searchValue={searchInput}
      onSearchChange={setSearchInput}
      searchPlaceholder="Search epics..."
      buttonText="New Epic"
      linkHref={addEpicHref}
      leftIcon="+"
      buttonClassName="hidden md:block"
      titleClassName="hidden md:block"
    />
  );

  if (isInitialLoad && isLoading) {
    return (
      <>
        {header}
        <EpicCardListSkeleton />
      </>
    );
  }

  if (!isLoading && !isInitialLoad && epics?.length === 0) {
    return (
      <>
        {header}
        <EmptyState
          icon={<EpicGridDecoration />}
          centralClassName="bg-white"
          cardBackground="white"
          borderGradient={null}
          decoratorIconStart={null}
          decoratorIconEnd={null}
          heading="No epics in this project yet."
          description="Break down your large project into manageable
epics to track progress better and maintain
architectural clarity."
          action={{
            label: "Create First Epic",
            href: addEpicHref,
            icon: (
              <svg
                width="16"
                height="20"
                viewBox="0 0 16 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.55 16.2L11.725 10H7.725L8.45 4.325L3.825 11H7.3L6.55 16.2ZM4 20L5 13H0L9 0H11L10 8H16L6 20H4Z"
                  fill="white"
                />
              </svg>
            ),
          }}
        />
      </>
    );
  }

  const totalPages = Math.ceil(total / limit);
  const hasNextPage = currentPage < totalPages;
  const shownUpTo = Math.min(currentPage * limit, total);

  return (
    <>
      {header}

      <div className="grid md:grid-cols-2 gap-6">
        {epics?.map((epic, index) => {
          const isLast = epics.length === index + 1;
          return (
            <EpicCard
              epicId={epic.id}
              id={epic.epic_id}
              key={epic.id}
              ref={isLast ? lastElementRef : undefined}
              title={epic.title}
              createdAt={epic.created_at}
              userName={epic.assignee.name}
              createdBy={epic.created_by.name}
              deadline={epic.deadline}
              asigneeName={epic.assignee.name}
              description={epic.description}
              assigneeId={epic.assignee.sub}
              projectId={id}
              onUpdate={(patch) => updateEpic(epic.id, patch)}
            />
          );
        })}

        {isMobile && isLoading && (
          <div className="col-span-full flex justify-center py-4">
            <span className="text-secondary text-sm">Loading more...</span>
          </div>
        )}

        {!isMobile && (
          <div className="bg-white flex flex-col gap-3.5 p-6 rounded-lg min-h-55 border-dashed border-slate-light/20 border-2 justify-center items-center">
            <Link
              className="min-h-12 min-w-12 bg-surface-low flex items-center justify-center rounded-xl"
              href={addEpicHref}
            >
              <PlusIcon fill="black" />
            </Link>
            <span className="uppercase text-secondary text-sm font-bold">
              add epic
            </span>
          </div>
        )}
      </div>

      {!hasMore && isMobile && (
        <p className="my-3 text-end font-bold text-sm text-secondary capitalize">
          no more epics
        </p>
      )}

      {isMobile && (
        <Link
          className="w-14 h-14 sm:hidden rounded-xl ms-auto bg-primary flex items-center justify-center mb-15"
          href={addEpicHref}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M6 8H0V6H6V0H8V6H14V8H8V14H6V8Z" fill="white" />
          </svg>
        </Link>
      )}

      {!isMobile && (
        <Pagination
          perPage={shownUpTo}
          totalCount={total}
          currentPage={currentPage}
          totalPages={totalPages}
          hasNextPage={hasNextPage}
        />
      )}
    </>
  );
}
