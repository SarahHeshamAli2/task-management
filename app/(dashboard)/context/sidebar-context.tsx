"use client";
import { createContext, useContext, useState } from "react";

const STORAGE_KEY = "sidebar-collapsed";

const SidebarContext = createContext<{
  isCollapsed: boolean;
  toggle: () => void;
  activeProjectId: string | null;
  setActiveProjectId: (id: string | null) => void;
} | null>(null);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window === "undefined") return true;

    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? stored === "true" : true;
  });
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  const toggle = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });
  };

  return (
    <SidebarContext.Provider
      value={{ isCollapsed, toggle, activeProjectId, setActiveProjectId }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebarCollapsed() {
  const ctx = useContext(SidebarContext);
  if (!ctx)
    throw new Error("useSidebarCollapsed must be used within SidebarProvider");
  return ctx;
}
