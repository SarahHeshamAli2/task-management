export type Task = {
  id: string;
  task_id: string;
  project_id: string;
  epic_id: string | null;
  title: string;
  description?: string;
  created_by: string;
  created_at: string;
  status: string;
  due_date?: string | null;
  assignee: {
    id: string | null;

    name: string | null;
    department: string | null;
  };
  epic: {
    id: string | null;
    epic_id: string | null;
    title: string | null;
  };
};

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  tasksCount: number;
  tasksPerPage: number;
};
export type TasksList = Task[];
