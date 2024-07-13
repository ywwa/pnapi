import { boolean, number, object, preprocess, string } from "zod";
import {
  CurrencyEnum,
  dateSchema,
  DiscountEnum,
  ScaleEnum,
} from "../shared.schema";

const saleSchema = object({
  id: string(),
  name: string(),
  discount_type: DiscountEnum,
  discount_amount: number(),
  minimum_order_value: number(),
  begins_at: dateSchema,
  ends_at: dateSchema.nullable(),
});

const vatrateSchema = object({
  country_code: string(),
  country_name: string(),
  currency: preprocess((val) => {
    if (typeof val === "string") return val.toLowerCase();
    return val;
  }, CurrencyEnum),
  vat_abbreviation: string(),
  vat_local_name: string(),
  eu_member_state: boolean(),
  percentage: number(),
});

export const productResponse = object({
  id: string(),
  store_id: string(),
  slug: string(),
  image_url: string().nullable(),
  name: string(),
  description: string(),
  enabled: boolean(),
  single_game_server_only: boolean(),
  price: number(),
  sort_order: number(),
  allow_one_time_purchase: boolean(),
  subscription_interval_value: number(),
  subscription_interval_scale: ScaleEnum,
  stock: object({
    available_to_purchase: boolean(),
    customer_available: number(),
  }),
  pricing: object({
    active_sale: saleSchema.nullable(),
    vat_rate: vatrateSchema,
    price_original: number(),
    price_final: number(),
  }),
  tags: object({ id: string(), slug: string(), name: string() })
    .array()
    .nullable(),

  currency: string(),
  created_at: dateSchema,
  updated_at: dateSchema.nullable(),
});
