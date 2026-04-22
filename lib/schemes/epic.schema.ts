import { z } from "zod";

export const addEpicSchema = z.object({
  title: z
    .string()
    .min(3, "Project name must be at least 3 characters.")
    .max(100, "Project name cannot exceed 100 characters."),
  description: z
    .string()
    .max(500, "Description cannot exceed 500 characters.")
    .optional(),
  assignee_id: z.string().min(1, "Assignee is required"),
  project_id: z.string(),
  deadline: z.string().min(1, "Deadline is required"),
});

export type EpicFormValues = z.infer<typeof addEpicSchema>;
