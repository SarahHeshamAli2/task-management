import ProjectDetailsIcon from "@/components/icons/project-details-icon";
import ProjectEpicIcon from "@/components/icons/project-epic-icon";
import ProjectMemeberIcon from "@/components/icons/project-member-icon";
import ProjectTaskIcon from "@/components/icons/project-task-icon";
import ProjectIcon from "@/components/icons/projects-icon";

type Tabs = {
  icon: React.ReactElement;
  title: string;
  href: string;
  id: number;
};

export const mainTabsList: Tabs[] = [
  { icon: <ProjectIcon />, title: "Projects", href: "/project", id: 1 },
];

export const projectTabsList: Tabs[] = [
  { icon: <ProjectIcon />, title: "Projects", href: "/project", id: 1 },

  { icon: <ProjectEpicIcon />, title: "Project Epics", href: "epics", id: 2 },
  { icon: <ProjectTaskIcon />, title: "Project Tasks", href: "tasks", id: 3 },
  {
    icon: <ProjectMemeberIcon />,
    title: "Project Members",
    href: "members",
    id: 4,
  },
  {
    icon: <ProjectDetailsIcon />,
    title: "Project Details",
    href: "edit",
    id: 5,
  },
];
