import ChevronDown from "@/components/icons/chevron-down";
import Button from "@/components/ui/button";
import DropdownMenu from "@/components/ui/dropdown-menu";
import Input from "@/components/ui/shared-input";
import { cn } from "@/lib/utils/tailwind-merge";
import Link from "next/link";

export type ViewOption = {
  label: string;
  value: string;
  icon?: React.ReactNode;
};

type HeaderProps = {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  linkHref?: string;
  leftIcon?: string | React.ReactElement;
  className?: string;
  buttonClassName?: string;
  titleClassName?: string;

  // search props
  showSearch?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;

  // view dropdown props
  viewOptions?: ViewOption[];
  selectedView?: string;
  onViewChange?: (value: string) => void;
};

export default function Header({
  title,
  subtitle,
  buttonText,
  linkHref,
  leftIcon,
  className,
  buttonClassName,
  showSearch,
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search...",
  titleClassName,
  viewOptions,
  selectedView,
  onViewChange,
}: HeaderProps) {
  const currentView =
    viewOptions?.find((v) => v.value === selectedView) ?? viewOptions?.[0];

  return (
    <div
      className={cn("md:flex items-center justify-between mb-10", className)}
    >
      <div className={cn(titleClassName)}>
        <h3 className="font-semibold text-3xl">{title}</h3>
        <p className="text-secondary mt-1 max-w-lg">{subtitle}</p>
      </div>

      <div className="md:flex items-center gap-3">
        {showSearch && (
          <Input
            className="mt-0"
            type="text"
            value={searchValue}
            leftIcon={
              <svg
                width="11"
                height="11"
                viewBox="0 0 11 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.68333 10.5L6.00833 6.825C5.71667 7.05833 5.38125 7.24306 5.00208 7.37917C4.62292 7.51528 4.21944 7.58333 3.79167 7.58333C2.73194 7.58333 1.83507 7.21632 1.10104 6.48229C0.367014 5.74826 0 4.85139 0 3.79167C0 2.73194 0.367014 1.83507 1.10104 1.10104C1.83507 0.367014 2.73194 0 3.79167 0C4.85139 0 5.74826 0.367014 6.48229 1.10104C7.21632 1.83507 7.58333 2.73194 7.58333 3.79167C7.58333 4.21944 7.51528 4.62292 7.37917 5.00208C7.24306 5.38125 7.05833 5.71667 6.825 6.00833L10.5 9.68333L9.68333 10.5ZM3.79167 6.41667C4.52083 6.41667 5.14062 6.16146 5.65104 5.65104C6.16146 5.14062 6.41667 4.52083 6.41667 3.79167C6.41667 3.0625 6.16146 2.44271 5.65104 1.93229C5.14062 1.42188 4.52083 1.16667 3.79167 1.16667C3.0625 1.16667 2.44271 1.42188 1.93229 1.93229C1.42188 2.44271 1.16667 3.0625 1.16667 3.79167C1.16667 4.52083 1.42188 5.14062 1.93229 5.65104C2.44271 6.16146 3.0625 6.41667 3.79167 6.41667Z"
                  fill="#737685"
                />
              </svg>
            }
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder={searchPlaceholder}
          />
        )}

        {/* Only renders if viewOptions are passed */}
        {viewOptions && viewOptions.length > 0 && currentView && (
          <DropdownMenu
            trigger={
              <Button
                variant="ghost"
                className="bg-white px-6 text-black flex gap-3  "
              >
                {currentView.icon}
                {currentView.label}
                <ChevronDown />
              </Button>
            }
            items={viewOptions.map((opt) => ({
              label: opt.label,
              icon: opt.icon,
              onClick: () => onViewChange?.(opt.value),
            }))}
          />
        )}

        {buttonText && (
          <Button
            iconClassName="me-2"
            leftIcon={leftIcon}
            className={cn("rounded-xs", buttonClassName)}
          >
            <Link href={linkHref ?? ""}>{buttonText}</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
