import { z } from "zod";
import { CodeSchema, DateSchema, ParseError, validateDiscount } from "../lib";
import { DiscountTypeEnum } from "../lib/schemas/enum";
import { DiscountType } from "../types";
import Customer from "./Customer";
import Product from "./Product";
import Tag from "./Tag";
import User from "./User";

namespace Coupon {
  export class Response {
    /** ID of the coupon (flake) */
    id: string;
    /** ID of the store (flake) */
    store_id: string;
    /** Whether coupon is enabled */
    enabled: boolean;
    /** Coupon code */
    code: string;
    /** Note */
    note: string;
    /** To what tags coupon applies */
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
    /** Type of discount */
    discount_type: DiscountType;
    /** Discount amount */
    discount_amount: number;
    /** Does discount apply individually */
    discount_apply_individually: boolean;
    /** Does discount applies before sales */
    discount_apply_before_sales: boolean;
    /** Customer who can use the discount (Customer) */
    usable_by_customer: Pick<
      Customer.Response,
      | "id"
      | "store_id"
      | "profile"
      | "steam_id"
      | "steam"
      | "minecraft_uuid"
      | "minecraft"
      | "name"
      | "metadata"
      | "created_at"
      | "updated_at"
    > | null;
    /** Minimum order value */
    minimum_order_value: number;
    /** Is store redeem limit enabled */
    redeem_limit_store_enabled: boolean;
    /** Store redeem limit value */
    redeem_limit_store_amount: number;
    /** Is customer redeem limit enabled */
    redeem_limit_customer_enabled: boolean;
    /** Customer redeem limit value */
    redeem_limit_customer_amount: number;
    /** Is coupon usable on one time purchase */
    usable_on_one_time_purchase: boolean;
    /** Is coupon usable on subscription */
    usable_on_subscription: boolean;
    /** When coupon becomes usable */
    usable_at: Date;
    /** When coupon expires */
    expires_at: Date | null;
    /** User who created the coupon (User) */
    created_by: Pick<User.Response, "id" | "first_name" | "last_name"> | null;
    /** When coupon was created */
    created_at: Date;
    /** User who last updated the coupon (User) */
    updated_by: Pick<User.Response, "id" | "first_name" | "last_name"> | null;
    /** When coupon was last updated */
    updated_at: Date | null;

    constructor(payload: unknown) {
      const coupon = Schema.safeParse(payload);
      if (!coupon.success) throw new ParseError(coupon.error);
      Object.assign(this, coupon.data);
    }
  }

  export const Schema = z.object({
    id: z.string(),
    store_id: z.string(),
    enabled: z.boolean(),
    code: z.string(),
    note: z.string(),
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
    discount_apply_individually: z.boolean(),
    discount_apply_before_sales: z.boolean(),
    usable_by_customer: Customer.Schema.pick({
      id: true,
      store_id: true,
      profile: true,
      steam_id: true,
      steam: true,
      minecraft_uuid: true,
      minecraft: true,
      name: true,
      metadata: true,
      created_at: true,
      updated_at: true,
    }).nullable(),
    minimum_order_value: z.number(),
    redeem_limit_store_enabled: z.boolean(),
    redeem_limit_store_amount: z.number(),
    redeem_limit_customer_enabled: z.boolean(),
    redeem_limit_customer_amount: z.number(),
    usable_on_one_time_purchase: z.boolean(),
    usable_on_subscription: z.boolean(),
    usable_at: DateSchema,
    expires_at: DateSchema.nullable(),
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
      code: string;
      note: string;
      enabled?: boolean;
      usable_at?: Date | string;
      expires_at?: Date | string;
      discount_type?: DiscountType;
      discount_amount: number;
      discount_apply_individually?: boolean;
      discount_apply_before_sales?: boolean;
      apply_to_products?: string[];
      apply_to_tags?: string[];
      usable_by_customer_id?: string;
      usable_on_one_time_purchase?: boolean;
      usable_on_subscription?: boolean;
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
        code: CodeSchema.min(1).max(50),
        note: z.string().min(1).max(200),
        enabled: z.boolean().default(true),
        usable_at: z
          .date()
          .transform((date) => date.toJSON())
          .optional(),
        expires_at: z
          .date()
          .transform((date) => date.toJSON())
          .optional(),
        discount_type: DiscountTypeEnum.default(DiscountType.Percent),
        discount_amount: z.number(),
        discount_apply_individually: z.boolean().default(false),
        discount_apply_before_sales: z.boolean().default(false),
        apply_to_products: z.string().array().optional(),
        apply_to_tags: z.string().array().optional(),
        usable_by_customer_id: z.string().optional(),
        usable_on_one_time_purchase: z.boolean().default(true),
        usable_on_subscription: z.boolean().default(true),
        minimum_order_value: z.number().default(0),
      })
      .superRefine((data, ctx) => {
        validateDiscount(data, ctx);
      });
  }

  export namespace Update {
    export class Body {
      code?: string;
      note?: string;
      enabled?: boolean;
      usable_at?: Date | string;
      expires_at?: Date | string;
      discount_type?: DiscountType;
      discount_amount?: number;
      discount_apply_individually?: boolean;
      discount_apply_before_sales?: boolean;
      apply_to_products?: string[];
      apply_to_tags?: string[];
      usable_by_customer_id?: string;
      usable_on_one_time_purchase?: boolean;
      usable_on_subscription?: boolean;
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
        code: CodeSchema.min(1).max(50).optional(),
        note: z.string().min(1).max(200).optional(),
        enabled: z.boolean().optional(),
        usable_at: z
          .date()
          .transform((date) => date.toJSON())
          .optional(),
        expires_at: z
          .date()
          .transform((date) => date.toJSON())
          .optional(),
        discount_type: DiscountTypeEnum.optional(),
        discount_amount: z.number().optional(),
        discount_apply_individually: z.boolean().optional(),
        discount_apply_before_sales: z.boolean().optional(),
        apply_to_products: z.string().array().optional(),
        apply_to_tags: z.string().array().optional(),
        usable_by_customer_id: z.string().optional(),
        usable_on_one_time_purchase: z.boolean().optional(),
        usable_on_subscription: z.boolean().optional(),
        minimum_order_value: z.number().optional(),
      })
      .superRefine((data, ctx) => {
        if (
          (!data.discount_type && data.discount_amount) ||
          (data.discount_type && !data.discount_amount)
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message:
              "if you provide one of discount_type or discount_amount, you must provide both",
            path: ["discount_type", "discount_amount"],
          });
        }

        validateDiscount(data, ctx);
      });
  }
}

export default Coupon;
