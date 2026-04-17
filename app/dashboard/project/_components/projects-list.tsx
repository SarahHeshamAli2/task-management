import { getAllProjectsService } from "@/lib/services/get-projects";
import ProjectCard from "./project-card";
import { projectsList } from "@/lib/types/projects.type";
import EmptyState from "./empty-state";
import ErrorState from "../../../../components/shared/error-state";
import Header from "./header";

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
      <Header
        title="Projects"
        subtitle="Manage and curate your projects"
        buttonText="Create new project"
        linkHref="/dashboard/project/add"
        leftIcon="+"
      />{" "}
      <div className="grid grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.name}
            createdAt={project.created_at}
            desc={project.description}
          />
        ))}
      </div>
    </>
  );
}
