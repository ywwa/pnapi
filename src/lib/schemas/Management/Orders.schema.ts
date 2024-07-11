import { z, type ZodSchema } from "zod";
import {
  CurrencyEnum,
  ScaleEnum,
  StatusEnum,
  dateSchema,
} from "../shared.schema";
import { customerResponseSchema } from "./Customers.schema";

const lineSchema = z.object({
  id: z.string(),
  checkout_line_id: z.string(),
  product_id: z.string(),
  product_version_id: z.string(),
  product_name: z.string(),
  product_image_url: z.string().nullable(),
  subscription_interval_value: z.number().nullable(),
  subscription_interval_scale: ScaleEnum.nullable(),
  gift: z.boolean(),
  gift_to_customer: customerResponseSchema.nullable(),
  selected_gameserver_id: z.string().nullable(),
  price: z.number(),
  price_str: z.string(),
  quantity: z.number(),
  discount_amount: z.number(),
  discount_amount_str: z.string(),
  subtotal_amount: z.number(),
  subtotal_amount_str: z.string(),
  tax_amount: z.number(),
  tax_amount_str: z.string(),
  total_amount: z.number(),
  total_amount_str: z.string(),
});

export const orderResponseSchema: ZodSchema = z.object({
  id: z.string(),
  pretty_id: z.string(),
  store_id: z.string(),
  customer: customerResponseSchema,
  status: StatusEnum,
  checkout_id: z.string(),
  subscription_id: z.string().nullable(),
  is_subscription: z.boolean(),
  coupon_id: z.string().nullable(),
  giftcard_id: z.string().nullable(),
  billing_name: z.string(),
  billing_email: z.string(),
  billing_country: z.string(),
  customer_ip: z.string(),
  currency: CurrencyEnum,
  tax_inclusive: z.boolean(),
  discount_amount: z.number(),
  discount_amount_str: z.string(),
  subtotal_amount: z.number(),
  subtotal_amount_str: z.string(),
  tax_amount: z.number(),
  tax_amount_str: z.string(),
  giftcard_usage_amount: z.number(),
  giftcard_usage_amount_str: z.string(),
  total_amount: z.number(),
  total_amount_str: z.string(),
  billing_cycle_sequence: z.number().nullable(),
  lines: lineSchema.array().nullable(),
  created_at: dateSchema,
  completed_at: dateSchema.nullable(),
  canceled_at: dateSchema.nullable(),
});

export const orderLookupSchema: ZodSchema = z
  .object({
    order_id: z.string(),
    subscription_id: z.string(),
    is_subscription: z.boolean(),
    limit: z.number(),
    after: z.string(),
    before: z.string(),
  })
  .partial();
