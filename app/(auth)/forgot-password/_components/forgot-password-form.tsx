"use client";

import Input from "@/shared/components/shared-input";
import SharedTitle from "@/shared/components/shared-title";
import Button from "@/shared/components/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ForgotPasswordFormValues,
  forgotPasswordSchema,
} from "@/lib/schemes/auth.schema";
import { useForm } from "react-hook-form";
import { forgotPasswordAction } from "@/lib/actions/auth.actions";
import { useState } from "react";
import SubmissionError from "@/shared/components/submission-error";
import Link from "next/link";
import LeftArrow from "@/shared/icons/left-arrow";
import SucessToast from "@/shared/components/success-toast";
import { useResendTimer } from "../_hooks/use-resend-otp";
import TimerIcon from "@/shared/icons/timer-icon";

export default function ForgotPasswordForm() {
  const { register, handleSubmit, formState } =
    useForm<ForgotPasswordFormValues>({
      resolver: zodResolver(forgotPasswordSchema),
    });

  const [errorMsg, setErrorMsg] = useState<string>("");
  const [sucessMsg, setSuccessMsg] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem("reset-link-sent") === "true";
  });
  const { canResend, formattedTime, startTimer, trialsExhausted, trials } =
    useResendTimer(300);

  const onSubmit = async (fields: ForgotPasswordFormValues) => {
    if (trialsExhausted) return;

    const response = await forgotPasswordAction(fields);

    if ("error_code" in response) {
      setErrorMsg(response.msg);
      return;
    }
    setSuccessMsg(true);
    sessionStorage.setItem("reset-link-sent", "true");
    setErrorMsg("");
    startTimer();
  };

  return (
    <div className="max-w-120 mx-auto bg-white mt-12 px-12 mb-28 rounded-lg">
      <SharedTitle
        title="Forgot password?"
        subtitle="No worries, we'll send you reset instructions."
        className="pt-12 pb-4"
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="email"
          label="email address"
          placeholder="Enter your email"
          error={formState.errors.email?.message}
          {...register("email")}
        />

        {errorMsg && <SubmissionError error={errorMsg} />}
        <Button
          disabled={formState.isSubmitting || sucessMsg}
          className="w-full my-6"
        >
          Send Reset Link
        </Button>
        <Link
          className="text-primary font-medium text-sm flex gap-1 items-center justify-center pb-2 "
          href={"/login"}
        >
          <LeftArrow />
          Back to login
        </Link>

        {sucessMsg && (
          <>
            <SucessToast
              title="If an account exists with this email, we’ve
sent a password reset link."
              className="mt-20"
            />
            <p className="text-secondary uppercase text-xs font-bold text-center mt-6">
              Didn&apos;t receive the email?
            </p>
            {trialsExhausted ? (
              <p className="text-center text-sm text-red-500 mt-3 mb-10">
                Maximum resend attempts reached. Please try again later.
              </p>
            ) : (
              <Button
                disabled={!canResend || formState.isSubmitting}
                variant="ghost"
                className="w-full bg-surface-low text-placeholder font-semibold mt-3 mb-10"
              >
                <TimerIcon />
                <span className="ms-2">
                  {canResend
                    ? `Resend (${3 - trials} left)`
                    : `Resend in ${formattedTime}`}
                </span>
              </Button>
            )}
          </>
        )}
      </form>
    </div>
  );
}
