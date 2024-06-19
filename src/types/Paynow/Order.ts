import { type Customer, type Line, type Status } from ".";

/** Order Object */
export type Order = {
  id: string;
  pretty_id: string;
  store_id: string;
  customer: Omit<Customer, "created_by" | "updated_by">;
  status: Status;
  checkout_id?: string;
  subscription_id?: string;
  is_subscrtiption: boolean;
  coupon_id?: string;
  giftcard_id?: string;
  billing_name?: string;
  billing_email?: string;
  billing_country?: string;
  customer_ip?: string;
  currency: string;
  tax_inclusive: string;
  discount_amount: number;
  discount_amount_str: string;
  subtotal_amount: number;
  subtotal_amount_str: string;
  tax_amount: number;
  tax_amount_str: string;
  giftcard_usage_amount: number;
  giftcard_usage_amount_str: string;
  total_amount: number;
  total_amount_str: string;
  billing_cycle_sequence?: number;
  lines: Line[];
  created_at: Date;
  completed_at?: Date;
  canceled_at?: Date;
};
