import z from "zod";

export const JobSchema = z.object({
  reviewerIds: z.array(z.string()),
  defaultHrEmail: z
    .email({ error: "Invalid Email" })
    .nonempty({ error: "Default Hr email is required" }),
  jdFileId: z.number().nullable(),
  description: z.string().nonempty({ error: "Job description is required" }),
  title: z.string().nonempty({ error: "Job title is required" }),
  isActive: z.boolean(),
});

export type JobSchemaType = z.infer<typeof JobSchema>;

export const ReferFriendByEmailsSchema = z.object({
  jobId: z.number(),
  emails: z
    .array(
      z.object({
        email: z.email("Enter a valid email address."),
      }),
    )
    .min(1, "Add at least one email address."),
});

export type ReferFriendByEmailsSchemaType = z.infer<
  typeof ReferFriendByEmailsSchema
>;

export const ReferFriendSchema = z.object({
  jobId: z.number(),
  name: z.string(),
  email: z.email().optional().or(z.literal("")),
  cvFileId: z.number().nullable(),
  shortNote: z.string(),
});

export type ReferFriendSchemaType = z.infer<typeof ReferFriendSchema>;
