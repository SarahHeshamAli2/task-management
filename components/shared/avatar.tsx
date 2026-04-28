"use client";

import Image from "next/image";
import { getInitials } from "@/lib/utils/get-name-initials";
import { cn } from "@/lib/utils/tailwind-merge";

type AvatarProps = {
  name: string;
  src?: string | null;
  sizeClassName?: string;
  className?: string;
  textClassName?: string;
  alt?: string;
};

export default function Avatar({
  name,
  src,
  sizeClassName = "w-10 h-10",
  className,
  textClassName = "text-sm",
  alt,
}: AvatarProps) {
  const initials = getInitials(name);

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-xl overflow-hidden bg-primary-container text-white font-semibold",
        sizeClassName,
        textClassName,
        className
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt ?? name}
          width={64}
          height={64}
          className="w-full h-full object-cover"
          unoptimized
        />
      ) : (
        initials
      )}
    </span>
  );
}
