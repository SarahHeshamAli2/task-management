"use client";
import { cn } from "@/lib/utils/tailwind-merge";
import { useSidebarCollapsed } from "../context/sidebar-context";
import UserInfo from "./user-info";
import Logo from "@/components/ui/logo";

export default function Navbar() {
  const { isCollapsed, toggle } = useSidebarCollapsed();

  return (
    <div
      className={cn(
        "bg-background w-full border-b px-6 border-[#0000001A] min-h-16 flex justify-between",
        !isCollapsed && "justify-end",
      )}
    >
      {isCollapsed && (
        <div className="flex gap-4">
          <button onClick={toggle} className="md:hidden">
            ☰
          </button>
          <Logo />
        </div>
      )}
      <UserInfo />
    </div>
  );
}
