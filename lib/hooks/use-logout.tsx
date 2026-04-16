"use client";

import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/store/hooks";
import { clearUser } from "@/lib/store/slices/user-slice";
import { logoutAction } from "../actions/auth.actions";

export function useLogout() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    await logoutAction();
    dispatch(clearUser());
    router.push("/login");
  };

  return { handleLogout };
}
