export interface ClientConfig {
  apikey: string;
  store_id: string;
}

export interface ServiceConfig extends ClientConfig {
  customerKey?: string;
  customerIp?: string;
  customerCountryCode?: string;
}

export enum RequestMethods {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export enum AuthTypes {
  API = "apikey",
  CUSTOMER = "customer",
  ANONYMOUS = "anonymous",
}

export type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
};

export enum Game {
  RUST = "rust",
}

export enum Currency {
  EUR = "eur",
  USD = "usd",
  GBP = "gbp",
}

export type Member = {
  user: User;
  role_id: string;
  added_at: Date;
  added_by: User;
};

export type Role = {
  id: string;
  store_id: string;
  name: string;
  description: string;
  created_by: User;
  created_at: Date;
  updated_by: User;
  updated_at: Date;
};

export type Steam = {
  id: string;
  name?: string;
  avatar_url?: string;
};

export type Customer = {
  id: string;
  store_id: string;
  steam_id?: string;
  steam?: Steam;
  name?: string;
  metadata?: { [key: string]: string };
  created_by?: User;
  created_at: Date;
  updated_by?: User;
  updated_at?: Date;
};

export enum Scale {
  DAY = "day",
  WEEK = "week",
  MONTH = "month",
  YEAR = "year",
}

export type StockLimit = {
  enabled: boolean;
  quantity: number;
  time_value: number;
  time_scale: Scale;
};

export type StockAvailable = {
  store_available: number;
  customer_available: number;
};

export type Tag = {
  id: string;
  store_id: string;
  slug: string;
  name: string;
  description?: string;
  enabled: boolean;
  created_by?: User;
  created_at: Date;
  updated_by?: User;
  updated_at?: Date;
};

export type Gameserver = {
  id: string;
  store_id: string;
  name: string;
  enabled: boolean;
  token: string;
  token_reset_at: Date;
  created_by?: User;
  created_at: Date;
  updated_by?: User;
  updated_at?: Date;
};

export enum Stage {
  PURCHASE = "on_purchase",
  EXPIRE = "on_expire",
  RENEW = "on_renew",
  REFUND = "on_refund",
  CHARGEBACK = "on_chargeback",
}
export type Command = {
  stage: Stage;
  content: string;
  online_only: boolean;
};

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

export enum State {
  USABLE = "usable",
  ACTIVE = "active",
  USED = "used",
  REVOKED = "revoked",
}

export enum RevokeReason {
  ADMIN = "admin",
  REFUND = "refund",
  CHARGEBACK = "chargeback",
}

export type Item = {
  id: string;
  store_id: string;
  customer: Omit<Customer, "created_by" | "updated_by">;
  order_customer: Omit<Customer, "created_by" | "updated_by">;
  subscription_id?: string;
  checkout_id?: string;
  order_id?: string;
  order_line_id?: string;
  quantity_index?: number;
  execute_on_gameserver_id?: string[];
  product: Pick<Product, "id" | "store_id" | "version_id" | "name" | "slug">;
  command_attempts?: number;
  state: State;
  expirable: boolean;
  gift: boolean;
  added_at: Date;
  added_by?: User;

  active_at?: Date;
  expires_at?: Date;
  removed_at?: Date;
  revoked_at?: Date;
  revoke_reason?: RevokeReason;
  revoked_by?: User;
};

export type Optional<T> = { [P in keyof T]?: T[P] };

export type Navlink = {
  node_id: string;
  parent_node_id?: string;
  store_id: string;
  tag_id: string;
  tag_slug: string;
  name: string;
  order: number;
};

export enum Status {}

export type Order = {
  id: string;
  pretty_id: string;
  store_id: string;
  customer: Customer;
  status: Status;
  checkout_id?: string;
  subscription_id?: string;
  is_subscription: boolean;
  coupon_id?: string;
  giftcard_id?: string;
  billing_name: string;
  billing_email: string;
  billing_country: string;
  customer_ip: string;
  currency: Currency;
  tax_inclusive: boolean;
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
  lines?: Line[];
  created_at: Date;
  completed_at?: Date;
  canceled_at?: Date;
};

export type Line = {
  id: string;
  checkout_line_id: string;
  product_id: string;
  product_version_id: string;
  product_name: string;
  product_image_url?: string;
  subscription_interval_value?: number;
  subscription_interval_scale?: Scale;
  gift: boolean;
  gift_to_customer?: Customer;
  selected_gameserver_id?: string;
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
