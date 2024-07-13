import { object, string, type ZodSchema } from "zod";

export const tagResponse: ZodSchema = object({
  id: string(),
  slug: string(),
  name: string(),
  description: string().nullable(),
});
