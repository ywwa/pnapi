import { type Product, type Tag, type User } from ".";
import { type Discount } from "../enum";

/** Sale Object */
export type Sale = {
  id: string;
  store_id: string;
  enabled: boolean;
  name: string;
  apply_to_tags: Omit<Tag, "created_by" | "updated_by" | "enabled">[];
  apply_to_products: Pick<
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
  >;
  discount_type: Discount;
  discount_amount: number;
  minimum_order_value: number;
  begins_at: Date;
  ends_at?: Date;
  created_by: Pick<User, "id" | "first_name" | "last_name">;
  created_at: Date;
  updated_at?: Date;
  updated_by?: Pick<User, "id" | "first_name" | "last_name">;
};
