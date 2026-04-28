import { z } from "zod";

const today = new Date();
today.setHours(0, 0, 0, 0);

export const addEpicSchema = z.object({
  title: z
    .string()
    .min(3, "Project name must be at least 3 characters.")
    .max(100, "Project name cannot exceed 100 characters."),
  description: z
    .string()
    .max(500, "Description cannot exceed 500 characters.")
    .optional(),
  assignee_id: z.string().nullable().optional(),
  project_id: z.string(),
  deadline: z
    .string()
    .nullable()
    .optional()
    .refine(
      (val) => !val || new Date(val) >= today,
      "Deadline must be today or a future date."
    ),
});

export type EpicFormValues = z.infer<typeof addEpicSchema>;

export const updateEpicSchema = addEpicSchema
  .pick({
    title: true,
    description: true,
    assignee_id: true,
    deadline: true,
  })
  .partial();

export type UpdateEpicFormValues = z.infer<typeof updateEpicSchema>;
