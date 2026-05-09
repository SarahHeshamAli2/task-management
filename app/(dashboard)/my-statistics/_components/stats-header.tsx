import Header from "../../[project]/_components/header";
import FilterBar from "./filter-bar";

export default function StatsHeader() {
  return (
    <div className="flex flex-col gap-8">
      <Header
        title="Weekly Planner"
        subtitle="Manage your deadlines and track team velocity."
        className="p-0 m-0"
      />

      <FilterBar />
    </div>
  );
}
