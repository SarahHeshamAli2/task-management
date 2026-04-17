import { getAllProjectsService } from "@/lib/services/get-projects";
import ProjectCard from "./project-card";
import { projectsList } from "@/lib/types/projects.type";
import EmptyState from "./empty-state";

export default async function ProjectsList() {
  const projects: projectsList = await getAllProjectsService();

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
