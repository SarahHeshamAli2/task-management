"use client";

import Input from "@/components/ui/shared-input";
import SharedTitle from "@/components/shared/shared-title";
import Button from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ForgotPasswordFormValues,
  forgotPasswordSchema,
} from "@/lib/schemes/auth.schema";
import { useForm } from "react-hook-form";
import { forgotPasswordAction } from "@/lib/actions/auth.actions";
import { useState } from "react";
import SubmissionError from "@/components/shared/submission-error";
import Link from "next/link";
import LeftArrow from "@/components/icons/left-arrow";
import SucessToast from "@/components/shared/success-toast";
import { useResendTimer } from "../_hooks/use-resend-otp";
import TimerIcon from "@/components/icons/timer-icon";
import ResetPassIcon from "@/components/icons/reset-pass-icon";

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
    <div className="md:max-w-120 max-w-85 mx-auto bg-white mt-12 md:px-12 mb-28 rounded-lg h-110.5 md:h-auto">
      <div className="flex justify-center pt-8 sm:hidden">
        <Button variant="secondary" className="bg-[#D7E2FF]">
          <ResetPassIcon />
        </Button>
      </div>
      <SharedTitle
        titleClassName="md:text-3xl text-2xl"
        title="Forgot password?"
        subtitle="No worries, we'll send you reset instructions."
        className="pt-12 pb-4 text-center md:text-start"
      />
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
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
          className="text-primary font-medium text-sm flex gap-1 items-center justify-center md:pb-2 "
          href={"/login"}
        >
          <LeftArrow />
          Back to login
        </Link>

        {sucessMsg && (
          <>
            <SucessToast
              footer={
                <div className="flex items-center justify-between pt-3 border-t border-[#0052351A] md:hidden">
                  <p className="font-bold text-xs uppercase text-[#00523599]">
                    Didn&apos;t receive email?
                  </p>
                  {trialsExhausted ? (
                    <p className="text-center text-xs w-1/2 text-red-500 mt-3">
                      Maximum attempts reached. Please try again later.
                    </p>
                  ) : canResend ? (
                    <Button
                      variant="secondary"
                      size="sm"
                      className="uppercase text-primary text-xs flex items-center tracking-wider gap-1"
                      disabled={formState.isSubmitting}
                      onClick={handleSubmit(onSubmit)}
                    >
                      Resend
                    </Button>
                  ) : (
                    <Button
                      variant="secondary"
                      size="sm"
                      className="uppercase text-primary text-xs flex items-center tracking-wider gap-1"
                      disabled
                    >
                      Resend in {formattedTime}
                    </Button>
                  )}
                </div>
              }
              title="If an account exists with this email, we’ve
sent a password reset link."
              className="md:mt-20 w-full mt-11 bg-[#82F9BE4D] md:bg-[#82F9BE33]"
            />
            <div className="md:block hidden">
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
            </div>
          </>
        )}
      </form>
    </div>
  );
}
