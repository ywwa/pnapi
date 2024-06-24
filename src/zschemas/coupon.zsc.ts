import { z, type ZodSchema } from "zod";
import { codeRegex } from "../lib/utils";
import { DiscountEnum } from "./utils";

const coupon = z.object({
  enabled: z.optional(z.boolean()),
  code: z.string().regex(codeRegex, "Invalid Code").min(1).max(50),
  note: z.optional(z.string()),
  apply_to_tags: z.optional(z.string().array()),
  apply_to_products: z.optional(z.string().array()),
  discount_type: DiscountEnum,
  discount_amount: z.number(),
  discount_apply_individually: z.optional(z.boolean()),
  discount_apply_before_sales: z.optional(z.boolean()),
  usable_by_customer_id: z.optional(z.string()),
  minimum_order_value: z.optional(z.number()),
  redeem_limit_store_enabled: z.optional(z.boolean()),
  redeem_limit_store_amount: z.optional(z.number()),
  redeem_limit_customer_enabled: z.optional(z.boolean()),
  redeem_limit_customer_amount: z.optional(z.number()),
  usable_on_one_time_purchase: z.optional(z.boolean()),
  usable_on_subscription: z.optional(z.boolean()),
  usable_at: z.optional(z.string().datetime()),
  expires_at: z.optional(z.string().datetime()),
});

export const create: ZodSchema = coupon;
const partialCoupon = coupon.partial();
type SchemaType = z.infer<typeof partialCoupon>;
export const update: ZodSchema = coupon.refine(
  (d) => {
    const keys = Object.keys(d) as (keyof SchemaType)[];
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
