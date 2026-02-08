import { z } from "zod";

export const EditProfileSchema = z.object({
  email: z.email({ error: "Invalid email" }).nonempty("Email is required"),
  name: z.email({ error: "Invalid email" }).nonempty("Email is required"),
  date_of_birth: z.date({ error: "Invalid Date" }),
  timezone: z.string({ error: "Timezone is required" }),
});

export type EditProfileSchemaType = z.infer<typeof EditProfileSchema>;
