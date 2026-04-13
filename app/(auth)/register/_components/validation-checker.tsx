const rules = [
  {
    id: "length",
    label: "At least 8 characters",
    test: (v: string) => v.length >= 8,
  },
  {
    id: "case",
    label: "One uppercase, lowercase, and digit",
    test: (v: string) => /[A-Z]/.test(v) && /[a-z]/.test(v) && /\d/.test(v),
  },
  {
    id: "special",
    label: "One special character",
    test: (v: string) => /[^A-Za-z0-9]/.test(v),
  },
];
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
  password,
  className,
}: {
  password: string;
  className?: string;
}) {
  return (
    <div className={`rounded-lg bg-ocean mt-6 p-4 ${className}`}>
      {rules.map(({ id, label, test }) => {
        const met = test(password);
        return (
          <div key={id} className="flex items-center gap-2.5 text-sm mt-2">
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
  );
}
