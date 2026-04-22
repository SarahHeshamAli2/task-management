"use server";

import {
  ForgotPasswordResponse,
  LoginResponse,
  RegisterResponse,
} from "@/lib/types/auth.type";
import {
  ForgotPasswordFormValues,
  LoginFormValues,
  ResetPasswordFormValues,
  SubmittedRegisterValues,
} from "../schemes/auth.schema";
import { cookies } from "next/headers";

export async function registerAction(
  data: SubmittedRegisterValues,
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
export async function loginAction(
  data: LoginFormValues,
): Promise<ApiResponse<LoginResponse>> {
  const { rememberMe, ...credentials } = data;
  const response = await fetch(
    `${process.env.API_URL}/auth/v1/token?grant_type=password`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apiKey: `${process.env.API_KEY}`,
      },
      body: JSON.stringify(credentials),
    },
  );
  const json = await response.json();
  if (!response.ok) {
    return json;
  }
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
    maxAge: rememberMe ? 60 * 60 * 24 * 30 : 60 * 60,
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
      maxAge: rememberMe ? 60 * 60 * 24 * 30 : 60 * 60,
    },
  );
  cookieStore.set("session_type", rememberMe ? "persistent" : "session", {
    sameSite: "lax",
    path: "/",
    maxAge: rememberMe ? 60 * 60 * 24 * 30 : 60 * 60,
  });
  return json;
}

export async function forgotPasswordAction(
  data: ForgotPasswordFormValues,
): Promise<ApiResponse<ForgotPasswordResponse>> {
  const response = await fetch(`${process.env.API_URL}/auth/v1/recover`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apiKey: `${process.env.API_KEY}`,
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

export async function resetPasswordAction(
  data: ResetPasswordFormValues,
  token: string | null,
): Promise<ApiResponse<RegisterResponse>> {
  const response = await fetch(`${process.env.API_URL}/auth/v1/user`, {
    method: "PUT",

    headers: {
      "Content-Type": "application/json",
      apiKey: `${process.env.API_KEY}`,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

export async function refreshAccessToken(refreshToken: string) {
  const res = await fetch(
    `${process.env.API_URL}/auth/v1/token?grant_type=refresh_token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apiKey: `${process.env.API_KEY}`,
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    },
  );
  if (!res.ok) return null;
  return res.json();
}

export async function verifyToken(token: string) {
  const res = await fetch(`${process.env.API_URL}/auth/v1/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
      apiKey: `${process.env.API_KEY}`,
    },
  });
  return res.ok;
}
export async function getUserData(
  token: string | null | undefined,
): Promise<RegisterResponse> {
  const res = await fetch(`${process.env.API_URL}/auth/v1/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
      apiKey: `${process.env.API_KEY}`,
    },
  });
  return res.json();
}
export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");
  cookieStore.delete("user");
}
