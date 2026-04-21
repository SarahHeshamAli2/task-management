import CalendarIcon from "@/components/icons/calendar-icon";
import { formatDate } from "@/lib/utils/format-date";
import Link from "next/link";
import { Ref } from "react";

type ProjectCardProps = {
  title: string;
  desc: string;
  createdAt: string;
  ref?: Ref<HTMLDivElement>;
  id?: string | null;
};

export default function ProjectCard({
  title = `Skyline Residence Phase II`,
  desc = `Structural review and aesthetic
curation for the high-rise residential
complex in the downtown district`,
  createdAt = "12 Oct 2025",
  ref,
  id,
}: ProjectCardProps) {
  return (
    <div
      ref={ref}
      className="bg-white p-6 rounded-lg min-h-55 flex flex-col justify-between"
    >
      <div>
        <div className="flex justify-between items-center">
          <Link href={`project/${id}/epics`}>
            <h1 className="text-slate-dark font-medium text-lg">{title}</h1>
          </Link>
          <Link href={`/project/${id}/edit`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </Link>
        </div>
        <p className="mt-3.5 text-secondary text-sm leading-6">{desc}</p>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-placeholder font-bold text-xs uppercase md:block hidden">
          created at
        </span>
        <span className="text-secondary font-medium text-sm flex items-center gap-1.5">
          <span className="sm:hidden">
            <CalendarIcon />
          </span>
          {formatDate(createdAt)}
        </span>
      </div>
    </div>
  );
}
