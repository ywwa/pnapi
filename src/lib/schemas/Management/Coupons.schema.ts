import {
  ZodSchema,
  boolean,
  date,
  number,
  object,
  string,
  infer as zinfer,
} from "zod";
import { Code, DiscountEnum, dateSchema, userSchema } from "../shared.schema";
import { customerResponseSchema } from "./Customers.schema";
import { simpleProductResponseSchema } from "./Products.schema";
import { simpleTagResponseSchema } from "./Tags.schema";

export const couponResponseSchema: ZodSchema = object({
  id: string(),
  store_id: string(),
  enabled: boolean(),
  code: Code,
  note: string().nullable(),
  apply_to_tags: simpleTagResponseSchema.array(),
  apply_to_products: simpleProductResponseSchema.array(),
  discount_type: DiscountEnum,
  discount_amount: number(),
  discount_apply_individually: boolean(),
  discount_apply_before_sales: boolean(),
  usable_by_customer: customerResponseSchema.nullable(),
  minimum_order_value: number(),
  redeem_limit_store_enabled: boolean(),
  redeem_limit_store_amount: number(),
  redeem_limit_customer_enabled: boolean(),
  redeem_limit_customer_amount: number(),
  usable_on_one_time_purchase: boolean(),
  usable_on_subscription: boolean(),
  usable_at: dateSchema,
  expires_at: dateSchema.nullable(),
  created_by: userSchema.nullable(),
  created_at: dateSchema,
  updated_by: userSchema.nullable(),
  updated_at: dateSchema.nullable(),
});

export const couponSchema = object({
  enabled: boolean().optional(),
  code: Code.min(1).max(50),
  note: string().optional(),
  apply_to_tags: string().array().optional(),
  apply_to_products: string().array().optional(),
  discount_type: DiscountEnum,
  discount_amount: number(),
  discount_apply_individually: boolean().optional(),
  discount_apply_before_sales: boolean().optional(),
  usable_by_customer_id: string().optional(),
  minimum_order_value: number().optional(),
  redeem_limit_store_enabled: boolean().optional(),
  redeem_limit_store_amount: number().optional(),
  redeem_limit_customer_enabled: boolean().optional(),
  redeem_limit_customer_amount: number().optional(),
  usable_on_one_time_purchase: boolean().optional(),
  usable_on_subscription: boolean().optional(),
  usable_at: date().optional(),
  expires_at: date().optional(),
});

export const couponCreateSchema: ZodSchema = couponSchema;

const partialCouponSchema = couponSchema.partial();
type CouponUpdateType = zinfer<typeof partialCouponSchema>;
export const couponUpdateSchema: ZodSchema = couponSchema.refine(
  (d) => {
    const keys = Object.keys(d) as (keyof CouponUpdateType)[];
    return keys.some((k) => d[k] !== undefined);
  },
  {
    message: "At least one field must be provided",
    path: [
      "enabled",
      "code",
      "note",
      "apply_to_tags",
      "apply_to_products",
      "discount_type",
      "discount_apply_individually",
      "discount_apply_before_sales",
      "usable_by_customer_id",
      "minimum_order_value",
      "redeem_limit_store_enabled",
      "redeem_limit_store_amount",
      "redeem_limit_customer_enabled",
      "redeem_limit_customer_amount",
      "usable_on_one_time_purchase",
      "usable_on_subscription",
      "usable_at",
      "expires_at",
    ],
  },
);
