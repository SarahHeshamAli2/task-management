import { getUserData } from "@/lib/actions/auth.actions";
import { getToken } from "@/lib/utils/manage-token";

export default async function Navbar() {
  const userToken = await getToken();

  const userData = await getUserData(userToken);
  const { user_metadata } = userData;

  function getInitials(name: string): string {
    const parts = name.trim().split(/\s+/).filter(Boolean);

    if (parts.length === 0) return "";

    if (parts.length === 1) {
      // single name => take first 2 letters
      return parts[0].slice(0, 2).toUpperCase();
    }

    // multiple names => first and last initials
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  return (
    <div className="bg-background w-full border-b  border-[#0000001A] min-h-16 flex justify-end">
      <div className="flex items-center gap-4 me-6">
        <div className="my-3">
          <p className="text-slate-dark font-semibold text-sm capitalize">
            {user_metadata.name}
          </p>
          <span className="uppercase text-primary text-[10px] font-bold tracking-[1px]">
            {user_metadata.department}
          </span>
        </div>
        <span className="bg-primary-container text-white p-2 rounded-lg">
          {getInitials(user_metadata.name)}
        </span>
      </div>
    </div>
  );
}
