import { z, type ZodSchema } from "zod";

export const query: ZodSchema = z.object({
  limit: z.number().min(1).max(100).optional(),
  after: z.string().optional(),
  before: z.string().optional(),
  customer_id: z.string().optional(),
});
