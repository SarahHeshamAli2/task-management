import { useEffect, useState } from "react";
import { Members } from "@/lib/types/member.types";
import { ParamValue } from "next/dist/server/request/params";

export default function useGetProjectMembers({
  id,
  enabled = true,
}: {
  id: string | ParamValue;
  enabled?: boolean;
}) {
  const [members, setMembers] = useState<Members>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (!enabled || !id) return;

    const getAllProjectMembers = async () => {
      try {
        setIsLoading(true);
        setError(false);

        const response = await fetch(`/api/project-member/${id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.error ?? "Failed to fetch project members");
        }

        setMembers(data.data);
      } catch (err) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getAllProjectMembers();
  }, [enabled, id]);

  return { members, isLoading, error };
}
