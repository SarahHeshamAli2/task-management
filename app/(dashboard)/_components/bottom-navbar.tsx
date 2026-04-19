"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/tailwind-merge";
import { tabsList } from "@/lib/constants/dashboard.constants";

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-surface-low py-3.5 flex">
      {tabsList.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "flex flex-col items-center justify-center flex-1 py-2 text-xs gap-1 transition-colors",
              isActive ? "text-primary" : "text-slate-dark/70"
            )}
          >
            {tab.icon}
          </Link>
        );
      })}
    </nav>
  );
}
