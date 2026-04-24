import CompassIcon from "@/components/icons/compass-icon";
import FilesIcon from "@/components/icons/files-icon";
import PlusIcon from "@/components/icons/plus-icon";
import RulerIcon from "@/components/icons/ruler-icon";
import Button from "@/components/ui/button";
import { cn } from "@/lib/utils/tailwind-merge";
import Link from "next/link";
import { ReactNode } from "react";

type EmptyStateAction = {
  label: string;
  href: string;
  icon?: ReactNode;
};

type EmptyStateProps = {
  icon?: ReactNode;
  decoratorIconStart?: ReactNode;
  decoratorIconEnd?: ReactNode;
  heading?: string;
  description?: string;
  action?: EmptyStateAction;
  borderGradient?: string | null;
  cardBackground?: string;
  centralClassName?: string;
};

export default function EmptyState({
  icon = <CompassIcon />,
  decoratorIconStart = <FilesIcon />,
  decoratorIconEnd = <RulerIcon />,
  heading = "No Projects",
  description = `You don't have any projects yet. Start by defining your first
    architectural workspace to begin tracking tasks and epics.`,
  action = {
    label: "Create New Project",
    href: "/project/add",
    icon: <PlusIcon />,
  },
  borderGradient = "linear-gradient(to bottom right, #003D9B40, transparent)",
  cardBackground = "#f1f3ff",
  centralClassName,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div
        className="bg-surface-low min-w-[288px] h-72 rounded-lg relative flex items-center justify-center"
        style={{
          background: borderGradient
            ? `linear-gradient(${cardBackground}, ${cardBackground}) padding-box, ${borderGradient} border-box`
            : cardBackground,
          ...(borderGradient && {
            borderTop: "10px solid transparent",
            borderLeft: "10px solid transparent",
          }),
        }}
      >
        {/* Central icon */}
        <div
          className={cn(
            "bg-surface-highest  flex items-center justify-center rounded-xl drop-shadow-slate-dark/5 drop-shadow-xl",
            centralClassName
          )}
        >
          {icon}
        </div>

        {/* Top-right decorator */}
        {decoratorIconStart && (
          <div className="absolute bg-white h-12 w-12 rounded-sm flex items-center justify-center top-8 inset-e-8 -rotate-6">
            {decoratorIconStart}
          </div>
        )}

        {/* Bottom-left decorator */}
        {decoratorIconEnd && (
          <div className="absolute bg-white h-12 w-12 rounded-sm flex items-center justify-center bottom-8 inset-s-8 rotate-6">
            {decoratorIconEnd}
          </div>
        )}
      </div>

      {heading && <h3 className="font-semibold text-4xl mt-11">{heading}</h3>}

      {description && (
        <p className="leading-7 text-secondary max-w-108.5 text-lg text-center mt-4 mb-11">
          {description}
        </p>
      )}

      {action && (
        <Button className="px-8" iconClassName="me-3" leftIcon={action.icon}>
          <Link href={action.href}>{action.label}</Link>
        </Button>
      )}
    </div>
  );
}
