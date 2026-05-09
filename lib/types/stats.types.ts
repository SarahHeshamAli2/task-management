export interface StatsFilters {
  p_start_date: string;
  p_end_date: string;
  p_project_id: string | null;
  p_status: string | null;
}
export type TasksCountFilter = {
  p_start_date: string;
  p_end_date: string;
};
export interface TasksStas {
  project_id: string;
  project_name: string;
  tasks_count: number;
}
