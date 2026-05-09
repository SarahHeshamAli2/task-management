"use server";

import { ParamValue } from "next/dist/server/request/params";
import { getToken } from "../utils/manage-token";
type InviteMemberPayload = {
  p_email: string;
  p_project_id: string | string[] | ParamValue;
};
export async function inviteMemberAction(data: InviteMemberPayload) {
  const token = await getToken();

  const response = await fetch(
    `${process.env.API_URL}/rest/v1/rpc/invite_member`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,

        apiKey: `${process.env.API_KEY}`,
      },
      body: JSON.stringify({
        ...data,
        p_app_url: "http://localhost:3000/",
        p_base_url: process.env.API_URL,
      }),
    }
  );
  if (!response.ok) {
    const errorMsg = await response.json();
    return {
      success: false,
      error: `${response.status}: ${errorMsg.message || "No details"}`,
    };
  }

  return { success: true };
}
export async function acceptInviteAction(data: { p_token: string }) {
  const token = await getToken();

  const response = await fetch(
    `${process.env.API_URL}/rest/v1/rpc/accept_invitation`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
        apiKey: `${process.env.API_KEY}`,
      },
      body: JSON.stringify(data),
    }
  );

  // Safely parse — PostgREST RPCs often return empty body on success
  const text = await response.text();
  const result = text ? JSON.parse(text) : null;

  if (!response.ok || result?.code) {
    return {
      success: false,
      error: result?.message || "Failed to accept invitation",
    };
  }

  return { success: true };
}
