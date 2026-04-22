"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;

    // No hash = normal visit, redirect based on auth
    if (!hash) {
      const accessToken = document.cookie.includes("access_token");
      router.replace(accessToken ? "/project" : "/login");
      return;
    }

    const params = new URLSearchParams(hash.replace("#", ""));

    const error = params.get("error");
    const errorCode = params.get("error_code");
    const errorDescription = params.get("error_description");

    if (error || errorCode) {
      const message = errorDescription
        ? decodeURIComponent(errorDescription.replace(/\+/g, " "))
        : "Invalid or expired reset link.";
      router.replace(`/reset-password?error=${encodeURIComponent(message)}`);
      return;
    }

    if (params.get("type") === "recovery") {
      const accessToken = params.get("access_token");
      if (accessToken) {
        router.replace(`/reset-password?access_token=${accessToken}`);
      } else {
        router.replace(
          `/reset-password?error=${encodeURIComponent("Invalid or expired reset link.")}`,
        );
      }
    } else {
      router.replace("/login");
    }
  }, [router]);

  return null;
}
