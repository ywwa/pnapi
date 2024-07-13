import { boolean, number, object, string, type ZodSchema } from "zod";
import {
  dateSchema,
  minecraftSchema,
  RevokeReasonEnum,
  StateEnum,
  steamSchema,
} from "../shared.schema";

const profileSchema = object({
  id: string(),
  platform: string(),
  name: string(),
  avatar_url: string().nullable(),
});

export const customerResponse: ZodSchema = object({
  id: string(),
  store_id: string(),
  profile: profileSchema,
  steam_id: string().nullable(),
  steam: steamSchema.nullable(),
  minecraft_uuid: string().nullable(),
  minecraft: minecraftSchema.nullable(),
  name: string(),
  created_at: dateSchema,
  updated_at: dateSchema.nullable(),
});

export const itemResponse: ZodSchema = object({
  id: string(),
  store_id: string(),
  subscription_id: string().nullable(),
  order_id: string().nullable(),
  order_line_id: string().nullable(),
  quantity_index: number().nullable(),
  execute_on_gameserver_id: string().array().nullable(),
  product: object({
    id: string(),
    store_id: string(),
    version_id: string(),
    name: string(),
    slug: string(),
  }),
  state: StateEnum,
  expirable: boolean(),
  gift: boolean(),
  added_at: dateSchema,
  active_at: dateSchema.nullable(),
  expires_at: dateSchema.nullable(),
  removed_at: dateSchema.nullable(),
  revoke_reason: RevokeReasonEnum.nullable(),
});
