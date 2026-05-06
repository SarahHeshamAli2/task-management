import MembersTable from "./members-table";
import { getProjectMembers } from "@/lib/services/get-project-members";

export default async function MemberCard({ id }: { id: string | null }) {
  const { data: members } = await getProjectMembers(id ?? "");

  return (
    <div>
      <MembersTable members={members} />
    </div>
  );
}
