import { getToken } from "../utils/manage-token";

export async function getTasksService(
  params: Record<string, string | number> = {}
) {
  const token = await getToken();
  const url = new URL(`${process.env.API_URL}/rest/v1/project_tasks`);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, String(value));
  });

  url.searchParams.append("order", "created_at.asc");
  console.log("Tasks URL:", url.toString());

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`,
      apiKey: `${process.env.API_KEY}`,
      "Content-Type": "application/json",
      Prefer: "count=exact",
    },
    cache: "no-store",
    next: { tags: ["tasks"] },
  });

  if (response.status === 401) {
    throw new Error("UNAUTHORIZED");
  }

  if (!response.ok) {
    const error = await response.json().catch(() => null);

    if (error?.code === "PGRST103") {
      return {
        data: [],
        total: 0,
      };
    }

    throw new Error("API_ERROR");
  }

  const data = await response.json();

  const contentRange = response.headers.get("content-range");

  const total = contentRange?.split("/")[1];

  return {
    data,
    total: Number(total),
  };
}
