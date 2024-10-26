import { z } from "zod";
import { Product, Sale } from "../../Dtos";
import { Storefront } from "../../Endpoints";
import { BaseApi } from "../../lib";
import type { SchemaOptions, TResponse } from "../../types";

export type TProduct = Pick<
  Product.Response,
  | "id"
  | "store_id"
  | "slug"
  | "image_url"
  | "name"
  | "enabled"
  | "description"
  | "single_game_server_only"
  | "price"
  | "sort_order"
  | "allow_one_time_purchase"
  | "allow_subscription"
  | "subscription_interval_value"
  | "subscription_interval_scale"
  | "tags"
  | "created_at"
  | "updated_at"
  | "stock"
  | "pricing"
  | "currency"
>;

type Options = SchemaOptions<TResponse<typeof Product.Schema>>;

const pickSchema: Options["pick"] = {
  id: true,
  store_id: true,
  slug: true,
  image_url: true,
  name: true,
  description: true,
  enabled: true,
  single_game_server_only: true,
  price: true,
  sort_order: true,
  allow_one_time_purchase: true,
  allow_subscription: true,
  subscription_interval_value: true,
  subscription_interval_scale: true,
  tags: true,
  created_at: true,
  updated_at: true,
};

const extendSchema: Options["extend"] = {
  stock: z.object({
    available_to_purchase: z.boolean(),
    customer_available: z.number(),
  }),
  pricing: z.object({
    active_sale: Sale.Schema.pick({
      id: true,
      name: true,
      discount_type: true,
      discount_amount: true,
      minimum_order_value: true,
      begins_at: true,
      ends_at: true,
    }).nullable(),
    vat_rate: z
      .object({
        country_code: z.string(),
        country_name: z.string(),
        currency: z.string(),
        vat_abbreviation: z.string(),
        vat_local_name: z.string(),
        eu_member_state: z.boolean(),
        percentage: z.number(),
      })
      .nullable(),
    regional_pricing: z
      .object({
        region_id: z.string(),
        currency: z.string(),
        tax_inclusive: z.boolean(),
        base_price: z.number(),
      })
      .nullable(),
    price_original: z.number(),
    price_final: z.number(),
  }),
  currency: z.string(),
};

export class ProductApi extends BaseApi {
  public async getAll(
    withMeta: boolean = false,
    storeId?: string,
  ): Promise<TProduct[]> {
    const data = await this.request<TProduct[]>(
      {
        endpoint: Storefront.Products.base,
        headers: { "x-paynow-store-id": this.storeId(storeId) },
      },
      withMeta,
    );

    return data.map(
      (product) =>
        new Product.Response(product, {
          pick: pickSchema,
          extend: extendSchema,
        }),
    );
  }

  public async getByKey(
    key: string,
    withMeta: boolean = false,
    storeId?: string,
  ): Promise<TProduct> {
    const data = await this.request<TProduct>(
      {
        endpoint: Storefront.Products.byIdSlug(key),
        headers: { "x-paynow-store-id": this.storeId(storeId) },
      },
      withMeta,
    );

    return new Product.Response(data, {
      pick: pickSchema,
      extend: extendSchema,
    });
  }
}
