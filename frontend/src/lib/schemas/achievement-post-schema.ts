import z from "zod";

export const PostSchema = z.object({
  postId: z.number().optional(),
  title: z.string().nonempty({ error: "Default Hr email is required" }),
  description: z.string().nonempty({ error: "Job description is required" }),
  visibleToUserIds: z.array(z.string()),
  newTags: z.array(
    z.object({
      tag: z.string(),
    }),
  ),
  isPublic: z.boolean(),
});
export type PostSchemaType = z.infer<typeof PostSchema>;
