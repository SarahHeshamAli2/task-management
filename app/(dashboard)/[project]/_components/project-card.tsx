"use client";

import CalendarIcon from "@/components/icons/calendar-icon";
import EditIcon from "@/components/icons/edit-icon";
import DropdownMenu from "@/components/ui/dropdown-menu";
import { ROUTES } from "@/lib/constants/routes.constants";
import { formatDate } from "@/lib/utils/format-date";
import Link from "next/link";
import { Ref } from "react";

type ProjectCardProps = {
  title: string;
  desc: string;
  createdAt: string;
  ref?: Ref<HTMLAnchorElement>;
  id?: string | null;
};

const menuItems = [
  {
    label: "Edit",
    icon: <EditIcon />,
    onClick: () => {},
  },
];
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
    <Link ref={ref} href={ROUTES.project.epics(id)}>
      <div className="bg-white p-6 rounded-lg min-h-55 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center">
            <h1 className="text-slate-dark font-medium text-lg">{title}</h1>
            <div
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <DropdownMenu href={ROUTES.project.edit(id)} items={menuItems} />
            </div>
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
    </Link>
  );
}
