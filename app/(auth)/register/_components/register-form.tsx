"use client";

import Input from "@/shared/components/shared-input";
import SharedTitle from "@/shared/components/shared-title";
import { ValidationChecker } from "./validation-checker";
import Button from "@/shared/components/button";
import FormFooter from "../../_components/form-footer";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormValues, registerSchema } from "@/lib/schemes/auth.schema";
import { useForm, useWatch } from "react-hook-form";

export default function RegisterForm() {
  const { register, handleSubmit, formState, control } =
    useForm<RegisterFormValues>({
      resolver: zodResolver(registerSchema),
    });
  const onSubmit = (data: RegisterFormValues) => {
    console.log(data);
  };
  const passwordValue = useWatch({
    control,
    name: "password",
    defaultValue: "",
  });

  return (
    <div className="max-w-xl mx-auto bg-white mt-12 px-12 mb-28">
      <SharedTitle
        title="Create your workspace"
        subtitle="Join the editorial approach to task management."
        className="text-center pt-12 pb-4"
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
          error={formState.errors.jobTitle?.message}
          {...register("jobTitle")}
        />
        <div className="grid grid-cols-2 gap-4">
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
            type="Repeat your password"
            error={formState.errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />
        </div>
        <ValidationChecker password={passwordValue ?? ""} />
        <Button className="w-full mt-6">Create Account</Button>
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
