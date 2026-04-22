import { getProjectMembers } from "@/lib/services/get-project-members";
import EpicForm from "../_components/epic-form";

export default async function page({ params }: { params: { id: string } }) {
  const param = await params;
  const id = param.id;
  const { data: members } = await getProjectMembers(id);
  return <EpicForm members={members} projectId={id} mode="add" />;
}
