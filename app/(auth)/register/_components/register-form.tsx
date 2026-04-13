"use client";

import Input from "@/shared/components/shared-input";
import SharedTitle from "@/shared/components/shared-title";
import { ValidationChecker } from "./validation-checker";
import Button from "@/shared/components/button";
import FormFooter from "../../_components/form-footer";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormValues, registerSchema } from "@/lib/schemes/auth.schema";
import { useForm, useWatch } from "react-hook-form";
import { registerAction } from "@/lib/actions/auth.actions";
import { useState } from "react";
import SubmissionError from "@/shared/components/submission-error";

export default function RegisterForm() {
  const { register, handleSubmit, formState, control } =
    useForm<RegisterFormValues>({
      resolver: zodResolver(registerSchema),
    });

  const [errorMsg, setErrorMsg] = useState<string>("");

  const onSubmit = async (fields: RegisterFormValues) => {
    const submittedData = {
      password: fields.password,
      email: fields.email,
      data: { name: fields.name, job_title: fields.job_title },
    };
    const response = await registerAction(submittedData);

    if ("error_code" in response) {
      setErrorMsg(response.msg);
      return;
    }
    setErrorMsg("");
  };
  const passwordValue = useWatch({
    control,
    name: "password",
    defaultValue: "",
  });

  return (
    <div className="max-w-xl mx-auto bg-white mt-12 md:px-12 px-6 mb-28 rounded-lg">
      <SharedTitle
        title="Create your workspace"
        subtitle={
          <>
            <span className="md:hidden">
              Join the curated environment for institutional trust and task
              precision.
            </span>
            <span className="hidden md:inline">
              Join the editorial approach to task management.
            </span>
          </>
        }
        className="md:text-center pt-12 pb-4"
        titleClassName="text-[1.75rem] md:text-3xl"
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="name"
          placeholder="Enter your full name"
          hint="3-50 characters, letters only."
          error={formState.errors.name?.message}
          {...register("name")}
        />
        <Input
          type="email"
          label="email"
          placeholder="yourname@company.com"
          error={formState.errors.email?.message}
          {...register("email")}
        />
        <Input
          optional
          label="job title"
          placeholder="e.g. Project Manager"
          error={formState.errors.job_title?.message}
          {...register("job_title")}
        />
        <div className="md:grid md:grid-cols-2 gap-4">
          <Input
            label="password"
            placeholder="Minimum 8 characters"
            type="password"
            error={formState.errors.password?.message}
            {...register("password")}
          />
          <Input
            label="Confirm Password"
            placeholder="Minimum 8 characters"
            type="password"
            error={formState.errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />
        </div>
        <ValidationChecker
          className="hidden md:block"
          password={passwordValue ?? ""}
        />
        {errorMsg && <SubmissionError error={errorMsg} />}
        <Button disabled={formState.isSubmitting} className="w-full mt-6">
          Create Account
        </Button>
        <FormFooter
          className="py-12"
          title="Already have an account?"
          link="Log in"
          href="/login"
        />
      </form>
    </div>
  );
}
