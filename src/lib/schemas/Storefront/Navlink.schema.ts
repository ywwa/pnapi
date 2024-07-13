import { lazy, number, object, string, type ZodSchema } from "zod";

export const navlinkResponse: ZodSchema = object({
  node_id: string(),
  parent_node_id: string().nullable(),
  store_id: string(),
  tag_id: string(),
  tag_slug: string(),
  tag_query: string().array(),
  name: string(),
  order: number(),
  children: lazy(() => navlinkResponse.array()),
});
