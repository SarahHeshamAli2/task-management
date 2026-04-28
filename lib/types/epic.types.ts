type Asignee = {
  sub: string;
  name: string;
  email: string;
  department: string;
};

export type Epic = {
  assignee: Asignee;
  created_at: string;
  created_by: Asignee;
  deadline: string | null;
  description: string;
  epic_id: string;
  id: string;
  project_id: string;
  title: string;
  assignee_id: string | null;
};

export type EpicList = Epic[];

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  projectsCount: number;
  projectsPerPage: number;
};
