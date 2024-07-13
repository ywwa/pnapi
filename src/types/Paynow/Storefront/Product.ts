import { type Currency } from "../enum";
import {
  type Product as ManagementProduct,
  type Sale as ManagementSale,
} from "../Management";

/** Product Type */
export type Product = Pick<
  ManagementProduct,
  | "id"
  | "store_id"
  | "slug"
  | "image_url"
  | "name"
  | "description"
  | "enabled"
  | "single_game_server_only"
  | "price"
  | "sort_order"
  | "allow_one_time_subscription"
  | "allow_subscription"
  | "tags"
  | "created_at"
  | "updated_at"
> & {
  stock: {
    available_to_purchase: boolean;
    customer_available: number;
  };
  pricing: {
    active_sale?: Pick<
      ManagementSale,
      | "id"
      | "name"
      | "discount_type"
      | "discount_amount"
      | "minimum_order_value"
      | "begins_at"
      | "ends_at"
    >;
    vat_rate: {
      country_code: string;
      country_name: string;
      currency: Currency;
      vat_abbreviation: string;
      vat_local_name: string;
      eu_member_state: boolean;
      percentage: number;
    };
    price_original: number;
    price_final: number;
  };
  currency: string;
};
