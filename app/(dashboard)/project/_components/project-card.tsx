import CalendarIcon from "@/components/icons/calendar-icon";
import { formatDate } from "@/lib/utils/format-date";

type ProjectCardProps = {
  title: string;
  desc: string;
  createdAt: string;
};

export default function ProjectCard({
  title = `Skyline Residence Phase II`,
  desc = `Structural review and aesthetic
curation for the high-rise residential
complex in the downtown district`,
  createdAt = "12 Oct 2025",
}: ProjectCardProps) {
  return (
    <div className="bg-white  p-6 rounded-lg min-h-55 flex flex-col justify-between">
      <div>
        <h1 className="text-slate-dark font-medium text-lg">{title}</h1>
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
