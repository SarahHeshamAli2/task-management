import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getAllProjectsService } from "../services/get-projects";

export default function UseGetAllProjects() {
  const {
    data: allProjects,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getAllProjectsService(),
  });

  return {
    allProjects,
    isLoading,
    error,
  };
}
