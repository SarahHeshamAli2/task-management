"use server";

import { EpicFormValues } from "../schemes/epic.schema";
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
  });
  if (!response.ok) {
    const errorMsg = await response.json();
    return {
      success: false,
      error: `${response.status}: ${errorMsg.message || "No details"}`,
    };
  }

  return { success: true };
}
