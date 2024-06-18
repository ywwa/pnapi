import {
  type Customer,
  type Product,
  type RevokeReason,
  type State,
  type User,
} from ".";

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
