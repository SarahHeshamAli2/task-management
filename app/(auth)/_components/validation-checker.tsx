export type ValidationRule = {
  id: string;
  label: string;
  test: (v: string) => boolean;
};

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="8.25" stroke="#004E32" strokeWidth="1.5" />
    <path
      d="M5.5 9l2.5 2.5 4.5-5"
      stroke="#004E32"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function ValidationChecker({
  password = "",
  rules,
  layout = "list",
  title,
  className,
}: {
  password: string;
  rules: ValidationRule[];
  layout?: "list" | "grid";
  className?: string;
  title?: string;
}) {
  const containerClass =
    layout === "grid"
      ? "grid grid-cols-2 gap-x-4 gap-y-2"
      : "flex flex-col gap-2";

  return (
    <div className={`rounded-lg bg-ocean mt-6 p-4 ${className}`}>
      {title && (
        <h2 className="text-placeholder font-bold text-xs pb-2 border-b border-[#C3C6D633] mb-4 uppercase">
          {title}
        </h2>
      )}
      <div className={containerClass}>
        {rules?.map(({ id, label, test }) => {
          const met = test(password);
          return (
            <div key={id} className="flex items-center gap-2.5 text-sm">
              {met ? (
                <CheckIcon />
              ) : (
                <div className="w-3 h-3 rounded-full border-2 border-placeholder shrink-0" />
              )}
              <span className="text-secondary">{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
