import { inviteMemberAction } from "@/lib/actions/members.actions";
import { useMutation } from "@tanstack/react-query";
import { ParamValue } from "next/dist/server/request/params";
type InviteMemberPayload = {
  p_email: string;
  p_project_id: string | string[] | ParamValue;
};
export function useInviteMember() {
  const {
    mutate: inviteMember,
    error,
    isPending,
  } = useMutation({
    mutationKey: ["members"],
    mutationFn: (data: InviteMemberPayload) => inviteMemberAction(data),
  });

  return {
    inviteMember,
    error,
    isPending,
  };
}
