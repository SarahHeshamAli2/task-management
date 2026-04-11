const variants = {
  primary: "text-white",
  secondary: " text-primary",
  ghost: "text-slate-container",
};
const gradients: Partial<Record<keyof typeof variants, React.CSSProperties>> = {
  primary: { background: "linear-gradient(135deg, #003D9B, #0052CC)" },
};
const sizes = {
  sm: "h-8 px-3 text-sm",
  md: "h-12 px-4 text-sm",
  lg: "h-14 px-6 text-base",
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

const base =
  "inline-flex cursor-pointer items-center justify-center rounded-sm font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none";

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      style={gradients[variant]}
      {...props}
    />
  );
}
