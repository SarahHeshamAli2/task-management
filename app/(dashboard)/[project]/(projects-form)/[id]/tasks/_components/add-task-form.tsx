"use client";

import Input from "@/components/ui/shared-input";
import Button from "@/components/ui/button";
import TextArea from "@/components/ui/shared-textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import ExclaimMarkIcon from "@/components/icons/exclaim-mark-icon";
import { useState } from "react";
import SubmissionError from "@/components/shared/submission-error";
import { toast } from "sonner";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Header from "@/app/(dashboard)/[project]/_components/header";
import Select from "@/components/ui/shared-select";
import { ROUTES } from "@/lib/constants/routes.constants";
import { STATUS_VALUES } from "@/lib/constants/tasks.constants";
import useGetProjectMembers from "../../members/hooks/use-get-project-members";
import useGetEpics from "../../epics/hooks/use-get-epics";
import { addTaskSchema, TaskFormValues } from "@/lib/schemes/tasks.schema";
import { addTasksAction } from "@/lib/actions/tasks.actions";

export default function AddTaskForm() {
  const params = useParams();
  const projectId = params.id as string;
  const searchParams = useSearchParams();
  const defaultEpicId = searchParams.get("epicId") ?? undefined;

  const router = useRouter();
  const { members } = useGetProjectMembers({ id: projectId });
  const { epics } = useGetEpics({ id: projectId });

  const { register, handleSubmit, formState, control } =
    useForm<TaskFormValues>({
      resolver: zodResolver(addTaskSchema),
      defaultValues: {
        assignee_id: undefined,
        due_date: undefined,
        project_id: projectId,
        status: "TO_DO",
        epic_id: defaultEpicId ?? undefined,
      },
    });

  const [error, setError] = useState<string | undefined>();
  console.log(formState.errors, "ee");

  const onSubmit = async (data: TaskFormValues) => {
    console.log(data, "loggedtask data");

    const response = await addTasksAction(data);

    if (!response.success) {
      setError(response.error);
      return;
    }
    toast.success("task created successfully");
    setTimeout(() => router.push(ROUTES.tasks.list(projectId)), 1000);
  };

  return (
    <div>
      <Header
        subTitleClassName="max-w-full"
        title={"Create New Task"}
        subtitle={
          "Initialize a new work item within the Architectural Workspace ecosystem."
        }
      />
      <div className="md:bg-white  mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="md:p-8">
            <Input
              isRequired
              label="title"
              placeholder="e.g. Structural Foundation Phase"
              {...register("title")}
              error={formState.errors.title?.message}
              errorIcon={<ExclaimMarkIcon />}
            />
            <div className="md:grid grid-cols-2 gap-8">
              <Select
                error={formState.errors.status?.message}
                label="status"
                placeholder="select a status"
                options={
                  STATUS_VALUES?.map((status) => ({
                    value: status.value,
                    label: status.label.toUpperCase(),
                  })) ?? []
                }
                {...register("status")}
              />
              <Select
                error={formState.errors.assignee_id?.message}
                label="asignee"
                placeholder="select a team member"
                options={
                  members?.map((member) => ({
                    value: member.user_id,
                    label: member.metadata.name,
                  })) ?? []
                }
                {...register("assignee_id")}
              />
            </div>

            {/* Epic Select */}
            <Controller
              control={control}
              name="epic_id"
              render={({ field }) => (
                <Select
                  {...field}
                  value={field.value ?? ""}
                  label="Epic"
                  placeholder="Select Epic Link"
                  error={formState.errors.epic_id?.message}
                  options={
                    epics?.map((epic) => ({
                      value: epic.id,
                      label: epic.title,
                    })) ?? []
                  }
                />
              )}
            />
            <Input
              type="date"
              label="Due Date"
              {...register("due_date")}
              error={formState.errors.due_date?.message}
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
            <input type="hidden" {...register("project_id")} />

            {error && <SubmissionError error={error} />}
            <div className="flex justify-end gap-4 items-center md:mt-14 flex-col-reverse md:flex-row mb-8">
              <Button
                type="button"
                disabled={formState.isSubmitting}
                onClick={() => router.back()}
                variant="ghost"
              >
                Back
              </Button>
              <Button
                className="px-8 w-full md:w-fit"
                disabled={formState.isSubmitting}
              >
                Create Task
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
