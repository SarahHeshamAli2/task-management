export const ROUTES = {
  project: {
    list: "/project",
    add: "/project/add",
    edit: (id: string | null | undefined) => `/project/${id}/edit`,
    epics: (id: string | null | undefined) => `/project/${id}/epics`,
  },
  epics: {
    list: "/project",
    add: (id: string | null | undefined) => `/project/${id}/epics/new`,

    edit: (id: string | null | undefined) => `/project/${id}/epics/edit`,
  },
  tasks: {
    list: "/project",
    add: (id: string | null | undefined) => `/project/${id}/tasks/new`,
  },
};
