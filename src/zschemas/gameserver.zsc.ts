import { z, type ZodSchema } from "zod";

export const create: ZodSchema = z.object({
  name: z.string().max(128),
  enabled: z.boolean(),
});

export const update: ZodSchema = z
  .object({
    name: z.string().max(128),
    enabled: z.boolean(),
  })
  .partial()
  .refine((d) => !d.name && !d.enabled, {
    message: "either name or enabled must be provided",
    path: ["name", "enabled"],
  });
