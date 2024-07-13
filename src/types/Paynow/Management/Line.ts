import { type ManagementCustomer } from ".";
import { type Scale } from "../enum";

/** Line Object */
export type Line = {
  id: string;
  checkout_line_id: string;
  product_id: string;
  product_version_id: string;
  product_name: string;
  product_image_url?: string;
  subscription_interval_value: number;
  subscription_interval_scale: Scale;
  gift: boolean;
  gift_to_customer?: ManagementCustomer; // could be omited!!!
  selected_gameserver_id?: string;
  price: number;
  price_str: string;
  quantity: number;
  discount_amount: number;
  discount_amount_str: string;
  subtotal_amount: number;
  subtotal_amount_str: string;
  total_amount: number;
  total_amount_str: string;
};
