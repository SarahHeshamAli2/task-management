export type Task = {
  id: string;
  task_id: string;
  project_id: string;
  epic_id: string;
  title: string;
  description?: string;
  created_by: string;
  created_at: string;
  status: string;
  due_date?: string;
  assignee: {
    name: string;
    department: string;
  };
  epic: {
    epic_id: string;
    title: string;
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
