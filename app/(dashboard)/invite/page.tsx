import InviteCard from "./invite-card";

export default async function InvitePage({ searchParams }) {
  const params = await searchParams;

  const token = params?.token;

  if (!token) {
    return null; // also return null instead of undefined
  }

  return <InviteCard token={token} />;
}
