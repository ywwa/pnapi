import { z } from "zod";
import { DateSchema } from "./base";

export const CommandAttemptSchema = z.object({
  id: z.string(),
  inventory_item_id: z.string(),
  gameserver_id: z.string(),
  steam_id: z.string().nullable(),
  minecraft_uuid: z.string().nullable(),
  customer_name: z.string().nullable(),
  command_stage: z.string(),
  command: z.string(),
  online_only: z.boolean(),
  rerun: z.boolean(),
  queued_at: DateSchema,
  executed_at: DateSchema.nullable(),
});
