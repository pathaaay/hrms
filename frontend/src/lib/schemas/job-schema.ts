import z from "zod";

export const CreateJobSchema = z.object({
  reviewerIds: z.array(z.string()),
  defaultHrEmail: z
    .email({ error: "Invalid Email" })
    .nonempty({ error: "Default Hr email is required" }),
  jdFileId: z.number().nullable(),
  description: z.string().nonempty({ error: "Job description is required" }),
  jdFile: z.array(z.custom<File>()),
  title: z.string().nonempty({ error: "Job title is required" }),
});

export type CreateJobSchemaType = z.infer<typeof CreateJobSchema>;

export const UpdateJobSchema = z.object({
  jobId: z.string(),
  reviewerIds: z.array(z.string()),
  defaultHrEmail: z
    .email({ error: "Invalid Email" })
    .nonempty({ error: "Default Hr email is required" }),
  jdFileId: z.number().nullable(),
  description: z.string().nonempty({ error: "Job description is required" }),
  title: z.string().nonempty({ error: "Job title is required" }),
});

export type UpdateJobSchemaType = z.infer<typeof UpdateJobSchema>;
