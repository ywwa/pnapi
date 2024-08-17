import { z } from "zod";
import { CommandAttemptSchema, DateSchema, ParseError } from "../lib";
import { RevokeReasonEnum, StateEnum } from "../lib/schemas/enum";
import type {
  CommandAttempt,
  RevokeReason,
  SchemaOptions,
  State,
  TResponse,
} from "../types";
import Customer from "./Customer";
import Product from "./Product";
import User from "./User";

namespace Item {
  export class Response {
    /** ID of the item (flake) */
    id: string;
    /** ID of the store (flake) */
    store_id: string;
    /** ID of the customer who owns item (flake) *storefront only */
    customer_id?: string;
    /** Customer who owns item */
    customer: Pick<
      Customer.Response,
      | "id"
      | "store_id"
      | "steam_id"
      | "minecraft_uuid"
      | "steam"
      | "minecraft"
      | "name"
      | "metadata"
      | "created_at"
      | "updated_at"
    >;
    /** The customer who ordered item */
    order_customer: Pick<
      Customer.Response,
      | "id"
      | "store_id"
      | "steam_id"
      | "minecraft_uuid"
      | "steam"
      | "minecraft"
      | "name"
      | "metadata"
      | "created_at"
      | "updated_at"
    > | null;
    /** ID of the subscription (flake) */
    subscription_id: string | null;
    /** ID of the checkout */
    checkout_id: string | null;
    /** ID of the order (flake) */
    order_id: string | null;
    /** ID of the order line (flake) */
    order_line_id: string | null;
    /** The quantity index of item */
    quantity_index: number | null;
    /** Gameserver id where item has to be executed */
    execute_on_gameserver_id: string | null;
    /** Product object (Partial<Product.Response>) */
    product: Pick<
      Product.Response,
      "id" | "store_id" | "version_id" | "slug" | "name"
    >;
    /** Command attempts (CommandAttempt[]) */
    command_attempts: CommandAttempt[] | null;
    /** State of item */
    state: State;
    /** Does item expire */
    expirable: boolean;
    /** Is item gifted */
    gift: boolean;
    /** Date when item was added to customers inventory */
    added_at: Date;
    /** Who added item to customers inventory (User.Response) */
    added_by: Pick<User.Response, "id" | "first_name" | "last_name"> | null;
    /** Date when item becomes active in customers inventory */
    active_at: Date | null;
    /** Date when item expires in customers inventory */
    expires_at: Date | null;
    /** Date when item was removed from customers inventory */
    removed_at: Date | null;
    /** Date when item was revoked from customers inventory */
    revoked_at: Date | null;
    /** Reason why item was revoked */
    revoke_reason: RevokeReason | null;
    /** Who revoked item from customers inventory (User.Response) */
    revoked_by: Pick<User.Response, "id" | "first_name" | "last_name"> | null;

    constructor(
      payload: unknown,
      options?: SchemaOptions<TResponse<typeof Schema>>,
    ) {
      const schema = options?.omit
        ? Schema.omit(options.omit)
        : options?.pick
          ? Schema.pick(options.pick)
          : Schema;

      const item = schema.safeParse(payload);
      if (!item.success) throw new ParseError(item.error);
      Object.assign(this, item.data);
      Object.keys(this).forEach((key) => {
        if (this[key as keyof this] === undefined) {
          delete this[key as keyof this];
        }
      });
    }
  }

  const Schema = z.object({
    id: z.string(),
    store_id: z.string(),
    customer: Customer.Schema.pick({
      id: true,
      store_id: true,
      steam_id: true,
      steam: true,
      minecraft_uuid: true,
      minecraft: true,
      name: true,
      metadata: true,
      created_at: true,
      updated_at: true,
    }),
    order_customer: Customer.Schema.pick({
      id: true,
      store_id: true,
      steam_id: true,
      steam: true,
      minecraft_uuid: true,
      minecraft: true,
      name: true,
      metadata: true,
      created_at: true,
      updated_at: true,
    }).nullable(),
    subscription_id: z.string().nullable(),
    checkout_id: z.string().nullable(),
    order_id: z.string().nullable(),
    order_line_id: z.string().nullable(),
    quantity_index: z.number().nullable(),
    execute_on_gameserver_id: z.string().nullable(),
    product: Product.Schema.pick({
      id: true,
      store_id: true,
      version_id: true,
      slug: true,
      name: true,
    }),
    command_attempts: z.array(CommandAttemptSchema).nullable(),
    state: StateEnum,
    expirable: z.boolean(),
    gift: z.boolean(),
    added_at: DateSchema,
    added_by: User.Schema.pick({
      id: true,
      first_name: true,
      last_name: true,
    }).nullable(),
    active_at: DateSchema.nullable(),
    expires_at: DateSchema.nullable(),
    removed_at: DateSchema.nullable(),
    revoked_at: DateSchema.nullable(),
    revoke_reason: RevokeReasonEnum.nullable(),
    revoked_by: User.Schema.pick({
      id: true,
      first_name: true,
      last_name: true,
    }).nullable(),
  });

  export namespace Assign {
    export class Body {
      product_id?: string;
      product_id_version?: string;
      quantity?: number;

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
        product_id: z.string().optional(),
        product_id_version: z.string().optional(),
        quantity: z.number().optional(),
      })
      .refine((data) => data.product_id || data.product_id_version, {
        message:
          "At least one of product_id or product_id_version must be provided",
        path: ["product_id", "product_id_version"],
      });
  }
}

export default Item;
