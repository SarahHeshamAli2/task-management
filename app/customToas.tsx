// toast.jsx
import { toast } from "sonner";

const config = {
  success: {
    bg: "#0d2a18",
    border: "#1a4d2e",
    iconBg: "#1a4d2e",
    iconColor: "#4ade80",
    titleColor: "#86efac",
    descColor: "#4ade80",
    barColor: "bg-green-500",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#4ade80"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
  error: {
    bg: "#2a0d0d",
    border: "#4d1a1a",
    iconBg: "#4d1a1a",
    iconColor: "#f87171",
    titleColor: "#fca5a5",
    descColor: "#f87171",
    barColor: "bg-red-500",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#f87171"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12" y2="16" />
      </svg>
    ),
  },
  warning: {
    bg: "#2a1f0d",
    border: "#4d3a1a",
    iconBg: "#4d3a1a",
    iconColor: "#fbbf24",
    titleColor: "#fde68a",
    descColor: "#fbbf24",
    barColor: "bg-amber-400",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fbbf24"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12" y2="17" />
      </svg>
    ),
  },
  info: {
    bg: "#0d1a2a",
    border: "#1a3050",
    iconBg: "#1a3050",
    iconColor: "#60a5fa",
    titleColor: "#93c5fd",
    descColor: "#60a5fa",
    barColor: "bg-blue-500",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#60a5fa"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12" y2="8" />
      </svg>
    ),
  },
};

export function customToast(type, title, description) {
  const c = config[type];
  toast.custom(
    () => (
      <div
        className="flex items-start gap-3.5 px-[18px] py-4 rounded-2xl relative overflow-hidden w-[360px]"
        style={{ background: c.bg, border: `1px solid ${c.border}` }}
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: c.iconBg }}
        >
          {c.icon}
        </div>
        <div className="flex-1">
          <p
            className="m-0 mb-1 text-[15px] font-medium"
            style={{ color: c.titleColor }}
          >
            {title}
          </p>
          <p className="m-0 text-[13px]" style={{ color: c.descColor }}>
            {description}
          </p>
        </div>
        <button
          onClick={() => toast.dismiss()}
          className="w-7 h-7 rounded-lg flex items-center justify-center border border-white/15 bg-white/[0.08] cursor-pointer text-white/60 shrink-0 hover:bg-white/15 transition-colors"
        >
          ✕
        </button>
        <div
          className={`absolute bottom-0 left-0 h-[3px] rounded-r-sm ${c.barColor} animate-[shrink_4s_linear_forwards]`}
        />
      </div>
    ),
    { duration: 6000 }
  );
}
