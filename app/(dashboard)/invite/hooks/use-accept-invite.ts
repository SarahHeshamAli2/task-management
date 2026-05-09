import { acceptInviteAction } from "@/lib/actions/members.actions";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useAcceptInvite() {
  const router = useRouter();
  const { mutate: acceptInvite, isPending } = useMutation({
    mutationKey: ["members"],
    mutationFn: (data: { p_token: string }) => acceptInviteAction(data),
    onSuccess: (result) => {
      if (!result.success) {
        toast.error(result.error);
        return;
      }
      toast.success("Invitation accepted!");
      router.push("/project");
    },
  });

  return {
    acceptInvite,
    isPending,
  };
}
