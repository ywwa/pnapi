import { z } from "zod";
import {
  DateSchema,
  ParseError,
  PriceSchema,
  SlugSchema,
  StockAvailableSchema,
  StockLimitSchema,
  validateRemoveAfter,
  validateSubscription,
} from "../lib";
import { ScaleEnum } from "../lib/schemas/enum";
import type {
  Scale,
  SchemaOptions,
  StockAvailable,
  StockLimit,
  TResponse,
} from "../types";
import Command from "./Command";
import Gameserver from "./Gameserver";
import Sale from "./Sale";
import Tag from "./Tag";
import User from "./User";

namespace Product {
  export class Response {
    /** ID of the product (flake) */
    id: string;
    /** ID of the store (flake) */
    store_id: string;
    /** Version ID of the product (flake) */
    version_id: string;
    /** URL of the product image */
    image_url: string | null;
    /** URL-safe product name */
    slug: string;
    /** Name of the product */
    name: string;
    /** Description of the product */
    description: string;
    /** Is product enabled */
    enabled: boolean;
    /** Label of the product */
    label: string | null;
    /** Order of the product */
    sort_order: number;
    /** Price of the product */
    price: number;
    /** Is product purchasable only in one game server */
    single_game_server_only: boolean;
    /** whether this product can be purchased one time (without subscribing) */
    allow_one_time_purchase: boolean;
    /** whether this product can be subscribed to */
    allow_subscription: boolean;
    /** the interval value at which this product will renew when subscribed */
    subscription_interval_value: number;
    /** the interval scale at which this product will renew when subscribed. */
    subscription_interval_scale: Scale;
    /** whether this product should be auto-removed from the customer's */
    remove_after_enabled: boolean;
    /** the time value at which this product will be removed */
    remove_after_time_value: number;
    /** the time scale at which this product will be automatically removed. */
    remove_after_time_scale: Scale;
    /** the stock configuration for this product. The configured limits are applied across the entire store. */
    store_stock_limit: StockLimit;
    /** the stock configuration for this product. The configured limits are applied to one customer. */
    customer_stock_limit: StockLimit;
    /** whether the stock limiter should not include items that have been removed from a customer's inventory. */
    stock_limit_do_not_include_removed: boolean;
    /** STOCK_AVAILABLE */
    stock_available: StockAvailable | null;
    /** an array of tags used to describe the product. */
    tags: Pick<Tag.Response, "id" | "slug" | "name">[] | null;
    /** an array of game servers that product's commands should run on */
    gameservers:
      | Pick<Gameserver.Response, "id" | "name" | "online_only">[]
      | null;
    /** an array of game servers that product's commands should run on */
    commands:
      | Pick<Command.Response, "stage" | "content" | "online_only">[]
      | null;
    /** the user that created this product. (User) */
    created_by: Pick<
      User.Response,
      "id" | "first_name" | "last_name" | "email"
    > | null;
    /** Date when product was created */
    created_at: Date;
    /** the user that updated the product. (User) */
    updated_by: Pick<
      User.Response,
      "id" | "first_name" | "last_name" | "email"
    > | null;
    /** Date when product was last updated */
    updated_at: Date | null;

    // Following properties are available only in storefront api

    stock?: {
      available_to_purchase: boolean;
      customer_available: number;
    };

    pricing?: {
      active_sale: Pick<
        Sale.Response,
        | "id"
        | "name"
        | "discount_type"
        | "discount_amount"
        | "minimum_order_value"
        | "begins_at"
        | "ends_at"
      > | null;
      vat_rate: {
        country_code: string;
        country_name: string;
        currency: string;
        vat_abbreviation: string;
        vat_local_name: string;
        eu_member_state: boolean;
        percentage: number;
      } | null;
      regional_pricing: {
        region_id: string;
        currency: string;
        tax_inclusive: boolean;
        base_price: number;
      } | null;
      price_original: number;
      price_final: number;
    };

    currency?: string;

    constructor(
      payload: unknown,
      options?: SchemaOptions<TResponse<typeof Schema>>,
    ) {
      let schema = options?.omit
        ? Schema.omit(options.omit)
        : options?.pick
          ? Schema.pick(options.pick)
          : Schema;

      schema = options?.extend ? schema.extend(options.extend) : schema;

      const product = schema.safeParse(payload);
      if (!product.success) throw new ParseError(product.error);
      Object.assign(this, product.data);
      Object.keys(this).forEach((key) => {
        if (this[key as keyof this] === undefined)
          delete this[key as keyof this];
      });
    }
  }

  export const Schema = z.object({
    id: z.string(),
    store_id: z.string(),
    version_id: z.string(),
    image_url: z.string().nullable(),
    slug: z.string(),
    name: z.string(),
    description: z.string(),
    enabled: z.boolean(),
    label: z.string().nullable(),
    sort_order: z.number().nullable(),
    price: z.number(),
    single_game_server_only: z.boolean(),
    allow_one_time_purchase: z.boolean(),
    allow_subscription: z.boolean(),
    subscription_interval_value: z.number(),
    subscription_interval_scale: ScaleEnum,
    remove_after_enabled: z.boolean(),
    remove_after_time_value: z.number(),
    remove_after_time_scale: ScaleEnum,
    store_stock_limit: StockLimitSchema,
    customer_stock_limit: StockLimitSchema,
    stock_limit_do_not_include_removed: z.boolean(),
    stock_available: StockAvailableSchema.nullable(),
    tags: Tag.Schema.pick({ id: true, slug: true, name: true })
      .array()
      .nullable(),
    gameservers: Gameserver.Schema.pick({
      id: true,
      name: true,
      online_only: true,
    })
      .array()
      .nullable(),
    commands: Command.Schema.pick({
      stage: true,
      content: true,
      online_only: true,
    })
      .array()
      .nullable(),
    created_by: User.Schema.pick({
      id: true,
      first_name: true,
      last_name: true,
      email: true,
    }).nullable(),
    created_at: DateSchema,
    updated_by: User.Schema.pick({
      id: true,
      first_name: true,
      last_name: true,
      email: true,
    }).nullable(),
    updated_at: DateSchema.nullable(),
  });

  export namespace Create {
    export class Body {
      name: string;
      slug: string;
      price: number;
      enabled: boolean;
      single_game_server_only?: boolean;
      label?: string;
      description: string;
      tags?: string[];
      gameservers?: string[];
      commands?: Pick<Command.Response, "stage" | "content" | "online_only">[];
      allow_one_time_purchase?: boolean;
      allow_subscription?: boolean;
      subscription_interval_value?: number;
      subscription_interval_scale?: Scale;
      remove_after_enabled?: boolean;
      remove_after_time_value?: number;
      remove_after_time_scale?: Scale;
      store_stock_limit?: StockLimit;
      customer_stock_limit?: StockLimit;

      constructor(payload: unknown) {
        const body = Schema.safeParse(payload);
        if (!body.success) throw new ParseError(body.error);
        Object.assign(this, body.data);
        Object.keys(this).forEach((key) => {
          this[key as keyof this] === undefined &&
            delete this[key as keyof this];
        });
      }
    }

    const Schema = z
      .object({
        name: z.string().min(2).max(128),
        slug: SlugSchema,
        price: PriceSchema,
        enabled: z.boolean(),
        single_game_server_only: z.boolean().optional(),
        label: z.string().max(30).optional(),
        description: z.string().min(1).max(50000),
        tags: z.string().array().optional(),
        gameservers: z.string().array().optional(),
        commands: Command.Schema.pick({
          stage: true,
          content: true,
          online_only: true,
        })
          .array()
          .optional(),
        allow_one_time_purchase: z.boolean().optional(),
        allow_subscription: z.boolean().optional(),
        subscription_interval_value: z.number().optional(),
        subscription_interval_scale: z
          .enum(["day", "week", "month", "year"])
          .optional(),
        remove_after_enabled: z.boolean().optional(),
        remove_after_time_value: z.number().optional(),
        remove_after_time_scale: z
          .enum(["day", "week", "month", "year"])
          .optional(),
        store_stock_limit: StockLimitSchema.optional(),
        customer_stock_limit: StockLimitSchema.optional(),
      })
      .superRefine((data, ctx) => {
        validateSubscription(data, ctx);
        validateRemoveAfter(data, ctx);
      });
  }

  export namespace Update {
    export class Body {
      name?: string;
      slug?: string;
      description?: string;
      price?: number;
      enabled?: boolean;
      allow_one_time_purchase?: boolean;
      subscription_interval_value?: number;
      subscription_interval_scale?: Scale;
      remove_after_enabled?: boolean;
      remove_after_time_value?: number;
      remove_after_time_scale?: Scale;
      store_stock_limit?: Partial<StockLimit>;
      customer_stock_limit?: Partial<StockLimit>;
      stock_limit_do_not_include_removed?: boolean;
      tags?: string[];
      gameservers?: string[];
      commands?: Pick<Command.Response, "stage" | "content" | "online_only">[];

      constructor(payload: unknown) {
        const body = Schema.safeParse(payload);
        if (!body.success) throw new ParseError(body.error);
        Object.assign(this, body.data);
        Object.keys(this).forEach((key) => {
          this[key as keyof this] === undefined &&
            delete this[key as keyof this];
        });
      }
    }

    const Schema = z.object({
      name: z.string().min(2).max(128).optional(),
      slug: SlugSchema.min(2).max(128).optional(),
      description: z.string().min(1).max(50000).optional(),
      price: PriceSchema.optional(),
      enabled: z.boolean().optional(),
      allow_one_time_purchase: z.boolean().optional(),
      allow_subscription: z.boolean().optional(),
      subscription_interval_value: z.number().optional(),
      subscription_interval_scale: ScaleEnum.optional(),
      remove_after_enabled: z.boolean().optional(),
      remove_after_time_value: z.number().optional(),
      remove_after_time_scale: ScaleEnum.optional(),
      store_stock_limit: StockLimitSchema.optional(),
      customer_stock_limit: StockLimitSchema.optional(),
      stock_limit_do_not_include_removed: z.boolean().optional(),
      tags: z.string().array().optional(),
      gameservers: z.string().array().optional(),
      commands: Command.Schema.pick({
        stage: true,
        content: true,
        online_only: true,
      }).array(),
    });
  }
}

export default Product;
