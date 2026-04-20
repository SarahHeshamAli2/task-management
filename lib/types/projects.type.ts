type project = {
  id: string;
  name: string;
  description: string;
  created_by: string;
  created_at: string;
};

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  projectsCount: number;
  projectsPerPage: number;
};
export type projectsList = project[];
