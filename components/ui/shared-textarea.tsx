"use client";

import { cn } from "@/lib/utils/tailwind-merge";
import { useState } from "react";

type SharedTextAreaProps = {
  label?: string;
  error?: string;
  className?: string;
  hint?: string;
  optional?: boolean;
  errorIcon?: string | React.ReactElement;
  maxLength?: number;
} & React.InputHTMLAttributes<HTMLTextAreaElement>;

export default function TextArea({
  label,
  error,
  className = "",
  optional,
  errorIcon,
  maxLength,
  onChange,
  ...props
}: SharedTextAreaProps) {
  const [charCount, setCharCount] = useState(0);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharCount(e.target.value.length);
    onChange?.(e);
  };
  return (
    <div className="flex flex-col gap-1 mt-6">
      {label && (
        <div className="flex items-center justify-between mb-1.5">
          <label
            className={cn(
              "text-xs uppercase font-bold flex",
              error ? "text-error" : "text-slate-container",
            )}
          >
            {label}
          </label>
          {optional && (
            <span className="text-placeholder ms-0.5 hidden md:block text-xs">
              Optional
            </span>
          )}
        </div>
      )}
      <div className="relative">
        <textarea
          className={cn(
            "w-full px-4 py-3.5 resize-none rounded-sm text-sm outline-none transition-colors",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error
              ? "bg-input-error-light text-input-error"
              : "bg-surface-highest text-placeholder border-slate-300 focus:border-primary placeholder:text-placeholder",
            className,
          )}
          {...props}
          maxLength={maxLength}
          onChange={handleChange}
        />
      </div>
      {error && (
        <p className="text-xs text-error font-medium flex">
          <span className="me-1.5">{errorIcon && errorIcon}</span>
          {error}
        </p>
      )}
      {maxLength !== undefined && (
        <span className="text-xs text-placeholder text-end">
          {charCount}/{maxLength}
        </span>
      )}
    </div>
  );
}
