import MemberCard from "./_components/member-card";

export default async function page({ params }: { params: { id: string } }) {
  const param = await params;
  const id = param.id;
  return <MemberCard id={id} />;
}
