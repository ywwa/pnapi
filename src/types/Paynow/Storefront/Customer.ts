import {
  type Profile,
  type StorefrontMinecraft,
  type StorefrontSteam,
} from ".";

export type Customer = {
  id: string;
  store_id: string;
  profile: Profile;
  steam_id?: string;
  steam?: StorefrontSteam;
  minecraft_uuid?: string;
  minecraft?: StorefrontMinecraft;
  name: string;
  created_at: Date;
  updated_at?: Date;
};
