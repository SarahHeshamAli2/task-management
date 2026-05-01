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
  totalCount: number;
  perPage: number;
  label?: string;
};
export type projectsList = project[];
