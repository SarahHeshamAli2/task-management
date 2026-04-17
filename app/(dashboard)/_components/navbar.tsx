"use client";
import { cn } from "@/lib/utils/tailwind-merge";
import { useSidebarCollapsed } from "../context/sidebar-context";
import UserInfo from "./user-info";
import Logo from "@/components/ui/logo";

export default function Navbar() {
  const { isCollapsed } = useSidebarCollapsed();

  return (
    <div
      className={cn(
        "bg-background w-full border-b  border-[#0000001A] min-h-16 flex justify-between",
        !isCollapsed && "justify-end"
      )}
    >
      {isCollapsed && <Logo />}
      <UserInfo />
    </div>
  );
}
