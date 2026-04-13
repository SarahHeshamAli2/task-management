"use server";

import { LoginResponse, RegisterResponse } from "@/lib/types/auth.type";
import {
  LoginFormValues,
  SubmittedRegisterValues,
} from "../schemes/auth.schema";
import { cookies } from "next/headers";

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
  const json = await response.json();
  const cookieStore = await cookies();

  //setting access token in httpOnly cookie
  cookieStore.set("access_token", json.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: json.expires_in,
  });

  //setting refresh token in httpOnly cookie
  cookieStore.set("refresh_token", json.refresh_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  //setting some user propreties in normal cookie

  cookieStore.set(
    "user",
    JSON.stringify({
      id: json.user.id,
      name: json.user.user_metadata.name,
      email: json.user.email,
      department: json.user.user_metadata.department,
      role: json.user.role,
    }),
    {
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: json.expires_in,
    }
  );
  return json;
}
