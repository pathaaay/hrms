import { z } from "zod";

export const LoginSchema = z.object({
  email: z.email({ error: "Invalid email" }).nonempty("Email is required"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(8, { error: "Password must be at least 8 characters long" }),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
