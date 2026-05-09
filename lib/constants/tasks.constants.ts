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

export const STATUS_CONFIG_STATS: Record<
  string,
  { label: string; badge: string; text: string }
> = {
  TO_DO: {
    label: "To Do",
    badge: "bg-[#C3C6D61A]",
    text: "text-secondary",
  },
  IN_PROGRESS: {
    label: "In Progress",
    badge: "bg-[#0052CC1A]",
    text: "text-primary",
  },
  IN_REVIEW: {
    label: "In Review",
    badge: "bg-[#0052CC1A]",
    text: "text-primary",
  },
  READY_FOR_QA: {
    label: "Ready for QA",
    badge: "bg-[#0052CC1A]",
    text: "text-primary",
  },
  READY_FOR_PRODUCTION: {
    label: "Ready for Production",
    badge: "bg-[#0052CC1A]",
    text: "text-primary",
  },
  REOPENED: {
    label: "Re Opened",
    badge: "bg-[#FFDAD61A]",
    text: "text-error",
  },
  BLOCKED: {
    label: "Blocked",
    badge: "bg-[#FFDAD61A]",
    text: "text-error",
  },
  DONE: {
    label: "Done",
    badge: "bg-[#0068441A]",
    text: "text-[#004E32]",
  },
};
