import { getToken } from "../utils/manage-token";

export async function getAllProjectsService() {
  const token = await getToken();
  const response = await fetch(
    `${process.env.API_URL}/rest/v1/rpc/get_projects`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        apiKey: `${process.env.API_KEY}`,
      },
    }
  );
  if (response.ok) {
    return response.json();
  }
  if (response.status === 401) {
    throw new Error("UNAUTHORIZED");
  }

  throw new Error("NETWORK_ERROR");
}
