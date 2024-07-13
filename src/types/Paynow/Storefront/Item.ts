import { type Item as ManagementItem } from "../Management";

export type Item = Pick<
  ManagementItem,
  | "id"
  | "store_id"
  | "subscription_id"
  | "order_id"
  | "order_line_id"
  | "quantity_index"
  | "execute_on_gameserver_id"
  | "product"
  | "state"
  | "expirable"
  | "gift"
  | "added_at"
  | "active_at"
  | "expires_at"
  | "removed_at"
  | "revoke_reason"
> & { customer_id: string };
