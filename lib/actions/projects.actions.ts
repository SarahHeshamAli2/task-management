"use server";

import { revalidateTag } from "next/cache";
import { ProjectFormValues } from "../schemes/projects.schema";
import { getToken } from "../utils/manage-token";

export async function addProjectAction(data: ProjectFormValues) {
  const token = await getToken();

  const response = await fetch(`${process.env.API_URL}/rest/v1/projects `, {
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
  revalidateTag("projects", "max");

  return { success: true };
}
