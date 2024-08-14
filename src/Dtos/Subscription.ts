import { z } from "zod";
import { DateSchema, ParseError } from "../lib";
import { ScaleEnum, StatusEnum } from "../lib/schemas/enum";
import type { Scale, Status } from "../types";
import Customer from "./Customer";

namespace Subscription {
  export class Response {
    /** ID of the subscription (flake) */
    id: string;
    /** Subscription ID but prettier */
    pretty_id: string;
    /** ID of the store */
    store_id: string;
    /** Customer associated with the subscription */
    customer: Omit<Customer.Response, "created_by" | "updated_by">;
    /** Status of the subscription */
    status: Status;
    /** Checkout ID (flake) */
    checkout_id: string | null;
    /** Checkout Line ID (flake) */
    checkout_line_id: string | null;
    /** Billing name associated with the subscription */
    billing_name: string;
    /** Billing Email associated with the subscription */
    billing_email: string;
    /** Billing country associated with the subscription */
    billing_country: string;
    /** Customer IP address */
    customer_ip: string | null;
    /** Gift associated with the subscription */
    gift: boolean;
    /** Gift to customer associated with the subscription */
    gift_to_customer: Omit<
      Customer.Response,
      "created_by" | "updated_by"
    > | null;
    /** Product ID (flake) */
    product_id: string;
    /** Product version ID (flake) */
    product_version_id: string;
    /** Product image URL */
    product_image_url: string | null;
    /** Interval value when subscription is being renewed */
    interval_value: number;
    /** Interval scale when subscription is being renewed */
    interval_scale: Scale;
    /** Currency associated with the subscription */
    currency: string;
    /** Whether tax is inclusive or not */
    tax_inclusive: boolean;
    /** Price of the subscription */
    price: number;
    /** Stringified price */
    price_str: string;
    /** Discount amount applied to the subscription */
    discount_amount: number;
    /** Stringified discount amount */
    discount_amount_str: string;
    /** Subtotal amount of the subscription */
    subtotal_amount: number;
    /** Stringified subtotal amount */
    subtotal_amount_str: string;
    /** Tax amount of the subscription */
    tax_amount: number;
    /** Stringified tax amount */
    tax_amount_str: string;
    /** Total amount of the subscription */
    total_amount: number;
    /** Stringified total amount */
    total_amount_str: string;
    /** Initial discount amount applied to the subscription */
    initial_discount_amount: number;
    /** Stringified initial discount amount */
    initial_discount_amount_str: string;
    /** Initial subtotal amount of the subscription */
    initial_subtotal_amount: number;
    /** Stringified initial subtotal amount */
    initial_subtotal_amount_str: string;
    /** Initial giftcard usage amount applied to the subscription */
    initial_giftcard_usage_amount: number;
    /** Stringified initial giftcard usage amount */
    initial_giftcard_usage_amount_str: string;
    /** Initial tax amount of the subscription */
    initial_tax_amount: number;
    /** Stringified initial tax amount */
    initial_tax_amount_str: string;
    /** Date when current period starts */
    current_period_start: Date;
    /** Date when current period ends */
    current_period_end: Date;
    /** Number of billing cycles for the subscription */
    billing_cycle_sequence: number | null;
    /** Date when subscription was created */
    created_at: Date;
    /** Date when subscription was last updated */
    updated_at: Date | null;
    /** Date when subscription becomes active */
    active_at: Date | null;
    /** Date when subscription was canceled */
    canceled_at: Date | null;
    /** Reason why subscription was canceled */
    cancel_reason: string | null;

    constructor(payload: unknown) {
      const subscription = Schema.safeParse(payload);
      if (!subscription.success) throw new ParseError(subscription.error);
      Object.assign(this, subscription.data);
    }
  }

  export const Schema = z.object({
    id: z.string(),
    pretty_id: z.string(),
    store_id: z.string(),
    customer: Customer.Schema.omit({ created_by: true, updated_by: true }),
    status: StatusEnum,
    checkout_id: z.string().nullable(),
    checkout_line_id: z.string().nullable(),
    billing_name: z.string(),
    billing_email: z.string(),
    billing_country: z.string(),
    customer_ip: z.string().nullable(),
    gift: z.boolean(),
    gift_to_customer: Customer.Schema.omit({
      created_by: true,
      updated_by: true,
    }).nullable(),
    product_id: z.string(),
    product_version_id: z.string(),
    product_image_url: z.string().nullable(),
    interval_value: z.number(),
    interval_scale: ScaleEnum,
    currency: z.string(),
    tax_inclusive: z.boolean(),
    price: z.number(),
    price_str: z.string(),
    discount_amount: z.number(),
    discount_amount_str: z.string(),
    subtotal_amount: z.number(),
    subtotal_amount_str: z.string(),
    tax_amount: z.number(),
    tax_amount_str: z.string(),
    total_amount: z.number(),
    total_amount_str: z.string(),
    initial_discount_amount: z.number(),
    initial_discount_amount_str: z.string(),
    initial_subtotal_amount: z.number(),
    initial_subtotal_amount_str: z.string(),
    initial_giftcard_usage_amount: z.number(),
    initial_giftcard_usage_amount_str: z.string(),
    initial_tax_amount: z.number(),
    initial_tax_amount_str: z.string(),
    current_period_start: DateSchema,
    current_period_end: DateSchema,
    billing_cycle_sequence: z.number().nullable(),
    created_at: DateSchema,
    updated_at: DateSchema.nullable(),
    active_at: DateSchema.nullable(),
    canceled_at: DateSchema.nullable(),
    cancel_reason: z.string().nullable(),
  });

  export class Search {
    limit?: number;
    after?: string;
    before?: string;
    customer_id?: string;

    constructor(payload: unknown) {
      const subscription = SearchSchema.safeParse(payload);
      if (!subscription.success) throw new ParseError(subscription.error);
      Object.assign(this, subscription.data);
      Object.keys(this).forEach((key) => {
        this[key as keyof this] === undefined && delete this[key as keyof this];
      });
    }
  }

  const SearchSchema = z.object({
    limit: z.number().optional(),
    after: z.string().optional(),
    before: z.string().optional(),
    customer_id: z.string().optional(),
  });
}

export default Subscription;
