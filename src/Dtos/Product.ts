import { z } from "zod";
import {
  DateSchema,
  ParseError,
  ScaleEnum,
  StockAvailableSchema,
  StockLimitSchema,
} from "../lib";
import type { Scale, StockAvailable, StockLimit } from "../types";
import Command from "./Command";
import Gameserver from "./Gameserver";
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
    stock_available: StockAvailable;
    /** an array of tags used to describe the product. */
    tags: Pick<Tag.Response, "id" | "slug" | "name">[];
    /** an array of game servers that product's commands should run on */
    gameservers: Pick<Gameserver.Response, "id" | "name" | "online_only">[];
    /** an array of game servers that product's commands should run on */
    commands: Pick<Command.Response, "stage" | "content" | "online_only">[];
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

    constructor(payload: unknown) {
      const product = Schema.safeParse(payload);
      if (!product.success) throw new ParseError(product.error);
      Object.assign(this, product.data);
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
    stock_available: StockAvailableSchema,
    tags: Tag.Schema.pick({ id: true, slug: true, name: true }).array(),
    gameservers: Gameserver.Schema.pick({
      id: true,
      name: true,
      online_only: true,
    }).array(),
    commands: Command.Schema.pick({
      stage: true,
      content: true,
      online_only: true,
    }).array(),
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
}

export default Product;
