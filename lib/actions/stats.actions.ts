"use server";

import { StatsFilters, TasksCountFilter } from "../types/stats.types";
import { getToken } from "../utils/manage-token";

export async function fetchStats(filters: StatsFilters) {
  const token = await getToken();

  const response = await fetch(
    `${process.env.API_URL}/rest/v1/rpc/get_tasks_calendar_stats`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,

        apiKey: `${process.env.API_KEY}`,
      },
      body: JSON.stringify(filters),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch stats");
  }

  return response.json();
}

export async function fetchTasksCount(filters: TasksCountFilter) {
  const token = await getToken();

  const response = await fetch(
    `${process.env.API_URL}/rest/v1/rpc/get_tasks_count_per_project`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,

        apiKey: `${process.env.API_KEY}`,
      },
      body: JSON.stringify(filters),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch tasks count");
  }

  return response.json();
}
