import { z } from "zod";

export const employeeSchema = z.object({
  EMPLOYEE_id: z.string().optional(), // optional if auto-generated

  first_name: z
    .string()
    .min(1, "First name is required")
    .regex(/^[A-Za-z\s]+$/, "First name must contain only letters"),

  last_name: z
    .string()
    .min(1, "Last name is required")
    .regex(/^[A-Za-z\s]+$/, "Last name must contain only letters"),

  other_name: z
    .string()
    .optional(),

  email_address: z
    .string()
    .email("Invalid email address"),

  digital_address: z
    .string()
    .min(1, "Digital address is required"),

  gender: z
    .string()
    .refine(val => ["male", "female", "other"].includes(val.toLowerCase()), {
      message: "Gender must be 'male', 'female', or 'other'",
    }),

  mobile_number: z
    .string()
    .min(1, "Mobile number is required")
    .regex(/^\d{10}$/, "Mobile number must be exactly 10 digits"),

  location: z
    .string()
    .min(1, "Location is required"),

  date_of_employment: z
    .string()
    .min(1, "Date of employment is required")
    .refine(val => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }),

  date_created: z
    .string()
    .optional()
    .refine(val => !val || !isNaN(Date.parse(val)), {
      message: "Invalid date_created format",
    }),

  date_modified: z
    .string()
    .optional()
    .refine(val => !val || !isNaN(Date.parse(val)), {
      message: "Invalid date_modified format",
    }),

  date_deleted: z
    .string()
    .optional()
    .refine(val => !val || !isNaN(Date.parse(val)), {
      message: "Invalid date_deleted format",
    }),

  status: z
    .string()
    .refine(val => ["active", "inactive", "suspended"].includes(val.toLowerCase()), {
      message: "Status must be 'active', 'inactive', or 'suspended'",
    }),

  is_deleted: z
    .boolean()
    .optional(),

  salary: z.preprocess((val) => {
    if (val === "" || val === undefined || val === null) return undefined;
    return Number(val);
  },
  z.number({
    required_error: "Salary is required",
    invalid_type_error: "Salary must be a number",
  }).min(0, "Salary must be a non-negative number")),

  comments: z
    .string()
    .optional(),

  age: z.preprocess((val) => {
    if (val === "" || val === undefined || val === null) return undefined;
    return Number(val);
  },
  z.number({
    required_error: "Age is required",
    invalid_type_error: "Age must be a number",
  }).min(18, "Age must be at least 18")),
});
