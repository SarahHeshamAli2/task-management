"use client";

import NetworkIcon from "@/components/icons/network-icon";
import Button from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ErrorState() {
  const router = useRouter();

  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = () => {
    setIsRetrying(true);
    router.refresh();
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-center gap-6">
      <div className="bg-input-error-light w-16 h-16 flex items-center justify-center rounded-xl">
        <NetworkIcon />
      </div>
      <div className="max-w-76">
        <p className="font-semibold text-xl">Something went wrong</p>
        <p className="text-secondary mt-2">
          We&apos;re having trouble retrieving your projects right now. Please
          try again in a moment.
        </p>
      </div>
      <Button onClick={handleRetry} disabled={isRetrying} className="px-6">
        Retry Connection
      </Button>
    </div>
  );
}
