import Link from "next/link";

export default function FormFooter({
  title,
  link,
  href,
  className,
}: {
  title: string;
  link: string;
  href: string;
  className?: string;
}) {
  return (
    <div className={`flex gap-1 items-center justify-center ${className}`}>
      <p className="text-slate-container text-sm">{title}</p>
      <Link className="text-primary text-sm font-semibold" href={href}>
        {link}
      </Link>
    </div>
  );
}
