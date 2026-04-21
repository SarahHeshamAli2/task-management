import { getToken } from "../utils/manage-token";

export async function getProjectDetail(id: string) {
  const token = await getToken();

  const response = await fetch(
    `${process.env.API_URL}/rest/v1/rpc/get_projects?id=eq.${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        apiKey: `${process.env.API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (response.status === 401) {
    throw new Error("UNAUTHORIZED");
  }

  if (!response.ok) {
    throw new Error("NETWORK ERROR");
  }

  const data = await response.json();

  return {
    data,
  };
}
