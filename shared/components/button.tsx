import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const variants = {
  primary: "text-white bg-[linear-gradient(135deg,#003D9B,#0052CC)]",
  secondary: "text-primary",
  ghost: "text-slate-container",
};

const sizes = {
  sm: "h-8 px-3 text-xs",
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
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={twMerge(clsx(base, variants[variant], sizes[size], className))}
      {...props}
    />
  );
}
