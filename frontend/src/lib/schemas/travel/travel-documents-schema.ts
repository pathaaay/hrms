import z from "zod";

export const TravelDocumentSchema = z.object({
  travelId: z.number(),
  title: z.string(),
  documentId: z.number().nullable(),
  travelDocumentId: z.number().optional(),
  addedForId: z.string().nullable(),
});

export type TravelDocumentSchemaType = z.infer<typeof TravelDocumentSchema>;
