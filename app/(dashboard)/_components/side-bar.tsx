"use client";

import { cn } from "@/lib/utils/tailwind-merge";
import Button from "@/components/ui/button";
import LeftChevron from "@/components/icons/left-chevron";
import LogOutIcon from "@/components/icons/logout-icon";
import RightChevron from "@/components/icons/right-chevron";
import Logo from "@/components/ui/logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLogout } from "@/lib/hooks/use-logout";
import { useSidebarCollapsed } from "../context/sidebar-context";
import { tabsList } from "@/lib/constants/dashboard.constants";

function SidebarContent({
  isCollapsed,
  toggle,
}: {
  isCollapsed: boolean;
  toggle: () => void;
}) {
  const pathname = usePathname();
  const { handleLogout } = useLogout();

  return (
    <aside className="h-full bg-surface-low px-4 flex flex-col justify-between">
      <div>
        {!isCollapsed && <Logo className="mt-4 mb-8" />}

        <ul>
          {tabsList.map((li) => {
            const isActive = pathname === li.href;
            return (
              <li key={li.id}>
                <Link
                  href={li.href}
                  className={cn(
                    "flex gap-3 my-1 font-medium min-w-10 min-h-10 items-center px-2 rounded-sm transition-colors",
                    isActive
                      ? "bg-white text-primary shadow-sm"
                      : "text-slate-dark hover:bg-slate-100",
                    isCollapsed && !isActive && "text-[#041B3C99]",
                    isCollapsed && "mt-6"
                  )}
                >
                  <span
                    className={cn(
                      isCollapsed &&
                        "h-12 w-12 flex items-center justify-center"
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
        {/* Collapse button — desktop only */}
        <Button
          onClick={toggle}
          iconClassName="me-3"
          leftIcon={!isCollapsed && <LeftChevron />}
          variant="ghost"
          className="justify-start hidden md:flex"
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

export default function SideBar() {
  const { isCollapsed, toggle } = useSidebarCollapsed();

  return (
    <>
      {/* ── Desktop: always in flow, collapsible ── */}
      <div
        className={cn(
          "hidden md:block shrink-0 transition-all duration-300",
          isCollapsed ? "w-20" : "w-[16rem]"
        )}
      >
        <SidebarContent isCollapsed={isCollapsed} toggle={toggle} />
      </div>

      {/* ── Mobile: drawer overlay ── */}
      <div
        className={cn(
          "md:hidden fixed inset-0 z-40 transition-all duration-300",
          isCollapsed ? "pointer-events-none" : "pointer-events-auto"
        )}
      >
        {/* Backdrop */}
        <div
          onClick={toggle}
          className={cn(
            "absolute inset-0 bg-black/40 transition-opacity duration-300",
            isCollapsed ? "opacity-0" : "opacity-100"
          )}
        />

        {/* Drawer panel — always full, never icon-only on mobile */}
        <div
          className={cn(
            "absolute left-0 top-0 h-full w-[16rem] transition-transform duration-300 shadow-xl",
            isCollapsed ? "-translate-x-full" : "translate-x-0"
          )}
        >
          <SidebarContent isCollapsed={false} toggle={toggle} />
        </div>
      </div>
    </>
  );
}
