import { type User } from ".";

/** Tag object */
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
