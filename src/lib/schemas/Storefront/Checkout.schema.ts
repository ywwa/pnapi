import { boolean, number, object, string, type ZodSchema } from "zod";

export const checkoutRequest: ZodSchema = object({
  subscription: boolean(),
  lines: object({
    product_id: string(),
    gift_to: object({
      platform: string(),
      id: string(),
    }).optional(),
    gift_to_customer_id: string().optional(),
    quantity: number(),
  }).array(),
});
