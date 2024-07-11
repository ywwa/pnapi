import {
  boolean,
  number,
  object,
  string,
  z,
  infer as zinfer,
  type ZodSchema,
} from "zod";
import {
  ScaleEnum,
  Slug,
  StageEnum,
  dateSchema,
  userSchema,
} from "../shared.schema";

const stockLimitSchema = object({
  enabled: boolean(),
  quantity: number(),
  time_value: number(),
  time_scale: ScaleEnum,
});

const tagSchema = object({
  id: string(),
  slug: Slug,
  name: string(),
});

const gameserverSchema = object({
  id: string(),
  name: string(),
  online_only: boolean(),
});

export const simpleProductResponseSchema: ZodSchema = object({
  id: string(),
  store_id: string(),
  version_id: string(),
  image_url: string().nullable(),
  slug: Slug,
  name: z.string(),
  description: z.string(),
  price: number(),
  created_at: dateSchema,
  updated_at: dateSchema.nullable(),
});

export const productResponseSchema: ZodSchema = object({
  id: string(),
  store_id: string(),
  version_id: string(),
  image_url: string().nullable(),
  slug: Slug,
  name: string(),
  description: string(),
  enabled: boolean(),
  label: string().nullable(),
  sort_order: number(),
  price: number(),
  single_game_server_only: boolean(),
  allow_one_time_purchase: boolean(),
  allow_subscription: boolean(),

  subscription_interval_value: number(),
  subscription_interval_scale: ScaleEnum,

  remove_after_enabled: boolean(),
  remove_after_time_value: number(),
  remove_after_time_scale: ScaleEnum,

  store_stock_limit: stockLimitSchema,
  customer_stock_limit: stockLimitSchema,
  tags: tagSchema.array(),
  gameservers: gameserverSchema.array(),
  created_by: userSchema,
  created_at: dateSchema,
  updated_by: userSchema.nullable(),
  updated_at: dateSchema.nullable(),
});

const productSchema = object({
  slug: Slug.min(3).max(36).optional(),
  name: string().min(1).max(42),
  description: string().min(1).max(50_000),

  price: number()
    .min(0)
    .max(50_000_00)
    .refine((value) => value === 0 || value >= 50, {
      message: "Price should be either 0 or at least 50",
    }),

  allow_one_time_purchase: boolean().optional(),
  allow_subscription: boolean().optional(),

  subsciption_interval_value: number().optional(),
  subsciption_interval_scale: ScaleEnum.optional(),

  remove_after_enabled: boolean().optional(),
  remove_after_time_value: number().optional(),
  remove_after_time_scale: ScaleEnum.optional(),

  "store_stock_limit.enabled": boolean().optional(),
  "store_stock_limit.quantity": number().optional(),
  "store_stock_limit.time_value": number().optional(),
  "store_stock_limit.time_scale": ScaleEnum.optional(),

  "customer_stock_limit.enabled": boolean().optional(),
  "customer_stock_limit.quantity": number().optional(),
  "customer_stock_limit.time_value": number().optional(),
  "customer_stock_limit.time_scale": ScaleEnum.optional(),

  stock_limit_do_not_include_removed: boolean().optional(),

  tags: string().array().optional(),
  gameservers: string().array().optional(),
  commands: object({
    stage: StageEnum,
    content: z.string(),
    online_only: z.boolean(),
  })
    .array()
    .optional(),
});

export const productCreateSchema: ZodSchema = productSchema;

const partialProduct = productSchema.partial();

type ProductUpdateSchemaType = zinfer<typeof partialProduct>;

export const productUpdateSchema: ZodSchema = productSchema.partial().refine(
  (data) => {
    const keys = Object.keys(data) as (keyof ProductUpdateSchemaType)[];
    return keys.some((key) => data[key] !== undefined);
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
