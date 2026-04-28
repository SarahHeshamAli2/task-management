"use client";

import Avatar from "@/components/shared/avatar";
import UnassignedIcon from "@/components/icons/unassigned-icon";
import { Member } from "@/lib/types/member.types";

type EpicAssigneeFieldProps = {
  members: Member[];
  displayAssigneeName: string;
  currentAvatarSrc: string | null;
  isEditing: boolean;
  isUpdating: boolean;
  onStartEdit: () => void;
  onSelectAssignee: (assigneeId: string) => void;
};

const getMemberAvatar = (member: Member) =>
  member.metadata?.avatar_url ??
  member.metadata?.picture ??
  member.metadata?.avatar ??
  null;

export default function EpicAssigneeField({
  members,
  displayAssigneeName,
  currentAvatarSrc,
  isEditing,
  isUpdating,
  onStartEdit,
  onSelectAssignee,
}: EpicAssigneeFieldProps) {
  return (
    <div>
      <p className="text-slate-dark/40 font-bold text-[10px] uppercase">
        Assignee
      </p>

      {isEditing ? (
        <div className="relative mt-2">
          <div className="min-w-52 rounded border border-slate-light bg-white shadow-sm p-1">
            <button
              type="button"
              className="w-full flex items-center gap-2 rounded px-2 py-2 text-sm hover:bg-surface-low disabled:opacity-50"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => onSelectAssignee("unassigned")}
              disabled={isUpdating}
            >
              <UnassignedIcon />
              <span>Unassigned</span>
            </button>

            {members.map((member) => {
              const avatarSrc = getMemberAvatar(member);
              return (
                <button
                  type="button"
                  key={member.member_id}
                  className="w-full flex items-center gap-2 rounded px-2 py-2 text-sm hover:bg-surface-low disabled:opacity-50"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => onSelectAssignee(member.user_id)}
                  disabled={isUpdating}
                >
                  <Avatar
                    name={member.metadata.name}
                    src={avatarSrc}
                    sizeClassName="w-6 h-6"
                    className="rounded-lg"
                    textClassName="text-[10px]"
                  />
                  <span>{member.metadata.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <button
          type="button"
          className="flex items-center gap-2 text-slate-dark font-medium text-sm mt-2 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onStartEdit();
          }}
        >
          {displayAssigneeName ? (
            <>
              <Avatar
                name={displayAssigneeName}
                src={currentAvatarSrc}
                sizeClassName="w-7 h-7"
                textClassName="text-[10px]"
              />
              <span>{displayAssigneeName}</span>
            </>
          ) : (
            <>
              <UnassignedIcon />
              <span>Unassigned</span>
            </>
          )}
        </button>
      )}
    </div>
  );
}
