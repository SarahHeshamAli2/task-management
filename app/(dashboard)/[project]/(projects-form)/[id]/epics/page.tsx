import { Suspense } from "react";
import EpicList from "./_components/epic-list";
import EpicCardListSkeleton from "@/components/skeletons/epic-card.skeleton";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const resolvedParams = await searchParams;
  const page = resolvedParams?.page ?? "1";
  return (
    <Suspense key={page} fallback={<EpicCardListSkeleton />}>
      <EpicList searchParams={resolvedParams} />
    </Suspense>
  );
}
