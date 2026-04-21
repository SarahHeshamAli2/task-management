import CompassIcon from "@/components/icons/compass-icon";
import FilesIcon from "@/components/icons/files-icon";
import PlusIcon from "@/components/icons/plus-icon";
import RulerIcon from "@/components/icons/ruler-icon";
import Button from "@/components/ui/button";
import Link from "next/link";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-full">
      <div
        className="bg-surface-low min-w-[288px] h-72 rounded-lg relative flex items-center justify-center"
        style={{
          background:
            "linear-gradient(#f1f3ff, #f1f3ff) padding-box, linear-gradient(to bottom right, #003D9B40, transparent) border-box",
          borderTop: "10px solid transparent ",
          borderLeft: "10px solid transparent ",
        }}
      >
        <div className="bg-surface-highest w-24 h-24 flex items-center justify-center rounded-xl drop-shadow-slate-dark/5 drop-shadow-xl">
          <CompassIcon />
        </div>
        <div className="absolute bg-white h-12 w-12 rounded-sm flex items-center justify-center top-8 inset-e-8 -rotate-6">
          <FilesIcon />
        </div>
        <div className="absolute bg-white h-12 w-12 rounded-sm flex items-center justify-center bottom-8 inset-s-8 rotate-6">
          <RulerIcon />
        </div>
      </div>

      <h3 className="font-semibold text-4xl mt-11">No Projects</h3>
      <p className="leading-7 text-secondary max-w-108.5 text-lg text-center mt-4 mb-11">
        You don’t have any projects yet. Start by defining your first
        architectural workspace to begin tracking tasks and epics.
      </p>
      <Button className="px-8" iconClassName="me-3" leftIcon={<PlusIcon />}>
        <Link href={"/project/add"}>Create New Project</Link>
      </Button>
    </div>
  );
}
