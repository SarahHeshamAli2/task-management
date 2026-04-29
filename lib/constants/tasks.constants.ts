export const STATUS_VALUES = [
  {
    label: "to do",
    value: "TO_DO",
  },
  {
    label: "in progress",
    value: "IN_PROGRESS",
  },
  {
    label: "blocked",
    value: "BLOCKED",
  },
  {
    label: "in review",
    value: "IN_REVIEW",
  },
  {
    label: "ready for QA",
    value: "READY_FOR_QA",
  },
  {
    label: "re opened",
    value: "REOPENED",
  },
  {
    label: "ready for production",
    value: "READY_FOR_PRODUCTION",
  },
  {
    label: "done",
    value: "DONE",
  },
];

export const STATUS_CONFIG: Record<
  string,
  { label: string; badge: string; text: string }
> = {
  TO_DO: {
    label: "To Do",
    badge: "bg-surface-highest",
    text: "text-secondary",
  },
  IN_PROGRESS: {
    label: "In Progress",
    badge: "bg-[#CDDDFF]",
    text: "text-secondary",
  },
  REVIEW: {
    label: "Review",
    badge: "bg-purple-100",
    text: "text-purple-600",
  },
  BLOCKED: {
    label: "Blocked",
    badge: "bg-red-100",
    text: "text-red-500",
  },
  DONE: {
    label: "Done",
    badge: "bg-success",
    text: "text-[#002113]",
  },
};
