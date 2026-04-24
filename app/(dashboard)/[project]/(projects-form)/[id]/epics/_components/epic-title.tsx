"use client";

import Modal from "@/components/shared/modal";
import Button from "@/components/ui/button";
import { useState } from "react";

export default function EpicTitle({ title }: { title: string }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <Button variant="ghost" onClick={() => setIsOpen((prev) => !prev)}>
        <h1 className="text-slate-dark font-medium text-lg">{title}</h1>
      </Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="rr" />
    </>
  );
}
