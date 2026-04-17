"use client";
import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "sidebar-collapsed";

const SidebarContext = createContext<{
  isCollapsed: boolean;
  toggle: () => void;
} | null>(null);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(STORAGE_KEY) === "true";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(isCollapsed));
  }, [isCollapsed]);

  const toggle = () => setIsCollapsed((prev) => !prev);

  return (
    <SidebarContext.Provider value={{ isCollapsed, toggle }}>
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
