type SharedTitleProps = {
  title: string;
  subtitle: React.ReactElement | string;
  className?: string;
  titleClassName?: string;
};

export default function SharedTitle({
  title,
  subtitle,
  className,
  titleClassName,
}: SharedTitleProps) {
  return (
    <div className={className}>
      <h1
        className={`font-semibold text-3xl text-slate-dark ${titleClassName}`}
      >
        {title}
      </h1>
      <p className="text-sm text-slate-container mt-2">{subtitle}</p>
    </div>
  );
}
