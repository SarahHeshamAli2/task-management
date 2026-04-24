type User = {
  sub: string;
  name: string;
  email: string;
  department: string;
};

export type Epic = {
  assignee: User;
  created_at: string;
  created_by: User;
  deadline: string;
  description: string;
  epic_id: string;
  id: string;
  project_id: string;
  title: string;
};

export type EpicList = Epic[];

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  projectsCount: number;
  projectsPerPage: number;
};
