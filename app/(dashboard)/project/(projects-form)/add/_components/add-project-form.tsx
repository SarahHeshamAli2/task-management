"use client";

import AddMemberIcon from "@/components/icons/add-member-icon";
import Input from "@/components/ui/shared-input";
import Button from "@/components/ui/button";
import TextArea from "@/components/ui/shared-textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addProjectSchema,
  ProjectFormValues,
} from "@/lib/schemes/projects.schema";
import { useForm } from "react-hook-form";
import ExclaimMarkIcon from "@/components/icons/exclaim-mark-icon";
import { addProjectAction } from "@/lib/actions/projects.actions";
import { useState } from "react";
import SuccessToast from "@/components/shared/success-toast";
import SubmissionError from "@/components/shared/submission-error";
import FormHeader from "./form-header";
import FormFooter from "./form-footer";
import Header from "../../../_components/header";

export default function AddProjectForm() {
  const { register, handleSubmit, formState } = useForm<ProjectFormValues>({
    resolver: zodResolver(addProjectSchema),
  });
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>("");

  const onSubmit = async (data: ProjectFormValues) => {
    const response = await addProjectAction(data);
    if (!response.success) {
      console.log(response.error, "ee");

      setError(response.error);
      return;
    }
    setSuccess(true);
  };
  return (
    <div>
      <Header
        className="md:flex hidden"
        title="Add New Project"
        buttonText="Invite Member"
        leftIcon={<AddMemberIcon />}
      />
      <div className="md:bg-white max-w-2xl mx-auto ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormHeader />

          <div className="md:p-8 p-6">
            <Input
              label="Project TITLE"
              placeholder="project title"
              {...register("name")}
              error={formState.errors.name?.message}
              errorIcon={<ExclaimMarkIcon />}
            />
            <TextArea
              label="Description"
              optional
              className="min-h-37"
              placeholder="Provide a high-level overview of the project's architectural objectives and 
key milestones..."
              {...register("description")}
              error={formState.errors.description?.message}
              maxLength={500}
            />
            {error && <SubmissionError error={error} />}
            {success && <SuccessToast title="Project created successfully" />}
            <div className="flex justify-between items-center mt-14 flex-col-reverse md:flex-row">
              <Button variant="ghost">Cancel</Button>
              <Button
                className="px-8 w-full md:w-fit"
                disabled={formState.isSubmitting}
              >
                Create Project
              </Button>
            </div>
          </div>

          <FormFooter />
        </form>
      </div>
    </div>
  );
}
