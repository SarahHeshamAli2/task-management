"use server";

import { LoginResponse, RegisterResponse } from "@/lib/types/auth.type";
import {
  LoginFormValues,
  SubmittedRegisterValues,
} from "../schemes/auth.schema";

export async function registerAction(
  data: SubmittedRegisterValues
): Promise<ApiResponse<RegisterResponse>> {
  const response = await fetch(`${process.env.API_URL}/auth/v1/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apiKey: `${process.env.API_KEY}`,
    },
    body: JSON.stringify(data),
  });

  return response.json();
}
export async function LoginAction(
  data: LoginFormValues
): Promise<ApiResponse<LoginResponse>> {
  const response = await fetch(
    `${process.env.API_URL}/auth/v1/token?grant_type=password`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apiKey: `${process.env.API_KEY}`,
      },
      body: JSON.stringify(data),
    }
  );

  return response.json();
}
