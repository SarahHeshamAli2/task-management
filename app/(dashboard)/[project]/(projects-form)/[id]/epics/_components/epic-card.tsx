import CalendarIcon from "@/components/icons/calendar-icon";
import Modal from "@/components/shared/modal";
import Button from "@/components/ui/button";
import { formatDate } from "@/lib/utils/format-date";
import { getInitials } from "@/lib/utils/get-name-initials";
import { Ref, useState } from "react";
import EmptyTask from "./empty-task";
import DropdownMenu from "@/components/ui/dropdown-menu";
import CreatedByIcon from "@/components/icons/created-by-icon";
import EditIcon from "@/components/icons/edit-icon";
import UnassignedIcon from "@/components/icons/unassigned-icon";
import { ROUTES } from "@/lib/constants/routes.constants";

type EpicCardProps = {
  title: string;
  createdAt: string;
  ref?: Ref<HTMLDivElement>;
  id?: string | null;
  userName: string;
  createdBy: string;
  deadline: string;
  asigneeName: string;
  epicId: string;
};

export default function EpicCard({
  title = "Skyline Residence Phase II",
  createdAt = "12 Oct 2025",
  ref,
  id,
  createdBy,
  deadline,
  asigneeName,
  epicId,
}: EpicCardProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const menuItems = [
    {
      label: "Edit",
      icon: <EditIcon />,
    },
  ];

  return (
    <div
      ref={ref}
      className="bg-white p-6 rounded-lg min-h-55 flex flex-col justify-between border-[#004E32] md:border-s-4"
    >
      <div>
        {/* Header: ID badge + dropdown menu */}
        <div className="flex mb-4 justify-between">
          <span className="text-xs font-bold text-[#005235] bg-[#82F9BE] min-w-17 h-6 rounded-xs flex items-center justify-center tracking-wider">
            {id}
          </span>
          <DropdownMenu href={ROUTES.epics.edit(epicId)} items={menuItems} />
        </div>

        {/* Title + Modal */}
        <div className="flex justify-between items-center">
          <Button variant="ghost" onClick={() => setIsOpen((prev) => !prev)}>
            <h1 className="text-slate-dark font-medium text-lg">{title}</h1>
          </Button>

          <Modal
            size="2xl"
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            title={title}
            eyebrow={id}
          >
            <div className="grid md:grid-cols-3 grid-cols-2">
              <div>
                <p className="text-slate-dark/40 font-bold text-[10px] uppercase">
                  created by
                </p>
                <p className="flex items-center gap-2 text-slate-dark font-medium text-sm mt-2">
                  <span className="bg-primary-container text-white w-7 h-7 flex items-center justify-center rounded-xl">
                    {getInitials(createdBy)}
                  </span>
                  {createdBy}
                </p>
              </div>

              <div>
                <p className="text-slate-dark/40 font-bold text-[10px] uppercase">
                  Assignee
                </p>
                <p className="flex items-center gap-2 text-slate-dark font-medium text-sm mt-2">
                  {asigneeName ? (
                    <>
                      <span className="bg-primary-container text-white w-7 h-7 flex items-center justify-center rounded-xl">
                        {getInitials(asigneeName)}
                      </span>
                      <span>{asigneeName}</span>
                    </>
                  ) : (
                    <>
                      <UnassignedIcon />
                      <span>Unassigned</span>
                    </>
                  )}
                </p>
              </div>

              <div className="border-t col-span-2 md:col-span-1 pt-2 border-ocean mt-5 md:mt-0 md:border-0">
                <p className="text-slate-dark/40 font-bold text-[10px] uppercase">
                  Created At
                </p>
                <p className="flex items-center gap-2 text-slate-dark font-medium text-sm mt-2">
                  <CalendarIcon />
                  {formatDate(createdAt)}
                </p>
              </div>
            </div>

            <div className="mt-8 text-slate-dark flex justify-between items-center font-semibold">
              <p>Tasks</p>
              <Button
                className="text-primary"
                variant="ghost"
                leftIcon="+"
                iconClassName="me-1"
              >
                Add Task
              </Button>
            </div>
            <EmptyTask />
          </Modal>
        </div>

        {/* Assignee + Deadline */}
        <div className="flex items-center mt-3 justify-between mb-6">
          <div className="flex items-center gap-3">
            {asigneeName ? (
              <span className="md:w-10 md:h-10 h-7 w-7 bg-[#65DCA4] text-[#002113] font-bold flex items-center justify-center rounded-xl text-[10px] md:text-sm">
                {getInitials(asigneeName)}
              </span>
            ) : (
              <UnassignedIcon />
            )}
            {asigneeName ? (
              <div>
                <span className="text-secondary text-xs font-medium">
                  Assignee
                </span>
                <p className="text-slate-dark font-semibold text-sm">
                  {asigneeName}
                </p>
              </div>
            ) : (
              <div className="text-secondary text-xs font-medium">
                Unassigned
              </div>
            )}
          </div>

          <div className="sm:hidden">
            <span className="text-placeholder uppercase font-bold text-[10px]">
              deadline
            </span>
            <p className="text-slate-dark text-xs font-medium">
              {formatDate(deadline)}
            </p>
          </div>
        </div>
      </div>

      {/* Footer: Created by + Date (desktop only) */}
      <div className="justify-between items-center border-t border-surface-low pt-4 md:flex hidden">
        <span className="text-placeholder text-xs capitalize flex gap-2">
          <CreatedByIcon />
          created by:{" "}
          <span className="text-slate-dark font-semibold">{createdBy}</span>
        </span>
        <span className="text-secondary font-medium text-sm flex items-center gap-1.5">
          <CalendarIcon />
          {formatDate(createdAt)}
        </span>
      </div>
    </div>
  );
}
