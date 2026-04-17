import Button from "@/components/ui/button";
import Link from "next/link";

type HeaderProps = {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  linkHref?: string;
  leftIcon?: string | React.ReactElement;
};

export default function Header({
  title,
  subtitle,
  buttonText,
  linkHref,
  leftIcon,
}: HeaderProps) {
  return (
    <div className="flex items-center justify-between mb-10">
      <div>
        <h3 className="font-semibold text-3xl">{title}</h3>
        <p className="text-secondary mt-1">{subtitle}</p>
      </div>
      <Button iconClassName="me-2" leftIcon={leftIcon} className="rounded-xs">
        <Link href={linkHref ?? ""}>{buttonText}</Link>
      </Button>
    </div>
  );
}
