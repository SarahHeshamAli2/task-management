"use client";

import { useEffect, useRef, useState } from "react";
import MenuIcon from "@/components/icons/menu-icon";
import { useRouter } from "next/navigation";

export type DropdownMenuItem = {
  label: string;
  icon?: React.ReactNode;
  className?: string;
};

type DropdownMenuProps = {
  items: DropdownMenuItem[];
  triggerClassName?: string;
  menuClassName?: string;
  href: string;
};

export default function DropdownMenu({
  items,
  triggerClassName = "",
  menuClassName = "",
  href,
}: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex items-center justify-center rounded hover:bg-gray-100 p-1 transition-colors ${triggerClassName}`}
        aria-label="Open menu"
      >
        <MenuIcon />
      </button>

      {isOpen && (
        <div
          className={`absolute right-0 top-full mt-1 z-50 bg-white border border-gray-200 rounded-md shadow-lg min-w-30 py-1 ${menuClassName}`}
        >
          {items.map((item, index) => (
            <div
              key={index}
              role="link"
              tabIndex={0}
              onClick={() => {
                setIsOpen(false);
                router.push(href);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setIsOpen(false);
                  router.push(href);
                }
              }}
              className={`w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-gray-50 flex items-center gap-2 transition-colors cursor-pointer ${item.className ?? ""}`}
            >
              {item.icon}
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
