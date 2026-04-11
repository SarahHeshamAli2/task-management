type SharedInputProps = {
  label?: string;
  error?: string;
  className?: string;
  hint?: string;
  optional?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({
  label,
  error,
  className = "",
  hint,
  optional,
  ...props
}: SharedInputProps) {
  return (
    <div className="flex flex-col gap-1 mt-6">
      {label && (
        <label className="text-xs uppercase font-bold text-slate-container">
          {label}
          {optional && (
            <span className="text-placeholder ms-0.5">(Optional)</span>
          )}
        </label>
      )}

      <input
        className={`w-full bg-surface-highest px-4 py-3.5 rounded-sm text-sm outline-none transition-colors
          border-slate-300 focus:border-primary placeholder:text-placeholder
          disabled:opacity-50 disabled:cursor-not-allowed text-placeholder
          ${error ? "border-red-500 focus:border-red-500" : ""}
          ${className}`}
        {...props}
      />
      {hint && (
        <span className="text-xs font-normal mt-1.5 text-slate-light">
          {hint}
        </span>
      )}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
