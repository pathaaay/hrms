import z from "zod";

export const JobSchema = z.object({
  reviewerIds: z.array(z.string()),
  defaultHrEmail: z
    .email({ error: "Invalid Email" })
    .nonempty({ error: "Default Hr email is required" }),
  jdFileId: z.number().nullable(),
  description: z.string().nonempty({ error: "Job description is required" }),
  title: z.string().nonempty({ error: "Job title is required" }),
});

export type JobSchemaType = z.infer<typeof JobSchema>;