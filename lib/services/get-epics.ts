import { getToken } from "../utils/manage-token";

export async function getAllEpicsService(
  params: Record<string, string | number> = {}
) {
  const token = await getToken();
  const url = new URL(
    `${process.env.API_URL}/rest/v1/project_epics?project_id=eq.${params.id}`
  );

  Object.entries(params).forEach(([key, value]) => {
    if (key === "id") return;
    url.searchParams.append(key, String(value));
  });
  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`,
      apiKey: `${process.env.API_KEY}`,
      "Content-Type": "application/json",
      Prefer: "count=exact",
    },
    next: { tags: ["epics"] },
  });
  console.log(response, "rr");

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
