"use client";

import { addDays } from "@/lib/utils/format-date";
import { useState, useRef, useEffect } from "react";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function sameDay(a: Date, b: Date) {
  return a.toDateString() === b.toDateString();
}

function formatRange(s: Date, e: Date) {
  const sm = MONTHS[s.getMonth()].slice(0, 3);
  const em = MONTHS[e.getMonth()].slice(0, 3);
  if (s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear())
    return `${sm} ${s.getDate()} – ${e.getDate()}, ${e.getFullYear()}`;
  return `${sm} ${s.getDate()} – ${em} ${e.getDate()}, ${e.getFullYear()}`;
}

interface WeekRangePickerProps {
  start: Date;
  end: Date;
  onChange?: (start: Date, end: Date) => void;
}
export default function WeekRangePicker({
  onChange,
  start,
  end,
}: WeekRangePickerProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [open, setOpen] = useState(false);
  const [tempStart, setTempStart] = useState<Date | null>(null);
  const [tempEnd, setTempEnd] = useState<Date | null>(null);
  const [hoverDay, setHoverDay] = useState<Date | null>(null);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setOpen(false);
        setTempStart(null);
        setTempEnd(null);
        setHoverDay(null);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const shiftWeek = (dir: number) => {
    onChange?.(addDays(start, dir * 7), addDays(end, dir * 7));
  };

  const openCalendar = () => {
    if (open) {
      setOpen(false);
      setTempStart(null);
      setTempEnd(null);
      setHoverDay(null);
      return;
    }
    setTempStart(null);
    setTempEnd(null);
    setHoverDay(null);
    setViewYear(start.getFullYear());
    setViewMonth(start.getMonth());
    setOpen(true);
  };
  const activeRange = (): { s: number; e: number } | null => {
    if (tempStart && tempEnd)
      return { s: tempStart.getTime(), e: tempEnd.getTime() };

    if (tempStart && hoverDay) {
      const [s, e] =
        tempStart < hoverDay ? [tempStart, hoverDay] : [hoverDay, tempStart];
      return {
        s: s.getTime(),
        e: Math.min(e.getTime(), addDays(s, 6).getTime()),
      };
    }

    if (!tempStart) return { s: start.getTime(), e: end.getTime() };

    return null;
  };
  const pickDay = (d: Date) => {
    if (!tempStart || tempEnd) {
      setTempStart(d);
      setTempEnd(null);
    } else {
      const [s, e] = d < tempStart ? [d, tempStart] : [tempStart, d];
      const clamped = addDays(s, 6);
      setTempStart(s);
      setTempEnd(e > clamped ? clamped : e);
    }
  };
  const applyRange = () => {
    if (!tempStart || !tempEnd) return;
    onChange?.(tempStart, tempEnd);
    onChange?.(tempStart, tempEnd);
    setOpen(false);
    setTempStart(null);
    setTempEnd(null);
    setHoverDay(null);
  };

  const getDayClass = (d: Date, isOther: boolean): string => {
    if (isOther) return "cal-day other-month";

    const cls = ["cal-day"];
    if (sameDay(d, today)) cls.push("today");

    const range = activeRange();
    if (!range) {
      // anchor-only state: just highlight the anchor
      if (d.getTime() === tempStart?.getTime()) cls.push("range-single");
      return cls.join(" ");
    }

    const dt = d.getTime();
    const { s, e } = range;
    const isHover = !!(tempStart && !tempEnd && hoverDay);

    if (dt === s && dt === e)
      cls.push(isHover ? "hover-single" : "range-single", "selected");
    else if (dt === s)
      cls.push(isHover ? "hover-start" : "range-start", "selected");
    else if (dt === e)
      cls.push(isHover ? "hover-end" : "range-end", "selected");
    else if (dt > s && dt < e)
      cls.push(isHover ? "hover-in-range" : "in-range", "selected");

    return cls.join(" ");
  };

  const renderDays = () => {
    const first = new Date(viewYear, viewMonth, 1);
    const dow = first.getDay();
    const startDay = addDays(first, -dow);
    const days = [];

    for (let i = 0; i < 42; i++) {
      const d = addDays(startDay, i);
      const isOther = d.getMonth() !== viewMonth;
      const cls = getDayClass(d, isOther);

      days.push(
        <div
          key={i}
          className={cls}
          onClick={() => !isOther && pickDay(d)}
          onMouseEnter={() => {
            if (tempStart && !tempEnd && !isOther) setHoverDay(d);
          }}
          onMouseLeave={() => {
            if (tempStart && !tempEnd) setHoverDay(null);
          }}
        >
          {d.getDate()}
        </div>
      );
    }
    return days;
  };

  const phase1 = tempStart && !tempEnd;

  return (
    <div className="relative" ref={popupRef}>
      {/* Collapsed bar */}
      <div className="hidden sm:flex items-center gap-2 rounded-lg px-3 py-2 h-[36px]">
        <button
          onClick={() => shiftWeek(-1)}
          className="text-gray-400 hover:text-gray-600 px-1 text-lg leading-none"
        >
          ‹
        </button>
        <span
          className="text-sm font-medium cursor-pointer hover:text-blue-600 px-1"
          onClick={openCalendar}
        >
          {formatRange(start, end)}
        </span>
        <button
          onClick={() => shiftWeek(1)}
          className="text-gray-400 hover:text-gray-600 px-1 text-lg leading-none"
        >
          ›
        </button>
      </div>

      {/* Mobile: bordered input style */}
      <div
        className="sm:hidden flex items-center gap-2 rounded-lg px-3 py-2 h-[36px] md:bg-white bg-surface-low cursor-pointer"
        onClick={openCalendar}
      >
        <svg
          className="w-4 h-4 text-gray-400 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="2" />
          <path d="M16 2v4M8 2v4M3 10h18" strokeWidth="2" />
        </svg>
        <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
          {formatRange(start, end)}
        </span>
      </div>

      {/* Popup calendar */}
      {open && (
        <div className="absolute top-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 w-72 end-0 sm:end-auto">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <button
              onClick={() => {
                setViewMonth((m) => {
                  if (m === 0) {
                    setViewYear((y) => y - 1);
                    return 11;
                  }
                  return m - 1;
                });
              }}
              className="text-gray-400 hover:bg-gray-100 rounded-md px-2 py-1"
            >
              ‹
            </button>
            <span className="text-sm font-medium">
              {MONTHS[viewMonth]} {viewYear}
            </span>
            <button
              onClick={() => {
                setViewMonth((m) => {
                  if (m === 11) {
                    setViewYear((y) => y + 1);
                    return 0;
                  }
                  return m + 1;
                });
              }}
              className="text-gray-400 hover:bg-gray-100 rounded-md px-2 py-1"
            >
              ›
            </button>
          </div>

          <div className="px-3 py-2">
            <div className="grid grid-cols-7 mb-1">
              {["SU", "MO", "TU", "WE", "TH", "FR", "SA"].map((d) => (
                <span
                  key={d}
                  className="text-center text-xs text-gray-400 font-medium py-1"
                >
                  {d}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-0.5">{renderDays()}</div>
          </div>

          {phase1 && (
            <p className="text-center text-xs text-gray-400 pb-2">
              Pick end date (max 7 days)
            </p>
          )}

          <div className="flex justify-end gap-2 px-4 py-3 border-t border-gray-100">
            <button
              onClick={() => {
                setOpen(false);
                setTempStart(null);
                setTempEnd(null);
                setHoverDay(null);
              }}
              className="px-4 py-1.5 text-sm text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={applyRange}
              disabled={!tempStart || !tempEnd}
              className="px-4 py-1.5 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Apply Range
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
