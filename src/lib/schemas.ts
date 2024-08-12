import { z } from "zod";
import { Currency, Game, Platform } from "../types";

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
