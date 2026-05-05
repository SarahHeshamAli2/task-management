"use client";
import TaskListBoardView from "./_components/tasks-by-status";
import Header from "../../../_components/header";
import BoardViewIcon from "@/components/icons/board-view-icon";
import ListViewIcon from "@/components/icons/list-view-icon";
import { ROUTES } from "@/lib/constants/routes.constants";
import ListView from "./_components/list-view";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useSearchParam } from "@/lib/hooks/use-search-param";

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentView = (searchParams.get("view") as "board" | "list") ?? "board";

  const updateView = (val: "board" | "list") => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", val);
    router.replace(`${pathname}?${params.toString()}`);
  };
  const { searchInput, setSearchInput, debouncedSearch } = useSearchParam(
    searchParams.get("search") ?? ""
  );

  return (
    <>
      <Header
        title="Active Workboard"
        // showSearch
        searchPlaceholder="search tasks..."
        subtitle="Curating Project Alpha's production pipeline and milestones."
        linkHref={ROUTES.project.add}
        viewOptions={[
          { label: "Board View", value: "board", icon: <BoardViewIcon /> },
          { label: "List View", value: "list", icon: <ListViewIcon /> },
        ]}
        selectedView={currentView}
        searchValue={searchInput}
        onSearchChange={setSearchInput}
        onViewChange={(val) => updateView(val as "board" | "list")}
      />
      {currentView === "board" ? (
        <TaskListBoardView search={debouncedSearch} />
      ) : (
        <ListView search={debouncedSearch} />
      )}
    </>
  );
}
