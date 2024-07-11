import { type Product, type Scale } from "../../types";

interface ProductDTO extends Product {}

export interface ProductResponseDTO extends ProductDTO {}

export interface ProductCreateDTO
  extends Pick<ProductDTO, "name" | "description" | "price">,
    Partial<
      Pick<
        Product,
        | "slug"
        | "allow_one_time_subscription"
        | "allow_subscription"
        | "subscription_interval_value"
        | "subscription_interval_scale"
        | "remove_after_enabled"
        | "remove_after_time_value"
        | "remove_after_time_scale"
        | "stock_limit_do_not_include_removed"
        | "tags"
        | "gameservers"
        | "commands"
      >
    > {
  "store_stock_limit.enabled"?: boolean;
  "store_stock_limit.quantity"?: number;
  "store_stock_limit.time_value"?: number;
  "store_stock_limit.time_scale"?: Scale;
  "customer_stock_limit.enabled"?: boolean;
  "customer_stock_limit.quantity"?: number;
  "customer_stock_limit.time_value"?: number;
  "customer_stock_limit.time_scale"?: Scale;
}

export interface ProductUpdateDTO extends Partial<ProductCreateDTO> {}
