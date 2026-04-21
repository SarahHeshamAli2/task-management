import Header from "@/app/(dashboard)/[project]/_components/header";
import MembersTable from "./members-table";
import AddMemberIcon from "@/components/icons/add-member-icon";
import { getProjectMembers } from "@/lib/services/get-project-members";

export default async function MemberCard({ id }: { id: string | null }) {
  const members = await getProjectMembers(id ?? "");
  console.log(members);

  return (
    <div>
      <Header
        title="Project Members"
        buttonText="Invite Member"
        leftIcon={<AddMemberIcon />}
      />
      <MembersTable members={members} />
    </div>
  );
}
