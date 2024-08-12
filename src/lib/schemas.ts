import { z } from "zod";
import {
  Currency,
  Game,
  Platform,
  RevokeReason,
  Scale,
  Stage,
  State,
} from "../types";

export const DateSchema = z.string().transform((str) => new Date(str));

export const GameEnum = z.enum(Object.values(Game) as [Game, ...Game[]]);

export const CurrencyEnum = z.enum(
  Object.values(Currency) as [Currency, ...Currency[]],
);

export const SlugSchema = z
  .string()
  .regex(/^(?!-)(?!.*--)[a-zA-Z0-9-]+(?<!-)$/, "Invalid Slug");

export const PlatformEnum = z.enum(
  Object.values(Platform) as [Platform, ...Platform[]],
);

export const GenericProfileSchema = z.object({
  id: z.string(),
  platform: PlatformEnum,
  name: z.string().nullable(),
  avatar_url: z.string().nullable(),
});

export const ProfileSchema = GenericProfileSchema.pick({
  id: true,
  name: true,
  avatar_url: true,
});

export const MetadataSchema = z
  .record(z.string().max(40), z.string().max(500))
  .superRefine((meta, ctx) => {
    if (Object.keys(meta).length > 50) {
      ctx.addIssue({
        code: "custom",
        message: "Metadata must not exceed 50 key-value pairs",
      });
    }
  });

export const StateEnum = z.enum(Object.values(State) as [State, ...State[]]);

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

export const RevokeReasonEnum = z.enum(
  Object.values(RevokeReason) as [RevokeReason, ...RevokeReason[]],
);

export const ScaleEnum = z.enum(Object.values(Scale) as [Scale, ...Scale[]]);

export const StockLimitSchema = z.object({
  enabled: z.boolean(),
  quantity: z.number(),
  time_value: z.number(),
  time_scale: ScaleEnum,
});

export const StockAvailableSchema = z.object({
  store_available: z.number(),
  customer_available: z.number(),
});

export const StageEnum = z.enum(Object.values(Stage) as [Stage, ...Stage[]]);
