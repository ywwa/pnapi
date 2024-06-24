import { z, type ZodSchema } from "zod";

export const create: ZodSchema = z.object({ tag_id: z.string() });

export const update: ZodSchema = z.object({
  parent_node_id: z.string().optional(),
  tag_id: z.string(),
  order: z.number(),
});
