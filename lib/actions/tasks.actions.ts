"use server";
import { revalidateTag } from "next/cache";
import { TaskFormValues } from "../schemes/tasks.schema";
import { getToken } from "../utils/manage-token";

export async function addTasksAction(data: TaskFormValues) {
  const token = await getToken();

  const response = await fetch(`${process.env.API_URL}/rest/v1/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,

      apiKey: `${process.env.API_KEY}`,
    },
    body: JSON.stringify(data),
    next: { tags: ["tasks"] },
  });

  if (!response.ok) {
    const errorMsg = await response.json();
    return {
      success: false,
      error: `${response.status}: ${errorMsg.message || "No details"}`,
    };
  }

  revalidateTag("tasks", "max");

  return { success: true };
}

export async function updateTaskAction(
  newStatus: string,
  taskId: string | null
) {
  const token = await getToken();

  const response = await fetch(
    `${process.env.API_URL}/rest/v1/tasks?id=eq.${taskId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,

        apiKey: `${process.env.API_KEY}`,
      },
      body: JSON.stringify({ status: newStatus }),
    }
  );

  if (!response.ok) {
    const errorMsg = await response.json();
    return {
      success: false,
      error: `${response.status}: ${errorMsg.message || "No details"}`,
    };
  }

  revalidateTag("tasks", "max");

  return { success: true };
}
