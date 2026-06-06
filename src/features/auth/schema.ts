import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Email format is not valid"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
