const rowConfigs = [
  { name: "w-28" },
  { name: "w-36" },
  { name: "w-24" },
  { name: "w-32" },
  { name: "w-30" },
];

export default function MembersTableSkeleton() {
  return (
    <div className="bg-slate-50 rounded-2xl">
      <table className="w-full bg-white rounded-lg overflow-hidden shadow-md min-h-104 ring-3 ring-[#E8EDFF]">
        <thead className="bg-[#E0E8FF4D] border-b border-slate-200 h-13.5">
          <tr>
            {["Member", "Role", "Actions"].map((h) => (
              <th
                key={h}
                className="px-5 py-3 text-left text-[11px] font-bold tracking-widest text-secondary uppercase"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rowConfigs.map((config, i) => (
            <tr key={i} className="border-b last:border-0 border-slate-100">
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl animate-pulse bg-skeleton shrink-0" />
                  <div className="flex flex-col gap-2">
                    <div
                      className={`h-3.5 ${config.name} rounded-xs animate-pulse bg-skeleton`}
                    />
                    <div />
                  </div>
                </div>
              </td>
              <td className="px-5 py-4">
                <div className="h-6 w-16 rounded-full animate-pulse bg-skeleton" />
              </td>
              <td className="px-5 py-4 text-right">
                <div className="h-6 w-6 rounded-xs animate-pulse bg-skeleton" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
