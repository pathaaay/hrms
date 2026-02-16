import z from "zod";

export const TravelSchema = z.object({
  travelId: z.number().optional(),
  title: z.string(),
  description: z.string(),
  userIds: z.array(z.string()),
  cityId: z.string({ error: "City is required" }),
  startDate: z.date({ error: "Start date is required" }),
  endDate: z.date({ error: "End date is required" }),
  maxAmountPerDay: z.string({ error: "Max amount per day is required" }),
});

export type TravelSchemaType = z.infer<typeof TravelSchema>;
