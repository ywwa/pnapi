import type { Customer } from "../../Dtos";
import { Scale } from "./enum";

export type Line = {
  id: string;
  checkout_line_id: string;
  product_id: string;
  product_version_id: string;
  product_name: string;
  product_image_url: string | null;
  subscription_interval_value: number | null;
  subscription_interval_scale: Scale | null;
  gift: boolean;
  // NOTE: This is most likely invalid schema
  // TODO: get correct schema
  gift_to_customer: Omit<Customer.Response, "created_by" | "updated_by"> | null;
  selected_gameserver_id: string | null;
  price: number;
  price_str: string;
  quantity: number;
  discount_amount: number;
  discount_amount_str: string;
  subtotal_amount: number;
  subtotal_amount_str: string;
  tax_amount: number;
  tax_amount_str: string;
  total_amount: number;
  total_amount_str: string;
};
