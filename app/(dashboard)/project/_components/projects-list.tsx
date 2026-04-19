import { getAllProjectsService } from "@/lib/services/get-projects";
import ProjectCard from "./project-card";
import { projectsList } from "@/lib/types/projects.type";
import EmptyState from "./empty-state";
import ErrorState from "../../../../components/shared/error-state";
import Header from "./header";
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
        buttonClassName="hidden md:block"
      />{" "}
      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.name}
            createdAt={project.created_at}
            desc={project.description}
          />
        ))}
        <div className="bg-white md:flex flex-col gap-3.5 hidden p-6 rounded-lg min-h-55  border-dashed border-slate-light/20 border-2  justify-center items-center">
          <Link
            className="  min-h-12 min-w-12 bg-surface-low  flex items-center justify-center rounded-xl"
            href={"/project/add"}
          >
            <PlusIcon fill="black" />
          </Link>
          <span className="uppercase text-secondary text-sm font-bold">
            add project
          </span>
        </div>

        <Link
          className="w-14 h-14 sm:hidden rounded-xl ms-auto bg-primary flex items-center justify-center mb-15"
          href={"/project/add"}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6 8H0V6H6V0H8V6H14V8H8V14H6V8Z" fill="white" />
          </svg>
        </Link>
      </div>
    </>
  );
}
