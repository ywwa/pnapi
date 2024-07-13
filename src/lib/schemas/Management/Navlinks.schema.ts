import { number, object, string, type ZodSchema } from "zod";

export const navlinkResponseSchema: ZodSchema = object({
  node_id: string(),
  parent_node_id: string().nullable(),
  store_id: string(),
  tag_id: string(),
  tag_slug: string(),
  name: string(),
  order: number(),
});

export const navlinkCreateSchema: ZodSchema = object({ tag_id: string() });

export const navlinkUpdateSchema: ZodSchema = object({
  parent_node_id: string(),
  tag_id: string(),
  order: number(),
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
