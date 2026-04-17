"use client";
import { useEffect, useRef } from "react";
import { useAppDispatch } from "@/lib/store/hooks";
import { setUser, User } from "@/lib/store/slices/user-slice";

export default function UserInitializer({ user }: { user: User | null }) {
  const dispatch = useAppDispatch();
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current && user) {
      dispatch(setUser(user));
      initialized.current = true;
    }
  }, [user, dispatch]);

  return null;
}
