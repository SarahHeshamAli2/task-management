import { useQuery } from "@tanstack/react-query";
import { getAllProjectsService } from "../services/get-projects";

export default function UseGetAllProjects() {
  const getAllProjects = async () => {
    const response = await fetch("/api/projects");
    return response.json();
  };
  const {
    data: allProjects,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getAllProjects(),
  });

  return {
    allProjects,
    isLoading,
    error,
  };
}
