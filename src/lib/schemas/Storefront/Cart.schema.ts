import { number, object, string, type ZodSchema } from "zod";

const lineSchema: ZodSchema = object({
  line_key: string(),
  product_id: string(),
  selected_gameserver_id: string().nullable(),
  selected_gameserver: object({}).nullable(), // ?
  slug: string(),
  name: string(),
  image_url: string().nullable(),
  price: number(),
  quantity: number(),
});

export const cartResponse: ZodSchema = object({
  store_id: string(),
  customer_id: string(),
  lines: lineSchema.array(),
  currency: string(),
  total: number(),
});

export const cartUpdate: ZodSchema = object({
  product_id: string(),
  quantity: number(),
});
