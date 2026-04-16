"use client";
import { makeStore } from "@/lib/store/store";
import { useState } from "react";
import { Provider } from "react-redux";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [store] = useState(() => makeStore());

  return <Provider store={store}>{children}</Provider>;
}
