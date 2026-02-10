import { z } from "zod";

export const ConfigureGameSchema = z.object({
  name: z.string().nonempty("Name is required"),
  isActive: z.boolean(),
  startTime: z.number().min(1),
  endTime: z.number().min(1),
  bookingCycleHours: z.number().min(1),
  maxSlotDurationInMinutes: z.number().min(1),
  maxPlayersPerSlot: z.number().min(1),
});

export type ConfigureGameSchemaType = z.infer<typeof ConfigureGameSchema>;
