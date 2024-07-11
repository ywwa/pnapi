import { z, type ZodSchema } from "zod";
import {
  CurrencyEnum,
  GameEnum,
  Slug,
  Timezone,
  dateSchema,
  memberSchema,
  userSchema,
} from "../shared.schema";
import { formatDate } from "../utils";

export const storeResponseSchema: ZodSchema = z.object({
  id: z.string(),
  owner: userSchema,
  slug: z.string(),
  name: z.string(),
  game: GameEnum,
  currency: CurrencyEnum,
  description: z.string(),
  created_at: dateSchema,
  logo_url: z.string().nullable(),
  logo_square_url: z.string().nullable(),
  updated_by: userSchema.nullable(),
  updated_at: dateSchema.nullable(),
  members: memberSchema.array(),
});

export const dashboardResponseSchema: ZodSchema = z.object({
  store_id: z.string(),
  sales_today: z.number(),
  sales_yesterday: z.number(),
  month_sales: z.number(),
  month_sales_prev: z.number(),
  average_spend_amount: z.number(),
  average_spend_amount_prev: z.number(),
  lifetime_sales: z.number(),
  lifetime_sales_prev: z.number(),
});

export const rangeOrdersResponseSchema: ZodSchema = z
  .object({
    day: dateSchema,
    total: z.number(),
    total_orders: z.number(),
  })
  .array();

export const rangeProductsResponseSchema: ZodSchema = z
  .object({
    store_id: z.string(),
    product_id: z.string(),
    total_lines: z.number(),
    sum_quantity: z.number(),
    total_earnings: z.number(),
    net_earnings: z.number(),
  })
  .array();

export const storeMemberResponseSchema: ZodSchema = z.object({
  user: userSchema,
  role_id: z.string(),
  added_at: dateSchema,
  added_by: userSchema.nullable(),
});

export const storeCreateSchema: ZodSchema = z
  .object({
    name: z.string().min(2).max(24),
    slug: Slug.min(2).max(24),
    currency: CurrencyEnum,
    game: GameEnum,
    description: z.string().min(20).max(400).optional(),
  })
  .refine(
    (data) => {
      if (data.game === "other") return data.description !== undefined;
      return true;
    },
    {
      message: "Description is required for platform 'other'",
      path: ["description"],
    },
  );

export const storeUpdateSchema: ZodSchema = z.object({
  name: z.string().min(2).max(24),
  slug: Slug.min(2).max(24),
});

export const statsDashboardSchema: ZodSchema = z.object({
  tz: Timezone,
});

export const statsRangeSchema: ZodSchema = z.object({
  tz: Timezone,
  start: z.date().transform(formatDate),
  end: z.date().transform(formatDate),
  limit: z.number().min(1).max(100).optional(),
});

export const memberRoleSchema: ZodSchema = z.object({
  role_id: z.string(),
});
