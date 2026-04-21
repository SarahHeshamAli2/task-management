import { Suspense } from "react";
import MemberCard from "./_components/member-card";
import MembersTableSkeleton from "@/components/skeletons/members-table-skeleton";

export default async function page({ params }: { params: { id: string } }) {
  const param = await params;
  const id = param.id;
  return (
    <Suspense fallback={<MembersTableSkeleton />}>
      <MemberCard id={id} />
    </Suspense>
  );
}
