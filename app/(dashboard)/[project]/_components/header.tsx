import Button from "@/components/ui/button";
import { cn } from "@/lib/utils/tailwind-merge";
import Link from "next/link";

type HeaderProps = {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  linkHref?: string;
  leftIcon?: string | React.ReactElement;
  className?: string;
  buttonClassName?: string;
};

export default function Header({
  title,
  subtitle,
  buttonText,
  linkHref,
  leftIcon,
  className,
  buttonClassName,
}: HeaderProps) {
  return (
    <div className={cn("flex items-center justify-between mb-10", className)}>
      <div>
        <h3 className="font-semibold text-3xl">{title}</h3>
        <p className="text-secondary mt-1 max-w-lg">{subtitle}</p>
      </div>
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
  );
}
