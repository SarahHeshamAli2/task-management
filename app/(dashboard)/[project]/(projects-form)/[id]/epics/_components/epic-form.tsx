"use client";

import Input from "@/components/ui/shared-input";
import Button from "@/components/ui/button";
import TextArea from "@/components/ui/shared-textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProjectFormValues } from "@/lib/schemes/projects.schema";
import { useForm } from "react-hook-form";
import ExclaimMarkIcon from "@/components/icons/exclaim-mark-icon";
import { useState } from "react";
import SubmissionError from "@/components/shared/submission-error";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Header from "@/app/(dashboard)/[project]/_components/header";
import Select from "@/components/ui/shared-select";
import { Members } from "@/lib/types/member.types";
import { addEpicSchema, EpicFormValues } from "@/lib/schemes/epic.schema";
import { addEpicAction } from "@/lib/actions/epics.actions";
import { ROUTES } from "@/lib/constants/routes.constants";

type Mode = "add" | "edit";

interface ProjectFormProps {
  mode?: Mode;
  defaultValues?: Partial<ProjectFormValues>;
  projectId?: string;
  members?: Members;
}

const config = {
  add: {
    title: "Create New Epic",
    subtitle: `Define a major project phase or high-level milestone to group
related tasks and track architectural progress.`,
    submitLabel: "Create Epic",
    successMessage: "Epic created successfully",
  },
  edit: {
    title: "Edit Epic",
    subtitle: `Define a major project phase or high-level milestone to group
related tasks and track architectural progress.`,
    submitLabel: "Save Changes",
    successMessage: "Project updated successfully",
  },
} satisfies Record<Mode, object>;

export default function EpicForm({
  mode = "add",
  defaultValues,
  projectId,
  members,
}: ProjectFormProps) {
  const router = useRouter();
  const { title, submitLabel, successMessage, subtitle } = config[mode];

  const { register, handleSubmit, formState } = useForm<EpicFormValues>({
    resolver: zodResolver(addEpicSchema),
    defaultValues: {
      assignee_id: undefined,
      deadline: undefined,
      title: defaultValues?.name ?? "",
      description: defaultValues?.description ?? undefined,
      project_id: projectId,
    },
  });

  const [error, setError] = useState<string | undefined>();
  console.log(formState.errors, "ee");

  const onSubmit = async (data: EpicFormValues) => {
    const payload = {
      ...data,
      assignee_id: data.assignee_id || undefined,
      deadline: data.deadline || undefined,
    };

    const response = await addEpicAction(payload);

    if (!response.success) {
      setError(response.error);
      return;
    }
    toast.success(successMessage);
    setTimeout(() => router.push(ROUTES.project.epics(projectId)), 1000);
  };

  return (
    <div className="max-w-212 mx-auto">
      <Header title={title} subtitle={subtitle} />
      <div className="md:bg-white  mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="md:p-8 p-6">
            <Input
              isRequired
              label="title"
              placeholder="e.g. Structural Foundation Phase"
              {...register("title")}
              error={formState.errors.title?.message}
              errorIcon={<ExclaimMarkIcon />}
            />
            <TextArea
              label="Description"
              optional
              className="min-h-37"
              placeholder="Describe the scope and objectives of this epic..."
              {...register("description")}
              error={formState.errors.description?.message}
              maxLength={500}
            />

            <div className="grid grid-cols-2 gap-8">
              <Select
                error={formState.errors.assignee_id?.message}
                label="asignee"
                placeholder="select a member"
                options={
                  members?.map((member) => ({
                    value: member.user_id,
                    label: member.metadata.name,
                  })) ?? []
                }
                {...register("assignee_id")}
              />
              <Input
                type="date"
                label="deadline"
                {...register("deadline")}
                error={formState.errors.deadline?.message}
              />
              <input type="hidden" {...register("project_id")} />
            </div>
            {error && <SubmissionError error={error} />}
            <div className="flex justify-end gap-4 items-center mt-14 flex-col-reverse md:flex-row">
              <Button
                type="button"
                disabled={formState.isSubmitting}
                onClick={() => router.back()}
                variant="ghost"
              >
                Cancel
              </Button>
              <Button
                className="px-8 w-full md:w-fit"
                disabled={formState.isSubmitting}
              >
                {submitLabel}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
