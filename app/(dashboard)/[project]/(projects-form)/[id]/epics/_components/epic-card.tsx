"use client";

import CalendarIcon from "@/components/icons/calendar-icon";
import MenuIcon from "@/components/icons/menu-icon";
import Modal from "@/components/shared/modal";
import Button from "@/components/ui/button";
import { formatDate } from "@/lib/utils/format-date";
import { getInitials } from "@/lib/utils/get-name-initials";
import { Ref, useState } from "react";
import EmptyTask from "./empty-task";

type EpicCardProps = {
  title: string;
  createdAt: string;
  ref?: Ref<HTMLDivElement>;
  id?: string | null;
  userName: string;
  createdBy: string;
  deadline: string;
  asigneeName: string;
};

export default function EpicCard({
  title = `Skyline Residence Phase II`,
  createdAt = "12 Oct 2025",
  ref,
  id,
  createdBy,
  deadline,
  asigneeName,
}: EpicCardProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div
      ref={ref}
      className="bg-white p-6 rounded-lg min-h-55 flex flex-col justify-between  border-[#004E32] md:border-s-4"
    >
      <div>
        <div className="flex mb-4 justify-between">
          <span className="text-xs font-bold text-[#005235] bg-[#82F9BE] min-w-17 h-6 rounded-xs flex items-center justify-center tracking-wider">
            {id}
          </span>
          <MenuIcon />
        </div>
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
                      <span> {asigneeName}</span>
                    </>
                  ) : (
                    <>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.7333 11.5646L9.20208 10.0333H1.53125V8.4C1.53125 8.06944 1.61632 7.76562 1.78646 7.48854C1.9566 7.21146 2.18264 7 2.46458 6.85417C2.90208 6.63056 3.34687 6.45069 3.79896 6.31458C4.25104 6.17847 4.71042 6.07639 5.17708 6.00833L0 0.83125L0.83125 0L11.5646 10.7333L10.7333 11.5646ZM2.69792 8.86667H8.03542L6.28542 7.11667C6.26597 7.11667 6.25139 7.11667 6.24167 7.11667C6.23194 7.11667 6.21736 7.11667 6.19792 7.11667C5.65347 7.11667 5.11389 7.18229 4.57917 7.31354C4.04444 7.44479 3.51458 7.64167 2.98958 7.90417C2.90208 7.95278 2.8316 8.02083 2.77813 8.10833C2.72465 8.19583 2.69792 8.29306 2.69792 8.4V8.86667ZM9.93125 6.85417C10.2132 6.99028 10.4368 7.19688 10.6021 7.47396C10.7674 7.75104 10.8549 8.05 10.8646 8.37083L8.91042 6.41667C9.08542 6.48472 9.25799 6.55278 9.42813 6.62083C9.59826 6.68889 9.76597 6.76667 9.93125 6.85417ZM7.48125 4.9875L6.62083 4.12708C6.84444 4.03958 7.02431 3.89618 7.16042 3.69688C7.29653 3.49757 7.36458 3.27639 7.36458 3.03333C7.36458 2.7125 7.25035 2.43785 7.02187 2.20937C6.7934 1.9809 6.51875 1.86667 6.19792 1.86667C5.95486 1.86667 5.73368 1.93472 5.53438 2.07083C5.33507 2.20694 5.19167 2.38681 5.10417 2.61042L4.24375 1.75C4.46736 1.41944 4.74931 1.16181 5.08958 0.977083C5.42986 0.792361 5.79931 0.7 6.19792 0.7C6.83958 0.7 7.38889 0.928472 7.84583 1.38542C8.30278 1.84236 8.53125 2.39167 8.53125 3.03333C8.53125 3.43194 8.43889 3.80139 8.25417 4.14167C8.06944 4.48194 7.81181 4.76389 7.48125 4.9875ZM8.03542 8.86667H2.69792C2.69792 8.86667 2.72465 8.86667 2.77813 8.86667C2.8316 8.86667 2.90208 8.86667 2.98958 8.86667C3.25208 8.86667 3.52431 8.86667 3.80625 8.86667C4.08819 8.86667 4.42118 8.86667 4.80521 8.86667C5.18924 8.86667 5.64132 8.86667 6.16146 8.86667C6.6816 8.86667 7.30625 8.86667 8.03542 8.86667Z"
                          fill="#4F5F7B"
                        />
                      </svg>

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

            <div className="mt-8 text-slate-dark flex justify-between items-center font-semibold  ">
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

        <div className="flex items-center mt-3 justify-between mb-6">
          <div className="flex items-center gap-3">
            {asigneeName ? (
              <span className="md:w-10 md:h-10 h-7 w-7 bg-[#65DCA4] text-[#002113] font-bold flex items-center justify-center rounded-xl text-[10px] md:text-sm">
                {getInitials(asigneeName)}
              </span>
            ) : (
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.7333 11.5646L9.20208 10.0333H1.53125V8.4C1.53125 8.06944 1.61632 7.76562 1.78646 7.48854C1.9566 7.21146 2.18264 7 2.46458 6.85417C2.90208 6.63056 3.34687 6.45069 3.79896 6.31458C4.25104 6.17847 4.71042 6.07639 5.17708 6.00833L0 0.83125L0.83125 0L11.5646 10.7333L10.7333 11.5646ZM2.69792 8.86667H8.03542L6.28542 7.11667C6.26597 7.11667 6.25139 7.11667 6.24167 7.11667C6.23194 7.11667 6.21736 7.11667 6.19792 7.11667C5.65347 7.11667 5.11389 7.18229 4.57917 7.31354C4.04444 7.44479 3.51458 7.64167 2.98958 7.90417C2.90208 7.95278 2.8316 8.02083 2.77813 8.10833C2.72465 8.19583 2.69792 8.29306 2.69792 8.4V8.86667ZM9.93125 6.85417C10.2132 6.99028 10.4368 7.19688 10.6021 7.47396C10.7674 7.75104 10.8549 8.05 10.8646 8.37083L8.91042 6.41667C9.08542 6.48472 9.25799 6.55278 9.42813 6.62083C9.59826 6.68889 9.76597 6.76667 9.93125 6.85417ZM7.48125 4.9875L6.62083 4.12708C6.84444 4.03958 7.02431 3.89618 7.16042 3.69688C7.29653 3.49757 7.36458 3.27639 7.36458 3.03333C7.36458 2.7125 7.25035 2.43785 7.02187 2.20937C6.7934 1.9809 6.51875 1.86667 6.19792 1.86667C5.95486 1.86667 5.73368 1.93472 5.53438 2.07083C5.33507 2.20694 5.19167 2.38681 5.10417 2.61042L4.24375 1.75C4.46736 1.41944 4.74931 1.16181 5.08958 0.977083C5.42986 0.792361 5.79931 0.7 6.19792 0.7C6.83958 0.7 7.38889 0.928472 7.84583 1.38542C8.30278 1.84236 8.53125 2.39167 8.53125 3.03333C8.53125 3.43194 8.43889 3.80139 8.25417 4.14167C8.06944 4.48194 7.81181 4.76389 7.48125 4.9875ZM8.03542 8.86667H2.69792C2.69792 8.86667 2.72465 8.86667 2.77813 8.86667C2.8316 8.86667 2.90208 8.86667 2.98958 8.86667C3.25208 8.86667 3.52431 8.86667 3.80625 8.86667C4.08819 8.86667 4.42118 8.86667 4.80521 8.86667C5.18924 8.86667 5.64132 8.86667 6.16146 8.86667C6.6816 8.86667 7.30625 8.86667 8.03542 8.86667Z"
                  fill="#4F5F7B"
                />
              </svg>
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
      <div className="justify-between items-center border-t border-surface-low pt-4 md:flex hidden">
        <span className="text-placeholder text-xs capitalize flex gap-2">
          <svg
            width="12"
            height="10"
            viewBox="0 0 12 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 9.33333V7.7C0 7.36944 0.0850694 7.06563 0.255208 6.78854C0.425347 6.51146 0.651389 6.3 0.933333 6.15417C1.53611 5.85278 2.14861 5.62674 2.77083 5.47604C3.39306 5.32535 4.025 5.25 4.66667 5.25C5.02639 5.25 5.38125 5.27188 5.73125 5.31563C6.08125 5.35938 6.43125 5.42986 6.78125 5.52708L5.80417 6.51875C5.60972 6.48958 5.42014 6.46528 5.23542 6.44583C5.05069 6.42639 4.86111 6.41667 4.66667 6.41667C4.12222 6.41667 3.58264 6.48229 3.04792 6.61354C2.51319 6.74479 1.98333 6.94167 1.45833 7.20417C1.37083 7.25278 1.30035 7.32083 1.24688 7.40833C1.1934 7.49583 1.16667 7.59306 1.16667 7.7V8.16667H4.66667V9.33333H0ZM5.83333 9.91667V8.12292L9.05625 4.91458C9.14375 4.82708 9.24097 4.76389 9.34792 4.725C9.45486 4.68611 9.56181 4.66667 9.66875 4.66667C9.78542 4.66667 9.89722 4.68854 10.0042 4.73229C10.1111 4.77604 10.2083 4.84167 10.2958 4.92917L10.8354 5.46875C10.9132 5.55625 10.974 5.65347 11.0177 5.76042C11.0615 5.86736 11.0833 5.97431 11.0833 6.08125C11.0833 6.18819 11.0639 6.29757 11.025 6.40938C10.9861 6.52118 10.9229 6.62083 10.8354 6.70833L7.62708 9.91667H5.83333ZM10.2083 6.08125L9.66875 5.54167L10.2083 6.08125ZM6.70833 9.04167H7.2625L9.02708 7.2625L8.76458 6.98542L8.4875 6.72292L6.70833 8.4875V9.04167ZM8.76458 6.98542L8.4875 6.72292L9.02708 7.2625L8.76458 6.98542ZM4.66667 4.66667C4.025 4.66667 3.47569 4.43819 3.01875 3.98125C2.56181 3.52431 2.33333 2.975 2.33333 2.33333C2.33333 1.69167 2.56181 1.14236 3.01875 0.685417C3.47569 0.228472 4.025 0 4.66667 0C5.30833 0 5.85764 0.228472 6.31458 0.685417C6.77153 1.14236 7 1.69167 7 2.33333C7 2.975 6.77153 3.52431 6.31458 3.98125C5.85764 4.43819 5.30833 4.66667 4.66667 4.66667ZM4.66667 3.5C4.9875 3.5 5.26215 3.38576 5.49062 3.15729C5.7191 2.92882 5.83333 2.65417 5.83333 2.33333C5.83333 2.0125 5.7191 1.73785 5.49062 1.50937C5.26215 1.2809 4.9875 1.16667 4.66667 1.16667C4.34583 1.16667 4.07118 1.2809 3.84271 1.50937C3.61424 1.73785 3.5 2.0125 3.5 2.33333C3.5 2.65417 3.61424 2.92882 3.84271 3.15729C4.07118 3.38576 4.34583 3.5 4.66667 3.5Z"
              fill="#434654"
              fillOpacity="0.8"
            />
          </svg>
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
