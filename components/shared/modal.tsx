"use client";

import { useEffect, useRef, ReactNode } from "react";

export interface ModalProps {
  /** Controls open/closed state */
  isOpen: boolean;
  /** Called when the modal should close (backdrop click, Escape, X button) */
  onClose: () => void;
  /** Modal title shown in the header */
  title?: ReactNode;
  /** Optional subtitle / badge shown above the title (e.g. "EPIC-101") */
  eyebrow?: ReactNode;
  /** Main body content */
  children: ReactNode;
  /** Footer content (e.g. action buttons) */
  footer?: ReactNode;
  /** Max-width class. Defaults to "max-w-xl" */
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  /** Whether clicking the backdrop closes the modal. Defaults to true */
  closeOnBackdrop?: boolean;
  /** Whether pressing Escape closes the modal. Defaults to true */
  closeOnEscape?: boolean;
  /** Additional className for the modal panel */
  className?: string;
}

// ─── Size map ─────────────────────────────────────────────────────────────────

const SIZE_CLASS: Record<NonNullable<ModalProps["size"]>, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  full: "max-w-full mx-4",
};

export default function Modal({
  isOpen,
  onClose,
  title,
  eyebrow,
  children,
  footer,
  size = "xl",
  closeOnBackdrop = true,
  closeOnEscape = true,
  className = "",
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  /* Escape key */
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, closeOnEscape, onClose]);

  /* Lock body scroll */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /* Focus trap – move focus into panel when opened */
  useEffect(() => {
    if (isOpen) {
      panelRef.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const modal = (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center md:p-0 p-4"
      style={{ backgroundColor: "rgba(15, 23, 42, 0.45)" }}
      aria-modal="true"
      role="dialog"
      aria-labelledby={title ? "modal-title" : undefined}
      onClick={closeOnBackdrop ? onClose : undefined}
    >
      {/* Panel */}
      <div
        ref={panelRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className={[
          "relative w-full bg-white rounded-2xl shadow-2xl outline-none",
          "flex flex-col max-h-[90vh]",
          SIZE_CLASS[size],
          className,
        ].join(" ")}
        style={{
          animation: "modalIn 0.18s cubic-bezier(0.34,1.46,0.64,1) both",
        }}
      >
        {/* ── Header ── */}
        {(eyebrow || title) && (
          <div className=" items-start justify-between px-6 pt-6 mb-8 border-b pb-8 border-slate-light/30 shrink-0">
            <div className="flex flex-col gap-1 pr-8">
              {eyebrow && (
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-widest">
                  <svg
                    width="20"
                    height="14"
                    viewBox="0 0 20 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 10V4C0 3.45 0.195833 2.97917 0.5875 2.5875C0.979167 2.19583 1.45 2 2 2C2.55 2 3.02083 2.19583 3.4125 2.5875C3.80417 2.97917 4 3.45 4 4V10C4 10.55 3.80417 11.0208 3.4125 11.4125C3.02083 11.8042 2.55 12 2 12C1.45 12 0.979167 11.8042 0.5875 11.4125C0.195833 11.0208 0 10.55 0 10ZM7 14C6.45 14 5.97917 13.8042 5.5875 13.4125C5.19583 13.0208 5 12.55 5 12V2C5 1.45 5.19583 0.979167 5.5875 0.5875C5.97917 0.195833 6.45 0 7 0H13C13.55 0 14.0208 0.195833 14.4125 0.5875C14.8042 0.979167 15 1.45 15 2V12C15 12.55 14.8042 13.0208 14.4125 13.4125C14.0208 13.8042 13.55 14 13 14H7ZM16 10V4C16 3.45 16.1958 2.97917 16.5875 2.5875C16.9792 2.19583 17.45 2 18 2C18.55 2 19.0208 2.19583 19.4125 2.5875C19.8042 2.97917 20 3.45 20 4V10C20 10.55 19.8042 11.0208 19.4125 11.4125C19.0208 11.8042 18.55 12 18 12C17.45 12 16.9792 11.8042 16.5875 11.4125C16.1958 11.0208 16 10.55 16 10Z"
                      fill="#003D9B"
                    />
                  </svg>
                  {eyebrow}
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                    aria-label="Close modal"
                  >
                    X
                  </button>
                </div>
              )}
              {title && (
                <div
                  id="modal-title"
                  className="text-2xl font-semibold text-slate-800 leading-snug"
                >
                  {title}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Body ── */}
        <div className="flex-1 overflow-y-auto px-6 pb-4 text-sm text-slate-600 leading-relaxed">
          {children}
        </div>

        {/* ── Footer ── */}
        {footer && (
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 shrink-0">
            {footer}
          </div>
        )}
      </div>

      {/* Keyframe injected inline so no globals needed */}
      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.95) translateY(6px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);   }
        }
      `}</style>
    </div>
  );
  return modal;
}
