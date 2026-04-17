import { Suspense } from "react";
import ProjectsList from "./_components/projects-list";
import ProjectsListSkeleton from "@/components/skeletons/project-card.skeleton";

export default function page() {
  return (
    <Suspense fallback={<ProjectsListSkeleton />}>
      <ProjectsList />
    </Suspense>
  );
}
