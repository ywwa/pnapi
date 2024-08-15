import { z } from "zod";
import {
  DateSchema,
  LastPaymentErrorSchema,
  ParseError,
  TaxJurisdicationSchema,
} from "../lib";
import { ScaleEnum, StatusEnum } from "../lib/schemas/enum";
import type {
  LastPaymentError,
  Line,
  Status,
  TaxJurisdication,
} from "../types";
import Customer from "./Customer";

export const LineSchema = z.object({
  id: z.string(),
  checkout_line_id: z.string(),
  product_id: z.string(),
  product_version_id: z.string(),
  product_name: z.string(),
  product_image_url: z.string().nullable(),
  subscription_interval_value: z.number().nullable(),
  subscription_interval_scale: ScaleEnum.nullable(),
  gift: z.boolean(),
  gift_to_customer: Customer.Schema.pick({
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
  selected_gameserver_id: z.string().nullable(),
  price: z.number(),
  price_str: z.string(),
  quantity: z.number(),
  discount_amount: z.number(),
  discount_amount_str: z.string(),
  subtotal_amount: z.number(),
  subtotal_amount_str: z.string(),
  tax_amount: z.number(),
  tax_amount_str: z.string(),
  total_amount: z.number(),
  total_amount_str: z.string(),
});

namespace Order {
  export class Response {
    /** ID of the order */
    id: string;
    /** ID of the order but prettier */
    pretty_id: string;
    /** ID of the store */
    store_id: string;
    /** Customer who created the order */
    customer: Omit<Customer.Response, "created_by" | "updated_by">;
    /** Status of the order */
    status: Status;
    /** Checkout token */
    checkout_token: string | null;
    /** ID of the checkout */
    checkout_id: string | null;
    /** Whether order is subscription */
    is_subscription: boolean;
    /** ID of the subscription */
    subscription_id: string | null;
    /** ID of the coupon used on the order */
    coupon_id: string | null;
    /** ID of the giftcard used on the order */
    giftcard_id: string | null;
    /** Billing name associated with the order */
    billing_name: string;
    /** Billing email associated with the order */
    billing_email: string;
    /** Billing country associated with the order */
    billing_country: string;
    /* IP address of the customer */
    customer_ip: string;
    /** Tax Jurisdictions applied to the order */
    tax_jurisdictions: TaxJurisdication;
    /** Currency */
    currency: string;
    /** Discount amount applied to the order */
    discount_amount: number;
    /** Stringified amount */
    discount_amount_str: string;
    /** Subtotal amount of the line */
    subtotal_amount: number;
    /** Stringified amount */
    subtotal_amount_str: string;
    /** Tax amount applied to the order */
    tax_amount: number;
    /** Stringified amount */
    tax_amount_str: string;
    /** Giftcard usage amount */
    giftcard_usage_amount: number;
    /** Stringified amount */
    giftcard_usage_amount_str: string;
    /** Total amount of the order */
    total_amount: number;
    /** Stringified amount */
    total_amount_str: string;
    /** Number of billing cycle sequence */
    billing_cycle_sequence: number | null;
    /** list of items associated with the order */
    lines: Line[];
    /** Date when order was created */
    created_at: Date;
    /** Date when order was completed */
    completed_at: Date | null;
    /** Date when order was canceled */
    canceled_at: Date | null;
    /** Failure reason of the latest associated payment */
    last_payment_error: LastPaymentError | null;

    constructor(payload: unknown) {
      const order = Schema.safeParse(payload);
      if (!order.success) throw new ParseError(order.error);
      Object.assign(this, order.data);
    }
  }

  export const Schema = z.object({
    id: z.string(),
    pretty_id: z.string(),
    store_id: z.string(),
    customer: Customer.Schema.omit({ created_by: true, updated_by: true }),
    status: StatusEnum,
    checkout_token: z.string().nullable(),
    checkout_id: z.string().nullable(),
    is_subscription: z.boolean(),
    subscription_id: z.string().nullable(),
    coupon_id: z.string().nullable(),
    giftcard_id: z.string().nullable(),
    billing_name: z.string(),
    billing_email: z.string(),
    billing_country: z.string(),
    customer_ip: z.string(),
    tax_jurisdictions: TaxJurisdicationSchema.array().nullable(),
    currency: z.string(),
    discount_amount: z.number(),
    discount_amount_str: z.string(),
    subtotal_amount: z.number(),
    subtotal_amount_str: z.string(),
    tax_amount: z.number(),
    tax_amount_str: z.string(),
    giftcard_usage_amount: z.number(),
    giftcard_usage_amount_str: z.string(),
    total_amount: z.number(),
    total_amount_str: z.string(),
    billing_cycle_sequence: z.number().nullable(),
    lines: LineSchema.array(),
    created_at: DateSchema,
    completed_at: DateSchema.nullable(),
    canceled_at: DateSchema.nullable(),
    last_payment_error: LastPaymentErrorSchema.nullable(),
  });

  export class Search {
    order_id?: string;
    subscription_id?: string;
    is_subscription?: boolean;
    limit?: number;
    after?: string;
    before?: string;

    constructor(payload: unknown) {
      const search = SearchSchema.safeParse(payload);
      if (!search.success) throw new ParseError(search.error);
      Object.assign(this, search.data);
      Object.keys(this).forEach((key) => {
        this[key as keyof this] === undefined && delete this[key as keyof this];
      });
    }
  }

  const SearchSchema = z.object({
    order_id: z.string().optional(),
    subscription_id: z.string().optional(),
    is_subscription: z.boolean().optional(),
    limit: z.number().optional(),
    after: z.string().optional(),
    before: z.string().optional(),
  });
}

export default Order;
