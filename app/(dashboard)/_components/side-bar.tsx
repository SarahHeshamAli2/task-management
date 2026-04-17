"use client";

import { cn } from "@/lib/utils/tailwind-merge";
import Button from "@/components/ui/button";
import LeftChevron from "@/components/icons/left-chevron";
import LogOutIcon from "@/components/icons/logout-icon";
import ProjectDetailsIcon from "@/components/icons/project-details-icon";
import ProjectEpicIcon from "@/components/icons/project-epic-icon";
import ProjectMemeberIcon from "@/components/icons/project-member-icon";
import ProjectTaskIcon from "@/components/icons/project-task-icon";
import ProjectIcon from "@/components/icons/projects-icon";
import RightChevron from "@/components/icons/right-chevron";
import Logo from "@/components/ui/logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLogout } from "@/lib/hooks/use-logout";

const STORAGE_KEY = "sidebar-collapsed";
const sidebarList = [
  {
    icon: <ProjectIcon />,
    title: "Projects",
    href: "/project",
    id: 1,
  },
  {
    icon: <ProjectEpicIcon />,
    title: "Project Epics",
    href: "/projects-epic",
    id: 2,
  },
  {
    icon: <ProjectTaskIcon />,
    title: "Project Tasks",
    href: "/projects-tasks",
    id: 3,
  },
  {
    icon: <ProjectMemeberIcon />,
    title: "Project Members",
    href: "/projects-member",
    id: 4,
  },
  {
    icon: <ProjectDetailsIcon />,
    title: "Project Details",
    href: "/projects-details",
    id: 5,
  },
];

export default function SideBar() {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(STORAGE_KEY) === "true";
  });
  const pathname = usePathname();

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(isCollapsed));
  }, [isCollapsed]);

  const { handleLogout } = useLogout();
  return (
    <aside
      className={cn(
        "transition-all duration-300 bg-surface-low px-4 flex flex-col justify-between",
        isCollapsed ? "w-20" : "w-[16rem]"
      )}
    >
      <div>
        {!isCollapsed && <Logo className="mt-4 mb-8" />}

        <ul>
          {sidebarList.map((li) => {
            const isActive = pathname === li.href;

            return (
              <li key={li.id}>
                <Link
                  href={li.href}
                  className={cn(
                    "flex gap-3 my-1 font-medium min-w-10 min-h-10  items-center px-2 rounded-sm transition-colors",
                    isActive
                      ? "bg-white text-primary shadow-sm"
                      : "text-slate-dark hover:bg-slate-100"
                  )}
                >
                  <span
                    className={cn(
                      isCollapsed &&
                        "h-12 w-12 flex  items-center justify-center"
                    )}
                  >
                    {li.icon}
                  </span>

                  {!isCollapsed && <span>{li.title}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex flex-col border-t border-slate-light/20 pt-6 pb-4">
        <Button
          onClick={() => setIsCollapsed((prev) => !prev)}
          iconClassName="me-3"
          leftIcon={!isCollapsed && <LeftChevron />}
          variant="ghost"
          className="justify-start"
        >
          {isCollapsed ? <RightChevron /> : "Collapse"}
        </Button>
        <Button
          onClick={handleLogout}
          iconClassName="me-3"
          leftIcon={!isCollapsed && <LogOutIcon />}
          variant="ghost"
          className="justify-start text-error"
        >
          {isCollapsed ? <LogOutIcon /> : "Log out"}
        </Button>
      </div>
    </aside>
  );
}
