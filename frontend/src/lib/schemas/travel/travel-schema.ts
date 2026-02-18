import z from "zod";

export const TravelSchema = z.object({
  travelId: z.number().optional(),
  title: z.string().nonempty({ error: "Title is required" }),
  description: z.string().nonempty({ error: "Description is required" }),
  userIds: z.array(z.string()).min(1, { error: "Select at least 1 user." }),
  cityId: z.string({ error: "City is required" }),
  startDate: z.date({ error: "Start date is required" }),
  endDate: z.date({ error: "End date is required" }),
  maxAmountPerDay: z
    .number()
    .nonnegative({ error: "Max amount per day cannot be negative" })
    .min(1, { error: "Max amount per day should be greater than 0" }),
});

export type TravelSchemaType = z.infer<typeof TravelSchema>;
