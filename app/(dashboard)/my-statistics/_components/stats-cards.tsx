import AlertIcon from "@/components/icons/alert-icon";
import StatsCardIcon from "@/components/icons/stats-card-icon";
import TaskCheckIcon from "@/components/icons/task-check-icon";

type Stat = {
  label: string;
  value: string;
  icon: React.ReactNode;
  iconBg: string;
  valueColor: string;
};

function StatCard({ label, value, icon, iconBg, valueColor }: Stat) {
  return (
    <div className="bg-white flex md:flex-row flex-col-reverse md:items-center justify-between md:p-6 p-4 rounded-lg min-w-35  border border-gray-100 shadow-sm ">
      <div>
        <p className="uppercase text-[#041B3C99] text-xs font-bold">{label}</p>
        <p className={`${valueColor} font-bold text-3xl mt-1`}>{value}</p>
      </div>
      <div
        className={`${iconBg} w-12 h-12 flex items-center justify-center rounded-xs`}
      >
        {icon}
      </div>
    </div>
  );
}

type StatsCardProps = {
  totalTasks: string;
  completedTasks: string;
  overDueTasks: string;
};

export default function StatsCard({
  totalTasks,
  completedTasks,
  overDueTasks,
}: StatsCardProps) {
  const stats: Stat[] = [
    {
      label: "Total Tasks",
      value: totalTasks,
      icon: <StatsCardIcon />,
      iconBg: "bg-[#0052CC1A]",
      valueColor: "text-slate-dark",
    },
    {
      label: "Completed Tasks",
      value: completedTasks,
      icon: <TaskCheckIcon />,
      iconBg: "bg-[#0068441A]",
      valueColor: "text-slate-dark",
    },
    {
      label: "Overdue Tasks",
      value: overDueTasks,
      icon: <AlertIcon />,
      iconBg: "bg-[#FFDAD633]",
      valueColor: "text-error",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-35 sm:gap-6 px-4 py-4 sm:px-6 overflow-auto">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}
