import { Suspense } from "react";
import ProjectsList from "./_components/projects-list";
import ProjectsListSkeleton from "@/components/skeletons/project-card.skeleton";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const resolvedParams = await searchParams;
  const page = resolvedParams?.page ?? "1";

  return (
    <Suspense key={page} fallback={<ProjectsListSkeleton />}>
      <ProjectsList searchParams={resolvedParams} />
    </Suspense>
  );
}
