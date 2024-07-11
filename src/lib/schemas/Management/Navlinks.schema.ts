import { z, type ZodSchema } from "zod";

export const navlinkResponseSchema: ZodSchema = z.object({
  node_id: z.string(),
  parent_node_id: z.string().nullable(),
  store_id: z.string(),
  tag_id: z.string(),
  tag_slug: z.string(),
  name: z.string(),
  order: z.number(),
});

export const navlinkCreateSchema: ZodSchema = z.object({ tag_id: z.string() });

export const navlinkUpdateSchema: ZodSchema = z
  .object({
    parent_node_id: z.string(),
    tag_id: z.string(),
    order: z.number(),
  })
  .partial()
  .refine(
    (data) => {
      !data.parent_node_id && !data.tag_id && !data.order;
    },
    {
      message: "At least one field must be provided",
      path: ["parent_node_id", "tag_id", "order"],
    },
  );
