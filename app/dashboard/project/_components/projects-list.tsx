import { getAllProjectsService } from "@/lib/services/get-projects";
import ProjectCard from "./project-card";
import { projectsList } from "@/lib/types/projects.type";

export default async function ProjectsList() {
  const projects: projectsList = await getAllProjectsService();
  console.log(projects, "[[");

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
