import { boolean, object, string, type infer as zinfer } from "zod";
import { Slug, dateSchema, userSchema } from "../shared.schema";

export const simpleTagResponseSchema = object({
  id: string(),
  store_id: string(),
  slug: Slug,
  name: string(),
  description: string().nullable(),
  created_at: dateSchema,
  updated_at: dateSchema.nullable(),
});

export const tagResponseSchema = object({
  id: string(),
  store_id: string(),
  slug: Slug,
  name: string(),
  description: string().nullable(),
  enabled: boolean(),
  created_by: userSchema.nullable(),
  created_at: dateSchema,
  updated_by: userSchema.nullable(),
  updated_at: dateSchema.nullable(),
});

export const tagCreateSchema = object({
  name: string().min(1).max(128),
  slug: Slug.min(1).max(128).optional(),
  description: string().max(50_000).optional(),
});

const tagUpdate = object({
  name: string().min(1).max(128),
  slug: Slug.min(1).max(128),
  description: string().max(50_000),
  enabled: boolean(),
}).partial();

type TagUpdateType = zinfer<typeof tagUpdate>;

export const tagUpdateSchema = tagUpdate.refine(
  (data) => {
    const keys = Object.keys(data) as (keyof TagUpdateType)[];
    return keys.some((key) => data[key] !== undefined);
  },
  {
    message: "At least one field must be provided",
    path: ["name", "slug", "description", "enabled"],
  },
);
