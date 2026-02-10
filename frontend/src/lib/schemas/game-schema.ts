import { z } from "zod";

export const ConfigureGameSchema = z.object({
  id: z.string(),
  name: z.string().nonempty("Name is required"),
  isActive: z.boolean(),
  startTime: z.string().nonempty("This field is required"),
  endTime: z.string().nonempty("This field is required"),
  bookingCycleHours: z.string().nonempty("This field is required"),
  maxSlotDurationInMinutes: z.string().nonempty("This field is required"),
  maxPlayersPerSlot: z.string().nonempty("This field is required"),
});

export type ConfigureGameSchemaType = z.infer<typeof ConfigureGameSchema>;
