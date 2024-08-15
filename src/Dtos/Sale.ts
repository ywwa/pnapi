import { z } from "zod";
import { DateSchema, ParseError, validateDiscount } from "../lib";
import { DiscountTypeEnum } from "../lib/schemas/enum";
import { DiscountType } from "../types";
import Product from "./Product";
import Tag from "./Tag";
import User from "./User";

namespace Sale {
  export class Response {
    /** ID of the sale (flake) */
    id: string;
    /** ID of the store (flake) */
    store_id: string;
    /** Whether the sale is enabled */
    enabled: boolean;
    /** Name of the sale */
    name: string;
    /** What tags does sale apply to */
    apply_to_tags:
      | Pick<
          Tag.Response,
          | "id"
          | "store_id"
          | "slug"
          | "name"
          | "description"
          | "created_at"
          | "updated_at"
        >[]
      | null;
    /** What products does sale apply to */
    apply_to_products:
      | Pick<
          Product.Response,
          | "id"
          | "store_id"
          | "version_id"
          | "image_url"
          | "slug"
          | "name"
          | "description"
          | "price"
          | "created_at"
          | "updated_at"
        >[]
      | null;
    /** Sale type */
    discount_type: DiscountType;
    /** Discountable amount */
    discount_amount: number;
    /** Minimum order value for sale to apply */
    minimum_order_value: number;
    /** Date when sale starts */
    begins_at: Date;
    /** Date when sale ends */
    ends_at: Date | null;
    /** User who created the sale (User) */
    created_by: Pick<User.Response, "id" | "first_name" | "last_name"> | null;
    /** Date when sale was created */
    created_at: Date;
    /** User who last updated the sale (User) */
    updated_by: Pick<User.Response, "id" | "first_name" | "last_name"> | null;
    /** Date when sale was last updated */
    updated_at: Date | null;

    constructor(payload: unknown) {
      const sale = Schema.safeParse(payload);
      if (!sale.success) throw new ParseError(sale.error);
      Object.assign(this, sale.data);
    }
  }

  export const Schema = z.object({
    id: z.string(),
    store_id: z.string(),
    enabled: z.boolean(),
    name: z.string(),
    apply_to_tags: Tag.Schema.pick({
      id: true,
      store_id: true,
      slug: true,
      name: true,
      description: true,
      created_at: true,
      updated_at: true,
    })
      .array()
      .nullable(),
    apply_to_products: Product.Schema.pick({
      id: true,
      store_id: true,
      version_id: true,
      image_url: true,
      slug: true,
      name: true,
      description: true,
      price: true,
      created_at: true,
      updated_at: true,
    })
      .array()
      .nullable(),
    discount_type: DiscountTypeEnum,
    discount_amount: z.number(),
    begins_at: DateSchema,
    ends_at: DateSchema.nullable(),
    created_by: User.Schema.pick({
      id: true,
      first_name: true,
      last_name: true,
    }).nullable(),
    created_at: DateSchema,
    updated_by: User.Schema.pick({
      id: true,
      first_name: true,
      last_name: true,
    }).nullable(),
    updated_at: DateSchema.nullable(),
  });

  export namespace Create {
    export class Body {
      name: string;
      enabled?: boolean;
      begins_at?: Date | string;
      ends_at?: Date | string;
      discount_type?: DiscountType;
      discount_amount: number;
      apply_to_products?: string[];
      apply_to_tags?: string[];
      minimum_order_value?: number;

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
        name: z.string().min(1).max(50),
        enabled: z.boolean().default(true),
        begins_at: z
          .date()
          .transform((date) => date.toJSON())
          .optional(),
        ends_at: z
          .date()
          .transform((date) => date.toJSON())
          .optional(),
        discount_type: DiscountTypeEnum.default(DiscountType.Percent),
        discount_amount: z.number(),
        apply_to_products: z.string().array().optional(),
        apply_to_tags: z.string().array().optional(),
        minimum_order_value: z.number().max(10000000).optional(),
      })
      .superRefine((data, ctx) => {
        validateDiscount(data, ctx);
      });
  }

  export namespace Update {
    export class Body {
      name?: string;
      enabled?: boolean;
      begins_at?: Date | string;
      ends_at?: Date | string;
      discount_type?: DiscountType;
      discount_amount?: number;
      apply_to_products?: string[];
      apply_to_tags?: string[];
      minimum_order_value?: number;

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
        name: z.string().min(1).max(50).optional(),
        enabled: z.boolean().optional(),
        begins_at: z
          .date()
          .transform((date) => date.toJSON())
          .optional(),
        ends_at: z
          .date()
          .transform((date) => date.toJSON())
          .optional(),
        discount_type: DiscountTypeEnum.optional(),
        discount_amount: z.number().optional(),
        apply_to_products: z.string().array().optional(),
        apply_to_tags: z.string().array().optional(),
        minimum_order_value: z.number().max(10000000).optional(),
      })
      .superRefine((data, ctx) => {
        validateDiscount(data, ctx);
      });
  }
}

export default Sale;
