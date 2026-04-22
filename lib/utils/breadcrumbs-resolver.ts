export const breadcrumbResolvers: Record<
  string,
  (id: string) => Promise<string | null>
> = {
  projects: async (id: string) => {
    try {
      const res = await fetch(`/api/project-detail?id=${id}`);
      console.log(res, "rrrr");

      if (!res.ok) return null;

      const { data } = await res.json();
      return data?.[0]?.name ?? null;
    } catch {
      return null;
    }
  },
};
