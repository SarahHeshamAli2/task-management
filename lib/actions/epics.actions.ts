"use server";

import { revalidateTag } from "next/cache";
import { EpicFormValues, UpdateEpicFormValues } from "../schemes/epic.schema";
import { getToken } from "../utils/manage-token";

export async function addEpicAction(data: EpicFormValues) {
  const token = await getToken();

  const response = await fetch(`${process.env.API_URL}/rest/v1/epics`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,

      apiKey: `${process.env.API_KEY}`,
    },
    body: JSON.stringify(data),
    next: { tags: ["epics"] },
  });

  if (!response.ok) {
    const errorMsg = await response.json();
    return {
      success: false,
      error: `${response.status}: ${errorMsg.message || "No details"}`,
    };
  }

  revalidateTag("epics", "max");

  return { success: true };
}

export async function updateEpicAction(
  id: string,
  data: Partial<UpdateEpicFormValues>
) {
  const token = await getToken();

  const response = await fetch(
    `${process.env.API_URL}/rest/v1/epics?id=eq.${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
        apiKey: `${process.env.API_KEY}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const errorMsg = await response.json().catch(() => ({}));
    return {
      success: false,
      error: `${response.status}: ${errorMsg.message || "No details"}`,
    };
  }
  revalidateTag("epics", "max");

  return { success: true };
}
