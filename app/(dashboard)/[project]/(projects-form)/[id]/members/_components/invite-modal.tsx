"use client";

import Modal from "@/components/shared/modal";
import Button from "@/components/ui/button";
import Input from "@/components/ui/shared-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";
import { useInviteMember } from "../hooks/use-invite-member";
import { toast } from "sonner";
type InviteModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function InviteModal({ open, onClose }: InviteModalProps) {
  const { inviteMember, error, isPending } = useInviteMember();
  const schema = z.object({
    p_email: z.email("please enter a valid email"),
  });
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { p_email: "" },
  });

  const { id } = useParams();

  const onSubmit = async (values: { p_email: string }) => {
    const payload = {
      ...values,
      p_project_id: id,
    };

    inviteMember(payload, {
      onSuccess: () => {
        toast.success("Invitation sent!");
        onClose();
      },
      onError: () => {
        toast.error(
          error?.message || "Failed to send invitation. Please try again."
        );
      },
    });
  };
  return (
    <Modal size="md" isOpen={open} onClose={onClose} eyebrow>
      <h3 className="text-slate-dark font-bold text-2xl">Invite Team Member</h3>
      <span className="text-[#4F5F7B] text-sm mt-2 block">
        Send an invitation to join the Architectural Studio workspace.
      </span>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="email address"
          placeholder="Enter email adress"
          {...register("p_email")}
          error={formState.errors.p_email?.message}
        />
        <div className="flex justify-end mt-8 gap-3">
          <Button
            disabled={isPending}
            className="px-16"
            variant="ghost"
            type="button"
          >
            Cancel
          </Button>
          <Button disabled={isPending} className="px-10">
            Send Invitation
          </Button>
        </div>
      </form>
    </Modal>
  );
}
