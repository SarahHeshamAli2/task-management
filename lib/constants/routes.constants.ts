export const ROUTES = {
  project: {
    list: "/project",
    add: "/project/add",
    edit: (id: string | null | undefined) => `/project/${id}/edit`,
    epics: (id: string | null | undefined) => `/project/${id}/epics`,
  },
  epics: {
    add: (id: string | null | undefined) => `/project/${id}/epics/new`,

    edit: (id: string | null | undefined) => `/project/${id}/epics/edit`,
  },
  tasks: {
    list: (id: string | null | undefined) => `
/project/${id}/tasks?view=board
`,
    add: (id: string | null | undefined) => `/project/${id}/tasks/new`,
  },
};
