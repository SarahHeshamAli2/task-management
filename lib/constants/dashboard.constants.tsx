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

export const tabsList: Tabs[] = [
  { icon: <ProjectIcon />, title: "Projects", href: "/project", id: 1 },
  {
    icon: <ProjectEpicIcon />,
    title: "Project Epics",
    href: "/projects-epic",
    id: 2,
  },
  {
    icon: <ProjectTaskIcon />,
    title: "Project Tasks",
    href: "/projects-tasks",
    id: 3,
  },
  {
    icon: <ProjectMemeberIcon />,
    title: "Project Members",
    href: "/projects-member",
    id: 4,
  },
  {
    icon: <ProjectDetailsIcon />,
    title: "Project Details",
    href: "/projects-details",
    id: 5,
  },
];
