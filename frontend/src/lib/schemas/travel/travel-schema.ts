import z from "zod";

export const TravelSchema = z.object({
  travelId: z.number().optional(),
  title: z.string().nonempty({ error: "Title is required" }),
  description: z.string().nonempty({ error: "Description is required" }),
  userIds: z.array(z.string()).min(1, { error: "Select at least 1 user." }),
  cityId: z.string({ error: "City is required" }),
  startDate: z.date({ error: "Start date is required" }),
  endDate: z.date({ error: "End date is required" }),
  maxAmountPerDay: z.string({ error: "Max amount per day is required" }),
});

export type TravelSchemaType = z.infer<typeof TravelSchema>;
