import Link from "next/link";

type SharedInputProps = {
  label?: string;
  mobileLabel?: string;
  error?: string;
  className?: string;
  hint?: string;
  optional?: boolean;
  rightIcon?: React.ReactNode;
  iconClassName?: string;
  link?: string;
  href?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({
  label,
  mobileLabel,
  error,
  className = "",
  hint,
  optional,
  rightIcon,
  iconClassName,
  link,
  href,
  ...props
}: SharedInputProps) {
  return (
    <div className="flex flex-col gap-1 mt-6">
      {label && (
        <div className="flex items-center justify-between mb-1.5">
          <label
            className={`text-xs uppercase font-bold flex ${error ? "text-error" : "text-slate-container"}`}
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
          </label>

          {link && (
            <Link
              href={href ?? ""}
              className="text-primary text-xs font-bold  sm:hidden capitalize self-center ms-0.5"
            >
              {link}
            </Link>
          )}
        </div>
      )}

      <div className="relative">
        <input
          className={`w-full px-4 py-3.5 rounded-sm text-sm outline-none transition-colors 
          disabled:opacity-50 disabled:cursor-not-allowed
          ${rightIcon ? "pe-10" : ""}
          ${
            error
              ? "bg-input-error-light text-input-error"
              : "bg-surface-highest text-placeholder border-slate-300 focus:border-primary placeholder:text-placeholder"
          }
          ${className}`}
          {...props}
        />
        {rightIcon && (
          <div
            className={`absolute inset-y-0 inset-e-0 flex items-center pe-3 pointer-events-none text-placeholder ${iconClassName ?? ""}`}
          >
            {rightIcon}
          </div>
        )}
      </div>
      {hint && (
        <span className="text-xs font-normal mt-1.5 text-slate-light hidden md:block">
          {hint}
        </span>
      )}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
