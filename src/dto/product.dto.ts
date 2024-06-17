import { Product, type Command, type Scale } from "../types";

export interface ProductRequestDTO {
  slug?: string;
  name: string;
  description: string;
  price: number;
  allow_one_time_purchase: boolean;
  allow_subscription: boolean;
  subscription_interval_value?: number;
  subscription_interval_scale?: Scale;
  remove_ater_enabled: boolean;
  remove_after_value?: number;
  remove_after_scale?: Scale;
  "store_stock_limit.enabled": boolean;
  "store_stock_limit.quantity"?: number;
  "store_stock_limit.time_value"?: number;
  "store_stock_limit.time_scale"?: Scale;
  "customer_stock_limit.enabled": boolean;
  "customer_stock_limit.quantity"?: number;
  "customer_stock_limit.time_value"?: number;
  "customer_stock_limit.time_scale"?: Scale;
  stock_limit_do_not_include_removed: boolean;
  tags?: string[];
  gameservers?: string[];
  commands?: Command[];
}

export interface ProductResponseDTO extends Product {}
