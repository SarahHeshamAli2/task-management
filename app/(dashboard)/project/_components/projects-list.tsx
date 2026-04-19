import { getAllProjectsService } from "@/lib/services/get-projects";
import ProjectCard from "./project-card";
import { projectsList } from "@/lib/types/projects.type";
import EmptyState from "./empty-state";
import ErrorState from "../../../../components/shared/error-state";
import Header from "./header";
import Button from "@/components/ui/button";
import PlusIcon from "@/components/icons/plus-icon";
import Link from "next/link";

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
        linkHref="/project/add"
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
        <div className="bg-white  p-6 rounded-lg min-h-55  border-dashed border-[#C3C6D633] border-2 flex justify-center items-center">
          <Button
            variant="ghost"
            className="uppercase text-secondary text-sm font-bold flex flex-col gap-3.5"
          >
            <Link
              className=" min-h-12 min-w-12 bg-surface-low  flex items-center justify-center rounded-xl"
              href={"/project/add"}
            >
              <PlusIcon fill="black" />
            </Link>
            add project
          </Button>
        </div>
      </div>
    </>
  );
}
