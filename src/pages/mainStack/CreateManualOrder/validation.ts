import { z } from 'zod';

export const manualOrderSchema = z.object({
  lat: z.coerce
    .number()
    .min(-90, "Latitude must be between -90 and 90")
    .max(90, "Latitude must be between -90 and 90"),
  lon: z.coerce
    .number()
    .min(-180, "Longitude must be between -180 and 180")
    .max(180, "Longitude must be between -180 and 180"),
  subtotal: z.coerce
    .number()
    .positive("Amount must be greater than 0")
    .finite("Please enter a valid number"),
});

export type ManualOrderData = z.infer<typeof manualOrderSchema>;