import { type ManagementCustomer, type Product, type Tag, type User } from ".";

/** Coupon object */
export type Coupon = {
  id: string;
  store_id: string;
  enabled: boolean;
  code: string;
  note: string;
  apply_to_tags?: Omit<Tag, "enabled" | "created_by" | "updated_by">[];
  apply_to_products?: Pick<
    Product,
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
  >[];
  discount_type: "percent" | "amount";
  discount_amount: number;
  discount_apply_individually: boolean;
  discount_apply_before_sales: boolean;
  usable_by_customer: Omit<ManagementCustomer, "created_by" | "updated_by">; // undomumented?
  minimum_order_value: number;
  redeem_limit_store_enabled: boolean;
  redeem_limit_store_amount: number;
  redeem_limit_customer_enabled: boolean;
  redeem_limit_customer_amount: number;
  usable_on_one_time_purchase: boolean;
  usable_on_subscription: boolean;

  usable_at: Date;
  expires_at?: Date;
  created_by: Pick<User, "id" | "first_name" | "last_name">;
  created_at: Date;
  updated_at?: Date;
  updated_by?: Date;
};
