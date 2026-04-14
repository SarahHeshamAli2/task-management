import CheckIcon from "../icons/check-icon";

export default function SucessToast({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <div
      className={`bg-[#82F9BE33] text-[#005235] p-4 rounded-lg flex gap-3 ${className}`}
    >
      <span>
        <CheckIcon />
      </span>
      <span>{title}</span>
    </div>
  );
}
