import { getAllProjectsService } from "@/lib/services/get-projects";
import ProjectCard from "./project-card";
import { projectsList } from "@/lib/types/projects.type";
import EmptyState from "./empty-state";
import ErrorState from "./error-state";

export default async function ProjectsList() {
  let projects: projectsList;
  try {
    projects = await getAllProjectsService();
  } catch (err) {
    const message = err instanceof Error ? err.message : "";
    if (message === "UNAUTHORIZED") throw err;
    return <ErrorState />;
  }
  if (projects.length == 0) {
    return <EmptyState />;
  }

  return (
    <>
      {projects.map((project) => (
        <div key={project.id} className="grid grid-cols-3">
          <ProjectCard
            title={project.name}
            createdAt={project.created_at}
            desc={project.description}
          />
        </div>
      ))}
    </>
  );
}
