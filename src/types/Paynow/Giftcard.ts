import { type User } from "./User";

/** Giftcard Object */
export type Giftcard = {
  id: string;
  store_id: string;
  enabled: boolean;
  code: string;
  note: string;
  balance: number;
  starting_balance: number;
  usable_at: Date;
  expires_at?: Date;
  created_by: Pick<User, "id" | "first_name" | "last_name">;
  created_at: Date;
  updated_by?: Pick<User, "id" | "first_name" | "last_name">;
  updated_at?: Date;
  canceled_by?: Pick<User, "id" | "first_name" | "last_name">;
  canceled_at?: Date;
};
