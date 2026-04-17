"use server";

import { ProjectFormValues } from "../schemes/projects.schema";
import { getToken } from "../utils/manage-token";

export async function addProjectAction(data: ProjectFormValues) {
  const token = await getToken();
  console.log(token, "tt");

  const response = await fetch(`${process.env.API_URL}/rest/v1/projects `, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",

      Authorization: `Bearer ${token}`,
      apiKey: `${process.env.API_KEY}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorText = await response.text();
    console.error("API error:", response.status, errorText);
    return {
      success: false,
      error: `Server error ${response.status}: ${errorText || "No details"}`,
    };
  }

  return { success: true };
}
