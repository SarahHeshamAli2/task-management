import { cookies } from "next/headers";

export async function getAllProjectsService() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
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
