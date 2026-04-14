"use client";

import { useState, useEffect, useCallback } from "react";

const MAX_TRIALS = 3;

export function useResendTimer(initialSeconds: number = 60) {
  const [secondsLeft, setSecondsLeft] = useState(() => {
    if (typeof window === "undefined") return 0;
    const savedEnd = sessionStorage.getItem("resend-timer-end");
    if (!savedEnd) return 0;
    const remaining = Math.ceil((Number(savedEnd) - Date.now()) / 1000);
    return remaining > 0 ? remaining : 0;
  });
  const [isActive, setIsActive] = useState(() => {
    if (typeof window === "undefined") return false;
    const savedEnd = sessionStorage.getItem("resend-timer-end");
    if (!savedEnd) return false;
    return Number(savedEnd) > Date.now();
  });
  const [trials, setTrials] = useState(() => {
    if (typeof window === "undefined") return 0;
    const saved = sessionStorage.getItem("resend-trials");
    return saved ? Number(saved) : 0;
  });
  useEffect(() => {
    if (!isActive || secondsLeft <= 0) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setIsActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, secondsLeft]);

  const startTimer = useCallback(() => {
    setTrials((prev) => {
      const next = prev + 1;
      sessionStorage.setItem("resend-trials", String(next));
      return next;
    });
    const endTime = Date.now() + initialSeconds * 1000;
    sessionStorage.setItem("resend-timer-end", String(endTime));
    setSecondsLeft(initialSeconds);
    setIsActive(true);
  }, [initialSeconds]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const canResend = secondsLeft === 0 && trials < MAX_TRIALS;
  const trialsExhausted = trials >= MAX_TRIALS;

  return {
    secondsLeft,
    formattedTime: formatTime(secondsLeft),
    canResend,
    trialsExhausted,
    trials,
    startTimer,
  };
}
