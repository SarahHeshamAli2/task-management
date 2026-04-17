"use client";

import { useAppSelector } from "@/lib/store/hooks";
import { getInitials } from "@/lib/utils/get-name-initials";

export default function UserInfo() {
  const user = useAppSelector((store) => store.user.data);
  console.log(user, "uu");

  return (
    <div className="flex items-center gap-4 me-6">
      <div className="my-3">
        <p className="text-slate-dark font-semibold text-sm capitalize">
          {user?.name}
        </p>
        <span className="uppercase text-primary text-[10px] font-bold tracking-[1px]">
          {user?.department}
        </span>
      </div>
      {user?.name && (
        <span className="bg-primary-container text-white p-2 rounded-lg">
          {getInitials(user.name)}
        </span>
      )}
    </div>
  );
}
