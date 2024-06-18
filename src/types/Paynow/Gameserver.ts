import { type User } from ".";

/** Gameserver */
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
