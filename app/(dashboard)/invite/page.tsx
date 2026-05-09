import InviteCard from "./invite-card";

type SearchParams = Promise<{ token?: string }>;

export default async function InvitePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const token = params?.token;

  if (!token) {
    return null;
  }

  return <InviteCard token={token} />;
}
