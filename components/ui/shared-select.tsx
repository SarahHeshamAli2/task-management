import { cn } from "@/lib/utils/tailwind-merge";
import Link from "next/link";
import ChevronDown from "../icons/chevron-down";

type SelectOption = {
  value: string;
  label: string;
};

type SharedSelectProps = {
  label?: string;
  mobileLabel?: string;
  error?: string;
  className?: string;
  hint?: string;
  optional?: boolean;
  iconClassName?: string;
  link?: string;
  href?: string;
  errorIcon?: string | React.ReactElement;
  isRequired?: boolean;
  options?: SelectOption[];
  placeholder?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export default function Select({
  label,
  mobileLabel,
  error,
  className = "",
  hint,
  optional,
  iconClassName,
  link,
  href,
  errorIcon,
  isRequired,
  options = [],
  placeholder,
  ...props
}: SharedSelectProps) {
  return (
    <div className="flex flex-col gap-1 mt-6">
      {label && (
        <div className="flex items-center justify-between mb-1.5">
          <label
            className={cn(
              "text-xs uppercase font-bold flex",
              error ? "text-error" : "text-slate-container"
            )}
          >
            {mobileLabel && <span className="md:hidden">{mobileLabel}</span>}
            <span className={mobileLabel ? "hidden md:inline" : ""}>
              {label}
            </span>{" "}
            {optional && (
              <span className="text-placeholder ms-0.5 hidden md:block">
                (Optional)
              </span>
            )}
            {isRequired && <span className="text-error ms-">*</span>}
          </label>

          {link && (
            <Link
              href={href ?? ""}
              className="text-primary text-xs font-bold sm:hidden capitalize self-center ms-0.5"
            >
              {link}
            </Link>
          )}
        </div>
      )}

      <div className="relative">
        <select
          defaultValue={""}
          className={cn(
            "w-full px-4 py-3.5 pe-10 rounded-sm text-sm outline-none transition-colors appearance-none cursor-pointer",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error
              ? "bg-input-error-light text-input-error"
              : "bg-surface-highest text-placeholder border-slate-300 focus:border-primary",
            !props.value && "text-placeholder",
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option
              className="bg-ocean text-slate-dark"
              key={opt.value}
              value={opt.value}
            >
              {opt.label}
            </option>
          ))}
        </select>

        {/* Chevron icon replacing rightIcon */}
        <div
          className={cn(
            "absolute inset-y-0 inset-e-0 flex items-center pe-3 pointer-events-none text-placeholder",
            iconClassName
          )}
        >
          <ChevronDown />
        </div>
      </div>

      {hint && (
        <span className="text-xs font-normal mt-1.5 text-slate-light hidden md:block">
          {hint}
        </span>
      )}
      {error && (
        <p className="text-xs text-error font-medium flex">
          <span className="me-1.5">{errorIcon && errorIcon}</span>
          {error}
        </p>
      )}
    </div>
  );
}
