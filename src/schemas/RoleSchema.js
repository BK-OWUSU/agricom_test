import { z } from "zod";

export const RoleSchema = z.object({
  name: z.string().min(2, "Role name must be at least 2 characters"),
  description: z
    .string()
    .min(5, "Description must be at least 5 characters")
    .max(200, "Description must not exceed 200 characters"),
  access: z
    .array(z.string())
    .min(1, "You need to select at least one access route"),
  permissions: z
    .array(z.enum(["Export", "Import", "Create", "Delete", "Edit"]))
    .min(1, "You need to select at least one permission"),
});
