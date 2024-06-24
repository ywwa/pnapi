import { z, type ZodSchema } from "zod";
import { Slug } from "./utils";

export const create = z.object({
  name: z.string().min(1).max(128),
  slug: Slug.min(1).max(128).optional(),
  description: z.string().max(50_000).optional(),
});

const updateSchema = z
  .object({
    name: z.string().min(1).max(128),
    slug: Slug.min(1).max(128),
    enabled: z.boolean(),
    description: z.string().max(50_000),
  })
  .partial();

type SchemaType = z.infer<typeof updateSchema>;

export const update: ZodSchema = updateSchema.refine(
  (d) => {
    const keys = Object.keys(d) as (keyof SchemaType)[];
    return keys.some((k) => d[k] !== undefined);
  },
  {
    message: "At least one field must be provided",
    path: ["name", "slug", "enabled", "description"],
  },
);
