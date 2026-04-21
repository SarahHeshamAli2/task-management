import { Members } from "@/lib/types/member.types";
import { getInitials } from "@/lib/utils/get-name-initials";
import { getAvatarColors } from "@/lib/utils/get-random-avatar-color";

const roleBadge: Record<string, string> = {
  OWNER: "bg-blue-600 text-white",
  ADMIN: "bg-slate-100 text-slate-600",
  MEMBER: "bg-slate-100 text-slate-600",
  VIEWER: "bg-slate-100 text-slate-600",
};

export default function MembersTable({ members }: { members: Members }) {
  return (
    <div className=" bg-slate-50 rounded-2xl min-h-104">
      <table className="w-full  bg-white rounded-lg overflow-hidden shadow-md ring-3 ring-[#E8EDFF]">
        <thead className="bg-[#E0E8FF4D] border-b border-slate-200 h-13.5">
          <tr>
            {["Member", "Role", "Actions"].map((h) => (
              <th
                key={h}
                className="px-5 py-3 text-left text-[11px] font-bold tracking-widest text-secondary  uppercase"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {members.data?.map((member) => {
            const colors = getAvatarColors(
              member.member_id ?? member.metadata.name
            );

            return (
              <tr
                key={member.member_id}
                className="border-b last:border-0 border-slate-100 hover:bg-slate-50 transition-colors"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-semibold"
                      style={{ backgroundColor: colors.bg, color: colors.text }}
                    >
                      {getInitials(member.metadata.name)}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-800">
                        {member.metadata.name}
                      </div>
                      <div className="text-xs text-slate-400">
                        {member.metadata.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide ${roleBadge[member.role.toUpperCase()]}`}
                  >
                    {member.role}
                  </span>
                </td>
                {/* <td className="px-5 py-4 text-sm text-slate-500">{m.joined}</td> */}
                <td className="px-5 py-4 text-right">
                  {member.role !== "OWNER" && (
                    <button className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md px-2 py-1 transition-colors text-lg leading-none">
                      ⋮
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
