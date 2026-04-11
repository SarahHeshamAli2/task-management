type SharedTitleProps = { title: string; subtitle: string; className?: string };

export default function SharedTitle({
  title,
  subtitle,
  className,
}: SharedTitleProps) {
  return (
    <div className={className}>
      <h1 className="font-semibold text-3xl text-slate-dark">{title}</h1>
      <p className="text-sm text-slate-container mt-2">{subtitle}</p>
    </div>
  );
}
