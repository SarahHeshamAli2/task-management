"use client";

import InviteIcon from "@/components/icons/invite-icon";
import Button from "@/components/ui/button";
import Logo from "@/components/ui/logo";
import { useAcceptInvite } from "./hooks/use-accept-invite";

export default function InviteCard({ token }: { token: string }) {
  const { acceptInvite, isPending } = useAcceptInvite();

  const handleAccept = () => {
    acceptInvite({ p_token: token });
  };

  return (
    <div className="flex flex-col items-center justify-center h-full mx-auto">
      <Logo className="mb-12" />
      <div className="p-12 bg-white max-w-141 rounded-lg border-t-5 border-primary">
        <div className="bg-ocean flex items-center w-fit px-3 gap-1.5 rounded-xl uppercase text-xs text-secondary font-bold py-1 mx-auto">
          <InviteIcon />
          <span>New Project Invitation</span>
        </div>
        <h1 className="font-semibold text-3xl my-4 text-center">
          You&apos;ve been invited to join a new project
        </h1>
        <Button onClick={handleAccept} disabled={isPending} className="w-full">
          {isPending ? "Accepting..." : "Accept Invitation"}
        </Button>
      </div>
    </div>
  );
}
