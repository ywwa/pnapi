import {
  type Command,
  type Gameserver,
  type Scale,
  type StockAvailable,
  type StockLimit,
  type Tag,
  type User,
} from ".";

/** Product object */
export type Product = {
  id: string;
  store_id: string;
  version_id: string;
  image_url?: string;
  slug: string;
  name: string;
  description: string;
  enabled: boolean;
  label?: string;
  sort_order: number;
  price: number;
  single_game_server_only: boolean;
  allow_one_time_subscription: boolean;
  allow_subscription: boolean;
  subscription_interval_value: number;
  subscription_interval_scale: Scale;
  remove_after_enabled: boolean;
  remove_after_time_value: number;
  remove_after_time_scale: Scale;
  store_stock_limit: StockLimit;
  customer_stock_limit: StockLimit;
  stock_limit_do_not_include_removed: boolean;
  stock_available: StockAvailable;
  tags?: Pick<Tag, "id" | "slug" | "name">[];
  gameservers?: Gameserver[];
  commands?: Command[];
  created_by: User;
  created_at: Date;
  updated_by?: User;
  updated_at?: Date;
};
