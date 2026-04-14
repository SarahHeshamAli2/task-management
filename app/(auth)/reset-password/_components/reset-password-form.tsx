"use client";

import { resetPasswordAction } from "@/lib/actions/auth.actions";
import {
  ResetPasswordFormValues,
  resetPasswordSchema,
} from "@/lib/schemes/auth.schema";
import Button from "@/shared/components/button";
import Input from "@/shared/components/shared-input";
import SharedTitle from "@/shared/components/shared-title";
import SubmissionError from "@/shared/components/submission-error";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { ValidationChecker } from "../../_components/validation-checker";
import Link from "next/link";
import { resetPasswordRules } from "@/lib/constants/auth.constants";
import SucessToast from "@/shared/components/success-toast";

export default function ResetPassowrdForm() {
  const { register, handleSubmit, formState, control } =
    useForm<ResetPasswordFormValues>({
      resolver: zodResolver(resetPasswordSchema),
    });

  const searchParams = useSearchParams();

  const router = useRouter();
  const passwordValue = useWatch({
    control,
    name: "password",
    defaultValue: "",
  });
  const accessToken = searchParams.get("access_token");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<boolean>(false);

  const onSubmit = async (fields: ResetPasswordFormValues) => {
    const response = await resetPasswordAction(fields, accessToken);

    if ("error_code" in response) {
      setErrorMsg(response.msg);
      return;
    }
    setSuccessMsg(true);
    setErrorMsg("");
    setTimeout(() => {
      router.push("/login");
    }, 3000);
  };

  if (!accessToken) {
    return <SubmissionError error="Invalid or expired reset link." />;
  }
  return (
    <div className="max-w-120 mx-auto bg-white mt-12 px-12 mb-28 rounded-lg">
      <SharedTitle
        title="Create a New Password"
        subtitle="Create a new, strong password to secure your workstation
access."
        className=" pt-12 pb-4"
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="new password"
          placeholder="Enter a password"
          type="password"
          href="/forgot-password"
          iconClassName="lg:hidden"
          error={formState.errors.password?.message}
          {...register("password")}
        />
        <Input
          label="confirm password"
          placeholder="confirm your password"
          type="password"
          href="/forgot-password"
          iconClassName="lg:hidden"
          error={formState.errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <ValidationChecker
          rules={resetPasswordRules}
          password={passwordValue}
          layout="grid"
          className="bg-surface-low/50 border-[#C3C6D633]"
          title={"Security Requirements"}
        />
        {successMsg && (
          <SucessToast
            title={
              "Your password has been updated successfully. You can now log in"
            }
          />
        )}
        {errorMsg && <SubmissionError error={errorMsg} />}
        <Button disabled={formState.isSubmitting} className="w-full my-6">
          Update Password
        </Button>

        <Link
          href={"/login"}
          className="text-primary text-sm font-medium block text-center pb-7"
        >
          Back to sign in
        </Link>
      </form>
    </div>
  );
}
