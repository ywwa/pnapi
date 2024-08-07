import { type ManagementCustomer } from ".";
import { type Currency, type Scale, type Status } from "../enum";

/** Subscription Object */
export type Subscription = {
  id: string;
  pretty_id: string;
  store_id: string;
  customer: Omit<ManagementCustomer, "created_by" | "updated_by">;
  status: Status;
  checkout_id: string;
  checkout_line_id: string;
  billing_name?: string;
  billing_email?: string;
  billing_country?: string;
  customer_ip?: string;
  gift: boolean;
  gift_to_customer?: Omit<ManagementCustomer, "created_by" | "updated_by">;
  product_id: string;
  product_version_id: string;
  product_name: string;
  product_image_url?: string;
  interval_value: number;
  interval_scale: Scale;
  currency: Currency;
  tax_inclusive: boolean;
  price: number;
  price_str: string;
  discount_amount: number;
  discount_amount_str: string;
  subtotal_amount: number;
  subtotal_amount_str: string;
  tax_amount: number;
  tax_amount_str: string;
  total_amount: number;
  total_amount_str: string;
  initial_discount_amount: number;
  initial_discount_amount_str: string;
  initial_subtotal_amount: number;
  initial_subtotal_amount_str: string;
  initial_giftcard_usage_amount: number;
  initial_giftcard_usage_amount_str: string;
  initial_tax_amount: number;
  initial_tax_amount_str: string;
  initial_total_amount: number;
  initial_total_amount_str: string;
  current_period_start: Date;
  current_period_end: Date;
  billing_cycle_sequence: number;
  created_at: Date;
  updated_at?: Date;
  active_at: Date;
  canceled_at?: Date;
  cancel_reason?: string; // TODO: is this enum or what
};
