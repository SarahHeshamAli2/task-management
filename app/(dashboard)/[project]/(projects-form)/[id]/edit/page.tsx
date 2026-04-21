import ProjectForm from "../../_components/project-form";
import { getProjectDetail } from "@/lib/services/get-project-detail";

export default async function page({ params }: { params: { id: string } }) {
  const { id } = await params;

  const project = await getProjectDetail(id);

  return (
    <ProjectForm
      projectId={id}
      mode="edit"
      defaultValues={{
        name: project.data[0].name,
        description: project.data[0]?.description,
      }}
    />
  );
}
