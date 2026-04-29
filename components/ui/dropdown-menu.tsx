"use client";

import { useEffect, useRef, useState } from "react";
import MenuIcon from "@/components/icons/menu-icon";
import { useRouter } from "next/navigation";

export type DropdownMenuItem = {
  label: string;
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
};

type DropdownMenuProps = {
  items: DropdownMenuItem[];
  triggerClassName?: string;
  menuClassName?: string;
  href?: string;
  trigger?: React.ReactNode; // custom trigger
};

export default function DropdownMenu({
  items,
  triggerClassName = "",
  menuClassName = "",
  href,
  trigger,
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
      {trigger ? (
        <div
          onClick={() => setIsOpen((prev) => !prev)}
          className="cursor-pointer"
        >
          {trigger}
        </div>
      ) : (
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className={`flex items-center justify-center rounded hover:bg-gray-100 p-1 transition-colors ${triggerClassName}`}
          aria-label="Open menu"
        >
          <MenuIcon />
        </button>
      )}

      {isOpen && (
        <div
          className={`absolute start-0 top-full mt-1 z-50 bg-white border border-gray-200 rounded-md shadow-lg min-w-40 py-1 ${menuClassName}`}
        >
          {items.map((item, index) => (
            <div
              key={index}
              role="button"
              tabIndex={0}
              onClick={() => {
                setIsOpen(false);
                if (item.onClick) {
                  item.onClick();
                } else if (item.href) {
                  router.push(item.href);
                } else if (href) {
                  router.push(href);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setIsOpen(false);
                  if (item.onClick) {
                    item.onClick();
                  } else if (item.href ?? href) {
                    router.push((item.href ?? href)!);
                  }
                }
              }}
              className={`w-full text-start px-4 py-2 text-sm text-slate-700 hover:bg-gray-50 flex items-center gap-2 transition-colors cursor-pointer ${item.className ?? ""}`}
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
