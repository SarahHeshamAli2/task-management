import { Suspense } from "react";
import EpicList from "./_components/epic-list";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const resolvedParams = await searchParams;
  const page = resolvedParams?.page ?? "1";
  return (
    <Suspense key={page}>
      <EpicList searchParams={resolvedParams} />
    </Suspense>
  );
}
