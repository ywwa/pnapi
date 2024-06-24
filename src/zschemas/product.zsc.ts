import { ZodSchema, z } from "zod";
import { ScaleEnum, Slug, StageEnum } from "./utils";

export const product = z.object({
  slug: Slug.min(3).max(36).optional(),
  name: z.string().min(1).max(42),
  description: z.string().min(1).max(50_000),

  price: z
    .number()
    .min(0)
    .max(50_000_00)
    .refine((v) => v === 0 || v >= 50, {
      message: "Price should be either 0 or at least 50",
    }),

  allow_one_time_purchase: z.boolean().optional(),
  allow_subscription: z.boolean().optional(),

  subsciption_interval_value: z.number().optional(),
  subsciption_interval_scale: ScaleEnum.optional(),

  remove_after_enabled: z.boolean().optional(),
  remove_after_time_value: z.number().optional(),
  remove_after_time_scale: ScaleEnum.optional(),

  "store_stock_limit.enabled": z.boolean().optional(),
  "store_stock_limit.quantity": z.number().optional(),
  "store_stock_limit.time_value": z.number().optional(),
  "store_stock_limit.time_scale": ScaleEnum.optional(),

  "customer_stock_limit.enabled": z.boolean().optional(),
  "customer_stock_limit.quantity": z.number().optional(),
  "customer_stock_limit.time_value": z.number().optional(),
  "customer_stock_limit.time_scale": ScaleEnum.optional(),

  stock_limit_do_not_include_removed: z.boolean().optional(),

  tags: z.string().array().optional(),
  gameservers: z.string().array().optional(),
  commands: z
    .object({
      stage: StageEnum,
      content: z.string(),
      online_only: z.boolean(),
    })
    .array()
    .optional(),
});

export const create: ZodSchema = product;

const partialProduct = product.partial();

type SchemaType = z.infer<typeof partialProduct>;

export const update: ZodSchema = partialProduct.refine(
  (d) => {
    const keys = Object.keys(d) as (keyof SchemaType)[];
    return keys.some((k) => d[k] !== undefined);
  },
  {
    message: "At least one field must be defined",
    path: [
      "slug",
      "name",
      "description",
      "price",
      "allow_one_time_purchase",
      "allow_subscription",
      "subscription_interval_value",
      "subscription_interval_scale",
      "remove_after_enabled",
      "remove_after_time_value",
      "remove_after_time_scale",
      "store_stock_limit.enabled",
      "store_stock_limit.quantity",
      "store_stock_limit.time_value",
      "store_stock_limit.time_scale",
      "customer_stock_limit.enabled",
      "customer_stock_limit.quantity",
      "customer_stock_limit.time_value",
      "customer_stock_limit.time_scale",
      "stock_limit_do_not_include_removed",
      "tags",
      "gameservers",
      "commands",
    ],
  },
);
