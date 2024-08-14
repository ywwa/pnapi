import { z } from "zod";
import { ScaleEnum } from "./enum";

export const StockLimitSchema = z.object({
  enabled: z.boolean(),
  quantity: z.number(),
  time_value: z.number(),
  time_scale: ScaleEnum,
});

export const StockAvailableSchema = z.object({
  store_available: z.number(),
  customer_available: z.number(),
});
