import { z } from "zod";

const today = new Date();
today.setHours(0, 0, 0, 0);

export const addTaskSchema = z.object({
  title: z
    .string()
    .min(3, "Project name must be at least 3 characters.")
    .max(100, "Project name cannot exceed 100 characters."),
  description: z
    .string()
    .max(500, "Description cannot exceed 500 characters.")
    .optional(),
  assignee_id: z.string().nullable().optional(),
  epic_id: z.string().nullable().optional(),
  status: z.string().optional(),
  project_id: z.string(),
  due_date: z
    .string()
    .nullable()
    .optional()
    .refine(
      (val) => !val || new Date(val) >= today,
      "Due date must be today or a future date."
    ),
});

export type TaskFormValues = z.infer<typeof addTaskSchema>;
