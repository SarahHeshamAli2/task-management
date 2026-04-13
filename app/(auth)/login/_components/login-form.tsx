"use client";

import Input from "@/shared/components/shared-input";
import SharedTitle from "@/shared/components/shared-title";
import Button from "@/shared/components/button";
import FormFooter from "../../_components/form-footer";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormValues, loginSchema } from "@/lib/schemes/auth.schema";
import { useForm } from "react-hook-form";
import { LoginAction } from "@/lib/actions/auth.actions";
import { useState } from "react";
import SubmissionError from "@/shared/components/submission-error";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const { register, handleSubmit, formState } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });
  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState<string>("");

  const onSubmit = async (fields: LoginFormValues) => {
    const response = await LoginAction(fields);

    if ("error_code" in response) {
      setErrorMsg(response.msg);
      return;
    }
    setErrorMsg("");
    router.push("/dashboard");
  };

  return (
    <div className="max-w-120 mx-auto bg-white mt-12 px-12 mb-28 rounded-lg">
      <SharedTitle
        title="Welcome Back"
        subtitle="Please enter your details to access your workspace"
        className="text-center pt-12 pb-4"
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="email"
          label="email"
          placeholder="yourname@company.com"
          error={formState.errors.email?.message}
          {...register("email")}
        />

        <Input
          label="password"
          placeholder="Enter your password"
          type="password"
          error={formState.errors.password?.message}
          {...register("password")}
        />

        <div className="flex items-center my-8 justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              className="
    appearance-auto
    w-4 h-4
    border-2 border-gray-300  
    rounded-xs
    bg-surface-low                   
    checked:bg-surface-highest    
    cursor-pointer transition-colors
  "
            />

            <label className="ms-2">Remember Me</label>
          </div>

          <Link
            className="text-primary font-medium text-sm"
            href={"/forgot-password"}
          >
            Forgot Password?
          </Link>
        </div>

        {errorMsg && <SubmissionError error={errorMsg} />}
        <Button disabled={formState.isSubmitting} className="w-full">
          Log in{" "}
        </Button>
        <FormFooter
          className="py-12"
          title="Don't have an account?"
          link="Sign Up"
          href="/register"
        />
      </form>
    </div>
  );
}
