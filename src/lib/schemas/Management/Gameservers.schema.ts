import { z, type ZodSchema } from "zod";

export const gameserverCreateSchema: ZodSchema = z.object({
  name: z.string().min(1).max(128),
  enabled: z.boolean(),
});

export const gameserverUpdateSchema: ZodSchema = z
  .object({
    name: z.string().min(1).max(128).optional(),
    enabled: z.boolean().optional(),
  })
  .refine((data) => data.name === undefined && data.enabled === undefined, {
    message: "At least one of parameters must be provided",
  });
