import { type Steam, type User } from ".";

/** Customer Object */
export type Customer = {
  /** Flake */
  id: string;
  /** Flake of store */
  store_id: string;
  /** Steam id */
  steam_id?: string;
  /** Steam Object */
  steam?: Steam;
  /** UUID of Minecraft Account */
  minecraft_uuid?: string;
  /** ??? */
  minecraft?: any;
  /** Name of the customer */
  name?: string;
  /** Metadata of the customer */
  metadata?: { [key: string]: string };
  /** User that created the customer */
  created_by?: User;
  /** The date customer was created */
  created_at: Date;
  /** User that last updated the customer */
  updated_by?: User;
  /** The date customer was last updated */
  updated_at?: Date;
};
