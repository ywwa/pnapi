import { date, number, object, string, type ZodSchema } from "zod";
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

export const storeResponseSchema: ZodSchema = object({
  id: string(),
  owner: userSchema,
  slug: string(),
  name: string(),
  game: GameEnum,
  currency: CurrencyEnum,
  description: string(),
  created_at: dateSchema,
  logo_url: string().nullable(),
  logo_square_url: string().nullable(),
  updated_by: userSchema.nullable(),
  updated_at: dateSchema.nullable(),
  members: memberSchema.array(),
});

export const dashboardResponseSchema: ZodSchema = object({
  store_id: string(),
  sales_today: number(),
  sales_yesterday: number(),
  month_sales: number(),
  month_sales_prev: number(),
  average_spend_amount: number(),
  average_spend_amount_prev: number(),
  lifetime_sales: number(),
  lifetime_sales_prev: number(),
});

export const rangeOrdersResponseSchema: ZodSchema = object({
  day: dateSchema,
  total: number(),
  total_orders: number(),
}).array();

export const rangeProductsResponseSchema: ZodSchema = object({
  store_id: string(),
  product_id: string(),
  total_lines: number(),
  sum_quantity: number(),
  total_earnings: number(),
  net_earnings: number(),
}).array();

export const storeMemberResponseSchema: ZodSchema = object({
  user: userSchema,
  role_id: string(),
  added_at: dateSchema,
  added_by: userSchema.nullable(),
});

export const storeCreateSchema: ZodSchema = object({
  name: string().min(2).max(24),
  slug: Slug.min(2).max(24),
  currency: CurrencyEnum,
  game: GameEnum,
  description: string().min(20).max(400).optional(),
}).refine(
  (data) => {
    if (data.game === "other") return data.description !== undefined;
    return true;
  },
  {
    message: "Description is required for platform 'other'",
    path: ["description"],
  },
);

export const storeUpdateSchema: ZodSchema = object({
  name: string().min(2).max(24),
  slug: Slug.min(2).max(24),
});

export const statsDashboardSchema: ZodSchema = object({
  tz: Timezone,
});

export const statsRangeSchema: ZodSchema = object({
  tz: Timezone,
  start: date().transform(formatDate),
  end: date().transform(formatDate),
  limit: number().min(1).max(100).optional(),
});

export const memberRoleSchema: ZodSchema = object({
  role_id: string(),
});
